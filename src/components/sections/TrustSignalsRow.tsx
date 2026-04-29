"use client";

// שורת trust signals — Auditor / Custodian / Domicile / Regulator
// פלייסהולדר אסתטי שמייצר נוכחות מוסדית מיד
import { motion } from "framer-motion";
import { ShieldCheck, Building2, Globe2, FileCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const ICONS = [ShieldCheck, Building2, Globe2, FileCheck];

const TEXTS = {
  en: [
    { eyebrow: "Auditor", value: "Tier-1 Audit Firm", sub: "Annual financial &amp; on-chain attestation" },
    { eyebrow: "Custody", value: "Multi-Sig · Cold Storage", sub: "Fireblocks-grade infrastructure" },
    { eyebrow: "Domicile", value: "BVI · Cayman-ready", sub: "LP-friendly fund structure" },
    { eyebrow: "Compliance", value: "Accredited Only", sub: "Self-cert &amp; KYC required" },
  ],
  he: [
    { eyebrow: "ביקורת", value: "משרד ביקורת Tier-1", sub: "אישור פיננסי ושרשרת on-chain שנתי" },
    { eyebrow: "Custody", value: "Multi-Sig · אחסון קר", sub: "תשתית ברמת Fireblocks" },
    { eyebrow: "מבנה משפטי", value: "BVI · מוכן ל-Cayman", sub: "מבנה קרן ידידותי ל-LP" },
    { eyebrow: "ציות", value: "מוסמכים בלבד", sub: "Self-cert ו-KYC נדרשים" },
  ],
  ar: [
    { eyebrow: "المراجع", value: "شركة تدقيق Tier-1", sub: "تصديق مالي و on-chain سنوي" },
    { eyebrow: "الحفظ", value: "Multi-Sig · تخزين بارد", sub: "بنية تحتية بمستوى Fireblocks" },
    { eyebrow: "الإقامة القانونية", value: "BVI · جاهز لـ Cayman", sub: "هيكل صندوق صديق للـ LP" },
    { eyebrow: "الامتثال", value: "للمعتمدين فقط", sub: "إقرار ذاتي و KYC مطلوبان" },
  ],
  ru: [
    { eyebrow: "Аудитор", value: "Аудиторская фирма Tier-1", sub: "Ежегодный финансовый и on-chain аудит" },
    { eyebrow: "Хранение", value: "Multi-Sig · Холодное хранение", sub: "Инфраструктура уровня Fireblocks" },
    { eyebrow: "Юрисдикция", value: "BVI · готовность к Cayman", sub: "Структура фонда, удобная для LP" },
    { eyebrow: "Комплаенс", value: "Только аккредитованные", sub: "Самосертификация и KYC обязательны" },
  ],
  es: [
    { eyebrow: "Auditor", value: "Firma de auditoría Tier-1", sub: "Atestación financiera y on-chain anual" },
    { eyebrow: "Custodia", value: "Multi-Sig · Almacenamiento frío", sub: "Infraestructura nivel Fireblocks" },
    { eyebrow: "Domicilio", value: "BVI · listo para Cayman", sub: "Estructura de fondo amigable con LP" },
    { eyebrow: "Cumplimiento", value: "Solo acreditados", sub: "Auto-certificación y KYC requeridos" },
  ],
} as const;

export default function TrustSignalsRow() {
  const { language } = useLanguage();
  const items = TEXTS[language] || TEXTS.en;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((sig, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={sig.eyebrow}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.19, 1, 0.22, 1] }}
              className="surface-tier-3 p-4 sm:p-5 flex items-start gap-3 group hover:border-amber-500/30 transition-colors duration-500"
            >
              <div className="size-9 rounded-lg bg-amber-500/[0.08] border border-amber-500/20 flex items-center justify-center shrink-0">
                <Icon className="size-4 text-amber-400/85" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] tracking-[0.32em] uppercase text-amber-300/65 font-semibold mb-1">
                  {sig.eyebrow}
                </div>
                <div className="text-xs sm:text-sm text-white font-medium leading-tight" dangerouslySetInnerHTML={{ __html: sig.value }} />
                <div className="text-[10px] text-zinc-500 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: sig.sub }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
