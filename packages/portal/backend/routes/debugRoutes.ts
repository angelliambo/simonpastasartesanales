import { Router, Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { decrypt, encrypt, hashEmail } from "../utils/encryption";
import config from "../config/environment";

import { verifyIsLoggedIn, verifyIsAdmin } from "../middleware/verifyAuthToken";
import SupportTicket, { generateTicketId } from "../models/SupportTicket";
import { sendUserTicketReplyNotification } from "../services/emailService";
const { JWT_SECRET_KEY, JWT_EXPIRES_IN_SECONDS } = config;

const router = Router();

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);

// Rutas de administración
router.get("/users", async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      sortField = "createdAt",
      sortOrder = "-1",
      dateFrom = "",
      dateTo = "",
      page = "1",
      limit = "50",
      plan = "",
      role = "",
      status = "",
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;
    const order = sortOrder === "1" ? 1 : -1;
    const allowedSort = ["createdAt", "plan", "role", "emailHash"];
    const sort: Record<string, 1 | -1> = {};
    sort[allowedSort.includes(sortField) ? sortField : "createdAt"] = order;

    const filter: Record<string, any> = {};

    // Filter by Plan
    if (plan) {
      filter.plan = plan;
    }

    // Filter by Role
    if (role) {
      filter.role = role;
    }

    // Filter by Status
    if (status) {
      if (status === "active") {
        filter.isActive = true;
        filter.deletedAt = null;
      } else if (status === "inactive") {
        filter.isActive = false;
        filter.deletedAt = null;
      } else if (status === "deleted") {
        filter.deletedAt = { $ne: null };
      }
    }

    if (dateFrom || dateTo) {
      const createdAtFilter: Record<string, Date> = {};
      if (dateFrom) {
        const [y, m, d] = dateFrom.split("-").map(Number);
        createdAtFilter.$gte = new Date(y, m - 1, d);
      }
      if (dateTo) {
        const [y, m, d] = dateTo.split("-").map(Number);
        createdAtFilter.$lte = new Date(y, m - 1, d, 23, 59, 59, 999);
      }
      filter.createdAt = createdAtFilter;
      console.log("[Debug] Date filter:", JSON.stringify(createdAtFilter));
    }

    const projection: Record<string, number> = {
      emailHash: 1, plan: 1, role: 1, isAdmin: 1, isActive: 1,
      createdAt: 1, lastLogin: 1, deletedAt: 1, _id: 1,
      emailEncrypted: 1, emailIv: 1, emailTag: 1,
    };

    let finalUsers: any[];
    let total: number;

    if (search.length >= 3) {
      // If searching, we fetch all candidates matching non-search filters to search decrypted email
      const allUsers = await User.find(filter, projection).sort(sort).lean();

      let processedUsers = allUsers.map((u: any) => {
        let email = null;
        if (u.emailEncrypted) {
          try {
            email = decrypt(u.emailEncrypted, u.emailIv, u.emailTag);
          } catch (e: any) {
            email = `[Decryption Error: ${e.message}]`;
          }
        }
        return { ...u, email };
      });

      const lowerSearch = search.toLowerCase();
      processedUsers = processedUsers.filter((u: any) => {
        const emailMatch = u.email ? u.email.toLowerCase().includes(lowerSearch) : false;
        const planMatch = u.plan ? u.plan.toLowerCase().includes(lowerSearch) : false;
        const roleMatch = u.role ? u.role.toLowerCase().includes(lowerSearch) : false;
        const idMatch = u._id ? u._id.toString().toLowerCase().includes(lowerSearch) : false;
        return emailMatch || planMatch || roleMatch || idMatch;
      });

      total = processedUsers.length;
      finalUsers = processedUsers.slice(skip, skip + limitNum);
    } else {
      // If not searching, we paginate in MongoDB directly
      const [users, count] = await Promise.all([
        User.find(filter, projection).sort(sort).skip(skip).limit(limitNum).lean(),
        User.countDocuments(filter),
      ]);
      total = count;
      finalUsers = users.map((u: any) => {
        let email = null;
        if (u.emailEncrypted) {
          try {
            email = decrypt(u.emailEncrypted, u.emailIv, u.emailTag);
          } catch (e: any) {
            email = `[Decryption Error: ${e.message}]`;
          }
        }
        return { ...u, email };
      });
    }

    // Clean up internal encrypted fields
    finalUsers = finalUsers.map((u: any) => {
      const { emailEncrypted, emailIv, emailTag, ...rest } = u;
      return rest;
    });

    res.json({
      success: true,
      users: finalUsers,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Debug] Error GET /users:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Devuelve usuarios con emails desencriptados
router.get("/users/decrypted", async (_req: Request, res: Response) => {
  try {
    const users = await User.find(
      {},
      {
        emailHash: 1,
        plan: 1,
        role: 1,
        isAdmin: 1,
        isActive: 1,
        createdAt: 1,
        lastLogin: 1,
        deletedAt: 1,
        _id: 1,
        emailEncrypted: 1,
        emailIv: 1,
        emailTag: 1,
      },
    )
      .sort({ createdAt: -1 })
      .lean();

    const decrypted = users.map((u: any) => {
      let email = null;
      if (u.emailEncrypted) {
        try {
          email = decrypt(u.emailEncrypted, u.emailIv, u.emailTag);
        } catch (e: any) {
          email = `[Decryption Error: ${e.message}]`;
        }
      }
      return {
        _id: u._id,
        email,
        emailHash: u.emailHash,
        plan: u.plan,
        role: u.role,
        isAdmin: u.isAdmin,
        createdAt: u.createdAt,
        lastLogin: u.lastLogin,
        deletedAt: u.deletedAt,
      };
    });

    res.json({ success: true, users: decrypted });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Debug] Error GET /users/decrypted:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Eliminar usuario (soft delete, auditable)
router.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: "Usuario no encontrado" });
      return;
    }

    const now = new Date();
    const anonymizedHash = hashEmail(`${user._id}-deleted-${now.toISOString()}`);

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          emailHash: anonymizedHash,
          nameEncrypted: "",
          nameIv: "",
          nameTag: "",
          emailEncrypted: "",
          emailIv: "",
          emailTag: "",
          deletedAt: now,
          isActive: false,
          password: crypto.randomBytes(24).toString("hex"),
        },
        $push: {
          activityLog: {
            action: 'account_deleted',
            timestamp: new Date(),
            metadata: {
              method: 'admin_delete',
              adminId: (req as any).user?.userId,
              adminEmail: (req as any).user?.email
            }
          }
        },
      }
    );

    res.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ success: false, error: msg });
  }
});

