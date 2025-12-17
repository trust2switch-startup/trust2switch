// Content model with Mongoose - stores site-wide content configuration
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContent extends Document {
  site: {
    name: string;
    tagline: string;
    description: string;
    url: string;
  };
  navigation: {
    home: string;
    courses: string;
    about: string;
    blog: string;
    contact: string;
    cta: string;
  };
  home: any; // Complex nested structure
  courses: any;
  about: any;
  contact: any;
  blog: any;
  shop: any;
  footer: any;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>({
  site: {
    type: {
      name: { type: String, required: true },
      tagline: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String, required: true },
    },
    required: true,
  },
  navigation: {
    type: {
      home: { type: String, required: true },
      courses: { type: String, required: true },
      about: { type: String, required: true },
      blog: { type: String, required: true },
      contact: { type: String, required: true },
      cta: { type: String, required: true },
    },
    required: true,
  },
  home: { type: Schema.Types.Mixed, required: true },
  courses: { type: Schema.Types.Mixed, required: true },
  about: { type: Schema.Types.Mixed, required: true },
  contact: { type: Schema.Types.Mixed, required: true },
  blog: { type: Schema.Types.Mixed, required: true },
  shop: { type: Schema.Types.Mixed, required: true },
  footer: { type: Schema.Types.Mixed, required: true },
}, {
  timestamps: true,
});

// Only one content document should exist
ContentSchema.index({ _id: 1 }, { unique: true });

export const Content: Model<IContent> = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);

