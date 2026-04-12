// שכבת אטמוספירה גלובלית — מוזיאון נסתר של מאסטרי הזהב הישן
// 4 ציורי נחלת הכלל (Turner, Lorrain, Rembrandt, Caravaggio) נפרסים בפינות המסך
// עם מסכות רדיאליות ו-blend modes כדי ליצור עולם אמנותי מאוחד מתחת לתוכן

const artworks = [
  {
    src: "/art/turner-temeraire.jpg",
    position: "top left",
    mask: "radial-gradient(ellipse 80% 80% at 20% 20%, black 0%, transparent 70%)",
    size: "62% 62%",
  },
  {
    src: "/art/lorrain-seaport.jpg",
    position: "top right",
    mask: "radial-gradient(ellipse 80% 80% at 80% 20%, black 0%, transparent 70%)",
    size: "62% 62%",
  },
  {
    src: "/art/rembrandt-nightwatch.jpg",
    position: "bottom left",
    mask: "radial-gradient(ellipse 80% 80% at 20% 80%, black 0%, transparent 70%)",
    size: "62% 62%",
  },
  {
    src: "/art/caravaggio-matthew.jpg",
    position: "bottom right",
    mask: "radial-gradient(ellipse 80% 80% at 80% 80%, black 0%, transparent 70%)",
    size: "62% 62%",
  },
];

export default function AtmosphericBackdrop() {
  return (
    <>
      {/* שכבת מוזיאון — 4 מאסטרים בפינות, מעורבלים עם blend mode לעולם מאוחד */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {artworks.map((art) => (
          <div
            key={art.src}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${art.src})`,
              backgroundPosition: art.position,
              backgroundSize: art.size,
              backgroundRepeat: "no-repeat",
              opacity: 0.38,
              mixBlendMode: "screen",
              WebkitMaskImage: art.mask,
              maskImage: art.mask,
              filter: "saturate(0.75) contrast(1.05)",
            }}
          />
        ))}
      </div>

      {/* שכבת זיגוג כחול-זהב — מאחדת את 4 הציורים לגוון אחיד */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(10, 18, 38, 0.55) 0%, rgba(6, 12, 26, 0.85) 100%)",
        }}
      />

      {/* דגן פיגמנט — מוסיף טקסטורת בד עתיק מעל הכל */}
      <div aria-hidden="true" className="atmosphere-layer" />

      {/* אלומות אור זהובות — קרני ברוק עליונות */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 12% -5%, rgba(212, 168, 83, 0.14) 0%, transparent 45%), radial-gradient(ellipse 55% 60% at 88% -5%, rgba(58, 123, 232, 0.10) 0%, transparent 42%), radial-gradient(ellipse 80% 50% at 50% 115%, rgba(212, 168, 83, 0.10) 0%, transparent 55%)",
        }}
      />

      {/* מסגרת גלריה פנימית */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-4 z-0 rounded-[6px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.18), inset 0 0 200px rgba(0, 0, 0, 0.65)",
        }}
      />
    </>
  );
}
