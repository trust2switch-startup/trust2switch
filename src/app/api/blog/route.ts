// Blog posts API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { blogRepository } from '@/lib/repositories';
import { blogPostSchema, parsePagination, validateSchema } from '@/lib/validation';

// GET all blog posts
export async function GET(req: NextRequest) {
  try {
    await ensureDatabaseConnection();

    const { searchParams } = new URL(req.url);
    const pagination = parsePagination(searchParams);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const sortObj: Record<string, any> = search
      ? { score: { $meta: 'textScore' } }
      : { [pagination.sort]: pagination.order === 'asc' ? 1 : -1 };

    const posts = await blogRepository.find(query, {
      sort: sortObj,
      limit: pagination.limit,
      skip: pagination.skip,
    });

    const total = await blogRepository.count(query);

    return NextResponse.json({
      success: true,
      data: posts,
      total,
      limit: pagination.limit,
      skip: pagination.skip,
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST create blog post (requires auth)
export const POST = withAuth(async (req) => {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(blogPostSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const postData = parsed.data;

    // Check if slug already exists
    const existingPost = await blogRepository.findOne({ slug: postData.slug });
    if (existingPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post with this slug already exists' },
        { status: 400 }
      );
    }

    const post = await blogRepository.create(postData);

    return NextResponse.json({
      success: true,
      data: post,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create blog post error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
});


