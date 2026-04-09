"use client";

// מדריך AI למשקיעים — GPT-powered + fallback ל-rule-based
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Compass,
  BookOpen,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { askGuide, getSuggestedQuestions, explainCurrentPage } from "@/lib/ai-guide";
import Link from "next/link";

// === סוגי נתונים ===

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  pages?: { route: string; name: string; nameHe: string }[];
  followUps?: string[];
}

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

// === רכיב ראשי ===

export default function InvestorGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useAI, setUseAI] = useState(true); // נסה AI קודם
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { isRTL } = useLanguage();

  // גלילה אוטומטית
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // פוקוס בפתיחה
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const suggested = getSuggestedQuestions(pathname);
  const currentQuestions = isRTL ? suggested.he : suggested.en;

  // שליחת שאלה דרך API
  const sendToAPI = useCallback(
    async (query: string, history: ConversationMessage[]): Promise<string | null> => {
      try {
        const res = await fetch("/api/guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...history, { role: "user", content: query }],
            currentRoute: pathname,
            lang: isRTL ? "he" : "en",
          }),
        });

        if (res.status === 501) {
          // אין API key — נפסיק לנסות
          setUseAI(false);
          return null;
        }

        if (!res.ok) return null;

        const data = await res.json();
        return data.reply || null;
      } catch {
        return null;
      }
    },
    [pathname, isRTL]
  );

  // שליחת שאלה
  const handleSend = useCallback(
    async (text?: string) => {
      const query = text ?? inputValue.trim();
      if (!query) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: query,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsTyping(true);

      if (useAI) {
        // נסה API
        const aiReply = await sendToAPI(query, conversationHistory);
        if (aiReply) {
          // הצלחה — עדכן היסטוריה ותציג
          const newHistory: ConversationMessage[] = [
            ...conversationHistory,
            { role: "user", content: query },
            { role: "assistant", content: aiReply },
          ];
          setConversationHistory(newHistory);

          // חלץ קישורים לעמודים מהתשובה
          const pageLinks = extractPageLinks(aiReply);

          const assistantMsg: Message = {
            id: `a-${Date.now()}`,
            role: "assistant",
            text: aiReply,
            pages: pageLinks,
          };
          setMessages((prev) => [...prev, assistantMsg]);
          setIsTyping(false);
          return;
        }
      }

      // Fallback ל-rule-based
      const response = askGuide(query, pathname);
      const answerText = isRTL ? response.answerHe : response.answer;
      const followUps = isRTL ? response.suggestedFollowUpHe : response.suggestedFollowUp;

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: answerText,
        pages: response.relevantPages,
        followUps,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    },
    [inputValue, pathname, isRTL, useAI, sendToAPI, conversationHistory]
  );

  // הסבר עמוד נוכחי
  const handleExplainPage = useCallback(async () => {
    const question = isRTL ? "מה אני רואה בעמוד הזה?" : "What am I seeing on this page?";
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: question,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (useAI) {
      const aiReply = await sendToAPI(question, conversationHistory);
      if (aiReply) {
        setConversationHistory((prev) => [
          ...prev,
          { role: "user", content: question },
          { role: "assistant", content: aiReply },
        ]);
        const assistantMsg: Message = {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: aiReply,
          pages: extractPageLinks(aiReply),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
        return;
      }
    }

    // Fallback
    const response = explainCurrentPage(pathname);
    const answerText = isRTL ? response.answerHe : response.answer;
    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      text: answerText,
      pages: response.relevantPages,
      followUps: isRTL ? response.suggestedFollowUpHe : response.suggestedFollowUp,
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  }, [pathname, isRTL, useAI, sendToAPI, conversationHistory]);

  // ניקוי שיחה
  const handleClear = useCallback(() => {
    setMessages([]);
    setConversationHistory([]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* כפתור צף */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} z-50
              h-14 w-14 rounded-full
              bg-gradient-to-br from-amber-400/90 via-amber-500 to-blue-600/80
              shadow-lg shadow-amber-500/25
              flex items-center justify-center
              hover:shadow-xl hover:shadow-amber-400/35
              hover:scale-110
              transition-all duration-300
              border border-amber-300/30
              backdrop-blur-sm`}
            aria-label="Open investor guide"
          >
            <Sparkles className="h-6 w-6 text-white drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* פאנל שיחה */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} z-50
              w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)]
              sm:w-[400px] sm:h-[600px]
              rounded-2xl overflow-hidden
              bg-[#0b1a2e]/97 backdrop-blur-2xl
              border border-zinc-700/30
              shadow-2xl shadow-black/50
              ring-1 ring-amber-500/5
              flex flex-col`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* כותרת */}
            <div className="relative flex items-center justify-between px-5 py-4 border-b border-amber-500/10 bg-gradient-to-r from-amber-500/[0.06] via-transparent to-blue-600/[0.06]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-blue-500 shadow-md shadow-amber-500/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {isRTL ? "מדריך משקיעים" : "Investor Guide"}
                  </h3>
                  <p className="text-[10px] text-zinc-400">
                    {useAI
                      ? (isRTL ? "שיחה חופשית מבוססת AI" : "AI-powered free conversation")
                      : (isRTL ? "מבוסס על תוכן האתר" : "Powered by site knowledge")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-700/40 transition-colors"
                    title={isRTL ? "נקה שיחה" : "Clear chat"}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700/40 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* אזור הודעות */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.length === 0 ? (
                <WelcomeView
                  isRTL={isRTL}
                  isAI={useAI}
                  suggestedQuestions={currentQuestions}
                  onAsk={handleSend}
                  onExplainPage={handleExplainPage}
                />
              ) : (
                <>
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      isRTL={isRTL}
                      onFollowUp={handleSend}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* שורת קלט */}
            <div className="px-4 py-3 border-t border-amber-500/10 bg-gradient-to-t from-[#0a1628]/90 to-[#0b1a2e]/60">
              <div className="flex items-center gap-2 bg-zinc-800/40 rounded-xl px-3 py-2.5 border border-zinc-700/25 focus-within:border-amber-500/30 focus-within:ring-1 focus-within:ring-amber-500/10 transition-all duration-300">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isRTL ? "שאל כל שאלה על האתר..." : "Ask anything about the site..."}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-amber-400 hover:bg-amber-500/10 disabled:text-zinc-600 disabled:hover:bg-transparent transition-colors"
                >
                  <Send className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// === חילוץ קישורי עמודים מתשובת AI ===

const PAGE_ROUTES: Record<string, { name: string; nameHe: string }> = {
  "/": { name: "Home", nameHe: "דף הבית" },
  "/company": { name: "Company", nameHe: "חברה" },
  "/architecture": { name: "Architecture", nameHe: "ארכיטקטורה" },
  "/holdings": { name: "Holdings", nameHe: "החזקות" },
  "/defi": { name: "DeFi", nameHe: "DeFi" },
  "/market-shift": { name: "Market Shift", nameHe: "מהפך שוק" },
  "/strategy": { name: "Strategy", nameHe: "אסטרטגיה" },
  "/proof": { name: "Proof", nameHe: "הוכחות" },
  "/investor": { name: "Investor", nameHe: "משקיעים" },
  "/team": { name: "Team", nameHe: "צוות" },
  "/methodology": { name: "Methodology", nameHe: "מתודולוגיה" },
  "/faq": { name: "FAQ", nameHe: "שאלות נפוצות" },
  "/legal": { name: "Legal", nameHe: "משפטי" },
  "/access": { name: "Access", nameHe: "גישה פרטית" },
  "/dashboard": { name: "Dashboard", nameHe: "דשבורד" },
};

function extractPageLinks(text: string): { route: string; name: string; nameHe: string }[] {
  const found: { route: string; name: string; nameHe: string }[] = [];
  const seen = new Set<string>();

  for (const [route, info] of Object.entries(PAGE_ROUTES)) {
    if (route === "/") continue; // דלג על home — נפוץ מדי
    if (text.includes(`(${route})`) || text.includes(route)) {
      if (!seen.has(route)) {
        seen.add(route);
        found.push({ route, ...info });
      }
    }
  }

  return found.slice(0, 4);
}

// === תצוגת ברוכים הבאים ===

function WelcomeView({
  isRTL,
  isAI,
  suggestedQuestions,
  onAsk,
  onExplainPage,
}: {
  isRTL: boolean;
  isAI: boolean;
  suggestedQuestions: string[];
  onAsk: (q: string) => void;
  onExplainPage: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center pt-6">
      <div className="relative h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
        <Sparkles className="h-6 w-6 text-zinc-400" />
      </div>
      <h4 className="text-base font-semibold text-white mb-1.5 tracking-wide">
        {isRTL ? "מדריך משקיעים TAMS" : "TAMS Investor Guide"}
      </h4>
      <p className="text-xs text-zinc-400 mb-6 max-w-[280px] leading-relaxed">
        {isAI
          ? (isRTL
            ? "שאל אותי כל שאלה על האתר, האסטרטגיה, התיק או ההשקעה. אני מבין את כל התוכן באתר."
            : "Ask me anything about the site, strategy, portfolio, or investment. I understand all the site content.")
          : (isRTL
            ? "אני יכול להסביר כל עמוד, סעיף או מושג באתר."
            : "I can explain any page, section, or concept on this site.")}
      </p>

      {/* פעולות מהירות */}
      <div className="w-full flex gap-2 mb-4">
        <button
          onClick={onExplainPage}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-400"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {isRTL ? "מה בעמוד הזה?" : "What's on this page?"}
        </button>
        <button
          onClick={() => onAsk(isRTL ? "מאיפה להתחיל?" : "Where should I start?")}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-400"
        >
          <Compass className="h-3.5 w-3.5" />
          {isRTL ? "הדרך אותי" : "Guide me"}
        </button>
      </div>

      {/* שאלות מוצעות */}
      <div className="w-full space-y-2">
        <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500/80 mb-3 font-medium">
          {isRTL ? "שאלות מוצעות" : "Suggested questions"}
        </p>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => onAsk(q)}
            className="w-full text-start rounded-xl px-3.5 py-3 text-xs text-zinc-400 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:text-zinc-200 hover:border-white/[0.1] transition-all duration-400"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// === בועת הודעה ===

function MessageBubble({
  message,
  isRTL,
  onFollowUp,
}: {
  message: Message;
  isRTL: boolean;
  onFollowUp: (q: string) => void;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-white/[0.06] text-white border border-white/[0.08]"
            : "bg-white/[0.02] text-zinc-300 border border-white/[0.05]"
        }`}
      >
        {/* תוכן — עיבוד markdown בסיסי */}
        <div className="space-y-1.5">
          {message.text.split("\n").map((line, i) => {
            if (!line.trim()) return <div key={i} className="h-1" />;
            const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
            const bulletLine = boldLine.replace(/^• /, "").replace(/^- /, "");
            const isBullet = line.startsWith("• ") || line.startsWith("- ");
            return (
              <p
                key={i}
                className={`${isBullet ? `${isRTL ? "pr-3" : "pl-3"} relative before:content-['•'] before:absolute ${isRTL ? "before:right-0" : "before:left-0"} before:text-amber-400` : ""}`}
                dangerouslySetInnerHTML={{ __html: isBullet ? bulletLine : boldLine }}
              />
            );
          })}
        </div>

        {/* קישורים */}
        {message.pages && message.pages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {message.pages.map((page) => (
              <Link
                key={page.route}
                href={page.route}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/15 hover:bg-blue-500/20 transition-colors"
              >
                <ChevronLeft className={`h-3 w-3 ${isRTL ? "" : "rotate-180"}`} />
                {isRTL ? page.nameHe : page.name}
              </Link>
            ))}
          </div>
        )}

        {/* שאלות המשך */}
        {message.followUps && message.followUps.length > 0 && (
          <div className="mt-3 space-y-1">
            {message.followUps.slice(0, 3).map((q) => (
              <button
                key={q}
                onClick={() => onFollowUp(q)}
                className="block w-full text-start rounded-md px-2.5 py-1.5 text-[11px] text-zinc-400 hover:text-white hover:bg-zinc-700/30 transition-colors"
              >
                {isRTL ? "← " : "→ "}{q}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// === אינדיקטור הקלדה ===

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-zinc-800/40 rounded-2xl px-4 py-3 border border-zinc-700/20">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            className="h-1.5 w-1.5 rounded-full bg-amber-400"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            className="h-1.5 w-1.5 rounded-full bg-amber-400"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            className="h-1.5 w-1.5 rounded-full bg-amber-400"
          />
        </div>
      </div>
    </div>
  );
}
