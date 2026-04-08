"use client";

// פוטר גלובלי — עיצוב פרימיום עדין התואם את הסיידבר
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const footerLinks = [
  { labelKey: "footer.faq", href: "/faq" },
  { labelKey: "footer.legal", href: "/legal" },
  { labelKey: "footer.team", href: "/team" },
  { labelKey: "footer.methodology", href: "/methodology" },
] as const;

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative mt-20 w-full border-t border-zinc-800/40"
      style={{
        borderImage:
          "linear-gradient(to right, transparent, rgba(212, 168, 83, 0.15), rgba(79, 143, 247, 0.15), transparent) 1",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* שורה עליונה — קישורים + יצירת קשר */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* קישורי ניווט */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-500 transition-colors hover:text-blue-300"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* אימייל */}
          <a
            href="mailto:contact@tams.earth"
            className="text-xs text-zinc-500 transition-colors hover:text-amber-400"
          >
            contact@tams.earth
          </a>
        </div>

        {/* קו הפרדה */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        {/* שורה תחתונה — מותג + גרסה */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">
            &copy; {new Date().getFullYear()} TAMS &middot;{" "}
            {t("footer.rights")}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-blue-400/30">
            {t("common.conceptApp")} &middot; v0.1
          </p>
        </div>
      </div>
    </footer>
  );
}
