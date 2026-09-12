import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

// Inicializar únicamente en PRODUCCIÓN y con credenciales válidas
const isProduction = process.env.NODE_ENV === "production";
const isValidKey = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "undefined" &&
  !firebaseConfig.apiKey.includes("YOUR_") &&
  firebaseConfig.projectId
);

if (isProduction && isValidKey) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    if (typeof window !== "undefined" && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.warn("⚠️ [FIREBASE] Error al inicializar Firebase SDK:", error);
  }
}

export { app, analytics };
