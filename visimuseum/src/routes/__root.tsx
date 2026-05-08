import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import "@/styles/globals.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VisiMuseum — Explorez les musées du monde" },
      { name: "description", content: "Découvrez et explorez les plus grands musées du monde avec VisiMuseum." },
    ],
    links: [{ rel: "icon", href: "/favicon.ico" }],
  }),
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  ),
});
