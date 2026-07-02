import { Router, Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { encrypt, decrypt, hashEmail } from "../utils/encryption";
import { sendDeletionCode } from "../services/emailService";
import config from "../config/environment";

const router = Router();

const EXPIRY_MINUTES = 3;
const JWT_SECRET = config.JWT_SECRET_KEY;

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateJwt(user: any, email: string): string {
  const payload = { userId: user._id.toString(), email, role: user.role, isAdmin: user.isAdmin, plan: user.plan };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN_SECONDS });
}

router.post("/send-token", async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email?: string };
    console.log("\n========== [AUTH] send-token ==========");
    console.log("INPUT:", JSON.stringify({ email }));
    
    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail) {
      console.log("FAIL: email vacío");
      res.status(400).json({ success: false, error: "email requerido" });
      return;
    }

    const emailHash = hashEmail(cleanEmail);
    console.log("COMPUTED: emailHash=" + emailHash);

    const existingUser = await User.findOne({ emailHash });
    console.log("MONGO: findOne({ emailHash })");
    console.log("RESULT: usuario=", existingUser ? { _id: existingUser._id, plan: existingUser.plan, role: existingUser.role } : "NO EXISTE");

    const code = generateCode();
    const expiry = new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000);
    console.log("INFO: code generated | expires:", expiry.toISOString());

    if (existingUser) {
      await User.updateOne(
        { emailHash },
        { $set: { authCode: code, authCodeExpiry: expiry } }
      );
      console.log("MONGO: updateOne({ emailHash }) SET authCode OK");
    } else {
      console.log("MONGO: usuario no existe, creando inactivo con authCode");
      const name = cleanEmail.split("@")[0];
      let nameEncrypted, emailEncrypted;
      try {
        nameEncrypted = encrypt(name);
        emailEncrypted = encrypt(cleanEmail);
      } catch (e) {
        console.error("FAIL: encrypt falló -", e instanceof Error ? e.message : e);
        res.status(500).json({ success: false, error: "Error de encriptación." });
        return;
      }

      const randomPassword = crypto.randomBytes(24).toString("hex");
      await User.create({
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
        emailVerified: false,
        isActive: false,
        authCode: code,
        authCodeExpiry: expiry,
        authHash: crypto.randomBytes(4).toString("hex"),
        activityLog: [{ action: 'account_created', timestamp: new Date(), metadata: { method: 'email_code_pending' } }],
        legalAcceptance: {
          accepted: true,
          acceptedAt: new Date(),
          termsVersion: "1.0.0",
          acceptedDocuments: { terms: true, privacy: true, cookies: false },
        },
      });
      console.log("MONGO: User.create() inactivo OK");
    }

    try {
      const locale = req.body.locale || (typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : undefined);
      await sendDeletionCode(cleanEmail, code, locale);
      console.log("EMAIL: enviado a", cleanEmail);
      res.json({ success: true, message: "Código enviado al email" });
    } catch (e) {
      console.warn("EMAIL: falló envío a", cleanEmail, e);
      if (process.env.NODE_ENV === "development") {
        res.json({ success: true, message: "Código enviado al email", devCode: code });
      } else {
        res.json({ success: true, message: "Código enviado al email" });
      }
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[AUTH] send-token ERROR:", msg, error);
    res.status(500).json({ success: false, error: msg });
  }
});

router.post("/verify-token", async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body as { email?: string; code?: string };
    console.log("\n========== [AUTH] verify-token ==========");
    console.log("INPUT:", JSON.stringify({ email, code: code ? "[HIDDEN]" : "MISSING" }));

    const cleanEmail = email?.trim().toLowerCase();
    const cleanCode = code?.trim();

    if (!cleanEmail || !cleanCode) {
      console.log("FAIL: email o code vacío");
      res.status(400).json({ success: false, error: "email y code requeridos" });
      return;
    }

    const emailHash = hashEmail(cleanEmail);
    console.log("COMPUTED: emailHash=" + emailHash);

    let isNewUser = false;
    let user = await User.findOne({ emailHash });
    console.log("MONGO: findOne({ emailHash })");

    if (!user || user.deletedAt) {
      console.log("FAIL: usuario no existe o está eliminado");
      res.status(400).json({ success: false, error: "Usuario no registrado. Solicitá un código primero." });
      return;
    }

    console.log("FLOW: validando código");
    console.log("DEBUG: DB authCode present:", !!user.authCode, "| expiry:", user.authCodeExpiry);
    
    if (!user.authCode || user.authCode !== cleanCode) {
      console.log("FAIL: código incorrecto. Input length:", cleanCode.length, "DB length:", user.authCode ? user.authCode.length : 0);
      res.status(400).json({ success: false, error: "Código incorrecto" });
      return;
    }
    if (user.authCodeExpiry && user.authCodeExpiry < new Date()) {
      console.log("FAIL: código expirado");
      res.status(400).json({ success: false, error: "Código expirado. Solicitá uno nuevo." });
      return;
    }

    if (!user.emailVerified || !user.isActive) {
      isNewUser = true;
    }

    await User.updateOne(
      { _id: user._id },
      {
        $set: { 
          authCode: null, 
          authCodeExpiry: null, 
          emailVerified: true, 
          isActive: true, 
          authHash: crypto.randomBytes(4).toString("hex"), 
          lastLogin: new Date() 
        },
        $push: { activityLog: { action: isNewUser ? 'email_verified' : 'login', timestamp: new Date(), metadata: { method: 'email_code' } } },
      }
    );
    console.log("MONGO: updateOne SET authCode=null, emailVerified=true, isActive=true, lastLogin logged");

    const token = generateJwt(user, cleanEmail);
    const userTermsVersion = user.legalAcceptance?.termsVersion || "1.0.0";
    const hasAcceptedLatestTyc = userTermsVersion === "1.0.0" || userTermsVersion === "2.0.0";
    const acceptedTycVersion = hasAcceptedLatestTyc ? "2.0.0" : userTermsVersion;

    res.json({
      success: true,
      token,
      userId: user._id.toString(),
      email: cleanEmail,
      role: user.role,
      plan: user.plan,
      isNewUser,
      acceptedTycVersion,
      hasAcceptedLatestTyc,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[AUTH] verify-token ERROR:", msg, error);
    res.status(500).json({ success: false, error: msg });
  }
});

