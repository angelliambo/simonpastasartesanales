import { Router, Request, Response } from "express";
import SupportTicket, { generateTicketId } from "../models/SupportTicket";
import User from "../models/userModel";
import { hashEmail } from "../utils/encryption";
import { sendTicketConfirmation, sendAdminTicketNotification } from "../services/emailService";
import { config } from "../config/environment";
import { verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const router = Router();

// Crear ticket (se puede hacer logueado o anónimo)
router.post("/ticket", async (req: Request, res: Response) => {
  try {
    const { email, name, subject, message, userId } = req.body as {
      email?: string;
      name?: string;
      subject?: string;
      message?: string;
      userId?: string;
    };

    const userEmail = email || "";
    if (!userEmail || !subject || !message) {
      res.status(400).json({ success: false, error: "email, subject y message son requeridos" });
      return;
    }

    // Buscar userId por email si no vino
    let resolvedUserId = userId || null;
    if (!resolvedUserId) {
      const emailHash = hashEmail(userEmail);
      const user = await User.findOne({ emailHash });
      if (user) resolvedUserId = user._id.toString();
    }

    const ticketId = generateTicketId();
    const ticket = await SupportTicket.create({
      ticketId,
      userId: resolvedUserId,
      email: userEmail,
      name: name || "",
      subject,
      message,
      status: "open",
      comments: [],
    });

    // Enviar confirmación al usuario
    try {
      const locale = req.body.locale || (typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : undefined);
      await sendTicketConfirmation(userEmail, ticketId, message, resolvedUserId || undefined, locale);
    } catch {
      console.warn(`[Support] No se pudo enviar email de confirmación para ${ticketId}`);
    }

    // Enviar notificación al administrador
    try {
      await sendAdminTicketNotification(ticketId, userEmail, name || "", subject, message, resolvedUserId || undefined, true);
    } catch {
      console.warn(`[Support] No se pudo enviar email de notificación de ticket al admin para ${ticketId}`);
    }

    res.status(201).json({
      success: true,
      ticket: {
        ticketId: ticket.ticketId,
        subject: ticket.subject,
        status: ticket.status,
        createdAt: ticket.createdAt,
      },
      contacto: config.CONTACT_EMAIL,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Support] Error en POST /ticket:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Listar tickets del usuario autenticado
router.get("/tickets/:userId", verifyIsLoggedIn, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ success: false, error: "userId requerido" });
      return;
    }

    // Seguridad: verificar que el usuario pida sus propios tickets (o sea admin)
    if (userId !== (req as any).user?.userId && (req as any).user?.role !== "admin") {
      res.status(403).json({ success: false, error: "No tienes permiso para ver estos tickets" });
      return;
    }

    const tickets = await SupportTicket.find({ userId })
      .select("ticketId subject status lastMessageBy userRead adminRead createdAt updatedAt")
      .sort({ updatedAt: -1 })
      .lean();

    res.json({ success: true, tickets });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Support] Error en GET /tickets:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Detalle de un ticket para el usuario
router.get("/tickets/detail/:ticketId", verifyIsLoggedIn, async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const ticket = await SupportTicket.findOne({ ticketId });
    if (!ticket) {
      res.status(404).json({ success: false, error: "Ticket no encontrado" });
      return;
    }

    // Seguridad: verificar pertenencia (o sea admin)
    if (ticket.userId && ticket.userId.toString() !== (req as any).user?.userId && (req as any).user?.role !== "admin") {
      res.status(403).json({ success: false, error: "No tienes permiso para ver este ticket" });
      return;
    }

    // Marcar como leído por el usuario si está sin leer
    if (!ticket.userRead) {
      ticket.userRead = true;
      await ticket.save();
    }

    res.json({ success: true, ticket });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Support] Error en GET /tickets/detail:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Añadir comentario/respuesta de usuario
router.post("/tickets/detail/:ticketId/comments", verifyIsLoggedIn, async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body as { message?: string };
    if (!message || !message.trim()) {
      res.status(400).json({ success: false, error: "El mensaje es requerido" });
      return;
    }

    const ticket = await SupportTicket.findOne({ ticketId });
    if (!ticket) {
      res.status(404).json({ success: false, error: "Ticket no encontrado" });
      return;
    }

    // Seguridad: verificar pertenencia (o sea admin)
    if (ticket.userId && ticket.userId.toString() !== (req as any).user?.userId && (req as any).user?.role !== "admin") {
      res.status(403).json({ success: false, error: "No tienes permiso para comentar en este ticket" });
      return;
    }

    const comment = {
      authorId: (req as any).user?.userId,
      authorEmail: (req as any).user?.email || ticket.email,
      authorRole: "user" as const,
      message: message.trim(),
      createdAt: new Date(),
    };

    ticket.comments.push(comment as any);
    ticket.lastMessageBy = "user";
    ticket.userRead = true;
    ticket.adminRead = false; // Requiere atención de admin

    // Si estaba cerrado, reabrirlo al haber comentario del usuario
    if (ticket.status === "closed") {
      ticket.status = "open";
    }
    await ticket.save();

    // Notificar al admin por correo
    try {
      await sendAdminTicketNotification(ticket.ticketId, comment.authorEmail, ticket.name, ticket.subject, comment.message, ticket.userId?.toString(), false);
    } catch {
      console.warn(`[Support] No se pudo enviar email de notificación de respuesta al admin para ${ticket.ticketId}`);
    }

    res.json({ success: true, comment });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Support] Error en POST /tickets/detail/comments:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

export default router;
