import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";

export const Route = createFileRoute("/pays/")({
  head: () => ({
    meta: [
      { title: "Musées par pays — Guide mondial | VisiMuseum" },
      { name: "description", content: `Explorez les musées par pays : France, Italie, Japon, États-Unis... Guide complet des musées dans ${[...new Set(museums.map(m=>m.country))].length} pays du monde.` },
      { name: "keywords", content: "musées par pays, musées france, musées italie, musées japon, musées états-unis, musées monde" },
      { property: "og:title", content: "Musées par pays | VisiMuseum" },
      { property: "og:url", content: "https://www.visimuseum.com/pays" },
    ],
    links: [{ rel: "canonical", href: "https://www.visimuseum.com/pays" }],
  }),
  component: PaysIndexPage,
});

function PaysIndexPage() {
  const countries = [...new Set(museums.map(m => m.country))].sort();
  const byCountry = countries.map(c => ({
    name: c,
    count: museums.filter(m => m.country === c).length,
    free: museums.filter(m => m.country === c && m.admission === "free").length,
    slug: c.toLowerCase().replace(/ /g, "-"),
    top: museums.filter(m => m.country === c).sort((a, b) => (b.visitors ?? 0) - (a.visitors ?? 0))[0],
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-24 w-full">
        <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Destination</p>
        <h1 className="font-display text-5xl md:text-6xl mb-4">Musées par pays</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          Explorez les musées nation par nation. {[...new Set(museums.map(m => m.country))].length} pays référencés, des collections uniques à chaque escale.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {byCountry.map(({ name, count, free, slug, top }) => (
            <Link key={name} to="/pays/$country" params={{ country: slug }}
              className="group p-6 border border-hairline rounded-lg bg-secondary/20 hover:border-gold/30 hover:bg-secondary/50 transition-all"
            >
              <h2 className="font-display text-2xl mb-1 group-hover:text-gradient-gold transition-all">{name}</h2>
              <p className="text-sm text-muted-foreground mb-3">
                {count} musée{count > 1 ? "s" : ""}
                {free > 0 && <span className="text-gold ml-2">· {free} gratuit{free > 1 ? "s" : ""}</span>}
              </p>
              {top && <p className="text-xs text-muted-foreground/50 line-clamp-1">✦ {top.name}</p>}
            </Link>
          ))}
        </div>

        {/* SEO content */}
        <div className="mt-16 border-t border-hairline pt-12">
          <h2 className="font-display text-3xl mb-6">Les grandes destinations muséales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed text-sm">
            <div>
              <h3 className="font-display text-xl text-foreground mb-3">Europe</h3>
              <p>L'Europe concentre les plus grandes collections artistiques mondiales. La <strong className="text-foreground">France</strong> avec son Louvre, l'<strong className="text-foreground">Italie</strong> et ses galeries de la Renaissance, le <strong className="text-foreground">Royaume-Uni</strong> avec le British Museum gratuit... Le continent européen reste la première destination muséale mondiale.</p>
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground mb-3">Asie</h3>
              <p>La <strong className="text-foreground">Chine</strong> abrite les musées les plus visités du monde : la Cité Interdite accueille 19 millions de visiteurs par an. Le <strong className="text-foreground">Japon</strong> avec son Tokyo National Museum et ses expériences numériques teamLab offre une vision unique de la culture.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
