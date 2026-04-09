"use client";

// פוטר — מינימלי ובוטח
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
      className="relative mt-32 w-full"
    >
      {/* קו הפרדה */}
      <div className="h-px w-full bg-white/[0.04]" />

      <div className="mx-auto max-w-5xl px-8 pt-12 pb-10">
        {/* קישורים */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-600 transition-colors duration-400 hover:text-zinc-400"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <a
            href="mailto:contact@tams.earth"
            className="text-xs text-zinc-600 transition-colors duration-400 hover:text-zinc-400"
          >
            contact@tams.earth
          </a>
        </div>

        {/* קו הפרדה */}
        <div className="my-8 h-px bg-white/[0.03]" />

        {/* מותג */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-zinc-700">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-zinc-500">TAMS</span> &middot;{" "}
            {t("footer.rights")}
          </p>
          <p className="text-[11px] text-zinc-700">
            {t("common.conceptApp")} &middot; v0.1
          </p>
        </div>
      </div>
    </footer>
  );
}
