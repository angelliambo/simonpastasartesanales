#!/usr/bin/env tsx
/**
 * MERN SaaS Factory Analytics & Search Console Extractor CLI
 * 
 * Herramienta integrada como devDependency para la extracción masiva, agregación,
 * diagnóstico y generación de planes de optimización de telemetría y SEO.
 * 
 * Comandos:
 *   yarn analytics:extract
 *   yarn analytics:digest
 */

import { ANALYTICS_CONFIG } from './config';
import { TelemetryAggregator } from './aggregator';
import { AnalyticsAnalyzer } from './analyzer';
import { EcosystemEvaluator } from './evaluator';
import { AnalyticsExtractor } from './extractor';
import { ActionPlanner } from './planner';
import { TelemetryReporter } from './reporter';
import { CliOptions } from './types';

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    days: ANALYTICS_CONFIG.defaults.daysWindow,
    dryRun: false,
    exportFormat: 'all',
    outputDir: ANALYTICS_CONFIG.defaults.reportsDir,
    help: false,
  };

  for (const arg of args) {
    if (arg.startsWith('--days=')) {
      const val = parseInt(arg.split('=')[1], 10);
      if (!isNaN(val) && val > 0) options.days = val;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg.startsWith('--export-format=')) {
      const fmt = arg.split('=')[1] as any;
      if (['all', 'json', 'md', 'none'].includes(fmt)) options.exportFormat = fmt;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
================================================================================
  MERN SAAS FACTORY ANALYTICS & SEARCH CONSOLE EXTRACTOR — GUÍA DE USO
================================================================================

Uso:
  yarn analytics:extract [opciones]
  yarn analytics:digest [opciones]

Opciones:
  --days=N              Ventana de análisis en días (Por defecto: 30).
  --dry-run             Fuerza el modo simulación local sin consultar credenciales GA4/GSC API.
  --export-format=FMT   Formato de exportación: 'all' (por defecto), 'json', 'md', 'none'.
  --help, -h            Muestra este menú de ayuda.

Variables de Entorno Opcionales para API en Vivo:
  GSC_SITE_URL                   Sitio en Search Console (ej: sc-domain:saas-factory-portal.app).
  GA4_PROPERTY_ID                ID de propiedad GA4 predeterminado.
  GA4_PORTAL_PROPERTY_ID         ID de propiedad GA4 para Portal Web.
  GOOGLE_APPLICATION_CREDENTIALS Ruta al archivo JSON de Service Account de Google Cloud.
  GA4_CLIENT_EMAIL               Email de la Service Account.
  GA4_PRIVATE_KEY                Clave privada de la Service Account.
================================================================================
  `);
}

async function main() {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  console.log(`
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   📊 MERN SAAS FACTORY ANALYTICS & SEARCH CONSOLE EXTRACTOR TOOL             │
│   Ecosistema: ${ANALYTICS_CONFIG.portal.name}                            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
  `);

  try {
    // 1. FASE 1: Extracción Masiva (GA4 + Search Console + Backend)
    const extractor = new AnalyticsExtractor();
    const rawBatch = await extractor.extractBatch(options.days, options.dryRun);

    // 2. FASE 2: Agregación Numérica
    const aggregator = new TelemetryAggregator();
    const aggregated = aggregator.aggregateMetrics(rawBatch);

    // 3. FASE 3: Análisis Individual y Anomalías
    const analyzer = new AnalyticsAnalyzer();
    const portalDiag = analyzer.analyzeComponent(rawBatch.portal);
    const backendDiag = analyzer.analyzeComponent(rawBatch.backend);

    // 4. FASE 4: Evaluación Pros & Cons
    const evaluator = new EcosystemEvaluator();
    const evaluation = evaluator.evaluateEcosystem(portalDiag, backendDiag, aggregated);

    // 5. FASE 5: Plan de Acción Técnico
    const planner = new ActionPlanner();
    const actionPlan = planner.generatePlan(evaluation);

    console.log(`\n======================================================`);
    console.log(`[CONSOLIDACIÓN Y DIAGNÓSTICO NUMÉRICO DE TELEMETRÍA]`);
    console.log(`======================================================`);

    console.log(`\n📌 TOTALES ECOSISTEMA PORTAL SAAS:`);
    console.log(`   - Usuarios Activos Totales: ${aggregated.totals.totalActiveUsers.toLocaleString()}`);
    console.log(`   - Sesiones Totales:         ${aggregated.totals.totalSessions.toLocaleString()}`);
    console.log(`   - Vistas de Página:         ${aggregated.totals.totalPageViews.toLocaleString()}`);
    console.log(`   - Engagement Rate Promedio: ${aggregated.totals.overallEngagementRatePercent}%`);
    console.log(`   - Bounce Rate Promedio:     ${aggregated.totals.overallBounceRatePercent}%`);

    console.log(`\n🔍 GOOGLE SEARCH CONSOLE (${aggregated.searchConsoleSummary.siteUrl}):`);
    console.log(`   - Clics Orgánicos Totales:  ${aggregated.searchConsoleSummary.totalClicks.toLocaleString()}`);
    console.log(`   - Impresiones Totales:      ${aggregated.searchConsoleSummary.totalImpressions.toLocaleString()}`);
    console.log(`   - CTR Promedio:             ${aggregated.searchConsoleSummary.avgCtrPercent}%`);
    console.log(`   - Posición Media:           ${aggregated.searchConsoleSummary.avgPosition}`);
    console.log(`   - Keyword Principal:        "${aggregated.searchConsoleSummary.topQuery}" (${aggregated.searchConsoleSummary.topQueryClicks} clics)`);

    console.log(`\n🛒 EMBUDO DE CONVERSIÓN PORTAL:`);
    console.log(`   - Vistas Landing:    ${aggregated.portalFunnel.landingViews.toLocaleString()}`);
    console.log(`   - Clics en CTA:       ${aggregated.portalFunnel.ctaClicks.toLocaleString()}`);
    console.log(`   - Tasa de Conversión: ${aggregated.portalFunnel.conversionRatePercent}%`);
    console.log(`   - Upgrades de Plan:   ${aggregated.portalFunnel.planUpgrades.toLocaleString()}`);

    console.log(`\n🏥 SALUD GENERAL DEL ECOSISTEMA:`);
    console.log(`   - Grado de Salud: \`${evaluation.overallHealthGrade}\` (${evaluation.overallHealthScore}/100)`);
    console.log(`   - Portal Score:   ${portalDiag.overallScore}/100`);
    console.log(`   - Backend Score:  ${backendDiag.overallScore}/100`);
    console.log(`   - Tareas Plan:    ${actionPlan.summary.totalTasks} (Urgent P0: ${actionPlan.summary.p0Count}, High P1: ${actionPlan.summary.p1Count})`);

    // 6. Exportación de Dashboards e Informes
    if (options.exportFormat !== 'none') {
      const reporter = new TelemetryReporter();
      const { jsonPath, mdPath, planJsonPath, planMdPath } = reporter.exportReports(
        rawBatch,
        aggregated,
        evaluation,
        actionPlan,
        options.outputDir
      );

      console.log(`\n------------------------------------------------------`);
      console.log(`💾 Informes de Telemetría Exportados Exitosamente:`);
      console.log(`   📄 Telemetry Markdown: file://${mdPath}`);
      console.log(`   📦 Raw JSON Data:      file://${jsonPath}`);
      console.log(`   🎯 Plan Markdown:       file://${planMdPath}`);
      console.log(`   📋 Plan JSON Data:      file://${planJsonPath}`);
      console.log(`------------------------------------------------------`);
    }

    console.log(`\n✨ Extracción masiva GA4, Search Console y Plan de Acción completados exitosamente.\n`);
  } catch (error: any) {
    console.error(`\n❌ Error ejecutando Analytics Extractor CLI:`, error);
    process.exit(1);
  }
}

main();
