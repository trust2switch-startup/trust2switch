// Courses API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/auth';
import { courseRepository } from '@/lib/repositories';
import { parsePagination, validateSchema, courseSchema } from '@/lib/validation';

// GET all courses
export async function GET(req: NextRequest) {
  try {
    await ensureDatabaseConnection();

    const { searchParams } = new URL(req.url);
    const pagination = parsePagination(searchParams);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    const filter: Record<string, unknown> = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (level && level !== 'All') {
      filter.level = level;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // Check handling for visibility
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    const payload = token ? verifyToken(token) : null;
    const isAdmin = payload?.role === 'admin' || payload?.role === 'editor';

    // Build filter
    const where: any = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (level && level !== 'All') {
      where.level = level;
    }

    // Text search implementation for Prisma
    if (search) {
      where.OR = [
        { title: { contains: search } }, // Implicitly case-insensitive in MySQL usually, or use mode: 'insensitive'
        { description: { contains: search } },
        { tags: { array_contains: search } } // JSON array search if supported or string search
      ];
      // Note: Full text search in Prisma MySQL requires explicit raw query or @fulltext index usage which is specific.
      // For simple "contains", the above works for scalar fields. 
      // array_contains is for Postgres. For MySQL JSON, we might need path syntax or just ignore tags for now in simple search.
      // Let's simplify to title/description for stability.
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }

    if (!isAdmin) {
      where.isVisible = true;
    }

    // Sorting
    const orderBy: any = {};
    if (search) {
      // No text score in simple Prisma findMany, sort by relevance not easy without raw query.
      // Fallback to title or just created date
      orderBy.title = 'asc';
    } else {
      orderBy[pagination.sort] = pagination.order;
    }

    const courses = await courseRepository.find(where, {
      sort: orderBy,
      limit: pagination.limit,
      skip: pagination.skip,
      select: [
        'id', 'slug', 'title', 'description', 'image', 'category', 'level',
        'duration', 'price', 'originalPrice', 'rating', 'reviews', 'students',
        'isPopular', 'isNew', 'isVisible', 'createdAt', 'tags'
      ]
    });

    const total = await courseRepository.count(where);

    return NextResponse.json({
      success: true,
      data: courses,
      total,
      limit: pagination.limit,
      skip: pagination.skip,
    });
  } catch (error: any) {
    console.error('Get courses error:', error);

    // Provide more detailed error information in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = isDevelopment
      ? `Failed to fetch courses: ${error?.message || 'Unknown error'}`
      : 'Failed to fetch courses';

    // Log additional context for debugging
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseType: process.env.DATABASE_TYPE,
        nodeEnv: process.env.NODE_ENV,
      }
    });

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        ...(isDevelopment && { error: error?.message, stack: error?.stack })
      },
      { status: 500 }
    );
  }
}

// POST create course (requires auth)
export const POST = withAuth(async (req) => {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(courseSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const courseData = parsed.data;

    // Check if slug already exists
    const existingCourse = await courseRepository.findOne({ slug: courseData.slug });
    if (existingCourse) {
      return NextResponse.json(
        { success: false, message: 'Course with this slug already exists' },
        { status: 400 }
      );
    }

    // Convert null values to undefined for repository compatibility
    // And map frontend fields to database fields
    const { isNewCourse, ...rest } = courseData;
    const cleanCourseData: Record<string, any> = {
      ...rest,
      isNew: isNewCourse
    };

    for (const [key, value] of Object.entries(cleanCourseData)) {
      cleanCourseData[key] = value === null ? undefined : value;
    }

    const course = await courseRepository.create(cleanCourseData as any);

    return NextResponse.json({
      success: true,
      data: course,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create course' },
      { status: 500 }
    );
  }
});