router.post("/exchange", async (req: Request, res: Response) => {
  res.status(403).json({ success: false, error: "Metodo deshabilitado por seguridad" });
});

// POST /auth/refresh — refrescar JWT de un userId existente
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body as { userId?: string };
    if (!userId) {
      res.status(400).json({ success: false, error: "userId requerido" });
      return;
    }
    const user = await User.findById(userId);
    if (!user || user.deletedAt) {
      res.status(404).json({ success: false, error: "Usuario no encontrado" });
      return;
    }
    let email = "";
    try { email = decrypt(user.emailEncrypted, user.emailIv, user.emailTag); } catch {}
    const token = generateJwt(user, email);
    res.json({ success: true, token, userId: user._id.toString(), email, role: user.role, plan: user.plan });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ success: false, error: msg });
  }
});

// GET /auth/me — validate userId exists and return profile
router.get("/me", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query as { userId?: string };
    if (!userId) {
      res.status(400).json({ success: false, exists: false, error: "userId requerido" });
      return;
    }
    const user = await User.findById(userId, {
      _id: 1, emailHash: 1, plan: 1, role: 1, isAdmin: 1, createdAt: 1, lastLogin: 1, deletedAt: 1, legalAcceptance: 1,
    }).lean();
    if (!user || user.deletedAt) {
      res.json({ success: true, exists: false });
      return;
    }
    const userTermsVersion = user.legalAcceptance?.termsVersion || "1.0.0";
    const hasAcceptedLatestTyc = userTermsVersion === "1.0.0" || userTermsVersion === "2.0.0";
    const acceptedTycVersion = hasAcceptedLatestTyc ? "2.0.0" : userTermsVersion;

    res.json({
      success: true,
      exists: true,
      profile: {
        _id: user._id.toString(),
        emailHash: user.emailHash,
        plan: user.plan,
        role: user.role,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        acceptedTycVersion,
        hasAcceptedLatestTyc,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[AUTH] GET /me ERROR:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// POST /auth/restore-request — send restore token if email exists (even deleted)
router.post("/restore-request", async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email) {
      res.status(400).json({ success: false, error: "email requerido" });
      return;
    }

    const emailHash = hashEmail(email);
    const user = await User.findOne({ emailHash });
    if (!user) {
      // Don't reveal if email exists or not
      res.json({ success: true, message: "Si la cuenta existe, recibirás un código de recuperación." });
      return;
    }

    const code = generateCode();
    const expiry = new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000);

    await User.updateOne(
      { _id: user._id },
      { $set: { authCode: code, authCodeExpiry: expiry } }
    );

    try {
      const locale = req.body.locale || (typeof req.headers["accept-language"] === "string" ? req.headers["accept-language"] : undefined);
      await sendDeletionCode(email, code, locale);
    } catch {
      console.warn(`[AUTH] No se pudo enviar código de recuperación a ${email}`);
    }

    res.json({ success: true, message: "Si la cuenta existe, recibirás un código de recuperación." });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[AUTH] restore-request ERROR:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// POST /auth/restore-confirm — validate token and reactivate account
router.post("/restore-confirm", async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body as { email?: string; code?: string };
    if (!email || !code) {
      res.status(400).json({ success: false, error: "email y code requeridos" });
      return;
    }

    const emailHash = hashEmail(email);
    const user = await User.findOne({ emailHash });

    if (!user) {
      res.status(400).json({ success: false, error: "No se encontró una cuenta con ese email." });
      return;
    }

    if (!user.authCode || user.authCode !== code) {
      res.status(400).json({ success: false, error: "Código incorrecto" });
      return;
    }

    if (user.authCodeExpiry && user.authCodeExpiry < new Date()) {
      res.status(400).json({ success: false, error: "Código expirado. Solicitá uno nuevo." });
      return;
    }

    // Reactivate account
    const newAuthHash = crypto.randomBytes(4).toString("hex");
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          deletedAt: null,
          isActive: true,
          authHash: newAuthHash,
          authCode: null,
          authCodeExpiry: null,
          lastLogin: new Date(),
        },
        $push: { activityLog: { action: 'account_restored', timestamp: new Date(), metadata: {} } },
      }
    );

    const token = generateJwt(user, email);
    const userTermsVersion = user.legalAcceptance?.termsVersion || "1.0.0";
    const hasAcceptedLatestTyc = userTermsVersion === "1.0.0" || userTermsVersion === "2.0.0";
    const acceptedTycVersion = hasAcceptedLatestTyc ? "2.0.0" : userTermsVersion;

    res.json({
      success: true,
      token,
      userId: user._id.toString(),
      email,
      role: user.role,
      plan: user.plan,
      isRestored: true,
      acceptedTycVersion,
      hasAcceptedLatestTyc,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[AUTH] restore-confirm ERROR:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

export default router;
