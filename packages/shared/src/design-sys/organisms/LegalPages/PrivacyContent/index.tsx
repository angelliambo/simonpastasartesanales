import React from 'react';
import { CONTACT_EMAIL } from '../shared/contact';
import {
  Page, Section, Title, Subtitle, SectionTitle, SectionSubtitle,
  Paragraph, List, ListItem,
} from '../shared/styles';

const privacyData = {
  updatedAt: '21 de mayo de 2026',
  sections: [
    {
      id: 'controller', title: '1. Responsable del Tratamiento',
      paragraphs: ['El responsable del tratamiento de sus datos personales es Angel Liambo, quien puede ser contactado a través del correo electrónico:', CONTACT_EMAIL, 'El tratamiento de datos se realiza de acuerdo con lo establecido en el Reglamento General de Protección de Datos (GDPR) de la Unión Europea, la Ley de Protección de Datos Personales de Argentina (Ley 25.326) y demás normativas aplicables.'],
    },
    {
      id: 'data-collected', title: '2. Datos Recopilados',
      subtitle: '2.1 Datos que usted proporciona',
      paragraphs: ['Al utilizar ZenithNexus, recopilamos los siguientes datos:'],
      list: [
        'Dirección de correo electrónico: obtenida de su cuenta de Google a través de chrome.identity.getProfileUserInfo(), almacenada de forma encriptada (AES-256-GCM) y con hash (SHA-256).',
        'Nombre de pila: extraído de su dirección de correo electrónico, almacenado de forma encriptada (AES-256-GCM).',
        'Identificador único de Google (Google ID): utilizado para asociar su cuenta.',
        'Información de licencia: plan contratado, fecha de inicio y fin de la suscripción.',
      ],
      subtitle2: '2.2 Datos recopilados automáticamente',
      paragraphs2: ['Utilizamos Google Analytics para recopilar datos anónimos de uso, incluyendo:'],
      list2: ['Páginas visitadas dentro de la Extensión y el Portal.', 'Funcionalidades utilizadas (lectura, dictado, etc.).', 'Duración de las sesiones.', 'Estos datos son anónimos y no permiten identificar personalmente al usuario.'],
    },
    {
      id: 'purpose', title: '3. Finalidad del Tratamiento',
      subtitle: 'Sus datos personales son tratados con las siguientes finalidades:',
      list: ['Prestar y mantener el servicio de lectura y dictado por voz.', 'Gestionar licencias, suscripciones y pagos a través de LemonSqueezy.', 'Enviar comunicaciones relacionadas con el servicio (confirmación de tickets, códigos de verificación, notificaciones de cambios en los términos).', 'Mejorar la Extensión y el Portal mediante análisis anónimos de uso.', 'Cumplir con obligaciones fiscales y contables.'],
    },
    {
      id: 'legal-basis', title: '4. Base Legal del Tratamiento',
      paragraphs: ['El tratamiento de sus datos se basa en las siguientes bases legales:'],
      list: ['Ejecución del servicio: el tratamiento es necesario para prestar las funcionalidades solicitadas (lectura, dictado, gestión de licencias).', 'Consentimiento: al aceptar estos términos, usted consiente el tratamiento de sus datos para las finalidades descritas.', 'Obligación legal: el tratamiento de datos fiscales y contables es necesario para cumplir con obligaciones legales (Ley 25.326, GDPR Art. 6(1)(c)).', 'Interés legítimo: el análisis anónimo de uso constituye un interés legítimo del Proveedor para mejorar el servicio.'],
    },
    {
      id: 'recipients', title: '5. Destinatarios de los Datos',
      paragraphs: ['Sus datos pueden ser compartidos con los siguientes terceros:'],
      list: ['LemonSqueezy: procesamiento de pagos y gestión de suscripciones. Datos compartidos: correo electrónico, nombre, ID de cliente.', 'Google (Google Analytics): análisis anónimo de uso del servicio. Datos compartidos: datos anónimos de navegación.', 'SendGrid: envío de correos electrónicos transaccionales (confirmaciones, códigos de verificación). Datos compartidos: correo electrónico.'],
      paragraphsAfter: ['El Proveedor no vende, alquila ni comparte datos personales con terceros para fines de marketing directo.'],
    },
    {
      id: 'international', title: '6. Transferencias Internacionales',
      paragraphs: ['Sus datos pueden ser transferidos y procesados en países fuera de su país de residencia, incluyendo Estados Unidos (servidores de LemonSqueezy, Google y SendGrid).', 'Dichas transferencias se realizan bajo las garantías adecuadas establecidas por el GDPR, incluyendo las Cláusulas Contractuales Tipo (SCCs) y el Escudo de Privacidad UE-EEUU, según corresponda.'],
    },
    {
      id: 'retention', title: '7. Conservación de los Datos',
      paragraphs: ['Conservamos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política:'],
      list: ['Datos de cuenta (email, nombre): mientras la cuenta esté activa.', 'Datos de licencia y facturación: 7 años después de la finalización de la suscripción, por obligaciones fiscales y contables.', 'Datos anónimos de uso: 26 meses (período establecido por Google Analytics).'],
      paragraphsAfter: ['Una vez cumplido el período de conservación, los datos son eliminados o anonimizados de forma irreversible.'],
    },
    {
      id: 'rights', title: '8. Derechos del Usuario',
      paragraphs: ['Usted tiene derecho a:'],
      list: ['Acceso: solicitar una copia de los datos personales que tenemos sobre usted (GDPR Art. 15).', 'Rectificación: solicitar la corrección de datos inexactos (GDPR Art. 16).', 'Eliminación: solicitar la eliminación de sus datos personales (GDPR Art. 17). Sujeto a las limitaciones establecidas en la sección 7.', 'Limitación del tratamiento: solicitar la restricción del procesamiento de sus datos (GDPR Art. 18).', 'Portabilidad: solicitar la transferencia de sus datos a otro proveedor (GDPR Art. 20).', 'Oposición: oponerse al tratamiento de sus datos para fines de marketing directo (GDPR Art. 21).'],
      paragraphsAfter: ['Para ejercer cualquiera de estos derechos, contáctenos a través de:', `Correo electrónico: ${CONTACT_EMAIL}`, 'Nos comprometemos a responder a su solicitud en un plazo máximo de 30 días.'],
    },
    {
      id: 'security', title: '9. Seguridad de los Datos',
      paragraphs: ['Implementamos las siguientes medidas de seguridad para proteger sus datos:'],
      list: ['Encriptación AES-256-GCM para datos personales almacenados (nombre, email).', 'Hash SHA-256 para identificadores de búsqueda (email).', 'Hash bcrypt para contraseñas (10 rondas).', 'Transmisión de datos mediante HTTPS/TLS.', 'Acceso restringido a la base de datos mediante autenticación y autorización.'],
    },
    {
      id: 'dpocontact', title: '10. Contacto del Delegado de Protección de Datos',
      paragraphs: ['Para cualquier consulta relacionada con la protección de sus datos personales, puede contactar a:', 'Angel Liambo', `Correo electrónico: ${CONTACT_EMAIL}`, 'Responderemos a su consulta en un plazo máximo de 30 días.'],
    },
    {
      id: 'complaints', title: '11. Reclamaciones ante Autoridades de Control',
      paragraphs: ['Si considera que el tratamiento de sus datos personales infringe la normativa de protección de datos aplicable, tiene derecho a presentar una reclamación ante la autoridad de control correspondiente:'],
      list: ['En Argentina: Agencia de Acceso a la Información Pública (AAIP) — https://www.argentina.gob.ar/aaip', 'En la Unión Europea: autoridad de protección de datos del país donde resida habitualmente.'],
    },
  ],
};

