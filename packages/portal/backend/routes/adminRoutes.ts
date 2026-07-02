import { Router, Request, Response } from "express";
import crypto from "crypto";
import User from "../models/userModel";
import { encrypt, hashEmail } from "../utils/encryption";
import { verifyIsLoggedIn, verifyIsAdmin } from "../middleware/verifyAuthToken";

const router = Router();

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);

router.get("/users", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({}, {
        emailHash: 1, plan: 1, role: 1, isAdmin: 1, isActive: 1,
        createdAt: 1, lastLogin: 1, deletedAt: 1, emailVerified: 1,
        _id: 1,
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments({}),
    ]);

    res.json({ success: true, users, total, page, limit });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin] Error GET /users:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

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
    const randomPassword = crypto.randomBytes(24).toString("hex");
    const authHash = crypto.randomBytes(4).toString("hex");

    const user = await User.create({
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
      authHash,
      lastLogin: new Date(),
      activityLog: [{ action: 'account_created', timestamp: new Date(), metadata: { method: 'admin_create' } }],
      legalAcceptance: {
        accepted: true,
        acceptedAt: new Date(),
        termsVersion: "1.0.0",
        acceptedDocuments: { terms: true, privacy: true, cookies: false },
      },
    });

    res.json({ success: true, userId: user._id.toString() });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin] Error POST /users:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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
        $push: { activityLog: { action: 'account_deleted', timestamp: new Date(), metadata: { method: 'admin_delete' } } },
      }
    );

    res.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Admin] Error DELETE /users/:id:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

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

export default router;
