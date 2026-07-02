import express from "express";
import crypto from "crypto";
import License, { hashEmail, generateClaimToken } from "../models/DeviceLicense";
import UserModel from "../models/userModel";
import { getPlanFromVariantId } from "../services/lemonSqueezy";

const router = express.Router();

function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return true;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

interface LemonWebhookPayload {
  meta: {
    event_name: string;
    custom_data?: Record<string, string>;
  };
  data: {
    id: string;
    attributes: {
      first_subscription_item?: {
        id: number;
        product_id: number;
        variant_id: number;
      };
      variant_id?: number;
      product_id?: number;
      customer_id: number;
      order_id?: number;
      status?: string;
      ends_at?: string | null;
      renews_at?: string | null;
      cancelled?: boolean;
      user_email?: string;
    };
  };
}

async function syncLicenseToUser(email: string, plan: string, expiresAt: Date | null, userId?: string): Promise<void> {
  let user = null;
  if (userId) {
    user = await UserModel.findById(userId);
  }
  if (!user && email) {
    const emailHash = hashEmail(email);
    user = await UserModel.findOne({ emailHash });
  }
  if (user) {
    user.plan = plan as any;
    user.planExpiresAt = expiresAt || undefined;
    await user.save();
  }
}

router.post("/lemon-squeezy", async (req, res) => {
  try {
    const rawBody = (req as any).rawBody || JSON.stringify(req.body);
    const signature = req.headers["x-signature"] as string;

    if (signature && !verifyWebhookSignature(rawBody, signature)) {
      console.error("[Webhook] Firma inválida");
      res.status(401).json({ success: false, error: "Firma inválida" });
      return;
    }

    const payload = req.body as LemonWebhookPayload;
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data;
    const attributes = payload.data?.attributes;

    console.log(`[Webhook] Evento recibido: ${eventName}`);

    let user = null;
    const userId = customData?.userId;
    if (userId) {
      user = await UserModel.findById(userId);
    }

    const email = customData?.email || attributes?.user_email;
    let emailHash = "";
    if (user) {
      emailHash = user.emailHash;
    } else if (email) {
      emailHash = hashEmail(email);
    }

    if (!emailHash) {
      res.status(200).json({ success: true, message: "Evento sin email o userId identificable, ignorado" });
      return;
    }

    switch (eventName) {
      case "order_created":
      case "subscription_created": {
        const variantId = attributes.variant_id || attributes.first_subscription_item?.variant_id || 0;
        const plan = getPlanFromVariantId(variantId);
        const claimToken = generateClaimToken();
        const subscriptionId = attributes.first_subscription_item?.id || (eventName === "subscription_created" ? parseInt(payload.data.id) : undefined);

        let expiresAt: Date | null = null;
        if (attributes.ends_at) {
          expiresAt = new Date(attributes.ends_at);
        } else {
          const now = new Date();
          expiresAt = plan === "6_meses"
            ? new Date(now.setMonth(now.getMonth() + 6))
            : new Date(now.setFullYear(now.getFullYear() + 1));
        }

        const license = await License.findOneAndUpdate(
          { emailHash },
          {
            emailHash,
            userId: user?._id || undefined,
            claimToken,
            lemonOrderId: attributes.order_id || 0,
            lemonCustomerId: attributes.customer_id,
            lemonSubscriptionId: subscriptionId,
            variantId,
            plan,
            status: "active",
            expiresAt,
          },
          { upsert: true, new: true }
        );

        await syncLicenseToUser(email || "", plan, expiresAt, userId);

        console.log(`[Webhook] Licencia activada para hash ${emailHash.substring(0, 8)}: ${plan}`);
        break;
      }

      case "subscription_cancelled": {
        await License.findOneAndUpdate(
          { emailHash },
          { status: "cancelled" }
        );
        await syncLicenseToUser(email || "", "free", null, userId);
        console.log(`[Webhook] Licencia cancelada para hash ${emailHash.substring(0, 8)}`);
        break;
      }

      case "subscription_updated": {
        const updatedVariantId = attributes.variant_id || 0;
        const updatedPlan = getPlanFromVariantId(updatedVariantId);

        let updatedExpiresAt: Date | null = null;
        if (attributes.ends_at) {
          updatedExpiresAt = new Date(attributes.ends_at);
        }

        await License.findOneAndUpdate(
          { emailHash },
          {
            variantId: updatedVariantId,
            plan: updatedPlan,
            status: attributes.cancelled ? "cancelled" : "active",
            expiresAt: updatedExpiresAt,
          }
        );

        await syncLicenseToUser(
          email || "",
          attributes.cancelled ? "free" : updatedPlan,
          updatedExpiresAt,
          userId
        );
        console.log(`[Webhook] Licencia actualizada para hash ${emailHash.substring(0, 8)}`);
        break;
      }

      default:
        console.log(`[Webhook] Evento no manejado: ${eventName}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Webhook] Error:", message);
    res.status(500).json({ success: false, error: message });
  }
});

export default router;
