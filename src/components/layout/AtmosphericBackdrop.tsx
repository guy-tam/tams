// ציור חי רב-שכבתי — ספינות ויקינג בים, ממוזגות בעולם ציורי מחוצרף
// סדר עדיפויות של מקור וידאו:
//   1. /video/viking-hero.{webm,mp4}  — קובץ Pixabay/Pexels כשמפילים ידנית (עדיפות עליונה)
//   2. /video/viking-cinematic.{webm,mp4} — קומפוזיציה מקומית של ציורי Moran + Sinding
//   3. /video/viking-living-art.{webm,mp4} — הקומפוזיציה הישנה (תאימות לאחור)
//   4. ציור סטטי viking-hero-poster.jpg — fallback אחרון
// מעליו: וינייטה, קרני אור, מסגרת גלריה, מרקם בד — הכל כדי שהוידאו יראה כיצירת מוזיאון ולא stock footage

"use client";

import { useEffect, useRef, useState } from "react";

// נתיבי וידאו מועדפים — ניסיון בסדר יורד עד שמוצאים אחד שמתנגן
const VIDEO_SOURCES = [
  { webm: "/video/viking-hero.webm", mp4: "/video/viking-hero.mp4" },
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
      // הקובץ הנוכחי לא זמין — נסה את הבא בסדר
      setSourceIndex((i) => (i < VIDEO_SOURCES.length - 1 ? i + 1 : i));
      setVideoLoaded(false);
    };

    v.addEventListener("canplaythrough", onCanPlay);
    v.addEventListener("error", onError);

    // reduce-motion — להקפיא את הוידאו, להישאר עם הפוסטר הסטטי
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
      {/* ═══ שכבה 0a: פוסטר סטטי — נראה תמיד עד שהוידאו מתחיל (ואם אין וידאו כלל) ═══ */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-opacity duration-[2400ms] ease-out"
          style={{
            backgroundImage: "url(/art/viking-hero-poster.jpg), url(/art/viking-armada-moran.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 42%",
            opacity: videoLoaded ? 0 : 0.62,
            filter:
              "saturate(0.86) contrast(1.08) brightness(0.78) hue-rotate(-4deg)",
          }}
        />

        {/* ═══ שכבה 0b: הוידאו עצמו ═══
            עדיפות: viking-hero (Pixabay) → viking-cinematic → viking-living-art.
            ה-key גורם לטעינה מחדש כשסוג המקור משתנה אחרי onError. */}
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
            opacity: videoLoaded ? 0.62 : 0,
            // Color grade בשכבת CSS — כחול עמוק יותר, זהב חם יותר, ניגוד פרימיום
            // ה-color-grade המרכזי כבר אפוי ב-mp4 עצמו; זה הליטוש העליון
            filter:
              "saturate(0.88) contrast(1.10) brightness(0.80) hue-rotate(-5deg)",
          }}
        >
          <source src={current.webm} type="video/webm" />
          <source src={current.mp4} type="video/mp4" />
        </video>
      </div>

      {/* ═══ שכבה 1: tint כחול-זהב מעל הוידאו — הופך stock לקולנועי ═══
          מיקס של כחול כהה בתחתית + זוהר זהוב בחלק העליון */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(18, 32, 58, 0.18) 0%,
              rgba(8, 18, 38, 0.06) 35%,
              rgba(6, 12, 28, 0.55) 100%
            )
          `,
          mixBlendMode: "multiply",
        }}
      />

      {/* ═══ שכבה 2: וינייטה דרמטית — מחשיכה קצוות, מרכזת מבט על ה-hero ═══ */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 110% 82% at 50% 44%, transparent 24%, rgba(0, 0, 0, 0.68) 100%),
            linear-gradient(to top, rgba(5, 10, 24, 0.58) 0%, transparent 38%)
          `,
        }}
      />

      {/* ═══ שכבה 3: הצללת רכות מרכזית — קריאות טיפוגרפית מובטחת ═══
          דיסק כהה קל מאחורי הכותרות, נעלם בקצוות */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 52%, rgba(0, 0, 0, 0.32) 0%, transparent 70%)",
        }}
      />

      {/* ═══ שכבה 4: מרקם בד ציור שמן + גרעין פילם ═══ */}
      <div aria-hidden="true" className="atmosphere-layer" />

      {/* ═══ שכבה 5: קרני אור זהובות מלמעלה — godray ═══ */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 42% at 50% -8%, rgba(216, 172, 88, 0.18) 0%, transparent 55%)",
        }}
      />

      {/* ═══ שכבה 6: מסגרת גלריה — קו זהב דק + צל פנימי, כמו ציור תלוי בקיר ═══ */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-0 rounded-[3px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(216, 172, 88, 0.16), inset 0 0 240px rgba(0, 0, 0, 0.48)",
        }}
      />
    </>
  );
}
