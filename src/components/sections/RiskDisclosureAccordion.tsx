"use client";

// גילוי סיכונים - אקורדיון עם קטגוריות סיכון מפורטות
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Scale, Globe, Cpu, Waves, DollarSign, Lock } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n";

// מבנה קטגוריית סיכון (ללא טקסטים - הטקסטים מגיעים מה-i18n)
const riskCategoryMeta = [
  { id: "market", icon: Waves, color: "#f43f5e" },
  { id: "regulatory", icon: Scale, color: "#f59e0b" },
  { id: "smart-contract", icon: Cpu, color: "#8b5cf6" },
  { id: "counterparty", icon: ShieldAlert, color: "#3b82f6" },
  { id: "liquidity", icon: DollarSign, color: "#06b6d4" },
  { id: "custody", icon: Lock, color: "#10b981" },
  { id: "geopolitical", icon: Globe, color: "#ec4899" },
] as const;

// טקסטים מתורגמים לכל השפות
const texts: Record<string, Record<string, string>> = {
  en: {
    disclosureLabel: "Important Disclosure:",
    disclosureText:
      "Investing in digital assets carries significant risk. Please review all risk categories carefully before making investment decisions.",
    marketTitle: "Market & Volatility Risk",
    marketContent:
      "Cryptocurrency markets are inherently volatile. Asset values can fluctuate dramatically within short periods, potentially resulting in significant losses. Historical performance does not guarantee future results. Market conditions can change rapidly due to macroeconomic factors, regulatory changes, or shifts in investor sentiment. TAMS employs diversification and structured allocation to mitigate, but not eliminate, these risks.",
    regulatoryTitle: "Regulatory & Legal Risk",
    regulatoryContent:
      "The regulatory landscape for digital assets is evolving and uncertain across jurisdictions. Changes in laws, regulations, or enforcement actions could materially impact the value of holdings, restrict operations, or require fundamental changes to strategy. This includes potential classification changes, taxation modifications, and restrictions on DeFi activities.",
    smartContractTitle: "Smart Contract & Technical Risk",
    smartContractContent:
      "DeFi protocols rely on smart contracts which may contain undiscovered vulnerabilities. Despite audits and security measures, the risk of exploits, bugs, or protocol failures remains. Oracle manipulation, flash loan attacks, and composability risks between protocols can lead to cascading failures. TAMS limits DeFi exposure and only uses battle-tested protocols.",
    counterpartyTitle: "Counterparty & Platform Risk",
    counterpartyContent:
      "Engagement with exchanges, custodians, and DeFi protocols introduces counterparty risk. Platform insolvency, security breaches, or operational failures could result in loss of funds. Self-custody introduces its own risks related to key management. TAMS implements multi-signature security and distributes assets across platforms.",
    liquidityTitle: "Liquidity Risk",
    liquidityContent:
      "Some digital assets and DeFi positions may have limited liquidity, particularly during market stress events. This could make it difficult to exit positions at desired prices. Lock-up periods in staking and DeFi protocols add additional illiquidity. TAMS maintains an operations wallet with liquid reserves to manage this risk.",
    custodyTitle: "Custody & Security Risk",
    custodyContent:
      "Digital asset custody requires rigorous security practices. Loss of private keys, compromised wallets, or phishing attacks can result in irreversible loss of funds. Hardware wallet failures, social engineering, and supply chain attacks are ongoing threats. TAMS employs institutional-grade security practices including multi-sig, cold storage, and regular security reviews.",
    geopoliticalTitle: "Geopolitical & Macro Risk",
    geopoliticalContent:
      "Global events, economic policy changes, interest rate movements, and geopolitical tensions can significantly impact digital asset markets. Correlation with traditional markets may increase during periods of systemic stress. Sanctions, trade restrictions, and cross-border regulatory actions present additional complexity.",
  },
  he: {
    disclosureLabel: "גילוי נאות חשוב:",
    disclosureText:
      "השקעה בנכסים דיגיטליים כרוכה בסיכון משמעותי. אנא עיינו בכל קטגוריות הסיכון בקפידה לפני קבלת החלטות השקעה.",
    marketTitle: "סיכון שוק ותנודתיות",
    marketContent:
      "שוקי המטבעות הדיגיטליים הם תנודתיים מטבעם. ערכי הנכסים עלולים להשתנות באופן דרמטי בתוך פרקי זמן קצרים, מה שעלול לגרום להפסדים משמעותיים. ביצועי עבר אינם מבטיחים תוצאות עתידיות. תנאי השוק עשויים להשתנות במהירות עקב גורמים מקרו-כלכליים, שינויים רגולטוריים או שינויים בסנטימנט המשקיעים. TAMS מיישמת פיזור והקצאה מובנית לצמצום סיכונים אלו, אך לא לביטולם.",
    regulatoryTitle: "סיכון רגולטורי ומשפטי",
    regulatoryContent:
      "הנוף הרגולטורי לנכסים דיגיטליים מתפתח ואינו ודאי בתחומי שיפוט שונים. שינויים בחוקים, תקנות או פעולות אכיפה עלולים להשפיע באופן מהותי על ערך ההחזקות, להגביל פעילות או לחייב שינויים מהותיים באסטרטגיה. זה כולל שינויים פוטנציאליים בסיווג, שינויי מיסוי והגבלות על פעילויות DeFi.",
    smartContractTitle: "סיכון חוזים חכמים וטכנולוגי",
    smartContractContent:
      "פרוטוקולי DeFi מסתמכים על חוזים חכמים שעשויים להכיל פגיעויות שטרם התגלו. למרות ביקורות ואמצעי אבטחה, סיכון הניצול, הבאגים או כשלי פרוטוקול נותר קיים. מניפולציית אורקלים, התקפות הלוואות בזק וסיכוני קומפוזביליות בין פרוטוקולים עלולים להוביל לכשלים מדורגים. TAMS מגבילה חשיפה ל-DeFi ומשתמשת רק בפרוטוקולים מוכחים.",
    counterpartyTitle: "סיכון צד נגדי ופלטפורמה",
    counterpartyContent:
      "מעורבות עם בורסות, משמורנים ופרוטוקולי DeFi מציגה סיכון צד נגדי. חדלות פירעון של פלטפורמה, פרצות אבטחה או כשלים תפעוליים עלולים לגרום לאובדן כספים. משמורת עצמית מציגה סיכונים משלה הקשורים לניהול מפתחות. TAMS מיישמת אבטחת ריבוי חתימות ומפזרת נכסים בין פלטפורמות.",
    liquidityTitle: "סיכון נזילות",
    liquidityContent:
      "לחלק מהנכסים הדיגיטליים ופוזיציות DeFi עשויה להיות נזילות מוגבלת, במיוחד בזמן אירועי לחץ בשוק. הדבר עלול להקשות על יציאה מפוזיציות במחירים הרצויים. תקופות נעילה בהימור ובפרוטוקולי DeFi מוסיפות חוסר נזילות נוסף. TAMS מתחזקת ארנק תפעולי עם רזרבות נזילות לניהול סיכון זה.",
    custodyTitle: "סיכון משמורת ואבטחה",
    custodyContent:
      "משמורת נכסים דיגיטליים דורשת נהלי אבטחה קפדניים. אובדן מפתחות פרטיים, ארנקים שנפרצו או התקפות פישינג עלולים לגרום לאובדן כספים בלתי הפיך. כשלי ארנקי חומרה, הנדסה חברתית והתקפות שרשרת אספקה מהווים איומים מתמשכים. TAMS מיישמת נהלי אבטחה ברמה מוסדית כולל ריבוי חתימות, אחסון קר וסקירות אבטחה תקופתיות.",
    geopoliticalTitle: "סיכון גיאופוליטי ומקרו-כלכלי",
    geopoliticalContent:
      "אירועים גלובליים, שינויים במדיניות כלכלית, תנועות ריבית ומתחים גיאופוליטיים עלולים להשפיע באופן משמעותי על שוקי הנכסים הדיגיטליים. המתאם עם שווקים מסורתיים עשוי לגבור בתקופות של לחץ מערכתי. סנקציות, הגבלות סחר ופעולות רגולטוריות חוצות גבולות מציגות מורכבות נוספת.",
  },
  ar: {
    disclosureLabel: "إفصاح مهم:",
    disclosureText:
      "ينطوي الاستثمار في الأصول الرقمية على مخاطر كبيرة. يرجى مراجعة جميع فئات المخاطر بعناية قبل اتخاذ قرارات الاستثمار.",
    marketTitle: "مخاطر السوق والتقلبات",
    marketContent:
      "أسواق العملات الرقمية متقلبة بطبيعتها. يمكن أن تتذبذب قيم الأصول بشكل كبير خلال فترات قصيرة، مما قد يؤدي إلى خسائر جسيمة. الأداء التاريخي لا يضمن النتائج المستقبلية. يمكن أن تتغير ظروف السوق بسرعة بسبب عوامل الاقتصاد الكلي أو التغييرات التنظيمية أو التحولات في معنويات المستثمرين. تستخدم TAMS التنويع والتخصيص المنظم للتخفيف من هذه المخاطر، لكن ليس للقضاء عليها.",
    regulatoryTitle: "المخاطر التنظيمية والقانونية",
    regulatoryContent:
      "المشهد التنظيمي للأصول الرقمية يتطور وغير مؤكد عبر الولايات القضائية. يمكن أن تؤثر التغييرات في القوانين أو اللوائح أو إجراءات الإنفاذ بشكل جوهري على قيمة الحيازات أو تقييد العمليات أو تتطلب تغييرات جوهرية في الاستراتيجية. يشمل ذلك التغييرات المحتملة في التصنيف وتعديلات الضرائب والقيود على أنشطة DeFi.",
    smartContractTitle: "مخاطر العقود الذكية والمخاطر التقنية",
    smartContractContent:
      "تعتمد بروتوكولات DeFi على العقود الذكية التي قد تحتوي على ثغرات غير مكتشفة. على الرغم من عمليات التدقيق والإجراءات الأمنية، يظل خطر الاستغلال أو الأخطاء البرمجية أو إخفاقات البروتوكول قائماً. التلاعب بالأوراكل وهجمات القروض السريعة ومخاطر التركيب بين البروتوكولات يمكن أن تؤدي إلى إخفاقات متتالية. تحد TAMS من التعرض لـ DeFi وتستخدم فقط البروتوكولات المجربة والمثبتة.",
    counterpartyTitle: "مخاطر الطرف المقابل والمنصة",
    counterpartyContent:
      "يُدخل التعامل مع البورصات وأمناء الحفظ وبروتوكولات DeFi مخاطر الطرف المقابل. يمكن أن يؤدي إعسار المنصة أو الاختراقات الأمنية أو الإخفاقات التشغيلية إلى خسارة الأموال. تقدم الحفظ الذاتي مخاطره الخاصة المتعلقة بإدارة المفاتيح. تطبق TAMS أمان التوقيع المتعدد وتوزع الأصول عبر المنصات.",
    liquidityTitle: "مخاطر السيولة",
    liquidityContent:
      "قد تتمتع بعض الأصول الرقمية ومراكز DeFi بسيولة محدودة، خاصة خلال أحداث ضغوط السوق. قد يجعل ذلك من الصعب الخروج من المراكز بالأسعار المرغوبة. تضيف فترات الإغلاق في الرهن وبروتوكولات DeFi عدم سيولة إضافية. تحتفظ TAMS بمحفظة عمليات باحتياطيات سائلة لإدارة هذه المخاطر.",
    custodyTitle: "مخاطر الحفظ والأمان",
    custodyContent:
      "يتطلب حفظ الأصول الرقمية ممارسات أمنية صارمة. يمكن أن يؤدي فقدان المفاتيح الخاصة أو اختراق المحافظ أو هجمات التصيد الاحتيالي إلى خسارة لا رجعة فيها للأموال. إخفاقات محافظ الأجهزة والهندسة الاجتماعية وهجمات سلسلة التوريد تشكل تهديدات مستمرة. تطبق TAMS ممارسات أمنية بمستوى مؤسسي تشمل التوقيع المتعدد والتخزين البارد والمراجعات الأمنية الدورية.",
    geopoliticalTitle: "المخاطر الجيوسياسية والاقتصاد الكلي",
    geopoliticalContent:
      "يمكن أن تؤثر الأحداث العالمية وتغييرات السياسة الاقتصادية وتحركات أسعار الفائدة والتوترات الجيوسياسية بشكل كبير على أسواق الأصول الرقمية. قد يزداد الارتباط مع الأسواق التقليدية خلال فترات الضغط النظامي. تمثل العقوبات والقيود التجارية والإجراءات التنظيمية العابرة للحدود تعقيداً إضافياً.",
  },
  ru: {
    disclosureLabel: "Важное раскрытие информации:",
    disclosureText:
      "Инвестирование в цифровые активы сопряжено со значительным риском. Пожалуйста, внимательно изучите все категории рисков перед принятием инвестиционных решений.",
    marketTitle: "Рыночный риск и волатильность",
    marketContent:
      "Рынки криптовалют по своей природе волатильны. Стоимость активов может резко колебаться в течение коротких периодов, что потенциально может привести к значительным убыткам. Прошлые результаты не гарантируют будущих показателей. Рыночные условия могут быстро меняться под влиянием макроэкономических факторов, изменений в регулировании или настроений инвесторов. TAMS применяет диверсификацию и структурированное распределение для смягчения, но не устранения, этих рисков.",
    regulatoryTitle: "Регуляторный и юридический риск",
    regulatoryContent:
      "Регуляторная среда для цифровых активов развивается и остаётся неопределённой в различных юрисдикциях. Изменения в законодательстве, нормативных актах или правоприменительных мерах могут существенно повлиять на стоимость активов, ограничить операции или потребовать фундаментальных изменений стратегии. Это включает возможные изменения классификации, модификации налогообложения и ограничения деятельности DeFi.",
    smartContractTitle: "Риск смарт-контрактов и технический риск",
    smartContractContent:
      "Протоколы DeFi опираются на смарт-контракты, которые могут содержать необнаруженные уязвимости. Несмотря на аудиты и меры безопасности, риск эксплуатации уязвимостей, ошибок или сбоев протоколов сохраняется. Манипуляции с оракулами, атаки мгновенных кредитов и риски композитности между протоколами могут привести к каскадным сбоям. TAMS ограничивает экспозицию в DeFi и использует только проверенные протоколы.",
    counterpartyTitle: "Риск контрагента и платформы",
    counterpartyContent:
      "Взаимодействие с биржами, кастодианами и протоколами DeFi создаёт риск контрагента. Неплатёжеспособность платформы, нарушения безопасности или операционные сбои могут привести к потере средств. Самостоятельное хранение вводит собственные риски, связанные с управлением ключами. TAMS применяет мультиподписную защиту и распределяет активы между платформами.",
    liquidityTitle: "Риск ликвидности",
    liquidityContent:
      "Некоторые цифровые активы и позиции в DeFi могут иметь ограниченную ликвидность, особенно в периоды рыночного стресса. Это может затруднить закрытие позиций по желаемым ценам. Периоды блокировки при стейкинге и в протоколах DeFi создают дополнительную неликвидность. TAMS поддерживает операционный кошелёк с ликвидными резервами для управления этим риском.",
    custodyTitle: "Риск хранения и безопасности",
    custodyContent:
      "Хранение цифровых активов требует строгих практик безопасности. Потеря приватных ключей, компрометация кошельков или фишинговые атаки могут привести к необратимой потере средств. Сбои аппаратных кошельков, социальная инженерия и атаки на цепочку поставок представляют постоянные угрозы. TAMS применяет практики безопасности институционального уровня, включая мультиподпись, холодное хранение и регулярные аудиты безопасности.",
    geopoliticalTitle: "Геополитический и макроэкономический риск",
    geopoliticalContent:
      "Глобальные события, изменения экономической политики, движение процентных ставок и геополитическая напряжённость могут существенно влиять на рынки цифровых активов. Корреляция с традиционными рынками может усиливаться в периоды системного стресса. Санкции, торговые ограничения и трансграничные регуляторные действия создают дополнительную сложность.",
  },
  es: {
    disclosureLabel: "Divulgación importante:",
    disclosureText:
      "Invertir en activos digitales conlleva un riesgo significativo. Por favor, revise todas las categorías de riesgo cuidadosamente antes de tomar decisiones de inversión.",
    marketTitle: "Riesgo de mercado y volatilidad",
    marketContent:
      "Los mercados de criptomonedas son inherentemente volátiles. Los valores de los activos pueden fluctuar drásticamente en períodos cortos, lo que podría resultar en pérdidas significativas. El rendimiento histórico no garantiza resultados futuros. Las condiciones del mercado pueden cambiar rápidamente debido a factores macroeconómicos, cambios regulatorios o cambios en el sentimiento de los inversores. TAMS emplea diversificación y asignación estructurada para mitigar, pero no eliminar, estos riesgos.",
    regulatoryTitle: "Riesgo regulatorio y legal",
    regulatoryContent:
      "El panorama regulatorio para los activos digitales está evolucionando y es incierto en diferentes jurisdicciones. Los cambios en leyes, regulaciones o acciones de cumplimiento podrían impactar materialmente el valor de las tenencias, restringir operaciones o requerir cambios fundamentales en la estrategia. Esto incluye posibles cambios de clasificación, modificaciones tributarias y restricciones en actividades DeFi.",
    smartContractTitle: "Riesgo de contratos inteligentes y técnico",
    smartContractContent:
      "Los protocolos DeFi dependen de contratos inteligentes que pueden contener vulnerabilidades no descubiertas. A pesar de las auditorías y medidas de seguridad, el riesgo de exploits, errores o fallos de protocolo persiste. La manipulación de oráculos, los ataques de préstamos flash y los riesgos de composabilidad entre protocolos pueden provocar fallos en cascada. TAMS limita la exposición a DeFi y solo utiliza protocolos probados y consolidados.",
    counterpartyTitle: "Riesgo de contraparte y plataforma",
    counterpartyContent:
      "La interacción con exchanges, custodios y protocolos DeFi introduce riesgo de contraparte. La insolvencia de la plataforma, brechas de seguridad o fallos operativos podrían resultar en pérdida de fondos. La autocustodia introduce sus propios riesgos relacionados con la gestión de claves. TAMS implementa seguridad de firma múltiple y distribuye activos entre plataformas.",
    liquidityTitle: "Riesgo de liquidez",
    liquidityContent:
      "Algunos activos digitales y posiciones DeFi pueden tener liquidez limitada, particularmente durante eventos de estrés del mercado. Esto podría dificultar la salida de posiciones a precios deseados. Los períodos de bloqueo en staking y protocolos DeFi agregan iliquidez adicional. TAMS mantiene una billetera operativa con reservas líquidas para gestionar este riesgo.",
    custodyTitle: "Riesgo de custodia y seguridad",
    custodyContent:
      "La custodia de activos digitales requiere prácticas de seguridad rigurosas. La pérdida de claves privadas, billeteras comprometidas o ataques de phishing pueden resultar en una pérdida irreversible de fondos. Fallos en billeteras de hardware, ingeniería social y ataques a la cadena de suministro son amenazas continuas. TAMS emplea prácticas de seguridad de nivel institucional que incluyen firma múltiple, almacenamiento en frío y revisiones de seguridad periódicas.",
    geopoliticalTitle: "Riesgo geopolítico y macroeconómico",
    geopoliticalContent:
      "Los eventos globales, cambios en la política económica, movimientos de tasas de interés y tensiones geopolíticas pueden impactar significativamente los mercados de activos digitales. La correlación con los mercados tradicionales puede aumentar durante períodos de estrés sistémico. Las sanciones, restricciones comerciales y acciones regulatorias transfronterizas presentan complejidad adicional.",
  },
};

