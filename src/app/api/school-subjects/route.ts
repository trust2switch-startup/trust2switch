// School subjects API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { schoolSubjectRepository } from '@/lib/repositories';
import { schoolSubjectSchema, validateSchema } from '@/lib/validation';

// GET all school subjects
export async function GET() {
  try {
    await ensureDatabaseConnection();

    const subjects = await schoolSubjectRepository.find(
      {},
      {
        sort: { order: 1, createdAt: -1 },
        select: ['id', 'title', 'description', 'slug', 'icon']
      }
    );

    return NextResponse.json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    console.error('Get school subjects error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch school subjects' },
      { status: 500 }
    );
  }
}

// POST create school subject (requires auth)
export const POST = withAuth(async (req) => {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(schoolSubjectSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const subjectData = parsed.data;

    // Check if slug already exists
    const existingSubject = await schoolSubjectRepository.findOne({ slug: subjectData.slug });
    if (existingSubject) {
      return NextResponse.json(
        { success: false, message: 'School subject with this slug already exists' },
        { status: 400 }
      );
    }

    const subject = await schoolSubjectRepository.create(subjectData);

    return NextResponse.json({
      success: true,
      data: subject,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create school subject error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create school subject' },
      { status: 500 }
    );
  }
});


