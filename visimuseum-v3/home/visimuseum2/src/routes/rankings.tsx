import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [
      { title: "Classements des musées | VisiMuseum" },
      { name: "description", content: "Les musées les plus visités, les musées gratuits, les plus anciens et les plus récents. Classements et comparatifs des grands musées du monde." },
    ],
  }),
  component: RankingsPage,
});

function RankingsPage() {
  const byVisitors = [...museums].filter(m => m.visitors).sort((a, b) => (b.visitors ?? 0) - (a.visitors ?? 0)).slice(0, 10);
  const free = museums.filter(m => m.admission === "free");
  const oldest = [...museums].filter(m => m.founded).sort((a, b) => (a.founded ?? 0) - (b.founded ?? 0)).slice(0, 8);
  const newest = [...museums].filter(m => m.founded).sort((a, b) => (b.founded ?? 0) - (a.founded ?? 0)).slice(0, 6);

  // Group by country for free museums summary
  const topFreeCountries = [...new Set(free.map(m => m.country))]
    .map(c => ({ country: c, count: free.filter(m => m.country === c).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pt-28 pb-24 w-full">
        <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Données & Chiffres</p>
        <h1 className="font-display text-5xl md:text-6xl mb-4">Classements</h1>
        <p className="text-muted-foreground mb-16">Les musées du monde selon différents critères</p>

        {/* Most visited */}
        <section className="mb-20">
          <h2 className="font-display text-3xl mb-2">Les plus visités</h2>
          <p className="text-sm text-muted-foreground mb-8">Classement par nombre de visiteurs annuels</p>
          <div className="space-y-0 border border-hairline rounded-lg overflow-hidden">
            {byVisitors.map((m, i) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="flex items-center gap-6 p-5 border-b border-hairline last:border-0 bg-background hover:bg-secondary/50 transition-colors group"
              >
                <span className={`font-display text-3xl w-10 shrink-0 text-right ${i < 3 ? "text-gold/60" : "text-muted-foreground/20"}`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xl group-hover:text-gradient-gold transition-all truncate">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-gold">{m.visitors}M</p>
                  <p className="text-xs text-muted-foreground/50">visiteurs/an</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Oldest */}
        <section className="mb-20">
          <h2 className="font-display text-3xl mb-2">Les plus anciens</h2>
          <p className="text-sm text-muted-foreground mb-8">Classement par date de fondation</p>
          <div className="space-y-0 border border-hairline rounded-lg overflow-hidden">
            {oldest.map((m, i) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="flex items-center gap-6 p-5 border-b border-hairline last:border-0 bg-background hover:bg-secondary/50 transition-colors group"
              >
                <span className={`font-display text-3xl w-10 shrink-0 text-right ${i < 3 ? "text-gold/60" : "text-muted-foreground/20"}`}>{i + 1}</span>
                <div className="flex-1">
                  <p className="font-display text-xl group-hover:text-gradient-gold transition-all">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-2xl text-muted-foreground/50">{m.founded}</p>
                  <p className="text-xs text-muted-foreground/30">{new Date().getFullYear() - (m.founded ?? 0)} ans</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newest */}
        <section className="mb-20">
          <h2 className="font-display text-3xl mb-2">Les plus récents</h2>
          <p className="text-sm text-muted-foreground mb-8">Musées ouverts ou rénovés récemment</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
            {newest.map((m) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="group bg-background p-6 hover:bg-secondary/50 transition-colors flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg group-hover:text-gradient-gold transition-all truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.city}, {m.country}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-xl text-gold/70">{m.founded}</p>
                  <p className="text-xs text-muted-foreground/40">{m.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Free museums */}
        <section>
          <h2 className="font-display text-3xl mb-2">Musées gratuits</h2>
          <p className="text-sm text-muted-foreground mb-8">{free.length} musées accessibles gratuitement, dans {[...new Set(free.map(m => m.country))].length} pays</p>

          {/* Top countries for free museums */}
          <div className="flex flex-wrap gap-3 mb-8">
            {topFreeCountries.map(({ country, count }) => (
              <Link key={country} to="/pays/$country" params={{ country: country.toLowerCase().replace(/ /g, "-") }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-hairline hover:border-gold/30 hover:bg-secondary/50 transition-all"
              >
                <span className="text-sm">{country}</span>
                <span className="text-xs text-gold/60">{count}</span>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
            {free.map((m) => (
              <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                className="flex items-center gap-4 p-5 bg-background hover:bg-secondary/50 transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-gold/60 shrink-0" />
                <div>
                  <p className="font-display text-lg group-hover:text-gradient-gold transition-all">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.city}, {m.country}</p>
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
