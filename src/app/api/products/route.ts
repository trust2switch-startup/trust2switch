// Products API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { productRepository } from '@/lib/repositories';
import { parsePagination, productSchema, validateSchema } from '@/lib/validation';

// GET all products
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

    const products = await productRepository.find(query, {
      sort: sortObj,
      limit: pagination.limit,
      skip: pagination.skip,
    });

    const total = await productRepository.count(query);

    return NextResponse.json({
      success: true,
      data: products,
      total,
      limit: pagination.limit,
      skip: pagination.skip,
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create product (requires auth)
export const POST = withAuth(async (req) => {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(productSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const productData = parsed.data;

    // Check if SKU already exists
    const existingProduct = await productRepository.findOne({ sku: productData.sku });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product with this SKU already exists' },
        { status: 400 }
      );
    }

    const product = await productRepository.create(productData);

    return NextResponse.json({
      success: true,
      data: product,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
});

