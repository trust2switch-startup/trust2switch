// TypeScript type definitions

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
  curriculum: {
    week: number;
    title: string;
    lessons: {
      title: string;
      duration: string;
      type: 'video' | 'reading' | 'assignment';
    }[];
  }[];
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
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
  isNew?: boolean;
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