// Editar usuario (plan, role, isAdmin, isActive, auditable)
router.patch("/users/:id", async (req: Request, res: Response) => {
  try {
    const { plan, role, isAdmin, isActive } = req.body;
    const update: Record<string, unknown> = {};
    if (plan !== undefined) update.plan = plan;
    if (role !== undefined) update.role = role;
    if (isAdmin !== undefined) update.isAdmin = isAdmin;
    if (isActive !== undefined) update.isActive = isActive;

    await User.updateOne(
      { _id: req.params.id },
      {
        $set: update,
        $push: {
          activityLog: {
            action: 'admin_edit',
            timestamp: new Date(),
            metadata: {
              adminId: (req as any).user?.userId,
              adminEmail: (req as any).user?.email,
              changes: update
            }
          }
        }
      }
    );
    res.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ success: false, error: msg });
  }
});

// Crear usuario (auditable)
router.post("/users", async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email) {
      res.status(400).json({ success: false, error: "email requerido" });
      return;
    }
    const emailHash = hashEmail(email);
    const existing = await User.findOne({ emailHash, deletedAt: null });
    if (existing) {
      res.status(409).json({ success: false, error: "El usuario ya existe" });
      return;
    }
    const name = email.split("@")[0];
    const nameEncrypted = encrypt(name);
    const emailEncrypted = encrypt(email);
    const authHash = crypto.randomBytes(4).toString("hex");
    const user = await User.create({
      nameEncrypted: nameEncrypted.encrypted, nameIv: nameEncrypted.iv, nameTag: nameEncrypted.tag,
      emailHash, emailEncrypted: emailEncrypted.encrypted, emailIv: emailEncrypted.iv, emailTag: emailEncrypted.tag,
      password: crypto.randomBytes(24).toString("hex"), role: "user", plan: "free", authHash,
      lastLogin: new Date(),
      activityLog: [
        {
          action: 'account_created',
          timestamp: new Date(),
          metadata: {
            method: 'admin_create',
            adminId: (req as any).user?.userId,
            adminEmail: (req as any).user?.email
          }
        }
      ],
      legalAcceptance: { accepted: true, acceptedAt: new Date(), termsVersion: "1.0.0", acceptedDocuments: { terms: true, privacy: true, cookies: false } },
    });
    res.json({ success: true, userId: user._id.toString() });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ success: false, error: msg });
  }
});

