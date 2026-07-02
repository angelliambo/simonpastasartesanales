import { PLANS } from "@factory/shared/config/plans";

const LEMONSQUEEZY_API_BASE = "https://api.lemonsqueezy.com/v1";

function getVariantId(planKey: string): number {
  const envMap: Record<string, string> = {
    "6_meses": "LEMONSQUEEZY_6M_VARIANT_ID",
    "1_ano": "LEMONSQUEEZY_1Y_VARIANT_ID",
  };
  const envKey = envMap[planKey];
  if (envKey) {
    const envVal = process.env[envKey];
    if (envVal) return parseInt(envVal, 10);
  }
  if (planKey in PLANS) return (PLANS as any)[planKey]?.variantId || 0;
  return 0;
}

function getPlanFromVariantId(variantId: number): string {
  const variantToPlan: Record<number, string> = {};
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.variantId) variantToPlan[plan.variantId] = key;
  }
  for (const key of ["6_meses", "1_ano"]) {
    const vid = getVariantId(key);
    if (vid) variantToPlan[vid] = key;
  }
  return variantToPlan[variantId] || "free";
}

const API_KEY = () => {
  const key = process.env.LEMONSQUEEZY_API_KEY;
  if (!key) throw new Error("LEMONSQUEEZY_API_KEY no está configurada");
  return key;
};

interface LemonCheckoutResponse {
  data: {
    id: string;
    attributes: { url: string };
  };
}

interface LemonOrderData {
  id: string;
  attributes: {
    status: string;
    total: number;
    currency: string;
    ordered_at: string;
    first_subscription_item?: { id: number };
    receipt?: { url: string };
  };
}

interface LemonSubscriptionData {
  id: string;
  attributes: {
    status: string;
    trial_ends_at: string | null;
    renews_at: string | null;
    ends_at: string | null;
    cancelled: boolean;
    product_id: number;
    variant_id: number;
    order_id: number;
  };
}

async function createCheckoutUrl(
  variantId: number,
  email: string,
  userId?: string
): Promise<string> {
  const apiKey = API_KEY();
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!storeId) throw new Error("LEMONSQUEEZY_STORE_ID no está configurada");

  const response = await fetch(`${LEMONSQUEEZY_API_BASE}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: email,
            custom: {
              email: email,
              userId: userId,
            },
          },
        },
        relationships: {
          store: {
            data: { type: "stores", id: storeId },
          },
          variant: {
            data: { type: "variants", id: String(variantId) },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`LemonSqueezy API error: ${response.status} - ${errorBody}`);
  }

  const result = (await response.json()) as LemonCheckoutResponse;
  return result.data.attributes.url;
}

async function getOrderStatus(orderId: number): Promise<{
  status: string;
  total: number;
  currency: string;
  orderedAt: string;
  receiptUrl: string | null;
  subscriptionId: number | null;
}> {
  const response = await fetch(
    `${LEMONSQUEEZY_API_BASE}/orders/${orderId}`,
    { headers: { Authorization: `Bearer ${API_KEY()}`, Accept: "application/json" } },
  );
  if (!response.ok) throw new Error(`LemonSqueezy API error: ${response.status}`);
  const result = (await response.json()) as { data: LemonOrderData };
  const a = result.data.attributes;
  return {
    status: a.status,
    total: a.total,
    currency: a.currency,
    orderedAt: a.ordered_at,
    receiptUrl: a.receipt?.url || null,
    subscriptionId: a.first_subscription_item?.id || null,
  };
}

async function getSubscriptionStatus(subscriptionId: number): Promise<{
  status: string;
  trialEndsAt: string | null;
  renewsAt: string | null;
  endsAt: string | null;
  cancelled: boolean;
  variantId: number;
}> {
  const response = await fetch(
    `${LEMONSQUEEZY_API_BASE}/subscriptions/${subscriptionId}`,
    { headers: { Authorization: `Bearer ${API_KEY()}`, Accept: "application/json" } },
  );
  if (!response.ok) throw new Error(`LemonSqueezy API error: ${response.status}`);
  const result = (await response.json()) as { data: LemonSubscriptionData };
  const a = result.data.attributes;
  return {
    status: a.status,
    trialEndsAt: a.trial_ends_at,
    renewsAt: a.renews_at,
    endsAt: a.ends_at,
    cancelled: a.cancelled,
    variantId: a.variant_id,
  };
}

async function findOrderByEmail(email: string): Promise<{
  orderId: number;
  subscriptionId: number | null;
  status: string;
  variantId: number;
  productName: string;
  total: number;
  currency: string;
  orderedAt: string;
}[]> {
  const response = await fetch(
    `${LEMONSQUEEZY_API_BASE}/orders?filter[user_email]=${encodeURIComponent(email)}`,
    { headers: { Authorization: `Bearer ${API_KEY()}`, Accept: "application/json" } },
  );
  if (!response.ok) throw new Error(`LemonSqueezy API error: ${response.status}`);
  const result = (await response.json()) as { data: any[]; included?: any[] };
  return (result.data || []).map((order: any) => ({
    orderId: parseInt(order.id),
    subscriptionId: order.attributes.first_subscription_item?.id || null,
    status: order.attributes.status,
    variantId: order.attributes.first_order_item?.variant_id || 0,
    productName: order.attributes.product_name || "",
    total: order.attributes.total,
    currency: order.attributes.currency,
    orderedAt: order.attributes.ordered_at,
  }));
}

/**
 * Look up variant details by ID from LS API.
 */
async function getVariantDetails(variantId: number): Promise<{
  id: number;
  name: string;
  price: number;
  productId: number;
} | null> {
  try {
    const response = await fetch(
      `${LEMONSQUEEZY_API_BASE}/variants/${variantId}`,
      { headers: { Authorization: `Bearer ${API_KEY()}`, Accept: "application/json" } },
    );
    if (!response.ok) return null;
    const result = (await response.json()) as { data: { id: string; attributes: { name: string; price: number; product_id: number } } };
    return {
      id: parseInt(result.data.id),
      name: result.data.attributes.name,
      price: result.data.attributes.price,
      productId: result.data.attributes.product_id,
    };
  } catch {
    return null;
  }
}

export { createCheckoutUrl, getOrderStatus, getSubscriptionStatus, getVariantId, getPlanFromVariantId, findOrderByEmail, getVariantDetails };
