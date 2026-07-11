const emails = {
  ticket: {
    received: "Hemos recibido tu consulta. Te responderemos a la brevedad.",
    id: "Ticket ID",
    message: "Mensaje",
    userNumber: "Usuario N°",
    reply: "Un agente de soporte de <strong>{{siteName}}</strong> ha respondido a tu ticket de soporte <strong>{{ticketId}}</strong>.",
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
    title: "¡Bienvenido a <strong>{{siteName}}</strong>!",
    success: "Tu cuenta ha sido creada exitosamente. Ya podés usar la plataforma para:",
    feature1: "Administrar tu dashboard personal",
    feature2: "Acceder a herramientas y analíticas exclusivas",
    feature3: "Gestionar tus tickets de soporte de forma prioritaria",
    feature4: "Configurar y personalizar tu perfil de usuario",
    download: "Ingresá a la plataforma para comenzar a disfrutar de todos los servicios al instante.",
  },
  subject: {
    ticket: "Hemos recibido tu consulta",
    deletionCode: "Código de verificación — Eliminación de cuenta",
    deletionConfirmation: "Cuenta programada para eliminación",
    wellcome: "¡Bienvenido a {{siteName}}!",
    ticketReply: "Respuesta a tu consulta de soporte - {{ticketId}}",
  },
};

export default emails;
