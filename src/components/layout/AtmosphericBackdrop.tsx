// רקע אטמוספרי route-aware — קליל, מאוחד, זורם
// סלוט יחיד · color-grade זהוב מאוחד לכל הסביבות → 5 חלונות לאותו עולם
// fade in קצר על canplay · fade out על route change

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// כל ה-routes חולקים אותו color-grade — זה מה שהופך את 5 הסרטונים לעולם אחד
const UNIFIED_FILTER = "saturate(0.62) contrast(1.05) brightness(0.62) sepia(0.18)";

const VIDEO_FOR_PATH: Array<{ test: (p: string) => boolean; src: string }> = [
  { test: (p) => p.startsWith("/architecture") || p.startsWith("/methodology"), src: "/video/library-cinematic.mp4" },
  { test: (p) => p.startsWith("/strategy") || p.startsWith("/market-shift") || p.startsWith("/defi"), src: "/video/ocean-cinematic.mp4" },
  { test: (p) => p.startsWith("/proof") || p.startsWith("/holdings") || p.startsWith("/dashboard"), src: "/video/skyline-cinematic.mp4" },
  { test: (p) => p.startsWith("/investor") || p.startsWith("/access") || p.startsWith("/login") || p.startsWith("/company") || p.startsWith("/team"), src: "/video/chamber-cinematic.mp4" },
  // homepage + everything else
  { test: () => true, src: "/video/estate-cinematic.mp4" },
];

function videoForPath(pathname: string): string {
  return VIDEO_FOR_PATH.find((v) => v.test(pathname))!.src;
}

export default function AtmosphericBackdrop() {
  const pathname = usePathname() ?? "/";
  const src = useMemo(() => videoForPath(pathname), [pathname]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  // החלפת מקור — fade out, החלפה, fade in על canplay
  useEffect(() => {
    setVisible(false);
    const v = videoRef.current;
    if (!v) return;
    // נטען מחדש את המקור החדש
    v.load();
  }, [src]);

  // reduce-motion
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = (matches: boolean) => {
      if (matches) { v.pause(); setVisible(false); }
      else { v.play().catch(() => {}); }
    };
    apply(mq.matches);
    const onMq = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  return (
    <>
      {/* רקע בסיסי — תמונה דהויה כשהוידאו עוד לא נטען */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/art/turner-temeraire.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 42%",
            opacity: 0.18,
            filter: UNIFIED_FILTER,
          }}
        />

        {/* וידאו יחיד — מקור משתנה לפי route, מתעמעם 600ms */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlay={() => setVisible(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: visible ? 0.34 : 0,
            transition: "opacity 700ms cubic-bezier(0.19, 1, 0.22, 1)",
            filter: UNIFIED_FILTER,
            willChange: "opacity",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* שכבה יחידה: tint + וינייטה משולבים — קליל */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 130% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%),
            linear-gradient(180deg, rgba(8,16,32,0.20) 0%, rgba(4,10,22,0.55) 100%)
          `,
        }}
      />

      {/* קרן זהב עדינה מלמעלה — נוכחות מוסדית */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 36% at 50% -8%, rgba(212, 168, 83, 0.10) 0%, transparent 60%)",
        }}
      />

      {/* מסגרת גלריה דקה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-0 rounded-[2px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.10), inset 0 0 180px rgba(0, 0, 0, 0.38)",
        }}
      />
    </>
  );
}
