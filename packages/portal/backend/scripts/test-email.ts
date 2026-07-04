import { sendEmail } from "../services/emailService.js";
import { BRAND_CONFIG } from "@factory/shared/config/brand";

async function main() {
  const email = process.argv[2] || process.env.EMAIL_ADMIN_BCC || "angel.liambo@gmail.com";
  console.log(`[Test Email] Enviando email de prueba a: ${email}`);

  try {
    await sendEmail({
      to: email,
      subject: `🧪 Prueba de Maquetado (Ancho Completo) - ${BRAND_CONFIG.siteName}`,
      variables: {
        tipo: "test",
        contenido: `
          <p>¡Hola! Este es un correo de prueba oficial generado mediante el comando de test del monorepo.</p>
          <p>La tarjeta del contenido debería permanecer centrada y el fondo oscuro '#0b091a' extenderse por completo en la pantalla de tu cliente de correo.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://<domain>" target="_blank" style="display:inline-block;padding:12px 24px;background-color:#6366f1;color:#ffffff;border-radius:12px;font-weight:600;text-decoration:none;">Ir a ${BRAND_CONFIG.siteName}</a>
          </div>
        `
      }
    });
    console.log(`[Test Email] ✅ Email enviado exitosamente a ${email}`);
  } catch (error) {
    console.error(`[Test Email] ❌ Error al enviar email a ${email}:`, error);
  }
}

main();
