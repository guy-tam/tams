// נתוני מפת דרכים - שלבי פיתוח הפרויקט עם תמיכה רב-לשונית

import type { Language } from "@/lib/i18n/types";

export interface Milestone {
  label: string;
  completed: boolean;
}

export interface Phase {
  id: string;
  title: string;
  quarter: string;
  status: "completed" | "current" | "upcoming";
  description: string;
  milestones: Milestone[];
}

// מבנה נתוני תרגום לשלב בודד (ללא שדות שאינם תלויי שפה)
interface PhaseTranslation {
  title: string;
  description: string;
  milestones: string[];
}

// תרגומים לכל השפות
const translations: Record<Language, PhaseTranslation[]> = {
  he: [
    {
      title: "מחקר ותשתית",
      description: "הנחת היסודות - מחקר שוק מעמיק, בניית תזת השקעה, ותכנון ארכיטקטורת הארנקים.",
      milestones: [
        "מחקר שוק ונכסים דיגיטליים",
        "גיבוש תזת השקעה",
        "תכנון ארכיטקטורת 4 ארנקים",
        "ניתוח TAM/SAM/SOM",
      ],
    },
    {
      title: "פיתוח ובנייה",
      description: "בניית הפלטפורמה הטכנית, פיתוח כלי ניהול ארנקים, והקמת תשתית DeFi.",
      milestones: [
        "פיתוח ממשק ניהול פורטפוליו",
        "אינטגרציה עם פרוטוקולי DeFi",
        "מערכת ניטור וניהול סיכונים",
        "בדיקות אבטחה ו-audit",
      ],
    },
    {
      title: "השקה מוגבלת",
      description: "השקה מוגבלת למשקיעים נבחרים, ניטור ביצועים, ואופטימיזציה של אסטרטגיות.",
      milestones: [
        "גיוס סבב ראשון",
        "הפעלת ארנק מסחר",
        "הפעלת אסטרטגיות DeFi",
        "דוחות ביצועים חודשיים",
      ],
    },
    {
      title: "צמיחה והרחבה",
      description: "הרחבת הפעילות, הוספת נכסים ואסטרטגיות חדשות, ומעבר לניהול מוסדי מלא.",
      milestones: [
        "הרחבת אקוסיסטם הנכסים",
        "אסטרטגיות מסחר מתקדמות",
        "שיתופי פעולה מוסדיים",
        "דוח שנתי ראשון",
      ],
    },
    {
      title: "בשלות וסקייל",
      description: "מעבר למודל ניהול מוסדי מלא, גיוון אסטרטגיות, והרחבה לשווקים נוספים.",
      milestones: [
        "ניהול נכסים מוסדי מלא",
        "הרחבה גלובלית",
        "מוצרים פיננסיים מתקדמים",
        "רישיון ניהול השקעות",
      ],
    },
  ],
  en: [
    {
      title: "Research & Infrastructure",
      description: "Laying the foundations - in-depth market research, building an investment thesis, and designing wallet architecture.",
      milestones: [
        "Market & digital assets research",
        "Investment thesis formulation",
        "4-wallet architecture design",
        "TAM/SAM/SOM analysis",
      ],
    },
    {
      title: "Development & Build",
      description: "Building the technical platform, developing wallet management tools, and establishing DeFi infrastructure.",
      milestones: [
        "Portfolio management interface development",
        "DeFi protocol integration",
        "Monitoring & risk management system",
        "Security testing & audit",
      ],
    },
    {
      title: "Limited Launch",
      description: "Limited launch for selected investors, performance monitoring, and strategy optimization.",
      milestones: [
        "First funding round",
        "Trading wallet activation",
        "DeFi strategies activation",
        "Monthly performance reports",
      ],
    },
    {
      title: "Growth & Expansion",
      description: "Expanding operations, adding new assets and strategies, and transitioning to full institutional management.",
      milestones: [
        "Asset ecosystem expansion",
        "Advanced trading strategies",
        "Institutional partnerships",
        "First annual report",
      ],
    },
    {
      title: "Maturity & Scale",
      description: "Transitioning to a full institutional management model, diversifying strategies, and expanding to new markets.",
      milestones: [
        "Full institutional asset management",
        "Global expansion",
        "Advanced financial products",
        "Investment management license",
      ],
    },
  ],
  ar: [
    {
      title: "البحث والبنية التحتية",
      description: "وضع الأسس - بحث سوقي معمّق، بناء أطروحة استثمارية، وتصميم هندسة المحافظ.",
      milestones: [
        "بحث السوق والأصول الرقمية",
        "صياغة أطروحة الاستثمار",
        "تصميم هندسة 4 محافظ",
        "تحليل TAM/SAM/SOM",
      ],
    },
    {
      title: "التطوير والبناء",
      description: "بناء المنصة التقنية، تطوير أدوات إدارة المحافظ، وإنشاء بنية DeFi التحتية.",
      milestones: [
        "تطوير واجهة إدارة المحفظة",
        "التكامل مع بروتوكولات DeFi",
        "نظام المراقبة وإدارة المخاطر",
        "اختبارات الأمان والتدقيق",
      ],
    },
    {
      title: "إطلاق محدود",
      description: "إطلاق محدود لمستثمرين مختارين، مراقبة الأداء، وتحسين الاستراتيجيات.",
      milestones: [
        "جولة التمويل الأولى",
        "تفعيل محفظة التداول",
        "تفعيل استراتيجيات DeFi",
        "تقارير أداء شهرية",
      ],
    },
    {
      title: "النمو والتوسع",
      description: "توسيع العمليات، إضافة أصول واستراتيجيات جديدة، والانتقال إلى إدارة مؤسسية كاملة.",
      milestones: [
        "توسيع منظومة الأصول",
        "استراتيجيات تداول متقدمة",
        "شراكات مؤسسية",
        "التقرير السنوي الأول",
      ],
    },
    {
      title: "النضج والتوسع",
      description: "الانتقال إلى نموذج إدارة مؤسسية كاملة، تنويع الاستراتيجيات، والتوسع إلى أسواق جديدة.",
      milestones: [
        "إدارة أصول مؤسسية كاملة",
        "توسع عالمي",
        "منتجات مالية متقدمة",
        "رخصة إدارة الاستثمارات",
      ],
    },
  ],
  ru: [
    {
      title: "Исследование и инфраструктура",
      description: "Закладка основ — глубокое исследование рынка, формирование инвестиционного тезиса и проектирование архитектуры кошельков.",
      milestones: [
        "Исследование рынка и цифровых активов",
        "Формирование инвестиционного тезиса",
        "Проектирование архитектуры 4 кошельков",
        "Анализ TAM/SAM/SOM",
      ],
    },
    {
      title: "Разработка и создание",
      description: "Создание технической платформы, разработка инструментов управления кошельками и построение инфраструктуры DeFi.",
      milestones: [
        "Разработка интерфейса управления портфелем",
        "Интеграция с протоколами DeFi",
        "Система мониторинга и управления рисками",
        "Тестирование безопасности и аудит",
      ],
    },
    {
      title: "Ограниченный запуск",
      description: "Ограниченный запуск для избранных инвесторов, мониторинг результатов и оптимизация стратегий.",
      milestones: [
        "Первый раунд привлечения средств",
        "Активация торгового кошелька",
        "Активация стратегий DeFi",
        "Ежемесячные отчёты о результатах",
      ],
    },
    {
      title: "Рост и расширение",
      description: "Расширение деятельности, добавление новых активов и стратегий, переход к полному институциональному управлению.",
      milestones: [
        "Расширение экосистемы активов",
        "Продвинутые торговые стратегии",
        "Институциональные партнёрства",
        "Первый годовой отчёт",
      ],
    },
    {
      title: "Зрелость и масштабирование",
      description: "Переход к полной модели институционального управления, диверсификация стратегий и выход на новые рынки.",
      milestones: [
        "Полное институциональное управление активами",
        "Глобальное расширение",
        "Продвинутые финансовые продукты",
        "Лицензия на управление инвестициями",
      ],
    },
  ],
  es: [
    {
      title: "Investigación e infraestructura",
      description: "Sentando las bases: investigación de mercado en profundidad, construcción de la tesis de inversión y diseño de la arquitectura de billeteras.",
      milestones: [
        "Investigación de mercado y activos digitales",
        "Formulación de la tesis de inversión",
        "Diseño de arquitectura de 4 billeteras",
        "Análisis TAM/SAM/SOM",
      ],
    },
    {
      title: "Desarrollo y construcción",
      description: "Construcción de la plataforma técnica, desarrollo de herramientas de gestión de billeteras y establecimiento de infraestructura DeFi.",
      milestones: [
        "Desarrollo de interfaz de gestión de portafolio",
        "Integración con protocolos DeFi",
        "Sistema de monitoreo y gestión de riesgos",
        "Pruebas de seguridad y auditoría",
      ],
    },
    {
      title: "Lanzamiento limitado",
      description: "Lanzamiento limitado para inversores seleccionados, monitoreo de rendimiento y optimización de estrategias.",
      milestones: [
        "Primera ronda de financiación",
        "Activación de billetera de trading",
        "Activación de estrategias DeFi",
        "Informes de rendimiento mensuales",
      ],
    },
    {
      title: "Crecimiento y expansión",
      description: "Expansión de operaciones, incorporación de nuevos activos y estrategias, y transición a gestión institucional completa.",
      milestones: [
        "Expansión del ecosistema de activos",
        "Estrategias de trading avanzadas",
        "Alianzas institucionales",
        "Primer informe anual",
      ],
    },
    {
      title: "Madurez y escala",
      description: "Transición a un modelo de gestión institucional completa, diversificación de estrategias y expansión a nuevos mercados.",
      milestones: [
        "Gestión institucional completa de activos",
        "Expansión global",
        "Productos financieros avanzados",
        "Licencia de gestión de inversiones",
      ],
    },
  ],
};

