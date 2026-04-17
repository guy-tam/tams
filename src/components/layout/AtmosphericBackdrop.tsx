// ציור חי — סרטון ספינות ויקינג מצויר כשכבה ראשית
// Edward Moran "Viking Armada" מונפש ב-Ken Burns כטפט חי
// שכבות ציורי אמנים ישנים נמסות ביחד מעל ומסביב
// האפקט: עולם ציורי שנושם — יצירת מופת בתנועה

export default function AtmosphericBackdrop() {
  return (
    <>
      {/* שכבה 0 — סרטון ציור חי: ספינות ויקינג מפליגות בים סוער */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0.62,
            filter: "saturate(0.88) contrast(1.06) brightness(0.82)",
          }}
        >
          <source src="/video/viking-voyage.webm" type="video/webm" />
          <source src="/video/viking-voyage.mp4" type="video/mp4" />
        </video>
        {/* Fallback: ציור סטטי למקרה שהוידאו לא נטען */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/art/viking-armada-moran.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.65,
            filter: "saturate(0.88) contrast(1.06) brightness(0.82)",
          }}
        />
      </div>

      {/* שכבה 1 — Turner (שקיעה) מתמזגת עם הסרטון כאור חם */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/turner-temeraire.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          opacity: 0.3,
          mixBlendMode: "screen",
          filter: "saturate(0.85) contrast(1.05)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, black 0%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, black 0%, transparent 80%)",
        }}
      />

      {/* שכבה 2 — Lorrain נמל קלאסי מתמזג בצד ימין */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/art/lorrain-seaport.jpg)",
          backgroundSize: "85% auto",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
          mixBlendMode: "screen",
          filter: "saturate(0.85) contrast(1.02)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 85% at 82% 50%, black 0%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 70% 85% at 82% 50%, black 0%, transparent 80%)",
        }}
      />

      {/* שכבה 3 — וינייטה עמוקה — מחשיכה קצוות לקריאות טקסט */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 90% at 50% 45%, transparent 35%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />

      {/* שכבה 4 — דגן פיגמנט — מרקם בד ציור אמיתי */}
      <div aria-hidden="true" className="atmosphere-layer" />

      {/* שכבה 5 — קרני אור זהובות מלמעלה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% -5%, rgba(212, 168, 83, 0.2) 0%, transparent 55%)",
        }}
      />

      {/* שכבה 6 — מסגרת גלריה עדינה */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-0 rounded-[4px]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(212, 168, 83, 0.18), inset 0 0 200px rgba(0, 0, 0, 0.4)",
        }}
      />
    </>
  );
}
