import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VisiMuseum — Explorez les plus grands musées du monde" },
      { name: "description", content: "Découvrez les 40+ plus grands musées du monde : Louvre, British Museum, MoMA, Uffizi... Collections, informations pratiques et classements." },
      { property: "og:title", content: "VisiMuseum — Explorez les plus grands musées du monde" },
      { property: "og:url", content: "https://www.visimuseum.com" },
    ],
  }),
  component: HomePage,
});

const COUNTRIES = [...new Set(museums.map(m => m.country))].slice(0, 6);
const featured = museums.filter(m => (m.visitors ?? 0) > 3).slice(0, 6);

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl md:text-5xl text-gold">{value}</p>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function HomePage() {
  const freeMuseums = museums.filter(m => m.admission === "free").length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#0e0d0b_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.5em] text-gold/50 mb-8">Le guide des musées du monde</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[10rem] leading-[0.88] tracking-tight mb-8">
            Visi<br/><span className="text-gradient-gold italic">Museum</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
            {museums.length} musées répertoriés dans {[...new Set(museums.map(m => m.country))].length} pays. Des collections millénaires à portée de clic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/museums" className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-background hover:opacity-90 transition-all shadow-gold">
              Explorer les musées
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/rankings" className="inline-flex items-center gap-3 rounded-full border border-hairline px-8 py-4 text-sm text-muted-foreground hover:text-foreground hover:border-gold/30 transition-all">
              Voir les classements
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/30">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-hairline py-16 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value={`${museums.length}+`} label="Musées" />
          <StatCard value={`${[...new Set(museums.map(m => m.country))].length}`} label="Pays" />
          <StatCard value={`${freeMuseums}`} label="Gratuits" />
          <StatCard value="5000+" label="Ans d'histoire" />
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Sélection</p>
            <h2 className="font-display text-4xl md:text-5xl">Les incontournables</h2>
          </div>
          <Link to="/museums" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
            Tous les musées <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline rounded-lg overflow-hidden border border-hairline">
          {featured.map((m) => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              className="group bg-background p-8 flex flex-col gap-3 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-gold/60">{m.type}</span>
                {m.admission === "free" && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">Gratuit</span>
                )}
              </div>
              <h3 className="font-display text-2xl group-hover:text-gradient-gold transition-all leading-tight">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
              <p className="text-sm text-muted-foreground/60 line-clamp-2 leading-relaxed mt-1">{m.desc}</p>
              {m.visitors && (
                <p className="text-xs text-muted-foreground/40 mt-auto pt-2 border-t border-hairline">
                  ~{m.visitors}M visiteurs / an
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/museums" className="text-sm text-gold/70 hover:text-gold transition-colors">
            Voir tous les musées →
          </Link>
        </div>
      </section>

      {/* Countries */}
      <section className="border-t border-hairline py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-widest text-gold/60 mb-2 text-center">Explorer par pays</p>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-12">Destinations</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[...new Set(museums.map(m => m.country))].map(country => {
              const count = museums.filter(m => m.country === country).length;
              return (
                <Link key={country} to="/museums" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-hairline hover:border-gold/40 hover:bg-secondary/50 transition-all">
                  <span className="text-sm font-medium">{country}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-gold/60 transition-colors">{count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
