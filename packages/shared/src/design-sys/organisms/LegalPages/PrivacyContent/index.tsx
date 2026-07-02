import React from 'react';
import { BRAND_CONFIG } from '../../../../config/brand';
import {
  Page, Section, Title, Subtitle, SectionTitle, SectionSubtitle,
  Paragraph, List, ListItem,
} from '../shared/styles';

export const PrivacyContent: React.FC = () => {
  const supportEmail = BRAND_CONFIG.supportEmail;
  const siteName = BRAND_CONFIG.siteName;

  const privacyData = {
    updatedAt: '21 de mayo de 2026',
    sections: [
      {
        id: 'controller', title: '1. Responsable del Tratamiento',
        paragraphs: ['El responsable del tratamiento de sus datos personales es el Proveedor de la plataforma, quien puede ser contactado a través del correo electrónico de soporte:', supportEmail, 'El tratamiento de datos se realiza de acuerdo con las normativas internacionales de protección de datos aplicables.'],
      },
      {
        id: 'data-collected', title: '2. Datos Recopilados',
        subtitle: '2.1 Datos que usted proporciona',
        paragraphs: [`Al utilizar ${siteName}, recopilamos los siguientes datos:`],
        list: [
          'Dirección de correo electrónico: obtenida al registrarse con correo o autenticación de terceros.',
          'Nombre de usuario y foto de perfil: provistos por el proveedor de autenticación o ingresados manualmente.',
          'Información de licencia y suscripción: plan contratado y estado de la cuenta.',
        ],
        subtitle2: '2.2 Datos recopilados automáticamente',
        paragraphs2: ['Utilizamos herramientas de analítica anónima para recopilar datos de uso, incluyendo:'],
        list2: ['Páginas visitadas dentro del portal.', 'Funcionalidades web utilizadas.', 'Duración de las sesiones.', 'Estos datos se recopilan de forma agregada y no permiten identificar personalmente al usuario.'],
      },
      {
        id: 'purpose', title: '3. Finalidad del Tratamiento',
        subtitle: 'Sus datos personales son tratados con las siguientes finalidades:',
        list: ['Prestar y mantener el servicio del portal web.', 'Gestionar suscripciones y pagos a través de pasarelas seguras integradas.', 'Enviar comunicaciones de servicio (códigos de verificación, notificaciones de cambios en los términos y respuestas de soporte).', 'Analizar estadísticas agregadas para mejorar el rendimiento del sistema.'],
      },
      {
        id: 'legal-basis', title: '4. Base Legal del Tratamiento',
        paragraphs: ['El tratamiento de sus datos se basa en las siguientes bases legales:'],
        list: ['Ejecución del servicio: el tratamiento es indispensable para proveer las características del portal web contratadas.', 'Consentimiento: al registrarse, usted consiente el tratamiento para los fines descriptos.', 'Obligación legal: conservación de datos contables y fiscales requerida por leyes aplicables.', 'Interés legítimo: la optimización del rendimiento técnico de la plataforma.'],
      },
      {
        id: 'recipients', title: '5. Destinatarios de los Datos',
        paragraphs: ['Sus datos pueden ser procesados por las siguientes plataformas asociadas:'],
        list: ['Procesadores de pago externos para la gestión segura de suscripciones.', 'Servicios de despacho de correo para notificaciones transaccionales.', 'Proveedores de hosting y base de datos seguros en la nube.'],
        paragraphsAfter: ['El Proveedor no vende ni comercializa datos personales de sus usuarios bajo ninguna circunstancia.'],
      },
      {
        id: 'international', title: '6. Transferencias Internacionales',
        paragraphs: ['Sus datos pueden ser transferidos y almacenados en servidores ubicados fuera de su país de residencia, garantizando que los proveedores contratados cumplen con normativas de seguridad adecuadas.'],
      },
      {
        id: 'retention', title: '7. Conservación de los Datos',
        paragraphs: ['Conservamos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política:'],
        list: ['Datos de cuenta: mientras su cuenta permanezca activa.', 'Datos de facturación: conservados por el tiempo requerido por las normativas fiscales vigentes.', 'Datos técnicos y analíticos: conservados por un plazo máximo de 26 meses.'],
        paragraphsAfter: ['Una vez cumplido el período de conservación, los datos son eliminados o anonimizados de forma irreversible.'],
      },
      {
        id: 'rights', title: '8. Derechos del Usuario',
        paragraphs: ['Usted tiene derecho a:'],
        list: ['Acceder a los datos personales que almacenamos sobre usted.', 'Solicitar la rectificación de datos inexactos.', 'Solicitar la eliminación completa de su cuenta y sus datos asociados.', 'Oponerse al tratamiento de datos técnicos no esenciales.'],
        paragraphsAfter: ['Para ejercer cualquiera de estos derechos, contáctenos directamente al correo electrónico de soporte:', supportEmail, 'Nos comprometemos a dar respuesta a su solicitud a la brevedad.'],
      },
      {
        id: 'security', title: '9. Seguridad de los Datos',
        paragraphs: ['Implementamos medidas de seguridad técnicas para proteger su información:'],
        list: ['Encriptación de contraseñas y datos personales sensibles en reposo.', 'Transmisión de información protegida mediante certificados SSL/TLS.', 'Políticas estrictas de acceso restringido a las bases de datos.'],
      },
      {
        id: ' dpocontact', title: '10. Contacto del Delegado de Protección de Datos',
        paragraphs: [`Para cualquier consulta sobre la protección de sus datos personales en ${siteName}, contáctenos a soporte en:`, supportEmail],
      },
    ],
  };

  return (
    <Page>
      <Title>Política de Privacidad</Title>
      <Subtitle>Última actualización: {privacyData.updatedAt}</Subtitle>

      {privacyData.sections.map((section) => (
        <Section key={section.id}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.subtitle && <SectionSubtitle>{section.subtitle}</SectionSubtitle>}
          {section.paragraphs?.map((p, i) => (
            <Paragraph key={`p-${i}`}>{p === supportEmail ? <strong>{p}</strong> : p}</Paragraph>
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
            <Paragraph key={`pa-${i}`}>{p === supportEmail ? <strong>{p}</strong> : p}</Paragraph>
          ))}
        </Section>
      ))}
    </Page>
  );
};

export default PrivacyContent;
