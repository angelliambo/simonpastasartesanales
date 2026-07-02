export class SenderProvider {
  name = "sender";

  async send(payload: { to: string; subject: string; html?: string; bcc?: string }): Promise<void> {
    const apiKey = process.env.EMAIL_API_KEY;
    if (!apiKey) {
      console.warn("[Sender] EMAIL_API_KEY no configurada. Email no enviado.");
      return;
    }

    const fromEmail = process.env.EMAIL_FROM_EMAIL || "noreply@<domain>";
    const fromName = process.env.EMAIL_FROM_NAME || "ZenithNexus";

    const sendSingle = async (toEmail: string, isBcc = false): Promise<void> => {
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

        if (!resp.ok) {
          const text = await resp.text();
          console.warn(`[Sender] Error ${resp.status} al enviar a ${toEmail}${isBcc ? " (BCC)" : ""}: ${text.slice(0, 300)}`);
        } else {
          console.log(`[Sender] Email enviado con éxito a ${toEmail}${isBcc ? " (BCC)" : ""}`);
        }
      } catch (err: any) {
        console.warn(`[Sender] Error de conexión al enviar a ${toEmail}${isBcc ? " (BCC)" : ""}:`, err.message || err);
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
