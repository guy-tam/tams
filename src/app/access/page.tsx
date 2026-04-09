"use client";

// דף גישה פרטית — בקשת גישה למשקיעים מוסדיים ובעלי הון
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Network,
  BarChart3,
  Lock,
  User,
  Mail,
  Phone,
  ChevronDown,
  Send,
  CheckCircle2,
} from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useLanguage } from "@/lib/i18n/context";

// --- אנימציות כניסה מדורגות ---
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// --- אייקונים לכרטיסי אמון ---
const trustIcons = [Network, Shield, BarChart3, Lock] as const;
const trustKeys = ["framework", "evidence", "management", "confidential"] as const;

// --- שדה קלט פרימיום ---
function PremiumInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon: Icon,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  icon: typeof User;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {label}
        {required && <span className="text-amber-500/70 ml-1">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.06] border text-white placeholder:text-zinc-600 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all
            ${error ? "border-red-500/40" : "border-amber-500/15"}`}
        />
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

// --- שדה בחירה פרימיום ---
function PremiumSelect({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
  required = false,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {label}
        {required && <span className="text-amber-500/70 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`w-full h-12 pl-4 pr-10 rounded-xl bg-white/[0.06] border text-sm appearance-none
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all
            ${value ? "text-white" : "text-zinc-600"}
            ${error ? "border-red-500/40" : "border-amber-500/15"}`}
        >
          <option value="" disabled className="bg-[#0d1a30] text-zinc-500">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0d1a30] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

// --- דף הגישה הפרטית ---
export default function AccessPage() {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [investorType, setInvestorType] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [message, setMessage] = useState("");
  const [accredited, setAccredited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // שדה מלכודת דבש — נסתר מהמשתמש, רק בוטים ימלאו אותו
  const [companyUrl, setCompanyUrl] = useState("");

  // אפשרויות מתורגמות
  const investorTypeOptions = [
    { value: "individual", label: t("access.investorTypes.individual") },
    { value: "familyOffice", label: t("access.investorTypes.familyOffice") },
    { value: "institutional", label: t("access.investorTypes.institutional") },
    { value: "corporate", label: t("access.investorTypes.corporate") },
    { value: "wealthAdvisor", label: t("access.investorTypes.wealthAdvisor") },
    { value: "other", label: t("access.investorTypes.other") },
  ];

  const investmentRangeOptions = [
    { value: "range1", label: t("access.investmentRanges.range1") },
    { value: "range2", label: t("access.investmentRanges.range2") },
    { value: "range3", label: t("access.investmentRanges.range3") },
    { value: "range4", label: t("access.investmentRanges.range4") },
    { value: "range5", label: t("access.investmentRanges.range5") },
  ];

  // אימות טופס
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = t("access.errors.fullName");
    }
    if (!email.trim()) {
      newErrors.email = t("access.errors.email");
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = t("access.errors.emailInvalid");
    }
    if (!investorType) {
      newErrors.investorType = t("access.errors.investorType");
    }
    if (!investmentRange) {
      newErrors.investmentRange = t("access.errors.investmentRange");
    }
    if (!accredited) {
      newErrors.accredited = t("access.errors.accredited");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // שליחת טופס
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    // מציאת הטקסט המתורגם לשליחה במייל
    const investorTypeLabel = investorTypeOptions.find(o => o.value === investorType)?.label ?? investorType;
    const investmentRangeLabel = investmentRangeOptions.find(o => o.value === investmentRange)?.label ?? investmentRange;

    const submission = {
      fullName,
      email,
      phone,
      investorType: investorTypeLabel,
      investmentRange: investmentRangeLabel,
      message,
      company_url: companyUrl, // שדה מלכודת דבש — נשלח ריק על ידי משתמשים אמיתיים
    };

    try {
      // שליחה ל-API שישלח מייל
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (res.status === 429) {
        setIsSubmitting(false);
        setSubmitError("יותר מדי בקשות. נסה שוב מאוחר יותר. / Too many requests. Please try again later.");
        return;
      }

      if (!res.ok) {
        throw new Error("API error");
      }

      // שמירה גם ב-localStorage כגיבוי
      try {
        const existing = JSON.parse(
          localStorage.getItem("tams-access-requests") || "[]"
        );
        existing.push({ ...submission, accredited, submittedAt: new Date().toISOString() });
        localStorage.setItem("tams-access-requests", JSON.stringify(existing));
      } catch {
        // אם localStorage לא זמין, ממשיכים
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setSubmitError(t("access.errors.submitFailed"));
    }
  };

  return (
    <PageWrapper bgGrid>
      <div className="flex flex-col items-center pt-8 sm:pt-16 pb-16">
        {/* --- אזור ההירו --- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* תג פרימיום */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest border border-amber-500/20 bg-amber-500/[0.06] text-amber-400">
              <Lock className="size-3" />
              {t("access.badge")}
            </span>
          </motion.div>

          {/* כותרת ראשית */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">{t("access.title")}</span>
          </motion.h1>

          {/* תת-כותרת */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            {t("access.subtitle")}
          </motion.p>
        </motion.div>

        {/* --- קו מפריד זהוב --- */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="divider-premium w-full max-w-4xl mb-16"
        />

        {/* --- כרטיסי אמון --- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full mb-16"
        >
          {trustKeys.map((key, i) => {
            const Icon = trustIcons[i];
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="card-premium rounded-2xl p-6 hover-lift"
              >
                <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-blue-500/10 flex items-center justify-center mb-4">
                  <Icon className="size-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  {t(`access.trustSignals.${key}.title`)}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {t(`access.trustSignals.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- קו מפריד זהוב --- */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          className="divider-premium w-full max-w-4xl mb-16"
        />

        {/* --- הטופס או הודעת אישור --- */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="card-ornate max-w-xl w-full p-10 text-center"
          >
            <div className="size-16 rounded-full bg-gradient-to-br from-amber-500/20 to-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="size-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {t("access.success.title")}
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              {t("access.success.message")}
            </p>
            <div className="divider-premium mb-6" />
            <p className="text-xs text-zinc-600">
              {t("access.success.note")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="card-ornate max-w-2xl w-full p-8 sm:p-10"
          >
            {/* כותרת הטופס */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white mb-2">
                {t("access.form.title")}
              </h2>
              <p className="text-sm text-zinc-500">
                {t("access.form.subtitle")}
              </p>
            </div>

            <div className="divider-premium mb-8" />

            {/* הודעת שגיאת שליחה */}
            {submitError && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* שדה מלכודת דבש — נסתר מהעין, בוטים ימלאו אותו אוטומטית */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
              >
                <label htmlFor="company_url">Company URL</label>
                <input
                  type="text"
                  id="company_url"
                  name="company_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                />
              </div>

              {/* שורה ראשונה - שם ואימייל */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <PremiumInput
                  id="fullName"
                  label={t("access.form.fullName")}
                  placeholder={t("access.form.fullNamePlaceholder")}
                  value={fullName}
                  onChange={(v) => {
                    setFullName(v);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  required
                  icon={User}
                  error={errors.fullName}
                />
                <PremiumInput
                  id="email"
                  label={t("access.form.email")}
                  type="email"
                  placeholder={t("access.form.emailPlaceholder")}
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  required
                  icon={Mail}
                  error={errors.email}
                />
              </div>

              {/* טלפון */}
              <PremiumInput
                id="phone"
                label={t("access.form.phone")}
                type="tel"
                placeholder={t("access.form.phonePlaceholder")}
                value={phone}
                onChange={setPhone}
                icon={Phone}
              />

              {/* שורה שנייה - סוג משקיע וטווח */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <PremiumSelect
                  id="investorType"
                  label={t("access.form.investorType")}
                  placeholder={t("access.form.investorTypePlaceholder")}
                  value={investorType}
                  onChange={(v) => {
                    setInvestorType(v);
                    if (errors.investorType) setErrors((prev) => ({ ...prev, investorType: "" }));
                  }}
                  options={investorTypeOptions}
                  required
                  error={errors.investorType}
                />
                <PremiumSelect
                  id="investmentRange"
                  label={t("access.form.investmentRange")}
                  placeholder={t("access.form.investmentRangePlaceholder")}
                  value={investmentRange}
                  onChange={(v) => {
                    setInvestmentRange(v);
                    if (errors.investmentRange) setErrors((prev) => ({ ...prev, investmentRange: "" }));
                  }}
                  options={investmentRangeOptions}
                  required
                  error={errors.investmentRange}
                />
              </div>

              {/* הודעה */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-zinc-400 uppercase tracking-wider"
                >
                  {t("access.form.areaOfInterest")}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("access.form.areaOfInterestPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-amber-500/15 text-white placeholder:text-zinc-600 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all resize-none"
                />
              </div>

              {/* קו מפריד */}
              <div className="divider-premium" />

              {/* אישור משקיע מוסמך */}
              <div className="space-y-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={accredited}
                      onChange={(e) => {
                        setAccredited(e.target.checked);
                        if (errors.accredited) setErrors((prev) => ({ ...prev, accredited: "" }));
                      }}
                      className="peer sr-only"
                    />
                    <div
                      className={`size-5 rounded-md border flex items-center justify-center transition-all
                        ${accredited
                          ? "bg-amber-500/20 border-amber-500/40"
                          : errors.accredited
                          ? "border-red-500/40 bg-white/[0.03]"
                          : "border-amber-500/15 bg-white/[0.03] group-hover:border-amber-500/30"
                        }`}
                    >
                      {accredited && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="size-3 text-amber-400"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 6l3 3 5-5" />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    {t("access.form.accreditedConfirm")}
                  </span>
                </label>
                {errors.accredited && (
                  <p className="text-xs text-red-400 ml-8">{errors.accredited}</p>
                )}
              </div>

              {/* כפתור שליחה */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white font-semibold text-sm
                  flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20
                  hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 hover:shadow-amber-500/30
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed py-3.5"
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
                    <Send className="size-4" />
                    {t("access.form.submit")}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* --- הצהרה תחתונה --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-2xl text-center mt-12"
        >
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            {t("access.disclaimer")}
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
