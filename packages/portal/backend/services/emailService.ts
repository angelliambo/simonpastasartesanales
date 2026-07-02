import { readFileSync } from "fs";
import { join } from "path";
import config from "../config/environment";
import { translate } from "@factory/shared/i18n/t";
import { locales } from "@factory/shared/i18n/locales";

function normalizeLocale(requested?: string): string {
  if (!requested) return "es-MX";
  const req = requested.trim().toLowerCase();

  if (req.startsWith("en-us") || req.startsWith("en_us")) return "en-US";
  if (req.startsWith("en-gb") || req.startsWith("en_gb")) return "en-GB";
  if (req.startsWith("es-es") || req.startsWith("es_es")) return "es-ES";
  if (req.startsWith("es-mx") || req.startsWith("es_mx")) return "es-MX";
  if (req.startsWith("fr-fr") || req.startsWith("fr_fr")) return "fr-FR";
  if (req.startsWith("pt-br") || req.startsWith("pt_br")) return "pt-BR";
  if (req.startsWith("it-it") || req.startsWith("it_it")) return "it-IT";
  if (req.startsWith("de-de") || req.startsWith("de_de")) return "de-DE";
  if (req.startsWith("ja-jp") || req.startsWith("ja_jp")) return "ja-JP";

  if (req.startsWith("en")) return "en-US";
  if (req.startsWith("es")) return "es-MX";
  if (req.startsWith("fr")) return "fr-FR";
  if (req.startsWith("pt")) return "pt-BR";
  if (req.startsWith("it")) return "it-IT";
  if (req.startsWith("de")) return "de-DE";
  if (req.startsWith("ja")) return "ja-JP";

  return "es-MX";
}

function t(key: string, locale?: string, params: Record<string, string> = {}): string {
  const currentLang = normalizeLocale(locale);
  return translate(key, locales as any, currentLang, "es-MX", params);
}

interface EmailPayload {
  to: string;
  subject: string;
  html?: string;
  variables?: Record<string, string | undefined>;
  bcc?: string;
}

interface EmailProvider {
  name: string;
  send(payload: EmailPayload): Promise<void>;
}

let provider: EmailProvider | null = null;
let baseTemplate: string | null = null;

function getBaseTemplate(): string {
  if (baseTemplate) return baseTemplate;
  try {
    const path = join(__dirname, "../email-templates/base.html");
    baseTemplate = readFileSync(path, "utf8");
  } catch {
    baseTemplate = "<div>{{contenido}}</div>";
  }
  return baseTemplate;
}

export function renderTemplate(titulo: string, contenido: string, locale?: string): string {
  const slogan = t("pages.brandSlogan.slogan", locale);
  const terminosLabel = t("pages.legal.titulo", locale);
  const privacidadLabel = t("pages.privacy.titulo", locale);

  return getBaseTemplate()
    .replace(/\{\{titulo\}\}/g, titulo)
    .replace(/\{\{contenido\}\}/g, contenido)
    .replace(/\{\{slogan\}\}/g, slogan)
    .replace(/\{\{terminosLabel\}\}/g, terminosLabel)
    .replace(/\{\{privacidadLabel\}\}/g, privacidadLabel);
}

function buildTicketContent(ticketId: string, message: string, userId?: string, locale?: string): string {
  const userNumLabel = t("pages.emails.ticket.userNumber", locale) || "Usuario N°";
  return `
    <p>${t("pages.emails.ticket.received", locale)}</p>
    <p><strong>${t("pages.emails.ticket.id", locale)}:</strong> ${ticketId}</p>
    ${userId ? `<p><strong>${userNumLabel}:</strong> ${userId}</p>` : ""}
    <p><strong>${t("pages.emails.ticket.message", locale)}:</strong></p>
    <blockquote style="border-left:3px solid #6366f1;padding-left:14px;color:#94a3b8;margin:12px 0;font-style:italic;">${message}</blockquote>
  `;
}

function buildDeletionCodeContent(code: string, locale?: string): string {
  return `
    <p>${t("pages.emails.deletion.request", locale)}</p>
    <p style="margin-bottom:20px;">${t("pages.emails.deletion.code", locale)}</p>
    <div style="text-align:center;margin:24px 0;">
      <span style="display:inline-block;padding:14px 32px;background-color:#171543;border:1px solid #3b3a88;border-radius:12px;font-size:28px;font-weight:800;letter-spacing:8px;color:#818cf8;font-family:monospace;">${code}</span>
    </div>
    <p style="font-size:13px;color:#64748b;margin-top:12px;">${t("pages.emails.deletion.expiry", locale)}</p>
  `;
}

function buildDeletionConfirmedContent(locale?: string): string {
  return `
    <p>${t("pages.emails.deletion.confirmed", locale)}</p>
    <p>${t("pages.emails.deletion.dataRetention", locale)}</p>
  `;
}

