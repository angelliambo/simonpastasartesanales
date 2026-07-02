import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

export type LicensePlan = "free" | "6_meses" | "1_ano" | "god_mode";
export type LicenseStatus = "active" | "expired" | "cancelled" | "refunded";

export interface LicenseDoc extends Document {
  emailHash: string;
  userId?: mongoose.Types.ObjectId;
  claimToken: string;
  lemonOrderId: number;
  lemonCustomerId: number;
  lemonSubscriptionId?: number;
  variantId: number;
  plan: LicensePlan;
  status: LicenseStatus;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

function hashEmail(email: string): string {
  return crypto.createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
}

function generateClaimToken(): string {
  return crypto.randomUUID();
}

const licenseSchema = new Schema<LicenseDoc>(
  {
    emailHash: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    claimToken: {
      type: String,
      required: true,
    },
    lemonOrderId: {
      type: Number,
      required: true,
    },
    lemonCustomerId: {
      type: Number,
      required: true,
    },
    lemonSubscriptionId: {
      type: Number,
    },
    variantId: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "6_meses", "1_ano", "god_mode"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "refunded"],
      default: "active",
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const License = mongoose.model<LicenseDoc>("License", licenseSchema);

export { hashEmail, generateClaimToken };
export default License;
