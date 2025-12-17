import { z } from 'zod';

export type ValidationResult<T> = { data: T } | { error: string };

export const paginationSchema = z.object({
  limit: z.number().min(1).max(500).default(100),
  skip: z.number().min(0).default(0),
  sort: z.string().default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export function parsePagination(searchParams: URLSearchParams) {
  const limit = clamp(Number(searchParams.get('limit')) || 0, 1, 500) || 100;
  const skip = clamp(Number(searchParams.get('skip')) || 0, 0, Number.MAX_SAFE_INTEGER);
  const sort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';

  return paginationSchema.parse({ limit, skip, sort, order });
}

export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    const path = firstError.path.join('.') || 'payload';
    return { error: `${path}: ${firstError.message}` };
  }
  return { data: parsed.data };
}

const instructorSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().min(1),
  bio: z.string().min(1),
});

const programHighlightSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  gradient: z.string().min(1),
});

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
});

const comparisonRowSchema = z.object({
  category: z.string().min(1),
  trust2switch: z.string().min(1),
  otherCourses: z.string().min(1),
});

const careerTransitionSchema = z.object({
  hike: z.string().min(1),
  name: z.string().min(1),
  field: z.string().min(1),
  previousRole: z.string().min(1),
  previousCompany: z.string().min(1),
  newRole: z.string().min(1),
  newCompany: z.string().min(1),
  companyLogo: z.string().optional().nullable(),
  image: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const lessonSchema = z.object({
  title: z.string().min(1),
  duration: z.string().min(1),
  type: z.enum(['video', 'reading', 'assignment']),
});

const curriculumWeekSchema = z.object({
  week: z.number(),
  title: z.string().min(1),
  lessons: z.array(lessonSchema).min(1),
});

const certificateSchema = z.object({
  serialNumber: z.string().min(1),
  instituteName: z.string().min(1),
  instituteSubtitle: z.string().min(1),
  diplomaTitle: z.string().min(1),
  certificateText: z.string().min(1),
  directorName: z.string().min(1),
  directorTitle: z.string().min(1),
  deanName: z.string().min(1),
  deanTitle: z.string().min(1),
  address: z.string().min(1),
});

export const courseSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    longDescription: z.string().min(1),
    instructor: instructorSchema,
    image: z.string().min(1),
    category: z.string().min(1),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    duration: z.string().min(1),
    price: z.number(),
    originalPrice: z.number().nullable().default(null),
    rating: z.number(),
    reviews: z.number().default(0),
    students: z.number().default(0),
    language: z.string().min(1),
    features: z.array(z.string()).default([]),
    bulletPoints: z.array(z.string()).default([]),
    brochureDownloadLink: z.string().nullable().default(null),
    noCostEMIAmount: z.string().nullable().default(null),
    admissionDeadlineDate: z.string().nullable().default(null),
    whoCanApply: z.array(z.string()).default([]),
    programHighlights: z.array(programHighlightSchema).default([]),
    projects: z.array(projectSchema).default([]),
    skills: z.array(skillSchema).default([]),
    comparisonData: z.array(comparisonRowSchema).default([]),
    careerTransitions: z.array(careerTransitionSchema).default([]),
    faqs: z.array(faqSchema).default([]),
    jobDescriptionsLink: z.string().nullable().default(null),
    certificate: certificateSchema.nullable().default(null),
    curriculum: z.array(curriculumWeekSchema),
    tags: z.array(z.string()).default([]),
    isPopular: z.boolean().default(false),
    isNew: z.boolean().default(false),
  })
  .strict();

export const courseUpdateSchema = courseSchema.partial();

const authorSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
  role: z.string().min(1),
});

export const blogPostSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    content: z.string().min(1),
    author: authorSchema,
    image: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).default([]),
    publishedAt: z.string().min(1),
    readTime: z.string().min(1),
  })
  .strict();

export const blogPostUpdateSchema = blogPostSchema.partial();

export const productSchema = z
  .object({
    sku: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    longDescription: z.string().optional(),
    image: z.string().min(1),
    category: z.string().min(1),
    price: z.number(),
    originalPrice: z.number().optional(),
    currency: z.string().default('INR'),
    inStock: z.boolean().default(true),
    stockQuantity: z.number().optional(),
    rating: z.number().optional(),
    reviews: z.number().optional(),
    tags: z.array(z.string()).default([]),
    features: z.array(z.string()).optional().default([]),
    fileFormat: z.string().optional(),
    fileSize: z.string().optional(),
    deliveryMethod: z.string().optional(),
    isPopular: z.boolean().optional(),
    isNew: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  })
  .strict();

export const productUpdateSchema = productSchema.partial();

export const professionalCourseSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    icon: z.string().min(1),
    slug: z.string().min(1),
    order: z.number().optional(),
  })
  .strict();

export const professionalCourseUpdateSchema = professionalCourseSchema.partial();

export const schoolSubjectSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    icon: z.string().min(1),
    slug: z.string().min(1),
    order: z.number().optional(),
  })
  .strict();

export const schoolSubjectUpdateSchema = schoolSubjectSchema.partial();

export const contentSchema = z
  .object({
    site: z.object({
      name: z.string().min(1),
      tagline: z.string().min(1),
      description: z.string().min(1),
      url: z.string().min(1),
    }),
    navigation: z.object({
      home: z.string().min(1),
      courses: z.string().min(1),
      about: z.string().min(1),
      blog: z.string().min(1),
      contact: z.string().min(1),
      cta: z.string().min(1),
    }),
    home: z.record(z.any()),
    courses: z.record(z.any()),
    about: z.record(z.any()),
    contact: z.record(z.any()),
    blog: z.record(z.any()),
    shop: z.record(z.any()),
  })
  .strict();

export const contentUpdateSchema = contentSchema.partial();

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export const callbackRequestSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone number is required').regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),
    preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
      errorMap: () => ({ message: 'Preferred time is required' }),
    }),
    message: z.string().optional().default(''),
    status: z.enum(['pending', 'contacted', 'completed']).optional().default('pending'),
  })
  .strict();

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}
