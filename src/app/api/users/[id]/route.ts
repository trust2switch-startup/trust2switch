// User by ID API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { userRepository } from '@/lib/repositories';
import { hashPassword } from '@/lib/auth/auth';
import { DEFAULT_PERMISSIONS } from '@/lib/auth/permissions';
import { z } from 'zod';

const updateUserSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['admin', 'editor', 'custom']).optional(),
  permissions: z.array(z.object({
    resource: z.enum(['courses', 'blog', 'products', 'callbackRequests', 'users', 'settings']),
    actions: z.array(z.enum(['view', 'create', 'edit', 'delete'])),
  })).optional(),
  isActive: z.boolean().optional(),
});

// GET user by ID
export const GET = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    const user = await userRepository.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}, { requireRole: 'admin' });

// PUT update user
export const PUT = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;
    const payload = await req.json();

    const parsed = updateUserSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updateData: any = { ...parsed.data };

    // Hash password if provided
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    // Set permissions based on role if role changed
    if (updateData.role && updateData.role !== 'custom' && !updateData.permissions) {
      updateData.permissions = DEFAULT_PERMISSIONS[updateData.role] || [];
    }

    const user = await userRepository.updateById(id, updateData);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update user' },
      { status: 500 }
    );
  }
}, { requireRole: 'admin' });

// DELETE user
export const DELETE = withAuth(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await ensureDatabaseConnection();
    const { id } = await params;

    // Prevent deleting yourself
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (token) {
      const { verifyToken } = await import('@/lib/auth/auth');
      const payload = verifyToken(token);
      if (payload && payload.userId === id) {
        return NextResponse.json(
          { success: false, message: 'You cannot delete your own account' },
          { status: 400 }
        );
      }
    }

    const deleted = await userRepository.deleteById(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    );
  }
}, { requireRole: 'admin' });
