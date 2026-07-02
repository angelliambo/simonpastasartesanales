export const emails = {
  ticket: {
    received: "We have received your inquiry. We will get back to you as soon as possible.",
    id: "Ticket ID",
    message: "Message",
    userNumber: "User N°",
    reply: "A support agent from <strong>{{nombreSitio}}</strong> has replied to your support ticket <strong>{{ticketId}}</strong>.",
    replyLabel: "Support Reply:",
    followUp: "Log in to the portal to reply or follow up.",
  },
  deletion: {
    request: "We received a request to delete your account.",
    code: "Enter the following code to confirm:",
    expiry: "This code expires in 15 minutes. If you did not request this deletion, please ignore this message.",
    confirmed: "Your account has been scheduled for deletion.",
    dataRetention: "Data required to comply with tax obligations will be kept anonymously for 7 years. The rest of your information has been deleted.",
  },
  wellcome: {
    title: "Wellcome to <strong>{{nombreSitio}}</strong>!",
    success: "Your account has been successfully created. You can now use the extension to:",
    feature1: "Dictate text with punctuation recognition",
    feature2: "Listen to any web page aloud",
    feature3: "Read PDF documents with the narrator",
    feature4: "Control everything with keyboard shortcuts",
    download: "Download the extension from the <a href=\"https://chromewebstore.google.com\" style=\"color:#818cf8;\">Chrome Web Store</a> and start using {{nombreSitio}} instantly.",
  },
  subject: {
    ticket: "We received your inquiry",
    deletionCode: "Verification code — Account deletion",
    deletionConfirmation: "Account scheduled for deletion",
    wellcome: "Wellcome to {{nombreSitio}}!",
    ticketReply: "Reply to your support inquiry - {{ticketId}}",
  },
};

export default {};
