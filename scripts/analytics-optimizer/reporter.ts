/**
 * MÓDULO COMPILADOR Y EXPORTADOR DE INFORMES DE TELEMETRÍA Y SEARCH CONSOLE
 * MERN SaaS Factory Analytics & Search Console Extractor
 */

import fs from 'fs';
import path from 'path';
import { ANALYTICS_CONFIG } from './config';
import { ActionPlanResult, AggregatedEcosystemMetrics, BatchExtractionResult, EcosystemProsAndCons } from './types';

export class TelemetryReporter {
  /**
   * Exporta los informes numéricos consolidados a archivos JSON y Markdown.
   */
  public exportReports(
    rawBatch: BatchExtractionResult,
    aggregated: AggregatedEcosystemMetrics,
    evaluation: EcosystemProsAndCons,
    actionPlan: ActionPlanResult,
    outputDir: string = ANALYTICS_CONFIG.defaults.reportsDir
  ): { jsonPath: string; mdPath: string; planJsonPath: string; planMdPath: string } {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const jsonPath = path.join(outputDir, ANALYTICS_CONFIG.defaults.jsonReportName);
    const mdPath = path.join(outputDir, ANALYTICS_CONFIG.defaults.mdReportName);
    const planJsonPath = path.join(outputDir, ANALYTICS_CONFIG.defaults.jsonPlanName);
    const planMdPath = path.join(outputDir, ANALYTICS_CONFIG.defaults.mdPlanName);

    // 1. Raw Telemetry + Aggregated JSON Report
    fs.writeFileSync(jsonPath, JSON.stringify({ aggregated, rawBatch }, null, 2), 'utf-8');

    // 2. Markdown Telemetry Digest
    const mdContent = this.renderMarkdownDigest(rawBatch, aggregated, evaluation);
    fs.writeFileSync(mdPath, mdContent, 'utf-8');

    // 3. Action Plan JSON Report
    fs.writeFileSync(planJsonPath, JSON.stringify(actionPlan, null, 2), 'utf-8');

    // 4. Action Plan Markdown Report
    const planMdContent = this.renderMarkdownPlan(actionPlan, evaluation);
    fs.writeFileSync(planMdPath, planMdContent, 'utf-8');

    return { jsonPath, mdPath, planJsonPath, planMdPath };
  }

  /**
   * Genera el informe Markdown cuantitativo digestivo.
   */
  private renderMarkdownDigest(
    rawBatch: BatchExtractionResult,
    aggregated: AggregatedEcosystemMetrics,
    evaluation: EcosystemProsAndCons
  ): string {
    const { portal, backend, searchConsole } = rawBatch;

    return `# 📈 Resumen Digestivo de Telemetría y Métricas — MERN SaaS Factory Portal

**Fecha de Extracción:** ${new Date(rawBatch.timestamp).toLocaleString()}  
**Rango de Fechas:** \`${rawBatch.dateRange.startDate}\` a \`${rawBatch.dateRange.endDate}\`  
**Grado de Salud Global:** \`${evaluation.overallHealthGrade}\` (${evaluation.overallHealthScore}/100)  
**Origen de Datos:** ${rawBatch.isSimulated ? '⚠️ Telemetría Simulada Local / Entorno de Pruebas' : '✅ API GA4 & GSC en Vivo (Google Cloud Auth)'}

---

## 📊 1. RESUMEN EJECUTIVO Y TOTALES DEL ECOSISTEMA

| Métrica | Valor Total Portal SaaS |
| :--- | :--- |
| **Usuarios Activos Totales** | \`${aggregated.totals.totalActiveUsers.toLocaleString()}\` |
| **Sesiones Totales** | \`${aggregated.totals.totalSessions.toLocaleString()}\` |
| **Vistas de Página Totales** | \`${aggregated.totals.totalPageViews.toLocaleString()}\` |
| **Tasa de Enganche Promedio (Engagement)** | \`${aggregated.totals.overallEngagementRatePercent}%\` |
| **Tasa de Rebote Promedio** | \`${aggregated.totals.overallBounceRatePercent}%\` |
| **Clics Orgánicos Totales (Search Console)** | \`${aggregated.searchConsoleSummary.totalClicks.toLocaleString()}\` |
| **Impresiones Totales (Search Console)** | \`${aggregated.searchConsoleSummary.totalImpressions.toLocaleString()}\` |
| **Tasa de Errores por 1.000 Sesiones** | \`${aggregated.errorRates.errorsPerThousandSessions}\` |

---

## 🔍 2. RENDIMIENTO DE BÚSQUEDA ORGÁNICA (GOOGLE SEARCH CONSOLE)

**Propiedad / Dominio GSC:** \`${searchConsole.siteUrl}\`  
**Clics Orgánicos Totales:** \`${searchConsole.totals.clicks.toLocaleString()}\` | **Impresiones:** \`${searchConsole.totals.impressions.toLocaleString()}\` | **CTR Promedio:** \`${searchConsole.totals.avgCtrPercent}%\` | **Posición Media:** \`${searchConsole.totals.avgPosition}\`

### Top Palabras Clave de Búsqueda (Keywords)
| Término de Búsqueda (Query) | Clics | Impresiones | CTR (%) | Posición Media |
| :--- | :--- | :--- | :--- | :--- |
${searchConsole.topQueries
  .map((q) => `| **${q.query}** | \`${q.clicks.toLocaleString()}\` | \`${q.impressions.toLocaleString()}\` | \`${q.ctrPercent}%\` | \`${q.position}\` |`)
  .join('\n')}

