// Course by ID API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { courseRepository } from '@/lib/repositories';
import { courseUpdateSchema, validateSchema } from '@/lib/validation';

// GET course by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const course = await courseRepository.findById(id);
    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Get course error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// PUT update course (requires auth)
export const PUT = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;
    const payload = await req.json();
    const parsed = validateSchema(courseUpdateSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const updateData = parsed.data;
    
    // Convert null values to undefined for repository compatibility
    const cleanUpdateData: Record<string, any> = {};
    for (const [key, value] of Object.entries(updateData)) {
      cleanUpdateData[key] = value === null ? undefined : value;
    }

    const course = await courseRepository.updateById(id, cleanUpdateData as any);

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    console.error('Update course error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update course' },
      { status: 500 }
    );
  }
});

// DELETE course (requires auth)
export const DELETE = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const deleted = await courseRepository.deleteById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Delete course error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete course' },
      { status: 500 }
    );
  }
});


