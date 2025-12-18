// Professional courses API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { professionalCourseRepository } from '@/lib/repositories';
import { professionalCourseSchema, validateSchema } from '@/lib/validation';

// GET all professional courses
export async function GET() {
  try {
    await ensureDatabaseConnection();

    const courses = await professionalCourseRepository.find(
      {},
      { sort: { order: 1, createdAt: -1 } }
    );

    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error('Get professional courses error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch professional courses' },
      { status: 500 }
    );
  }
}

// POST create professional course (requires auth)
export const POST = withAuth(async (req) => {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(professionalCourseSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const courseData = parsed.data;

    // Check if slug already exists
    const existingCourse = await professionalCourseRepository.findOne({ slug: courseData.slug });
    if (existingCourse) {
      return NextResponse.json(
        { success: false, message: 'Professional course with this slug already exists' },
        { status: 400 }
      );
    }

    const course = await professionalCourseRepository.create(courseData);

    return NextResponse.json({
      success: true,
      data: course,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create professional course error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create professional course' },
      { status: 500 }
    );
  }
});


