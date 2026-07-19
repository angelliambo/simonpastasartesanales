export const emails = {
  ticket: {
    received: "We have received your query. We will get back to you as soon as possible.",
    id: "Ticket ID",
    message: "Message",
    userNumber: "User N°",
    reply: "A support agent from <strong>{{siteName}}</strong> has replied to your support ticket <strong>{{ticketId}}</strong>.",
    replyLabel: "Support Reply:",
    followUp: "Please log in to the portal to reply or follow up.",
  },
  deletion: {
    request: "We received a request to delete your account.",
    code: "Enter the following code to confirm:",
    expiry: "This code expires in 15 minutes. If you did not request this deletion, please ignore this message.",
    confirmed: "Your account has been scheduled for deletion.",
    dataRetention: "Data required to comply with tax obligations will be kept anonymously for 7 years. The rest of your information has been deleted.",
  },
  wellcome: {
    title: "Welcome to <strong>{{siteName}}</strong>!",
    success: "Your account has been successfully created. You can now use the platform to:",
    feature1: "Manage your personal dashboard",
    feature2: "Access exclusive tools and analytics",
    feature3: "Manage your support tickets with high priority",
    feature4: "Configure and customize your user profile",
    download: "Log in to the platform to start enjoying all services instantly.",
  },
  subject: {
    ticket: "We have received your query",
    deletionCode: "Verification code — Account deletion",
    deletionConfirmation: "Account scheduled for deletion",
    wellcome: "Welcome to {{siteName}}!",
    ticketReply: "Reply to your support query - {{ticketId}}",
  },
};

export default emails;
