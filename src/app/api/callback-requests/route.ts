// Callback Requests API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { callbackRequestRepository } from '@/lib/repositories';
import { parsePagination, callbackRequestSchema, validateSchema } from '@/lib/validation';
// Import model to ensure it's registered with Mongoose
import '@/models/CallbackRequest';

// GET all callback requests (requires auth for admin)
export const GET = withAuth(async (req: NextRequest) => {
  try {
    await ensureDatabaseConnection();

    const { searchParams } = new URL(req.url);
    const pagination = parsePagination(searchParams);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const sortObj: Record<string, any> = search
      ? { score: { $meta: 'textScore' } }
      : { [pagination.sort]: pagination.order === 'asc' ? 1 : -1 };

    const callbackRequests = await callbackRequestRepository.find(query, {
      sort: sortObj,
      limit: pagination.limit,
      skip: pagination.skip,
    });

    const total = await callbackRequestRepository.count(query);

    return NextResponse.json({
      success: true,
      data: callbackRequests,
      total,
      limit: pagination.limit,
      skip: pagination.skip,
    });
  } catch (error) {
    console.error('Get callback requests error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch callback requests' },
      { status: 500 }
    );
  }
});

// POST create callback request (public, no auth required)
export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(callbackRequestSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const callbackRequestData = parsed.data;

    // Create the callback request
    const callbackRequest = await callbackRequestRepository.create({
      ...callbackRequestData,
      status: 'pending', // Always set to pending for new requests
    });

    return NextResponse.json({
      success: true,
      data: callbackRequest,
      message: 'Callback request submitted successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create callback request error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit callback request' },
      { status: 500 }
    );
  }
}
