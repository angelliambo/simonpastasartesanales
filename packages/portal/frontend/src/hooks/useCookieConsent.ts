import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const COOKIE_CONSENT_KEY = "zn-portal-cookie-consent";
const COOKIE_CONSENT_TIMESTAMP_KEY = "zn-portal-cookie-consent-timestamp";

export type CookieConsentStatus = "accepted" | "rejected" | "pending" | null;

interface CookieConsentState {
  status: CookieConsentStatus;
  timestamp: number | null;
}

/**
 * Hook para gestionar el consentimiento de cookies
 * 
 * Funcionalidades:
 * - Guarda preferencia en localStorage para usuarios no logueados
 * - Guarda preferencia en backend para usuarios logueados
 * - Verifica si debe mostrar el modal
 * - Persiste el estado de consentimiento
 */
export const useCookieConsent = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Obtener ID del usuario (puede ser _id o id dependiendo del formato)
  const userId = user?._id || (user as any)?.id;

  const [consentState, setConsentState] = useState<CookieConsentState>({
    status: null,
    timestamp: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Cargar estado inicial desde localStorage o backend
  useEffect(() => {
    const loadConsentState = async () => {
      setIsLoading(true);
      try {
        if (isAuthenticated && userId) {
          // Usuario logueado: consultar backend
          try {
            const response = await fetch("/api/cookies/consent", {
              method: "GET",
              credentials: "include",
            });

            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data) {
                setConsentState({
                  status: data.data.status,
                  timestamp: data.data.timestamp,
                });
                setIsLoading(false);
                return;
              }
            }
          } catch (error) {
            console.error("Error al cargar consentimiento desde backend:", error);
            // Fallback a localStorage si falla el backend
          }
        }

        // Usuario no logueado o fallback: consultar localStorage
        const storedStatus = localStorage.getItem(COOKIE_CONSENT_KEY);
        const storedTimestamp = localStorage.getItem(COOKIE_CONSENT_TIMESTAMP_KEY);

        if (storedStatus && storedTimestamp) {
          setConsentState({
            status: storedStatus as CookieConsentStatus,
            timestamp: parseInt(storedTimestamp, 10),
          });
        }
      } catch (error) {
        console.error("Error al cargar estado de consentimiento:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConsentState();
  }, [isAuthenticated, userId]);

  // Guardar consentimiento en backend (si está logueado) o localStorage
  const saveConsent = useCallback(
    async (status: "accepted" | "rejected") => {
      const timestamp = Date.now();
      const newState: CookieConsentState = {
        status,
        timestamp,
      };

      try {
        if (isAuthenticated && userId) {
          // Guardar en backend
          const response = await fetch("/api/cookies/consent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              status,
              timestamp,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setConsentState(newState);
              // También guardar en localStorage como backup
              localStorage.setItem(COOKIE_CONSENT_KEY, status);
              localStorage.setItem(
                COOKIE_CONSENT_TIMESTAMP_KEY,
                timestamp.toString()
              );
              return;
            }
          }
        }

        // Guardar en localStorage (usuario no logueado o fallback)
        localStorage.setItem(COOKIE_CONSENT_KEY, status);
        localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, timestamp.toString());
        setConsentState(newState);
      } catch (error) {
        console.error("Error al guardar consentimiento:", error);
        // Fallback: guardar en localStorage de todas formas
        localStorage.setItem(COOKIE_CONSENT_KEY, status);
        localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, timestamp.toString());
        setConsentState(newState);
      }
    },
    [isAuthenticated, userId]
  );

  // Aceptar cookies
  const acceptCookies = useCallback(() => {
    saveConsent("accepted");
  }, [saveConsent]);

  // Rechazar cookies
  const rejectCookies = useCallback(() => {
    saveConsent("rejected");
  }, [saveConsent]);

  // Verificar si tiene consentimiento
  const hasConsent = useCallback(() => {
    return consentState.status === "accepted";
  }, [consentState.status]);

  // Verificar si debe mostrar el modal
  // El modal debe mostrarse si:
  // - El usuario NO está logueado (los logueados ya aceptaron durante el registro)
  // - No hay estado guardado (null)
  // - El estado es "pending" (cerrado sin aceptar)
  const shouldShowModal = useCallback(() => {
    // Si el usuario está logueado, nunca mostrar el modal
    // porque ya aceptó los términos (incluyendo cookies) durante el registro
    if (isAuthenticated) {
      return false;
    }
    
    if (isLoading) return false;
    return consentState.status === null || consentState.status === "pending";
  }, [consentState.status, isLoading, isAuthenticated]);

  // Marcar como "pending" cuando se cierra sin aceptar
  const markAsPending = useCallback(() => {
    setConsentState({
      status: "pending",
      timestamp: Date.now(),
    });
    // No guardar "pending" en backend/localStorage, solo en estado local
    // Esto permite que el modal vuelva a aparecer en la siguiente navegación
  }, []);

  return {
    consentStatus: consentState.status,
    hasConsent: hasConsent(),
    shouldShowModal: shouldShowModal(),
    isLoading,
    acceptCookies,
    rejectCookies,
    markAsPending,
  };
};

