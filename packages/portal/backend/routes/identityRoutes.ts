import { Router, Request, Response } from "express";
import crypto from "crypto";
import User from "../models/userModel";
import { encrypt, hashEmail } from "../utils/encryption";

const router = Router();

interface RegisterBody {
  email: string;
  name: string;
  googleId?: string;
}

router.post("/register", async (req: Request, res: Response) => {
  res.status(403).json({ success: false, error: "Metodo deshabilitado por seguridad" });
});

export default router;
