// User model for admin authentication
import mongoose, { Schema, Document, Model } from "mongoose";
import type { Permission } from "@/lib/auth/permissions";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "custom";
  permissions?: Permission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<Permission>(
  {
    resource: {
      type: String,
      enum: ["courses", "blog", "products", "callbackRequests", "users", "settings"],
      required: true,
    },
    actions: {
      type: [String],
      enum: ["view", "create", "edit", "delete"],
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "editor", "custom"],
      default: "admin",
      index: true,
    },
    permissions: {
      type: [PermissionSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
