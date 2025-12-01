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


