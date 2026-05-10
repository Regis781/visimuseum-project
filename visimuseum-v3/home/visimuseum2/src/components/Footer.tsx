import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-display text-2xl block mb-3">
            <span className="text-gold">Visi</span><span className="text-foreground/70">Museum</span>
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Le guide de référence des plus grands musées du monde.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Explorer</p>
          <ul className="space-y-2.5">
            {[["Tous les musées", "/museums"], ["Par pays", "/pays"], ["Top 20", "/top-musees"], ["Musées gratuits", "/gratuits"]].map(([l, t]) => (
              <li key={t}><Link to={t} className="text-sm text-muted-foreground hover:text-gold transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Classements</p>
          <ul className="space-y-2.5">
            {[["Plus visités", "/rankings"], ["Plus anciens", "/rankings"], ["À propos", "/about"]].map(([l, t]) => (
              <li key={l}><Link to={t} className="text-sm text-muted-foreground hover:text-gold transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Destinations vedettes</p>
          <ul className="space-y-2.5">
            {[["France", "france"], ["Italie", "italie"], ["Royaume-Uni", "royaume-uni"], ["Japon", "japon"], ["États-Unis", "etats-unis"]].map(([l, s]) => (
              <li key={s}><Link to="/pays/$country" params={{ country: s }} className="text-sm text-muted-foreground hover:text-gold transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap justify-between items-center gap-2">
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} VisiMuseum — Tous droits réservés</span>
          <div className="flex gap-4">
            <a href="/sitemap.xml" className="text-xs text-muted-foreground hover:text-gold transition-colors">Sitemap</a>
            <a href="/robots.txt" className="text-xs text-muted-foreground hover:text-gold transition-colors">Robots</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
