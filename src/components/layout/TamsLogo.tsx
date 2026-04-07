"use client";

// לוגו TAMS — עץ מוזהב קטן בפינה שמאלית עליונה, משתלב עם הרקע
import { motion } from "framer-motion";
import Image from "next/image";

interface TamsLogoProps {
  className?: string;
}

export default function TamsLogo({ className = "" }: TamsLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`absolute top-6 start-6 z-20 flex items-center gap-2.5 ${className}`}
    >
      {/* העץ המוזהב — mix-blend-mode מסיר את הרקע הכחול */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Image
          src="/tams-logo.png"
          alt="TAMS"
          width={36}
          height={36}
          className="mix-blend-lighten opacity-80 drop-shadow-[0_0_8px_rgba(212,168,83,0.2)]"
          priority
        />
      </motion.div>

      {/* טקסט TAMS */}
      <span
        className="text-sm font-semibold tracking-[0.12em] text-amber-400/70"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        TAMS
      </span>
    </motion.div>
  );
}