// מיפוי מזהה קטגוריה למפתחות טקסט
const categoryKeyMap: Record<string, { titleKey: string; contentKey: string }> = {
  market: { titleKey: "marketTitle", contentKey: "marketContent" },
  regulatory: { titleKey: "regulatoryTitle", contentKey: "regulatoryContent" },
  "smart-contract": { titleKey: "smartContractTitle", contentKey: "smartContractContent" },
  counterparty: { titleKey: "counterpartyTitle", contentKey: "counterpartyContent" },
  liquidity: { titleKey: "liquidityTitle", contentKey: "liquidityContent" },
  custody: { titleKey: "custodyTitle", contentKey: "custodyContent" },
  geopolitical: { titleKey: "geopoliticalTitle", contentKey: "geopoliticalContent" },
};

export default function RiskDisclosureAccordion() {
  const { language, dir } = useLanguage();
  const txt = texts[language] || texts.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
      dir={dir}
    >
      {/* כותרת אזהרה */}
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border border-tams-rose/20 bg-tams-rose/5">
        <AlertTriangle className="size-5 text-tams-rose flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {txt.disclosureLabel}
          </span>{" "}
          {txt.disclosureText}
        </p>
      </div>

      {/* אקורדיון סיכונים */}
      <Accordion>
        {riskCategoryMeta.map((risk) => {
          const Icon = risk.icon;
          const keys = categoryKeyMap[risk.id];
          return (
            <AccordionItem key={risk.id} value={risk.id}>
              <AccordionTrigger className="py-4 px-1 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${risk.color}15` }}
                  >
                    <Icon
                      className="size-4"
                      style={{ color: risk.color }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {txt[keys.titleKey]}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-4">
                <div className="pl-11">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {txt[keys.contentKey]}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
}
