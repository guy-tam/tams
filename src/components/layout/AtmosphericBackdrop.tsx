// רקע אטמוספרי route-aware — מסע ויזואלי לאורך האתר
// כל route חשוב מקבל סביבה משלו, עם crossfade חלק בין דפים
// Palindrome loops (forward+reverse) מבטלים את תחושת ה-loop הקצר

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = {
  id: string;
  webm: string;
  mp4: string;
  poster: string;
  /** Color grade fine-tune per scene (CSS filter on the <video>) */
  filter?: string;
};

const THEMES: Record<string, Theme> = {
  estate: {
    id: "estate",
    webm: "/video/estate-cinematic.webm",
    mp4: "/video/estate-cinematic.mp4",
    poster: "/art/viking-hero-poster.jpg",
    filter: "saturate(0.84) contrast(1.05) brightness(0.74)",
  },
  library: {
    id: "library",
    webm: "/video/library-cinematic.webm",
    mp4: "/video/library-cinematic.mp4",
    poster: "/art/viking-hero-poster.jpg",
    filter: "saturate(0.78) contrast(1.08) brightness(0.68) hue-rotate(-2deg)",
  },
  ocean: {
    id: "ocean",
    webm: "/video/ocean-cinematic.webm",
    mp4: "/video/ocean-cinematic.mp4",
    poster: "/art/turner-temeraire.jpg",
    filter: "saturate(0.72) contrast(1.10) brightness(0.66) hue-rotate(-8deg)",
  },
  skyline: {
    id: "skyline",
    webm: "/video/skyline-cinematic.webm",
    mp4: "/video/skyline-cinematic.mp4",
    poster: "/art/viking-hero-poster.jpg",
    filter: "saturate(0.78) contrast(1.12) brightness(0.62)",
  },
  chamber: {
    id: "chamber",
    webm: "/video/chamber-cinematic.webm",
    mp4: "/video/chamber-cinematic.mp4",
    poster: "/art/viking-hero-poster.jpg",
    filter: "saturate(0.82) contrast(1.06) brightness(0.70)",
  },
};

// מיפוי route → theme
function themeForPath(pathname: string): Theme {
  if (pathname === "/") return THEMES.estate;
  if (pathname.startsWith("/architecture") || pathname.startsWith("/methodology")) return THEMES.library;
  if (pathname.startsWith("/strategy") || pathname.startsWith("/market-shift") || pathname.startsWith("/defi")) return THEMES.ocean;
  if (pathname.startsWith("/proof") || pathname.startsWith("/holdings") || pathname.startsWith("/dashboard")) return THEMES.skyline;
  if (pathname.startsWith("/investor") || pathname.startsWith("/access") || pathname.startsWith("/login") || pathname.startsWith("/company") || pathname.startsWith("/team")) return THEMES.chamber;
  return THEMES.estate;
}

export default function AtmosphericBackdrop() {
  const pathname = usePathname() ?? "/";
  const theme = useMemo(() => themeForPath(pathname), [pathname]);

  // שני סלוטי וידאו — לצורך crossfade חלק בין routes
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");
  const [themeA, setThemeA] = useState<Theme>(theme);
  const [themeB, setThemeB] = useState<Theme>(theme);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [loadedA, setLoadedA] = useState(false);
  const [loadedB, setLoadedB] = useState(false);

  // החלפת theme — טוען לסלוט הלא-פעיל ואז מחליף
  useEffect(() => {
    const target = activeSlot === "a" ? "b" : "a";
    if (target === "b") {
      setThemeB(theme);
      setLoadedB(false);
    } else {
      setThemeA(theme);
      setLoadedA(false);
    }
    // המעבר עצמו קורה רק אחרי canplay
  }, [theme.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // כשהסלוט הזמני נטען — מחליפים פוקוס
  useEffect(() => {
    const inactiveLoaded = activeSlot === "a" ? loadedB : loadedA;
    const inactiveTheme = activeSlot === "a" ? themeB : themeA;
    if (inactiveLoaded && inactiveTheme.id === theme.id) {
      setActiveSlot((s) => (s === "a" ? "b" : "a"));
    }
  }, [loadedA, loadedB, theme.id, activeSlot, themeA, themeB]);

  // reduce-motion — להקפיא הכל
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = (matches: boolean) => {
      [videoARef.current, videoBRef.current].forEach((v) => {
        if (!v) return;
        if (matches) v.pause();
        else v.play().catch(() => {});
      });
    };
    apply(mq.matches);
    const onMq = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  return (
    <>
      {/* פוסטר סטטי — חזק עד שהוידאו נטען */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${theme.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center 42%",
            opacity: 0.32,
            filter: "saturate(0.7) contrast(1.05) brightness(0.6)",
          }}
        />

        {/* סלוט A */}
        <video
          key={`a-${themeA.id}`}
          ref={videoARef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={themeA.poster}
          disablePictureInPicture
          onCanPlay={() => setLoadedA(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: activeSlot === "a" && loadedA ? 0.46 : 0,
            transition: "opacity 1200ms cubic-bezier(0.19, 1, 0.22, 1)",
            filter: themeA.filter,
          }}
        >
          <source src={themeA.webm} type="video/webm" />
          <source src={themeA.mp4} type="video/mp4" />
        </video>

        {/* סלוט B */}
        <video
          key={`b-${themeB.id}`}
          ref={videoBRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={themeB.poster}
          disablePictureInPicture
          onCanPlay={() => setLoadedB(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: activeSlot === "b" && loadedB ? 0.46 : 0,
            transition: "opacity 1200ms cubic-bezier(0.19, 1, 0.22, 1)",
            filter: themeB.filter,
          }}
        >
          <source src={themeB.webm} type="video/webm" />
          <source src={themeB.mp4} type="video/mp4" />
        </video>
      </div>

      {/* tint כחול-עמוק — מאפשר ל-UI לצוף */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(8, 16, 32, 0.32) 0%,
              rgba(6, 12, 28, 0.20) 35%,
              rgba(4, 10, 22, 0.62) 100%
            )
          `,
        }}
      />

      {/* וינייטה מאופקת */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 50%, transparent 28%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />

      {/* קרן זהב עדינה מלמעלה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 38% at 50% -10%, rgba(212, 168, 83, 0.10) 0%, transparent 60%)",
        }}
      />

      {/* מרקם בד — דק מאוד */}
      <div aria-hidden="true" className="atmosphere-layer opacity-50" />

      {/* מסגרת גלריה דקה */}
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
