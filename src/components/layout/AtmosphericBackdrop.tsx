// שכבת אטמוספירה גלובלית — דגן ציורי, קרן אור זהובה, וינייטה ברוקית
// נטענת פעם אחת מתחת לכל האפליקציה, בעלות אפסית (CSS/SVG בלבד)

export default function AtmosphericBackdrop() {
  return (
    <>
      {/* שכבה 1 — דגן פיגמנט + godray + וינייטה (ב-::before/::after) */}
      <div aria-hidden="true" className="atmosphere-layer" />

      {/* שכבה 2 — מסגרת זהב עדינה המקיפה את כל הצפייה (גלריה) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-4 z-0 rounded-[6px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.14), inset 0 0 160px rgba(0, 0, 0, 0.55)",
        }}
      />

      {/* שכבה 3 — שתי אלומות אור רכות בפינות עליונות (Baroque lighting) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 12% 0%, rgba(212, 168, 83, 0.18) 0%, transparent 32%), radial-gradient(circle at 88% 4%, rgba(58, 123, 232, 0.14) 0%, transparent 30%), radial-gradient(circle at 50% 115%, rgba(212, 168, 83, 0.12) 0%, transparent 40%)",
        }}
      />
    </>
  );
}
