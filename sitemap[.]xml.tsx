import { createFileRoute } from "@tanstack/react-router";
import { museums } from "@/data/museums";
import { museumSlug } from "@/lib/slug";

const SITE = "https://www.visimuseum.com";

const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/museums", priority: "0.9", changefreq: "weekly" },
  { path: "/rankings", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.5", changefreq: "yearly" },
];

const LANGS = ["en", "fr", "es"] as const;

function urlEntry(path: string, opts: { priority: string; changefreq: string; lastmod: string }) {
  const loc = `${SITE}${path}`;
  const alts = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${loc}${path.includes("?") ? "&" : "?"}lang=${l}"/>`
  ).join("\n");
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${opts.lastmod}</lastmod>
    <changefreq>${opts.changefreq}</changefreq>
    <priority>${opts.priority}</priority>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
  </url>`;
}

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];

        const staticUrls = STATIC_ROUTES.map((r) =>
          urlEntry(r.path, { priority: r.priority, changefreq: r.changefreq, lastmod: today })
        );

        const museumUrls = museums.map((m) =>
          urlEntry(`/museums/${escapeXml(museumSlug(m))}`, {
            priority: "0.6",
            changefreq: "monthly",
            lastmod: today,
          })
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticUrls, ...museumUrls].join("\n")}
</urlset>
`;

        return new Response(xml, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
