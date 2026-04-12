// גיבוב ואימות סיסמאות באמצעות PBKDF2-SHA256 דרך Web Crypto
// תואם edge runtime — אינו תלוי ב-Node APIs (כגון node:crypto)

// פרמטרים — 100K iterations הוא מינימום סביר ל-PBKDF2-SHA256
const ITERATIONS = 100_000;
const SALT_BYTES = 16;
const KEY_BYTES = 32;
const ALGO_LABEL = "pbkdf2-sha256";

// מגבלת אורך כדי למנוע DoS — גיבוב של סיסמאות ענקיות יקר
const MAX_PLAINTEXT_LENGTH = 200;

// --- עזרים לקידוד Base64URL תואם edge ---

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? 0 : 4 - (input.length % 4);
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// השוואה בזמן קבוע למניעת timing attacks
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// --- ליבת PBKDF2 ---

async function derive(
  plaintext: string,
  salt: Uint8Array,
  iterations: number,
  keyBytes: number
): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(plaintext),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    baseKey,
    keyBytes * 8
  );
  return new Uint8Array(bits);
}

// --- API ציבורי ---

/**
 * מגבב סיסמה ומחזיר מחרוזת עצמית-מוכלת:
 * pbkdf2-sha256$<iterations>$<saltB64url>$<hashB64url>
 */
export async function hashPassword(plaintext: string): Promise<string> {
  if (typeof plaintext !== "string") {
    throw new Error("password must be a string");
  }
  if (plaintext.length > MAX_PLAINTEXT_LENGTH) {
    throw new Error("password too long");
  }

  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await derive(plaintext, salt, ITERATIONS, KEY_BYTES);

  return `${ALGO_LABEL}$${ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(hash)}`;
}

/**
 * מאמת סיסמה מול מחרוזת גיבוב מאוחסנת.
 * מחזיר true רק אם האלגוריתם תואם, הפרמטרים ניתנים לפירוק,
 * וההשוואה שווה בזמן קבוע.
 */
export async function verifyPassword(
  plaintext: string,
  stored: string
): Promise<boolean> {
  if (typeof plaintext !== "string" || typeof stored !== "string") return false;
  if (plaintext.length > MAX_PLAINTEXT_LENGTH) return false;

  const parts = stored.split("$");
  if (parts.length !== 4) return false;

  const [algo, iterStr, saltB64, hashB64] = parts;
  if (algo !== ALGO_LABEL) return false;

  const iterations = Number.parseInt(iterStr, 10);
  if (!Number.isFinite(iterations) || iterations <= 0 || iterations > 10_000_000) {
    return false;
  }

  let salt: Uint8Array;
  let expected: Uint8Array;
  try {
    salt = fromBase64Url(saltB64);
    expected = fromBase64Url(hashB64);
  } catch {
    return false;
  }

  if (salt.length === 0 || expected.length === 0) return false;

  const actual = await derive(plaintext, salt, iterations, expected.length);
  return constantTimeEqual(actual, expected);
}
