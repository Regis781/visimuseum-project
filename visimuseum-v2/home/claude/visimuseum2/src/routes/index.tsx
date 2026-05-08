import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const featured = museums.slice(0, 6);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07)_0%,transparent_70%)] pointer-events-none" />
        <p className="text-xs uppercase tracking-[0.4em] text-gold/60 mb-6">Bienvenue sur</p>
        <h1 className="font-display text-7xl md:text-9xl leading-[0.9] tracking-tight">
          Visi<span className="text-gradient-gold">Museum</span>
        </h1>
        <p className="mt-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
          Explorez les plus grands musées du monde. Des collections millénaires à portée de clic.
        </p>
        <Link
          to="/museums"
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-8 py-4 text-sm uppercase tracking-widest text-gold hover:bg-gold/20 transition-all"
        >
          Explorer les musées
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 py-24 w-full">
        <h2 className="font-display text-4xl mb-12 text-muted-foreground">
          À la une
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {featured.map((m) => (
            <Link
              key={m.name}
              to="/museums/$slug"
              params={{ slug: museumSlug(m) }}
              className="group bg-background p-8 flex flex-col gap-3 hover:bg-secondary transition-colors"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gold/60">{m.type}</span>
              <h3 className="font-display text-2xl group-hover:text-gradient-gold transition-all">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/museums" className="text-sm uppercase tracking-widest text-gold/70 hover:text-gold transition-colors">
            Voir tous les musées →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