export const PrivacyContent: React.FC = () => {
  return (
    <Page>
      <Title>Política de Privacidad</Title>
      <Subtitle>Última actualización: {privacyData.updatedAt}</Subtitle>

      {privacyData.sections.map((section) => (
        <Section key={section.id}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.subtitle && <SectionSubtitle>{section.subtitle}</SectionSubtitle>}
          {section.paragraphs?.map((p, i) => (
            <Paragraph key={`p-${i}`}>{p === CONTACT_EMAIL ? <strong>{p}</strong> : p}</Paragraph>
          ))}
          {section.list && (
            <List>{section.list.map((item, i) => <ListItem key={`l-${i}`}>{item}</ListItem>)}</List>
          )}
          {section.subtitle2 && <SectionSubtitle>{section.subtitle2}</SectionSubtitle>}
          {section.paragraphs2?.map((p, i) => <Paragraph key={`p2-${i}`}>{p}</Paragraph>)}
          {section.list2 && (
            <List>{section.list2.map((item, i) => <ListItem key={`l2-${i}`}>{item}</ListItem>)}</List>
          )}
          {section.paragraphsAfter?.map((p, i) => (
            <Paragraph key={`pa-${i}`}>{p === CONTACT_EMAIL ? <strong>{p}</strong> : p}</Paragraph>
          ))}
        </Section>
      ))}
    </Page>
  );
};

export default PrivacyContent;
