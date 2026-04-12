// עולם ציורי מאוחד — 4 מאסטרי הזהב הישן נמסים יחד לקנבס רציף אחד
// Turner · Lorrain · Rembrandt · Caravaggio — בלי גבולות, בלי משבצות
// רק עולם אחד של אור ברוקי שמלווה את המשתמש בכל עמוד

export default function AtmosphericBackdrop() {
  return (
    <>
      {/* שכבה 1 — Turner (שקיעה זהובה) רקע רחב מאוד, מרוחק */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/turner-temeraire.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.28,
          mixBlendMode: "screen",
          filter: "blur(2px) saturate(0.85) contrast(1.05)",
        }}
      />

      {/* שכבה 2 — Lorrain (נמל קלאסי) מתמזג מהצד הימני */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/lorrain-seaport.jpg)",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
          mixBlendMode: "screen",
          filter: "blur(3px) saturate(0.9)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 70% 40%, black 0%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 70% 40%, black 0%, transparent 85%)",
        }}
      />

      {/* שכבה 3 — Rembrandt (חושך ואור) מצד שמאל תחתון */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/rembrandt-nightwatch.jpg)",
          backgroundSize: "120% auto",
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.22,
          mixBlendMode: "screen",
          filter: "blur(3px) saturate(0.85)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 25% 75%, black 0%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 25% 75%, black 0%, transparent 80%)",
        }}
      />

      {/* שכבה 4 — Caravaggio (דרמה צ'יארוסקורו) נמסה לאמצע-ימין */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/caravaggio-matthew.jpg)",
          backgroundSize: "110% auto",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
          mixBlendMode: "screen",
          filter: "blur(3px) saturate(0.85)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 90% at 80% 55%, black 0%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 85% 90% at 80% 55%, black 0%, transparent 80%)",
        }}
      />

      {/* שכבה 5 — זיגוג כחול-דיו מאחד, מקהה כל גבול */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 45%, rgba(10, 18, 38, 0.42) 0%, rgba(6, 12, 26, 0.78) 85%)",
        }}
      />

      {/* שכבה 6 — דגן פיגמנט (בד עתיק) מעל הכל */}
      <div aria-hidden="true" className="atmosphere-layer" />

      {/* שכבה 7 — קרני אור ברוקיות מלמעלה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(212, 168, 83, 0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 50% 110%, rgba(212, 168, 83, 0.08) 0%, transparent 50%)",
        }}
      />

      {/* שכבה 8 — מסגרת גלריה פנימית עדינה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-0 rounded-[4px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.15), inset 0 0 260px rgba(0, 0, 0, 0.55)",
        }}
      />
    </>
  );
}
