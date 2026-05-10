import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/top-musees")({
  head: () => ({
    meta: [
      { title: "Top 20 des plus beaux musées du monde | VisiMuseum" },
      { name: "description", content: "Découvrez le classement des 20 plus grands et plus beaux musées du monde : Louvre, British Museum, MoMA, Vatican, Hermitage... Guide complet avec collections et informations pratiques." },
      { name: "keywords", content: "top musées monde, meilleurs musées, plus beaux musées, classement musées, musées incontournables, louvre british museum moma" },
      { property: "og:title", content: "Top 20 des plus beaux musées du monde | VisiMuseum" },
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
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-24 w-full">
        <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Guide</p>
        <h1 className="font-display text-5xl md:text-6xl mb-4">Top 20 des plus beaux musées du monde</h1>
        <p className="text-muted-foreground mb-4 text-lg leading-relaxed max-w-2xl">
          Des collections pharaoniques aux installations numériques, voici les musées qui ont marqué l'histoire de l'humanité et continuent de fasciner des millions de visiteurs chaque année.
        </p>
        <p className="text-sm text-muted-foreground mb-12">Classement basé sur le nombre de visiteurs annuels et la renommée internationale.</p>

        {/* Podium top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {top.slice(0, 3).map((m, i) => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              className={`group relative p-6 border rounded-lg transition-all hover:border-gold/40 ${
                i === 0 ? "border-gold/40 bg-gold/5 md:order-2" : "border-hairline bg-secondary/20"
              }`}
            >
              <div className={`font-display mb-2 ${i === 0 ? "text-5xl text-gold" : "text-4xl text-muted-foreground/40"}`}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </div>
              <p className="text-xs uppercase tracking-widest text-gold/60 mb-1">{m.type}</p>
              <h3 className="font-display text-2xl group-hover:text-gradient-gold mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{m.city}, {m.country}</p>
              <p className="text-xs text-gold font-medium">{m.visitors}M visiteurs/an</p>
            </Link>
          ))}
        </div>

        {/* Full ranking */}
        <div className="space-y-0 border border-hairline rounded-lg overflow-hidden">
          {top.map((m, i) => (
            <Link key={m.name} to="/museums/$slug" params={{ slug: museumSlug(m) }}
              className="flex items-start gap-5 p-5 border-b border-hairline last:border-0 bg-background hover:bg-secondary/40 transition-colors group"
            >
              <span className="font-display text-3xl text-muted-foreground/20 w-10 shrink-0 text-right mt-1">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="font-display text-xl group-hover:text-gradient-gold transition-all">{m.name}</h2>
                  {m.admission === "free" && <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 shrink-0">Gratuit</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{m.city}, {m.country} · {m.type}</p>
                <p className="text-xs text-muted-foreground/60 line-clamp-2 leading-relaxed">{m.desc}</p>
              </div>
              <div className="text-right shrink-0">
                {m.visitors && <p className="text-sm font-medium text-gold">{m.visitors}M</p>}
                {m.founded && <p className="text-xs text-muted-foreground/40">Fondé {m.founded}</p>}
              </div>
            </Link>
          ))}
        </div>

        {/* SEO content */}
        <div className="mt-16 prose-custom">
          <h2 className="font-display text-3xl mb-6">Pourquoi visiter ces musées ?</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Les musées sont bien plus que de simples lieux d'exposition : ils sont les gardiens de la mémoire collective de l'humanité. Du <strong className="text-foreground">Louvre</strong> à Paris, qui accueille près de 10 millions de visiteurs par an, au <strong className="text-foreground">British Museum</strong> de Londres avec sa collection de 8 millions d'objets, ces institutions préservent des trésors irremplaçables.</p>
            <p>Certains musées comme le <strong className="text-foreground">Smithsonian National Museum of Natural History</strong> à Washington ou le <strong className="text-foreground">National Gallery</strong> de Londres sont entièrement <strong className="text-foreground">gratuits</strong>, rendant la culture accessible à tous.</p>
            <p>D'autres, comme les <strong className="text-foreground">Musées du Vatican</strong> ou la <strong className="text-foreground">Galerie des Offices</strong> à Florence, proposent des chefs-d'œuvre absolus de la Renaissance qui justifient le déplacement depuis n'importe quel coin du globe.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link to="/gratuits" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-all">
            🎟️ Voir les musées gratuits
          </Link>
          <Link to="/pays" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-hairline text-muted-foreground text-sm hover:border-gold/30 hover:text-foreground transition-all">
            🌍 Musées par pays
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