// מידע בסיסי של כל שלב (ללא תלות בשפה)
const phaseBase = [
  { id: "phase-1", quarter: "Q1 2026", status: "completed" as const, completedMilestones: [true, true, true, true] },
  { id: "phase-2", quarter: "Q2 2026", status: "current" as const, completedMilestones: [true, true, false, false] },
  { id: "phase-3", quarter: "Q3 2026", status: "upcoming" as const, completedMilestones: [false, false, false, false] },
  { id: "phase-4", quarter: "Q4 2026", status: "upcoming" as const, completedMilestones: [false, false, false, false] },
  { id: "phase-5", quarter: "2027+", status: "upcoming" as const, completedMilestones: [false, false, false, false] },
];

/**
 * מחזיר את שלבי מפת הדרכים בשפה המבוקשת
 */
export function getLocalizedPhases(language: Language): Phase[] {
  const langTranslations = translations[language];
  return phaseBase.map((base, i) => ({
    id: base.id,
    quarter: base.quarter,
    status: base.status,
    title: langTranslations[i].title,
    description: langTranslations[i].description,
    milestones: langTranslations[i].milestones.map((label, j) => ({
      label,
      completed: base.completedMilestones[j],
    })),
  }));
}

// ייצוא לתאימות לאחור - ברירת מחדל בעברית
export const phases: Phase[] = getLocalizedPhases("he");
