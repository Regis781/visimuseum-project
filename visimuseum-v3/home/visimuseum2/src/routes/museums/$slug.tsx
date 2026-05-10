import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

export const Route = createFileRoute("/museums/$slug")({
  loader: ({ params }) => {
    const m = museums.find((mm) => museumSlug(mm) === params.slug);
    if (!m) throw notFound();
    return { museum: m };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.museum;
    if (!m) return { meta: [{ title: "Musée — VisiMuseum" }] };
    const title = `${m.name} (${m.city}) — VisiMuseum`;
    const url = `https://www.visimuseum.com/museums/${museumSlug(m)}`;
    return {
      meta: [
        { title },
        { name: "description", content: m.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: m.desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: m.desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: MuseumDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="font-display text-4xl">Musée introuvable</p>
      <Link to="/museums" className="text-gold underline text-sm">← Retour aux musées</Link>
    </div>
  ),
});

function MuseumDetail() {
  const { museum: m } = Route.useLoaderData();
  const related = museums.filter((x) => x.country === m.country && x.name !== m.name).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <article className="mx-auto max-w-3xl px-6 pt-24 pb-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-10" aria-label="Fil d'Ariane">
          <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/museums" className="hover:text-gold transition-colors">Musées</Link>
          <span>/</span>
          <span className="text-foreground/60">{m.name}</span>
        </nav>

        {/* Type */}
        <p className="text-xs uppercase tracking-[0.4em] text-gold/70 mb-4">{m.type}</p>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl leading-[1.0] mb-4">{m.name}</h1>
        <p className="text-xl text-muted-foreground mb-8">{m.city}, {m.country}</p>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className={`text-xs uppercase tracking-wider px-4 py-1.5 rounded-full border ${
            m.admission === "free"
              ? "bg-gold/10 text-gold border-gold/25"
              : "bg-secondary text-muted-foreground border-hairline"
          }`}>
            {m.admission === "free" ? "Entrée gratuite" : "Entrée payante"}
          </span>
          {m.founded && (
            <span className="text-xs px-4 py-1.5 rounded-full bg-secondary text-muted-foreground border border-hairline">
              Fondé en {m.founded}
            </span>
          )}
          {m.visitors && (
            <span className="text-xs px-4 py-1.5 rounded-full bg-secondary text-muted-foreground border border-hairline">
              ~{m.visitors}M visiteurs / an
            </span>
          )}
          {m.tags.map((tag) => (
            <span key={tag} className="text-xs px-4 py-1.5 rounded-full bg-secondary/50 text-muted-foreground/70 border border-hairline">
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent mb-10" />

        {/* Description */}
        <p className="text-xl md:text-2xl font-display text-foreground/85 leading-relaxed mb-10">{m.desc}</p>

        {/* CTA */}
        <a href={m.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-background hover:opacity-90 transition-all shadow-gold"
        >
          Visiter le site officiel
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-hairline">
            <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">À découvrir</p>
            <h2 className="font-display text-3xl mb-8">Autres musées en {m.country}</h2>
            <ul className="space-y-1">
              {related.map((r) => (
                <li key={r.name}>
                  <Link to="/museums/$slug" params={{ slug: museumSlug(r) }}
                    className="flex justify-between items-center py-4 border-b border-hairline group hover:border-gold/20 transition-colors"
                  >
                    <div>
                      <span className="font-display text-lg group-hover:text-gradient-gold transition-all">{r.name}</span>
                      <span className="text-sm text-muted-foreground ml-3">{r.city}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/30 group-hover:text-gold/50 transition-colors">
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
      <Footer />
    </div>
  );
}
