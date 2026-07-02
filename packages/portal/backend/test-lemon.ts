/**
 * Test LemonSqueezy API connectivity
 * Usage: npx ts-node test-lemon.ts
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, ".env") });

async function main() {
  const email = process.argv[2] || "angelliambo@gmail.com";
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;

  console.log("=".repeat(60));
  console.log(" TEST LEMONSQUEEZY API");
  console.log("=".repeat(60));
  console.log(`Email: ${email}`);
  console.log(`API Key: ${apiKey ? apiKey.slice(0, 20) + "..." : "❌ NO CONFIGURADA"}`);
  console.log(`Store ID: ${process.env.LEMONSQUEEZY_STORE_ID || "❌ NO CONFIGURADO"}`);
  console.log(`Variant 6M: ${process.env.LEMONSQUEEZY_6M_VARIANT_ID || "❌ NO CONFIGURADO"}`);
  console.log(`Variant 1Y: ${process.env.LEMONSQUEEZY_1Y_VARIANT_ID || "❌ NO CONFIGURADO"}`);
  console.log("");

  if (!apiKey) {
    console.error("ERROR: Configurá LEMONSQUEEZY_API_KEY en .env");
    process.exit(1);
  }

  // Test 1: Ping API
  console.log("📡 Test 1: Conectando a LemonSqueezy API...");
  try {
    const ping = await fetch("https://api.lemonsqueezy.com/v1/stores", {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
    });
    if (!ping.ok) {
      console.log(`   ❌ API respondió ${ping.status}: ${ping.statusText}`);
      if (ping.status === 401) console.log("   → La API key es inválida o expiró. Generá una nueva en https://app.lemonsqueezy.com/settings/api");
    } else {
      const stores = await ping.json();
      console.log(`   ✅ Conectado! Stores: ${stores.data?.length || 0}`);
    }
  } catch (e: any) {
    console.log(`   ❌ Error de red: ${e.message}`);
  }

  console.log("");

  // Test 2: Search orders by email
  console.log(`📡 Test 2: Buscando órdenes para ${email}...`);
  try {
    const resp = await fetch(
      `https://api.lemonsqueezy.com/v1/orders?filter[user_email]=${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" } },
    );
    if (!resp.ok) {
      console.log(`   ❌ API respondió ${resp.status}: ${resp.statusText}`);
      const text = await resp.text();
      console.log(`   Body: ${text.slice(0, 200)}`);
    } else {
      const data = await resp.json();
      if (data.data?.length > 0) {
        console.log(`   ✅ ${data.data.length} orden(es) encontrada(s):`);
        for (const order of data.data) {
          const variantId = order.attributes.first_order_item?.variant_id || "?";
          const productName = order.attributes.product_name || "?";
          console.log(`     • Order #${order.id} | ${productName} | Status: ${order.attributes.status} | Total: ${order.attributes.currency} ${order.attributes.total}`);
          // Get variant details
          try {
            const vresp = await fetch(
              `https://api.lemonsqueezy.com/v1/variants/${variantId}`,
              { headers: { Authorization: `Bearer ${apiKey}` } }
            );
            const vdata = await vresp.json();
            if (vdata.data) {
              console.log(`       Variant #${vdata.data.id} | ${vdata.data.attributes.name}`);
            }
          } catch {}
        }
      } else {
        console.log(`   ℹ️  No se encontraron órdenes para ${email}`);
      }
    }
  } catch (e: any) {
    console.log(`   ❌ Error: ${e.message}`);
  }

  console.log("");
  console.log("=".repeat(60));
  console.log(" FIN DEL TEST");
  console.log("=".repeat(60));
}

// Also show variants
async function showVariants() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!apiKey || !storeId) return;
  try {
    // First get products by store
    const prodResp = await fetch(
      `https://api.lemonsqueezy.com/v1/products?filter[store_id]=${storeId}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    const prodData = await prodResp.json();
    console.log("\n📦 Productos:");
    for (const p of prodData.data || []) {
      console.log(`   Producto #${p.id} | ${p.attributes.name}`);
      // Then get variants for each product
      const varResp = await fetch(
        `https://api.lemonsqueezy.com/v1/variants?filter[product_id]=${p.id}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      const varData = await varResp.json();
      for (const v of varData.data || []) {
        console.log(`     → Variant #${v.id} | ${v.attributes.name} | ${v.attributes.price_formatted}`);
      }
    }
    if (!prodData.data?.length) {
      console.log("   (sin productos)");
      console.log(JSON.stringify(prodData, null, 2).slice(0, 500));
    }
  } catch (e: any) {
    console.log("   Error:", e.message);
  }
}

main().catch(console.error).finally(() => {
  showVariants().catch(console.error);
});
