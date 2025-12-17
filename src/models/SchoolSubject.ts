// SchoolSubject model with Mongoose
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISchoolSubject extends Document {
  title: string;
  description: string;
  icon: string;
  slug: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolSubjectSchema = new Schema<ISchoolSubject>({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  order: { type: Number, default: 0, index: true },
}, {
  timestamps: true,
});

// Text index for search
SchoolSubjectSchema.index({ title: 'text', description: 'text' });

export const SchoolSubject: Model<ISchoolSubject> = mongoose.models.SchoolSubject || mongoose.model<ISchoolSubject>('SchoolSubject', SchoolSubjectSchema);

