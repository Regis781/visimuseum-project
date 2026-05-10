import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const path = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [path]);

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-xs uppercase tracking-[0.2em] transition-colors hover:text-gold ${
        path === to || path.startsWith(to + "/") ? "text-gold" : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/95 backdrop-blur-md border-b border-hairline shadow-[0_1px_0_rgba(201,168,76,0.08)]" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight text-gold hover:opacity-80 transition-opacity">
          Visi<span className="font-light">Museum</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLink("/museums", "Musées")}
          {navLink("/rankings", "Classements")}
          {navLink("/about", "À propos")}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-foreground transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-hairline px-6 py-6 flex flex-col gap-6">
          {navLink("/museums", "Musées")}
          {navLink("/rankings", "Classements")}
          {navLink("/about", "À propos")}
        </div>
      )}
    </header>
  );
}
