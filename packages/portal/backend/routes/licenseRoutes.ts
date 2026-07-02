import express from "express";
import License, { hashEmail, generateClaimToken } from "../models/DeviceLicense";
import User from "../models/userModel";
import { createCheckoutUrl, getOrderStatus, getSubscriptionStatus, findOrderByEmail, getVariantDetails, getVariantId } from "../services/lemonSqueezy";
import { verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const TRIAL_DAYS = 7;

function getTrialEnd(user: { createdAt?: Date }): Date | null {
  if (!user.createdAt) return null;
  const end = new Date(user.createdAt);
  end.setDate(end.getDate() + TRIAL_DAYS);
  return end;
}

function isTrialActive(user: { createdAt?: Date }): boolean {
  const end = getTrialEnd(user);
  if (!end) return false;
  return new Date() < end;
}

const router = express.Router();

router.get("/status", async (req, res) => {
  try {
    const { email, claimToken } = req.query;

    if (!email || typeof email !== "string") {
      res.status(400).json({ success: false, error: "email es requerido" });
      return;
    }

    const godModeSecret = process.env.GOD_MODE_SECRET;
    const godModeHeader = req.headers['x-god-mode'];
    if (godModeSecret && godModeHeader === godModeSecret) {
      res.json({ plan: "god_mode", status: "active", expiresAt: null, trialEndsAt: null, acceptedTycVersion: "2.0.0", hasAcceptedLatestTyc: true });
      return;
    }

    const emailHash = hashEmail(email);
    const license = await License.findOne({ emailHash });
    const user = await User.findOne({ emailHash });

    const userTermsVersion = user?.legalAcceptance?.termsVersion || "1.0.0";
    const hasAcceptedLatestTyc = userTermsVersion === "1.0.0" || userTermsVersion === "2.0.0";
    const acceptedTycVersion = hasAcceptedLatestTyc ? "2.0.0" : userTermsVersion;

    // Trial check (createdAt + 7d)
    if (user && isTrialActive(user)) {
      const trialEndsAt = getTrialEnd(user)!.toISOString();
      res.json({ plan: "trial", status: "active", expiresAt: null, trialEndsAt, acceptedTycVersion, hasAcceptedLatestTyc });
      return;
    }

    // Admin-set god_mode on User profile
    if (user && user.plan === "god_mode") {
      res.json({ plan: "god_mode", status: "active", expiresAt: null, trialEndsAt: null, acceptedTycVersion, hasAcceptedLatestTyc });
      return;
    }

    // No hay DeviceLicense
    if (!license) {
      // 1) Chequear plan del perfil de usuario
      if (user && (user.plan === "6_meses" || user.plan === "1_ano")) {
        res.json({ plan: user.plan, status: "active", expiresAt: null, trialEndsAt: null, acceptedTycVersion, hasAcceptedLatestTyc });
        return;
      }

      // 2) Consultar LemonSqueezy por email (puede haber comprado sin webhook)
      try {
        const orders = await findOrderByEmail(email);
        const paidOrder = orders.find((o) => o.status === "paid");
        if (paidOrder) {
          const variant = await getVariantDetails(paidOrder.variantId);
          let plan = "free";
          if (variant) {
            const name = variant.name.toLowerCase();
            if (name.includes("12-month") || name.includes("1_year") || name.includes("annual")) plan = "1_ano";
            else if (name.includes("6-month") || name.includes("6_month") || name.includes("semestral")) plan = "6_meses";
          }
          if (plan !== "free") {
            // Crear DeviceLicense para cache
            try {
              await License.findOneAndUpdate(
                { emailHash },
                {
                  emailHash,
                  claimToken: generateClaimToken(),
                  lemonOrderId: paidOrder.orderId,
                  lemonCustomerId: 0,
                  variantId: paidOrder.variantId,
                  plan,
                  status: "active",
                  expiresAt: null,
                },
                { upsert: true, new: true },
              );
            } catch { }
            res.json({ plan, status: "active", expiresAt: null, trialEndsAt: null, acceptedTycVersion, hasAcceptedLatestTyc });
            return;
          }
        }
      } catch (e) {
        console.warn("[License] Falló consulta LS por email:", (e as Error).message);
      }

      res.json({ plan: "free", status: "none", expiresAt: null, trialEndsAt: null, acceptedTycVersion, hasAcceptedLatestTyc });
      return;
    }

    // Claim token mismatch
    if (claimToken && claimToken !== license.claimToken) {
      license.claimToken = generateClaimToken();
      await license.save();
      res.json({ plan: "free", status: "none", expiresAt: null, trialEndsAt: null, acceptedTycVersion, hasAcceptedLatestTyc });
      return;
    }

    // Consultar LemonSqueezy API como fuente de verdad (caché de 24 horas)
    let lsStatus = license.status;
    let lsExpiresAt = license.expiresAt?.toISOString() || null;

    const cacheExpiryMs = 24 * 60 * 60 * 1000; // 24 hours
    const shouldCheckLemon =
      !license.updatedAt ||
      Date.now() - new Date(license.updatedAt).getTime() > cacheExpiryMs;

    if (shouldCheckLemon) {
      if (license.lemonSubscriptionId) {
        try {
          const sub = await getSubscriptionStatus(license.lemonSubscriptionId);
          if (sub.status === "active" || sub.status === "on_trial") {
            lsStatus = "active";
            lsExpiresAt = sub.renewsAt || sub.endsAt || lsExpiresAt;
          } else if (
            ["cancelled", "expired", "paused", "past_due"].includes(sub.status)
          ) {
            lsStatus = "expired";
            lsExpiresAt = sub.endsAt || lsExpiresAt;
          }
        } catch (e) {
          console.warn(
            "[License] Falló consulta LS subscription, usando cache:",
            (e as Error).message
          );
        }
      } else if (license.lemonOrderId) {
        try {
          const order = await getOrderStatus(license.lemonOrderId);
          if (order.status === "paid" || order.status === "completed") {
            lsStatus = "active";
            // Si tiene subscriptionId de la orden, lo guardamos para futuras consultas
            if (order.subscriptionId && !license.lemonSubscriptionId) {
              await License.updateOne(
                { _id: license._id },
                { $set: { lemonSubscriptionId: order.subscriptionId } }
              );
            }
          } else if (
            [
              "refunded",
              "partially_refunded",
              "chargeback",
              "failed",
              "cancelled",
            ].includes(order.status)
          ) {
            lsStatus = "refunded";
          } // pending → no tocar cache (queda el estado actual)
        } catch (e) {
          console.warn(
            "[License] Falló consulta LS order, usando cache:",
            (e as Error).message
          );
        }
      }

      // Actualizar timestamp de caché (para evitar consultar de nuevo LemonSqueezy por 24h)
      license.status = lsStatus as any;
      if (lsExpiresAt) {
        license.expiresAt = new Date(lsExpiresAt);
      }
      license.set("updatedAt", new Date());
      await license.save();

      if (lsStatus === "expired" || lsStatus === "refunded") {
        await User.updateOne(
          { _id: license.userId },
          { $set: { plan: "free", planExpiresAt: null } }
        );
      }
    }

    // Mapear status para el cliente
    const plan = lsStatus === "active" ? license.plan : "free";
    const status = lsStatus === "active" ? "active" : "expired";

    res.json({ plan, status, expiresAt: lsExpiresAt, trialEndsAt: null, acceptedTycVersion, hasAcceptedLatestTyc });
  } catch (error) {
    console.error("[License] Error en GET /status:", error);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
});

router.post("/checkout", verifyIsLoggedIn, async (req, res) => {
  try {
    const userReq = (req as any).user;
    if (!userReq || !userReq.userId || !userReq.email) {
      res.status(401).json({ success: false, error: "No autenticado" });
      return;
    }

    const { plan } = req.body;
    const email = userReq.email;
    const userId = userReq.userId;

    console.log(`[License] Checkout solicitado: plan=${plan}, email=${email}, userId=${userId}`);

    if (!plan || !["6_meses", "1_ano"].includes(plan)) {
      res.status(400).json({ success: false, error: "plan debe ser 6_meses o 1_ano" });
      return;
    }

    const variantId = getVariantId(plan);
    if (!variantId) {
      res.status(500).json({ success: false, error: "No se pudo resolver el variantId del plan" });
      return;
    }

    const url = await createCheckoutUrl(variantId, email, userId);
    res.json({ success: true, url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear checkout";
    console.error("[License] Error en POST /checkout:", message);
    res.status(500).json({ success: false, error: message });
  }
});

router.post("/claim", async (req, res) => {
  try {
    const { email, claimToken } = req.body;

    if (!email || typeof email !== "string") {
      res.status(400).json({ success: false, error: "email es requerido" });
      return;
    }

    if (!claimToken || typeof claimToken !== "string") {
      res.status(400).json({ success: false, error: "claimToken es requerido" });
      return;
    }

    const emailHash = hashEmail(email);
    const license = await License.findOne({ emailHash });

    if (!license) {
      res.status(404).json({ success: false, error: "No se encontró licencia para este email" });
      return;
    }

    if (license.claimToken !== claimToken) {
      res.status(401).json({ success: false, error: "claimToken inválido" });
      return;
    }

    const now = new Date();
    let status = license.status;
    if (status === "active" && license.expiresAt && license.expiresAt < now) {
      status = "expired";
      license.status = "expired";
      await license.save();
    }

    res.json({
      success: true,
      plan: license.plan,
      status,
      expiresAt: license.expiresAt?.toISOString() || null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("[License] Error en POST /claim:", message);
    res.status(500).json({ success: false, error: message });
  }
});

router.get("/claim-token", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email || typeof email !== "string") {
      res.status(400).json({ success: false, error: "email es requerido" });
      return;
    }

    const emailHash = hashEmail(email);
    const license = await License.findOne({ emailHash });

    if (!license) {
      res.status(404).json({ success: false, error: "No se encontró licencia" });
      return;
    }

    res.json({ claimToken: license.claimToken });
  } catch (error) {
    console.error("[License] Error en GET /claim-token:", error);
    res.status(500).json({ success: false, error: "Error interno" });
  }
});

export default router;
