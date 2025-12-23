// CallbackRequest model with Mongoose
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICallbackRequest {
  _id: string;
  name: string;
  phone: string;
  preferredTime: string;
  message?: string;
  status?: "pending" | "contacted" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const CallbackRequestSchema = new Schema<ICallbackRequest>(
  {
    name: { type: String, required: true, index: true },
    phone: { type: String, required: true, index: true },
    preferredTime: { type: String, required: true, index: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "contacted", "completed"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common queries
CallbackRequestSchema.index({ status: 1, createdAt: -1 });
CallbackRequestSchema.index({ preferredTime: 1, status: 1 });

// Text index for search
CallbackRequestSchema.index({ name: "text", phone: "text", message: "text" });

export const CallbackRequest: Model<ICallbackRequest> =
  mongoose.models.CallbackRequest ||
  mongoose.model<ICallbackRequest>("CallbackRequest", CallbackRequestSchema);
