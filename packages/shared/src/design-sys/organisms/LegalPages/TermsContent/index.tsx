import React from 'react';
import { BRAND_CONFIG } from '../../../../config/brand';
import {
  Page, Section, Title, Subtitle, SectionTitle,
  Paragraph, List, ListItem,
} from '../shared/styles';

export const TermsContent: React.FC = () => {
  const supportEmail = BRAND_CONFIG.supportEmail;
  const siteName = BRAND_CONFIG.siteName;

  const termsData = {
    updatedAt: '21 de mayo de 2026',
    sections: [
      {
        id: 'acceptance',
        title: '1. Aceptación de los Términos',
        paragraphs: [
          `Al registrarse, acceder o utilizar ${siteName} (en adelante, "la Plataforma" o "el Portal"), usted acepta estar sujeto a estos Términos y Condiciones de Uso. Si no está de acuerdo con alguno de estos términos, debe dejar de utilizar los servicios inmediatamente.`,
          `${siteName} es una plataforma SaaS que proporciona servicios y herramientas modulares para startups y proyectos web, ofrecida por su Proveedor.`,
        ],
      },
      {
        id: 'description',
        title: '2. Descripción del Servicio',
        paragraphs: [`${siteName} ofrece las siguientes funcionalidades y características según el plan configurado:`],
        list: [
          'Autenticación Unificada: Permite crear cuentas mediante credenciales locales o Google OAuth de forma segura.',
          'Panel de Control Inteligente: Proporciona métricas, paneles de usuario y control de accesos.',
          'Facturación y Pagos: Habilita el control de suscripciones y facturas procesadas mediante integraciones seguras.',
          'Soporte Técnico: Sistema de ticketing para atención al usuario.',
        ],
        paragraphsAfter: ['El Proveedor se reserva el derecho de actualizar, suspender o descontinuar temporalmente cualquier módulo o funcionalidad con fines de mantenimiento.'],
      },
      {
        id: 'plans',
        title: '3. Planes de Suscripción',
        paragraphs: [`${siteName} ofrece distintos planes de acuerdo a sus necesidades:`],
        list: [
          'Plan Gratuito: Acceso limitado a las características estándar e introductorias.',
          'Planes Premium (Semestral o Anual): Acceso extendido a analíticas, soporte técnico avanzado y mayor capacidad en la nube.',
        ],
        paragraphsAfter: ['El Proveedor se reserva el derecho de modificar los precios y las condiciones de los planes notificando a los usuarios registrados con antelación razonable.'],
      },
      {
        id: 'payments',
        title: '4. Pagos y Facturación',
        paragraphs: [
          'Los pagos de los planes premium se procesan de forma externa mediante pasarelas de pago integradas y certificadas. No almacenamos datos de tarjetas de crédito.',
          'Al contratar una suscripción premium, usted acepta las condiciones de servicio y facturación del procesador externo de pagos contratado.',
        ],
      },
      {
        id: 'refunds',
        title: '5. Cancelaciones y Reembolsos',
        paragraphs: [
          'Usted puede cancelar su suscripción premium en cualquier momento desde su panel de control del usuario.',
          'Las políticas de reembolso y disputas asociadas a la facturación se gestionan de conformidad con las políticas del procesador de pagos externo y las leyes comerciales aplicables.',
        ],
      },
      {
        id: 'intellectual',
        title: '6. Propiedad Intelectual',
        paragraphs: [
          `${siteName}, sus logotipos, diseño y código fuente son propiedad exclusiva de su Proveedor y creador original.`,
          'El registro o suscripción no transfiere ningún derecho de propiedad sobre el software. Se otorga una licencia de uso limitada, no exclusiva, intransferible y revocable.',
        ],
      },
      {
        id: 'liability',
        title: '7. Limitación de Responsabilidad',
        paragraphs: [
          'La plataforma se entrega "tal cual", sin garantías de ningún tipo, explícitas o implícitas.',
          'El Proveedor no se responsabiliza de daños directos, indirectos, incidentales o lucro cesante derivados del uso o de la imposibilidad de usar el portal.',
        ],
      },
      {
        id: 'termination',
        title: '8. Terminación del Servicio',
        paragraphs: [
          'El Proveedor puede suspender de inmediato el acceso a los servicios de la plataforma si se detectan violaciones de propiedad intelectual, fraude en transacciones o actividades delictivas asociadas al usuario.',
        ],
      },
      {
        id: 'jurisdiction',
        title: '9. Ley Aplicable y Jurisdicción',
        paragraphs: [
          'Estos Términos se rigen por las leyes vigentes de la jurisdicción de sede del Proveedor.',
        ],
      },
      {
        id: 'contact',
        title: '10. Contacto y Reclamaciones',
        paragraphs: [`Para consultas sobre la plataforma o reclamaciones sobre el servicio, contáctenos directamente a la dirección de soporte:`],
        list: [
          `Correo electrónico oficial: ${supportEmail}`,
          'Formulario de contacto: disponible en la sección de Soporte en su dashboard.',
        ],
      },
    ],
  };

  return (
    <Page>
      <Title>Términos y Condiciones de Uso</Title>
      <Subtitle>Última actualización: {termsData.updatedAt}</Subtitle>

      {termsData.sections.map((section) => (
        <Section key={section.id}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.paragraphs?.map((p, i) => <Paragraph key={`p-${i}`}>{p}</Paragraph>)}
          {section.list && (
            <List>
              {section.list.map((item, i) => <ListItem key={`l-${i}`}>{item}</ListItem>)}
            </List>
          )}
          {section.paragraphsAfter?.map((p, i) => <Paragraph key={`pa-${i}`}>{p}</Paragraph>)}
        </Section>
      ))}
    </Page>
  );
};

export default TermsContent;

