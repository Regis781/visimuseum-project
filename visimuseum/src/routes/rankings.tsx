import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [{ title: "Classements | VisiMuseum" }],
  }),
  component: RankingsPage,
});

function RankingsPage() {
  const free = museums.filter((m) => m.admission === "free");
  const paid = museums.filter((m) => m.admission === "paid");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24 w-full">
        <h1 className="font-display text-6xl mb-16">Classements</h1>

        <section className="mb-16">
          <h2 className="font-display text-3xl mb-8 text-gold/80">Musées gratuits ({free.length})</h2>
          <ul className="space-y-3">
            {free.map((m, i) => (
              <li key={m.name}>
                <Link to="/museums/$slug" params={{ slug: museumSlug(m) }} className="flex items-baseline gap-6 group">
                  <span className="text-3xl font-display text-muted-foreground/30 w-10 shrink-0">{i + 1}</span>
                  <span className="text-xl font-display group-hover:text-gradient-gold transition-all">{m.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{m.city}, {m.country}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl mb-8 text-muted-foreground">Musées payants ({paid.length})</h2>
          <ul className="space-y-3">
            {paid.map((m, i) => (
              <li key={m.name}>
                <Link to="/museums/$slug" params={{ slug: museumSlug(m) }} className="flex items-baseline gap-6 group">
                  <span className="text-3xl font-display text-muted-foreground/30 w-10 shrink-0">{i + 1}</span>
                  <span className="text-xl font-display group-hover:text-gradient-gold transition-all">{m.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{m.city}, {m.country}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
