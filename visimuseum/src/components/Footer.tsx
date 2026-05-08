export function Footer() {
  return (
    <footer className="mt-auto border-t border-hairline py-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="font-display text-base text-gold/70">VisiMuseum</span>
        <span>© {new Date().getFullYear()} — Tous droits réservés</span>
        <a href="/sitemap.xml" className="hover:text-foreground transition-colors">Sitemap</a>
      </div>
    </footer>
  );
}
