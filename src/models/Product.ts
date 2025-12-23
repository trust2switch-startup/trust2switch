// Product model with Mongoose
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct {
  _id: string; // Compatibility
  sku: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  inStock: boolean;
  stockQuantity?: number;
  rating?: number;
  reviews?: number;
  tags: string[];
  features?: string[];
  fileFormat?: string;
  fileSize?: string;
  deliveryMethod?: string;
  isPopular?: boolean;
  isNewProduct: boolean;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, index: true },
    originalPrice: { type: Number },
    currency: { type: String, default: "INR" },
    inStock: { type: Boolean, required: true, default: true, index: true },
    stockQuantity: { type: Number },
    rating: { type: Number, index: true },
    reviews: { type: Number },
    tags: { type: [String], index: true },
    features: [String],
    fileFormat: { type: String },
    fileSize: { type: String },
    deliveryMethod: { type: String },
    isPopular: { type: Boolean, index: true },
    // @ts-ignore - isNew conflicts with Document.isNew but we need it as a schema field
    isNewProduct: { type: Boolean, index: true },
    isFeatured: { type: Boolean, index: true },
  },
  {
    timestamps: true,
  }
);

// Compound indexes
ProductSchema.index({ category: 1, inStock: 1 });
ProductSchema.index({ isPopular: 1, rating: -1 });
ProductSchema.index({ isFeatured: 1, isPopular: 1 });
ProductSchema.index({ isNewProduct: 1, createdAt: -1 });
ProductSchema.index({ tags: 1, category: 1 });

// Text index for search
ProductSchema.index({ title: "text", description: "text", tags: "text" });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