export async function initEmailService(): Promise<void> {
  const providerName = process.env.EMAIL_PROVIDER || "sender";
  if (providerName === "sender") {
    const { SenderProvider } = await import("./providers/sender.js");
    provider = new SenderProvider();
  } else {
    throw new Error(`Email provider "${providerName}" no soportado`);
  }
  console.log(
    `[Email] Provider: ${provider.name} | Template local: email-templates/base.html`,
  );
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  if (!provider) await initEmailService();
  const bcc = payload.bcc || process.env.EMAIL_ADMIN_BCC || "";
  const finalPayload = { ...payload, bcc };
  const locale = payload.variables?.locale;
  if (payload.variables?.tipo) {
    finalPayload.html = renderTemplate(
      payload.subject,
      payload.variables.contenido || "",
      locale,
    );
  }
  console.log(
    `[Email] Enviando a: ${payload.to} | Asunto: ${payload.subject}${bcc ? ` | BCC: ${bcc}` : ""}`,
  );
  await provider!.send(finalPayload);
}

export async function sendTicketConfirmation(
  to: string,
  ticketId: string,
  message: string,
  userId?: string,
  locale?: string
): Promise<void> {
  await sendEmail({
    to,
    subject: t("pages.emails.subject.ticket", locale),
    variables: {
      contenido: buildTicketContent(ticketId, message, userId, locale),
      tipo: "ticket",
      locale,
    },
  });
}

export async function sendDeletionCode(
  to: string,
  code: string,
  locale?: string
): Promise<void> {
  await sendEmail({
    to,
    subject: t("pages.emails.subject.deletionCode", locale),
    variables: {
      contenido: buildDeletionCodeContent(code, locale),
      tipo: "deletion_code",
      locale,
    },
  });
}

export async function sendDeletionConfirmation(to: string, locale?: string): Promise<void> {
  await sendEmail({
    to,
    subject: t("pages.emails.subject.deletionConfirmation", locale),
    variables: {
      contenido: buildDeletionConfirmedContent(locale),
      tipo: "deletion_confirmed",
      locale,
    },
  });
}

export async function sendWelcome(to: string, name: string, locale?: string): Promise<void> {
  const content = `
    <p>${t("pages.emails.wellcome.title", locale)}</p>
    <p>${t("pages.emails.wellcome.success", locale)}</p>
    <ul style="color:#cbd5e1;line-height:1.8;padding-left:20px;">
      <li>${t("pages.emails.wellcome.feature1", locale)}</li>
      <li>${t("pages.emails.wellcome.feature2", locale)}</li>
      <li>${t("pages.emails.wellcome.feature3", locale)}</li>
      <li>${t("pages.emails.wellcome.feature4", locale)}</li>
    </ul>
    <p style="margin-top:20px;">${t("pages.emails.wellcome.download", locale)}</p>
  `;
  await sendEmail({
    to,
    subject: t("pages.emails.subject.wellcome", locale),
    variables: { contenido: content, tipo: "wellcome", locale },
  });
}

function buildAdminTicketNotificationContent(
  ticketId: string,
  userEmail: string,
  userName: string,
  subject: string,
  message: string,
  userId?: string,
  isNewTicket: boolean = true
): string {
  return `
    <p>Se ha recibido una ${isNewTicket ? "nueva consulta" : "respuesta"} para el ticket <strong>${ticketId}</strong>.</p>
    <p><strong>De:</strong> ${userName || "N/A"} (${userEmail})</p>
    ${userId ? `<p><strong>Usuario N°:</strong> ${userId}</p>` : ""}
    <p><strong>Asunto:</strong> ${subject}</p>
    <p><strong>Mensaje:</strong></p>
    <blockquote style="border-left:3px solid #6366f1;padding-left:14px;color:#94a3b8;margin:12px 0;font-style:italic;">${message}</blockquote>
  `;
}

function buildUserTicketReplyNotificationContent(
  ticketId: string,
  message: string,
  userId?: string,
  locale?: string
): string {
  const userNumLabel = t("pages.emails.ticket.userNumber", locale) || "Usuario N°";
  return `
    <p>${t("pages.emails.ticket.reply", locale, { ticketId })}</p>
    ${userId ? `<p><strong>${userNumLabel}:</strong> ${userId}</p>` : ""}
    <p><strong>${t("pages.emails.ticket.replyLabel", locale)}</strong></p>
    <blockquote style="border-left:3px solid #10b981;padding-left:14px;color:#94a3b8;margin:12px 0;font-style:italic;">${message}</blockquote>
    <p style="margin-top:20px;">${t("pages.emails.ticket.followUp", locale)}</p>
  `;
}

export async function sendAdminTicketNotification(
  ticketId: string,
  userEmail: string,
  userName: string,
  subject: string,
  message: string,
  userId?: string,
  isNewTicket: boolean = true
): Promise<void> {
  const adminEmail = config.CONTACT_EMAIL || "info@<domain>";
  await sendEmail({
    to: adminEmail,
    subject: `[Soporte] ${isNewTicket ? "Nuevo Ticket" : "Respuesta de Usuario"} ${ticketId} - ${subject}`,
    variables: {
      contenido: buildAdminTicketNotificationContent(ticketId, userEmail, userName, subject, message, userId, isNewTicket),
      tipo: "admin_ticket_notification",
    },
  });
}

export async function sendUserTicketReplyNotification(
  to: string,
  ticketId: string,
  message: string,
  userId?: string,
  locale?: string
): Promise<void> {
  await sendEmail({
    to,
    subject: t("pages.emails.subject.ticketReply", locale, { ticketId }),
    variables: {
      contenido: buildUserTicketReplyNotificationContent(ticketId, message, userId, locale),
      tipo: "user_ticket_reply",
      locale,
    },
  });
}
