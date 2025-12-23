// Course model with Mongoose
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProgramHighlight {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface IProject {
  title: string;
  description: string;
}

export interface IComparisonRow {
  category: string;
  trust2switch: string;
  otherCourses: string;
}

export interface ICareerTransition {
  hike?: string;
  name: string;
  field?: string;
  previousRole?: string;
  previousCompany?: string;
  newRole?: string;
  newCompany?: string;
  companyLogo: string | null;
  image: string;
  review: string;
  video?: string;
}


export interface IFAQ {
  question: string;
  answer: string;
}

export interface ISkill {
  name: string;
  icon: string;
}

export interface ICurriculumModule {
  week: string;
  moduleName: string;
  topics: string[];
  learningOutcomes: string[];
  project?: string;
}

export interface ICertificate {
  serialNumber: string;
  instituteName: string;
  instituteSubtitle: string;
  diplomaTitle: string;
  certificateText: string;
  directorName: string;
  directorTitle: string;
  deanName: string;
  deanTitle: string;
  address: string;
}

export interface IInstructor {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ICourse {
  _id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: IInstructor;
  image: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  language: string;
  features: string[];
  bulletPoints: string[];
  brochureDownloadLink?: string;
  noCostEMIAmount?: string;
  admissionDeadlineDate?: string;
  whoCanApply?: string[];
  programHighlights?: IProgramHighlight[];
  projects?: IProject[];
  skills?: ISkill[];
  comparisonData?: IComparisonRow[];
  careerTransitions?: ICareerTransition[];
  faqs?: IFAQ[];
  jobDescriptionsLink?: string;
  certificate?: ICertificate;
  curriculum: ICurriculumModule[];
  tags: string[];
  isPopular?: boolean;
  isNewCourse: boolean;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InstructorSchema = new Schema<IInstructor>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
  },
  { _id: false }
);

const ProgramHighlightSchema = new Schema<IProgramHighlight>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    gradient: { type: String, required: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

const ComparisonRowSchema = new Schema<IComparisonRow>(
  {
    category: { type: String, required: true },
    trust2switch: { type: String, required: true },
    otherCourses: { type: String, required: true },
  },
  { _id: false }
);

const CareerTransitionSchema = new Schema<ICareerTransition>(
  {
    hike: { type: String, required: false },
    name: { type: String, required: true },
    field: { type: String, required: false },
    previousRole: { type: String, required: false },
    previousCompany: { type: String, required: false },
    newRole: { type: String, required: false },
    newCompany: { type: String, required: false },
    companyLogo: { type: String, default: null },
    image: { type: String, required: false }, // Made optional as per prompt request "image... only to be shown", but implied required for display. However, prompt said "I want only Student Name and Review/Feebback to be mandatory rest not to be madatory". So image optional in schema, but we should probably try to show it if there.
    review: { type: String, required: false },
    video: { type: String, required: false },
  },
  { _id: false }
);

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const CurriculumModuleSchema = new Schema<ICurriculumModule>(
  {
    week: { type: String, required: true },
    moduleName: { type: String, required: true },
    topics: { type: [String], required: true },
    learningOutcomes: { type: [String], required: true },
    project: { type: String },
  },
  { _id: false }
);

const CertificateSchema = new Schema<ICertificate>(
  {
    serialNumber: { type: String, required: true },
    instituteName: { type: String, required: true },
    instituteSubtitle: { type: String, required: true },
    diplomaTitle: { type: String, required: true },
    certificateText: { type: String, required: true },
    directorName: { type: String, required: true },
    directorTitle: { type: String, required: true },
    deanName: { type: String, required: true },
    deanTitle: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const CourseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    instructor: { type: InstructorSchema, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
      index: true,
    },
    duration: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    originalPrice: { type: Number, default: null },
    rating: { type: Number, required: true, index: true },
    reviews: { type: Number, required: true, default: 0 },
    students: { type: Number, required: true, default: 0 },
    language: { type: String, required: true },
    features: { type: [String], default: [] },
    bulletPoints: { type: [String], default: [] },
    brochureDownloadLink: { type: String, default: null },
    noCostEMIAmount: { type: String, default: null },
    admissionDeadlineDate: { type: String, default: null },
    whoCanApply: { type: [String], default: [] },
    programHighlights: { type: [ProgramHighlightSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    skills: { type: [SkillSchema], default: [] },
    comparisonData: { type: [ComparisonRowSchema], default: [] },
    careerTransitions: { type: [CareerTransitionSchema], default: [] },
    faqs: { type: [FAQSchema], default: [] },
    jobDescriptionsLink: { type: String, default: null },
    certificate: { type: CertificateSchema, default: null },
    curriculum: { type: [CurriculumModuleSchema], required: true },
    tags: { type: [String], default: [], index: true },
    isPopular: { type: Boolean, default: false, index: true },
    // @ts-ignore - isNew conflicts with Document.isNew but we need it as a schema field
    isNewCourse: { type: Boolean, default: false, index: true },
    isVisible: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common queries
CourseSchema.index({ category: 1, level: 1 });
CourseSchema.index({ isPopular: 1, rating: -1 });
CourseSchema.index({ isNewCourse: 1, createdAt: -1 });
CourseSchema.index({ tags: 1, category: 1 });

// Text index for search
CourseSchema.index({ title: "text", description: "text", tags: "text" });

// Prevent OverwriteModelError in HMR
if (process.env.NODE_ENV !== 'production') {
  delete mongoose.models['Course'];
}

export const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
