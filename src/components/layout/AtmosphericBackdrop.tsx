// רקע אמנותי-מוסדי — וידאו פרימיום של ארמון אירופי + שכבות גלריה מאופקות
// סדר עדיפות מקור (הראשון שעובד מנצח):
//   1. /video/estate-cinematic — Pexels CC0 — תקרת באר fresco מלכותית
//   2. /video/viking-cinematic  — קומפוזיציית ציורי Moran/Sinding
//   3. /video/viking-living-art — תאימות לאחור
//   4. ציור סטטי viking-hero-poster.jpg — fallback אחרון
// ה-grading מאופק במכוון: פחות וינייטה, פחות godray — מוזיאון, לא סצנה דרמטית

"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SOURCES = [
  { webm: "/video/estate-cinematic.webm", mp4: "/video/estate-cinematic.mp4" },
  { webm: "/video/viking-cinematic.webm", mp4: "/video/viking-cinematic.mp4" },
  { webm: "/video/viking-living-art.webm", mp4: "/video/viking-living-art.mp4" },
];

export default function AtmosphericBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => setVideoLoaded(true);
    const onError = () => {
      setSourceIndex((i) => (i < VIDEO_SOURCES.length - 1 ? i + 1 : i));
      setVideoLoaded(false);
    };

    v.addEventListener("canplaythrough", onCanPlay);
    v.addEventListener("error", onError);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      v.pause();
      setVideoLoaded(false);
    }
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) { v.pause(); setVideoLoaded(false); }
      else { v.play().catch(() => {}); }
    };
    mq.addEventListener("change", onMq);

    return () => {
      v.removeEventListener("canplaythrough", onCanPlay);
      v.removeEventListener("error", onError);
      mq.removeEventListener("change", onMq);
    };
  }, [sourceIndex]);

  const current = VIDEO_SOURCES[sourceIndex];

  return (
    <>
      {/* פוסטר סטטי — מובטח עד שהוידאו מתחיל */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-opacity duration-[2400ms] ease-out"
          style={{
            backgroundImage: "url(/art/viking-hero-poster.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 42%",
            opacity: videoLoaded ? 0 : 0.45,
            filter: "saturate(0.78) contrast(1.04) brightness(0.7)",
          }}
        />

        {/* הוידאו — עדיפות עליונה: estate-cinematic.mp4 (Pexels CC0) */}
        <video
          key={sourceIndex}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/art/viking-hero-poster.jpg"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2400ms] ease-out"
          style={{
            opacity: videoLoaded ? 0.48 : 0,
            // Color grade מאופק — מוזיאון, לא קולנוע פעולה
            filter: "saturate(0.82) contrast(1.06) brightness(0.74)",
          }}
        >
          <source src={current.webm} type="video/webm" />
          <source src={current.mp4} type="video/mp4" />
        </video>
      </div>

      {/* שכבת tint כחול-עמוק עדינה — מוסיפה ביטחון מוסדי */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(8, 16, 32, 0.20) 0%,
              rgba(6, 12, 28, 0.10) 40%,
              rgba(4, 10, 22, 0.55) 100%
            )
          `,
        }}
      />

      {/* וינייטה מאופקת — לא דרמטית */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 48%, transparent 32%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />

      {/* קריאות טיפוגרפית — דיסק כהה מתחת לכותרות */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 50% 52%, rgba(0, 0, 0, 0.28) 0%, transparent 70%)",
        }}
      />

      {/* מרקם בד דק — מוזיאון, לא Photoshop filter */}
      <div aria-hidden="true" className="atmosphere-layer opacity-60" />

      {/* קרן זהב עדינה מלמעלה — נוכחות בלי דרמה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 36% at 50% -10%, rgba(212, 168, 83, 0.10) 0%, transparent 60%)",
        }}
      />

      {/* מסגרת גלריה דקה — קו זהב כמעט בלתי נראה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-0 rounded-[2px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.10), inset 0 0 200px rgba(0, 0, 0, 0.42)",
        }}
      />
    </>
  );
}
