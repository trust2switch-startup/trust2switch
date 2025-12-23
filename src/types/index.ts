// TypeScript type definitions

export interface ProgramHighlight {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface ComparisonRow {
  category: string;
  trust2switch: string;
  otherCourses: string;
}

export interface CareerTransition {
  hike?: string;
  name: string;
  field?: string;
  previousRole?: string;
  previousCompany?: string;
  newRole?: string;
  newCompany?: string;
  companyLogo: string | null;
  image?: string;
  review: string;
  video?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Certificate {
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

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  language: string;
  features: string[];
  bulletPoints?: string[];
  brochureDownloadLink?: string;
  noCostEMIAmount?: string;
  admissionDeadlineDate?: string;
  whoCanApply?: string[];
  programHighlights?: ProgramHighlight[];
  projects?: Project[];
  skills?: Skill[];
  comparisonData?: ComparisonRow[];
  careerTransitions?: CareerTransition[];
  faqs?: FAQ[];
  jobDescriptionsLink?: string;
  certificate?: Certificate;
  curriculum: {
    week: string;
    moduleName: string;
    topics: string[];
    learningOutcomes: string[];
    project?: string;
  }[];
  tags: string[];
  isPopular?: boolean;
  isNewCourse: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
}

export interface Product {
  id: string;
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
}

// Microsoft Clarity types
declare global {
  interface Window {
    clarity?: {
      (command: string, ...args: any[]): void;
      identify?: (userId: string, sessionId?: string, pageId?: string, userHint?: string) => void;
      set?: (key: string, value: string) => void;
      consent?: (consent: boolean) => void;
    };
  }
}


