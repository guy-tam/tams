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

// --- כרטיסי אמון ---
const trustSignals = [
  {
    icon: Network,
    title: "Institutional Framework",
    description: "Multi-wallet architecture with risk isolation",
  },
  {
    icon: Shield,
    title: "Evidence-Based Selection",
    description: "125+ verified institutional relationships",
  },
  {
    icon: BarChart3,
    title: "Active Management",
    description: "Treasury + DeFi + Trading multi-engine model",
  },
  {
    icon: Lock,
    title: "Confidential Process",
    description: "Discreet review with dedicated relationship manager",
  },
];

// --- סוגי משקיעים ---
const investorTypes = [
  "Individual Investor",
  "Family Office",
  "Institutional Fund",
  "Corporate Treasury",
  "Wealth Advisor",
  "Other",
];

// --- טווחי השקעה ---
const investmentRanges = [
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $25M",
  "$25M+",
];

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
  options: string[];
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
            <option key={opt} value={opt} className="bg-[#0d1a30] text-white">
              {opt}
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

  // אימות טופס
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!investorType) {
      newErrors.investorType = "Please select an investor type";
    }
    if (!investmentRange) {
      newErrors.investmentRange = "Please select an investment range";
    }
    if (!accredited) {
      newErrors.accredited = "Please confirm your accredited investor status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // שליחת טופס
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // שמירה ב-localStorage
    const submission = {
      fullName,
      email,
      phone,
      investorType,
      investmentRange,
      message,
      accredited,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("tams-access-requests") || "[]"
      );
      existing.push(submission);
      localStorage.setItem("tams-access-requests", JSON.stringify(existing));
    } catch {
      // אם localStorage לא זמין, ממשיכים
    }

    // סימולציה של עיכוב רשת
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
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
              Private Capital Access
            </span>
          </motion.div>

          {/* כותרת ראשית */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Request Confidential Review</span>
          </motion.h1>

          {/* תת-כותרת */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            Exclusive access to TAMS institutional-grade digital asset strategy.
            A structured, research-backed framework designed for sophisticated
            allocators seeking exposure to blockchain infrastructure.
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
          {trustSignals.map((signal) => (
            <motion.div
              key={signal.title}
              variants={fadeUp}
              className="card-premium rounded-2xl p-6 hover-lift"
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-blue-500/10 flex items-center justify-center mb-4">
                <signal.icon className="size-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {signal.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {signal.description}
              </p>
            </motion.div>
          ))}
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
              Request Received
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Your request has been received. A member of our team will reach out
              within 48 hours for a confidential discussion.
            </p>
            <div className="divider-premium mb-6" />
            <p className="text-xs text-zinc-600">
              For immediate inquiries, please contact your designated relationship
              manager directly.
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
                Private Inquiry
              </h2>
              <p className="text-sm text-zinc-500">
                All information is treated with the highest level of confidentiality
              </p>
            </div>

            <div className="divider-premium mb-8" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* שורה ראשונה - שם ואימייל */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <PremiumInput
                  id="fullName"
                  label="Full Name"
                  placeholder="Your full name"
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
                  label="Email"
                  type="email"
                  placeholder="you@company.com"
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
                label="Phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={setPhone}
                icon={Phone}
              />

              {/* שורה שנייה - סוג משקיע וטווח */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <PremiumSelect
                  id="investorType"
                  label="Investor Type"
                  placeholder="Select type"
                  value={investorType}
                  onChange={(v) => {
                    setInvestorType(v);
                    if (errors.investorType) setErrors((prev) => ({ ...prev, investorType: "" }));
                  }}
                  options={investorTypes}
                  required
                  error={errors.investorType}
                />
                <PremiumSelect
                  id="investmentRange"
                  label="Investment Range"
                  placeholder="Select range"
                  value={investmentRange}
                  onChange={(v) => {
                    setInvestmentRange(v);
                    if (errors.investmentRange) setErrors((prev) => ({ ...prev, investmentRange: "" }));
                  }}
                  options={investmentRanges}
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
                  Area of Interest
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Brief message or area of interest..."
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
                    I confirm this inquiry is confidential and I am an accredited
                    investor or equivalent as defined by applicable securities
                    regulations.
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
                    Request Private Access
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
            This page does not constitute an offer to sell or a solicitation of an offer to
            buy any securities, tokens, or digital assets. TAMS is a concept application
            designed for demonstration purposes. No investment is being offered, and no
            funds are being raised through this application. All inquiries are treated
            confidentially and are subject to review. By submitting this form you agree
            to be contacted by a TAMS representative.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
