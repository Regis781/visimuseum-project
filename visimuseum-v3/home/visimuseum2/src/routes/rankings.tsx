import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [
      { title: "Classements des musées | VisiMuseum" },
      { name: "description", content: "Les musées les plus visités, les plus anciens, les plus récents. Classements des grands musées du monde." },
    ],
  }),
  component: RankingsPage,
});

function RankingsPage() {
  const byVisitors = [...museums].filter(m => m.visitors).sort((a, b) => (b.visitors ?? 0) - (a.visitors ?? 0)).slice(0, 10);
  const free = museums.filter(m => m.admission === "free");
  const oldest = [...museums].filter(m => m.founded).sort((a, b) => (a.founded ?? 0) - (b.founded ?? 0)).slice(0, 8);
  const newest = [...museums].filter(m => m.founded).sort((a, b) => (b.founded ?? 0) - (a.founded ?? 0)).slice(0, 6);
  const topFreeCountries = [...new Set(free.map(m => m.country))]
    .map(c => ({ country: c, count: free.filter(m => m.country === c).length }))
    .sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-6 page-main w-full">
        <span className="eyebrow">Données & Chiffres</span>
        <h1 className="font-display text-5xl md:text-6xl mb-4 title-underline">Classements</h1>
        <p className="text-muted-foreground mb-20 mt-6">Les musées du monde selon différents critères</p>

        {/* ── Plus visités ── */}
        <section className="mb-20">
          <h2 className="font-display text-3xl mb-2">Les plus visités</h2>
          <p className="text-sm text-muted-foreground mb-8">Classement par nombre de visiteurs annuels</p>
          <div className="border border-hairline rounded-2xl overflow-hidden">
            {byVisitors.map((m, i) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="flex items-center gap-6 px-7 py-5 border-b border-hairline last:border-0 bg-background hover:bg-secondary/40 transition-colors group">
                <span className={`font-display text-3xl w-10 shrink-0 text-right ${i < 3 ? "text-gold/50" : "text-muted-foreground/15"}`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xl group-hover:text-gradient-gold transition-all truncate">{m.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{m.city}, {m.country}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-gold">{m.visitors}M</p>
                  <p className="text-xs text-muted-foreground/40 mt-0.5">visiteurs/an</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Plus anciens ── */}
        <section className="mb-20">
          <h2 className="font-display text-3xl mb-2">Les plus anciens</h2>
          <p className="text-sm text-muted-foreground mb-8">Classement par date de fondation</p>
          <div className="border border-hairline rounded-2xl overflow-hidden">
            {oldest.map((m, i) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="flex items-center gap-6 px-7 py-5 border-b border-hairline last:border-0 bg-background hover:bg-secondary/40 transition-colors group">
                <span className={`font-display text-3xl w-10 shrink-0 text-right ${i < 3 ? "text-gold/50" : "text-muted-foreground/15"}`}>{i + 1}</span>
                <div className="flex-1">
                  <p className="font-display text-xl group-hover:text-gradient-gold transition-all">{m.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{m.city}, {m.country}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-2xl text-muted-foreground/40">{m.founded}</p>
                  <p className="text-xs text-muted-foreground/30 mt-0.5">{new Date().getFullYear() - (m.founded ?? 0)} ans</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Plus récents ── */}
        <section className="mb-20">
          <h2 className="font-display text-3xl mb-2">Les plus récents</h2>
          <p className="text-sm text-muted-foreground mb-8">Musées ouverts ou rénovés récemment</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newest.map(m => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="group bg-secondary/20 border border-hairline rounded-xl p-6 card-hover hover:border-gold/20 flex items-center gap-5">
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg group-hover:text-gradient-gold transition-all truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.city}, {m.country}</p>
                  <p className="text-xs text-muted-foreground/40 mt-1">{m.type}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-2xl text-gold/60">{m.founded}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Musées gratuits ── */}
        <section>
          <h2 className="font-display text-3xl mb-2">Musées gratuits</h2>
          <p className="text-sm text-muted-foreground mb-7">{free.length} musées accessibles gratuitement dans {[...new Set(free.map(m => m.country))].length} pays</p>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {topFreeCountries.map(({ country, count }) => (
              <Link key={country} to="/pays/$country" params={{ country: country.toLowerCase().replace(/ /g, "-") }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-hairline hover:border-gold/25 hover:bg-secondary/40 transition-all text-sm">
                <span>{country}</span>
                <span className="text-xs text-gold/50">{count}</span>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden">
            {free.map(m => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="flex items-center gap-4 px-6 py-4 bg-background hover:bg-secondary/40 transition-colors group">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
                <div>
                  <p className="font-display text-base group-hover:text-gradient-gold transition-all">{m.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.city}, {m.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
