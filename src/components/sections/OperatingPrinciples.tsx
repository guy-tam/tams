"use client";

// 6 עקרונות תפעול — חתימת המוסדיות של TAMS
// בטיחות · חוקיות · קפדנות · רב-תחומיות · שקיפות · רגוע
import { motion } from "framer-motion";
import { ShieldCheck, Scale, FlaskConical, Users, Eye, Anchor } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const ICONS = [Anchor, Scale, FlaskConical, Users, ShieldCheck, Eye];

const TEXTS = {
  en: {
    badge: "Operating Principles",
    title: "How TAMS Acts — Six Non-Negotiable Disciplines",
    subtitle:
      "Designed by people who understand capital markets, blockchain protocols, and software engineering at the deepest level — and operate accordingly. These six principles govern every decision.",
    items: [
      { name: "Stablecoin Anchor", body: "A permanent stablecoin reserve sits behind every position. We never sell the core to pay an operational bill. Liquidity is engineered, not extracted in panic." },
      { name: "Legal & Regulatory First", body: "Fund structure, KYC, accreditation, jurisdiction (BVI / Cayman-ready), and tax-pack delivery — all designed before code is written. We do not retrofit compliance." },
      { name: "Research-Backed Selection", body: "Every one of the 16 holdings has a research file: thesis, evidence of institutional adoption, downside case, exit triggers. Reviewed quarterly. No ad-hoc additions." },
      { name: "Multi-Disciplinary Team", body: "Operators with deep experience across institutional finance, smart-contract security, on-chain mechanics, and software engineering. No single discipline owns a decision." },
      { name: "Custody-Grade Security", body: "Multi-signature wallets across geographically separated keys. Cold storage for the majority of holdings. Hot operational wallets bounded by policy. Audited monthly." },
      { name: "Radical Transparency", body: "Every dollar earned is traceable to an asset, an engine, or a fee line. LPs receive on-chain attestations, audited NAV, and full attribution per quarter." },
    ],
  },
  he: {
    badge: "עקרונות תפעול",
    title: "איך TAMS פועלת — שש משמעות שלא נשברות",
    subtitle:
      "מתוכננת על-ידי אנשים שמבינים שווקי הון, פרוטוקולי בלוקצ'יין והנדסת תוכנה ברמה הכי עמוקה — ופועלים בהתאם. ששת העקרונות האלה מנחים כל החלטה.",
    items: [
      { name: "עוגן Stablecoin", body: "רזרבת stablecoin תמידית עומדת מאחורי כל פוזיציה. אף פעם לא מוכרים את הליבה כדי לשלם חשבון תפעולי. נזילות מהונדסת, לא נשאבת בפאניקה." },
      { name: "חוק ורגולציה קודם", body: "מבנה הקרן, KYC, אקרדיטציה, תחום שיפוט (BVI / מוכן ל-Cayman), ומשלוח ערכת מס — הכל תוכנן לפני כתיבת קוד. לא מבצעים retrofit לציות." },
      { name: "בחירה מבוססת מחקר", body: "לכל אחד מ-16 הנכסים יש קובץ מחקר: תזה, ראיות לאימוץ מוסדי, תרחיש שלילי, טריגרים ליציאה. נסקר רבעונית. אין הוספות אד-הוק." },
      { name: "צוות רב-תחומי", body: "אופרטורים עם ניסיון עמוק בפיננסים מוסדיים, אבטחת חוזים חכמים, מכניקה on-chain והנדסת תוכנה. אף תחום בודד לא מחליט." },
      { name: "אבטחה ברמת Custody", body: "ארנקי multi-signature עם מפתחות מופרדים גיאוגרפית. אחסון קר לרוב האחזקות. ארנקים תפעוליים חמים מוגבלי-מדיניות. ביקורת חודשית." },
      { name: "שקיפות רדיקלית", body: "כל דולר מרוויחים מתאתר לנכס, מנוע או שורת עמלה. ה-LP מקבלים אישורים on-chain, NAV מבוקר, ושיוך מלא בכל רבעון." },
    ],
  },
  ar: {
    badge: "مبادئ التشغيل",
    title: "كيف تعمل TAMS — ستة انضباطات لا تُساوَم",
    subtitle:
      "مصمَّم من قِبَل أشخاص يفهمون أسواق رأس المال وبروتوكولات البلوكتشين وهندسة البرمجيات في أعمق مستوياتها — ويعملون وفقًا لذلك. هذه المبادئ الستة تحكم كل قرار.",
    items: [
      { name: "مرساة Stablecoin", body: "احتياطي stablecoin دائم يقف خلف كل مركز. لا نبيع النواة لدفع فاتورة تشغيلية أبدًا. السيولة مُهندَسة، لا تُسحب في حالة ذعر." },
      { name: "القانون والتنظيم أولًا", body: "هيكل الصندوق، KYC، الاعتماد، الاختصاص القضائي (BVI / جاهز لـ Cayman)، وتسليم حزمة الضرائب — كلها مصممة قبل كتابة الكود. لا نعيد تركيب الامتثال." },
      { name: "اختيار مدعوم بالبحث", body: "كل من الـ 16 حيازة لديه ملف بحث: فرضية، أدلة على التبني المؤسسي، حالة سلبية، محفّزات الخروج. مراجعة ربع سنوية. لا إضافات عشوائية." },
      { name: "فريق متعدد التخصصات", body: "مشغّلون بخبرة عميقة في التمويل المؤسسي، أمن العقود الذكية، آليات on-chain، وهندسة البرمجيات. لا تخصص واحد يمتلك القرار." },
      { name: "أمان بمستوى Custody", body: "محافظ multi-signature بمفاتيح منفصلة جغرافيًا. تخزين بارد لمعظم الحيازات. محافظ تشغيلية ساخنة مقيدة بالسياسة. تدقيق شهري." },
      { name: "شفافية جذرية", body: "كل دولار مُكتسب يمكن تتبعه إلى أصل، محرك، أو سطر رسم. يحصل الـ LP على تصديقات on-chain، NAV مدقّق، وتوزيع كامل لكل ربع." },
    ],
  },
  ru: {
    badge: "Операционные принципы",
    title: "Как действует TAMS — шесть непреложных дисциплин",
    subtitle:
      "Разработано людьми, которые понимают рынки капитала, блокчейн-протоколы и программную инженерию на глубочайшем уровне — и действуют соответственно. Эти шесть принципов управляют каждым решением.",
    items: [
      { name: "Якорь стейблкоинов", body: "Постоянный резерв стейблкоинов стоит за каждой позицией. Мы никогда не продаём ядро, чтобы оплатить операционный счёт. Ликвидность инженерится, а не извлекается в панике." },
      { name: "Закон и регулирование первыми", body: "Структура фонда, KYC, аккредитация, юрисдикция (BVI / готовность к Cayman) и налоговый пакет — всё спроектировано до написания кода. Мы не дорабатываем комплаенс задним числом." },
      { name: "Выбор на основе исследований", body: "У каждого из 16 активов есть исследовательский файл: тезис, доказательства институционального принятия, негативный сценарий, триггеры выхода. Квартальный пересмотр. Никаких ad-hoc добавлений." },
      { name: "Мультидисциплинарная команда", body: "Операторы с глубоким опытом в институциональных финансах, безопасности смарт-контрактов, on-chain механике и программной инженерии. Ни одна дисциплина не владеет решением единолично." },
      { name: "Безопасность уровня Custody", body: "Multi-signature кошельки с географически разнесёнными ключами. Холодное хранение для большинства активов. Горячие операционные кошельки ограничены политикой. Аудит ежемесячно." },
      { name: "Радикальная прозрачность", body: "Каждый заработанный доллар трассируется к активу, двигателю или строке комиссии. LP получают on-chain аттестации, аудированный NAV и полную атрибуцию за каждый квартал." },
    ],
  },
  es: {
    badge: "Principios operativos",
    title: "Cómo actúa TAMS — seis disciplinas innegociables",
    subtitle:
      "Diseñado por personas que entienden los mercados de capital, los protocolos blockchain y la ingeniería de software al nivel más profundo — y operan en consecuencia. Estos seis principios gobiernan cada decisión.",
    items: [
      { name: "Ancla de Stablecoin", body: "Una reserva permanente de stablecoin está detrás de cada posición. Nunca vendemos el núcleo para pagar una factura operativa. La liquidez se diseña, no se extrae con pánico." },
      { name: "Legal y regulatorio primero", body: "Estructura del fondo, KYC, acreditación, jurisdicción (BVI / listo para Cayman), y entrega de paquete fiscal — todo diseñado antes de escribir código. No adaptamos el cumplimiento a posteriori." },
      { name: "Selección basada en investigación", body: "Cada una de las 16 posiciones tiene un archivo de investigación: tesis, evidencia de adopción institucional, caso bajista, gatillos de salida. Revisión trimestral. Sin adiciones ad-hoc." },
      { name: "Equipo multidisciplinario", body: "Operadores con experiencia profunda en finanzas institucionales, seguridad de contratos inteligentes, mecánica on-chain e ingeniería de software. Ninguna disciplina única posee una decisión." },
      { name: "Seguridad nivel Custody", body: "Carteras multi-signature con claves separadas geográficamente. Almacenamiento frío para la mayoría de las posiciones. Carteras operativas calientes acotadas por política. Auditoría mensual." },
      { name: "Transparencia radical", body: "Cada dólar ganado es rastreable a un activo, un motor o una línea de tarifa. Los LP reciben atestaciones on-chain, NAV auditado y atribución completa por trimestre." },
    ],
  },
} as const;

export default function OperatingPrinciples() {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/55" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-amber-300/85 font-semibold">
            {t.badge}
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/55" />
        </div>
        <h2 className="heading-editorial text-2xl sm:text-3xl md:text-4xl text-white mb-4 leading-tight max-w-3xl mx-auto">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400/85 max-w-2xl mx-auto leading-relaxed font-light">
          {t.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {t.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className="surface-tier-2 p-5 sm:p-6 relative group hover:border-amber-500/35 transition-colors duration-500"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="size-10 rounded-xl bg-amber-500/[0.10] border border-amber-500/25 flex items-center justify-center shrink-0">
                  <Icon className="size-5 text-amber-400" />
                </div>
                <h3 className="text-base font-semibold text-white leading-snug pt-1.5">
                  {item.name}
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                {item.body}
              </p>
              <span className="monogram-watermark" aria-hidden="true">T</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
