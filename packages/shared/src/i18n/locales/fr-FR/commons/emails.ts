export const emails = {
  ticket: {
    received: "Nous avons bien reçu votre demande. Nous vous répondrons dans les plus brefs délais.",
    id: "ID du ticket",
    message: "Message",
    userNumber: "Utilisateur N°",
    reply: "Un agent de support de <strong>ZenithNexus</strong> a répondu à votre ticket de support <strong>{{ticketId}}</strong>.",
    replyLabel: "Réponse du support :",
    followUp: "Connectez-vous au portail pour répondre ou suivre la demande.",
  },
  deletion: {
    request: "Nous avons reçu une demande de suppression de votre compte.",
    code: "Saisissez le code suivant pour confirmer :",
    expiry: "Ce code expire dans 15 minutes. Si vous n'avez pas demandé cette suppression, veuillez ignorer ce message.",
    confirmed: "Votre compte a été programmé pour suppression.",
    dataRetention: "Les données nécessaires pour se conformer aux obligations fiscales seront conservées de manière anonyme pendant 7 ans. Le reste de vos informations a été supprimé.",
  },
  wellcome: {
    title: "Bienvenue sur <strong>ZenithNexus</strong> !",
    success: "Votre compte a été créé avec succès. Vous pouvez maintenant utiliser l'extension pour :",
    feature1: "Dicter du texte avec reconnaissance de la ponctuation",
    feature2: "Écouter n'importe quelle page web à voix haute",
    feature3: "Lire des documents PDF avec le narrateur",
    feature4: "Tout contrôler avec des raccourcis clavier",
    download: "Téléchargez l'extension depuis le <a href=\"https://chromewebstore.google.com\" style=\"color:#818cf8;\">Chrome Web Store</a> et commencez à utiliser ZenithNexus instantanément.",
  },
  subject: {
    ticket: "Nous avons bien reçu votre demande",
    deletionCode: "Code de vérification — Suppression du compte",
    deletionConfirmation: "Compte programmé pour suppression",
    wellcome: "Bienvenue sur ZenithNexus !",
    ticketReply: "Réponse à votre demande de support - {{ticketId}}",
  },
};

export default {};
