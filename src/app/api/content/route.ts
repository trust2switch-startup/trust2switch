// Content API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { contentRepository } from '@/lib/repositories';
import { contentSchema, validateSchema } from '@/lib/validation';

// GET content
export async function GET() {
  try {
    await ensureDatabaseConnection();

    let content = await contentRepository.findOne();
    
    // If no content exists, return empty structure
    if (!content) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No content configured yet',
      });
    }

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error('Get content error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT update content (requires auth)
export const PUT = withAuth(async (req) => {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(contentSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const contentData = parsed.data;

    const existing = await contentRepository.findOne();
    if (existing?._id) {
      const updated = await contentRepository.updateById(String(existing._id), contentData);
      return NextResponse.json({
        success: true,
        data: updated,
      });
    }

    const created = await contentRepository.create(contentData);

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (error: any) {
    console.error('Update content error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
});

