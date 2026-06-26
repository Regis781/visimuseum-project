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
const TYPES = ["Tous", ...new Set(museums.map(m => m.type))];
type SortKey = "name" | "visitors" | "founded";

function MuseumsPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("Tous");
  const [admission, setAdmission] = useState("Tous");
  const [type, setType] = useState("Tous");
  const [sort, setSort] = useState<SortKey>("visitors");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = museums.filter(m => {
      const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.city.toLowerCase().includes(search.toLowerCase()) || m.country.toLowerCase().includes(search.toLowerCase());
      const matchCountry = country === "Tous" || m.country === country;
      const matchAdmission = admission === "Tous" || m.admission === admission;
      const matchType = type === "Tous" || m.type === type;
      return matchSearch && matchCountry && matchAdmission && matchType;
    });

    if (sort === "visitors") result = [...result].sort((a, b) => (b.visitors ?? 0) - (a.visitors ?? 0));
    else if (sort === "founded") result = [...result].sort((a, b) => (a.founded ?? 9999) - (b.founded ?? 9999));
    else if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "fr"));

    return result;
  }, [search, country, admission, type, sort]);

  const hasFilter = search || country !== "Tous" || admission !== "Tous" || type !== "Tous";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-6 pt-28 pb-24 w-full">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Catalogue</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">Musées du monde</h1>
          <p className="text-muted-foreground">{museums.length} musées dans {[...new Set(museums.map(m => m.country))].length} pays</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="search"
                placeholder="Rechercher un musée, une ville, un pays..."
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

          {/* Second row: type filter + sort + view toggle */}
          <div className="flex flex-wrap gap-3 items-center">
            <select value={type} onChange={e => setType(e.target.value)}
              className="bg-secondary border border-hairline rounded-full px-5 py-3 text-sm focus:outline-none focus:border-gold/40 text-foreground min-w-[180px]">
              {TYPES.map(t => <option key={t} value={t}>{t === "Tous" ? "Tous les types" : t}</option>)}
            </select>

            <div className="flex items-center gap-1 bg-secondary border border-hairline rounded-full px-2 py-1.5">
              <span className="text-xs text-muted-foreground px-2 uppercase tracking-widest">Trier :</span>
              {([["visitors", "Visiteurs"], ["name", "Nom"], ["founded", "Ancienneté"]] as [SortKey, string][]).map(([key, label]) => (
                <button key={key} onClick={() => setSort(key)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${sort === key ? "bg-gold text-background font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-1 bg-secondary border border-hairline rounded-full p-1.5">
              <button onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${viewMode === "grid" ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Vue grille">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              </button>
              <button onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Vue liste">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest flex items-center gap-2">
          <span>{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
          {hasFilter && (
            <>
              <span className="text-muted-foreground/30">—</span>
              <button onClick={() => { setSearch(""); setCountry("Tous"); setAdmission("Tous"); setType("Tous"); }} className="text-gold hover:underline">
                Réinitialiser
              </button>
            </>
          )}
        </p>

        {/* Grid / List */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="font-display text-3xl mb-4">Aucun résultat</p>
            <p className="text-sm">Essayez d'autres critères de recherche</p>
          </div>
        ) : viewMode === "grid" ? (
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
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-hairline">
                  {m.founded && <span className="text-xs text-muted-foreground/30">Fondé en {m.founded}</span>}
                  {m.visitors && <span className="text-xs text-muted-foreground/30 ml-auto">{m.visitors}M visiteurs/an</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-hairline rounded-lg overflow-hidden">
            {filtered.map((m, i) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className={`group flex items-center gap-5 px-6 py-4 hover:bg-secondary/50 transition-colors ${i > 0 ? "border-t border-hairline" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-0.5">
                    <h2 className="font-display text-lg group-hover:text-gradient-gold transition-all truncate">{m.name}</h2>
                    {m.admission === "free" && <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">Gratuit</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{m.city}, {m.country} · {m.type}</p>
                </div>
                <div className="shrink-0 text-right hidden md:block">
                  {m.visitors && <p className="text-sm text-gold">{m.visitors}M <span className="text-xs text-muted-foreground/50">vis/an</span></p>}
                  {m.founded && <p className="text-xs text-muted-foreground/40">est. {m.founded}</p>}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/20 group-hover:text-gold/40 transition-colors shrink-0">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
