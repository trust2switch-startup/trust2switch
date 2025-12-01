// Centralized Courses Data
// All course information is defined here

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

export const courses: Course[] = [
  {
    id: '1',
    slug: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    description: 'Master modern web development with React, Node.js, and MongoDB. Build real-world applications from scratch.',
    longDescription: 'This comprehensive course takes you from zero to hero in full-stack web development. You\'ll learn React for frontend, Node.js for backend, and MongoDB for database management. By the end, you\'ll have built multiple real-world projects and be ready for a career as a full-stack developer.',
    instructor: {
      name: 'John Smith',
      role: 'Senior Full Stack Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      bio: 'John has 10+ years of experience building scalable web applications. He has worked at companies like Amazon and Netflix.',
    },
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category: 'Web Development',
    level: 'Beginner',
    duration: '12 weeks',
    price: 299,
    originalPrice: 499,
    rating: 4.8,
    reviews: 1247,
    students: 15234,
    language: 'English',
    features: [
      '50+ hours of video content',
      '10+ real-world projects',
      'Lifetime access',
      'Certificate of completion',
      'Career support',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Web Development',
        lessons: [
          { title: 'Course Overview', duration: '15 min', type: 'video' },
          { title: 'Setting Up Your Environment', duration: '20 min', type: 'video' },
          { title: 'HTML & CSS Basics', duration: '45 min', type: 'video' },
        ],
      },
      {
        week: 2,
        title: 'JavaScript Fundamentals',
        lessons: [
          { title: 'Variables and Data Types', duration: '30 min', type: 'video' },
          { title: 'Functions and Scope', duration: '35 min', type: 'video' },
          { title: 'Arrays and Objects', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    isPopular: true,
  },
  {
    id: '2',
    slug: 'data-science-mastery',
    title: 'Data Science Mastery',
    description: 'Learn Python, pandas, machine learning, and data visualization. Become a data scientist in 16 weeks.',
    longDescription: 'This intensive course covers everything you need to become a data scientist. From Python programming to advanced machine learning algorithms, you\'ll work with real datasets and build predictive models.',
    instructor: {
      name: 'Dr. Sarah Williams',
      role: 'Lead Data Scientist',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      bio: 'Sarah holds a PhD in Statistics and has led data science teams at Fortune 500 companies.',
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '16 weeks',
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    reviews: 892,
    students: 9876,
    language: 'English',
    features: [
      '60+ hours of video content',
      '15+ hands-on projects',
      'Real-world datasets',
      'Jupyter notebooks included',
      'Career guidance',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Python for Data Science',
        lessons: [
          { title: 'Python Basics', duration: '30 min', type: 'video' },
          { title: 'NumPy and Pandas', duration: '45 min', type: 'video' },
          { title: 'Data Cleaning', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['Python', 'Machine Learning', 'Pandas', 'Data Visualization'],
    isPopular: true,
  },
  {
    id: '3',
    slug: 'ux-ui-design-bootcamp',
    title: 'UX/UI Design Bootcamp',
    description: 'Master user experience and interface design. Learn Figma, design systems, and user research methods.',
    longDescription: 'This bootcamp teaches you everything about UX/UI design. From user research to prototyping, you\'ll learn industry-standard tools and methodologies used by top design teams.',
    instructor: {
      name: 'Emily Chen',
      role: 'Senior UX Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      bio: 'Emily has designed products for companies like Apple and Airbnb. She specializes in user-centered design.',
    },
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    category: 'Design',
    level: 'Beginner',
    duration: '10 weeks',
    price: 349,
    originalPrice: 549,
    rating: 4.7,
    reviews: 634,
    students: 7654,
    language: 'English',
    features: [
      '40+ hours of video content',
      '8+ design projects',
      'Figma files included',
      'Design system templates',
      'Portfolio review',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to UX/UI Design',
        lessons: [
          { title: 'Design Principles', duration: '25 min', type: 'video' },
          { title: 'User Research Basics', duration: '30 min', type: 'video' },
          { title: 'Getting Started with Figma', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['Figma', 'UX Design', 'UI Design', 'Prototyping'],
    isNew: true,
  },
  {
    id: '4',
    slug: 'cloud-computing-aws',
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services. Learn EC2, S3, Lambda, and more. Get AWS certified.',
    longDescription: 'This course prepares you for AWS certification while teaching you practical cloud computing skills. You\'ll deploy applications, manage infrastructure, and optimize costs.',
    instructor: {
      name: 'Michael Johnson',
      role: 'Cloud Solutions Architect',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Michael is an AWS-certified solutions architect with 8+ years of cloud infrastructure experience.',
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    category: 'Cloud Computing',
    level: 'Intermediate',
    duration: '14 weeks',
    price: 379,
    originalPrice: 579,
    rating: 4.6,
    reviews: 456,
    students: 5432,
    language: 'English',
    features: [
      '55+ hours of video content',
      '12+ hands-on labs',
      'AWS free tier access',
      'Practice exams included',
      'Certification prep',
    ],
    curriculum: [
      {
        week: 1,
        title: 'AWS Fundamentals',
        lessons: [
          { title: 'Introduction to Cloud Computing', duration: '20 min', type: 'video' },
          { title: 'AWS Console Overview', duration: '25 min', type: 'video' },
          { title: 'EC2 Basics', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['AWS', 'Cloud Computing', 'DevOps', 'Infrastructure'],
  },
  {
    id: '5',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native. Create cross-platform mobile applications.',
    longDescription: 'Learn to build native mobile apps for both iOS and Android using React Native. You\'ll create multiple apps and learn to publish them to app stores.',
    instructor: {
      name: 'David Kim',
      role: 'Mobile App Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      bio: 'David has built 20+ mobile apps with millions of downloads. He specializes in React Native.',
    },
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '11 weeks',
    price: 329,
    originalPrice: 529,
    rating: 4.8,
    reviews: 723,
    students: 8765,
    language: 'English',
    features: [
      '45+ hours of video content',
      '6+ mobile app projects',
      'App store publishing guide',
      'React Native best practices',
      'State management',
    ],
    curriculum: [
      {
        week: 1,
        title: 'React Native Basics',
        lessons: [
          { title: 'Setting Up React Native', duration: '30 min', type: 'video' },
          { title: 'Components and Props', duration: '35 min', type: 'video' },
          { title: 'Navigation', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['React Native', 'iOS', 'Android', 'Mobile Development'],
  },
  {
    id: '6',
    slug: 'digital-marketing-mastery',
    title: 'Digital Marketing Mastery',
    description: 'Master SEO, social media, content marketing, and analytics. Grow businesses online.',
    longDescription: 'This comprehensive course covers all aspects of digital marketing. From SEO to paid advertising, you\'ll learn strategies that drive real results.',
    instructor: {
      name: 'Lisa Anderson',
      role: 'Digital Marketing Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Lisa has grown multiple businesses from zero to millions in revenue using digital marketing.',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category: 'Marketing',
    level: 'Beginner',
    duration: '9 weeks',
    price: 279,
    originalPrice: 479,
    rating: 4.5,
    reviews: 567,
    students: 6543,
    language: 'English',
    features: [
      '35+ hours of video content',
      '5+ marketing campaigns',
      'Analytics tools training',
      'SEO optimization guide',
      'Social media strategies',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Digital Marketing',
        lessons: [
          { title: 'Marketing Fundamentals', duration: '25 min', type: 'video' },
          { title: 'SEO Basics', duration: '30 min', type: 'video' },
          { title: 'Content Marketing', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
  },
];

export const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Cloud Computing', 'Mobile Development', 'Marketing'];

export const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];


