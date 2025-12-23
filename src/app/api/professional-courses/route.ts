// Professional courses API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { courseRepository, professionalCourseRepository } from '@/lib/repositories';
import { professionalCourseSchema, validateSchema } from '@/lib/validation';

// GET all professional courses
export async function GET() {
  try {
    await ensureDatabaseConnection();

    // Fetch from Course repository instead of ProfessionalCourse repository
    // Filter out School category as requested
    const courses = await courseRepository.find(
      {
        isVisible: true,
        // @ts-ignore - Prisma filter syntax passed through generic repo
        category: {
          notIn: ['School', 'school', 'K-12']
        }
      },
      { sort: { createdAt: -1 } }
    );

    // Map categories to icons for frontend display
    const coursesWithIcons = courses.map((course: any) => {
      let icon = 'Code'; // Default

      const category = course.category?.toLowerCase() || '';

      if (category.includes('data') || category.includes('analytics')) {
        icon = 'Database';
      } else if (category.includes('design') || category.includes('ui/ux')) {
        icon = 'Palette';
      } else if (category.includes('cloud') || category.includes('aws')) {
        icon = 'Cloud';
      } else if (category.includes('mobile') || category.includes('app')) {
        icon = 'Laptop';
      } else if (category.includes('security')) {
        icon = 'Settings';
      } else if (category.includes('marketing') || category.includes('business')) {
        icon = 'BarChart3';
      } else if (category.includes('web') || category.includes('full stack')) {
        icon = 'Code';
      }

      return {
        ...course,
        icon
      };
    });

    return NextResponse.json({
      success: true,
      data: coursesWithIcons,
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


