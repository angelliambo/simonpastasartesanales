import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/loading";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { FEATURES } from "@factory/shared/config/features";

const HomePage = lazy(() => import("./pages/HomePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const BillingPage = lazy(() => import("./pages/BillingPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/legal/TermsAndConditionsPage")
);
const PrivacyPolicyPage = lazy(
  () => import("./pages/legal/PrivacyPolicyPage")
);
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const VoiceCommandsPage = lazy(() => import("./pages/VoiceCommandsPage"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />

            {/* Rutas de Autenticación / Panel (Dashboard) */}
            {FEATURES.ENABLE_GOOGLE_AUTH ? (
              <>
                <Route path="/wellcome" element={<WelcomePage />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPage /></ProtectedRoute>} />
                {process.env.NODE_ENV === "development" ? (
                  <Route path="/debug" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
                ) : (
                  <Route path="/debug" element={<NotFoundPage />} />
                )}
              </>
            ) : (
              <>
                <Route path="/wellcome" element={<NotFoundPage />} />
                <Route path="/dashboard" element={<NotFoundPage />} />
                <Route path="/admin" element={<NotFoundPage />} />
                <Route path="/debug" element={<NotFoundPage />} />
              </>
            )}

            {/* Rutas de Facturación */}
            {FEATURES.ENABLE_BILLING_LEMON ? (
              <>
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
              </>
            ) : (
              <>
                <Route path="/pricing" element={<NotFoundPage />} />
                <Route path="/billing" element={<NotFoundPage />} />
              </>
            )}

            {/* Ruta de Soporte / Tickets */}
            {FEATURES.ENABLE_TICKETING_SYSTEM ? (
              <Route path="/support" element={<SupportPage />} />
            ) : (
              <Route path="/support" element={<NotFoundPage />} />
            )}

            <Route path="/commands" element={<VoiceCommandsPage />} />
            <Route path="/legal/terms" element={<TermsAndConditionsPage />} />
            <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
