import { BRAND_CONFIG } from "@factory/shared/config/brand";

export const emailTranslations: Record<string, Record<string, string>> = {
  es: {
    "pages.brandSlogan.slogan": "Comunicación en su punto máximo.",
    "pages.legal.titulo": "Términos y Condiciones de Uso",
    "pages.privacy.titulo": "Política de Privacidad",
    "pages.emails.ticket.received": "Hemos recibido tu consulta. Te responderemos a la brevedad.",
    "pages.emails.ticket.id": "Ticket ID",
    "pages.emails.ticket.message": "Mensaje",
    "pages.emails.ticket.userNumber": "Usuario N°",
    "pages.emails.ticket.reply": "Un agente de soporte de <strong>{{siteName}}</strong> ha respondido a tu ticket de soporte <strong>{{ticketId}}</strong>.",
    "pages.emails.ticket.replyLabel": "Respuesta de Soporte:",
    "pages.emails.ticket.followUp": "Ingresá al portal para responder o hacer el seguimiento.",
    "pages.emails.deletion.request": "Recibimos una solicitud de eliminación de tu cuenta.",
    "pages.emails.deletion.code": "Ingresá el siguiente código para confirmar:",
    "pages.emails.deletion.expiry": "Este código expira en 15 minutos. Si no solicitaste esta eliminación, ignorá este mensaje.",
    "pages.emails.deletion.confirmed": "Tu cuenta ha sido programada para eliminación.",
    "pages.emails.deletion.dataRetention": "Los datos necesarios para cumplir con obligaciones fiscales serán conservados de forma anónima por 7 años. El resto de tu información ha sido eliminada.",
    "pages.emails.wellcome.title": "¡Bienvenido a <strong>{{siteName}}</strong>!",
    "pages.emails.wellcome.success": "Tu cuenta ha sido creada exitosamente. Ya podés usar la plataforma para:",
    "pages.emails.wellcome.feature1": "Administrar tu dashboard personal",
    "pages.emails.wellcome.feature2": "Acceder a herramientas y analíticas exclusivas",
    "pages.emails.wellcome.feature3": "Gestionar tus tickets de soporte de forma prioritaria",
    "pages.emails.wellcome.feature4": "Configurar y personalizar tu perfil de usuario",
    "pages.emails.wellcome.download": "Ingresá a la plataforma para comenzar a disfrutar de todos los servicios al instante.",
    "pages.emails.subject.ticket": "Hemos recibido tu consulta",
    "pages.emails.subject.deletionCode": "Código de verificación — Eliminación de cuenta",
    "pages.emails.subject.deletionConfirmation": "Cuenta programada para eliminación",
    "pages.emails.subject.wellcome": "¡Bienvenido a {{siteName}}!",
    "pages.emails.subject.ticketReply": "Respuesta a tu consulta de soporte - {{ticketId}}"
  },
  en: {
    "pages.brandSlogan.slogan": "Communication at its peak.",
    "pages.legal.titulo": "Terms and Conditions of Use",
    "pages.privacy.titulo": "Privacy Policy",
    "pages.emails.ticket.received": "We have received your inquiry. We will reply as soon as possible.",
    "pages.emails.ticket.id": "Ticket ID",
    "pages.emails.ticket.message": "Message",
    "pages.emails.ticket.userNumber": "User No.",
    "pages.emails.ticket.reply": "A support agent from <strong>{{siteName}}</strong> has replied to your support ticket <strong>{{ticketId}}</strong>.",
    "pages.emails.ticket.replyLabel": "Support Reply:",
    "pages.emails.ticket.followUp": "Please log in to the portal to reply or follow up.",
    "pages.emails.deletion.request": "We received a request to delete your account.",
    "pages.emails.deletion.code": "Enter the following code to confirm:",
    "pages.emails.deletion.expiry": "This code expires in 15 minutes. If you did not request this deletion, please ignore this message.",
    "pages.emails.deletion.confirmed": "Your account has been scheduled for deletion.",
    "pages.emails.deletion.dataRetention": "Data required to comply with tax obligations will be kept anonymously for 7 years. The rest of your information has been deleted.",
    "pages.emails.wellcome.title": "Welcome to <strong>{{siteName}}</strong>!",
    "pages.emails.wellcome.success": "Your account has been successfully created. You can now use the platform to:",
    "pages.emails.wellcome.feature1": "Manage your personal dashboard",
    "pages.emails.wellcome.feature2": "Access exclusive tools and analytics",
    "pages.emails.wellcome.feature3": "Manage your support tickets with priority",
    "pages.emails.wellcome.feature4": "Configure and customize your user profile",
    "pages.emails.wellcome.download": "Log in to the platform to start enjoying all services instantly.",
    "pages.emails.subject.ticket": "We have received your inquiry",
    "pages.emails.subject.deletionCode": "Verification code — Account deletion",
    "pages.emails.subject.deletionConfirmation": "Account scheduled for deletion",
    "pages.emails.subject.wellcome": "Welcome to {{siteName}}!",
    "pages.emails.subject.ticketReply": "Reply to your support inquiry - {{ticketId}}"
  }
};

export function translateEmail(key: string, locale: string, params: Record<string, string> = {}): string {
  const langBase = locale.split("-")[0];
  const dict = emailTranslations[langBase] || emailTranslations["es"];
  const text = dict[key] || key;

  const mergedParams: Record<string, string> = { siteName: BRAND_CONFIG.siteName, ...params };
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => mergedParams[k] ?? `{{${k}}}`);
}
