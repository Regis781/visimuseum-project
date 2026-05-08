import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/museums/$slug")({
  loader: ({ params }) => {
    const m = museums.find((mm) => museumSlug(mm) === params.slug);
    if (!m) throw notFound();
    return { museum: m };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.museum;
    if (!m) return { meta: [{ title: "Museum — VisiMuseum" }] };
    const title = `${m.name} — ${m.city}, ${m.country} | VisiMuseum`;
    return {
      meta: [
        { title },
        { name: "description", content: m.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: m.desc },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: MuseumDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Link to="/museums" className="text-gold underline">Back to museums</Link>
    </div>
  ),
});

function MuseumDetail() {
  const { museum: m } = Route.useLoaderData();
  const { t } = useI18n();
  const related = museums.filter((x) => x.country === m.country && x.name !== m.name).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <Link to="/museums" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold">← All museums</Link>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold/80">{m.type}</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-display leading-[1.05]">{m.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{m.city}, {m.country}</p>

        <div className="mt-6 flex gap-2">
          <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full ${
            m.admission === "free" ? "bg-gold/15 text-gold border border-gold/30" : "bg-muted text-muted-foreground border-hairline"
          }`}>
            {m.admission === "free" ? t("free") : t("paid")}
          </span>
          {m.tags.map((tag: string) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground/80">{tag}</span>
          ))}
        </div>

        <p className="mt-10 text-xl text-foreground/85 leading-relaxed font-display">{m.desc}</p>

        <a href={m.url} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-95 transition">
          {t("visit")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>

        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-hairline">
            <h2 className="text-2xl font-display mb-6">More in {m.country}</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.name}>
                  <Link to="/museums/$slug" params={{ slug: museumSlug(r) }} className="flex justify-between items-baseline group">
                    <span className="text-lg font-display group-hover:text-gradient-gold">{r.name}</span>
                    <span className="text-sm text-muted-foreground">{r.city}</span>
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