// Generar JWT para login como usuario (sin auth)
router.post("/users/:id/login-token", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      res.status(404).json({ success: false, error: "Usuario no encontrado" });
      return;
    }
    // Desencriptar email para incluirlo en el payload
    let email = "";
    try { email = decrypt(user.emailEncrypted, user.emailIv, user.emailTag); } catch { }
    const payload = {
      userId: user._id.toString(),
      email,
      role: user.role,
      plan: user.plan,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN_SECONDS });
    res.json({
      success: true,
      token,
      userId: user._id.toString(),
      email,
      role: user.role,
      plan: user.plan,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ success: false, error: msg });
  }
});

// Consultar estado de licencia por email (debug)
router.get("/licenses/lookup", async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email?: string };
    if (!email) {
      res.status(400).json({ success: false, error: "email requerido" });
      return;
    }

    const emailHash = hashEmail(email);
    const user = await User.findOne({ emailHash }).lean();
    if (!user) {
      res.json({ success: true, exists: false, message: "Usuario no encontrado" });
      return;
    }

    const license = await (await import("../models/DeviceLicense")).default.findOne({ emailHash }).lean();
    const result: any = {
      exists: true,
      user: {
        _id: user._id,
        plan: user.plan,
        role: user.role,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      },
      license: license || null,
    };

    res.json({ success: true, ...result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ success: false, error: msg });
  }
});

