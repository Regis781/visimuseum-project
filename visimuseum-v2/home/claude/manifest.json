import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "À propos | VisiMuseum" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <h1 className="font-display text-6xl mb-10">À propos</h1>
        <p className="text-xl font-display text-foreground/80 leading-relaxed mb-6">
          VisiMuseum est un guide de référence des grands musées du monde, conçu pour aider les curieux, les voyageurs et les passionnés d'art à découvrir les collections les plus remarquables.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Notre mission est de rendre la culture accessible à tous, en regroupant informations pratiques, descriptions et liens officiels pour chaque institution.
        </p>
      </main>
      <Footer />
    </div>
  );
}
