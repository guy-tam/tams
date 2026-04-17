// Wallpaper-grade עולם ציורי — הציור הוא הטפט של האתר
// רואים את הפרטים: דמויות, ספינות, אור, שמיים — כמו קיר בגלריה
// 4 מאסטרי הזהב הישן נמסים יחד כטפט רציף אחד

export default function AtmosphericBackdrop() {
  return (
    <>
      {/* שכבה 1 — Turner (שקיעה) טפט מלא עיקרי, ברור ולא מטושטש */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/turner-temeraire.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          opacity: 0.72,
          filter: "saturate(0.92) contrast(1.08) brightness(0.85)",
        }}
      />

      {/* שכבה 2 — Lorrain מתמזג ברצף בצד ימין */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/lorrain-seaport.jpg)",
          backgroundSize: "90% auto",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          opacity: 0.55,
          mixBlendMode: "screen",
          filter: "saturate(0.9) contrast(1.05)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 90% at 78% 50%, black 0%, black 30%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse 80% 90% at 78% 50%, black 0%, black 30%, transparent 85%)",
        }}
      />

      {/* שכבה 3 — Rembrandt פרטים בצד שמאל-תחתון, ברור לעין */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/rembrandt-nightwatch.jpg)",
          backgroundSize: "85% auto",
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.52,
          mixBlendMode: "screen",
          filter: "saturate(0.85) contrast(1.1)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 22% 75%, black 0%, black 25%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 22% 75%, black 0%, black 25%, transparent 80%)",
        }}
      />

      {/* שכבה 4 — Caravaggio דרמה צ׳יארוסקורו במרכז-ימין */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/caravaggio-matthew.jpg)",
          backgroundSize: "75% auto",
          backgroundPosition: "85% 30%",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
          mixBlendMode: "screen",
          filter: "saturate(0.85) contrast(1.08)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 85% at 85% 35%, black 0%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 70% 85% at 85% 35%, black 0%, transparent 75%)",
        }}
      />

      {/* שכבה 5 — וינייטה קלילה בלבד (לא מחשיכה את הציור) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />

      {/* שכבה 6 — דגן פיגמנט — מוסיף מרקם בד של ציור אמיתי */}
      <div aria-hidden="true" className="atmosphere-layer" />

      {/* שכבה 7 — קרני אור ברוקיות — מחזקות את האווירה של שקיעת Turner */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -5%, rgba(212, 168, 83, 0.22) 0%, transparent 55%)",
        }}
      />

      {/* שכבה 8 — מסגרת גלריה עדינה סביב המסך */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-0 rounded-[4px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.2), inset 0 0 180px rgba(0, 0, 0, 0.35)",
        }}
      />
    </>
  );
}
