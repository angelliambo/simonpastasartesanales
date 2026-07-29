import mongoose, { Schema, Document } from "mongoose";

export interface ITenant extends Document {
  subdomain: string;
  domain?: string;
  name: string;
  isActive: boolean;
  seo: {
    title: string;
    description: string;
    image?: string;
    keywords?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor?: string;
    darkMode: boolean;
  };
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema(
  {
    subdomain: { type: String, required: true, unique: true, index: true, lowercase: true },
    domain: { type: String, unique: true, sparse: true, index: true, lowercase: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String },
      keywords: { type: String },
    },
    theme: {
      primaryColor: { type: String, default: "#1890ff" },
      secondaryColor: { type: String, default: "#52c41a" },
      darkMode: { type: Boolean, default: false },
    },
    features: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Tenant || mongoose.model<ITenant>("Tenant", TenantSchema);
