/**
 * FASE 4: PLAN DE ACCIÓN AUTOMÁTICO (Automated Technical Action Plan Generator)
 * MERN SaaS Factory Analytics Optimizer Tool
 */

import { ActionPlanResult, ActionPlanTask, EcosystemProsAndCons } from './types';

export class ActionPlanner {
  /**
   * Genera el Plan de Acción Técnico estructurado dividiendo tareas estrictamente en:
   * 1. Incrementos o Mejoras de Producto (UI/UX, Conversión, Tráfico)
   * 2. Bug Fixes (Correcciones técnicas y parches de errores telemetrados)
   */
  public generatePlan(evaluation: EcosystemProsAndCons): ActionPlanResult {
    const productIncrements: ActionPlanTask[] = [];
    const bugFixes: ActionPlanTask[] = [];

    // Transformación automática de contras y fricciones en tareas del plan de acción
    for (const con of evaluation.cons) {
      if (con.id === 'CON_BACKEND_RATE_LIMITS_OR_ERRORS') {
        bugFixes.push({
          id: 'FIX_MAILSENDER_RATE_LIMIT_RETRY',
          category: 'bug_fix',
          priority: 'P0_URGENT',
          title: 'Implementar Exponential Backoff y Rate-Limiter Resiliente para MailSender API',
          description: 'Añadir cola de reintentos asíncrona con backoff exponencial para evitar fallos de envío de correos cuando la API de MailSender alcance el límite de cuota.',
          targetComponent: 'backend',
          justification: con.description,
          estimatedImpact: 'Eliminación del 100% de errores silenciosos en la entrega de códigos de verificación por correo.',
          suggestedFiles: [
            'packages/portal/backend/services/mailSenderService.ts',
            'packages/portal/backend/config/mail.ts',
          ],
        });

        bugFixes.push({
          id: 'FIX_MONGODB_RETRY_CONFIG',
          category: 'bug_fix',
          priority: 'P1_HIGH',
          title: 'Optimización de Reintentos de Conexión en Mongoose DB Middleware',
          description: 'Refactorizar el middleware de conexión a MongoDB en `config/db.ts` para manejar micro-desconexiones con reconexión transparente.',
          targetComponent: 'backend',
          justification: 'Ocurrencia telemetrada de micro-desconexiones en base de datos.',
          estimatedImpact: 'Garantía del 99.9% de disponibilidad en endpoints protegidos por JWT.',
          suggestedFiles: ['packages/portal/backend/config/db.ts'],
        });
      }

      if (con.id === 'CON_PORTAL_CONVERSION_DROPOFF') {
        productIncrements.push({
          id: 'INC_PORTAL_LANDING_CRO_OPTIMIZATION',
          category: 'product_increment',
          priority: 'P1_HIGH',
          title: 'Optimización de Conversión (CRO) y Micro-animaciones en Hero Section',
          description: 'Rediseñar el CTA principal del Hero en el portal web incorporando animaciones fluidas de `@design-sys` y reduciendo los pasos del formulario de registro.',
          targetComponent: 'portal',
          justification: con.description,
          estimatedImpact: 'Aumento estimado de +2.5% en la tasa de conversión global de la landing page.',
          suggestedFiles: [
            'packages/portal/frontend/src/pages/HomePage/HeroSection.tsx',
            'packages/shared/src/design-sys/atoms/Button/index.tsx',
          ],
        });
      }
    }

    // Tareas adicionales recomendadas por defecto si el plan requiere mantenimiento proactivo
    if (productIncrements.length === 0) {
      productIncrements.push({
        id: 'INC_SEO_STRUCTURED_DATA_SCHEMA',
        category: 'product_increment',
        priority: 'P2_MEDIUM',
        title: 'Implementar Schema.org JSON-LD para Búsqueda Enriquecida de Google',
        description: 'Agregar etiquetas semánticas de Schema.org (SoftwareApplication, Organization) en el header del portal frontend para capturar fragmentos enriquecidos en GSC.',
        targetComponent: 'portal',
        justification: 'Maximización del CTR orgánico capturado en Google Search Console.',
        estimatedImpact: '+1.5% CTR adicional en resultados de búsqueda.',
        suggestedFiles: [
          'packages/portal/frontend/public/index.html',
          'packages/portal/backend/middleware/seoMiddleware.ts',
        ],
      });
    }

    if (bugFixes.length === 0) {
      bugFixes.push({
        id: 'FIX_I18N_MISSING_FALLBACKS_AUDIT',
        category: 'bug_fix',
        priority: 'P2_MEDIUM',
        title: 'Auditoría y Sincronización Automática de Claves i18n Faltantes',
        description: 'Correr la suite `yarn audit:i18n` para garantizar que todas las claves en castellano estén presentes en los 7 idiomas regionales.',
        targetComponent: 'shared',
        justification: 'Mantenimiento preventivo contra llaves de idioma faltantes en producción.',
        estimatedImpact: 'Garantía del 100% de cobertura en la internacionalización.',
        suggestedFiles: ['packages/shared/src/i18n/index.ts'],
      });
    }

    const p0Count = bugFixes.filter((t) => t.priority === 'P0_URGENT').length;
    const p1Count = [...productIncrements, ...bugFixes].filter((t) => t.priority === 'P1_HIGH').length;

    return {
      timestamp: new Date().toISOString(),
      summary: {
        totalTasks: productIncrements.length + bugFixes.length,
        productIncrementsCount: productIncrements.length,
        bugFixesCount: bugFixes.length,
        p0Count,
        p1Count,
      },
      productIncrements,
      bugFixes,
    };
  }
}
