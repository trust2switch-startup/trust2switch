// Users API routes
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { withAuth } from '@/lib/auth/middleware';
import { userRepository } from '@/lib/repositories';
import { parsePagination } from '@/lib/validation';
import { DEFAULT_PERMISSIONS } from '@/lib/auth/permissions';
import { hashPassword } from '@/lib/auth/auth';
import { z } from 'zod';

const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'editor', 'custom']),
  permissions: z.array(z.object({
    resource: z.enum(['courses', 'blog', 'products', 'callbackRequests', 'users', 'settings']),
    actions: z.array(z.enum(['view', 'create', 'edit', 'delete'])),
  })).optional(),
  isActive: z.boolean().optional().default(true),
});

const updateUserSchema = createUserSchema.partial().extend({
  password: z.string().min(6).optional(),
});

// GET all users (requires admin role)
export const GET = withAuth(async (req: NextRequest) => {
  try {
    await ensureDatabaseConnection();

    // Check if user is admin
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { verifyToken } = await import('@/lib/auth/auth');
    const payload = verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const pagination = parsePagination(searchParams);

    const users = await userRepository.find({}, {
      sort: { createdAt: -1 },
      limit: pagination.limit,
      skip: pagination.skip,
    });

    // Remove passwords from response
    const usersWithoutPasswords = users.map((user: any) => {
      const { password, ...userWithoutPassword } = user.toObject ? user.toObject() : user;
      return userWithoutPassword;
    });

    const total = await userRepository.count({});

    return NextResponse.json({
      success: true,
      data: usersWithoutPasswords,
      total,
      limit: pagination.limit,
      skip: pagination.skip,
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}, { requireRole: 'admin' });

// POST create user (requires admin role)
export const POST = withAuth(async (req: NextRequest) => {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = createUserSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const userData = parsed.data;

    // Check if user already exists
    const existingUser = await userRepository.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this username or email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Set permissions based on role
    let permissions = userData.permissions || [];
    if (userData.role !== 'custom' && permissions.length === 0) {
      permissions = DEFAULT_PERMISSIONS[userData.role] || [];
    }

    // Create user
    const user = await userRepository.create({
      ...userData,
      password: hashedPassword,
      permissions,
    });

    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}, { requireRole: 'admin' });
