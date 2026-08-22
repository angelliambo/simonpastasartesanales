import { BRAND_CONFIG } from "@factory/shared/config/brand";

export class SenderProvider {
  name = "sender";

  async send(payload: { to: string; subject: string; html?: string; bcc?: string }): Promise<void> {
    const apiKey = process.env.EMAIL_API_KEY;
    if (!apiKey) {
      console.warn("[Sender] EMAIL_API_KEY no configurada. Email no enviado.");
      return;
    }

    const fromEmail = process.env.EMAIL_FROM_EMAIL || `noreply@${BRAND_CONFIG.domain}`;
    const fromName = process.env.EMAIL_FROM_NAME || BRAND_CONFIG.siteName;

    const sendSingle = async (toEmail: string, isBcc = false): Promise<void> => {
      const maxRetries = 3;
      let delayMs = 1000;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const resp = await fetch("https://api.sender.net/v2/message/send", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              from: { email: fromEmail, name: fromName },
              to: { email: toEmail },
              subject: payload.subject,
              html: payload.html || payload.subject
            })
          });

          if (resp.ok) {
            console.log(`[Sender] Email enviado con éxito a ${toEmail}${isBcc ? " (BCC)" : ""} (Intento ${attempt})`);
            return;
          }

          const text = await resp.text();
          const isRateLimitOrServerError = resp.status === 429 || resp.status >= 500;

          if (isRateLimitOrServerError && attempt < maxRetries) {
            const jitter = Math.random() * 200;
            const waitTime = delayMs + jitter;
            console.warn(`[Sender] HTTP ${resp.status} al enviar a ${toEmail}. Reintentando en ${Math.round(waitTime)}ms (Intento ${attempt}/${maxRetries})...`);
            await new Promise(res => setTimeout(res, waitTime));
            delayMs *= 2;
            continue;
          }

          console.warn(`[Sender] Error ${resp.status} al enviar a ${toEmail}${isBcc ? " (BCC)" : " "}: ${text.slice(0, 300)}`);
          return;
        } catch (err: any) {
          if (attempt < maxRetries) {
            const waitTime = delayMs + Math.random() * 200;
            console.warn(`[Sender] Error de red al enviar a ${toEmail}. Reintentando en ${Math.round(waitTime)}ms (${attempt}/${maxRetries}):`, err.message || err);
            await new Promise(res => setTimeout(res, waitTime));
            delayMs *= 2;
            continue;
          }
          console.warn(`[Sender] Error definitivo de conexión al enviar a ${toEmail}${isBcc ? " (BCC)" : ""}:`, err.message || err);
        }
      }
    };

    // Enviar al destinatario principal
    await sendSingle(payload.to, false);

    // Enviar al destinatario BCC si está configurado
    if (payload.bcc) {
      const bccEmails = payload.bcc.split(",").map(e => e.trim()).filter(Boolean);
      await Promise.all(bccEmails.map(bccEmail => sendSingle(bccEmail, true)));
    }
  }
}
