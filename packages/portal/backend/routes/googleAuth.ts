import { Router, Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { encrypt, hashEmail } from "../utils/encryption";
import config from "../config/environment";

const router = Router();

interface GoogleAuthBody {
  idToken?: string;
}

router.post("/google", async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body as GoogleAuthBody;

    if (!idToken) {
      res.status(400).json({ success: false, error: "idToken requerido" });
      return;
    }

    console.log("\n========== [AUTH] google-login ==========");

    // Validar token con la API de Google
    const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
    const googleResponse = await fetch(verifyUrl);

    if (!googleResponse.ok) {
      console.log("FAIL: Token de Google inválido o vencido");
      res.status(401).json({ success: false, error: "Token de Google inválido o vencido" });
      return;
    }

    const payload = await googleResponse.json();

    // Validar que el audience coincida con nuestro Client ID si está configurado
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (clientId && payload.aud !== clientId) {
      console.log("FAIL: Audience mismatch. Esperado:", clientId, "Recibido:", payload.aud);
      res.status(401).json({ success: false, error: "Audience mismatch" });
      return;
    }

    const email = payload.email;
    const name = payload.name || email.split("@")[0];

    if (!email) {
      console.log("FAIL: Token de Google no contiene email");
      res.status(400).json({ success: false, error: "Token de Google no provee email" });
      return;
    }

    const emailHash = hashEmail(email);
    console.log("GOOGLE USER:", email, "| emailHash:", emailHash);

    let isNewUser = false;
    let user = await User.findOne({ emailHash });

    if (user) {
      console.log("FLOW: Usuario existe -> Iniciando sesión");
      // Reactivar si estaba borrado lógico
      await User.updateOne(
        { _id: user._id },
        {
          $set: { deletedAt: null, isActive: true, emailVerified: true, lastLogin: new Date() },
          $push: { activityLog: { action: 'google_login', timestamp: new Date(), metadata: { method: 'google_oauth' } } },
        }
      );
      // Recargar datos actualizados
      const updatedUser = await User.findById(user._id);
      if (updatedUser) user = updatedUser;
    } else {
      console.log("FLOW: Usuario no existe -> Registrando nuevo usuario con Google");
      isNewUser = true;

      const nameEncrypted = encrypt(name);
      const emailEncrypted = encrypt(email);
      const randomPassword = crypto.randomBytes(24).toString("hex");

      user = await User.create({
        nameEncrypted: nameEncrypted.encrypted,
        nameIv: nameEncrypted.iv,
        nameTag: nameEncrypted.tag,
        emailHash,
        emailEncrypted: emailEncrypted.encrypted,
        emailIv: emailEncrypted.iv,
        emailTag: emailEncrypted.tag,
        password: randomPassword,
        role: "user",
        plan: "free",
        emailVerified: true,
        isActive: true,
        authHash: crypto.randomBytes(4).toString("hex"),
        lastLogin: new Date(),
        activityLog: [{ action: 'account_created', timestamp: new Date(), metadata: { method: 'google_oauth' } }],
        legalAcceptance: {
          accepted: true,
          acceptedAt: new Date(),
          termsVersion: "1.0.0",
          acceptedDocuments: { terms: true, privacy: true, cookies: false },
        },
      });
      console.log("MONGO: Usuario Google creado OK -> id:", user._id);
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email, role: user.role, isAdmin: user.isAdmin, plan: user.plan },
      config.JWT_SECRET_KEY,
      { expiresIn: config.JWT_EXPIRES_IN_SECONDS }
    );

    const locale = payload.locale;

    res.json({
      success: true,
      token,
      userId: user._id.toString(),
      email,
      role: user.role,
      plan: user.plan,
      isNewUser,
      locale,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[AUTH] google-login ERROR:", msg, error);
    res.status(500).json({ success: false, error: "[ZN-ERR-API-501]: Fallo de verificación en la cuenta de Google." });
  }
});

export default router;
