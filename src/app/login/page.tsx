"use client";

// דף התחברות פרימיום - פורטל משקיעים TAMS
import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  BarChart3,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";

// --- כדורים צפים לרקע ---

function FloatingOrb({
  size,
  color,
  x,
  y,
  delay,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -20, 0, 20, 0],
        x: [0, 15, 0, -15, 0],
        scale: [1, 1.08, 1, 0.92, 1],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        delay,
        ease: "easeInOut" as const,
      }}
    />
  );
}

// --- כרטיס סטטיסטיקה ---

function StatCard({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: typeof Shield;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" as const }}
      className="glass rounded-xl px-5 py-4 flex items-center gap-4"
    >
      <div className="size-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-amber-500/15 flex items-center justify-center shrink-0">
        <Icon className="size-5 text-amber-400" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

// --- דף ההתחברות ---

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  // אם המשתמש כבר מחובר, מפנים לדשבורד
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // שליחת טופס ההתחברות
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // בדיקת תקינות אימייל בסיסית
    if (!email.includes("@")) {
      setError(t("login.errorEmail"));
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError(t("login.errorCredentials"));
      }
    } catch {
      setError(t("login.errorGeneral"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // מילוי אוטומטי של פרטי דמו
  const fillDemo = () => {
    setEmail("demo@tams.io");
    setPassword("demo1234");
    setError("");
  };

  // מצב טעינה ראשוני
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          className="size-8 rounded-full border-2 border-amber-200/40 border-t-tams-blue"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear" as const,
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* --- צד שמאל: מיתוג ואינפורמציה (דסקטופ בלבד) --- */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col justify-between p-12">
        {/* רקע גראדיינט */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1a30] to-[#091225]" />

        {/* גריד רקע */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* כדורים צפים */}
        <FloatingOrb
          size={400}
          color="radial-gradient(circle, #3b82f6, transparent)"
          x="5%"
          y="15%"
          delay={0}
        />
        <FloatingOrb
          size={300}
          color="radial-gradient(circle, #d4a853, transparent)"
          x="55%"
          y="5%"
          delay={2}
        />
        <FloatingOrb
          size={350}
          color="radial-gradient(circle, #2563eb, transparent)"
          x="60%"
          y="55%"
          delay={4}
        />

        {/* תוכן עליון - לוגו וכותרת */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="flex items-center gap-4 mb-16"
          >
            {/* לוגו T */}
            <div className="size-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl tracking-tight">TAMS</h2>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Token Asset Management
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" as const }}
          >
            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">Investor Portal</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Access your tokenized asset portfolio with real-time blockchain
              monitoring and institutional-grade analytics.
            </p>
          </motion.div>
        </div>

        {/* כרטיסי סטטיסטיקה */}
        <div className="relative z-10 space-y-3 max-w-sm">
          <StatCard
            icon={BarChart3}
            value="16 Assets Tracked"
            label="Cross-chain portfolio monitoring"
            delay={0.6}
          />
          <StatCard
            icon={Wallet}
            value="4 Wallet Divisions"
            label="Institutional fund structure"
            delay={0.8}
          />
          <StatCard
            icon={Shield}
            value="Real-Time Monitoring"
            label="Blockchain-verified transactions"
            delay={1.0}
          />
        </div>

        {/* הצהרה תחתונה */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="relative z-10"
        >
          <p className="text-xs text-muted-foreground/50">
            Concept Application &mdash; Demo Access
          </p>
        </motion.div>
      </div>

      {/* --- צד ימין: טופס התחברות --- */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6 sm:p-12 relative">
        {/* רקע עדין למובייל */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-background to-background" />
          <FloatingOrb
            size={250}
            color="radial-gradient(circle, #3b82f6, transparent)"
            x="10%"
            y="10%"
            delay={0}
          />
          <FloatingOrb
            size={200}
            color="radial-gradient(circle, #d4a853, transparent)"
            x="60%"
            y="60%"
            delay={3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="w-full max-w-md relative z-10"
        >
          {/* לוגו במובייל */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-white font-bold text-lg">TAMS</span>
          </div>

          {/* כרטיס הטופס */}
          <div className="rounded-2xl p-8 bg-[rgba(30,50,80,0.4)] backdrop-blur-xl border border-amber-200/40">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access the investor portal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* שדה אימייל */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@company.com"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-amber-50/30 border border-amber-200/40 text-white placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* שדה סיסמה */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-10 pr-11 rounded-lg bg-amber-50/30 border border-amber-200/40 text-white placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* הודעת שגיאה */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}

              {/* כפתור התחברות */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 font-semibold text-sm flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div
                    className="size-5 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear" as const,
                    }}
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            {/* מפריד */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[rgba(255,255,255,0.06)] px-3 text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            {/* כפתור גישת דמו */}
            <button
              type="button"
              onClick={fillDemo}
              className="w-full h-11 rounded-lg border border-amber-200/40 bg-amber-50/30 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-amber-50/50 transition-colors"
            >
              <Shield className="size-4 text-blue-400" />
              Demo Access
            </button>

            <p className="text-xs text-muted-foreground/50 text-center mt-6">
              This is a concept application. Use &quot;Demo Access&quot; for quick entry.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
