/**
 * FASE 3: EVALUACIÓN PROS & CONS DEL ECOSISTEMA (Global Ecosystem Health Evaluator)
 * MERN SaaS Factory Analytics Optimizer Tool
 */

import { AggregatedEcosystemMetrics, ComponentIndividualDiagnosis, EcosystemProsAndCons, ProOrConItem } from './types';

export class EcosystemEvaluator {
  /**
   * Evalúa globalmente las fortalezas (pros) y fricciones (cons) numéricas del ecosistema MERN SaaS.
   */
  public evaluateEcosystem(
    portalDiag: ComponentIndividualDiagnosis,
    backendDiag: ComponentIndividualDiagnosis,
    aggregated: AggregatedEcosystemMetrics
  ): EcosystemProsAndCons {
    const pros: ProOrConItem[] = [];
    const cons: ProOrConItem[] = [];

    // 1. Evaluación de Tráfico Orgánico y SEO (Search Console)
    if (aggregated.searchConsoleSummary.avgCtrPercent >= 6.0) {
      pros.push({
        id: 'PRO_SEO_HIGH_CTR',
        type: 'pro',
        title: 'Alto Rendimiento de CTR Orgánico en Google Search Console',
        description: `El CTR promedio orgánico del ${aggregated.searchConsoleSummary.avgCtrPercent}% demuestra excelente relevancia en los snippet de los motores de búsqueda.`,
        metricOrigin: `GSC Avg CTR: ${aggregated.searchConsoleSummary.avgCtrPercent}%`,
        impactScore: 9,
      });
    }

    if (aggregated.searchConsoleSummary.avgPosition <= 15.0) {
      pros.push({
        id: 'PRO_SEO_STRONG_POSITIONING',
        type: 'pro',
        title: 'Posicionamiento Medio Sólido en Palabras Clave Principales',
        description: `La posición promedio global de #${aggregated.searchConsoleSummary.avgPosition} sitúa al portal SaaS en la primera/segunda página de resultados de búsqueda.`,
        metricOrigin: `GSC Top Query: "${aggregated.searchConsoleSummary.topQuery}" (Pos #${aggregated.searchConsoleSummary.avgPosition})`,
        impactScore: 8,
      });
    }

    // 2. Evaluación de Engagement y Retención del Portal Web
    if (portalDiag.scores.trafficHealth >= 75) {
      pros.push({
        id: 'PRO_PORTAL_ENGAGEMENT',
        type: 'pro',
        title: 'Elevada Tasa de Enganche en el Portal Web',
        description: `El ${aggregated.totals.overallEngagementRatePercent}% de los usuarios interactúan de forma activa en el portal web.`,
        metricOrigin: `Portal Engagement: ${aggregated.totals.overallEngagementRatePercent}%`,
        impactScore: 8,
      });
    }

    if (aggregated.portalFunnel.conversionRatePercent >= 4.5) {
      pros.push({
        id: 'PRO_PORTAL_CONVERSION_HEALTHY',
        type: 'pro',
        title: 'Embudo de Conversión de Sign-Up Sólido',
        description: `La tasa de conversión del CTA de landing (${aggregated.portalFunnel.conversionRatePercent}%) supera las expectativas baseline.`,
        metricOrigin: `Landing -> Sign-up CTA: ${aggregated.portalFunnel.conversionRatePercent}%`,
        impactScore: 9,
      });
    } else {
      cons.push({
        id: 'CON_PORTAL_CONVERSION_DROPOFF',
        type: 'con',
        title: 'Caída de Conversión en el Embudo de Registro del Portal',
        description: `La tasa de conversión del CTA (${aggregated.portalFunnel.conversionRatePercent}%) refleja un abandono del ${aggregated.portalFunnel.dropoffPercent}% en la landing page.`,
        metricOrigin: `Drop-off: ${aggregated.portalFunnel.dropoffPercent}%`,
        impactScore: 8,
      });
    }

    // 3. Evaluación de Errores Técnicos
    if (aggregated.errorRates.errorsPerThousandSessions > 2.0) {
      cons.push({
        id: 'CON_BACKEND_RATE_LIMITS_OR_ERRORS',
        type: 'con',
        title: 'Eventos de Error Telemetrados en Backend/Email Services',
        description: `Se detectaron ${aggregated.errorRates.backendErrorsTotal} excepciones en el backend por cada 1,000 sesiones (MailSender rate-limits y retry timeouts).`,
        metricOrigin: `Backend Errors: ${aggregated.errorRates.backendErrorsTotal} (Rate: ${aggregated.errorRates.errorsPerThousandSessions}/1k ses)`,
        impactScore: 7,
      });
    } else {
      pros.push({
        id: 'PRO_TECHNICAL_STABILITY',
        type: 'pro',
        title: 'Estabilidad Técnica y Baja Tasa de Errores Telemetrados',
        description: `Menos de 2 errores por cada 1,000 sesiones en backend y portal web.`,
        metricOrigin: `Errors per 1k sessions: ${aggregated.errorRates.errorsPerThousandSessions}`,
        impactScore: 7,
      });
    }

    // Cálculo del Score Global del Ecosistema
    const overallScore = Math.round((portalDiag.overallScore + backendDiag.overallScore) / 2);

    let overallHealthGrade: EcosystemProsAndCons['overallHealthGrade'] = 'B';
    if (overallScore >= 90) overallHealthGrade = 'A+';
    else if (overallScore >= 80) overallHealthGrade = 'A';
    else if (overallScore >= 70) overallHealthGrade = 'B';
    else if (overallScore >= 60) overallHealthGrade = 'C';
    else if (overallScore >= 50) overallHealthGrade = 'D';
    else overallHealthGrade = 'F';

    return {
      timestamp: new Date().toISOString(),
      overallHealthGrade,
      overallHealthScore: overallScore,
      pros,
      cons,
    };
  }
}
