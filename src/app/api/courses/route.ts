// Courses API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
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

    const sortObj: Record<string, any> = search
      ? { score: { $meta: 'textScore' } }
      : { [pagination.sort]: pagination.order === 'asc' ? 1 : -1 };

    const courses = await courseRepository.find(filter, {
      sort: sortObj,
      limit: pagination.limit,
      skip: pagination.skip,
    });

    const total = await courseRepository.count(filter);

    return NextResponse.json({
      success: true,
      data: courses,
      total,
      limit: pagination.limit,
      skip: pagination.skip,
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch courses' },
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

    const course = await courseRepository.create(courseData);

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

