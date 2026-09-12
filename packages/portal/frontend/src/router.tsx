import React, { Suspense, lazy } from "react";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "./providers/QueryProvider";
import Loading from "./components/loading";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { FEATURES } from "@factory/shared/config/features";
import { USER_PROFILE_QUERY_KEY } from "./services/api/userService";
import apiClient from "./services/api/client";

// Lazy loading de páginas
const HomePage = lazy(() => import("./pages/HomePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/legal/TermsAndConditionsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));

export interface RouterContext {
  queryClient: QueryClient;
}

// 1. Root Route
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
  notFoundComponent: () => <NotFoundPage />,
});

// 2. Layout Route
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => <Layout />,
});

// 3. Leaf Routes
const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => <HomePage />,
});

const welcomeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/wellcome",
  component: () => (FEATURES.ENABLE_GOOGLE_AUTH ? <WelcomePage /> : <NotFoundPage />),
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  loader: async ({ context }) => {
    // Prefetching de datos con QueryClient para carga instantánea
    await context.queryClient
      .ensureQueryData({
        queryKey: USER_PROFILE_QUERY_KEY,
        queryFn: () => apiClient("/user/profile"),
      })
      .catch(() => null);
  },
  component: () =>
    FEATURES.ENABLE_GOOGLE_AUTH ? (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ) : (
      <NotFoundPage />
    ),
});

const adminRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin",
  component: () =>
    FEATURES.ENABLE_GOOGLE_AUTH ? (
      <ProtectedRoute requireAdmin>
        <AdminPage />
      </ProtectedRoute>
    ) : (
      <NotFoundPage />
    ),
});

const debugRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/debug",
  component: () =>
    FEATURES.ENABLE_GOOGLE_AUTH && process.env.NODE_ENV === "development" ? (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ) : (
      <NotFoundPage />
    ),
});

const supportRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/support",
  validateSearch: (search: Record<string, unknown>) => ({
    ticketId: (search.ticketId as string) || undefined,
  }),
  component: () => (FEATURES.ENABLE_TICKETING_SYSTEM ? <SupportPage /> : <NotFoundPage />),
});

const termsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/legal/terms",
  component: () => <TermsAndConditionsPage />,
});

const privacyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/legal/privacy",
  component: () => <PrivacyPolicyPage />,
});

// Rutas estáticas para landing/SEO SSG
const serviciosRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/servicios",
  component: () => <HomePage />,
});

const faqRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/preguntas-frecuentes",
  component: () => <HomePage />,
});

const contactoRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/contacto",
  component: () => <HomePage />,
});

// Arbol de rutas (RouteTree)
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    serviciosRoute,
    faqRoute,
    contactoRoute,
    welcomeRoute,
    dashboardRoute,
    adminRoute,
    debugRoute,
    supportRoute,
    termsRoute,
    privacyRoute,
  ]),
]);

// 4. Instancia del Router con defaultPreload: 'intent' (Precarga al pasar el cursor)
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadDelay: 50,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
