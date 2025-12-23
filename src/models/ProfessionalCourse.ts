// ProfessionalCourse model with Mongoose
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProfessionalCourse {
  _id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProfessionalCourseSchema = new Schema<IProfessionalCourse>(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

// Text index for search
ProfessionalCourseSchema.index({ title: "text", description: "text" });

export const ProfessionalCourse: Model<IProfessionalCourse> =
  mongoose.models.ProfessionalCourse ||
  mongoose.model<IProfessionalCourse>(
    "ProfessionalCourse",
    ProfessionalCourseSchema
  );
