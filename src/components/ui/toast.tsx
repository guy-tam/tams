"use client";

// מערכת התראות טוסט - עם אנימציות, תמיכה ב-RTL וסגנון glass morphism
import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// סוגי התראות
type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

// פונקציית טוסט שנחשפת דרך ה-hook
interface ToastFn {
  (message: string, type?: ToastType): void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

interface ToastContextValue {
  toast: ToastFn;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// מספר מרבי של התראות שמוצגות בו-זמנית
const MAX_TOASTS = 5;

// משך הצגה אוטומטי במילישניות
const AUTO_DISMISS_MS = 4000;

// צבעים ואייקונים לפי סוג ההתראה
const toastConfig: Record<
  ToastType,
  {
    icon: typeof CheckCircle;
    borderColor: string;
    iconColor: string;
    bgTint: string;
  }
> = {
  success: {
    icon: CheckCircle,
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    bgTint: "bg-emerald-500/5",
  },
  error: {
    icon: XCircle,
    borderColor: "border-red-500/30",
    iconColor: "text-red-400",
    bgTint: "bg-red-500/5",
  },
  info: {
    icon: Info,
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    bgTint: "bg-blue-500/5",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    bgTint: "bg-amber-500/5",
  },
};

// רכיב טוסט בודד
function ToastCard({
  item,
  onClose,
  isRTL,
}: {
  item: ToastItem;
  onClose: () => void;
  isRTL: boolean;
}) {
  const { t } = useLanguage();
  const config = toastConfig[item.type];
  const Icon = config.icon;

  // כיוון הכניסה - מימין ב-LTR, משמאל ב-RTL
  const slideX = isRTL ? -80 : 80;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: slideX, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: slideX, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`
        pointer-events-auto relative flex items-start gap-3
        rounded-xl border px-4 py-3
        ${config.borderColor} ${config.bgTint}
        backdrop-blur-xl shadow-2xl shadow-black/20
        min-w-[280px] max-w-[380px]
      `}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        border: undefined, // נדרס ע"י ה-className
      }}
    >
      {/* אייקון סוג ההתראה */}
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconColor}`} />

      {/* תוכן ההודעה */}
      <p className="flex-1 text-sm leading-relaxed text-zinc-200">
        {item.message}
      </p>

      {/* כפתור סגירה */}
      <button
        type="button"
        onClick={onClose}
        className="mt-0.5 shrink-0 rounded-md p-0.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        aria-label={t("aria.closeNotification")}
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// ספק הטוסטים - עוטף את האפליקציה ומנהל את המצב
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const { isRTL, t } = useLanguage();

  // הסרת טוסט לפי מזהה
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // הוספת טוסט חדש
  const addToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => {
        // שמירה על מספר מרבי של התראות
        const next = [...prev, { id, type, message }];
        return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next;
      });

      // סגירה אוטומטית לאחר זמן קצוב
      setTimeout(() => removeToast(id), AUTO_DISMISS_MS);
    },
    [removeToast],
  );

  // בניית אובייקט הטוסט עם פונקציות נוחות
  const toast = useCallback(
    (message: string, type?: ToastType) => addToast(message, type),
    [addToast],
  ) as ToastFn;

  toast.success = useCallback(
    (msg: string) => addToast(msg, "success"),
    [addToast],
  );
  toast.error = useCallback(
    (msg: string) => addToast(msg, "error"),
    [addToast],
  );
  toast.info = useCallback(
    (msg: string) => addToast(msg, "info"),
    [addToast],
  );
  toast.warning = useCallback(
    (msg: string) => addToast(msg, "warning"),
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* מיכל ההתראות - ממוקם בפינה התחתונה */}
      {/* נגישות: אזור live לקוראי מסך כך שהתראות חדשות יוקראו */}
      <div
        role="region"
        aria-live="polite"
        aria-label={t("aria.notifications")}
        className={`pointer-events-none fixed bottom-4 z-[9999] flex flex-col-reverse gap-2 ${
          isRTL ? "left-4" : "right-4"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <ToastCard
              key={item.id}
              item={item}
              onClose={() => removeToast(item.id)}
              isRTL={isRTL}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// hook לשימוש בטוסט מכל רכיב באפליקציה
export function useToast(): ToastFn {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast חייב להיות בתוך ToastProvider");
  }
  return ctx.toast;
}
