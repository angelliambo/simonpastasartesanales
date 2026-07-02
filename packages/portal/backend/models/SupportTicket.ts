import mongoose, { Schema, Document, Model } from "mongoose";

export interface TicketComment {
  authorId?: mongoose.Types.ObjectId;
  authorEmail: string;
  authorRole: "user" | "admin";
  message: string;
  createdAt: Date;
}

export interface SupportTicketDoc extends Document {
  ticketId: string;
  userId?: mongoose.Types.ObjectId;
  email: string;
  name: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "closed";
  lastMessageBy: "user" | "admin";
  userRead: boolean;
  adminRead: boolean;
  comments: TicketComment[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<TicketComment>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", index: true, sparse: true },
    authorEmail: { type: String, required: true, lowercase: true },
    authorRole: { type: String, enum: ["user", "admin"], required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ticketSchema = new Schema<SupportTicketDoc>(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true, sparse: true },
    email: { type: String, required: true, lowercase: true },
    name: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "closed"],
      default: "open",
    },
    lastMessageBy: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userRead: {
      type: Boolean,
      default: true,
    },
    adminRead: {
      type: Boolean,
      default: false,
    },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

function generateTicketId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ZN-${y}${m}${d}-${rand}`;
}

export { generateTicketId };

const SupportTicketModel =
  (mongoose.models.SupportTicket as Model<SupportTicketDoc>) ||
  mongoose.model<SupportTicketDoc>("SupportTicket", ticketSchema);

export default SupportTicketModel;
