// Blog post by ID API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { blogRepository } from '@/lib/repositories';
import { blogPostUpdateSchema, validateSchema } from '@/lib/validation';

// GET blog post by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const post = await blogRepository.findById(id);
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT update blog post (requires auth)
export const PUT = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;
    const payload = await req.json();
    const parsed = validateSchema(blogPostUpdateSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const updateData = parsed.data;

    const post = await blogRepository.updateById(id, updateData);

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    console.error('Update blog post error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update blog post' },
      { status: 500 }
    );
  }
});

// DELETE blog post (requires auth)
export const DELETE = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const deleted = await blogRepository.deleteById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
});

