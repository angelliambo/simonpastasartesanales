import type { PlanId } from "../types/plan";

type VisiblePlanId = Exclude<PlanId, "god_mode" | "trial">;

export interface PlanConfig {
  id: PlanId;
  name: string;
  price: number;
  variantId: number;
  features: string[];
  badge?: "popular" | "best-value";
  hidden?: boolean;
}

export const PLANS: Record<VisiblePlanId, PlanConfig> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    variantId: 0,
    features: [
      "Lector de texto seleccionado",
      "Subtítulos cinéticos",
      "Pantalla flotante (Always-on-Top)",
      "Comandos de voz (puntuación)",
    ],
  },
  "6_meses": {
    id: "6_meses",
    name: "Semestral (6 meses)",
    price: 15,
    variantId: 1703816,
    badge: "popular",
    features: [
      "Lector de texto seleccionado",
      "Subtítulos cinéticos",
      "Pantalla flotante (Always-on-Top)",
      "Comandos de voz (puntuación)",
      "Dictado ilimitado",
      "Narrador de página completa",
      "Resaltar texto al leer",
      "Leer en PDF",
    ],
  },
  "1_ano": {
    id: "1_ano",
    name: "Anual (12 meses)",
    price: 25,
    variantId: 1703815,
    badge: "best-value",
    features: [
      "Lector de texto seleccionado",
      "Subtítulos cinéticos",
      "Pantalla flotante (Always-on-Top)",
      "Comandos de voz (puntuación)",
      "Dictado ilimitado",
      "Narrador de página completa",
      "Resaltar texto al leer",
      "Leer en PDF",
    ],
  },
};

export const DEFAULT_VARIANT_ID = PLANS["6_meses"].variantId;
