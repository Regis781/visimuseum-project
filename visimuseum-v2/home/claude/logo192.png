import { Outlet, createRootRoute, ScrollRestoration } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'VisiMuseum — Explorez les plus grands musées du monde' },
      { name: 'description', content: 'Découvrez et explorez les plus grands musées du monde. Collections, horaires, billets et informations pratiques.' },
      { name: 'theme-color', content: '#0e0d0b' },
      { property: 'og:site_name', content: 'VisiMuseum' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'canonical', href: 'https://www.visimuseum.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap' },
    ],
  }),
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  ),
})
