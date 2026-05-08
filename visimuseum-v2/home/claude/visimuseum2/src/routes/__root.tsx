import { Outlet, createRootRoute, ScrollRestoration } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  ),
})
