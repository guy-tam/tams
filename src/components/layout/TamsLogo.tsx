"use client";

// לוגו TAMS — עץ מוזהב מרחף עם מסגרת זהב
import { motion } from "framer-motion";
import Image from "next/image";

interface TamsLogoProps {
  /** גודל: sm לסיידבר, md לעמוד, lg להירו */
  size?: "sm" | "md" | "lg";
  /** הצגת טקסט TAMS מתחת */
  showText?: boolean;
  /** מחלקות נוספות */
  className?: string;
}

const sizes = {
  sm: { image: 40, text: "text-sm" },
  md: { image: 80, text: "text-xl" },
  lg: { image: 140, text: "text-3xl" },
};

export default function TamsLogo({
  size = "md",
  showText = true,
  className = "",
}: TamsLogoProps) {
  const s = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      {/* עץ מוזהב עם זוהר */}
      <div className="relative">
        {/* זוהר רקע */}
        <div
          className="absolute inset-0 blur-2xl rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(212, 168, 83, 0.4) 0%, transparent 70%)",
            transform: "scale(1.5)",
          }}
        />
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/tams-logo.png"
            alt="TAMS — Golden Tree"
            width={s.image}
            height={s.image}
            className="relative z-10 drop-shadow-[0_0_15px_rgba(212,168,83,0.25)]"
            priority
          />
        </motion.div>
      </div>

      {/* טקסט TAMS במסגרת זהובה */}
      {showText && size !== "sm" && (
        <div className="relative">
          <span
            className={`${s.text} font-bold tracking-[0.15em] gradient-text-premium`}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            TAMS
          </span>
        </div>
      )}
    </motion.div>
  );
}
