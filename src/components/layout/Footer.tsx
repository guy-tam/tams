"use client";

// פוטר — מנורה מוזהבת עם נוכחות בוטחת
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
      className="relative mt-24 w-full"
    >
      {/* קו מנורה מוזהב */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      <div className="mx-auto max-w-5xl px-8 pt-10 pb-8">
        {/* קישורים */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 transition-all duration-300 hover:text-amber-400/90 hover:tracking-[0.15em]"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <a
            href="mailto:contact@tams.earth"
            className="text-[11px] font-medium text-amber-500/70 tracking-wide transition-all duration-300 hover:text-amber-400 hover:tracking-wider"
          >
            contact@tams.earth
          </a>
        </div>

        {/* קו הפרדה */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />

        {/* מותג */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-zinc-600">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-zinc-500">TAMS</span> &middot;{" "}
            {t("footer.rights")}
          </p>
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-zinc-700">
            {t("common.conceptApp")} &middot;{" "}
            <span className="text-blue-400/40">v0.1</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
