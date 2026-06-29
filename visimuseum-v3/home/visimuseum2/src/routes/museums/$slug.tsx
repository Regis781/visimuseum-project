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
        { title }, { name: "description", content: m.desc },
        { property: "og:title", content: title }, { property: "og:description", content: m.desc },
        { property: "og:type", content: "article" }, { property: "og:url", content: url },
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

function AIPanel({ museum }: { museum: typeof museums[0] }) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true); setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Tu es un expert en histoire de l'art et des musées. Rédige une fiche culturelle approfondie sur ${museum.name} à ${museum.city} (${museum.country}), fondé en ${museum.founded ?? "date inconnue"}.

Inclus :
- Un paragraphe d'introduction évocateur sur l'atmosphère et l'importance du musée
- Les 3 œuvres ou collections incontournables à voir absolument
- Un conseil de visite pratique (meilleur moment, durée recommandée, anecdote)
- Une conclusion poétique

Réponds en français, style élégant. Environ 300 mots. Sans titres markdown ni astérisques.` }]
        })
      });
      const data = await response.json();
      setContent(data.content?.find((b: { type: string }) => b.type === "text")?.text ?? "");
    } catch { setError("Impossible de générer le contenu. Réessayez."); }
    finally { setLoading(false); }
  }

  if (content) return (
    <div className="mt-16 border border-gold/20 rounded-2xl p-8 bg-secondary/25">
      <div className="flex items-center gap-3 mb-7">
        <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gold/60">Fiche enrichie par IA</p>
          <p className="text-[10px] text-muted-foreground/35 mt-0.5">Généré par Claude · Contenu indicatif</p>
        </div>
      </div>
      <div className="space-y-5">
        {content.split("\n\n").filter(Boolean).map((para, i) => (
          <p key={i} className={i === 0 ? "font-display text-lg text-foreground/80 leading-relaxed" : "text-sm text-muted-foreground leading-relaxed"}>
            {para.replace(/\*\*(.*?)\*\*/g, "$1")}
          </p>
        ))}
      </div>
      <button onClick={() => setContent(null)} className="mt-7 text-xs text-muted-foreground/35 hover:text-muted-foreground transition-colors">Effacer</button>
    </div>
  );

  return (
    <div className="mt-16 border border-hairline rounded-2xl p-10 bg-secondary/15 text-center">
      <div className="w-12 h-12 rounded-full bg-gold/8 flex items-center justify-center mx-auto mb-5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <p className="font-display text-2xl mb-3">Fiche enrichie par IA</p>
      <p className="text-sm text-muted-foreground mb-7 max-w-xs mx-auto leading-relaxed">
        Description approfondie, œuvres incontournables et conseils de visite pour {museum.name}.
      </p>
      {error && <p className="text-xs text-red-400 mb-5">{error}</p>}
      <button onClick={generate} disabled={loading}
        className="inline-flex items-center gap-2.5 rounded-xl border border-gold/30 px-7 py-3 text-sm text-gold hover:bg-gold/8 transition-all disabled:opacity-50">
        {loading ? (
          <><svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".2"/><path d="M12 3a9 9 0 019 9"/></svg>Génération…</>
        ) : (
          <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>Générer la fiche enrichie</>
        )}
      </button>
    </div>
  );
}

function MuseumDetail() {
  const { museum: m } = Route.useLoaderData();
  const related = museums.filter(x => x.country === m.country && x.name !== m.name).slice(0, 4);
  const sameType = museums.filter(x => x.type === m.type && x.name !== m.name && x.country !== m.country).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <article className="mx-auto max-w-3xl px-6 page-main w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground/50 mb-14" aria-label="Fil d'Ariane">
          <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/museums" className="hover:text-gold transition-colors">Musées</Link>
          <span>/</span>
          <span>{m.name}</span>
        </nav>

        {/* Type */}
        <span className="eyebrow">{m.type}</span>

        {/* Titre */}
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-5">{m.name}</h1>
        <p className="text-xl text-muted-foreground mb-10">{m.city}, {m.country}</p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          <span className={m.admission === "free" ? "chip chip-gold" : "chip"}>
            {m.admission === "free" ? "Entrée gratuite" : "Entrée payante"}
          </span>
          {m.founded && <span className="chip">Fondé en {m.founded}</span>}
          {m.visitors && <span className="chip">~{m.visitors}M visiteurs / an</span>}
          {m.tags.map(tag => <span key={tag} className="chip">{tag}</span>)}
        </div>

        <div className="divider-gold mb-12" />

        {/* Description */}
        <p className="text-xl md:text-2xl font-display text-foreground/80 leading-relaxed mb-12">{m.desc}</p>

        {/* CTA */}
        <a href={m.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-xl bg-gold px-8 py-4 text-sm font-medium text-background hover:opacity-90 transition-all shadow-gold">
          Visiter le site officiel
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>

        {/* AI Panel */}
        <AIPanel museum={m} />

        {/* Même catégorie */}
        {sameType.length > 0 && (
          <div className="mt-20 pt-14 border-t border-hairline">
            <span className="eyebrow">Même catégorie</span>
            <h2 className="font-display text-3xl mb-8">Autres musées · {m.type}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sameType.map(r => (
                <Link key={r.name} to="/museums/$slug" params={{ slug: museumSlug(r) }}
                  className="group bg-secondary/20 border border-hairline rounded-xl p-5 card-hover hover:border-gold/20 flex flex-col gap-1.5">
                  <span className="font-display text-base group-hover:text-gradient-gold transition-all">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.city}, {r.country}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Autres musées du pays */}
        {related.length > 0 && (
          <div className="mt-14 pt-14 border-t border-hairline">
            <span className="eyebrow">À découvrir</span>
            <h2 className="font-display text-3xl mb-8">Autres musées en {m.country}</h2>
            <ul>
              {related.map(r => (
                <li key={r.name}>
                  <Link to="/museums/$slug" params={{ slug: museumSlug(r) }}
                    className="flex justify-between items-center py-5 border-b border-hairline group hover:border-gold/20 transition-colors">
                    <div>
                      <span className="font-display text-lg group-hover:text-gradient-gold transition-all">{r.name}</span>
                      <span className="text-sm text-muted-foreground ml-3">{r.city}</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/25 group-hover:text-gold/45 transition-colors"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
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
