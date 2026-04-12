// לוגר מובנה (structured logger) — ללא תלויות חיצוניות
// מטרה: ריכוז כל הלוגים של האפליקציה בפורמט אחיד ובטוח
// בפרודקשן (NODE_ENV==="production"): שורת JSON אחת לכל קריאה — מתאים ל-log collectors
// בפיתוח: פלט צבעוני קריא, עדיין עם הקשר מובנה
// בטוח ל-Edge runtime: משתמש רק ב-console ולא ב-process.stdout/stderr
// מסנן אוטומטית מפתחות רגישים (password, token, וכדומה) כדי למנוע דליפת סודות ללוגים
// לעולם לא זורק חריגות ולא מפיל את התהליך

type LogLevel = "debug" | "info" | "warn" | "error";

// סדר הרמות — שימושי להשוואה מול LOG_LEVEL
const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

// זיהוי סביבה — נקבע פעם אחת בטעינה. שימוש ב-globalThis כדי להישאר תואם Edge runtime
const ENV =
  (typeof globalThis !== "undefined" &&
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env) ||
  {};
const IS_PROD = ENV.NODE_ENV === "production";

// רמת הלוג הפעילה — נלקחת מ-LOG_LEVEL או ברירת מחדל לפי הסביבה
function resolveLevel(): LogLevel {
  const raw = (ENV.LOG_LEVEL || "").toLowerCase();
  if (raw === "debug" || raw === "info" || raw === "warn" || raw === "error") {
    return raw;
  }
  return IS_PROD ? "info" : "debug";
}

const ACTIVE_LEVEL = resolveLevel();

// צבעי ANSI לפלט פיתוח — כבויים בפרודקשן
const COLORS: Record<LogLevel, string> = {
  debug: "\x1b[90m", // אפור
  info: "\x1b[36m", // ציאן
  warn: "\x1b[33m", // צהוב
  error: "\x1b[31m", // אדום
};
const COLOR_RESET = "\x1b[0m";
const COLOR_DIM = "\x1b[2m";

// רשימת מפתחות שיש למסך תמיד — ערכים ייראו כ-[REDACTED]
// ההשוואה מתבצעת ב-lowercase כדי לתפוס גם Authorization / API_KEY וכדומה
const REDACT_KEYS = new Set<string>([
  "password",
  "token",
  "authorization",
  "cookie",
  "apikey",
  "api_key",
  "secret",
]);
const REDACTED = "[REDACTED]";

// בדיקה האם מפתח נתון נחשב רגיש — מנרמלים לאותיות קטנות
function isSensitiveKey(key: string): boolean {
  return REDACT_KEYS.has(key.toLowerCase());
}

// סריאליזציה בטוחה של Error — שם, הודעה ו-stack בלבד
function serializeError(err: unknown): { name: string; message: string; stack?: string } {
  if (err instanceof Error) {
    return { name: err.name, message: err.message, stack: err.stack };
  }
  return { name: "NonError", message: String(err) };
}

// מעבר רקורסיבי על ההקשר כדי להסוות שדות רגישים בכל עומק
// משתמשים ב-WeakSet כדי למנוע לולאה על מבנים מעגליים
function redactDeep(value: unknown, seen: WeakSet<object>): unknown {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value as object)) return "[Circular]";
  seen.add(value as object);

  if (Array.isArray(value)) {
    return value.map((item) => redactDeep(item, seen));
  }

  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (isSensitiveKey(k)) {
      out[k] = REDACTED;
      continue;
    }
    out[k] = redactDeep(v, seen);
  }
  return out;
}

// ניקוי ההקשר לפני כתיבה: פירוק Error בשדה error/err + מסיכת שדות רגישים
function normalizeContext(context?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!context) return undefined;

  // עותק שטחי כדי לא לשנות את המקור של המתקשר
  const working: Record<string, unknown> = { ...context };

  // פירוק שגיאות גם תחת "error" וגם תחת "err" — תמיכה בשני שמות מקובלים
  if ("error" in working && working.error !== undefined) {
    working.error = serializeError(working.error);
  }
  if ("err" in working && working.err !== undefined) {
    working.err = serializeError(working.err);
  }

  // מסיכת שדות רגישים בכל העומק
  const redacted = redactDeep(working, new WeakSet<object>());
  return redacted as Record<string, unknown>;
}

// JSON.stringify עם הגנה מפני מבני נתונים מעגליים ו-BigInt
function safeStringify(value: unknown): string {
  const seen = new WeakSet<object>();
  try {
    return JSON.stringify(value, (_key, val) => {
      if (typeof val === "bigint") return val.toString();
      if (val && typeof val === "object") {
        if (seen.has(val as object)) return "[Circular]";
        seen.add(val as object);
      }
      return val;
    });
  } catch {
    // נפילה אחרונה — לא להפיל את האפליקציה בשום תרחיש
    return '{"logger":"stringify_failed"}';
  }
}

// בחירת פונקציית console לפי רמה — ב-Edge אין process.stdout, ולכן console הוא התחנה הבטוחה
function consoleFor(level: LogLevel): (...args: unknown[]) => void {
  // eslint-disable-next-line no-console
  if (level === "error") return console.error.bind(console);
  // eslint-disable-next-line no-console
  if (level === "warn") return console.warn.bind(console);
  // eslint-disable-next-line no-console
  if (level === "debug") return (console.debug || console.log).bind(console);
  // eslint-disable-next-line no-console
  return console.log.bind(console);
}

// הלב של הלוגר — בונה רשומה וכותב אותה דרך console (Edge-safe)
function emit(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  try {
    // סינון לפי רמה — אם הרמה הנוכחית נמוכה מהפעילה, דולגים
    if (LEVEL_ORDER[level] < LEVEL_ORDER[ACTIVE_LEVEL]) return;

    const ts = new Date().toISOString();
    const ctx = normalizeContext(context);
    const write = consoleFor(level);

    if (IS_PROD) {
      // פרודקשן — שורת JSON אחת; שדות החובה: ts, level, msg + פיזור ההקשר
      const record: Record<string, unknown> = { ts, level, msg: message };
      if (ctx) {
        for (const [k, v] of Object.entries(ctx)) {
          // לא דורסים את שדות הליבה
          if (k === "ts" || k === "level" || k === "msg") continue;
          record[k] = v;
        }
      }
      write(safeStringify(record));
      return;
    }

    // פיתוח — פלט צבעוני קריא, עדיין עם הקשר מובנה
    const color = COLORS[level];
    const head = `${COLOR_DIM}${ts}${COLOR_RESET} ${color}${level.toUpperCase().padEnd(5)}${COLOR_RESET} ${message}`;
    if (ctx && Object.keys(ctx).length > 0) {
      write(`${head} ${COLOR_DIM}${safeStringify(ctx)}${COLOR_RESET}`);
    } else {
      write(head);
    }
  } catch {
    // גבול אחרון — לוגר לא מפיל את האפליקציה לעולם
  }
}

// ה-API הציבורי — חתימה אחידה לכל הרמות
export const log = {
  debug: (message: string, context?: Record<string, unknown>): void => emit("debug", message, context),
  info: (message: string, context?: Record<string, unknown>): void => emit("info", message, context),
  warn: (message: string, context?: Record<string, unknown>): void => emit("warn", message, context),
  error: (message: string, context?: Record<string, unknown>): void => emit("error", message, context),
};
