// Professional course by ID API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { professionalCourseRepository } from '@/lib/repositories';
import { professionalCourseUpdateSchema, validateSchema } from '@/lib/validation';

// PUT update professional course (requires auth)
export const PUT = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;
    const payload = await req.json();
    const parsed = validateSchema(professionalCourseUpdateSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const updateData = parsed.data;

    const course = await professionalCourseRepository.updateById(id, updateData);

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Professional course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    console.error('Update professional course error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update professional course' },
      { status: 500 }
    );
  }
});

// DELETE professional course (requires auth)
export const DELETE = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const deleted = await professionalCourseRepository.deleteById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Professional course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Professional course deleted successfully',
    });
  } catch (error) {
    console.error('Delete professional course error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete professional course' },
      { status: 500 }
    );
  }
});

