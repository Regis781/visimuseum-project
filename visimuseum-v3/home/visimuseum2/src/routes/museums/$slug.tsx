import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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

function AIPanel({ museum }: { museum: ReturnType<typeof museums[0]["name"]> extends string ? typeof museums[0] : never }) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Tu es un expert en histoire de l'art et des musées. Rédige une fiche culturelle approfondie sur ${museum.name} à ${museum.city} (${museum.country}), fondé en ${museum.founded ?? "date inconnue"}.

Inclus :
- Un paragraphe d'introduction évocateur sur l'atmosphère et l'importance du musée
- Les 3 œuvres ou collections incontournables à voir absolument
- Un conseil de visite pratique (meilleur moment, durée recommandée, anecdote)
- Une conclusion poétique sur ce que ce musée apporte à l'humanité

Réponds en français, avec un style élégant et inspirant. Environ 300 mots.`
          }]
        })
      });
      const data = await response.json();
      const text = data.content?.find((b: { type: string }) => b.type === "text")?.text ?? "";
      setContent(text);
    } catch {
      setError("Impossible de générer le contenu. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (content) {
    return (
      <div className="mt-12 border border-gold/20 rounded-xl p-8 bg-secondary/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gold/60">Fiche enrichie par IA</p>
            <p className="text-[10px] text-muted-foreground/40">Généré par Claude · Contenu indicatif</p>
          </div>
        </div>
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
          {content.split("\n\n").filter(Boolean).map((para, i) => (
            <p key={i} className={i === 0 ? "text-foreground/80 font-display text-lg leading-relaxed" : "text-sm text-muted-foreground leading-relaxed"}>
              {para.replace(/^\*\*.*?\*\*\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
            </p>
          ))}
        </div>
        <button onClick={() => setContent(null)} className="mt-6 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
          Effacer
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 border border-hairline rounded-xl p-8 bg-secondary/20 text-center">
      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <p className="font-display text-xl mb-2">Fiche enrichie par IA</p>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
        Obtenez une description approfondie, les œuvres incontournables et des conseils de visite pour {museum.name}.
      </p>
      {error && <p className="text-xs text-red-400 mb-4">{error}</p>}
      <button
        onClick={generate}
        disabled={loading}
        className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 px-6 py-3 text-sm text-gold hover:bg-gold/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".2"/><path d="M12 3a9 9 0 019 9"/></svg>
            Génération en cours…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Générer la fiche enrichie
          </>
        )}
      </button>
    </div>
  );
}

function MuseumDetail() {
  const { museum: m } = Route.useLoaderData();
  const related = museums.filter((x) => x.country === m.country && x.name !== m.name).slice(0, 4);
  const sameType = museums.filter((x) => x.type === m.type && x.name !== m.name && x.country !== m.country).slice(0, 3);

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

        {/* AI Panel */}
        <AIPanel museum={m} />

        {/* Same type */}
        {sameType.length > 0 && (
          <div className="mt-16 pt-10 border-t border-hairline">
            <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">Même catégorie</p>
            <h2 className="font-display text-2xl mb-6">Autres musées · {m.type}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
              {sameType.map((r) => (
                <Link key={r.name} to="/museums/$slug" params={{ slug: museumSlug(r) }}
                  className="group bg-background p-5 hover:bg-secondary/50 transition-colors flex flex-col gap-1"
                >
                  <span className="font-display text-base group-hover:text-gradient-gold transition-all leading-tight">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.city}, {r.country}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related by country */}
        {related.length > 0 && (
          <div className="mt-12 pt-10 border-t border-hairline">
            <p className="text-xs uppercase tracking-widest text-gold/60 mb-2">À découvrir</p>
            <h2 className="font-display text-2xl mb-6">Autres musées en {m.country}</h2>
            <ul className="space-y-0">
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
