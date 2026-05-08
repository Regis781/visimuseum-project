import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/museums/")({
  head: () => ({
    meta: [
      { title: "Tous les musées | VisiMuseum" },
      { name: "description", content: "Parcourez notre sélection des plus grands musées du monde." },
    ],
  }),
  component: MuseumsPage,
});

function MuseumsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24 w-full">
        <h1 className="font-display text-6xl mb-4">Musées du monde</h1>
        <p className="text-muted-foreground mb-16">{museums.length} musées répertoriés</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
          {museums.map((m) => (
            <Link
              key={m.name}
              to="/museums/$slug"
              params={{ slug: museumSlug(m) }}
              className="group bg-background p-8 hover:bg-secondary transition-colors flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-gold/60">{m.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  m.admission === "free"
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "bg-secondary text-muted-foreground border border-hairline"
                }`}>
                  {m.admission === "free" ? "Gratuit" : "Payant"}
                </span>
              </div>
              <h2 className="font-display text-2xl group-hover:text-gradient-gold transition-all">{m.name}</h2>
              <p className="text-sm text-muted-foreground">{m.city}, {m.country}</p>
              <p className="mt-1 text-sm text-muted-foreground/70 line-clamp-2 leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
