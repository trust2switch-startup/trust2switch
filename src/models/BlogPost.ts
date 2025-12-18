// BlogPost model with Mongoose
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuthor {
  name: string;
  image: string;
  role: string;
}

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: IAuthor;
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, required: true },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: AuthorSchema, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    tags: { type: [String], index: true },
    publishedAt: { type: String, required: true, index: true },
    readTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Compound indexes
BlogPostSchema.index({ category: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1, publishedAt: -1 });

// Text index for search
BlogPostSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
  tags: "text",
});

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
