import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight text-gold">
          VisiMuseum
        </Link>
        <nav className="flex items-center gap-8 text-sm tracking-widest uppercase text-muted-foreground">
          <Link to="/museums" className="hover:text-foreground transition-colors">
            {t("allMuseums")}
          </Link>
          <Link to="/rankings" className="hover:text-foreground transition-colors">
            {t("rankings")}
          </Link>
          <Link to="/about" className="hover:text-foreground transition-colors">
            {t("about")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
