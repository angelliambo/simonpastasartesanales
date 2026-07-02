import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "user";

export interface ActivityEntry {
  action: 'account_created' | 'login' | 'logout' | 'account_deleted' | 'terms_accepted' | 'plan_changed' | 'google_login' | 'email_code_sent' | 'email_verified';
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface UserDoc extends Document {
  nameEncrypted: string;
  nameIv: string;
  nameTag: string;
  emailHash: string;
  emailEncrypted: string;
  emailIv: string;
  emailTag: string;
  password: string;
  role: UserRole;
  isAdmin: boolean;
  licenseId?: mongoose.Types.ObjectId;
  lemonCustomerId?: number;
  plan: "free" | "6_meses" | "1_ano" | "god_mode";
  planExpiresAt?: Date;
  emailVerified: boolean;
  legalAcceptance: {
    accepted: boolean;
    acceptedAt?: Date;
    termsVersion: string;
    acceptedDocuments: {
      terms: boolean;
      privacy: boolean;
      cookies: boolean;
    };
  };
  deletionCode?: string;
  deletionCodeExpiry?: Date;
  authCode?: string;
  authCodeExpiry?: Date;
  deletedAt?: Date | null;
  authHash: string;
  isActive: boolean;
  lastLogin?: Date;
  activityLog: ActivityEntry[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const legalSchema = new Schema(
  {
    accepted: { type: Boolean, default: false },
    acceptedAt: { type: Date },
    termsVersion: { type: String, default: "1.0" },
    acceptedDocuments: {
      terms: { type: Boolean, default: false },
      privacy: { type: Boolean, default: false },
      cookies: { type: Boolean, default: false },
    },
  },
  { _id: false }
);

const userSchema = new Schema<UserDoc>(
  {
    nameEncrypted: { type: String, required: true },
    nameIv: { type: String, required: true },
    nameTag: { type: String, required: true },
    emailHash: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    emailEncrypted: { type: String, required: true },
    emailIv: { type: String, required: true },
    emailTag: { type: String, required: true },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    isAdmin: { type: Boolean, default: false },
    licenseId: { type: Schema.Types.ObjectId, ref: "License" },
    lemonCustomerId: { type: Number },
    plan: {
      type: String,
      enum: ["free", "6_meses", "1_ano", "god_mode"],
      required: true,
      default: "free",
    },
    planExpiresAt: { type: Date },
    authHash: { type: String, default: '' },
    emailVerified: { type: Boolean, default: false },
    legalAcceptance: { type: legalSchema, default: () => ({}) },
    deletionCode: { type: String },
    deletionCodeExpiry: { type: Date },
    authCode: { type: String },
    authCodeExpiry: { type: Date },
    deletedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    activityLog: [
      {
        action: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        metadata: { type: Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ emailHash: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

userSchema.pre("save", async function (next) {
  if (this.role === "admin" || this.isAdmin) {
    this.plan = "god_mode";
  }
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.logActivity = function (
  action: ActivityEntry['action'],
  metadata?: Record<string, unknown>
) {
  this.activityLog.push({ action, timestamp: new Date(), metadata });
  this.lastLogin = action === 'login' || action === 'google_login' || action === 'account_created'
    ? new Date()
    : this.lastLogin;
};

const UserModel =
  (mongoose.models.User as Model<UserDoc>) ||
  mongoose.model<UserDoc>("User", userSchema);

export default UserModel;
