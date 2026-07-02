// Utilidades para detección de dispositivos y capacidades PWA
import { canTrackAnalytics, safeSetItem } from "./cookieUtils";

export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  browser: string;
  canInstall: boolean;
  installMethod: "native" | "ios" | "android" | "none";
}

export const detectDevice = (): DeviceInfo => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const isTablet = /iPad|Android(?=.*\bMobile\b)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  // Detectar navegador
  let browser = "unknown";
  if (userAgent.includes("Chrome")) browser = "chrome";
  else if (userAgent.includes("Firefox")) browser = "firefox";
  else if (userAgent.includes("Safari")) browser = "safari";
  else if (userAgent.includes("Edge")) browser = "edge";

  // Determinar si puede instalar y cómo
  let canInstall = false;
  let installMethod: "native" | "ios" | "android" | "none" = "none";

  if (isIOS) {
    canInstall = true;
    installMethod = "ios";
  } else if (isAndroid && browser === "chrome") {
    canInstall = true;
    installMethod = "android";
  } else if (isDesktop && (browser === "chrome" || browser === "edge")) {
    canInstall = true;
    installMethod = "native";
  }

  return {
    isIOS,
    isAndroid,
    isMobile,
    isTablet,
    isDesktop,
    browser,
    canInstall,
    installMethod,
  };
};

export const getInstallInstructions = (deviceInfo: DeviceInfo): string[] => {
  const instructions: string[] = [];

  switch (deviceInfo.installMethod) {
    case "ios":
      instructions.push(
        '1. Toca el botón "Compartir" en la parte inferior',
        '2. Desplázate hacia abajo y selecciona "Agregar a pantalla de inicio"',
        '3. Toca "Agregar" para confirmar',
        "4. ¡Listo! La app aparecerá en tu pantalla de inicio"
      );
      break;
    case "android":
      instructions.push(
        "1. Toca el menú de tres puntos en tu navegador",
        '2. Selecciona "Instalar app" o "Agregar a pantalla de inicio"',
        "3. Confirma la instalación",
        "4. ¡Listo! La app se instalará como una aplicación nativa"
      );
      break;
    case "native":
      instructions.push(
        '1. Haz clic en el botón "Instalar"',
        "2. Confirma la instalación en el diálogo del navegador",
        "3. ¡Listo! La app se instalará en tu sistema"
      );
      break;
    default:
      instructions.push(
        "Tu navegador no soporta la instalación de PWA",
        "Intenta con Chrome, Edge o Safari"
      );
  }

  return instructions;
};

export const trackInstallAttempt = (
  deviceInfo: DeviceInfo,
  outcome: "accepted" | "dismissed" | "failed"
) => {
  // Verificar consentimiento de cookies antes de trackear
  if (!canTrackAnalytics()) {
    // Solo log en consola si no hay consentimiento
    console.log("PWA Install Attempt (sin tracking):", {
      device: deviceInfo.installMethod,
      browser: deviceInfo.browser,
      outcome,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Aquí podrías enviar analytics a tu servicio preferido
  console.log("PWA Install Attempt:", {
    device: deviceInfo.installMethod,
    browser: deviceInfo.browser,
    outcome,
    timestamp: new Date().toISOString(),
  });

  // Guardar en localStorage para analytics locales (solo si hay consentimiento)
  const installData = {
    device: deviceInfo.installMethod,
    browser: deviceInfo.browser,
    outcome,
    timestamp: new Date().toISOString(),
  };

  const existingData = JSON.parse(
    localStorage.getItem("pwa-install-analytics") || "[]"
  );
  existingData.push(installData);
  
  // Usar safeSetItem para verificar consentimiento antes de guardar
  safeSetItem("pwa-install-analytics", JSON.stringify(existingData));
};

export const shouldShowInstallPrompt = (deviceInfo: DeviceInfo): boolean => {
  // No mostrar si no puede instalar
  if (!deviceInfo.canInstall) return false;

  // Verificar si ya está instalado
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const isIOSInstalled = (window.navigator as any).standalone === true;

  if (isStandalone || isIOSInstalled) return false;

  // Verificar si el usuario ya rechazó recientemente
  const lastDismissed = localStorage.getItem("pwa-install-dismissed");
  if (lastDismissed) {
    const dismissedTime = parseInt(lastDismissed);
    const now = Date.now();
    const daysSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60 * 24);

    // No mostrar por 7 días después de rechazar
    if (daysSinceDismissed < 7) return false;
  }

  return true;
};
