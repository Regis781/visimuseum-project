import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/gratuits")({
  head: () => ({
    meta: [
      { title: "Musées gratuits dans le monde — Entrée libre | VisiMuseum" },
      { name: "description", content: `${museums.filter(m=>m.admission==="free").length} musées gratuits à travers le monde.` },
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
      <main className="mx-auto max-w-5xl px-6 page-main w-full">
        <span className="eyebrow">Accès libre</span>
        <h1 className="font-display text-5xl md:text-6xl mb-5 title-underline">Musées gratuits</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mt-7 mb-3">
          <strong className="text-foreground">{free.length} musées</strong> vous ouvrent leurs portes gratuitement.
        </p>
        <p className="text-sm text-muted-foreground mb-16">Dans {byCountry.length} pays différents.</p>

        {byCountry.map(country => {
          const countryMuseums = free.filter(m => m.country === country);
          return (
            <section key={country} className="mb-14">
              <h2 className="font-display text-2xl mb-1.5 flex items-center gap-3">
                {country}
                <span className="text-sm font-sans text-muted-foreground/50 font-normal">{countryMuseums.length} musée{countryMuseums.length > 1 ? "s" : ""}</span>
              </h2>
              <div className="divider-gold mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {countryMuseums.map(m => (
                  <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
                    className="group bg-secondary/20 border border-hairline rounded-xl p-6 card-hover hover:border-gold/20 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="chip">{m.type}</span>
                      <span className="chip chip-gold">Gratuit</span>
                    </div>
                    <h3 className="font-display text-xl group-hover:text-gradient-gold transition-all mt-1">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.city}</p>
                    <p className="text-xs text-muted-foreground/50 line-clamp-2 leading-relaxed">{m.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* SEO */}
        <div className="mt-10 border-t border-hairline pt-14">
          <h2 className="font-display text-3xl mb-8">La culture, un droit universel</h2>
          <div className="prose-vm space-y-5">
            <p>Plusieurs des plus grands musées du monde ont fait le choix radical de la <strong>gratuité permanente</strong>. Le <strong>British Museum</strong> de Londres, fondé en 1753, accueille plus de 5 millions de visiteurs par an sans percevoir de droit d'entrée. La <strong>National Gallery</strong> londonienne, avec ses 2 300 chefs-d'œuvre, est également entièrement gratuite.</p>
            <p>Aux États-Unis, les musées du <strong>Smithsonian Institution</strong> à Washington D.C. accueillent des millions de visiteurs gratuitement chaque année, financés par le gouvernement fédéral.</p>
            <p>En France, de nombreux musées nationaux sont gratuits pour les moins de 26 ans et le premier dimanche du mois.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
