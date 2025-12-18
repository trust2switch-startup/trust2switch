// Callback Request by ID API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { callbackRequestRepository } from '@/lib/repositories';
import { callbackRequestSchema } from '@/lib/validation';
// Import model to ensure it's registered with Mongoose
import '@/models/CallbackRequest';

// GET callback request by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const callbackRequest = await callbackRequestRepository.findById(id);
    if (!callbackRequest) {
      return NextResponse.json(
        { success: false, message: 'Callback request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: callbackRequest,
    });
  } catch (error) {
    console.error('Get callback request error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch callback request' },
      { status: 500 }
    );
  }
}

// PUT update callback request status (requires auth)
export const PUT = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;
    const payload = await req.json();

    // Only allow updating status
    if (!payload.status || !['pending', 'contacted', 'completed'].includes(payload.status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status. Must be pending, contacted, or completed' },
        { status: 400 }
      );
    }

    const callbackRequest = await callbackRequestRepository.updateById(id, {
      status: payload.status,
    });

    if (!callbackRequest) {
      return NextResponse.json(
        { success: false, message: 'Callback request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: callbackRequest,
    });
  } catch (error: any) {
    console.error('Update callback request error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update callback request' },
      { status: 500 }
    );
  }
});

// DELETE callback request (requires auth)
export const DELETE = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const deleted = await callbackRequestRepository.deleteById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Callback request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Callback request deleted successfully',
    });
  } catch (error) {
    console.error('Delete callback request error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete callback request' },
      { status: 500 }
    );
  }
});