// Estadísticas de administración
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const [total, active, deleted, byPlan] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ deletedAt: null }),
      User.countDocuments({ deletedAt: { $ne: null } }),
      User.aggregate([
        { $group: { _id: "$plan", count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      success: true,
      stats: { total, active, deleted, byPlan },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin] Error GET /stats:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// --- RUTAS DE ADMINISTRACIÓN DE TICKETS ---

// Listar todos los tickets con filtros
router.get("/tickets", async (req: Request, res: Response) => {
  try {
    const {
      status = "",
      search = "",
      page = "1",
      limit = "50",
      sortBy = "updatedAt",
      sortOrder = "desc",
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;

    const filter: Record<string, any> = {};
    if (status) {
      filter.status = status;
    }
    if (search.trim()) {
      filter.$or = [
        { ticketId: { $regex: search.trim(), $options: "i" } },
        { email: { $regex: search.trim(), $options: "i" } },
        { subject: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const sortField = ["ticketId", "subject", "email", "status", "createdAt", "updatedAt"].includes(sortBy)
      ? sortBy
      : "updatedAt";
    const orderNum = sortOrder === "asc" ? 1 : -1;

    const [tickets, total] = await Promise.all([
      SupportTicket.find(filter)
        .sort({ [sortField]: orderNum })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      SupportTicket.countDocuments(filter),
    ]);

    res.json({
      success: true,
      tickets,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin Tickets] Error en GET /tickets:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Detalle de un ticket
router.get("/tickets/:ticketId", async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const ticket = await SupportTicket.findOne({ ticketId });
    if (!ticket) {
      res.status(404).json({ success: false, error: "Ticket no encontrado" });
      return;
    }

    if (!ticket.adminRead) {
      ticket.adminRead = true;
      await ticket.save();
    }

    let userSummary = null;
    const hash = crypto.createHash("sha256").update(ticket.email.toLowerCase().trim()).digest("hex");

    const user = await User.findOne({
      $or: [
        ...(ticket.userId ? [{ _id: ticket.userId }] : []),
        { emailHash: hash }
      ]
    }).lean();

    const License = (await import("../models/DeviceLicense")).default;
    const licenses = await License.find({
      $or: [
        ...(user ? [{ userId: user._id }] : []),
        { emailHash: hash }
      ]
    }).lean();

    userSummary = {
      hasAccount: !!user,
      userId: user?._id || null,
      plan: user?.plan || "free",
      role: user?.role || "user",
      isActive: user?.isActive ?? null,
      createdAt: user?.createdAt || null,
      emailVerified: user?.emailVerified || false,
      licenses: licenses.map(l => ({
        plan: l.plan,
        status: l.status,
        expiresAt: l.expiresAt,
        createdAt: l.createdAt,
        lemonOrderId: l.lemonOrderId,
        lemonSubscriptionId: l.lemonSubscriptionId
      }))
    };

    res.json({ success: true, ticket, userSummary });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin Tickets] Error en GET /tickets/:ticketId:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Actualizar estado del ticket
router.patch("/tickets/:ticketId", async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body as { status?: "open" | "in_progress" | "closed" };

    if (!status || !["open", "in_progress", "closed"].includes(status)) {
      res.status(400).json({ success: false, error: "Estado inválido" });
      return;
    }

    const ticket = await SupportTicket.findOneAndUpdate(
      { ticketId },
      { status },
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({ success: false, error: "Ticket no encontrado" });
      return;
    }

    res.json({ success: true, ticket });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin Tickets] Error en PATCH /tickets/:ticketId:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Agregar respuesta (comentario) de administración
router.post("/tickets/:ticketId/comments", async (req: Request, res: Response) => {
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

    const comment = {
      authorId: (req as any).user?.userId,
      authorEmail: (req as any).user?.email || "support@simonpastasartesanales.com.ar",
      authorRole: "admin" as const,
      message: message.trim(),
      createdAt: new Date(),
    };

    ticket.comments.push(comment as any);
    ticket.lastMessageBy = "admin";
    ticket.adminRead = true;
    ticket.userRead = false; // Requiere atención del usuario

    if (ticket.status === "open") {
      ticket.status = "in_progress";
    }
    await ticket.save();

    try {
      const locale = req.body.locale || (typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : undefined);
      await sendUserTicketReplyNotification(ticket.email, ticket.ticketId, comment.message, ticket.userId?.toString(), locale);
    } catch {
      console.warn(`[Admin Tickets] No se pudo enviar email de respuesta al usuario para ${ticket.ticketId}`);
    }

    res.json({ success: true, comment });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin Tickets] Error en POST /tickets/:ticketId/comments:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// Crear ticket a nombre de un usuario registrado
router.post("/tickets/create-on-behalf", async (req: Request, res: Response) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      res.status(400).json({ success: false, error: "El email, asunto y mensaje son obligatorios." });
      return;
    }

    const trimmedEmail = email.toLowerCase().trim();
    const hash = crypto.createHash("sha256").update(trimmedEmail).digest("hex");

    // Buscar al usuario
    const user = await User.findOne({ emailHash: hash, deletedAt: null });
    if (!user) {
      res.status(404).json({ success: false, error: "No se encontró ningún usuario registrado con ese correo electrónico." });
      return;
    }

    // Generar ticket ID
    const ticketId = generateTicketId();

    // Descifrar el nombre del usuario
    let name = "";
    try {
      name = decrypt(user.nameEncrypted, user.nameIv, user.nameTag);
    } catch {
      name = trimmedEmail.split("@")[0];
    }

    // Crear el ticket
    const ticket = await SupportTicket.create({
      ticketId,
      userId: user._id,
      email: trimmedEmail,
      name,
      subject: subject.trim(),
      message: message.trim(),
      status: "open",
      lastMessageBy: "user",
      userRead: true,
      adminRead: false,
      comments: [
        {
          authorId: user._id,
          authorEmail: trimmedEmail,
          authorRole: "user",
          message: message.trim(),
          createdAt: new Date(),
        }
      ]
    });

    // Notificar al admin por correo
    try {
      const { sendAdminTicketNotification } = await import("../services/emailService");
      await sendAdminTicketNotification(ticketId, trimmedEmail, name, subject.trim(), message.trim(), user._id.toString());
    } catch (e) {
      console.warn(`[Admin Tickets] No se pudo enviar notificación de correo al administrador para el ticket ${ticketId}`, e);
    }

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin Tickets] Error en POST /tickets/create-on-behalf:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

export default router;
