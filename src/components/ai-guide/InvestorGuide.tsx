"use client";

// מדריך AI למשקיעים — כפתור צף + פאנל שיחה פרימיום
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
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { askGuide, getSuggestedQuestions, explainCurrentPage, type GuideResponse } from "@/lib/ai-guide";
import Link from "next/link";

// === סוגי נתונים ===

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  pages?: { route: string; name: string; nameHe: string }[];
  followUps?: string[];
}

// === רכיב ראשי ===

export default function InvestorGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { isRTL } = useLanguage();

  // גלילה אוטומטית להודעה האחרונה
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // פוקוס על שדה הקלט כשנפתח
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // שאלות מוצעות לפי עמוד
  const suggested = getSuggestedQuestions(pathname);
  const currentQuestions = isRTL ? suggested.he : suggested.en;

  // שליחת שאלה
  const handleSend = useCallback(
    (text?: string) => {
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

      // סימולציית השהייה קלה לתחושה טבעית
      setTimeout(() => {
        const response: GuideResponse = askGuide(query, pathname);
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
      }, 400);
    },
    [inputValue, pathname, isRTL]
  );

  // פעולה מהירה — הסבר העמוד הנוכחי
  const handleExplainPage = useCallback(() => {
    const response = explainCurrentPage(pathname);
    const answerText = isRTL ? response.answerHe : response.answer;
    const followUps = isRTL ? response.suggestedFollowUpHe : response.suggestedFollowUp;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: isRTL ? "מה אני רואה בעמוד הזה?" : "What am I seeing on this page?",
    };
    const assistantMsg: Message = {
      id: `a-${Date.now() + 1}`,
      role: "assistant",
      text: answerText,
      pages: response.relevantPages,
      followUps,
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  }, [pathname, isRTL]);

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
              bg-gradient-to-br from-amber-500/90 to-blue-600/90
              shadow-lg shadow-amber-500/20
              flex items-center justify-center
              hover:shadow-xl hover:shadow-amber-500/30
              hover:scale-105
              transition-all duration-200
              border border-amber-400/20
              backdrop-blur-sm`}
            aria-label="Open investor guide"
          >
            <Sparkles className="h-6 w-6 text-white" />
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
              w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-3rem)]
              rounded-2xl overflow-hidden
              bg-[#0b1a2e]/95 backdrop-blur-2xl
              border border-zinc-700/40
              shadow-2xl shadow-black/40
              flex flex-col`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* כותרת */}
            <div className="relative flex items-center justify-between px-5 py-4 border-b border-zinc-700/40 bg-gradient-to-r from-amber-500/5 to-blue-500/5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/80 to-blue-500/80 flex items-center justify-center">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {isRTL ? "מדריך משקיעים" : "Investor Guide"}
                  </h3>
                  <p className="text-[10px] text-zinc-400">
                    {isRTL ? "מבוסס על תוכן האתר" : "Powered by site knowledge"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700/40 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* אזור הודעות */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.length === 0 ? (
                <WelcomeView
                  isRTL={isRTL}
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
            <div className="px-4 py-3 border-t border-zinc-700/40 bg-[#0a1628]/80">
              <div className="flex items-center gap-2 bg-zinc-800/50 rounded-xl px-3 py-2 border border-zinc-700/30 focus-within:border-amber-500/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isRTL ? "שאל שאלה על האתר..." : "Ask about the site..."}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
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

// === תצוגת ברוכים הבאים ===

function WelcomeView({
  isRTL,
  suggestedQuestions,
  onAsk,
  onExplainPage,
}: {
  isRTL: boolean;
  suggestedQuestions: string[];
  onAsk: (q: string) => void;
  onExplainPage: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center pt-4">
      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-blue-500/20 border border-amber-500/10 flex items-center justify-center mb-4">
        <Sparkles className="h-7 w-7 text-amber-400" />
      </div>
      <h4 className="text-base font-semibold text-white mb-1">
        {isRTL ? "מדריך משקיעים TAMS" : "TAMS Investor Guide"}
      </h4>
      <p className="text-xs text-zinc-400 mb-5 max-w-[260px]">
        {isRTL
          ? "אני יכול להסביר כל עמוד, סעיף או מושג באתר. שאל אותי כל שאלה."
          : "I can explain any page, section, or concept on this site. Ask me anything."}
      </p>

      {/* פעולות מהירות */}
      <div className="w-full flex gap-2 mb-4">
        <button
          onClick={onExplainPage}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/15 hover:bg-amber-500/20 transition-colors"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {isRTL ? "מה בעמוד הזה?" : "What's on this page?"}
        </button>
        <button
          onClick={() => onAsk(isRTL ? "מאיפה להתחיל?" : "Where should I start?")}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/15 hover:bg-blue-500/20 transition-colors"
        >
          <Compass className="h-3.5 w-3.5" />
          {isRTL ? "הדרך אותי" : "Guide me"}
        </button>
      </div>

      {/* שאלות מוצעות */}
      <div className="w-full space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
          {isRTL ? "שאלות מוצעות" : "Suggested questions"}
        </p>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => onAsk(q)}
            className="w-full text-start rounded-lg px-3 py-2.5 text-xs text-zinc-300 bg-zinc-800/30 border border-zinc-700/20 hover:bg-zinc-800/60 hover:text-white hover:border-zinc-600/40 transition-all"
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
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-amber-500/15 to-blue-500/10 text-white border border-amber-500/10"
            : "bg-zinc-800/40 text-zinc-200 border border-zinc-700/20"
        }`}
      >
        {/* תוכן — עיבוד markdown בסיסי */}
        <div className="space-y-2">
          {message.text.split("\n").map((line, i) => {
            if (!line.trim()) return <div key={i} className="h-1" />;
            // כותרות bold
            const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
            // נקודות
            const bulletLine = boldLine.replace(/^• /, "");
            const isBullet = line.startsWith("• ");
            return (
              <p
                key={i}
                className={`${isBullet ? `${isRTL ? "pr-3" : "pl-3"} relative before:content-['•'] before:absolute ${isRTL ? "before:right-0" : "before:left-0"} before:text-amber-400` : ""}`}
                dangerouslySetInnerHTML={{ __html: isBullet ? bulletLine : boldLine }}
              />
            );
          })}
        </div>

        {/* קישורים לעמודים */}
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
                → {q}
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
