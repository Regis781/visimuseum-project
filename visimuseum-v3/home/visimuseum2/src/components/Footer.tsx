import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-display text-2xl text-gold mb-3">VisiMuseum</p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Le guide de référence des plus grands musées du monde. Découvrez, comparez, explorez.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Navigation</p>
          <ul className="space-y-3">
            {[["Accueil", "/"], ["Tous les musées", "/museums"], ["Classements", "/rankings"], ["À propos", "/about"]].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-muted-foreground hover:text-gold transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Ressources</p>
          <ul className="space-y-3">
            <li><a href="/robots.txt" className="text-sm text-muted-foreground hover:text-gold transition-colors">Robots.txt</a></li>
            <li><a href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-gold transition-colors">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} VisiMuseum</span>
          <span className="text-xs text-muted-foreground">{new Date().getFullYear()} — Tous droits réservés</span>
        </div>
      </div>
    </footer>
  );
}
