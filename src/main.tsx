import { StrictMode } from 'react'
  import ReactDOM from 'react-dom/client'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import QueryProvider from "./queries/provider/QueryProvider";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import './theme.css'
import Home from './views/pages/Home';
import App from './App';
import { SearchSchema } from './schemas/Search.schema';
import ToastProvider from './views/components/CustomToast/ToastProvider';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: SearchSchema,
  component: () => <Home />,
});

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryProvider>
        <ToastProvider>
          <App>
            <RouterProvider router={router} />
            <TanStackRouterDevtools router={router} />
          </App>
        </ToastProvider>
      </QueryProvider>
    </StrictMode>,
  )
}
