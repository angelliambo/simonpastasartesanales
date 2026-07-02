import React from 'react';
import type { TFunction } from '../shared/types';
import { CONTACT_EMAIL } from '../shared/contact';
import {
  Page, Section, Title, Subtitle, SectionTitle,
  Paragraph, List, ListItem,
} from '../shared/styles';

interface TermsContentProps {
  t?: TFunction;
}

const termsData = {
  updatedAt: '21 de mayo de 2026',
  sections: [
    {
      id: 'acceptance',
      title: '1. Aceptación de los Términos',
      paragraphs: [
        'Al instalar, acceder o utilizar ZenithNexus (en adelante, "la Extensión"), usted acepta estar sujeto a estos Términos y Condiciones de Uso. Si no está de acuerdo con alguno de estos términos, no debe instalar ni utilizar la Extensión.',
        'ZenithNexus es una extensión de navegador que proporciona funcionalidades de lectura de texto en voz alta (TTS) y dictado por voz (STT), ofrecida por Angel Liambo (en adelante, "el Proveedor").',
      ],
    },
    {
      id: 'description',
      title: '2. Descripción del Servicio',
      paragraphs: ['ZenithNexus ofrece las siguientes funcionalidades:'],
      list: [
        'Lector de texto seleccionado: lee en voz alta el texto que el usuario selecciona en cualquier página web.',
        'Subtítulos de lectura: muestra el texto narrado en pantalla durante la lectura.',
        'Narrador de página completa: lee en voz alta el contenido completo de una página web.',
        'Dictado por voz: convierte la voz del usuario en texto para su inserción en campos de texto, formularios y editores.',
        'Resaltado de texto: resalta visualmente el texto que se está leyendo.',
        'Lectura en PDF: permite utilizar las funcionalidades de lectura dentro de archivos PDF.',
      ],
      paragraphsAfter: ['El Proveedor se reserva el derecho de modificar, suspender o descontinuar cualquier funcionalidad en cualquier momento, con o sin previo aviso.'],
    },
    {
      id: 'plans',
      title: '3. Planes Gratuitos y de Pago',
      paragraphs: ['ZenithNexus ofrece los siguientes planes:'],
      list: [
        'Plan Gratuito ("Free"): incluye acceso ilimitado al Lector de texto seleccionado y a los Subtítulos de lectura.',
        'Plan Semestral ("6 meses"): incluye Dictado ilimitado, Narrador de página completa, Resaltado de texto y Lectura en PDF, sin interrupciones.',
        'Plan Anual ("12 meses"): incluye todas las funcionalidades del plan semestral, más Soporte VIP prioritario y Acceso anticipado a nuevas funcionalidades.',
      ],
      paragraphsAfter: ['El Proveedor se reserva el derecho de modificar los planes, precios y funcionalidades incluidas en cualquier momento, notificando los cambios con antelación razonable.'],
    },
    {
      id: 'payments',
      title: '4. Pagos y Facturación',
      paragraphs: [
        'Los pagos de los planes de pago son procesados a través de LemonSqueezy, un servicio de procesamiento de pagos de terceros. El Proveedor no almacena ni procesa directamente información de tarjetas de crédito o débito.',
        'Al adquirir un plan de pago, usted acepta los términos de servicio y la política de privacidad de LemonSqueezy.',
        'Todos los precios están expresados en dólares estadounidenses (USD) e incluyen los impuestos aplicables, según lo determine LemonSqueezy.',
        'La facturación se realiza al inicio de cada período de suscripción (semestral o anual, según el plan elegido) y se procesa en el momento de la compra.',
      ],
    },
    {
      id: 'refunds',
      title: '5. Política de Cancelación y Reembolsos',
      paragraphs: [
        'Puede cancelar su suscripción en cualquier momento desde su panel de control en LemonSqueezy. La cancelación no genera reembolsos automáticos.',
        'LemonSqueezy maneja los reembolsos directamente. Si considera que tiene derecho a un reembolso, debe solicitarlo a través de LemonSqueezy dentro de los primeros 60 días posteriores a la compra, sujeto a su política de reembolsos.',
        'Una vez cancelada la suscripción, continuará teniendo acceso a las funcionalidades del plan de pago hasta el final del período facturado actual.',
      ],
    },
    {
      id: 'intellectual',
      title: '6. Propiedad Intelectual',
      paragraphs: [
        'ZenithNexus, su logotipo, nombre, diseño y código fuente son propiedad exclusiva del Proveedor, a menos que se indique lo contrario.',
        'El usuario no adquiere ningún derecho de propiedad intelectual sobre la Extensión. Se concede una licencia limitada, no exclusiva, intransferible y revocable para usar la Extensión de acuerdo con estos Términos.',
        'El contenido generado por el usuario a través del dictado por voz es propiedad del usuario. El Proveedor no reclama derechos sobre dicho contenido.',
      ],
    },
    {
      id: 'liability',
      title: '7. Limitación de Responsabilidad',
      paragraphs: [
        'La Extensión se proporciona "tal cual", sin garantías de ningún tipo, expresas o implícitas.',
        'El Proveedor no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que surjan del uso o la imposibilidad de usar la Extensión.',
        'El Proveedor no garantiza que la Extensión sea ininterrumpida, libre de errores o que cumpla con requisitos específicos del usuario.',
        'La precisión del reconocimiento de voz depende de factores externos como la calidad del micrófono, el acento del usuario, el ruido ambiental y el motor de reconocimiento de voz del navegador. El Proveedor no garantiza una precisión del 100%.',
      ],
    },
    {
      id: 'termination',
      title: '8. Terminación del Servicio',
      paragraphs: [
        'El Proveedor se reserva el derecho de terminar o suspender el acceso a la Extensión en cualquier momento, sin previo aviso, por violación de estos Términos o por cualquier otra razón.',
        'En caso de terminación, el usuario perderá el acceso a las funcionalidades de pago. No se realizarán reembolsos por períodos no utilizados, excepto según lo establecido en la política de reembolsos de LemonSqueezy.',
      ],
    },
    {
      id: 'jurisdiction',
      title: '9. Ley Aplicable y Jurisdicción',
      paragraphs: [
        'Estos Términos se rigen por las leyes de la República Argentina.',
        'Cualquier disputa relacionada con estos Términos será resuelta en los tribunales de la Ciudad Autónoma de Buenos Aires, Argentina.',
        'Si usted reside fuera de Argentina, acepta someterse a la jurisdicción de dichos tribunales.',
      ],
    },
    {
      id: 'contact',
      title: '10. Contacto y Reclamaciones',
      paragraphs: ['Para cualquier consulta, reclamo o solicitud relacionada con estos Términos o con la Extensión, puede contactarnos a través de:'],
      list: [
        `Correo electrónico: ${CONTACT_EMAIL}`,
        'Formulario de contacto: disponible en la sección de Soporte de la Extensión y del Portal web.',
      ],
      paragraphsAfter: ['Nos comprometemos a responder a su consulta o reclamo en un plazo máximo de 15 días hábiles.'],
    },
    {
      id: 'modifications',
      title: '11. Modificaciones de los Términos',
      paragraphs: [
        'El Proveedor se reserva el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor al ser publicadas.',
        'Si las modificaciones son sustanciales, se notificará a los usuarios a través de la Extensión o por correo electrónico. El uso continuado de la Extensión después de dichas modificaciones constituye la aceptación de los nuevos términos.',
        'Se recomienda revisar periódicamente estos Términos para estar al tanto de cualquier cambio.',
      ],
    },
  ],
};

export const TermsContent: React.FC<TermsContentProps> = () => {
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
