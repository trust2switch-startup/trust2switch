// School subject by ID API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { schoolSubjectRepository } from '@/lib/repositories';
import { schoolSubjectUpdateSchema, validateSchema } from '@/lib/validation';

// PUT update school subject (requires auth)
export const PUT = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;
    const payload = await req.json();
    const parsed = validateSchema(schoolSubjectUpdateSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const updateData = parsed.data;

    const subject = await schoolSubjectRepository.updateById(id, updateData);

    if (!subject) {
      return NextResponse.json(
        { success: false, message: 'School subject not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: subject,
    });
  } catch (error: any) {
    console.error('Update school subject error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update school subject' },
      { status: 500 }
    );
  }
});

// DELETE school subject (requires auth)
export const DELETE = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const deleted = await schoolSubjectRepository.deleteById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'School subject not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'School subject deleted successfully',
    });
  } catch (error) {
    console.error('Delete school subject error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete school subject' },
      { status: 500 }
    );
  }
});

