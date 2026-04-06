// מערכת תרגום נתוני נכסים - תמיכה ב-5 שפות לכל 16 הנכסים
// כל המידע הוא לצרכי מחקר וקונספט בלבד - אינו מהווה ייעוץ השקעות

import type { Language } from "@/lib/i18n";
import { type Asset, assets, categories } from "./assets";

// ממשק תרגומי שדות טקסט לכל נכס
interface AssetTranslations {
  description: string;
  overview: string;
  thesis: string;
  risks: string;
  tamsFit: string;
}

// מיפוי טיקר -> שפה -> תרגומים
type AssetI18n = Record<string, Record<Language, AssetTranslations>>;

// תרגומי כל הנכסים בכל השפות
const assetTranslations: AssetI18n = {
  // ========== Layer 1 ==========

  ETH: {
    en: {
      description:
        "פלטפורמת חוזים חכמים מובילה - עמוד השדרה של DeFi ותשתית Web3",
      overview:
        "Ethereum is the dominant smart contract platform powering the majority of DeFi, NFT, and Layer 2 ecosystems. Following the Merge transition to Proof of Stake, the network became deflationary under high usage conditions. It hosts the largest developer community in crypto and serves as the settlement layer for most on-chain economic activity.",
      thesis:
        "Ethereum's thesis rests on its unmatched network effects and composability. The rollup-centric roadmap positions it as the settlement and data availability layer for a multi-chain future. Institutional adoption through ETH ETFs, staking yield, and the EIP-1559 burn mechanism create structural demand. Supporters believe ETH captures value from the entire smart contract economy.",
      risks:
        "Competition from alternative Layer 1s offering lower fees and higher throughput. Regulatory risk around staking classification. Execution risk on the scaling roadmap. Concentration of staking power in a few liquid staking protocols. MEV extraction creating centralization pressures.",
      tamsFit:
        "Core holding in the Long-Term Holdings wallet (20-30% allocation). Also utilized in the DeFi wallet through staking and lending. ETH serves as collateral, gas, and yield-bearing asset across multiple TAMS strategies. Dollar-cost averaging for accumulation.",
    },
    he: {
      description:
        "פלטפורמת החוזים החכמים המובילה בעולם — עמוד השדרה של מערכת ה-DeFi ותשתיות Web3",
      overview:
        "את׳ריום היא פלטפורמת החוזים החכמים הדומיננטית המפעילה את מרבית מערכות ה-DeFi, ה-NFT וה-Layer 2. בעקבות המעבר ל-Proof of Stake במסגרת ה-Merge, הרשת הפכה לדפלציונית בתנאי שימוש גבוה. היא מארחת את קהילת המפתחים הגדולה ביותר בקריפטו ומשמשת כשכבת הסליקה המרכזית לפעילות כלכלית on-chain.",
      thesis:
        "התזה של את׳ריום נשענת על אפקט הרשת חסר התקדים והקומפוזביליות שלה. מפת הדרכים ממוקדת ה-rollup ממצבת אותה כשכבת הסליקה וזמינות הנתונים לעתיד מרובה שרשראות. אימוץ מוסדי באמצעות תעודות סל, תשואת staking ומנגנון שריפת EIP-1559 יוצרים ביקוש מבני. התומכים מאמינים כי ETH לוכד ערך מכלל הכלכלה של החוזים החכמים.",
      risks:
        "תחרות מצד שרשראות Layer 1 חלופיות המציעות עמלות נמוכות יותר ותפוקה גבוהה יותר. סיכון רגולטורי סביב סיווג ה-staking. סיכון ביצוע במפת הדרכים להרחבת הקיבולת. ריכוז כוח ה-staking בפרוטוקולי staking נזילים בודדים. לחצי ריכוזיות כתוצאה מחילוץ MEV.",
      tamsFit:
        "אחזקת ליבה בארנק האחזקות ארוכות הטווח (הקצאה של 20-30%). נעשה בה שימוש גם בארנק ה-DeFi באמצעות staking והלוואות. ETH משמש כבטוחה, דלק רשת ונכס נושא תשואה במספר אסטרטגיות TAMS. צבירה באמצעות ממוצע עלות דולרי.",
    },
    ar: {
      description:
        "منصة العقود الذكية الرائدة — العمود الفقري لنظام التمويل اللامركزي وبنية Web3",
      overview:
        "إيثريوم هي منصة العقود الذكية المهيمنة التي تشغّل غالبية أنظمة التمويل اللامركزي والرموز غير القابلة للاستبدال وشبكات الطبقة الثانية. بعد الانتقال إلى إثبات الحصة عبر عملية الدمج، أصبحت الشبكة انكماشية في ظروف الاستخدام المرتفع. تستضيف أكبر مجتمع مطورين في مجال العملات المشفرة وتعمل كطبقة التسوية الرئيسية للنشاط الاقتصادي على السلسلة.",
      thesis:
        "تستند أطروحة إيثريوم إلى تأثيرات الشبكة والقابلية للتركيب التي لا مثيل لها. تضعها خارطة الطريق المرتكزة على التجميع كطبقة تسوية وتوفير بيانات لمستقبل متعدد السلاسل. يخلق التبني المؤسسي من خلال صناديق المؤشرات وعائد الرهن وآلية حرق EIP-1559 طلبًا هيكليًا. يعتقد المؤيدون أن ETH يستحوذ على القيمة من اقتصاد العقود الذكية بأكمله.",
      risks:
        "المنافسة من شبكات الطبقة الأولى البديلة التي تقدم رسومًا أقل وإنتاجية أعلى. المخاطر التنظيمية حول تصنيف الرهن. مخاطر التنفيذ في خارطة طريق التوسع. تركز قوة الرهن في عدد قليل من بروتوكولات الرهن السائلة. ضغوط المركزية الناجمة عن استخراج MEV.",
      tamsFit:
        "حيازة أساسية في محفظة الاحتفاظ طويل الأجل (تخصيص 20-30%). تُستخدم أيضًا في محفظة التمويل اللامركزي من خلال الرهن والإقراض. يعمل ETH كضمان ووقود للشبكة وأصل مُدرّ للعائد عبر استراتيجيات TAMS المتعددة. التراكم عبر متوسط التكلفة بالدولار.",
    },
    ru: {
      description:
        "Ведущая платформа смарт-контрактов — основа экосистемы DeFi и инфраструктуры Web3",
      overview:
        "Ethereum — доминирующая платформа смарт-контрактов, обеспечивающая работу большинства систем DeFi, NFT и Layer 2. После перехода на Proof of Stake в рамках Merge сеть стала дефляционной при высокой нагрузке. Она объединяет крупнейшее сообщество разработчиков в криптоиндустрии и служит основным расчётным слоем для экономической активности on-chain.",
      thesis:
        "Тезис Ethereum основан на непревзойдённых сетевых эффектах и компонуемости. Дорожная карта, ориентированная на rollup, позиционирует его как слой расчётов и доступности данных для мультичейн-будущего. Институциональное принятие через ETF, доходность от стейкинга и механизм сжигания EIP-1559 формируют структурный спрос. Сторонники считают, что ETH аккумулирует ценность всей экономики смарт-контрактов.",
      risks:
        "Конкуренция со стороны альтернативных Layer 1, предлагающих более низкие комиссии и высокую пропускную способность. Регуляторные риски в отношении классификации стейкинга. Риски исполнения дорожной карты масштабирования. Концентрация стейкинга в нескольких протоколах ликвидного стейкинга. Давление централизации из-за извлечения MEV.",
      tamsFit:
        "Основная позиция в кошельке долгосрочных активов (аллокация 20-30%). Также используется в DeFi-кошельке через стейкинг и кредитование. ETH служит залогом, газом и доходным активом в нескольких стратегиях TAMS. Накопление через усреднение долларовой стоимости.",
    },
    es: {
      description:
        "La plataforma líder de contratos inteligentes — columna vertebral de DeFi y la infraestructura Web3",
      overview:
        "Ethereum es la plataforma dominante de contratos inteligentes que impulsa la mayoría de los ecosistemas DeFi, NFT y Layer 2. Tras la transición a Proof of Stake mediante The Merge, la red se volvió deflacionaria bajo condiciones de alto uso. Alberga la comunidad de desarrolladores más grande en el ecosistema cripto y sirve como capa de liquidación para la mayor parte de la actividad económica on-chain.",
      thesis:
        "La tesis de Ethereum se basa en sus efectos de red y composabilidad sin igual. La hoja de ruta centrada en rollups lo posiciona como la capa de liquidación y disponibilidad de datos para un futuro multicadena. La adopción institucional a través de ETFs, rendimiento por staking y el mecanismo de quema EIP-1559 generan demanda estructural. Los defensores creen que ETH captura valor de toda la economía de contratos inteligentes.",
      risks:
        "Competencia de Layer 1 alternativos que ofrecen comisiones más bajas y mayor rendimiento. Riesgo regulatorio en torno a la clasificación del staking. Riesgo de ejecución en la hoja de ruta de escalabilidad. Concentración del poder de staking en pocos protocolos de staking líquido. Presiones de centralización por la extracción de MEV.",
      tamsFit:
        "Posición central en la cartera de tenencias a largo plazo (asignación del 20-30%). También se utiliza en la cartera DeFi mediante staking y préstamos. ETH funciona como colateral, gas y activo generador de rendimiento en múltiples estrategias TAMS. Acumulación mediante promedio de costo en dólares.",
    },
  },

  SOL: {
    en: {
      description:
        "בלוקצ׳יין בעל ביצועים גבוהים עם עלויות נמוכות ומהירות גבוהה",
      overview:
        "Solana is a high-performance Layer 1 blockchain achieving thousands of transactions per second at minimal cost. It uses a unique Proof of History consensus combined with Proof of Stake. The ecosystem has grown significantly in DeFi, NFTs, and consumer applications, with a strong developer community and institutional backing.",
      thesis:
        "Solana's architecture enables real-time, low-cost transactions that rival centralized systems. The Firedancer validator client adds redundancy and performance. Growing DeFi TVL, payments integrations (Visa, Shopify), and institutional interest suggest expanding utility. Supporters see Solana as the leading chain for high-frequency on-chain activity.",
      risks:
        "Historical network outages raise reliability concerns. Relative centralization of validators. Heavy competition from Ethereum L2s and other alt-L1s. Token unlock schedules and selling pressure. Dependency on core development teams.",
      tamsFit:
        "Allocated across the Trading wallet and DeFi wallet (5-10%). Suitable for active DeFi strategies, yield farming, and as a trading base. Used for high-frequency on-chain operations where speed matters.",
    },
    he: {
      description:
        "בלוקצ׳יין בעל ביצועים גבוהים המציע עלויות מזעריות ומהירות עיבוד יוצאת דופן",
      overview:
        "סולנה היא בלוקצ׳יין Layer 1 בעל ביצועים גבוהים המשיג אלפי עסקאות בשנייה בעלות מינימלית. הרשת מבוססת על מנגנון Proof of History ייחודי בשילוב עם Proof of Stake. המערכת האקולוגית צמחה באופן משמעותי בתחומי DeFi, NFT ויישומים צרכניים, עם קהילת מפתחים חזקה וגיבוי מוסדי.",
      thesis:
        "הארכיטקטורה של סולנה מאפשרת עסקאות בזמן אמת ובעלות נמוכה המתחרות במערכות ריכוזיות. לקוח הולידציה Firedancer מוסיף יתירות וביצועים. עליית ה-TVL ב-DeFi, אינטגרציות תשלומים עם Visa ו-Shopify ועניין מוסדי גובר מעידים על הרחבת השימושיות. תומכיה רואים בסולנה את השרשרת המובילה לפעילות on-chain בתדירות גבוהה.",
      risks:
        "השבתות רשת היסטוריות מעוררות חששות אמינות. ריכוזיות יחסית של הולידטורים. תחרות עזה מצד Ethereum L2s ושרשראות Layer 1 חלופיות. לוחות זמנים לשחרור טוקנים ולחצי מכירה. תלות בצוותי פיתוח מרכזיים.",
      tamsFit:
        "הקצאה בארנק המסחר וארנק ה-DeFi (5-10%). מתאים לאסטרטגיות DeFi פעילות, חקלאות תשואה ובסיס למסחר. משמש לפעולות on-chain בתדירות גבוהה בהן מהירות היא קריטית.",
    },
    ar: {
      description:
        "بلوكتشين عالي الأداء يوفر تكاليف منخفضة وسرعة معالجة فائقة",
      overview:
        "سولانا هي بلوكتشين من الطبقة الأولى عالي الأداء يحقق آلاف المعاملات في الثانية بتكلفة ضئيلة. تستخدم آلية إجماع فريدة تجمع بين إثبات التاريخ وإثبات الحصة. نما النظام البيئي بشكل ملحوظ في مجالات التمويل اللامركزي والرموز غير القابلة للاستبدال والتطبيقات الاستهلاكية، مع مجتمع مطورين قوي ودعم مؤسسي.",
      thesis:
        "تتيح بنية سولانا معاملات فورية منخفضة التكلفة تنافس الأنظمة المركزية. يضيف عميل التحقق Firedancer التكرار والأداء. يشير نمو القيمة المقفلة في التمويل اللامركزي وتكاملات المدفوعات مع Visa وShopify والاهتمام المؤسسي إلى توسع المنفعة. يرى المؤيدون سولانا كالسلسلة الرائدة للنشاط عالي التردد على السلسلة.",
      risks:
        "تثير انقطاعات الشبكة التاريخية مخاوف بشأن الموثوقية. مركزية نسبية للمدققين. منافسة شديدة من شبكات الطبقة الثانية لإيثريوم وبدائل الطبقة الأولى. جداول فتح الرموز وضغوط البيع. الاعتماد على فرق التطوير الأساسية.",
      tamsFit:
        "تخصيص عبر محفظة التداول ومحفظة التمويل اللامركزي (5-10%). مناسب لاستراتيجيات التمويل اللامركزي النشطة وزراعة العائد وكقاعدة للتداول. يُستخدم للعمليات عالية التردد على السلسلة حيث تكون السرعة مهمة.",
    },
    ru: {
      description:
        "Высокопроизводительный блокчейн с минимальными комиссиями и высокой скоростью обработки",
      overview:
        "Solana — высокопроизводительный блокчейн Layer 1, обрабатывающий тысячи транзакций в секунду при минимальных затратах. Используется уникальный механизм консенсуса Proof of History в сочетании с Proof of Stake. Экосистема значительно выросла в сферах DeFi, NFT и потребительских приложений, обладая сильным сообществом разработчиков и институциональной поддержкой.",
      thesis:
        "Архитектура Solana обеспечивает транзакции в реальном времени с низкими затратами, конкурирующие с централизованными системами. Клиент-валидатор Firedancer повышает отказоустойчивость и производительность. Рост TVL в DeFi, интеграции платежей с Visa и Shopify, а также институциональный интерес свидетельствуют о расширении полезности. Сторонники считают Solana лидирующей сетью для высокочастотной on-chain активности.",
      risks:
        "Исторические сбои сети вызывают опасения относительно надёжности. Относительная централизация валидаторов. Жёсткая конкуренция со стороны L2-решений Ethereum и альтернативных L1. Графики разблокировки токенов и давление продаж. Зависимость от основных команд разработчиков.",
      tamsFit:
        "Распределение между торговым кошельком и DeFi-кошельком (5-10%). Подходит для активных DeFi-стратегий, фарминга доходности и в качестве торговой базы. Используется для высокочастотных on-chain операций, где важна скорость.",
    },
    es: {
      description:
        "Blockchain de alto rendimiento con costos mínimos y velocidad de procesamiento excepcional",
      overview:
        "Solana es un blockchain de Capa 1 de alto rendimiento que logra miles de transacciones por segundo a un costo mínimo. Utiliza un mecanismo de consenso único de Prueba de Historial combinado con Prueba de Participación. El ecosistema ha crecido significativamente en DeFi, NFTs y aplicaciones de consumo, con una fuerte comunidad de desarrolladores y respaldo institucional.",
      thesis:
        "La arquitectura de Solana permite transacciones en tiempo real y de bajo costo que rivalizan con los sistemas centralizados. El cliente validador Firedancer agrega redundancia y rendimiento. El crecimiento del TVL en DeFi, las integraciones de pagos con Visa y Shopify, y el interés institucional sugieren una utilidad en expansión. Sus defensores ven a Solana como la cadena líder para la actividad on-chain de alta frecuencia.",
      risks:
        "Las interrupciones históricas de la red generan preocupaciones de confiabilidad. Centralización relativa de los validadores. Fuerte competencia de las L2 de Ethereum y otras L1 alternativas. Calendarios de desbloqueo de tokens y presión de venta. Dependencia de los equipos centrales de desarrollo.",
      tamsFit:
        "Asignación entre la cartera de trading y la cartera DeFi (5-10%). Adecuado para estrategias activas de DeFi, farming de rendimiento y como base de trading. Se utiliza para operaciones on-chain de alta frecuencia donde la velocidad es prioritaria.",
    },
  },

  AVAX: {
    en: {
      description:
        "פלטפורמת Subnet מודולרית עם מיקוד מוסדי ו-RWA",
      overview:
        "Avalanche is a Layer 1 blockchain featuring a unique subnet architecture that allows custom blockchain deployment. It combines high throughput, fast finality (~1 second), and EVM compatibility. The platform has attracted institutional interest through tokenization initiatives and partnerships with major financial institutions.",
      thesis:
        "Avalanche's subnet model enables purpose-built blockchains for specific use cases — from gaming to institutional DeFi. Partnerships with financial institutions for tokenized assets position AVAX at the intersection of TradFi and DeFi. The consensus mechanism provides strong finality guarantees valued by institutional participants. Supporters believe subnets will capture enterprise and regulated use cases.",
      risks:
        "Subnet adoption still nascent relative to Ethereum L2s. Lower DeFi TVL than competitors. Competition from Cosmos and Polkadot in the multi-chain space. Token inflation from staking rewards. Need for continued institutional partnerships to validate subnet model.",
      tamsFit:
        "Long-Term Holdings wallet allocation (3-5%). Represents the TAMS thesis on institutional blockchain adoption and modular architecture. Monitored for subnet ecosystem growth and institutional integration milestones.",
    },
    he: {
      description:
        "פלטפורמת Subnet מודולרית המתמקדת באימוץ מוסדי וטוקניזציה של נכסים אמיתיים",
      overview:
        "אבלאנץ׳ היא בלוקצ׳יין Layer 1 בעל ארכיטקטורת subnet ייחודית המאפשרת פריסת בלוקצ׳יינים מותאמים אישית. הפלטפורמה משלבת תפוקה גבוהה, סופיות מהירה (כשנייה אחת) ותאימות ל-EVM. היא משכה עניין מוסדי באמצעות יוזמות טוקניזציה ושותפויות עם מוסדות פיננסיים מובילים.",
      thesis:
        "מודל ה-subnet של אבלאנץ׳ מאפשר בניית בלוקצ׳יינים ייעודיים לשימושים ספציפיים — מגיימינג ועד DeFi מוסדי. שותפויות עם מוסדות פיננסיים לטוקניזציית נכסים ממצבות את AVAX בצומת שבין TradFi ל-DeFi. מנגנון הקונצנזוס מספק ערבויות סופיות חזקות המוערכות על ידי שחקנים מוסדיים. תומכיה מאמינים כי subnets ילכדו שימושים ארגוניים ומוסדרים.",
      risks:
        "אימוץ ה-subnet עדיין בשלבים ראשוניים ביחס ל-L2 של את׳ריום. TVL נמוך יותר ב-DeFi בהשוואה למתחרים. תחרות מצד Cosmos ו-Polkadot במרחב הרב-שרשראות. אינפלציית טוקנים מתגמולי staking. צורך בהמשך שותפויות מוסדיות לאימות מודל ה-subnet.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (3-5%). מייצג את תזת TAMS בדבר אימוץ מוסדי של בלוקצ׳יין וארכיטקטורה מודולרית. נמדד לפי צמיחת מערכת ה-subnet ואבני דרך באינטגרציה מוסדית.",
    },
    ar: {
      description:
        "منصة Subnet معيارية تركز على التبني المؤسسي وترميز الأصول الحقيقية",
      overview:
        "أفالانش هو بلوكتشين من الطبقة الأولى يتميز ببنية شبكات فرعية فريدة تسمح بنشر سلاسل بلوكتشين مخصصة. يجمع بين الإنتاجية العالية والنهائية السريعة (حوالي ثانية واحدة) والتوافق مع EVM. جذبت المنصة اهتمامًا مؤسسيًا من خلال مبادرات الترميز والشراكات مع المؤسسات المالية الكبرى.",
      thesis:
        "يتيح نموذج الشبكات الفرعية في أفالانش بناء سلاسل بلوكتشين مخصصة لحالات استخدام محددة — من الألعاب إلى التمويل اللامركزي المؤسسي. تضع الشراكات مع المؤسسات المالية لترميز الأصول AVAX عند تقاطع التمويل التقليدي واللامركزي. يوفر آلية الإجماع ضمانات نهائية قوية يقدرها المشاركون المؤسسيون.",
      risks:
        "تبني الشبكات الفرعية لا يزال في مراحله الأولى مقارنة بشبكات الطبقة الثانية لإيثريوم. قيمة مقفلة أقل في التمويل اللامركزي مقارنة بالمنافسين. منافسة من Cosmos وPolkadot في مجال السلاسل المتعددة. تضخم الرموز من مكافآت الرهن. الحاجة لشراكات مؤسسية مستمرة.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (3-5%). يمثل أطروحة TAMS حول التبني المؤسسي للبلوكتشين والبنية المعيارية. يُراقب لنمو نظام الشبكات الفرعية ومعالم التكامل المؤسسي.",
    },
    ru: {
      description:
        "Модульная платформа Subnet с фокусом на институциональное применение и токенизацию реальных активов",
      overview:
        "Avalanche — блокчейн Layer 1 с уникальной архитектурой подсетей, позволяющей развёртывать пользовательские блокчейны. Платформа сочетает высокую пропускную способность, быструю финализацию (~1 секунда) и совместимость с EVM. Она привлекла институциональный интерес благодаря инициативам по токенизации и партнёрствам с крупными финансовыми учреждениями.",
      thesis:
        "Модель подсетей Avalanche позволяет создавать специализированные блокчейны для конкретных задач — от игр до институционального DeFi. Партнёрства с финансовыми институтами для токенизированных активов позиционируют AVAX на пересечении TradFi и DeFi. Механизм консенсуса обеспечивает надёжные гарантии финальности, ценимые институциональными участниками.",
      risks:
        "Принятие подсетей всё ещё находится на начальном этапе по сравнению с L2 Ethereum. Более низкий TVL в DeFi, чем у конкурентов. Конкуренция с Cosmos и Polkadot в мультичейн-пространстве. Инфляция токенов от наград за стейкинг. Необходимость продолжения институциональных партнёрств.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (3-5%). Отражает тезис TAMS об институциональном принятии блокчейна и модульной архитектуре. Отслеживается по росту экосистемы подсетей и институциональной интеграции.",
    },
    es: {
      description:
        "Plataforma modular de Subnets enfocada en la adopción institucional y tokenización de activos reales",
      overview:
        "Avalanche es un blockchain de Capa 1 con una arquitectura única de subnets que permite el despliegue de blockchains personalizados. Combina alto rendimiento, finalidad rápida (~1 segundo) y compatibilidad con EVM. La plataforma ha atraído interés institucional mediante iniciativas de tokenización y alianzas con importantes instituciones financieras.",
      thesis:
        "El modelo de subnets de Avalanche permite construir blockchains especializados para casos de uso específicos — desde gaming hasta DeFi institucional. Las alianzas con instituciones financieras para activos tokenizados posicionan a AVAX en la intersección entre TradFi y DeFi. El mecanismo de consenso proporciona sólidas garantías de finalidad valoradas por los participantes institucionales.",
      risks:
        "La adopción de subnets aún es incipiente en comparación con las L2 de Ethereum. Menor TVL en DeFi que los competidores. Competencia de Cosmos y Polkadot en el espacio multicadena. Inflación de tokens por recompensas de staking. Necesidad de alianzas institucionales continuas para validar el modelo de subnets.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (3-5%). Representa la tesis de TAMS sobre la adopción institucional de blockchain y la arquitectura modular. Se monitorea el crecimiento del ecosistema de subnets y los hitos de integración institucional.",
    },
  },

  ALGO: {
    en: {
      description:
        "בלוקצ׳יין עם מיקוד אקדמי, ממשלתי ופיננסי",
      overview:
        "Algorand is a Layer 1 blockchain founded by Turing Award winner Silvio Micali. It emphasizes formal verification, instant finality, and carbon-negative operations. The network has secured government contracts, CBDC pilots, and institutional partnerships, particularly in emerging markets and regulated environments.",
      thesis:
        "Algorand targets the intersection of academic rigor and real-world adoption. Government and central bank partnerships for CBDCs and national digital infrastructure provide unique demand drivers. The Pure Proof of Stake consensus offers strong decentralization guarantees. Supporters believe regulatory-friendly design will capture institutional and government use cases that other chains cannot.",
      risks:
        "Limited DeFi ecosystem compared to Ethereum and Solana. Foundation token sales have historically created selling pressure. Lower developer activity and community engagement. Risk that government blockchain adoption moves slower than expected. Competition from more established chains for institutional clients.",
      tamsFit:
        "Long-Term Holdings wallet allocation (2-3%). Represents exposure to government and CBDC adoption thesis. Position sized conservatively given ecosystem maturity. Monitored for government partnership announcements and CBDC developments.",
    },
    he: {
      description:
        "בלוקצ׳יין עם יסודות אקדמיים מובהקים, מיקוד ממשלתי ושותפויות פיננסיות",
      overview:
        "אלגורנד היא בלוקצ׳יין Layer 1 שנוסדה על ידי חתן פרס טיורינג סילביו מיקאלי. הרשת מדגישה אימות פורמלי, סופיות מיידית ופעילות ירוקה (פחמן-שלילית). היא זכתה בחוזים ממשלתיים, פיילוטים של CBDC ושותפויות מוסדיות, בפרט בשווקים מתפתחים וסביבות מוסדרות.",
      thesis:
        "אלגורנד פועלת בצומת שבין קפדנות אקדמית לאימוץ מעשי. שותפויות עם ממשלות ובנקים מרכזיים ל-CBDC ותשתית דיגיטלית לאומית מהוות מניעי ביקוש ייחודיים. מנגנון ה-Pure Proof of Stake מספק ערבויות ביזור חזקות. תומכיה מאמינים כי העיצוב הידידותי לרגולציה ילכוד שימושים מוסדיים וממשלתיים שאינם נגישים לשרשראות אחרות.",
      risks:
        "מערכת אקולוגית מוגבלת ב-DeFi בהשוואה לאת׳ריום וסולנה. מכירות טוקנים על ידי הקרן יצרו היסטורית לחצי מכירה. פעילות מפתחים ומעורבות קהילה נמוכה יחסית. סיכון שאימוץ ממשלתי של בלוקצ׳יין יתקדם לאט מהצפוי. תחרות מצד שרשראות מבוססות יותר על לקוחות מוסדיים.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (2-3%). מייצג חשיפה לתזת אימוץ ממשלתי ו-CBDC. גודל הפוזיציה שמרני לאור בשלות המערכת. נמדד לפי הכרזות שותפות ממשלתיות והתפתחויות CBDC.",
    },
    ar: {
      description:
        "بلوكتشين ذو أساس أكاديمي متين وتركيز حكومي ومالي مؤسسي",
      overview:
        "ألغوراند هو بلوكتشين من الطبقة الأولى أسسه الحائز على جائزة تورينغ سيلفيو ميكالي. يركز على التحقق الرسمي والنهائية الفورية والعمليات السلبية الكربون. حصلت الشبكة على عقود حكومية وتجارب عملات رقمية للبنوك المركزية وشراكات مؤسسية، خاصة في الأسواق الناشئة والبيئات المنظمة.",
      thesis:
        "يستهدف ألغوراند تقاطع الصرامة الأكاديمية والتبني الواقعي. توفر الشراكات مع الحكومات والبنوك المركزية للعملات الرقمية والبنية التحتية الرقمية الوطنية محركات طلب فريدة. يقدم إجماع إثبات الحصة النقي ضمانات لامركزية قوية. يعتقد المؤيدون أن التصميم المتوافق مع التنظيم سيستحوذ على حالات الاستخدام المؤسسية والحكومية.",
      risks:
        "نظام بيئي محدود في التمويل اللامركزي مقارنة بإيثريوم وسولانا. مبيعات رموز المؤسسة خلقت تاريخيًا ضغوط بيع. نشاط مطورين ومشاركة مجتمعية أقل. خطر أن يتحرك التبني الحكومي للبلوكتشين أبطأ من المتوقع. منافسة من سلاسل أكثر رسوخًا.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (2-3%). يمثل التعرض لأطروحة التبني الحكومي والعملات الرقمية للبنوك المركزية. حجم المركز محافظ نظرًا لنضج النظام البيئي. يُراقب لإعلانات الشراكات الحكومية وتطورات CBDC.",
    },
    ru: {
      description:
        "Блокчейн с выраженным академическим фундаментом, государственным и финансовым фокусом",
      overview:
        "Algorand — блокчейн Layer 1, основанный лауреатом премии Тьюринга Сильвио Микали. Сеть акцентирует формальную верификацию, мгновенную финализацию и углеродно-отрицательную деятельность. Она получила государственные контракты, пилоты CBDC и институциональные партнёрства, особенно на развивающихся рынках и в регулируемых средах.",
      thesis:
        "Algorand работает на пересечении академической строгости и практического применения. Партнёрства с правительствами и центральными банками по CBDC и национальной цифровой инфраструктуре создают уникальные драйверы спроса. Консенсус Pure Proof of Stake обеспечивает надёжные гарантии децентрализации. Сторонники считают, что регуляторно-дружественный дизайн привлечёт государственные и институциональные кейсы.",
      risks:
        "Ограниченная экосистема DeFi по сравнению с Ethereum и Solana. Продажи токенов фондом исторически создавали давление продаж. Низкая активность разработчиков и вовлечённость сообщества. Риск того, что государственное принятие блокчейна будет медленнее ожиданий. Конкуренция со стороны более зрелых сетей.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (2-3%). Отражает экспозицию к тезису государственного принятия и CBDC. Размер позиции консервативен с учётом зрелости экосистемы. Отслеживается по государственным партнёрствам и развитию CBDC.",
    },
    es: {
      description:
        "Blockchain con sólidos fundamentos académicos y enfoque gubernamental y financiero",
      overview:
        "Algorand es un blockchain de Capa 1 fundado por el ganador del Premio Turing Silvio Micali. Enfatiza la verificación formal, la finalidad instantánea y las operaciones carbono-negativas. La red ha asegurado contratos gubernamentales, pilotos de CBDC y alianzas institucionales, particularmente en mercados emergentes y entornos regulados.",
      thesis:
        "Algorand apunta a la intersección entre el rigor académico y la adopción real. Las alianzas con gobiernos y bancos centrales para CBDC e infraestructura digital nacional proporcionan impulsores de demanda únicos. El consenso Pure Proof of Stake ofrece sólidas garantías de descentralización. Sus defensores creen que el diseño favorable a la regulación capturará casos de uso institucionales y gubernamentales inaccesibles para otras cadenas.",
      risks:
        "Ecosistema DeFi limitado comparado con Ethereum y Solana. Las ventas de tokens de la fundación han creado históricamente presión de venta. Menor actividad de desarrolladores y participación comunitaria. Riesgo de que la adopción gubernamental de blockchain avance más lento de lo esperado. Competencia de cadenas más establecidas.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (2-3%). Representa exposición a la tesis de adopción gubernamental y CBDC. Tamaño de posición conservador dada la madurez del ecosistema. Se monitorean anuncios de alianzas gubernamentales y desarrollos de CBDC.",
    },
  },

  SUI: {
    en: {
      description:
        "בלוקצ׳יין מבוסס Move עם ארכיטקטורת אובייקטים ייחודית",
      overview:
        "Sui is a next-generation Layer 1 built using the Move programming language, originally developed at Meta (Diem). Its object-centric data model enables parallel transaction execution, resulting in high throughput and low latency. The ecosystem is growing rapidly across DeFi, gaming, and social applications.",
      thesis:
        "Sui's architecture represents a fundamental rethinking of blockchain state management. The object-centric model enables horizontal scaling and parallel processing that traditional account-based chains cannot match. Move language provides better safety guarantees than Solidity. Backed by strong technical talent from Meta. Supporters believe Sui's technical advantages will attract the next wave of on-chain applications requiring high performance.",
      risks:
        "Relatively young ecosystem with unproven long-term reliability. VC-backed with significant token unlock schedules. Competition from Aptos (same Move language origin). Developer adoption still trailing established ecosystems. Potential centralization during early network phases.",
      tamsFit:
        "Trading wallet and Long-Term Holdings allocation (2-4%). Represents the TAMS thesis on next-generation blockchain architecture. Higher risk/reward profile — position sized accordingly. Monitored for ecosystem growth metrics and developer adoption.",
    },
    he: {
      description:
        "בלוקצ׳יין דור הבא מבוסס שפת Move עם מודל נתונים ממוקד-אובייקטים ייחודי",
      overview:
        "Sui היא בלוקצ׳יין Layer 1 מהדור הבא הבנוי על שפת התכנות Move, שפותחה במקור ב-Meta (Diem). מודל הנתונים ממוקד-האובייקטים שלה מאפשר ביצוע מקבילי של עסקאות, ומניב תפוקה גבוהה והשהייה נמוכה. המערכת האקולוגית צומחת במהירות בתחומי DeFi, גיימינג ויישומים חברתיים.",
      thesis:
        "הארכיטקטורה של Sui מייצגת חשיבה מחדש יסודית על ניהול מצב בבלוקצ׳יין. המודל ממוקד-האובייקטים מאפשר הרחבה אופקית ועיבוד מקבילי שרשתות מבוססות-חשבון מסורתיות אינן מסוגלות להשתוות אליהם. שפת Move מספקת ערבויות בטיחות טובות יותר מ-Solidity. נתמכת על ידי כישרון טכני מעולה מ-Meta. תומכיה מאמינים כי היתרונות הטכניים ימשכו את הגל הבא של יישומים on-chain.",
      risks:
        "מערכת אקולוגית צעירה יחסית עם אמינות ארוכת טווח שטרם הוכחה. מגובה בהון סיכון עם לוחות זמנים משמעותיים לשחרור טוקנים. תחרות מצד Aptos (אותו מקור של שפת Move). אימוץ מפתחים עדיין בפיגור אחרי מערכות מבוססות. ריכוזיות אפשרית בשלבי הרשת המוקדמים.",
      tamsFit:
        "הקצאה בארנק המסחר ובאחזקות ארוכות הטווח (2-4%). מייצג את תזת TAMS בדבר ארכיטקטורת בלוקצ׳יין מהדור הבא. פרופיל סיכון/תשואה גבוה יותר — גודל הפוזיציה בהתאם. נמדד לפי מדדי צמיחת המערכת ואימוץ מפתחים.",
    },
    ar: {
      description:
        "بلوكتشين من الجيل التالي مبني على لغة Move مع نموذج بيانات فريد قائم على الكائنات",
      overview:
        "Sui هو بلوكتشين من الطبقة الأولى من الجيل التالي مبني باستخدام لغة البرمجة Move التي طُورت أصلاً في Meta (Diem). يتيح نموذج البيانات القائم على الكائنات تنفيذ المعاملات بالتوازي، مما يحقق إنتاجية عالية وزمن استجابة منخفض. ينمو النظام البيئي بسرعة عبر التمويل اللامركزي والألعاب والتطبيقات الاجتماعية.",
      thesis:
        "تمثل بنية Sui إعادة تفكير جذرية في إدارة حالة البلوكتشين. يتيح النموذج القائم على الكائنات التوسع الأفقي والمعالجة المتوازية التي لا تستطيع السلاسل التقليدية القائمة على الحسابات مضاهاتها. توفر لغة Move ضمانات أمان أفضل من Solidity. مدعوم بكفاءات تقنية متميزة من Meta.",
      risks:
        "نظام بيئي شاب نسبيًا مع موثوقية طويلة الأمد غير مثبتة. مدعوم برأس مال مخاطر مع جداول فتح رموز كبيرة. منافسة من Aptos (نفس أصل لغة Move). تبني المطورين لا يزال متأخرًا عن الأنظمة الراسخة. احتمال مركزية في المراحل المبكرة للشبكة.",
      tamsFit:
        "تخصيص في محفظة التداول والاحتفاظ طويل الأجل (2-4%). يمثل أطروحة TAMS حول بنية البلوكتشين من الجيل التالي. ملف مخاطر/عائد أعلى — حجم المركز وفقًا لذلك. يُراقب لمقاييس نمو النظام البيئي وتبني المطورين.",
    },
    ru: {
      description:
        "Блокчейн нового поколения на языке Move с уникальной объектно-ориентированной моделью данных",
      overview:
        "Sui — блокчейн Layer 1 нового поколения, построенный на языке программирования Move, изначально разработанном в Meta (Diem). Объектно-ориентированная модель данных обеспечивает параллельное выполнение транзакций, что даёт высокую пропускную способность и низкую задержку. Экосистема быстро растёт в сферах DeFi, игр и социальных приложений.",
      thesis:
        "Архитектура Sui представляет фундаментальное переосмысление управления состоянием блокчейна. Объектно-ориентированная модель обеспечивает горизонтальное масштабирование и параллельную обработку, недоступные традиционным сетям на основе аккаунтов. Язык Move обеспечивает лучшие гарантии безопасности, чем Solidity. Поддержан сильными техническими специалистами из Meta.",
      risks:
        "Относительно молодая экосистема с неподтверждённой долгосрочной надёжностью. Поддержана венчурным капиталом со значительными графиками разблокировки токенов. Конкуренция с Aptos (тот же язык Move). Принятие разработчиками отстаёт от устоявшихся экосистем. Потенциальная централизация на ранних этапах сети.",
      tamsFit:
        "Аллокация в торговом кошельке и долгосрочных активах (2-4%). Отражает тезис TAMS о блокчейн-архитектуре нового поколения. Более высокий профиль риска/доходности — размер позиции соответствующий. Отслеживается по метрикам роста экосистемы и принятию разработчиками.",
    },
    es: {
      description:
        "Blockchain de próxima generación basado en Move con un modelo de datos orientado a objetos único",
      overview:
        "Sui es un blockchain de Capa 1 de próxima generación construido con el lenguaje de programación Move, originalmente desarrollado en Meta (Diem). Su modelo de datos orientado a objetos permite la ejecución paralela de transacciones, logrando alto rendimiento y baja latencia. El ecosistema crece rápidamente en DeFi, gaming y aplicaciones sociales.",
      thesis:
        "La arquitectura de Sui representa un replanteamiento fundamental de la gestión de estado en blockchain. El modelo orientado a objetos permite escalado horizontal y procesamiento paralelo que las cadenas tradicionales basadas en cuentas no pueden igualar. El lenguaje Move proporciona mejores garantías de seguridad que Solidity. Respaldado por talento técnico destacado de Meta.",
      risks:
        "Ecosistema relativamente joven con confiabilidad a largo plazo no comprobada. Respaldado por capital de riesgo con calendarios significativos de desbloqueo de tokens. Competencia de Aptos (mismo origen del lenguaje Move). La adopción de desarrolladores aún rezagada respecto a ecosistemas establecidos. Posible centralización en las fases iniciales de la red.",
      tamsFit:
        "Asignación en la cartera de trading y tenencias a largo plazo (2-4%). Representa la tesis de TAMS sobre la arquitectura blockchain de próxima generación. Perfil de riesgo/recompensa más alto — tamaño de posición acorde. Se monitorean métricas de crecimiento del ecosistema y adopción de desarrolladores.",
    },
  },

  NEAR: {
    en: {
      description:
        "בלוקצ׳יין עם מיקוד על חוויית משתמש ו-chain abstraction",
      overview:
        "NEAR Protocol is a sharded Layer 1 blockchain focused on usability and developer experience. Its Nightshade sharding design enables horizontal scaling. NEAR pioneered the chain abstraction vision, allowing users to interact across multiple blockchains seamlessly. The ecosystem emphasizes AI integration and user-friendly onboarding.",
      thesis:
        "NEAR's chain abstraction thesis addresses the fundamental UX problem in crypto — users shouldn't need to know which chain they're on. The account aggregation layer and FastAuth simplify onboarding to near-Web2 levels. AI integration through NEAR AI adds a differentiated growth vector. Supporters believe the chain that solves UX will capture mainstream adoption.",
      risks:
        "Chain abstraction vision is ambitious but unproven at scale. Competition from other UX-focused solutions and account abstraction on Ethereum. Sharding implementation complexity. Developer ecosystem smaller than top competitors. Reliance on the chain abstraction narrative materializing.",
      tamsFit:
        "Long-Term Holdings wallet allocation (2-3%). Represents the TAMS thesis on mainstream blockchain adoption through UX innovation. Monitored for chain abstraction adoption metrics, user growth, and AI integration milestones.",
    },
    he: {
      description:
        "בלוקצ׳יין המתמקד בחוויית משתמש חלקה והפשטת מורכבות שרשראות (chain abstraction)",
      overview:
        "פרוטוקול NEAR הוא בלוקצ׳יין Layer 1 מפוצל המתמקד בשימושיות וחוויית מפתחים. עיצוב ה-sharding בשם Nightshade מאפשר הרחבה אופקית. NEAR חלצה את חזון ה-chain abstraction, המאפשר למשתמשים לפעול בין בלוקצ׳יינים מרובים בצורה חלקה. המערכת האקולוגית מדגישה אינטגרציית AI וחוויית כניסה ידידותית למשתמש.",
      thesis:
        "תזת ה-chain abstraction של NEAR מתייחסת לבעיית חוויית המשתמש היסודית בקריפטו — משתמשים לא צריכים לדעת באיזו שרשרת הם נמצאים. שכבת איחוד החשבונות ו-FastAuth מפשטות את תהליך הכניסה לרמה קרובה ל-Web2. אינטגרציית AI דרך NEAR AI מוסיפה וקטור צמיחה ייחודי. תומכיה מאמינים כי השרשרת שתפתור את חוויית המשתמש תלכוד את האימוץ המיינסטרימי.",
      risks:
        "חזון ה-chain abstraction שאפתני אך לא הוכח בקנה מידה. תחרות מצד פתרונות UX אחרים ו-account abstraction על את׳ריום. מורכבות יישום ה-sharding. מערכת מפתחים קטנה יותר ממתחרים מובילים. תלות בהתממשות הנרטיב של chain abstraction.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (2-3%). מייצג את תזת TAMS בדבר אימוץ בלוקצ׳יין מיינסטרימי באמצעות חדשנות UX. נמדד לפי מדדי אימוץ chain abstraction, צמיחת משתמשים ואבני דרך באינטגרציית AI.",
    },
    ar: {
      description:
        "بلوكتشين يركز على تجربة المستخدم السلسة وتجريد تعقيد السلاسل",
      overview:
        "بروتوكول NEAR هو بلوكتشين مُجزأ من الطبقة الأولى يركز على سهولة الاستخدام وتجربة المطورين. يتيح تصميم التجزئة Nightshade التوسع الأفقي. ابتكر NEAR رؤية تجريد السلاسل، مما يسمح للمستخدمين بالتفاعل عبر سلاسل بلوكتشين متعددة بسلاسة. يركز النظام البيئي على تكامل الذكاء الاصطناعي وتسهيل دخول المستخدمين.",
      thesis:
        "تعالج أطروحة تجريد السلاسل في NEAR مشكلة تجربة المستخدم الأساسية في العملات المشفرة — لا ينبغي أن يحتاج المستخدمون لمعرفة أي سلسلة يستخدمون. تبسط طبقة تجميع الحسابات وFastAuth عملية الدخول إلى مستويات قريبة من Web2. يضيف تكامل الذكاء الاصطناعي عبر NEAR AI متجه نمو متميز.",
      risks:
        "رؤية تجريد السلاسل طموحة لكن غير مثبتة على نطاق واسع. منافسة من حلول تجربة المستخدم الأخرى وتجريد الحسابات على إيثريوم. تعقيد تنفيذ التجزئة. نظام مطورين أصغر من المنافسين الرئيسيين. الاعتماد على تحقق سردية تجريد السلاسل.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (2-3%). يمثل أطروحة TAMS حول التبني الجماهيري للبلوكتشين من خلال ابتكار تجربة المستخدم. يُراقب لمقاييس تبني تجريد السلاسل ونمو المستخدمين ومعالم تكامل الذكاء الاصطناعي.",
    },
    ru: {
      description:
        "Блокчейн с фокусом на пользовательский опыт и абстракцию цепочек (chain abstraction)",
      overview:
        "NEAR Protocol — шардированный блокчейн Layer 1, ориентированный на удобство использования и опыт разработчиков. Дизайн шардинга Nightshade обеспечивает горизонтальное масштабирование. NEAR стал пионером концепции chain abstraction, позволяя пользователям беспрепятственно взаимодействовать с несколькими блокчейнами. Экосистема делает акцент на интеграции ИИ и удобной регистрации.",
      thesis:
        "Тезис chain abstraction NEAR решает фундаментальную проблему UX в крипто — пользователи не должны знать, в какой сети они находятся. Слой агрегации аккаунтов и FastAuth упрощают регистрацию до уровня Web2. Интеграция ИИ через NEAR AI добавляет уникальный вектор роста. Сторонники считают, что сеть, решившая проблему UX, привлечёт массовое принятие.",
      risks:
        "Концепция chain abstraction амбициозна, но не доказана в масштабе. Конкуренция с другими UX-решениями и account abstraction на Ethereum. Сложность реализации шардинга. Экосистема разработчиков меньше, чем у лидеров. Зависимость от реализации нарратива chain abstraction.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (2-3%). Отражает тезис TAMS о массовом принятии блокчейна через UX-инновации. Отслеживается по метрикам принятия chain abstraction, росту пользователей и интеграции ИИ.",
    },
    es: {
      description:
        "Blockchain enfocado en la experiencia del usuario y la abstracción de cadenas (chain abstraction)",
      overview:
        "NEAR Protocol es un blockchain fragmentado de Capa 1 enfocado en la usabilidad y la experiencia del desarrollador. Su diseño de fragmentación Nightshade permite el escalado horizontal. NEAR fue pionero en la visión de abstracción de cadenas, permitiendo a los usuarios interactuar entre múltiples blockchains sin fricciones. El ecosistema enfatiza la integración de IA y la incorporación amigable de usuarios.",
      thesis:
        "La tesis de abstracción de cadenas de NEAR aborda el problema fundamental de UX en cripto — los usuarios no deberían necesitar saber en qué cadena están. La capa de agregación de cuentas y FastAuth simplifican la incorporación a niveles cercanos a Web2. La integración de IA a través de NEAR AI agrega un vector de crecimiento diferenciado. Los defensores creen que la cadena que resuelva el UX capturará la adopción masiva.",
      risks:
        "La visión de abstracción de cadenas es ambiciosa pero no probada a escala. Competencia de otras soluciones de UX y abstracción de cuentas en Ethereum. Complejidad de implementación del fragmentado. Ecosistema de desarrolladores menor que los principales competidores. Dependencia de la materialización de la narrativa de abstracción de cadenas.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (2-3%). Representa la tesis de TAMS sobre la adopción masiva de blockchain mediante innovación en UX. Se monitorean métricas de adopción de abstracción de cadenas, crecimiento de usuarios e hitos de integración de IA.",
    },
  },

  // ========== Payments ==========

  XRP: {
    en: {
      description:
        "רשת תשלומים חוצי-גבולות עם מיקוד מוסדי ובנקאי",
      overview:
        "XRP operates on the XRP Ledger (XRPL), designed for fast, low-cost cross-border payments. Ripple, the company behind XRP, partners with financial institutions globally for international money transfers. Following the SEC lawsuit resolution, XRP gained regulatory clarity in the US market, potentially opening institutional adoption pathways.",
      thesis:
        "The cross-border payments market exceeds $150T annually with significant inefficiencies. XRP's sub-second settlement and minimal fees offer compelling advantages over SWIFT. Regulatory clarity post-SEC case removes a major overhang. Institutional adoption through Ripple's ODL (On-Demand Liquidity) product could drive structural demand. Supporters believe XRP bridges TradFi and crypto for payments infrastructure.",
      risks:
        "Competition from stablecoins and CBDCs for cross-border payments. Ongoing regulatory uncertainty in some jurisdictions. Centralization concerns around Ripple's token holdings and influence. Network adoption has been slower than expected. Market perception still affected by the SEC lawsuit history.",
      tamsFit:
        "Long-Term Holdings wallet allocation (3-5%). Represents the TAMS thesis on institutional payments infrastructure transformation. Position provides exposure to TradFi adoption without DeFi-specific risks. Monitored for institutional partnership announcements and ODL volume.",
    },
    he: {
      description:
        "רשת תשלומים חוצי-גבולות המתמקדת באימוץ מוסדי ובנקאי בקנה מידה גלובלי",
      overview:
        "XRP פועל על XRP Ledger (XRPL), שתוכנן להעברות חוצי-גבולות מהירות ובעלות נמוכה. חברת Ripple, העומדת מאחורי XRP, משתפת פעולה עם מוסדות פיננסיים ברחבי העולם להעברות כספים בינלאומיות. בעקבות יישוב התביעה מול ה-SEC, XRP זכה לבהירות רגולטורית בשוק האמריקאי, מה שעשוי לפתוח נתיבים לאימוץ מוסדי.",
      thesis:
        "שוק התשלומים חוצי-הגבולות עולה על 150 טריליון דולר בשנה עם חוסר יעילות משמעותי. סליקה תת-שנייתית ועמלות מינימליות של XRP מציעות יתרונות מרשימים על פני SWIFT. בהירות רגולטורית לאחר תביעת ה-SEC מסירה עננה משמעותית. אימוץ מוסדי דרך מוצר ה-ODL של Ripple עשוי ליצור ביקוש מבני. תומכיו מאמינים כי XRP מגשר בין פיננסים מסורתיים לקריפטו בתשתיות תשלומים.",
      risks:
        "תחרות מצד מטבעות יציבים ו-CBDC בתחום תשלומים חוצי-גבולות. אי-ודאות רגולטורית מתמשכת בחלק מהתחומי שיפוט. חששות ריכוזיות סביב אחזקות הטוקנים והשפעת Ripple. אימוץ הרשת איטי מהצפוי. תפיסת השוק עדיין מושפעת מהיסטוריית תביעת ה-SEC.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (3-5%). מייצג את תזת TAMS בדבר טרנספורמציה בתשתיות תשלומים מוסדיות. הפוזיציה מספקת חשיפה לאימוץ פיננסי מסורתי ללא סיכוני DeFi ספציפיים. נמדד לפי הכרזות שותפות מוסדיות ונפח ODL.",
    },
    ar: {
      description:
        "شبكة مدفوعات عابرة للحدود تركز على التبني المؤسسي والمصرفي العالمي",
      overview:
        "يعمل XRP على دفتر XRP (XRPL) المصمم للمدفوعات العابرة للحدود السريعة ومنخفضة التكلفة. تتشارك شركة Ripple التي تقف وراء XRP مع المؤسسات المالية عالميًا لتحويل الأموال الدولية. بعد حل دعوى هيئة الأوراق المالية، حصل XRP على وضوح تنظيمي في السوق الأمريكية، مما قد يفتح مسارات التبني المؤسسي.",
      thesis:
        "يتجاوز سوق المدفوعات العابرة للحدود 150 تريليون دولار سنويًا مع عدم كفاءة كبيرة. توفر التسوية الفورية والرسوم الضئيلة لـ XRP مزايا مقنعة على نظام SWIFT. يزيل الوضوح التنظيمي بعد قضية SEC عبئًا رئيسيًا. قد يدفع التبني المؤسسي عبر منتج ODL من Ripple طلبًا هيكليًا.",
      risks:
        "منافسة من العملات المستقرة والعملات الرقمية للبنوك المركزية في المدفوعات العابرة للحدود. عدم يقين تنظيمي مستمر في بعض الولايات القضائية. مخاوف مركزية حول حيازات Ripple للرموز وتأثيرها. تبني الشبكة أبطأ من المتوقع. تصور السوق لا يزال متأثرًا بتاريخ دعوى SEC.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (3-5%). يمثل أطروحة TAMS حول تحول البنية التحتية للمدفوعات المؤسسية. يوفر المركز تعرضًا لتبني التمويل التقليدي دون مخاطر التمويل اللامركزي المحددة. يُراقب لإعلانات الشراكات المؤسسية وحجم ODL.",
    },
    ru: {
      description:
        "Сеть трансграничных платежей с фокусом на институциональное и банковское принятие",
      overview:
        "XRP работает на XRP Ledger (XRPL), разработанном для быстрых и дешёвых трансграничных платежей. Компания Ripple сотрудничает с финансовыми учреждениями по всему миру для международных денежных переводов. После урегулирования иска SEC XRP получил регуляторную ясность на американском рынке, потенциально открывая пути институционального принятия.",
      thesis:
        "Рынок трансграничных платежей превышает $150 трлн в год при значительной неэффективности. Расчёт менее чем за секунду и минимальные комиссии XRP предлагают убедительные преимущества перед SWIFT. Регуляторная ясность после дела SEC снимает серьёзное давление. Институциональное принятие через продукт ODL от Ripple может создать структурный спрос.",
      risks:
        "Конкуренция со стороны стейблкоинов и CBDC в сфере трансграничных платежей. Сохраняющаяся регуляторная неопределённость в ряде юрисдикций. Опасения централизации вокруг токен-холдингов Ripple. Принятие сети медленнее ожидаемого. Рыночное восприятие всё ещё под влиянием истории иска SEC.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (3-5%). Отражает тезис TAMS о трансформации институциональной платёжной инфраструктуры. Позиция обеспечивает экспозицию к принятию TradFi без специфических DeFi-рисков. Отслеживается по институциональным партнёрствам и объёмам ODL.",
    },
    es: {
      description:
        "Red de pagos transfronterizos enfocada en la adopción institucional y bancaria global",
      overview:
        "XRP opera en el XRP Ledger (XRPL), diseñado para pagos transfronterizos rápidos y de bajo costo. Ripple, la empresa detrás de XRP, se asocia con instituciones financieras globalmente para transferencias internacionales de dinero. Tras la resolución de la demanda de la SEC, XRP obtuvo claridad regulatoria en el mercado estadounidense, abriendo potencialmente vías de adopción institucional.",
      thesis:
        "El mercado de pagos transfronterizos supera los $150 billones anuales con ineficiencias significativas. La liquidación en menos de un segundo y las comisiones mínimas de XRP ofrecen ventajas convincentes sobre SWIFT. La claridad regulatoria post-SEC elimina una presión importante. La adopción institucional a través del producto ODL de Ripple podría impulsar demanda estructural.",
      risks:
        "Competencia de stablecoins y CBDC en pagos transfronterizos. Incertidumbre regulatoria continua en algunas jurisdicciones. Preocupaciones de centralización en torno a las tenencias de tokens de Ripple y su influencia. La adopción de la red ha sido más lenta de lo esperado. La percepción del mercado sigue afectada por el historial de la demanda de la SEC.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (3-5%). Representa la tesis de TAMS sobre la transformación de la infraestructura de pagos institucionales. La posición proporciona exposición a la adopción de TradFi sin riesgos específicos de DeFi. Se monitorean anuncios de alianzas institucionales y volumen de ODL.",
    },
  },

  XLM: {
    en: {
      description:
        "רשת תשלומים פתוחה למיקרו-עסקאות ונכסים דיגיטליים",
      overview:
        "Stellar is an open-source payment network designed for financial inclusion and micro-transactions. It enables the issuance and transfer of digital representations of any currency. The Stellar Development Foundation partners with organizations for remittances, mobile money, and CBDC infrastructure in developing markets.",
      thesis:
        "Stellar targets the unbanked and underbanked populations — a market of 1.4 billion adults globally. Its focus on compliance, anchor network, and Soroban smart contracts expansion adds utility beyond basic transfers. USDC integration on Stellar provides stablecoin rails. Supporters believe Stellar will capture the financial inclusion narrative as emerging markets digitize.",
      risks:
        "Relatively low market visibility compared to competitors. Slow smart contract adoption on Soroban. Competition from XRP, stablecoins, and mobile money solutions. Token supply and SDF holdings create dilution risk. Network activity metrics still modest relative to aspirations.",
      tamsFit:
        "Long-Term Holdings wallet allocation (1-2%). Represents a smaller position in the payments and financial inclusion thesis. Lower correlation with DeFi-native assets provides portfolio diversification. Monitored for partnerships in developing markets and stablecoin volume growth.",
    },
    he: {
      description:
        "רשת תשלומים פתוחה המתמקדת בהכלה פיננסית, מיקרו-עסקאות ונכסים דיגיטליים",
      overview:
        "סטלר היא רשת תשלומים קוד-פתוח המיועדת להכלה פיננסית ומיקרו-עסקאות. היא מאפשרת הנפקה והעברה של ייצוגים דיגיטליים של כל מטבע. קרן הפיתוח של סטלר משתפת פעולה עם ארגונים בתחומי העברות כספים, כסף נייד ותשתית CBDC בשווקים מתפתחים.",
      thesis:
        "סטלר מכוונת לאוכלוסיות ללא גישה בנקאית או עם גישה חלקית — שוק של 1.4 מיליארד מבוגרים ברחבי העולם. המיקוד בציות, רשת ה-anchor והרחבת חוזי Soroban החכמים מוסיפים שימושיות מעבר להעברות בסיסיות. אינטגרציית USDC על סטלר מספקת מסלולי מטבע יציב. תומכיה מאמינים כי סטלר תלכוד את נרטיב ההכלה הפיננסית ככל שהשווקים המתפתחים עוברים דיגיטציה.",
      risks:
        "נראות שוקית נמוכה יחסית בהשוואה למתחרים. אימוץ איטי של חוזים חכמים על Soroban. תחרות מצד XRP, מטבעות יציבים ופתרונות כסף נייד. היצע הטוקנים ואחזקות SDF יוצרים סיכון דילול. מדדי פעילות הרשת עדיין צנועים ביחס לשאיפות.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (1-2%). מייצג פוזיציה קטנה יותר בתזת התשלומים וההכלה הפיננסית. מתאם נמוך עם נכסי DeFi מספק גיוון תיק. נמדד לפי שותפויות בשווקים מתפתחים וצמיחת נפח מטבעות יציבים.",
    },
    ar: {
      description:
        "شبكة مدفوعات مفتوحة المصدر تركز على الشمول المالي والمعاملات الصغيرة والأصول الرقمية",
      overview:
        "ستيلر هي شبكة مدفوعات مفتوحة المصدر مصممة للشمول المالي والمعاملات الصغيرة. تتيح إصدار ونقل التمثيلات الرقمية لأي عملة. تتشارك مؤسسة تطوير ستيلر مع منظمات في مجالات التحويلات والأموال المتنقلة والبنية التحتية للعملات الرقمية للبنوك المركزية في الأسواق النامية.",
      thesis:
        "تستهدف ستيلر السكان غير المتعاملين مع البنوك — سوق يضم 1.4 مليار بالغ عالميًا. يضيف التركيز على الامتثال وشبكة المرساة وتوسع عقود Soroban الذكية منفعة تتجاوز التحويلات الأساسية. يوفر تكامل USDC على ستيلر مسارات عملات مستقرة. يعتقد المؤيدون أن ستيلر ستستحوذ على سردية الشمول المالي مع رقمنة الأسواق الناشئة.",
      risks:
        "رؤية سوقية منخفضة نسبيًا مقارنة بالمنافسين. تبني بطيء للعقود الذكية على Soroban. منافسة من XRP والعملات المستقرة وحلول الأموال المتنقلة. عرض الرموز وحيازات SDF تخلق مخاطر تخفيف. مقاييس نشاط الشبكة لا تزال متواضعة مقارنة بالطموحات.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (1-2%). يمثل مركزًا أصغر في أطروحة المدفوعات والشمول المالي. الارتباط المنخفض مع أصول التمويل اللامركزي يوفر تنويعًا للمحفظة. يُراقب للشراكات في الأسواق النامية ونمو حجم العملات المستقرة.",
    },
    ru: {
      description:
        "Открытая платёжная сеть для микротранзакций, финансовой инклюзии и цифровых активов",
      overview:
        "Stellar — платёжная сеть с открытым исходным кодом, созданная для финансовой инклюзии и микротранзакций. Она позволяет выпускать и передавать цифровые представления любой валюты. Фонд развития Stellar сотрудничает с организациями в сфере переводов, мобильных денег и инфраструктуры CBDC на развивающихся рынках.",
      thesis:
        "Stellar нацелена на население без банковского обслуживания — рынок из 1,4 миллиарда взрослых по всему миру. Фокус на комплаенсе, сети анкоров и расширении смарт-контрактов Soroban добавляет полезность помимо базовых переводов. Интеграция USDC на Stellar обеспечивает стейблкоин-рельсы. Сторонники считают, что Stellar захватит нарратив финансовой инклюзии по мере цифровизации развивающихся рынков.",
      risks:
        "Относительно низкая рыночная видимость по сравнению с конкурентами. Медленное принятие смарт-контрактов на Soroban. Конкуренция со стороны XRP, стейблкоинов и решений мобильных денег. Предложение токенов и холдинги SDF создают риск размывания. Метрики сетевой активности всё ещё скромные.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (1-2%). Отражает меньшую позицию в тезисе платежей и финансовой инклюзии. Низкая корреляция с DeFi-активами обеспечивает диверсификацию портфеля. Отслеживается по партнёрствам на развивающихся рынках и росту объёмов стейблкоинов.",
    },
    es: {
      description:
        "Red de pagos de código abierto enfocada en inclusión financiera, microtransacciones y activos digitales",
      overview:
        "Stellar es una red de pagos de código abierto diseñada para la inclusión financiera y las microtransacciones. Permite la emisión y transferencia de representaciones digitales de cualquier moneda. La Fundación de Desarrollo Stellar se asocia con organizaciones para remesas, dinero móvil e infraestructura CBDC en mercados en desarrollo.",
      thesis:
        "Stellar apunta a las poblaciones no bancarizadas y sub-bancarizadas — un mercado de 1,400 millones de adultos a nivel global. Su enfoque en cumplimiento, red de anclajes y expansión de contratos inteligentes Soroban agrega utilidad más allá de las transferencias básicas. La integración de USDC en Stellar proporciona vías de stablecoins. Sus defensores creen que Stellar capturará la narrativa de inclusión financiera a medida que los mercados emergentes se digitalicen.",
      risks:
        "Visibilidad de mercado relativamente baja comparada con competidores. Adopción lenta de contratos inteligentes en Soroban. Competencia de XRP, stablecoins y soluciones de dinero móvil. La oferta de tokens y las tenencias de SDF crean riesgo de dilución. Las métricas de actividad de la red siguen siendo modestas respecto a las aspiraciones.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (1-2%). Representa una posición menor en la tesis de pagos e inclusión financiera. La baja correlación con activos nativos de DeFi proporciona diversificación de cartera. Se monitorean alianzas en mercados en desarrollo y crecimiento del volumen de stablecoins.",
    },
  },

  // ========== Enterprise ==========

  XDC: {
    en: {
      description:
        "בלוקצ׳יין ארגוני ממוקד סחר בינלאומי ומימון שרשרת אספקה",
      overview:
        "XDC Network is an enterprise-grade, EVM-compatible blockchain focused on trade finance and tokenization. It uses Delegated Proof of Stake (XDPoS) consensus for fast, low-cost transactions. The network targets the $5.2 trillion trade finance gap, partnering with trade finance platforms and financial institutions for invoice factoring, letters of credit, and supply chain financing.",
      thesis:
        "Trade finance is one of the largest underserved markets in global finance, with a $5.2T gap primarily affecting SMEs. XDC's enterprise focus and compliance-ready infrastructure positions it to capture tokenized trade finance instruments. Partnerships with platforms like TradeFinex demonstrate real-world utility. Supporters believe blockchain-based trade finance will be one of the first institutional-scale use cases.",
      risks:
        "Enterprise blockchain adoption is slower than anticipated. Competition from private/permissioned chains and traditional fintech. Relatively low public awareness and liquidity. Dependency on trade finance partnerships materializing at scale. Small validator set raises centralization concerns.",
      tamsFit:
        "Long-Term Holdings wallet allocation (1-2%). Niche exposure to enterprise blockchain and trade finance digitization. Higher conviction required given lower liquidity. Monitored for trade finance volume, institutional partnerships, and TVL growth.",
    },
    he: {
      description:
        "בלוקצ׳יין ארגוני המתמקד בסחר בינלאומי, מימון שרשרת אספקה וטוקניזציה",
      overview:
        "רשת XDC היא בלוקצ׳יין ברמה ארגונית, תואם EVM, המתמקד במימון סחר וטוקניזציה. היא משתמשת בקונצנזוס Delegated Proof of Stake (XDPoS) לעסקאות מהירות ובעלות נמוכה. הרשת מכוונת לפער מימון הסחר בהיקף 5.2 טריליון דולר, תוך שיתוף פעולה עם פלטפורמות מימון סחר ומוסדות פיננסיים בתחומי פקטורינג חשבוניות, מכתבי אשראי ומימון שרשרת אספקה.",
      thesis:
        "מימון סחר הוא אחד השווקים הגדולים והמוזנחים ביותר בפיננסים הגלובליים, עם פער של 5.2 טריליון דולר המשפיע בעיקר על עסקים קטנים ובינוניים. המיקוד הארגוני של XDC ותשתית מוכנת לציות ממצבים אותה ללכוד מכשירי מימון סחר מטוקנזים. שותפויות עם פלטפורמות כמו TradeFinex מדגימות שימושיות מעשית. תומכיה מאמינים כי מימון סחר מבוסס בלוקצ׳יין יהיה מבין שימושי הקנה-מידה המוסדיים הראשונים.",
      risks:
        "אימוץ ארגוני של בלוקצ׳יין איטי מהצפוי. תחרות מצד שרשראות פרטיות/מורשות ופינטק מסורתי. מודעות ציבורית ונזילות נמוכות יחסית. תלות בהתממשות שותפויות מימון סחר בקנה מידה. מספר קטן של ולידטורים מעלה חששות ריכוזיות.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (1-2%). חשיפת נישה לבלוקצ׳יין ארגוני ודיגיטציה של מימון סחר. נדרשת אמונה גבוהה יותר לאור הנזילות הנמוכה. נמדד לפי נפח מימון סחר, שותפויות מוסדיות וצמיחת TVL.",
    },
    ar: {
      description:
        "بلوكتشين مؤسسي يركز على التجارة الدولية وتمويل سلسلة التوريد والترميز",
      overview:
        "شبكة XDC هي بلوكتشين مؤسسي متوافق مع EVM يركز على تمويل التجارة والترميز. تستخدم آلية إجماع إثبات الحصة المفوض (XDPoS) للمعاملات السريعة ومنخفضة التكلفة. تستهدف الشبكة فجوة تمويل التجارة البالغة 5.2 تريليون دولار، بالشراكة مع منصات تمويل التجارة والمؤسسات المالية.",
      thesis:
        "تمويل التجارة هو أحد أكبر الأسواق المحرومة في التمويل العالمي، بفجوة تبلغ 5.2 تريليون دولار تؤثر بشكل رئيسي على الشركات الصغيرة والمتوسطة. يضع التركيز المؤسسي لـ XDC والبنية التحتية الجاهزة للامتثال في موقع يتيح الاستحواذ على أدوات تمويل التجارة المرمزة. تثبت الشراكات مع منصات مثل TradeFinex المنفعة الواقعية.",
      risks:
        "تبني البلوكتشين المؤسسي أبطأ مما كان متوقعًا. منافسة من السلاسل الخاصة والتكنولوجيا المالية التقليدية. وعي عام وسيولة منخفضان نسبيًا. الاعتماد على تحقق شراكات تمويل التجارة على نطاق واسع. مجموعة صغيرة من المدققين تثير مخاوف المركزية.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (1-2%). تعرض متخصص للبلوكتشين المؤسسي ورقمنة تمويل التجارة. يتطلب قناعة أعلى نظرًا للسيولة المنخفضة. يُراقب لحجم تمويل التجارة والشراكات المؤسسية ونمو القيمة المقفلة.",
    },
    ru: {
      description:
        "Корпоративный блокчейн для международной торговли, финансирования цепочек поставок и токенизации",
      overview:
        "Сеть XDC — корпоративный EVM-совместимый блокчейн, ориентированный на торговое финансирование и токенизацию. Используется консенсус Delegated Proof of Stake (XDPoS) для быстрых и дешёвых транзакций. Сеть нацелена на разрыв в торговом финансировании объёмом $5,2 трлн, сотрудничая с платформами торгового финансирования и финансовыми учреждениями.",
      thesis:
        "Торговое финансирование — один из крупнейших недообслуженных рынков в глобальных финансах с разрывом в $5,2 трлн, затрагивающим преимущественно МСП. Корпоративный фокус XDC и инфраструктура, готовая к комплаенсу, позиционируют его для захвата токенизированных инструментов торгового финансирования. Партнёрства с платформами вроде TradeFinex демонстрируют реальную полезность.",
      risks:
        "Корпоративное принятие блокчейна медленнее ожидаемого. Конкуренция со стороны частных/разрешённых сетей и традиционного финтеха. Относительно низкая публичная осведомлённость и ликвидность. Зависимость от масштабирования партнёрств в торговом финансировании. Малое число валидаторов вызывает опасения централизации.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (1-2%). Нишевая экспозиция к корпоративному блокчейну и цифровизации торгового финансирования. Требуется более высокая убеждённость из-за низкой ликвидности. Отслеживается по объёмам торгового финансирования, институциональным партнёрствам и росту TVL.",
    },
    es: {
      description:
        "Blockchain empresarial enfocado en comercio internacional, financiamiento de cadena de suministro y tokenización",
      overview:
        "XDC Network es un blockchain de grado empresarial compatible con EVM, enfocado en el financiamiento comercial y la tokenización. Utiliza un consenso de Prueba de Participación Delegada (XDPoS) para transacciones rápidas y de bajo costo. La red apunta a la brecha de financiamiento comercial de $5.2 billones, asociándose con plataformas de financiamiento comercial e instituciones financieras.",
      thesis:
        "El financiamiento comercial es uno de los mercados más grandes y desatendidos en las finanzas globales, con una brecha de $5.2 billones que afecta principalmente a las PyMEs. El enfoque empresarial de XDC y su infraestructura lista para el cumplimiento lo posicionan para capturar instrumentos de financiamiento comercial tokenizados. Las alianzas con plataformas como TradeFinex demuestran utilidad real.",
      risks:
        "La adopción empresarial de blockchain es más lenta de lo anticipado. Competencia de cadenas privadas/permisionadas y fintech tradicional. Conciencia pública y liquidez relativamente bajas. Dependencia de la materialización de alianzas de financiamiento comercial a escala. Un conjunto pequeño de validadores genera preocupaciones de centralización.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (1-2%). Exposición de nicho al blockchain empresarial y la digitalización del financiamiento comercial. Se requiere mayor convicción dada la menor liquidez. Se monitorean el volumen de financiamiento comercial, alianzas institucionales y crecimiento del TVL.",
    },
  },

  HBAR: {
    en: {
      description:
        "רשת ארגונית עם מועצת ממשל של תאגידים גלובליים",
      overview:
        "Hedera is a public distributed ledger governed by a council of up to 39 major global organizations including Google, IBM, Boeing, and Deutsche Telekom. It uses hashgraph consensus technology for high throughput, low fees, and fair ordering. The network targets enterprise use cases including supply chain, identity verification, and tokenized assets.",
      thesis:
        "Hedera's governance model — a council of Fortune 500 companies — provides unique legitimacy and enterprise trust. The hashgraph consensus offers mathematical fairness guarantees and high performance. Growing real-world usage in supply chain (Avery Dennison), sustainability (DOVU), and stablecoin rails. Supporters believe the council governance model will attract enterprise adoption that purely decentralized chains cannot.",
      risks:
        "Perceived centralization due to council governance model. Lower DeFi and developer ecosystem compared to EVM chains. Token economics and foundation holdings create supply overhang. Competition from Ethereum enterprise solutions and private chains. Network effects lag behind established platforms.",
      tamsFit:
        "Long-Term Holdings wallet allocation (2-3%). Represents the TAMS thesis on enterprise blockchain adoption through credible governance. Provides portfolio diversification away from DeFi-native assets. Monitored for council member activity, network usage metrics, and enterprise deployments.",
    },
    he: {
      description:
        "רשת ארגונית ציבורית מנוהלת על ידי מועצת ממשל של תאגידים גלובליים מובילים",
      overview:
        "הדרה היא פנקס מבוזר ציבורי המנוהל על ידי מועצה של עד 39 ארגונים גלובליים מובילים, ביניהם Google, IBM, Boeing ו-Deutsche Telekom. היא משתמשת בטכנולוגיית hashgraph לתפוקה גבוהה, עמלות נמוכות וסדר הוגן. הרשת מכוונת לשימושים ארגוניים כולל שרשרת אספקה, אימות זהות ונכסים מטוקנזים.",
      thesis:
        "מודל הממשל של הדרה — מועצת חברות Fortune 500 — מספק לגיטימיות ייחודית ואמון ארגוני. קונצנזוס ה-hashgraph מציע ערבויות הוגנות מתמטיות וביצועים גבוהים. שימוש מעשי הולך וגדל בשרשרת אספקה, קיימות ומסלולי מטבעות יציבים. תומכיו מאמינים כי מודל הממשל יימשוך אימוץ ארגוני שרשתות מבוזרות לחלוטין אינן מסוגלות להשיג.",
      risks:
        "תפיסת ריכוזיות בשל מודל הממשל המועצתי. מערכת DeFi ומפתחים מוגבלת יותר בהשוואה לשרשראות EVM. כלכלת טוקנים ואחזקות הקרן יוצרות עודף היצע. תחרות מצד פתרונות ארגוניים של את׳ריום ושרשראות פרטיות. אפקט רשת בפיגור אחרי פלטפורמות מבוססות.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (2-3%). מייצג את תזת TAMS בדבר אימוץ ארגוני של בלוקצ׳יין באמצעות ממשל אמין. מספק גיוון תיק הרחק מנכסי DeFi. נמדד לפי פעילות חברי המועצה, מדדי שימוש ברשת ופריסות ארגוניות.",
    },
    ar: {
      description:
        "شبكة مؤسسية عامة تحكمها مجلس إدارة من الشركات العالمية الرائدة",
      overview:
        "هيديرا هي دفتر أستاذ موزع عام يحكمه مجلس يضم حتى 39 مؤسسة عالمية كبرى بما في ذلك Google وIBM وBoeing وDeutsche Telekom. تستخدم تقنية إجماع الهاشغراف لتحقيق إنتاجية عالية ورسوم منخفضة وترتيب عادل. تستهدف الشبكة حالات الاستخدام المؤسسية بما في ذلك سلسلة التوريد والتحقق من الهوية والأصول المرمزة.",
      thesis:
        "يوفر نموذج حوكمة هيديرا — مجلس من شركات Fortune 500 — شرعية فريدة وثقة مؤسسية. يقدم إجماع الهاشغراف ضمانات عدالة رياضية وأداء عالي. استخدام واقعي متزايد في سلسلة التوريد والاستدامة ومسارات العملات المستقرة. يعتقد المؤيدون أن نموذج الحوكمة سيجذب تبنيًا مؤسسيًا لا تستطيع السلاسل اللامركزية بالكامل تحقيقه.",
      risks:
        "تصور المركزية بسبب نموذج حوكمة المجلس. نظام بيئي أقل في التمويل اللامركزي والمطورين مقارنة بسلاسل EVM. اقتصاديات الرموز وحيازات المؤسسة تخلق فائضًا في العرض. منافسة من حلول إيثريوم المؤسسية والسلاسل الخاصة. تأثيرات الشبكة متأخرة عن المنصات الراسخة.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (2-3%). يمثل أطروحة TAMS حول التبني المؤسسي للبلوكتشين من خلال الحوكمة الموثوقة. يوفر تنويعًا للمحفظة بعيدًا عن أصول التمويل اللامركزي. يُراقب لنشاط أعضاء المجلس ومقاييس استخدام الشبكة والنشر المؤسسي.",
    },
    ru: {
      description:
        "Публичная корпоративная сеть, управляемая советом из ведущих глобальных корпораций",
      overview:
        "Hedera — публичный распределённый реестр, управляемый советом из до 39 крупных мировых организаций, включая Google, IBM, Boeing и Deutsche Telekom. Используется технология консенсуса hashgraph для высокой пропускной способности, низких комиссий и справедливой очерёдности. Сеть нацелена на корпоративные кейсы: цепочки поставок, верификация личности и токенизированные активы.",
      thesis:
        "Модель управления Hedera — совет компаний из Fortune 500 — обеспечивает уникальную легитимность и корпоративное доверие. Консенсус hashgraph предлагает математические гарантии справедливости и высокую производительность. Растущее практическое использование в цепочках поставок, устойчивом развитии и стейблкоин-рельсах. Сторонники считают, что модель совета привлечёт корпоративное принятие.",
      risks:
        "Восприятие централизации из-за модели управления советом. Менее развитая экосистема DeFi и разработчиков по сравнению с EVM-сетями. Токеномика и холдинги фонда создают навес предложения. Конкуренция со стороны корпоративных решений Ethereum и частных сетей. Сетевые эффекты отстают от устоявшихся платформ.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (2-3%). Отражает тезис TAMS о корпоративном принятии блокчейна через надёжное управление. Обеспечивает диверсификацию портфеля от DeFi-активов. Отслеживается по активности членов совета, метрикам использования сети и корпоративным развёртываниям.",
    },
    es: {
      description:
        "Red empresarial pública gobernada por un consejo de corporaciones globales líderes",
      overview:
        "Hedera es un libro mayor distribuido público gobernado por un consejo de hasta 39 organizaciones globales importantes, incluyendo Google, IBM, Boeing y Deutsche Telekom. Utiliza la tecnología de consenso hashgraph para alto rendimiento, bajas comisiones y ordenamiento justo. La red apunta a casos de uso empresariales como cadena de suministro, verificación de identidad y activos tokenizados.",
      thesis:
        "El modelo de gobernanza de Hedera — un consejo de empresas Fortune 500 — proporciona legitimidad única y confianza empresarial. El consenso hashgraph ofrece garantías matemáticas de equidad y alto rendimiento. Uso real creciente en cadena de suministro, sostenibilidad y vías de stablecoins. Los defensores creen que el modelo de gobernanza por consejo atraerá adopción empresarial que las cadenas puramente descentralizadas no pueden lograr.",
      risks:
        "Percepción de centralización debido al modelo de gobernanza por consejo. Menor ecosistema DeFi y de desarrolladores comparado con cadenas EVM. La economía de tokens y las tenencias de la fundación crean exceso de oferta. Competencia de soluciones empresariales de Ethereum y cadenas privadas. Los efectos de red van rezagados respecto a plataformas establecidas.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (2-3%). Representa la tesis de TAMS sobre la adopción empresarial de blockchain mediante gobernanza creíble. Proporciona diversificación de cartera alejándose de activos nativos de DeFi. Se monitorean la actividad de los miembros del consejo, métricas de uso de la red y despliegues empresariales.",
    },
  },

  // ========== Infrastructure ==========

  LINK: {
    en: {
      description:
        "רשת אורקל מבוזרת - חיבור בלוקצ׳יין לעולם האמיתי",
      overview:
        "Chainlink is the dominant decentralized oracle network, providing external data feeds to smart contracts across virtually all major blockchains. It has expanded into Cross-Chain Interoperability Protocol (CCIP), Proof of Reserves, and Functions — positioning itself as middleware infrastructure for the entire blockchain ecosystem.",
      thesis:
        "Chainlink operates as essential infrastructure for DeFi — securing over $75B in transaction value. CCIP positions Chainlink as the TCP/IP of blockchain interoperability. The SCALE program subsidizes oracle costs for early-stage chains, building ecosystem lock-in. Staking introduces tokenomics improvements. Supporters believe every smart contract that interacts with external data ultimately needs Chainlink.",
      risks:
        "Competition from newer oracle solutions (Pyth, API3). Revenue model still evolving — subsidies mask true demand. Token supply and team allocations create selling pressure. Dependency on continued DeFi growth. CCIP faces competition from specialized bridge protocols.",
      tamsFit:
        "Long-Term Holdings wallet allocation (3-5%). Core infrastructure bet that benefits from overall blockchain ecosystem growth without protocol-specific risk. Position represents conviction in the middleware layer thesis. Monitored for CCIP adoption, staking participation, and oracle market share.",
    },
    he: {
      description:
        "רשת האורקל המבוזרת המובילה — המחברת בלוקצ׳יין לנתוני העולם האמיתי",
      overview:
        "Chainlink היא רשת האורקל המבוזרת הדומיננטית, המספקת הזנות נתונים חיצוניות לחוזים חכמים כמעט בכל הבלוקצ׳יינים המרכזיים. היא התרחבה לפרוטוקול אינטראופרביליות חוצה-שרשראות (CCIP), הוכחת רזרבות ופונקציות — וממצבת עצמה כתשתית middleware לכלל מערכת הבלוקצ׳יין.",
      thesis:
        "Chainlink פועלת כתשתית חיונית ל-DeFi — מאבטחת ערך עסקאות של מעל 75 מיליארד דולר. CCIP ממצב את Chainlink כ-TCP/IP של אינטראופרביליות בלוקצ׳יין. תוכנית SCALE מסבסדת עלויות אורקל לשרשראות בשלב מוקדם ובונה נעילת מערכת. ה-staking מציג שיפורים בכלכלת הטוקן. תומכיה מאמינים כי כל חוזה חכם הפונה לנתונים חיצוניים זקוק בסופו של דבר ל-Chainlink.",
      risks:
        "תחרות מצד פתרונות אורקל חדשים (Pyth, API3). מודל ההכנסות עדיין מתפתח — סובסידיות מסתירות ביקוש אמיתי. היצע הטוקנים והקצאות הצוות יוצרים לחצי מכירה. תלות בצמיחה מתמשכת של DeFi. CCIP מתמודד עם תחרות מפרוטוקולי גשר ייעודיים.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (3-5%). הימור תשתיתי ליבתי הנהנה מצמיחת מערכת הבלוקצ׳יין ללא סיכון ספציפי לפרוטוקול. הפוזיציה מייצגת אמונה בתזת שכבת ה-middleware. נמדד לפי אימוץ CCIP, השתתפות ב-staking ונתח שוק אורקל.",
    },
    ar: {
      description:
        "شبكة الأوراكل اللامركزية الرائدة — ربط البلوكتشين بالبيانات الواقعية",
      overview:
        "Chainlink هي شبكة الأوراكل اللامركزية المهيمنة، توفر تغذيات بيانات خارجية للعقود الذكية عبر جميع سلاسل البلوكتشين الرئيسية تقريبًا. توسعت لتشمل بروتوكول التشغيل البيني عبر السلاسل (CCIP) وإثبات الاحتياطيات والوظائف — لتضع نفسها كبنية تحتية وسيطة لنظام البلوكتشين بأكمله.",
      thesis:
        "تعمل Chainlink كبنية تحتية أساسية للتمويل اللامركزي — تؤمن أكثر من 75 مليار دولار من قيمة المعاملات. يضع CCIP Chainlink كـ TCP/IP للتشغيل البيني للبلوكتشين. يدعم برنامج SCALE تكاليف الأوراكل للسلاسل الناشئة، مما يبني قفل النظام البيئي. يقدم الرهن تحسينات في اقتصاديات الرمز.",
      risks:
        "منافسة من حلول أوراكل أحدث (Pyth, API3). نموذج الإيرادات لا يزال يتطور — الإعانات تخفي الطلب الحقيقي. عرض الرموز وتخصيصات الفريق تخلق ضغوط بيع. الاعتماد على النمو المستمر للتمويل اللامركزي. يواجه CCIP منافسة من بروتوكولات الجسور المتخصصة.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (3-5%). رهان بنية تحتية أساسي يستفيد من نمو نظام البلوكتشين الشامل دون مخاطر خاصة بالبروتوكول. يمثل المركز القناعة في أطروحة الطبقة الوسيطة. يُراقب لتبني CCIP والمشاركة في الرهن وحصة سوق الأوراكل.",
    },
    ru: {
      description:
        "Ведущая децентрализованная оракульная сеть — связь блокчейна с реальными данными",
      overview:
        "Chainlink — доминирующая децентрализованная оракульная сеть, поставляющая внешние данные смарт-контрактам практически во всех крупных блокчейнах. Расширилась до протокола кросс-чейн интероперабельности (CCIP), доказательства резервов и функций — позиционируя себя как middleware-инфраструктуру всей блокчейн-экосистемы.",
      thesis:
        "Chainlink работает как критически важная инфраструктура для DeFi — обеспечивает более $75 млрд стоимости транзакций. CCIP позиционирует Chainlink как TCP/IP блокчейн-интероперабельности. Программа SCALE субсидирует оракульные затраты для молодых сетей, формируя экосистемную привязку. Стейкинг вводит улучшения токеномики. Сторонники считают, что каждый смарт-контракт с внешними данными в конечном счёте нуждается в Chainlink.",
      risks:
        "Конкуренция со стороны новых оракульных решений (Pyth, API3). Модель доходов всё ещё развивается — субсидии маскируют реальный спрос. Предложение токенов и аллокации команды создают давление продаж. Зависимость от продолжающегося роста DeFi. CCIP конкурирует со специализированными мост-протоколами.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (3-5%). Ключевая инфраструктурная ставка, выигрывающая от общего роста блокчейн-экосистемы без протокол-специфичных рисков. Позиция отражает убеждённость в тезисе middleware-слоя. Отслеживается по принятию CCIP, участию в стейкинге и доле оракульного рынка.",
    },
    es: {
      description:
        "La red de oráculos descentralizada líder — conectando blockchain con datos del mundo real",
      overview:
        "Chainlink es la red de oráculos descentralizada dominante, proporcionando feeds de datos externos a contratos inteligentes en prácticamente todos los blockchains principales. Se ha expandido al Protocolo de Interoperabilidad Cross-Chain (CCIP), Prueba de Reservas y Funciones — posicionándose como infraestructura middleware para todo el ecosistema blockchain.",
      thesis:
        "Chainlink opera como infraestructura esencial para DeFi — asegurando más de $75 mil millones en valor de transacciones. CCIP posiciona a Chainlink como el TCP/IP de la interoperabilidad blockchain. El programa SCALE subsidia costos de oráculos para cadenas emergentes, construyendo fidelización del ecosistema. El staking introduce mejoras en la economía del token.",
      risks:
        "Competencia de soluciones de oráculos más nuevas (Pyth, API3). El modelo de ingresos sigue evolucionando — los subsidios ocultan la demanda real. La oferta de tokens y las asignaciones del equipo crean presión de venta. Dependencia del crecimiento continuo de DeFi. CCIP enfrenta competencia de protocolos de puentes especializados.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (3-5%). Apuesta de infraestructura central que se beneficia del crecimiento general del ecosistema blockchain sin riesgo específico de protocolo. La posición representa convicción en la tesis de la capa middleware. Se monitorean la adopción de CCIP, participación en staking y cuota de mercado de oráculos.",
    },
  },

  QNT: {
    en: {
      description:
        "פרוטוקול אינטראופרביליות ארגוני עם מיקוד בנקאי ומוסדי",
      overview:
        "Quant provides enterprise-grade blockchain interoperability through its Overledger protocol. It enables seamless connection between distributed ledger technologies and existing enterprise systems. The project focuses on regulated financial institutions, central banks, and enterprise clients with a strong emphasis on compliance and standards.",
      thesis:
        "As enterprises and financial institutions adopt different blockchain networks, interoperability becomes critical infrastructure. Quant's Overledger is chain-agnostic and designed for regulated environments. Partnerships with SIA (European payment infrastructure) and involvement in CBDC projects demonstrate institutional traction. Limited token supply (~14.6M) creates scarcity. Supporters believe Quant will be the enterprise interoperability standard.",
      risks:
        "Closed-source technology limits transparency and community audit. Small team relative to ambitions. Low DeFi ecosystem integration. Revenue generation and business model validation still in progress. Competition from larger interoperability projects with open-source models.",
      tamsFit:
        "Long-Term Holdings wallet allocation (2-3%). High-conviction infrastructure bet on enterprise interoperability. Position sized conservatively given lower liquidity. Represents exposure to the regulated institutional blockchain adoption thesis.",
    },
    he: {
      description:
        "פרוטוקול אינטראופרביליות ברמה ארגונית המתמקד בשירותים בנקאיים ומוסדיים מוסדרים",
      overview:
        "Quant מספקת אינטראופרביליות בלוקצ׳יין ברמה ארגונית באמצעות פרוטוקול Overledger. היא מאפשרת חיבור חלק בין טכנולוגיות פנקסים מבוזרים למערכות ארגוניות קיימות. הפרויקט מתמקד במוסדות פיננסיים מוסדרים, בנקים מרכזיים ולקוחות ארגוניים, תוך דגש חזק על ציות ותקנים.",
      thesis:
        "ככל שארגונים ומוסדות פיננסיים מאמצים רשתות בלוקצ׳יין שונות, האינטראופרביליות הופכת לתשתית קריטית. Overledger של Quant אינו תלוי שרשרת ומתוכנן לסביבות מוסדרות. שותפויות עם SIA (תשתית תשלומים אירופית) ומעורבות בפרויקטי CBDC מדגימות משיכה מוסדית. היצע טוקנים מוגבל (~14.6M) יוצר מחסור. תומכיו מאמינים כי Quant תהיה תקן האינטראופרביליות הארגוני.",
      risks:
        "טכנולוגיה סגורת-מקור מגבילה שקיפות וביקורת קהילתית. צוות קטן ביחס לשאיפות. אינטגרציה נמוכה עם מערכת ה-DeFi. יצירת הכנסות ואימות המודל העסקי עדיין בתהליך. תחרות מפרויקטי אינטראופרביליות גדולים יותר עם מודלים פתוחים.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (2-3%). הימור תשתיתי באמונה גבוהה על אינטראופרביליות ארגונית. גודל הפוזיציה שמרני לאור הנזילות הנמוכה. מייצג חשיפה לתזת אימוץ מוסדי של בלוקצ׳יין בסביבה מוסדרת.",
    },
    ar: {
      description:
        "بروتوكول تشغيل بيني مؤسسي يركز على الخدمات المصرفية والمؤسسية المنظمة",
      overview:
        "يوفر Quant التشغيل البيني للبلوكتشين على المستوى المؤسسي من خلال بروتوكول Overledger. يتيح الربط السلس بين تقنيات دفاتر الأستاذ الموزعة والأنظمة المؤسسية القائمة. يركز المشروع على المؤسسات المالية المنظمة والبنوك المركزية والعملاء المؤسسيين مع تركيز قوي على الامتثال والمعايير.",
      thesis:
        "مع تبني المؤسسات المالية لشبكات بلوكتشين مختلفة، يصبح التشغيل البيني بنية تحتية حيوية. Overledger من Quant غير مرتبط بسلسلة محددة ومصمم للبيئات المنظمة. تثبت الشراكات مع SIA والمشاركة في مشاريع CBDC الجذب المؤسسي. يخلق العرض المحدود للرموز (~14.6 مليون) ندرة.",
      risks:
        "التكنولوجيا مغلقة المصدر تحد من الشفافية والتدقيق المجتمعي. فريق صغير بالنسبة للطموحات. تكامل منخفض مع نظام التمويل اللامركزي. توليد الإيرادات والتحقق من نموذج الأعمال لا يزال قيد التنفيذ. منافسة من مشاريع تشغيل بيني أكبر بنماذج مفتوحة المصدر.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (2-3%). رهان بنية تحتية عالي القناعة على التشغيل البيني المؤسسي. حجم المركز محافظ نظرًا للسيولة المنخفضة. يمثل التعرض لأطروحة التبني المؤسسي المنظم للبلوكتشين.",
    },
    ru: {
      description:
        "Корпоративный протокол интероперабельности с фокусом на банковский и институциональный сектор",
      overview:
        "Quant обеспечивает корпоративную блокчейн-интероперабельность через протокол Overledger. Он позволяет бесшовно связывать технологии распределённых реестров с существующими корпоративными системами. Проект ориентирован на регулируемые финансовые учреждения, центральные банки и корпоративных клиентов с акцентом на комплаенс и стандарты.",
      thesis:
        "По мере принятия предприятиями и финансовыми учреждениями различных блокчейн-сетей интероперабельность становится критической инфраструктурой. Overledger от Quant не привязан к конкретной сети и разработан для регулируемых сред. Партнёрства с SIA и участие в проектах CBDC демонстрируют институциональную привлекательность. Ограниченное предложение токенов (~14,6M) создаёт дефицит.",
      risks:
        "Технология с закрытым кодом ограничивает прозрачность и общественный аудит. Маленькая команда относительно амбиций. Низкая интеграция с DeFi-экосистемой. Генерация доходов и валидация бизнес-модели всё ещё в процессе. Конкуренция с более крупными проектами интероперабельности с открытым кодом.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (2-3%). Высокоубеждённая инфраструктурная ставка на корпоративную интероперабельность. Размер позиции консервативен из-за низкой ликвидности. Отражает экспозицию к тезису регулируемого институционального принятия блокчейна.",
    },
    es: {
      description:
        "Protocolo de interoperabilidad empresarial enfocado en servicios bancarios e institucionales regulados",
      overview:
        "Quant proporciona interoperabilidad blockchain de grado empresarial a través de su protocolo Overledger. Permite la conexión fluida entre tecnologías de libro mayor distribuido y sistemas empresariales existentes. El proyecto se enfoca en instituciones financieras reguladas, bancos centrales y clientes empresariales con un fuerte énfasis en cumplimiento y estándares.",
      thesis:
        "A medida que las empresas e instituciones financieras adoptan diferentes redes blockchain, la interoperabilidad se vuelve infraestructura crítica. Overledger de Quant es agnóstico de cadena y diseñado para entornos regulados. Las alianzas con SIA y la participación en proyectos CBDC demuestran tracción institucional. La oferta limitada de tokens (~14.6M) crea escasez.",
      risks:
        "La tecnología de código cerrado limita la transparencia y la auditoría comunitaria. Equipo pequeño en relación con las ambiciones. Baja integración con el ecosistema DeFi. La generación de ingresos y la validación del modelo de negocio siguen en progreso. Competencia de proyectos de interoperabilidad más grandes con modelos de código abierto.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (2-3%). Apuesta de infraestructura de alta convicción en la interoperabilidad empresarial. Tamaño de posición conservador dada la menor liquidez. Representa exposición a la tesis de adopción institucional regulada de blockchain.",
    },
  },

  // ========== RWA ==========

  ONDO: {
    en: {
      description:
        "פרוטוקול טוקניזציה של נכסים פיננסיים מסורתיים",
      overview:
        "Ondo Finance bridges traditional finance and DeFi by tokenizing real-world financial products. Its flagship products include USDY (tokenized US Treasuries with yield) and OUSG (tokenized short-term US government bonds). Ondo has partnered with BlackRock's BUIDL fund and operates across multiple blockchains.",
      thesis:
        "Real-world asset tokenization is projected to reach $16T by 2030 (Boston Consulting Group). Ondo is positioned at the forefront with institutional-grade products backed by US Treasuries. The partnership with BlackRock provides unmatched credibility. As DeFi matures, demand for stable, yield-bearing tokenized assets will grow. Supporters believe Ondo captures the convergence of TradFi yield and DeFi composability.",
      risks:
        "Regulatory risk around tokenized securities classification. Competition from traditional asset managers entering the space. Dependency on BlackRock and custodial partnerships. Smart contract and bridge risks when operating cross-chain. Business model depends on sustained interest rate environment.",
      tamsFit:
        "Long-Term Holdings and DeFi wallet allocation (3-5%). Core position in the TAMS RWA thesis. USDY and OUSG products directly usable in DeFi strategies for stable yield. Represents the convergence of institutional finance and blockchain that TAMS is built around.",
    },
    he: {
      description:
        "פרוטוקול מוביל בטוקניזציה של נכסים פיננסיים מסורתיים ואגרות חוב ממשלתיות",
      overview:
        "Ondo Finance מגשרת בין פיננסים מסורתיים ל-DeFi באמצעות טוקניזציה של מוצרים פיננסיים אמיתיים. מוצרי הדגל שלה כוללים USDY (אגרות חוב ממשלתיות אמריקאיות מטוקנזות עם תשואה) ו-OUSG (אגרות חוב ממשלתיות קצרות טווח מטוקנזות). Ondo שיתפה פעולה עם קרן BUIDL של BlackRock ופועלת על פני בלוקצ׳יינים מרובים.",
      thesis:
        "טוקניזציית נכסים אמיתיים צפויה להגיע ל-16 טריליון דולר עד 2030 (Boston Consulting Group). Ondo ממוצבת בחזית עם מוצרים ברמה מוסדית המגובים באגרות חוב ממשלתיות אמריקאיות. השותפות עם BlackRock מספקת אמינות חסרת תקדים. ככל ש-DeFi מתבגר, הביקוש לנכסים מטוקנזים יציבים ונושאי תשואה יגדל. תומכיה מאמינים כי Ondo לוכדת את ההתכנסות בין תשואת TradFi לקומפוזביליות DeFi.",
      risks:
        "סיכון רגולטורי סביב סיווג ניירות ערך מטוקנזים. תחרות ממנהלי נכסים מסורתיים הנכנסים לתחום. תלות בשותפויות BlackRock ושמירה. סיכוני חוזים חכמים וגשרים בפעילות חוצת-שרשראות. המודל העסקי תלוי בסביבת ריביות מתמשכת.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח וארנק ה-DeFi (3-5%). פוזיציית ליבה בתזת ה-RWA של TAMS. מוצרי USDY ו-OUSG שמישים ישירות באסטרטגיות DeFi לתשואה יציבה. מייצגת את ההתכנסות של פיננסים מוסדיים ובלוקצ׳יין שעליה בנוי TAMS.",
    },
    ar: {
      description:
        "بروتوكول رائد في ترميز الأصول المالية التقليدية والسندات الحكومية",
      overview:
        "يربط Ondo Finance بين التمويل التقليدي والتمويل اللامركزي من خلال ترميز المنتجات المالية الواقعية. تشمل منتجاته الرئيسية USDY (سندات الخزانة الأمريكية المرمزة مع عائد) وOUSG (سندات حكومية أمريكية قصيرة الأجل مرمزة). تشارك Ondo مع صندوق BUIDL التابع لـ BlackRock وتعمل عبر سلاسل بلوكتشين متعددة.",
      thesis:
        "من المتوقع أن يصل ترميز الأصول الحقيقية إلى 16 تريليون دولار بحلول 2030 (مجموعة بوسطن الاستشارية). يتموضع Ondo في المقدمة بمنتجات مؤسسية مدعومة بسندات الخزانة الأمريكية. توفر الشراكة مع BlackRock مصداقية لا مثيل لها. مع نضوج التمويل اللامركزي، سينمو الطلب على الأصول المرمزة المستقرة المُدرّة للعائد.",
      risks:
        "مخاطر تنظيمية حول تصنيف الأوراق المالية المرمزة. منافسة من مديري الأصول التقليديين الداخلين إلى المجال. الاعتماد على شراكات BlackRock والحفظ. مخاطر العقود الذكية والجسور عند العمل عبر السلاسل. يعتمد نموذج الأعمال على بيئة أسعار فائدة مستدامة.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل ومحفظة التمويل اللامركزي (3-5%). مركز أساسي في أطروحة الأصول الحقيقية لـ TAMS. منتجات USDY وOUSG قابلة للاستخدام مباشرة في استراتيجيات التمويل اللامركزي للعائد المستقر.",
    },
    ru: {
      description:
        "Ведущий протокол токенизации традиционных финансовых активов и государственных облигаций",
      overview:
        "Ondo Finance связывает традиционные финансы и DeFi через токенизацию реальных финансовых продуктов. Флагманские продукты включают USDY (токенизированные казначейские облигации США с доходностью) и OUSG (токенизированные краткосрочные государственные облигации). Ondo сотрудничает с фондом BUIDL от BlackRock и работает в нескольких блокчейнах.",
      thesis:
        "Токенизация реальных активов, по прогнозам, достигнет $16 трлн к 2030 году (Boston Consulting Group). Ondo позиционирован в авангарде с институциональными продуктами, обеспеченными казначейскими облигациями США. Партнёрство с BlackRock обеспечивает непревзойдённую надёжность. По мере зрелости DeFi спрос на стабильные доходные токенизированные активы будет расти.",
      risks:
        "Регуляторные риски в отношении классификации токенизированных ценных бумаг. Конкуренция со стороны традиционных управляющих активами. Зависимость от партнёрств с BlackRock и кастодиальных услуг. Риски смарт-контрактов и мостов при кросс-чейн операциях. Бизнес-модель зависит от устойчивой процентной среды.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов и DeFi-кошельке (3-5%). Ключевая позиция в RWA-тезисе TAMS. Продукты USDY и OUSG напрямую используются в DeFi-стратегиях для стабильной доходности. Отражает конвергенцию институциональных финансов и блокчейна, вокруг которой построен TAMS.",
    },
    es: {
      description:
        "Protocolo líder en tokenización de activos financieros tradicionales y bonos gubernamentales",
      overview:
        "Ondo Finance conecta las finanzas tradicionales y DeFi mediante la tokenización de productos financieros del mundo real. Sus productos estrella incluyen USDY (bonos del Tesoro estadounidense tokenizados con rendimiento) y OUSG (bonos gubernamentales de corto plazo tokenizados). Ondo se ha asociado con el fondo BUIDL de BlackRock y opera en múltiples blockchains.",
      thesis:
        "Se proyecta que la tokenización de activos reales alcance $16 billones para 2030 (Boston Consulting Group). Ondo está posicionado a la vanguardia con productos de grado institucional respaldados por bonos del Tesoro estadounidense. La alianza con BlackRock proporciona credibilidad incomparable. A medida que DeFi madura, la demanda de activos tokenizados estables con rendimiento crecerá.",
      risks:
        "Riesgo regulatorio en torno a la clasificación de valores tokenizados. Competencia de gestores de activos tradicionales que ingresan al espacio. Dependencia de las alianzas con BlackRock y custodia. Riesgos de contratos inteligentes y puentes al operar entre cadenas. El modelo de negocio depende de un entorno de tasas de interés sostenido.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo y cartera DeFi (3-5%). Posición central en la tesis de activos reales de TAMS. Los productos USDY y OUSG son directamente utilizables en estrategias DeFi para rendimiento estable. Representa la convergencia de finanzas institucionales y blockchain sobre la que TAMS está construido.",
    },
  },

  CFG: {
    en: {
      description:
        "פרוטוקול מימון מבוזר לנכסי עולם אמיתי",
      overview:
        "Centrifuge is a decentralized protocol for financing real-world assets on-chain. It enables businesses to tokenize invoices, real estate, and other assets as collateral for DeFi lending. Centrifuge has been integrated with MakerDAO and Aave as a source of real-world yield, and operates its own Centrifuge Chain built on Substrate.",
      thesis:
        "Centrifuge connects the $100T+ private credit market to DeFi liquidity. Integration with major DeFi protocols (MakerDAO, Aave) validates the model. The protocol addresses a real market need — SMEs accessing capital through tokenized assets. As RWA adoption grows, Centrifuge's first-mover advantage in DeFi-native RWA rails becomes increasingly valuable. Supporters believe Centrifuge is the on-chain bridge for private credit.",
      risks:
        "RWA tokenization requires robust legal frameworks that are still developing. Default risk on underlying real-world assets. Small team and modest TVL relative to the opportunity size. Competition from larger tokenization platforms. Liquidity of CFG token is relatively low.",
      tamsFit:
        "Long-Term Holdings wallet allocation (1-2%). Smaller position representing the RWA financing thesis. Complements ONDO with exposure to private credit rather than public treasuries. Higher risk/reward given early-stage nature. Monitored for TVL growth, MakerDAO vault utilization, and new asset pool launches.",
    },
    he: {
      description:
        "פרוטוקול מבוזר למימון נכסי עולם אמיתי באמצעות אשראי פרטי on-chain",
      overview:
        "Centrifuge היא פרוטוקול מבוזר למימון נכסים אמיתיים על הבלוקצ׳יין. היא מאפשרת לעסקים לטוקנז חשבוניות, נדל״ן ונכסים אחרים כבטוחות להלוואות DeFi. Centrifuge שולבה עם MakerDAO ו-Aave כמקור תשואה מנכסים אמיתיים, ומפעילה שרשרת Centrifuge Chain משלה הבנויה על Substrate.",
      thesis:
        "Centrifuge מחברת את שוק האשראי הפרטי בהיקף של מעל 100 טריליון דולר לנזילות DeFi. אינטגרציה עם פרוטוקולי DeFi מרכזיים (MakerDAO, Aave) מאמתת את המודל. הפרוטוקול מתייחס לצורך שוקי אמיתי — עסקים קטנים ובינוניים הניגשים להון באמצעות נכסים מטוקנזים. ככל שאימוץ RWA גדל, יתרון הראשוניות של Centrifuge במסלולי RWA ילידי DeFi הופך יקר ערך יותר.",
      risks:
        "טוקניזציית RWA דורשת מסגרות משפטיות חזקות שעדיין בפיתוח. סיכון חדלות פירעון על נכסים אמיתיים בבסיס. צוות קטן ו-TVL צנוע ביחס לגודל ההזדמנות. תחרות מפלטפורמות טוקניזציה גדולות יותר. נזילות נמוכה יחסית של טוקן CFG.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (1-2%). פוזיציה קטנה יותר המייצגת את תזת מימון ה-RWA. משלימה את ONDO עם חשיפה לאשראי פרטי במקום אגרות חוב ממשלתיות. סיכון/תשואה גבוהים יותר לאור אופי השלב המוקדם. נמדדת לפי צמיחת TVL, ניצול כספות MakerDAO והשקות בריכות נכסים חדשות.",
    },
    ar: {
      description:
        "بروتوكول لامركزي لتمويل الأصول الحقيقية عبر الائتمان الخاص على السلسلة",
      overview:
        "Centrifuge هو بروتوكول لامركزي لتمويل الأصول الحقيقية على السلسلة. يتيح للشركات ترميز الفواتير والعقارات والأصول الأخرى كضمانات لإقراض التمويل اللامركزي. تم دمج Centrifuge مع MakerDAO وAave كمصدر للعائد الحقيقي، ويشغل سلسلة Centrifuge Chain الخاصة المبنية على Substrate.",
      thesis:
        "يربط Centrifuge سوق الائتمان الخاص الذي يتجاوز 100 تريليون دولار بسيولة التمويل اللامركزي. التكامل مع بروتوكولات التمويل اللامركزي الرئيسية (MakerDAO, Aave) يثبت صحة النموذج. يعالج البروتوكول حاجة سوقية حقيقية — وصول الشركات الصغيرة والمتوسطة إلى رأس المال من خلال الأصول المرمزة.",
      risks:
        "يتطلب ترميز الأصول الحقيقية أطرًا قانونية متينة لا تزال قيد التطوير. مخاطر التخلف عن السداد على الأصول الحقيقية الأساسية. فريق صغير وقيمة مقفلة متواضعة مقارنة بحجم الفرصة. منافسة من منصات ترميز أكبر. سيولة منخفضة نسبيًا لرمز CFG.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (1-2%). مركز أصغر يمثل أطروحة تمويل الأصول الحقيقية. يكمل ONDO بالتعرض للائتمان الخاص بدلاً من سندات الخزانة العامة. مخاطر/عائد أعلى نظرًا للطبيعة المبكرة. يُراقب لنمو القيمة المقفلة واستخدام خزائن MakerDAO.",
    },
    ru: {
      description:
        "Децентрализованный протокол финансирования реальных активов через частный кредит on-chain",
      overview:
        "Centrifuge — децентрализованный протокол финансирования реальных активов on-chain. Позволяет бизнесам токенизировать счета, недвижимость и другие активы в качестве залога для DeFi-кредитования. Centrifuge интегрирован с MakerDAO и Aave как источник реальной доходности и управляет собственной сетью Centrifuge Chain на базе Substrate.",
      thesis:
        "Centrifuge связывает рынок частного кредита объёмом более $100 трлн с DeFi-ликвидностью. Интеграция с крупными DeFi-протоколами (MakerDAO, Aave) подтверждает модель. Протокол решает реальную рыночную потребность — доступ МСП к капиталу через токенизированные активы. По мере роста принятия RWA преимущество первопроходца Centrifuge в DeFi-нативных RWA-рельсах становится всё ценнее.",
      risks:
        "Токенизация RWA требует надёжных правовых рамок, которые ещё развиваются. Риск дефолта по базовым реальным активам. Маленькая команда и скромный TVL относительно размера возможности. Конкуренция со стороны крупных платформ токенизации. Ликвидность токена CFG относительно низкая.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (1-2%). Меньшая позиция, отражающая тезис финансирования RWA. Дополняет ONDO экспозицией к частному кредиту вместо государственных облигаций. Более высокий профиль риска/доходности из-за ранней стадии. Отслеживается по росту TVL, использованию хранилищ MakerDAO и запуску новых пулов активов.",
    },
    es: {
      description:
        "Protocolo descentralizado para financiar activos del mundo real mediante crédito privado on-chain",
      overview:
        "Centrifuge es un protocolo descentralizado para financiar activos del mundo real on-chain. Permite a las empresas tokenizar facturas, bienes raíces y otros activos como colateral para préstamos DeFi. Centrifuge se ha integrado con MakerDAO y Aave como fuente de rendimiento real, y opera su propia Centrifuge Chain construida sobre Substrate.",
      thesis:
        "Centrifuge conecta el mercado de crédito privado de más de $100 billones con la liquidez DeFi. La integración con protocolos DeFi principales (MakerDAO, Aave) valida el modelo. El protocolo aborda una necesidad real del mercado — PyMEs accediendo a capital a través de activos tokenizados. A medida que crece la adopción de activos reales, la ventaja de pionero de Centrifuge en vías RWA nativas de DeFi se vuelve cada vez más valiosa.",
      risks:
        "La tokenización de activos reales requiere marcos legales robustos que aún están en desarrollo. Riesgo de incumplimiento en los activos reales subyacentes. Equipo pequeño y TVL modesto en relación con el tamaño de la oportunidad. Competencia de plataformas de tokenización más grandes. La liquidez del token CFG es relativamente baja.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (1-2%). Posición menor que representa la tesis de financiamiento de activos reales. Complementa a ONDO con exposición a crédito privado en lugar de bonos del tesoro. Mayor riesgo/recompensa dada la naturaleza de etapa temprana. Se monitorean el crecimiento del TVL, la utilización de bóvedas de MakerDAO y los lanzamientos de nuevos pools de activos.",
    },
  },

  // ========== AI & Compute ==========

  RNDR: {
    en: {
      description:
        "רשת רינדור מבוזרת עם GPU ותשתית AI",
      overview:
        "Render Network is a decentralized GPU computing platform that connects creators needing rendering power with GPU owners willing to rent their idle capacity. Originally focused on 3D rendering for film and media, the network has expanded to support AI/ML workloads, creating a decentralized compute marketplace. The migration to Solana improved performance and reduced costs.",
      thesis:
        "GPU compute demand is exploding driven by AI, 3D rendering, and spatial computing. Centralized cloud providers are capacity-constrained and expensive. Render creates a decentralized marketplace for GPU compute that can scale with demand. Apple Vision Pro and spatial computing create new demand vectors. Supporters believe decentralized compute networks will capture significant share of the $1T+ cloud compute market.",
      risks:
        "Competition from centralized providers (AWS, Google Cloud) with established relationships. Technical challenges in decentralized compute coordination. Dependency on GPU supply from node operators. Revenue model and token economics still maturing. AI compute demand may be met by purpose-built chips rather than GPUs.",
      tamsFit:
        "Long-Term Holdings wallet allocation (2-3%). Represents the TAMS thesis on decentralized compute infrastructure. Provides portfolio exposure to AI/compute trend without direct AI token speculation. Monitored for network utilization, node growth, and enterprise partnerships.",
    },
    he: {
      description:
        "רשת מחשוב GPU מבוזרת המשרתת רינדור תלת-ממדי ותשתית בינה מלאכותית",
      overview:
        "רשת Render היא פלטפורמת מחשוב GPU מבוזרת המחברת יוצרים הזקוקים לכוח רינדור עם בעלי GPU המוכנים להשכיר קיבולת פנויה. במקור התמקדה ברינדור תלת-ממדי לקולנוע ומדיה, והרשת התרחבה לתמיכה בעומסי AI/ML, ויצרה שוק מחשוב מבוזר. המעבר לסולנה שיפר ביצועים והפחית עלויות.",
      thesis:
        "הביקוש למחשוב GPU מתפוצץ מונע על ידי בינה מלאכותית, רינדור תלת-ממדי ומחשוב מרחבי. ספקי ענן ריכוזיים מוגבלים בקיבולת ויקרים. Render יוצרת שוק מבוזר למחשוב GPU שיכול להתרחב עם הביקוש. Apple Vision Pro ומחשוב מרחבי יוצרים וקטורי ביקוש חדשים. תומכיה מאמינים כי רשתות מחשוב מבוזרות ילכדו נתח משמעותי משוק מחשוב הענן בהיקף של מעל טריליון דולר.",
      risks:
        "תחרות מספקים ריכוזיים (AWS, Google Cloud) עם קשרים מבוססים. אתגרים טכניים בתיאום מחשוב מבוזר. תלות באספקת GPU ממפעילי צמתים. מודל הכנסות וכלכלת טוקנים עדיין מתבגרים. ביקוש מחשוב AI עשוי להיענות על ידי שבבים ייעודיים ולא GPUs.",
      tamsFit:
        "הקצאה בארנק האחזקות ארוכות הטווח (2-3%). מייצג את תזת TAMS בדבר תשתית מחשוב מבוזרת. מספק חשיפת תיק למגמת AI/מחשוב ללא ספקולציה ישירה בטוקני AI. נמדד לפי ניצול הרשת, צמיחת צמתים ושותפויות ארגוניות.",
    },
    ar: {
      description:
        "شبكة حوسبة GPU لامركزية تخدم العرض ثلاثي الأبعاد والبنية التحتية للذكاء الاصطناعي",
      overview:
        "شبكة Render هي منصة حوسبة GPU لامركزية تربط المبدعين الذين يحتاجون قوة العرض بمالكي GPU المستعدين لتأجير طاقتهم الخاملة. ركزت أصلاً على العرض ثلاثي الأبعاد للأفلام والإعلام، وتوسعت الشبكة لدعم أعباء عمل الذكاء الاصطناعي والتعلم الآلي، مما أنشأ سوقًا لامركزيًا للحوسبة. حسّن الانتقال إلى سولانا الأداء وخفض التكاليف.",
      thesis:
        "الطلب على حوسبة GPU يتصاعد بشكل انفجاري مدفوعًا بالذكاء الاصطناعي والعرض ثلاثي الأبعاد والحوسبة المكانية. مزودو السحابة المركزيون محدودو السعة ومكلفون. ينشئ Render سوقًا لامركزيًا لحوسبة GPU يمكن أن يتوسع مع الطلب. يخلق Apple Vision Pro والحوسبة المكانية متجهات طلب جديدة.",
      risks:
        "منافسة من مزودين مركزيين (AWS, Google Cloud) بعلاقات راسخة. تحديات تقنية في تنسيق الحوسبة اللامركزية. الاعتماد على إمداد GPU من مشغلي العقد. نموذج الإيرادات واقتصاديات الرموز لا تزال تنضج. قد يُلبى طلب حوسبة الذكاء الاصطناعي بشرائح مصممة خصيصًا بدلاً من GPU.",
      tamsFit:
        "تخصيص في محفظة الاحتفاظ طويل الأجل (2-3%). يمثل أطروحة TAMS حول البنية التحتية للحوسبة اللامركزية. يوفر تعرض المحفظة لاتجاه الذكاء الاصطناعي/الحوسبة دون المضاربة المباشرة على رموز الذكاء الاصطناعي. يُراقب لاستخدام الشبكة ونمو العقد والشراكات المؤسسية.",
    },
    ru: {
      description:
        "Децентрализованная сеть GPU-вычислений для 3D-рендеринга и инфраструктуры ИИ",
      overview:
        "Render Network — децентрализованная платформа GPU-вычислений, соединяющая создателей, нуждающихся в мощности рендеринга, с владельцами GPU, готовыми сдавать простаивающие мощности. Изначально ориентированная на 3D-рендеринг для кино и медиа, сеть расширилась для поддержки ИИ/ML-нагрузок, создав децентрализованный рынок вычислений. Миграция на Solana улучшила производительность и снизила затраты.",
      thesis:
        "Спрос на GPU-вычисления стремительно растёт, движимый ИИ, 3D-рендерингом и пространственными вычислениями. Централизованные облачные провайдеры ограничены в мощностях и дороги. Render создаёт децентрализованный рынок GPU-вычислений, масштабируемый по спросу. Apple Vision Pro и пространственные вычисления создают новые векторы спроса.",
      risks:
        "Конкуренция со стороны централизованных провайдеров (AWS, Google Cloud) с устоявшимися связями. Технические сложности координации децентрализованных вычислений. Зависимость от поставок GPU операторами нод. Модель доходов и токеномика всё ещё развиваются. Спрос на ИИ-вычисления может быть удовлетворён специализированными чипами, а не GPU.",
      tamsFit:
        "Аллокация в кошельке долгосрочных активов (2-3%). Отражает тезис TAMS о децентрализованной вычислительной инфраструктуре. Обеспечивает портфельную экспозицию к тренду ИИ/вычислений без прямых спекуляций на ИИ-токенах. Отслеживается по утилизации сети, росту нод и корпоративным партнёрствам.",
    },
    es: {
      description:
        "Red descentralizada de computación GPU para renderizado 3D e infraestructura de inteligencia artificial",
      overview:
        "Render Network es una plataforma descentralizada de computación GPU que conecta creadores que necesitan potencia de renderizado con propietarios de GPU dispuestos a alquilar su capacidad ociosa. Originalmente enfocada en renderizado 3D para cine y medios, la red se ha expandido para soportar cargas de trabajo de IA/ML, creando un mercado descentralizado de computación. La migración a Solana mejoró el rendimiento y redujo costos.",
      thesis:
        "La demanda de computación GPU está explotando impulsada por la IA, el renderizado 3D y la computación espacial. Los proveedores de nube centralizados están limitados en capacidad y son costosos. Render crea un mercado descentralizado de computación GPU que puede escalar con la demanda. Apple Vision Pro y la computación espacial crean nuevos vectores de demanda.",
      risks:
        "Competencia de proveedores centralizados (AWS, Google Cloud) con relaciones establecidas. Desafíos técnicos en la coordinación de computación descentralizada. Dependencia del suministro de GPU de los operadores de nodos. El modelo de ingresos y la economía del token aún están madurando. La demanda de computación IA puede ser satisfecha por chips diseñados específicamente en lugar de GPUs.",
      tamsFit:
        "Asignación en la cartera de tenencias a largo plazo (2-3%). Representa la tesis de TAMS sobre infraestructura de computación descentralizada. Proporciona exposición de cartera a la tendencia IA/computación sin especulación directa en tokens de IA. Se monitorean la utilización de la red, crecimiento de nodos y alianzas empresariales.",
    },
  },

  TAO: {
    en: {
      description:
        "רשת AI מבוזרת עם מנגנון תמריצים למודלים חכמים",
      overview:
        "Bittensor is a decentralized AI network that creates an open marketplace for machine intelligence. It incentivizes AI model development and deployment through a unique subnet architecture where different subnets specialize in different AI tasks — from text generation to image recognition to financial prediction. The TAO token rewards contributions of useful intelligence.",
      thesis:
        "AI development is increasingly centralized among a few large companies. Bittensor creates an open, competitive marketplace for AI where anyone can contribute and be rewarded. The subnet model enables specialization and composability of AI services. As concerns about AI centralization grow, decentralized alternatives gain strategic importance. Supporters believe Bittensor represents the decentralized counter-narrative to centralized AI monopolies.",
      risks:
        "Extremely early-stage technology with unproven quality benchmarks. Competition from well-funded centralized AI companies. Sybil attack and gaming risks in the incentive mechanism. Token price highly speculative and volatile. Quality of decentralized AI outputs may not match centralized alternatives for critical applications.",
      tamsFit:
        "Trading wallet allocation (1-2%). Highest risk/reward position in the TAMS portfolio. Represents a small speculative allocation to the decentralized AI thesis. Not a core holding — treated as asymmetric upside exposure. Monitored for subnet quality, network growth, and AI benchmark comparisons.",
    },
    he: {
      description:
        "רשת בינה מלאכותית מבוזרת עם מנגנון תמריצים ייחודי לפיתוח ופריסת מודלי AI",
      overview:
        "Bittensor היא רשת AI מבוזרת היוצרת שוק פתוח לאינטליגנציה מכונית. היא מתמרצת פיתוח ופריסת מודלי AI באמצעות ארכיטקטורת subnet ייחודית, בה subnets שונים מתמחים במשימות AI שונות — מייצור טקסט ועד זיהוי תמונות וחיזוי פיננסי. טוקן TAO מתגמל תרומות של אינטליגנציה שימושית.",
      thesis:
        "פיתוח AI הולך ומתרכז בידי מספר חברות גדולות. Bittensor יוצרת שוק פתוח ותחרותי ל-AI שבו כל אחד יכול לתרום ולקבל תגמול. מודל ה-subnet מאפשר התמחות וקומפוזביליות של שירותי AI. ככל שהחששות מריכוזיות AI גוברים, חלופות מבוזרות רוכשות חשיבות אסטרטגית. תומכיה מאמינים כי Bittensor מייצגת את הנרטיב המבוזר הנגדי למונופולי AI ריכוזיים.",
      risks:
        "טכנולוגיה בשלב מוקדם ביותר עם מדדי איכות שטרם הוכחו. תחרות מחברות AI ריכוזיות ממומנות היטב. סיכוני התקפות Sybil ומניפולציה במנגנון התמריצים. מחיר הטוקן ספקולטיבי ותנודתי ביותר. איכות תפוקות AI מבוזרות עשויה שלא להשתוות לחלופות ריכוזיות ביישומים קריטיים.",
      tamsFit:
        "הקצאה בארנק המסחר (1-2%). פוזיציית הסיכון/תשואה הגבוהה ביותר בתיק TAMS. מייצגת הקצאה ספקולטיבית קטנה לתזת ה-AI המבוזר. אינה אחזקת ליבה — מטופלת כחשיפה אסימטרית לפוטנציאל עלייה. נמדדת לפי איכות subnets, צמיחת הרשת והשוואות benchmark של AI.",
    },
    ar: {
      description:
        "شبكة ذكاء اصطناعي لامركزية بآلية حوافز فريدة لتطوير ونشر نماذج الذكاء الاصطناعي",
      overview:
        "Bittensor هي شبكة ذكاء اصطناعي لامركزية تنشئ سوقًا مفتوحًا للذكاء الآلي. تحفز تطوير ونشر نماذج الذكاء الاصطناعي من خلال بنية شبكات فرعية فريدة حيث تتخصص شبكات فرعية مختلفة في مهام ذكاء اصطناعي مختلفة — من توليد النصوص إلى التعرف على الصور والتنبؤ المالي. يكافئ رمز TAO مساهمات الذكاء المفيد.",
      thesis:
        "يتزايد تركز تطوير الذكاء الاصطناعي بين عدد قليل من الشركات الكبيرة. ينشئ Bittensor سوقًا مفتوحًا وتنافسيًا للذكاء الاصطناعي حيث يمكن لأي شخص المساهمة والحصول على مكافأة. يتيح نموذج الشبكات الفرعية التخصص والقابلية للتركيب لخدمات الذكاء الاصطناعي. مع تزايد المخاوف من مركزية الذكاء الاصطناعي، تكتسب البدائل اللامركزية أهمية استراتيجية.",
      risks:
        "تكنولوجيا في مرحلة مبكرة جدًا مع معايير جودة غير مثبتة. منافسة من شركات ذكاء اصطناعي مركزية ممولة جيدًا. مخاطر هجمات Sybil والتلاعب في آلية الحوافز. سعر الرمز تخميني ومتقلب للغاية. قد لا تضاهي جودة مخرجات الذكاء الاصطناعي اللامركزي البدائل المركزية في التطبيقات الحرجة.",
      tamsFit:
        "تخصيص في محفظة التداول (1-2%). مركز المخاطر/العائد الأعلى في محفظة TAMS. يمثل تخصيصًا تخمينيًا صغيرًا لأطروحة الذكاء الاصطناعي اللامركزي. ليس حيازة أساسية — يُعامل كتعرض غير متماثل لإمكانية الصعود. يُراقب لجودة الشبكات الفرعية ونمو الشبكة ومقارنات معايير الذكاء الاصطناعي.",
    },
    ru: {
      description:
        "Децентрализованная ИИ-сеть с уникальным механизмом стимулирования разработки и развёртывания моделей ИИ",
      overview:
        "Bittensor — децентрализованная ИИ-сеть, создающая открытый рынок машинного интеллекта. Стимулирует разработку и развёртывание ИИ-моделей через уникальную архитектуру подсетей, где разные подсети специализируются на разных ИИ-задачах — от генерации текста до распознавания изображений и финансового прогнозирования. Токен TAO вознаграждает вклад полезного интеллекта.",
      thesis:
        "Разработка ИИ всё больше концентрируется среди нескольких крупных компаний. Bittensor создаёт открытый конкурентный рынок ИИ, где любой может внести вклад и получить вознаграждение. Модель подсетей обеспечивает специализацию и компонуемость ИИ-сервисов. По мере роста опасений по поводу централизации ИИ децентрализованные альтернативы приобретают стратегическое значение.",
      risks:
        "Технология на крайне ранней стадии с недоказанными показателями качества. Конкуренция с хорошо финансируемыми централизованными ИИ-компаниями. Риски Sybil-атак и манипуляций в механизме стимулирования. Цена токена крайне спекулятивна и волатильна. Качество децентрализованных ИИ-результатов может уступать централизованным альтернативам в критических приложениях.",
      tamsFit:
        "Аллокация в торговом кошельке (1-2%). Позиция с наивысшим профилем риска/доходности в портфеле TAMS. Представляет небольшую спекулятивную аллокацию в тезис децентрализованного ИИ. Не является ключевой позицией — рассматривается как асимметричная экспозиция к потенциалу роста. Отслеживается по качеству подсетей, росту сети и сравнениям ИИ-бенчмарков.",
    },
    es: {
      description:
        "Red de inteligencia artificial descentralizada con un mecanismo de incentivos único para el desarrollo y despliegue de modelos de IA",
      overview:
        "Bittensor es una red de IA descentralizada que crea un mercado abierto para la inteligencia artificial. Incentiva el desarrollo y despliegue de modelos de IA a través de una arquitectura de subnets única donde diferentes subnets se especializan en diferentes tareas de IA — desde generación de texto hasta reconocimiento de imágenes y predicción financiera. El token TAO recompensa las contribuciones de inteligencia útil.",
      thesis:
        "El desarrollo de IA está cada vez más centralizado entre unas pocas grandes empresas. Bittensor crea un mercado abierto y competitivo de IA donde cualquiera puede contribuir y ser recompensado. El modelo de subnets permite la especialización y composabilidad de servicios de IA. A medida que crecen las preocupaciones sobre la centralización de la IA, las alternativas descentralizadas ganan importancia estratégica.",
      risks:
        "Tecnología en etapa extremadamente temprana con benchmarks de calidad no probados. Competencia de empresas de IA centralizadas bien financiadas. Riesgos de ataques Sybil y manipulación en el mecanismo de incentivos. El precio del token es altamente especulativo y volátil. La calidad de los resultados de IA descentralizada puede no igualar las alternativas centralizadas para aplicaciones críticas.",
      tamsFit:
        "Asignación en la cartera de trading (1-2%). Posición de mayor riesgo/recompensa en el portafolio TAMS. Representa una pequeña asignación especulativa a la tesis de IA descentralizada. No es una tenencia central — se trata como exposición asimétrica al potencial alcista. Se monitorean la calidad de los subnets, el crecimiento de la red y las comparaciones de benchmarks de IA.",
    },
  },
};

