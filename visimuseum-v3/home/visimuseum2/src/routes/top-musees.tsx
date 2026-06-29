import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/top-musees")({
  head: () => ({
    meta: [
      { title: "Top 20 des plus beaux musées du monde | VisiMuseum" },
      { name: "description", content: "Découvrez le classement des 20 plus grands musées du monde : Louvre, British Museum, MoMA, Vatican, Hermitage..." },
      { property: "og:url", content: "https://www.visimuseum.com/top-musees" },
    ],
    links: [{ rel: "canonical", href: "https://www.visimuseum.com/top-musees" }],
  }),
  component: TopMuseesPage,
});

function TopMuseesPage() {
  const top = [...museums].sort((a, b) => (b.visitors ?? 0) - (a.visitors ?? 0)).slice(0, 20);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 page-main w-full">
        <span className="eyebrow">Guide</span>
        <h1 className="font-display text-5xl md:text-6xl mb-5 title-underline">Top 20 des plus beaux musées du monde</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mt-7 mb-3">
          Des collections pharaoniques aux installations numériques, voici les musées qui ont marqué l'histoire de l'humanité.
        </p>
        <p className="text-sm text-muted-foreground/50 mb-16">Classement basé sur le nombre de visiteurs annuels et la renommée internationale.</p>

        {/* Podium top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {top.slice(0, 3).map((m, i) => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              className={`group relative p-7 border rounded-2xl card-hover transition-all ${
                i === 0 ? "border-gold/35 bg-gold/5 md:order-2" : "border-hairline bg-secondary/20"
              }`}
            >
              <div className="text-4xl mb-4">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
              <span className="eyebrow">{m.type}</span>
              <h3 className="font-display text-2xl group-hover:text-gradient-gold mb-2 mt-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{m.city}, {m.country}</p>
              {m.visitors && <p className="text-xs text-gold font-medium">{m.visitors}M visiteurs/an</p>}
            </Link>
          ))}
        </div>

        {/* Liste complète */}
        <div className="border border-hairline rounded-2xl overflow-hidden mb-16">
          {top.map((m, i) => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              className="flex items-start gap-6 px-7 py-5 border-b border-hairline last:border-0 bg-background hover:bg-secondary/40 transition-colors group"
            >
              <span className="font-display text-3xl text-muted-foreground/15 w-10 shrink-0 text-right mt-1">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1">
                  <h2 className="font-display text-xl group-hover:text-gradient-gold transition-all">{m.name}</h2>
                  {m.admission === "free" && <span className="chip chip-gold shrink-0">Gratuit</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{m.city}, {m.country} · {m.type}</p>
                <p className="text-xs text-muted-foreground/50 line-clamp-2 leading-relaxed">{m.desc}</p>
              </div>
              <div className="text-right shrink-0 min-w-[70px]">
                {m.visitors && <p className="text-sm font-medium text-gold">{m.visitors}M</p>}
                {m.founded && <p className="text-xs text-muted-foreground/35 mt-0.5">Est. {m.founded}</p>}
              </div>
            </Link>
          ))}
        </div>

        {/* SEO */}
        <div className="border-t border-hairline pt-14">
          <h2 className="font-display text-3xl mb-8">Pourquoi visiter ces musées ?</h2>
          <div className="prose-vm space-y-5">
            <p>Les musées sont bien plus que de simples lieux d'exposition : ils sont les gardiens de la mémoire collective de l'humanité. Du <strong>Louvre</strong> à Paris, qui accueille près de 10 millions de visiteurs par an, au <strong>British Museum</strong> de Londres avec sa collection de 8 millions d'objets, ces institutions préservent des trésors irremplaçables.</p>
            <p>Certains musées comme le <strong>Smithsonian</strong> à Washington ou la <strong>National Gallery</strong> de Londres sont entièrement <strong>gratuits</strong>, rendant la culture accessible à tous.</p>
            <p>D'autres, comme les <strong>Musées du Vatican</strong> ou la <strong>Galerie des Offices</strong> à Florence, proposent des chefs-d'œuvre absolus de la Renaissance qui justifient le déplacement depuis n'importe quel coin du globe.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/gratuits" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/25 text-gold text-sm hover:bg-gold/8 transition-all">
            🎟️ Musées gratuits
          </Link>
          <Link to="/pays" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-hairline text-muted-foreground text-sm hover:border-gold/25 hover:text-foreground transition-all">
            🌍 Musées par pays
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
