import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [path]);

  const isActive = (to: string) => path === to || path.startsWith(to + "/");

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen ? "bg-background/96 backdrop-blur-md border-b border-hairline" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight hover:opacity-80 transition-opacity">
          <span className="text-gold">Visi</span><span className="text-foreground/80">Museum</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.2em]">
          {[
            ["/museums", "Musées"],
            ["/pays", "Par pays"],
            ["/top-musees", "Top 20"],
            ["/gratuits", "Gratuits"],
            ["/rankings", "Classements"],
          ].map(([to, label]) => (
            <Link key={to} to={to} className={`transition-colors hover:text-gold ${isActive(to) ? "text-gold" : "text-muted-foreground"}`}>
              {label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`block w-5 h-px bg-foreground/70 transition-all origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-foreground/70 transition-all ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-px bg-foreground/70 transition-all origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 border-b border-hairline px-6 py-6 flex flex-col gap-5">
          {[
            ["/museums", "Musées"],
            ["/pays", "Par pays"],
            ["/top-musees", "Top 20"],
            ["/gratuits", "Gratuits"],
            ["/rankings", "Classements"],
            ["/about", "À propos"],
          ].map(([to, label]) => (
            <Link key={to} to={to} className={`text-sm uppercase tracking-widest transition-colors hover:text-gold ${isActive(to) ? "text-gold" : "text-muted-foreground"}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
