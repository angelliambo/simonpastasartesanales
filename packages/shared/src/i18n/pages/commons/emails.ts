export const emails = {
  ticket: {
    received: "Hemos recibido tu consulta. Te responderemos a la brevedad.",
    id: "Ticket ID",
    message: "Mensaje",
    userNumber: "Usuario N°",
    reply: "Un agente de soporte de <strong>{{nombreSitio}}</strong> ha respondido a tu ticket de soporte <strong>{{ticketId}}</strong>.",
    replyLabel: "Respuesta de Soporte:",
    followUp: "Ingresá al portal para responder o hacer el seguimiento.",
  },
  deletion: {
    request: "Recibimos una solicitud de eliminación de tu cuenta.",
    code: "Ingresá el siguiente código para confirmar:",
    expiry: "Este código expira en 15 minutos. Si no solicitaste esta eliminación, ignorá este mensaje.",
    confirmed: "Tu cuenta ha sido programada para eliminación.",
    dataRetention: "Los datos necesarios para cumplir con obligaciones fiscales serán conservados de forma anónima por 7 años. El resto de tu información ha sido eliminada.",
  },
  wellcome: {
    title: "¡Bienvenido a <strong>{{nombreSitio}}</strong>!",
    success: "Tu cuenta ha sido creada exitosamente. Ya podés usar la extensión para:",
    feature1: "Dictar texto con reconocimiento de puntuación",
    feature2: "Escuchar cualquier página web en voz alta",
    feature3: "Leer documentos PDF con el narrador",
    feature4: "Controlar todo con atajos de teclado",
    download: "Descargá la extensión desde <a href=\"https://chromewebstore.google.com\" style=\"color:#818cf8;\">Chrome Web Store</a> y empezá a usar {{nombreSitio}} al instante.",
  },
  subject: {
    ticket: "Hemos recibido tu consulta",
    deletionCode: "Código de verificación — Eliminación de cuenta",
    deletionConfirmation: "Cuenta programada para eliminación",
    wellcome: "¡Bienvenido a {{nombreSitio}}!",
    ticketReply: "Respuesta a tu consulta de soporte - {{ticketId}}",
  },
};

export default {};
