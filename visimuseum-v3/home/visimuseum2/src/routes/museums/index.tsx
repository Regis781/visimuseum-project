import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/museums/")({
  head: () => ({
    meta: [
      { title: `${museums.length} Musées du monde | VisiMuseum` },
      { name: "description", content: `Parcourez notre sélection de ${museums.length} musées incontournables dans ${[...new Set(museums.map(m => m.country))].length} pays. Filtrez par pays, type et tarif.` },
      { property: "og:title", content: `${museums.length} Musées du monde | VisiMuseum` },
      { property: "og:url", content: "https://www.visimuseum.com/museums" },
    ],
  }),
  component: MuseumsPage,
});

const COUNTRIES = ["Tous", ...new Set(museums.map(m => m.country))];
const ADMISSIONS = ["Tous", "free", "paid"];

function MuseumsPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("Tous");
  const [admission, setAdmission] = useState("Tous");

  const filtered = useMemo(() => {
    return museums.filter(m => {
      const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.city.toLowerCase().includes(search.toLowerCase());
      const matchCountry = country === "Tous" || m.country === country;
      const matchAdmission = admission === "Tous" || m.admission === admission;
      return matchSearch && matchCountry && matchAdmission;
    });
  }, [search, country, admission]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-6 pt-28 pb-24 w-full">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Catalogue</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">Musées du monde</h1>
          <p className="text-muted-foreground">{museums.length} musées dans {[...new Set(museums.map(m => m.country))].length} pays</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="search"
              placeholder="Rechercher un musée ou une ville..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-secondary border border-hairline rounded-full pl-11 pr-5 py-3 text-sm focus:outline-none focus:border-gold/40 text-foreground placeholder:text-muted-foreground/50"
            />
          </div>
          <select value={country} onChange={e => setCountry(e.target.value)}
            className="bg-secondary border border-hairline rounded-full px-5 py-3 text-sm focus:outline-none focus:border-gold/40 text-foreground min-w-[160px]">
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={admission} onChange={e => setAdmission(e.target.value)}
            className="bg-secondary border border-hairline rounded-full px-5 py-3 text-sm focus:outline-none focus:border-gold/40 text-foreground min-w-[140px]">
            <option value="Tous">Tous les tarifs</option>
            <option value="free">Gratuit</option>
            <option value="paid">Payant</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
          {search || country !== "Tous" || admission !== "Tous" ? " — " : ""}
          {(search || country !== "Tous" || admission !== "Tous") && (
            <button onClick={() => { setSearch(""); setCountry("Tous"); setAdmission("Tous"); }} className="text-gold hover:underline ml-1">
              Réinitialiser
            </button>
          )}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="font-display text-3xl mb-4">Aucun résultat</p>
            <p className="text-sm">Essayez d'autres critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
            {filtered.map((m) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="group bg-background p-7 flex flex-col gap-2.5 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold/60">{m.type}</span>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${
                    m.admission === "free"
                      ? "bg-gold/10 text-gold border-gold/20"
                      : "bg-transparent text-muted-foreground border-hairline"
                  }`}>
                    {m.admission === "free" ? "Gratuit" : "Payant"}
                  </span>
                </div>
                <h2 className="font-display text-xl group-hover:text-gradient-gold transition-all leading-tight">{m.name}</h2>
                <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
                <p className="text-xs text-muted-foreground/60 line-clamp-2 leading-relaxed">{m.desc}</p>
                {m.founded && (
                  <p className="text-xs text-muted-foreground/30 mt-auto">Fondé en {m.founded}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
