"use client";

// לוגו TAMS — עץ מוזהב מרחף, מערכת זהות ויזואלית אחידה לכל האתר
import { motion } from "framer-motion";
import Image from "next/image";

interface TamsLogoProps {
  /** sidebar = קטן בסיידבר ללא טקסט, page = פינת עמוד עם טקסט */
  variant?: "page" | "sidebar";
  className?: string;
}

export default function TamsLogo({ variant = "page", className = "" }: TamsLogoProps) {
  if (variant === "sidebar") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative shrink-0 ${className}`}
      >
        <Image
          src="/tams-logo.png"
          alt="TAMS"
          width={36}
          height={36}
          className="mix-blend-lighten opacity-90 drop-shadow-[0_0_6px_rgba(212,168,83,0.15)]"
          priority
        />
      </motion.div>
    );
  }

  // variant === "page" — לוגו פינתי מלא עם אנימציה פרימיום
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      className={`absolute top-5 start-5 z-20 flex items-center gap-3 ${className}`}
    >
      {/* העץ המוזהב — נשימה עדינה */}
      <motion.div
        animate={{
          y: [0, -2.5, 0, 2, 0],
          filter: [
            "drop-shadow(0 0 6px rgba(212,168,83,0.12))",
            "drop-shadow(0 0 10px rgba(212,168,83,0.2))",
            "drop-shadow(0 0 6px rgba(212,168,83,0.12))",
          ],
        }}
        transition={{
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          filter: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative"
      >
        <Image
          src="/tams-logo.png"
          alt="TAMS"
          width={34}
          height={34}
          className="mix-blend-lighten opacity-85"
          priority
        />
      </motion.div>

      {/* טקסט TAMS — זהב עדין */}
      <motion.span
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-[13px] font-semibold tracking-[0.14em] text-amber-400/60"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        TAMS
      </motion.span>
    </motion.div>
  );
}
