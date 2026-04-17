// ציור חי רב-שכבתי — ספינות ויקינג נושמות בתוך עולם ציורי
// קומפוזיציה של Moran + Turner + Lorrain ממוזגים בסרטון אחד
// מעליו: שכבות אטמוספרה, מרקם בד, קרני אור, וינייטה עמוקה
// התוצאה: יצירת מופת חיה שמגדירה את כל החוויה הויזואלית

"use client";

import { useEffect, useRef, useState } from "react";

export default function AtmosphericBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => setVideoLoaded(true);
    v.addEventListener("canplaythrough", onCanPlay);

    // Reduce motion preference — pause video, show static painting
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      v.pause();
      setVideoLoaded(false);
    }
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) { v.pause(); setVideoLoaded(false); }
      else { v.play(); }
    };
    mq.addEventListener("change", onChange);

    return () => {
      v.removeEventListener("canplaythrough", onCanPlay);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <>
      {/* ═══ שכבה 0: סרטון ציור חי ═══
          קומפוזיציה רב-שכבתית: Viking Armada + Turner + Lorrain
          ממוזגים יחד עם Ken Burns, גרדציית צבע כחול-זהב, לולאה חלקה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3000ms] ease-out"
          style={{
            opacity: videoLoaded ? 0.58 : 0,
            filter: "saturate(0.85) contrast(1.05) brightness(0.78)",
          }}
        >
          <source src="/video/viking-living-art.webm" type="video/webm" />
          <source src="/video/viking-living-art.mp4" type="video/mp4" />
        </video>

        {/* Fallback סטטי — ציור Moran, נראה תמיד עד שהוידאו נטען */}
        <div
          className="absolute inset-0 transition-opacity duration-[3000ms] ease-out"
          style={{
            backgroundImage: "url(/art/viking-armada-moran.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: videoLoaded ? 0 : 0.55,
            filter: "saturate(0.85) contrast(1.05) brightness(0.78)",
          }}
        />
      </div>

      {/* ═══ שכבה 1: וינייטה כפולה — מחשיכה קצוות ומרכזת מבט ═══
          גרדיאנט רדיאלי + גרדיאנט ליניארי מלמטה — עומק תיאטרלי */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 105% 85% at 50% 42%, transparent 30%, rgba(0, 0, 0, 0.65) 100%),
            linear-gradient(to top, rgba(6, 12, 28, 0.5) 0%, transparent 35%)
          `,
        }}
      />

      {/* ═══ שכבה 2: דגן פיגמנט + קרני אור ═══
          מרקם בד ציור אמיתי מעל — נותן תחושת ציור שמן */}
      <div aria-hidden="true" className="atmosphere-layer" />

      {/* ═══ שכבה 3: זוהר זהוב עליון — godray אלגנטי ═══ */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% -8%, rgba(212, 168, 83, 0.16) 0%, transparent 55%)",
        }}
      />

      {/* ═══ שכבה 4: מסגרת גלריה ═══
          קו זהב דק + צל פנימי עמוק — כמו ציור בגלריה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-0 rounded-[3px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.15), inset 0 0 220px rgba(0, 0, 0, 0.45)",
        }}
      />
    </>
  );
}
