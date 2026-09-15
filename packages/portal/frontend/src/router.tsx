import React, { Suspense, lazy } from "react";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "./providers/QueryProvider";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "development"
    ? lazy(() =>
        import("@tanstack/react-router-devtools").then((m) => ({
          default: m.TanStackRouterDevtools,
        }))
      )
    : null;
import Loading from "./components/loading";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { FEATURES } from "@factory/shared/config/features";
import { userProfileQueryOptions } from "./services/api/userService";
import { useAuth } from "./contexts/AuthContext";

import HomePage from "./pages/HomePage";

// Secondary page chunk functions for idle preloading
const loadPreciosPage = () => import("./pages/PreciosPage");
const loadSupportPage = () => import("./pages/SupportPage");
const loadDashboardPage = () => import("./pages/DashboardPage");
const loadTermsPage = () => import("./pages/legal/TermsAndConditionsPage");
const loadPrivacyPage = () => import("./pages/legal/PrivacyPolicyPage");

// Lazy loading de páginas secundarias
const DashboardPage = lazy(loadDashboardPage);
const SupportPage = lazy(loadSupportPage);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const TermsAndConditionsPage = lazy(loadTermsPage);
const PrivacyPolicyPage = lazy(loadPrivacyPage);
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const PreciosPage = lazy(loadPreciosPage);
const AdminPreciosPage = lazy(() => import("./pages/AdminPreciosPage"));

export interface RouterContext {
  queryClient: QueryClient;
  auth?: ReturnType<typeof useAuth>;
}

// 1. Root Route
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Suspense fallback={<Loading />}>
      <Outlet />
      {process.env.NODE_ENV === "development" && TanStackRouterDevtools && (
        <Suspense fallback={null}>
          <TanStackRouterDevtools position="bottom-left" />
        </Suspense>
      )}
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
  beforeLoad: ({ context }) => {
    const isAuth = context.auth?.isAuthenticated ?? (typeof window !== "undefined" && Boolean(localStorage.getItem("auth_token")));
    if (!isAuth) {
      throw redirect({ to: "/" });
    }
  },
  loader: async ({ context }) => {
    await context.queryClient
      .ensureQueryData(userProfileQueryOptions)
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
  beforeLoad: ({ context }) => {
    const isAuth = context.auth?.isAuthenticated ?? (typeof window !== "undefined" && Boolean(localStorage.getItem("auth_token")));
    if (!isAuth) {
      throw redirect({ to: "/" });
    }
  },
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
  validateSearch: (search: Record<string, unknown>): { ticketId?: string } => ({
    ticketId: typeof search.ticketId === "string" ? search.ticketId : undefined,
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

const preciosRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/precios",
  component: () => <PreciosPage />,
});

const productosRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/productos",
  component: () => <PreciosPage />,
});

const mayoristaRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/mayorista",
  component: () => <PreciosPage />,
});

const pricingRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/pricing",
  component: () => <PreciosPage />,
});

const adminPreciosRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin/precios",
  beforeLoad: ({ context }) => {
    const isAuth = context.auth?.isAuthenticated ?? (typeof window !== "undefined" && Boolean(localStorage.getItem("auth_token")));
    if (!isAuth) {
      throw redirect({ to: "/" });
    }
  },
  component: () => (
    <ProtectedRoute requireAdmin>
      <AdminPreciosPage />
    </ProtectedRoute>
  ),
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

// Árbol de rutas (RouteTree)
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    preciosRoute,
    productosRoute,
    mayoristaRoute,
    pricingRoute,
    adminPreciosRoute,
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
  const auth = useAuth();

  React.useEffect(() => {
    const preloadSecondaryRoutes = () => {
      loadPreciosPage();
      loadSupportPage();
      loadDashboardPage();
      loadTermsPage();
      loadPrivacyPage();
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => preloadSecondaryRoutes(), {
        timeout: 4000,
      });
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(preloadSecondaryRoutes, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return <RouterProvider router={router} context={{ queryClient, auth }} />;
};

export default AppRouter;
