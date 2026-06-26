import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VisiMuseum — Explorez les plus grands musées du monde en ligne" },
      { name: "description", content: `Découvrez ${museums.length} musées incontournables dans ${[...new Set(museums.map(m => m.country))].length} pays. Louvre, British Museum, MoMA, Uffizi... Informations, collections et visites virtuelles gratuites.` },
      { property: "og:title", content: "VisiMuseum — Explorez les plus grands musées du monde" },
      { property: "og:url", content: "https://www.visimuseum.com" },
      { name: "keywords", content: "musée virtuel, visite musée en ligne, musée gratuit, musée interactif, meilleurs musées du monde, musée 3D, visite virtuelle musée" },
    ],
  }),
  component: HomePage,
});

function HeroSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const suggestions = query.length >= 2
    ? museums.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate({ to: "/museums", search: { q: query } as Record<string, string> });
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <svg className="absolute left-5 text-muted-foreground/40 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Louvre, Van Gogh Museum, Tokyo…"
          className="w-full bg-secondary/60 border border-gold/20 rounded-full pl-13 pr-36 py-4 text-sm focus:outline-none focus:border-gold/50 text-foreground placeholder:text-muted-foreground/40 backdrop-blur-sm"
        />
        <button type="submit" className="absolute right-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium text-background hover:opacity-90 transition-all">
          Rechercher
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-secondary border border-hairline rounded-2xl overflow-hidden z-20 shadow-xl">
          {suggestions.map(m => (
            <Link
              key={m.name}
              to="/museums/$slug"
              params={{ slug: museumSlug(m) }}
              onClick={() => setQuery("")}
              className="flex items-center gap-4 px-5 py-3 hover:bg-secondary/80 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/60"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-gold transition-colors truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.city}, {m.country}</p>
              </div>
              {m.admission === "free" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 shrink-0">Gratuit</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </form>
  );
}

const PAYS_VEDETTES = ["France", "Italie", "Royaume-Uni", "États-Unis", "Japon", "Espagne"];

function HomePage() {
  const featured = [...museums].sort((a, b) => (b.visitors ?? 0) - (a.visitors ?? 0)).slice(0, 6);
  const freeCount = museums.filter(m => m.admission === "free").length;
  const countryCount = [...new Set(museums.map(m => m.country))].length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,168,76,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#0e0d0b_100%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl w-full">
          <p className="text-xs uppercase tracking-[0.5em] text-gold/50 mb-6">Votre guide des musées du monde</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] leading-[0.88] tracking-tight mb-8">
            Visi<span className="text-gradient-gold italic">Museum</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Explorez <strong className="text-foreground">{museums.length} musées incontournables</strong> dans {countryCount} pays depuis chez vous. Du Louvre à la Cité Interdite, découvrez les plus grandes collections de l'humanité.
          </p>

          {/* Hero search */}
          <HeroSearch />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/museums" className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-background hover:opacity-90 transition-all shadow-gold">
              Explorer tous les musées
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/gratuits" className="inline-flex items-center gap-3 rounded-full border border-gold/30 px-8 py-4 text-sm text-gold hover:bg-gold/10 transition-all">
              {freeCount} musées gratuits
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
      <section className="border-y border-hairline py-14 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: `${museums.length}+`, label: "Musées répertoriés" },
            { val: `${countryCount}`, label: "Pays couverts" },
            { val: `${freeCount}`, label: "Musées gratuits" },
            { val: "5 000+", label: "Ans d'histoire" },
          ].map(({ val, label }) => (
            <div key={label}>
              <p className="font-display text-4xl md:text-5xl text-gold">{val}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is VisiMuseum */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-6">Qu'est-ce que VisiMuseum ?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
          VisiMuseum est le guide de référence pour découvrir les plus grands musées du monde. Que vous prépariez un voyage, cherchiez une visite virtuelle ou souhaitiez simplement explorer une collection, notre annuaire vous donne accès aux meilleurs musées de la planète en quelques clics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
          {[
            { icon: "🗺️", title: "Découvrir", text: "Parcourez notre sélection de musées classés par pays, type et tarif. Du musée d'art à l'histoire naturelle, trouvez ce qui vous inspire." },
            { icon: "🔍", title: "Comparer", text: "Consultez les descriptions détaillées, les informations pratiques et les classements pour choisir votre prochaine visite." },
            { icon: "🌐", title: "Visiter", text: "Accédez directement aux sites officiels de chaque musée pour réserver, explorer les collections en ligne ou préparer votre visite." },
          ].map(({ icon, title, text }) => (
            <div key={title} className="p-6 border border-hairline rounded-lg bg-secondary/30">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-display text-xl mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 pb-20 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Les plus visités</p>
            <h2 className="font-display text-4xl md:text-5xl">Musées incontournables</h2>
          </div>
          <Link to="/top-musees" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
            Voir le top complet <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline rounded-lg overflow-hidden border border-hairline">
          {featured.map((m) => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              className="group bg-background p-7 flex flex-col gap-3 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-gold/60">{m.type}</span>
                {m.admission === "free" && <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">Gratuit</span>}
              </div>
              <h3 className="font-display text-2xl group-hover:text-gradient-gold transition-all leading-tight">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
              <p className="text-sm text-muted-foreground/60 line-clamp-2 leading-relaxed">{m.desc}</p>
              {m.visitors && <p className="text-xs text-muted-foreground/30 mt-auto pt-2 border-t border-hairline">~{m.visitors}M visiteurs / an</p>}
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Pages CTA */}
      <section className="border-t border-hairline py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-widest text-gold/60 mb-2 text-center">Explorer par thème</p>
          <h2 className="font-display text-4xl text-center mb-10">Guides & Sélections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: "/top-musees", icon: "🏆", title: "Top musées du monde", desc: "Le classement des musées les plus visités et remarquables" },
              { to: "/gratuits", icon: "🎟️", title: "Musées gratuits", desc: "Accédez à la culture sans dépenser un euro" },
              { to: "/pays", icon: "🌍", title: "Musées par pays", desc: "Explorez les musées nation par nation" },
              { to: "/rankings", icon: "📊", title: "Classements", desc: "Les plus anciens, les plus grands, les plus visités" },
            ].map(({ to, icon, title, desc }) => (
              <Link key={to} to={to} className="group p-6 border border-hairline rounded-lg bg-secondary/20 hover:border-gold/30 hover:bg-secondary/50 transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display text-xl mb-1 group-hover:text-gradient-gold transition-all">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="border-t border-hairline py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl text-center mb-10">Explorer par pays</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[...new Set(museums.map(m => m.country))].map(country => {
              const count = museums.filter(m => m.country === country).length;
              return (
                <Link key={country} to="/pays/$country" params={{ country: country.toLowerCase().replace(/ /g, "-") }}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-hairline hover:border-gold/40 hover:bg-secondary/50 transition-all"
                >
                  <span className="text-sm font-medium">{country}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-gold/60">{count}</span>
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
