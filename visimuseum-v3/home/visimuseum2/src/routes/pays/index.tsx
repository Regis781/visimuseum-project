import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";

export const Route = createFileRoute("/pays/")({
  head: () => ({
    meta: [
      { title: "Musées par pays — Guide mondial | VisiMuseum" },
      { name: "description", content: `Explorez les musées par pays dans ${[...new Set(museums.map(m=>m.country))].length} destinations.` },
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
      <main className="mx-auto max-w-6xl px-6 page-main w-full">
        <span className="eyebrow">Destination</span>
        <h1 className="font-display text-5xl md:text-6xl mb-5 title-underline">Musées par pays</h1>
        <p className="text-xl text-muted-foreground mt-7 mb-16 max-w-2xl">
          {[...new Set(museums.map(m => m.country))].length} pays référencés, des collections uniques à chaque escale.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {byCountry.map(({ name, count, free, slug, top }) => (
            <Link key={name} to="/pays/$country" params={{ country: slug }}
              className="group p-7 border border-hairline rounded-2xl bg-secondary/20 card-hover hover:border-gold/25"
            >
              <h2 className="font-display text-2xl mb-1.5 group-hover:text-gradient-gold transition-all">{name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {count} musée{count > 1 ? "s" : ""}
                {free > 0 && <span className="text-gold ml-2">· {free} gratuit{free > 1 ? "s" : ""}</span>}
              </p>
              {top && <p className="text-xs text-muted-foreground/40 line-clamp-1">✦ {top.name}</p>}
            </Link>
          ))}
        </div>

        <div className="mt-20 border-t border-hairline pt-14">
          <h2 className="font-display text-3xl mb-8">Les grandes destinations muséales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 prose-vm">
            <div>
              <h3>Europe</h3>
              <p>L'Europe concentre les plus grandes collections artistiques mondiales. La <strong>France</strong> avec son Louvre, l'<strong>Italie</strong> et ses galeries de la Renaissance, le <strong>Royaume-Uni</strong> avec le British Museum gratuit...</p>
            </div>
            <div>
              <h3>Asie</h3>
              <p>La <strong>Chine</strong> abrite les musées les plus visités du monde : la Cité Interdite accueille 19 millions de visiteurs par an. Le <strong>Japon</strong> offre avec teamLab une vision unique de la culture numérique.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
