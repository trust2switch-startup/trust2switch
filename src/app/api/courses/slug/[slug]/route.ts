// Course by slug API route
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { courseRepository } from '@/lib/repositories';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  let slug: string = '';
  try {
    await ensureDatabaseConnection();
    slug = (await params).slug;

    const course = await courseRepository.findOne({ slug });
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
    console.error('Get course by slug error:', error);
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = isDevelopment 
      ? `Failed to fetch course: ${error?.message || 'Unknown error'}`
      : 'Failed to fetch course';
    
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      slug,
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        ...(isDevelopment && { error: error?.message })
      },
      { status: 500 }
    );
  }
}


