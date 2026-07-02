import { Router, Request, Response } from "express";
import { sendEmail } from "../services/emailService";

const router = Router();

interface NotificationRequest {
  to: string;
  channel: "email";
  template: string;
  subject?: string;
  variables?: Record<string, string>;
}

router.post("/send", async (req: Request, res: Response) => {
  try {
    const { to, channel, template, subject, variables } = req.body as NotificationRequest;

    console.log("\n========== [NOTIFICATION] send ==========");
    console.log("INPUT:", JSON.stringify({ to, channel, template, subject, variables }));

    if (!to || !channel || !template) {
      res.status(400).json({ success: false, error: "to, channel y template son requeridos" });
      return;
    }

    if (channel !== "email") {
      res.status(400).json({ success: false, error: `Canal "${channel}" no soportado. Solo: email` });
      return;
    }

    const subjectMap: Record<string, string> = {
      wellcome: "Bienvenido a ZenithNexus 🚀",
      ticket: `[${variables?.ticket_id || "ZN"}] Hemos recibido tu consulta`,
      deletion_code: "Código de verificación — Eliminación de cuenta",
      deletion_confirmed: "Cuenta programada para eliminación",
      test: subject || "🧪 Notificación de prueba — ZenithNexus",
    };

    const templateMap: Record<string, string> = {
      wellcome: "0p7kx4x5wk8g9yjr",
      ticket: "0p7kx4x5wk8g9yjr",
      deletion_code: "0p7kx4x5wk8g9yjr",
      deletion_confirmed: "0p7kx4x5wk8g9yjr",
      test: "0p7kx4x5wk8g9yjr",
    };

    const resolvedSubject = subjectMap[template] || subject || "Notificación ZenithNexus";
    const resolvedTemplate = templateMap[template] || template;
    const htmlContent = variables?.content || variables?.mensaje || "Notificación ZenithNexus";

    const locale = req.body.locale || (typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : undefined);
    await sendEmail({
      to,
      subject: resolvedSubject,
      variables: { contenido: htmlContent, tipo: template, locale, ...variables },
    });

    console.log("[NOTIFICATION] ✅ Enviada");
    console.log("=========================================\n");

    res.json({ success: true, message: "Notificación enviada" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[NOTIFICATION] Error:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

export default router;
