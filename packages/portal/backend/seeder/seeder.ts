import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { encrypt, hashEmail } from "../utils/encryption";
import UserModel from "../models/userModel";
import License, { generateClaimToken } from "../models/DeviceLicense";


// ── Guardia de producción ──
if (process.env.NODE_ENV === "production" && process.env.ALLOW_SEED !== "true") {
  console.error("❌ No corras seed en producción. Seteá ALLOW_SEED=true si estás seguro.");
  process.exit(1);
}

// ── Cargar env ──
const nodeEnv = process.env.NODE_ENV || "development";
const envFile = path.resolve(__dirname, `../env.${nodeEnv}`);
dotenv.config({ path: envFile });

const BBD = process.env.BBD || "mongodb://localhost:27017/factory-portal";

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  plan: "free" | "6_meses" | "1_ano" | "god_mode";
  expiresAt: Date | null;
}

const USERS: SeedUser[] = [
  {
    email: `"admin@${process.env.EMAIL_DOMAIN}"`,
    password: "test1234",
    name: "Admin",
    role: "admin",
    plan: "god_mode",
    expiresAt: null,
  },
  {
    email: "free@zn.com",
    password: "test1234",
    name: "Usuario Free",
    role: "user",
    plan: "free",
    expiresAt: null,
  },
  {
    email: "semestral@zn.com",
    password: "test1234",
    name: "Usuario Semestral",
    role: "user",
    plan: "6_meses",
    expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
  },
  {
    email: "anual@zn.com",
    password: "test1234",
    name: "Usuario Anual",
    role: "user",
    plan: "1_ano",
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  },
];

async function seed() {
  try {
    await mongoose.connect(BBD);
    console.log("✅ Conectado a MongoDB");

    const emails = USERS.map((u) => hashEmail(u.email));

    // Solo borrar estos 4 usuarios, no toda la colección
    const deleteResult = await UserModel.deleteMany({ emailHash: { $in: emails } });
    await License.deleteMany({ emailHash: { $in: emails } });
    console.log(`🧹 Eliminados ${deleteResult.deletedCount} usuarios existentes (seed)`);

    for (const u of USERS) {
      const emailHashValue = hashEmail(u.email);
      const nameEnc = encrypt(u.name);
      const emailEnc = encrypt(u.email);
      const hashedPassword = await bcrypt.hash(u.password, 10);

      const user = await UserModel.create({
        nameEncrypted: nameEnc.encrypted,
        nameIv: nameEnc.iv,
        nameTag: nameEnc.tag,
        emailHash: emailHashValue,
        emailEncrypted: emailEnc.encrypted,
        emailIv: emailEnc.iv,
        emailTag: emailEnc.tag,
        password: hashedPassword,
        role: u.role,
        isAdmin: u.role === "admin",
        plan: u.plan,
        planExpiresAt: u.expiresAt || undefined,
        emailVerified: true,
        legalAcceptance: {
          accepted: true,
          acceptedAt: new Date(),
          termsVersion: "1.0",
          acceptedDocuments: { terms: true, privacy: true, cookies: true },
        },
      });

      const license = await License.create({
        emailHash: emailHashValue,
        userId: user._id,
        claimToken: generateClaimToken(),
        lemonOrderId: 0,
        lemonCustomerId: 0,
        variantId: 0,
        plan: u.plan,
        status: u.plan === "free" ? "active" : "active",
        expiresAt: u.expiresAt,
      });

      // Vincular License al User
      user.licenseId = license._id;
      await user.save();

      console.log(`  ✅ ${u.email.padEnd(25)} → plan: ${u.plan.padEnd(10)} role: ${u.role}`);
    }

    console.log("\n🎉 Seed completado. Todos los usuarios usan la contraseña: test1234");
    console.log("   admin@zn.com    → god_mode (admin)");
    console.log("   free@zn.com     → free");
    console.log("   semestral@zn.com → 6_meses");
    console.log("   anual@zn.com    → 1_ano");
  } catch (err) {
    console.error("❌ Error en seed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
