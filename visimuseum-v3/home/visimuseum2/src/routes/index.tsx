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
      { name: "description", content: `Découvrez ${museums.length} musées incontournables dans ${[...new Set(museums.map(m => m.country))].length} pays.` },
      { property: "og:title", content: "VisiMuseum — Explorez les plus grands musées du monde" },
      { property: "og:url", content: "https://www.visimuseum.com" },
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
    if (query.trim()) navigate({ to: "/museums" });
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto">
      <div className="relative flex items-center">
        <svg className="absolute left-5 text-muted-foreground/40 shrink-0 z-10" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Louvre, Tokyo, Van Gogh…"
          className="w-full bg-white/5 border border-gold/20 rounded-2xl pl-12 pr-36 py-4 text-sm focus:outline-none focus:border-gold/50 text-foreground placeholder:text-muted-foreground/40 backdrop-blur-sm transition-colors"
        />
        <button type="submit" className="absolute right-2 rounded-xl bg-gold px-5 py-2.5 text-xs font-medium text-background hover:opacity-90 transition-all">
          Rechercher
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-secondary border border-hairline rounded-2xl overflow-hidden z-20 shadow-card">
          {suggestions.map(m => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              onClick={() => setQuery("")}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors group border-b border-hairline last:border-0"
            >
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/60"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-gold transition-colors truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.city}, {m.country}</p>
              </div>
              {m.admission === "free" && <span className="chip chip-gold shrink-0">Gratuit</span>}
            </Link>
          ))}
        </div>
      )}
    </form>
  );
}

function HomePage() {
  const featured = [...museums].sort((a, b) => (b.visitors ?? 0) - (a.visitors ?? 0)).slice(0, 6);
  const freeCount = museums.filter(m => m.admission === "free").length;
  const countryCount = [...new Set(museums.map(m => m.country))].length;
  const allCountries = [...new Set(museums.map(m => m.country))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(201,168,76,0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,#0e0d0b_100%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-8">
          <span className="eyebrow">Votre guide des musées du monde</span>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[9.5rem] leading-[0.88] tracking-tight">
            Visi<span className="text-gradient-gold italic">Museum</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Explorez <strong className="text-foreground">{museums.length} musées incontournables</strong> dans {countryCount} pays. Du Louvre à la Cité Interdite.
          </p>
          <HeroSearch />
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/museums" className="inline-flex items-center gap-2.5 rounded-xl bg-gold px-7 py-3.5 text-sm font-medium text-background hover:opacity-90 transition-all shadow-gold">
              Explorer tous les musées
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/gratuits" className="inline-flex items-center gap-2.5 rounded-xl border border-gold/25 px-7 py-3.5 text-sm text-gold hover:bg-gold/8 transition-all">
              {freeCount} musées gratuits
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/25"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-hairline">
        <div className="mx-auto max-w-5xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { val: `${museums.length}+`, label: "Musées répertoriés" },
            { val: `${countryCount}`, label: "Pays couverts" },
            { val: `${freeCount}`, label: "Musées gratuits" },
            { val: "5 000+", label: "Ans d'histoire" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col gap-2">
              <p className="font-display text-4xl md:text-5xl text-gold">{val}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QU'EST-CE QUE VISIMUSEUM ── */}
      <section className="mx-auto max-w-5xl px-6 section-gap text-center w-full">
        <span className="eyebrow">Notre mission</span>
        <h2 className="font-display text-4xl md:text-5xl mb-5 title-underline">Qu'est-ce que VisiMuseum ?</h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-14">
          Le guide de référence des plus grands musées du monde. Préparez un voyage, cherchez une visite virtuelle ou explorez simplement une collection depuis chez vous.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {[
            { icon: "🗺️", title: "Découvrir", text: "Parcourez notre sélection de musées classés par pays, type et tarif. Du musée d'art à l'histoire naturelle, trouvez ce qui vous inspire." },
            { icon: "🔍", title: "Comparer", text: "Consultez descriptions détaillées, informations pratiques et classements pour choisir votre prochaine visite." },
            { icon: "🌐", title: "Visiter", text: "Accédez directement aux sites officiels pour réserver, explorer les collections en ligne ou préparer votre visite." },
          ].map(({ icon, title, text }) => (
            <div key={title} className="p-7 border border-hairline rounded-2xl bg-secondary/25 card-hover flex flex-col gap-4">
              <span className="text-3xl">{icon}</span>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MUSÉES INCONTOURNABLES ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="eyebrow">Les plus visités</span>
            <h2 className="font-display text-4xl md:text-5xl title-underline">Musées incontournables</h2>
          </div>
          <Link to="/top-musees" className="hidden md:flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors uppercase tracking-widest">
            Top complet <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((m) => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              className="group bg-secondary/20 border border-hairline rounded-2xl p-7 flex flex-col gap-3.5 card-hover hover:border-gold/20"
            >
              <div className="flex items-center justify-between">
                <span className="chip">{m.type}</span>
                {m.admission === "free" && <span className="chip chip-gold">Gratuit</span>}
              </div>
              <h3 className="font-display text-2xl group-hover:text-gradient-gold transition-all leading-tight mt-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
              <p className="text-sm text-muted-foreground/55 line-clamp-2 leading-relaxed">{m.desc}</p>
              {m.visitors && (
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-hairline">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <p className="text-xs text-muted-foreground/40">~{m.visitors}M visiteurs / an</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── GUIDES & SÉLECTIONS ── */}
      <section className="border-t border-hairline section-gap px-6">
        <div className="mx-auto max-w-7xl w-full">
          <div className="text-center mb-12">
            <span className="eyebrow">Explorer par thème</span>
            <h2 className="font-display text-4xl">Guides & Sélections</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: "/top-musees", icon: "🏆", title: "Top musées du monde", desc: "Le classement des musées les plus visités et remarquables" },
              { to: "/gratuits", icon: "🎟️", title: "Musées gratuits", desc: "Accédez à la culture sans dépenser un euro" },
              { to: "/pays", icon: "🌍", title: "Musées par pays", desc: "Explorez les musées nation par nation" },
              { to: "/rankings", icon: "📊", title: "Classements", desc: "Les plus anciens, les plus grands, les plus visités" },
            ].map(({ to, icon, title, desc }) => (
              <Link key={to} to={to} className="group p-7 border border-hairline rounded-2xl bg-secondary/15 hover:border-gold/25 hover:bg-secondary/40 card-hover">
                <span className="text-3xl block mb-4">{icon}</span>
                <h3 className="font-display text-xl mb-2 group-hover:text-gradient-gold transition-all">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLORER PAR PAYS ── */}
      <section className="border-t border-hairline section-gap px-6">
        <div className="mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <span className="eyebrow">Destinations</span>
            <h2 className="font-display text-4xl">Explorer par pays</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {allCountries.map(country => {
              const count = museums.filter(m => m.country === country).length;
              return (
                <Link key={country} to="/pays/$country" params={{ country: country.toLowerCase().replace(/ /g, "-") }}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-hairline hover:border-gold/30 hover:bg-secondary/40 transition-all text-sm"
                >
                  <span className="font-medium">{country}</span>
                  <span className="text-xs text-muted-foreground/50 group-hover:text-gold/50 transition-colors">{count}</span>
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