---

## 🌐 3. METRICAS POR COMPONENTE (PORTAL VS BACKEND API)

| Métrica | Portal Web (${portal.componentName}) | Backend Services (${backend.componentName}) |
| :--- | :--- | :--- |
| **ID de Medición / Endpoint** | \`${portal.measurementId}\` | \`${backend.measurementId}\` |
| **Usuarios Activos** | \`${portal.metrics.activeUsers.toLocaleString()}\` | \`${backend.metrics.activeUsers.toLocaleString()}\` |
| **Nuevos Usuarios** | \`${portal.metrics.newUsers.toLocaleString()}\` | \`${backend.metrics.newUsers.toLocaleString()}\` |
| **Sesiones Totales** | \`${portal.metrics.sessions.toLocaleString()}\` | \`${backend.metrics.sessions.toLocaleString()}\` |
| **Vistas de Página / Peticiones API** | \`${portal.metrics.pageViews.toLocaleString()}\` | \`${backend.metrics.pageViews.toLocaleString()}\` |
| **Tasa de Enganche (Engagement Rate)** | \`${Math.round(portal.metrics.engagementRate * 100)}%\` | \`${Math.round(backend.metrics.engagementRate * 100)}%\` |
| **Tasa de Rebote (Bounce Rate)** | \`${Math.round(portal.metrics.bounceRate * 100)}%\` | \`${Math.round(backend.metrics.bounceRate * 100)}%\` |
| **Eventos de Error Telemetrados** | \`${portal.metrics.telemetryErrorEvents || 0}\` | \`${backend.metrics.telemetryErrorEvents || 0}\` |

---

## 🛒 4. EMBUDO DE CONVERSIÓN DEL PORTAL
- **Vistas de Landing Page:** \`${aggregated.portalFunnel.landingViews.toLocaleString()}\`
- **Clics en CTA de Registro:** \`${aggregated.portalFunnel.ctaClicks.toLocaleString()}\`
- **Tasa de Conversión Landing → CTA:** **\`${aggregated.portalFunnel.conversionRatePercent}%\`**
- **Upgrades de Plan Completados:** \`${aggregated.portalFunnel.planUpgrades.toLocaleString()}\`

---

## 🛠️ 5. TELEMETRÍA DE ERRORES Y EXCEPCIONES TÉCNICAS

### Backend API
${backend.errorTelemetry
  .map((e) => `- **${e.errorType}:** \`${e.count}\` ocurrencias (Último evento: *${new Date(e.lastOccurred).toLocaleString()}*)`)
  .join('\n')}

### Portal Web Frontend
${portal.errorTelemetry
  .map((e) => `- **${e.errorType}:** \`${e.count}\` ocurrencias (Último evento: *${new Date(e.lastOccurred).toLocaleString()}*)`)
  .join('\n')}

---
*Informe cuantitativo compilado automáticamente por MERN SaaS Factory Telemetry Extractor (yarn analytics:extract)*
`;
  }

  /**
   * Genera el informe Markdown del Plan de Acción Técnico.
   */
  private renderMarkdownPlan(actionPlan: ActionPlanResult, evaluation: EcosystemProsAndCons): string {
    return `# 🎯 Plan de Acción Técnico y Optimizaciones — MERN SaaS Factory

**Salud del Ecosistema:** \`${evaluation.overallHealthGrade}\` (${evaluation.overallHealthScore}/100)  
**Total de Tareas Propuestas:** \`${actionPlan.summary.totalTasks}\` (Urgent P0: \`${actionPlan.summary.p0Count}\`, High P1: \`${actionPlan.summary.p1Count}\`)

---

## 🚀 1. INCREMENTOS DE PRODUCTO (UI/UX, CONVERSIÓN, SEO)

${actionPlan.productIncrements
  .map(
    (t) => `### [${t.priority}] ${t.title} (\`${t.id}\`)
- **Componente Objetivo:** \`${t.targetComponent}\`
- **Descripción:** ${t.description}
- **Justificación Telemetrada:** ${t.justification}
- **Impacto Estimado:** *${t.estimatedImpact}*
- **Archivos a Modificar:**
${t.suggestedFiles.map((f) => `  - \`${f}\``).join('\n')}
`
  )
  .join('\n')}

---

## 🐛 2. BUG FIXES Y PARCHES TÉCNICOS

${actionPlan.bugFixes
  .map(
    (t) => `### [${t.priority}] ${t.title} (\`${t.id}\`)
- **Componente Objetivo:** \`${t.targetComponent}\`
- **Descripción:** ${t.description}
- **Justificación Telemetrada:** ${t.justification}
- **Impacto Estimado:** *${t.estimatedImpact}*
- **Archivos a Modificar:**
${t.suggestedFiles.map((f) => `  - \`${f}\``).join('\n')}
`
  )
  .join('\n')}

---
*Plan de acción generado automáticamente por MERN SaaS Factory Analytics Optimizer*
`;
  }
}
