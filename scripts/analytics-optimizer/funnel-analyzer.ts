import path from 'path';
import fs from 'fs';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

async function runFunnelAnalysis() {
  const credsPath = path.join(process.cwd(), 'credentials', 'gcp-service-account.json');
  if (fs.existsSync(credsPath)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credsPath;
  }

  const analyticsDataClient = new BetaAnalyticsDataClient();
  const property = 'properties/547181866';

  console.log(`\n======================================================`);
  console.log(`📊 EJECUTANDO ANÁLISIS DE EMBUDO Y FUGA DE USUARIOS (CRO)`);
  console.log(`======================================================`);
  console.log(`• Propiedad GA4: ${property}`);

  try {
    // 1. Obtener eventos clave de conversión
    const [resEvents] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'activeUsers' }, { name: 'eventCount' }],
    });

    const eventCounts: Record<string, number> = {};
    if (resEvents.rows) {
      resEvents.rows.forEach(r => {
        eventCounts[r.dimensionValues?.[0]?.value || 'unknown'] = parseInt(r.metricValues?.[1]?.value || '0', 10);
      });
    }

    // 2. Obtener principales páginas de entrada (Landing Pages)
    const [resPages] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'bounceRate' }],
      limit: 15,
    });

    // 3. Obtener principales fuentes de adquisición de usuarios
    const [resTraffic] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionSourceMedium' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      limit: 10,
    });

    const totalViews = eventCounts['page_view'] || 0;
    const installClicks = eventCounts['click_cta_install'] || 0;
    const welcomeViews = eventCounts['welcome_funnel_view'] || 0;
    const pricingViews = eventCounts['pricing_view'] || 0;
    const upgradeClicks = eventCounts['plan_upgrade_click'] || 0;
    const purchases = eventCounts['purchase'] || 0;

    const landingToStorePercent = totalViews > 0 ? ((installClicks / totalViews) * 100).toFixed(1) : '0';
    const storeToWelcomePercent = installClicks > 0 ? ((welcomeViews / installClicks) * 100).toFixed(1) : '0';
    const usageToPricingPercent = welcomeViews > 0 ? ((pricingViews / welcomeViews) * 100).toFixed(1) : '0';
    const pricingToUpgradePercent = pricingViews > 0 ? ((upgradeClicks / pricingViews) * 100).toFixed(1) : '0';

    let mdReport = `# 🛒 Reporte de Embudo de Conversión y Puntos de Fuga (CRO) — ZenithNexus\n\n`;
    mdReport += `**Fecha de Compilación:** ${new Date().toLocaleString()}  \n`;
    mdReport += `**Propiedad GA4:** \`${property}\` (ZenithNexus Portal Web)  \n\n`;
    mdReport += `---\n\n`;
    mdReport += `## 📉 1. ANÁLISIS DEL EMBUDO DE VENTAS Y PERDIDAS DE USUARIOS\n\n`;
    mdReport += `| Etapa del Embudo | Evento Clave | Eventos Totales | Tasa de Conversión a Siguiente Etapa |\n`;
    mdReport += `| :--- | :--- | :--- | :--- |\n`;
    mdReport += `| **1. Vistas de Landing / Portal** | \`page_view\` | \`${totalViews}\` | **${landingToStorePercent}%** hacen clic en CTA |\n`;
    mdReport += `| **2. Clics en CTA de Instalación** | \`click_cta_install\` | \`${installClicks}\` | **${storeToWelcomePercent}%** llegan a Onboarding |\n`;
    mdReport += `| **3. Instalaciones / Onboarding** | \`welcome_funnel_view\` | \`${welcomeViews}\` | **${usageToPricingPercent}%** visitan /pricing |\n`;
    mdReport += `| **4. Visita a Tabla de Precios** | \`pricing_view\` | \`${pricingViews}\` | **${pricingToUpgradePercent}%** hacen clic en Comprar |\n`;
    mdReport += `| **5. Clic en Pasarela de Pago PRO** | \`plan_upgrade_click\` | \`${upgradeClicks}\` | **0%** compras finalizadas |\n`;
    mdReport += `| **6. Ventas Efectivas** | \`purchase\` | \`${purchases}\` | N/A |\n\n`;

    mdReport += `---\n\n`;
    mdReport += `## 🌐 2. TOP PÁGINAS Y RETENCIÓN EN EL PORTAL\n\n`;
    mdReport += `| Ruta de Página (\`pagePath\`) | Vistas de Página | Usuarios Activos | Tasa de Rebote |\n`;
    mdReport += `| :--- | :--- | :--- | :--- |\n`;
    if (resPages.rows) {
      resPages.rows.forEach(r => {
        const pathStr = r.dimensionValues?.[0]?.value || '/';
        const views = r.metricValues?.[0]?.value || '0';
        const users = r.metricValues?.[1]?.value || '0';
        const bounce = (parseFloat(r.metricValues?.[2]?.value || '0') * 100).toFixed(1) + '%';
        mdReport += `| \`${pathStr}\` | \`${views}\` | \`${users}\` | \`${bounce}\` |\n`;
      });
    }

    mdReport += `\n---\n\n`;
    mdReport += `## 🚗 3. PROCEDENCIA DEL TRÁFICO (FUENTES DE ADQUISICIÓN)\n\n`;
    mdReport += `| Fuente / Medio (\`sessionSourceMedium\`) | Usuarios Activos | Sesiones Totales |\n`;
    mdReport += `| :--- | :--- | :--- |\n`;
    if (resTraffic.rows) {
      resTraffic.rows.forEach(r => {
        const source = r.dimensionValues?.[0]?.value || 'direct / none';
        const users = r.metricValues?.[0]?.value || '0';
        const sessions = r.metricValues?.[1]?.value || '0';
        mdReport += `| \`${source}\` | \`${users}\` | \`${sessions}\` |\n`;
      });
    }

    const reportPath = path.join(process.cwd(), 'reports', 'cro-conversion-funnel.md');
    fs.writeFileSync(reportPath, mdReport, 'utf8');

    console.log(`\n✅ Análisis de embudo finalizado. Reporte exportado a: ${reportPath}`);
  } catch (err: any) {
    console.error(`❌ Error analizando embudo en GA4: ${err?.message || err}`);
  }
}

runFunnelAnalysis();
