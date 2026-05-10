import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/gratuits")({
  head: () => ({
    meta: [
      { title: "Musées gratuits dans le monde — Entrée libre | VisiMuseum" },
      { name: "description", content: `${museums.filter(m=>m.admission==="free").length} musées gratuits à travers le monde : British Museum, National Gallery, Smithsonian, National Gallery of Victoria... Accédez à la culture sans payer.` },
      { name: "keywords", content: "musées gratuits, entrée gratuite musée, musée sans payer, musée accès libre, visite gratuite musée, free museum" },
      { property: "og:title", content: "Musées gratuits dans le monde | VisiMuseum" },
      { property: "og:url", content: "https://www.visimuseum.com/gratuits" },
    ],
    links: [{ rel: "canonical", href: "https://www.visimuseum.com/gratuits" }],
  }),
  component: GratuitsPage,
});

function GratuitsPage() {
  const free = museums.filter(m => m.admission === "free");
  const byCountry = [...new Set(free.map(m => m.country))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pt-28 pb-24 w-full">
        <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Accès libre</p>
        <h1 className="font-display text-5xl md:text-6xl mb-4">Musées gratuits</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">
          <strong className="text-foreground">{free.length} musées</strong> vous ouvrent leurs portes gratuitement. Certains des plus grands musées du monde pratiquent l'entrée libre permanente — une invitation à découvrir la culture sans contrainte.
        </p>
        <p className="text-sm text-muted-foreground mb-12">Dans {byCountry.length} pays différents.</p>

        {/* By country */}
        {byCountry.map(country => {
          const countryMuseums = free.filter(m => m.country === country);
          return (
            <section key={country} className="mb-12">
              <h2 className="font-display text-2xl mb-4 flex items-center gap-3">
                {country}
                <span className="text-sm font-sans text-muted-foreground font-normal">{countryMuseums.length} musée{countryMuseums.length > 1 ? "s" : ""}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
                {countryMuseums.map(m => (
                  <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                    className="group bg-background p-6 hover:bg-secondary/50 transition-colors flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-gold/60">{m.type}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">Gratuit</span>
                    </div>
                    <h3 className="font-display text-xl group-hover:text-gradient-gold transition-all">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.city}</p>
                    <p className="text-xs text-muted-foreground/60 line-clamp-2 leading-relaxed">{m.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* SEO content */}
        <div className="mt-8 border-t border-hairline pt-12">
          <h2 className="font-display text-3xl mb-6">La culture, un droit universel</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Plusieurs des plus grands musées du monde ont fait le choix radical de la <strong className="text-foreground">gratuité permanente</strong>. Le <strong className="text-foreground">British Museum</strong> de Londres, fondé en 1753, accueille plus de 5 millions de visiteurs par an sans percevoir de droit d'entrée. La <strong className="text-foreground">National Gallery</strong> londonienne, avec ses 2 300 chefs-d'œuvre, est également entièrement gratuite.</p>
            <p>Aux États-Unis, les musées du <strong className="text-foreground">Smithsonian Institution</strong> à Washington D.C. — dont le National Museum of Natural History et le Smithsonian American Art Museum — accueillent des millions de visiteurs gratuitement chaque année, financés par le gouvernement fédéral.</p>
            <p>En France, de nombreux musées nationaux sont gratuits pour les moins de 26 ans et le premier dimanche du mois. Dans les pays nordiques, la gratuité est souvent la règle dans les institutions nationales.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
