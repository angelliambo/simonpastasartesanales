import { Router, Request, Response } from "express";
import crypto from "crypto";
import User from "../models/userModel";
import { hashEmail, decrypt } from "../utils/encryption";
import { sendDeletionCode, sendDeletionConfirmation } from "../services/emailService";
import { verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const router = Router();

const EXPIRY_MINUTES = 3;

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.get("/profile", verifyIsLoggedIn, async (req: Request, res: Response) => {
  try {
    const userReq = (req as any).user;
    if (!userReq || !userReq.userId) {
      res.status(401).json({ success: false, error: "No autenticado" });
      return;
    }
    const user = await User.findById(userReq.userId, {
      emailHash: 1, emailEncrypted: 1, emailIv: 1, emailTag: 1,
      plan: 1, role: 1, isAdmin: 1,
      createdAt: 1, lastLogin: 1, isActive: 1,
      _id: 1,
    }).lean();

    if (!user) {
      res.status(404).json({ success: false, error: "Usuario no encontrado" });
      return;
    }

    let email = null;
    if (user.emailEncrypted) {
      try {
        email = decrypt(user.emailEncrypted, user.emailIv, user.emailTag);
      } catch (e: any) {
        email = `[Decryption Error: ${e.message}]`;
      }
    }

    res.json({
      success: true,
      profile: {
        _id: user._id.toString(),
        email,
        emailHash: user.emailHash,
        plan: user.plan,
        role: user.role,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[User] Error GET /profile:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

router.post("/request-deletion", verifyIsLoggedIn, async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email) {
      res.status(400).json({ success: false, error: "email requerido" });
      return;
    }

    const emailHash = hashEmail(email);
    const user = await User.findOne({ emailHash, deletedAt: null });

    if (!user) {
      res.status(404).json({ success: false, error: "Usuario no encontrado" });
      return;
    }

    const code = generateCode();
    const expiry = new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000);

    await User.updateOne(
      { _id: user._id },
      { $set: { deletionCode: code, deletionCodeExpiry: expiry } }
    );

    try {
      const locale = req.body.locale || (typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : undefined);
      await sendDeletionCode(email, code, locale);
      console.log(`[User] Código de eliminación enviado a ${email}`);
      res.json({ success: true, message: "Código enviado al email" });
    } catch {
      console.warn(`[User] No se pudo enviar código de eliminación a ${email}`);
      if (process.env.NODE_ENV === "development") {
        res.json({ success: true, message: "Código enviado al email", devCode: code });
      } else {
        res.json({ success: true, message: "Código enviado al email" });
      }
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[User] Error en request-deletion:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

router.post("/confirm-deletion", verifyIsLoggedIn, async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body as { email?: string; code?: string };
    if (!email || !code) {
      res.status(400).json({ success: false, error: "email y code requeridos" });
      return;
    }

    const emailHash = hashEmail(email);
    const user = await User.findOne({ emailHash, deletedAt: null });

    if (!user) {
      res.status(404).json({ success: false, error: "Usuario no encontrado" });
      return;
    }

    if (!user.deletionCode || user.deletionCode !== code) {
      res.status(400).json({ success: false, error: "Código incorrecto" });
      return;
    }

    if (user.deletionCodeExpiry && user.deletionCodeExpiry < new Date()) {
      res.status(400).json({ success: false, error: "Código expirado. Solicitá uno nuevo." });
      return;
    }

    const now = new Date();
    const anonymizedHash = hashEmail(`${email}-deleted-${now.toISOString()}`);

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
          deletionCode: null,
          deletionCodeExpiry: null,
          password: crypto.randomBytes(24).toString("hex"),
        },
        $push: { activityLog: { action: 'account_deleted', timestamp: new Date(), metadata: {} } },
      }
    );

    try {
      const locale = req.body.locale || (typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : undefined);
      await sendDeletionConfirmation(email, locale);
    } catch {
      console.warn(`[User] No se pudo enviar confirmación a ${email}`);
    }

    res.json({
      success: true,
      message:
        "Cuenta programada para eliminación. Los datos necesarios para cumplir con obligaciones fiscales serán conservados de forma anónima por 7 años.",
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[User] Error en confirm-deletion:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

export default router;