// תרגומי שמות הקטגוריות
export const categoryTranslations: Record<Language, Record<string, string>> = {
  en: {
    All: "All",
    "Layer 1": "Layer 1",
    Payments: "Payments",
    Infrastructure: "Infrastructure",
    Enterprise: "Enterprise",
    RWA: "RWA",
    "AI & Compute": "AI & Compute",
  },
  he: {
    All: "הכל",
    "Layer 1": "שכבה 1",
    Payments: "תשלומים",
    Infrastructure: "תשתיות",
    Enterprise: "ארגוני",
    RWA: "נכסים אמיתיים",
    "AI & Compute": "AI ומחשוב",
  },
  ar: {
    All: "الكل",
    "Layer 1": "الطبقة الأولى",
    Payments: "المدفوعات",
    Infrastructure: "البنية التحتية",
    Enterprise: "المؤسسات",
    RWA: "الأصول الحقيقية",
    "AI & Compute": "الذكاء الاصطناعي والحوسبة",
  },
  ru: {
    All: "Все",
    "Layer 1": "Уровень 1",
    Payments: "Платежи",
    Infrastructure: "Инфраструктура",
    Enterprise: "Корпоративные",
    RWA: "Реальные активы",
    "AI & Compute": "ИИ и вычисления",
  },
  es: {
    All: "Todos",
    "Layer 1": "Capa 1",
    Payments: "Pagos",
    Infrastructure: "Infraestructura",
    Enterprise: "Empresarial",
    RWA: "Activos Reales",
    "AI & Compute": "IA y Cómputo",
  },
};

/**
 * מחזירה רשימת נכסים מתורגמים לפי שפה
 * שדות שאינם תלויי שפה (ticker, name, marketCap, sector) נשמרים כמו שהם
 * שדות טקסטואליים (description, overview, thesis, risks, tamsFit) מתורגמים
 */
export function getLocalizedAssets(language: Language): Asset[] {
  return assets.map((asset) => {
    const translations = assetTranslations[asset.ticker];
    if (!translations || !translations[language]) {
      // אם אין תרגום, מחזירים את הנכס המקורי
      return asset;
    }
    const t = translations[language];
    return {
      ...asset,
      description: t.description,
      overview: t.overview,
      thesis: t.thesis,
      risks: t.risks,
      tamsFit: t.tamsFit,
    };
  });
}

/**
 * מחזירה רשימת קטגוריות מתורגמות לפי שפה
 */
export function getLocalizedCategories(language: Language): string[] {
  const translations = categoryTranslations[language];
  if (!translations) {
    // אם אין תרגום, מחזירים את הקטגוריות באנגלית
    return [...categories];
  }
  return categories.map((cat) => translations[cat] || cat);
}

// ייצוא הקטגוריות המקוריות לשימוש חיצוני
export { categories };
