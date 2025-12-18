// Admin login API route
import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabaseConnection } from '@/lib/db/connect';
import { comparePassword, generateToken } from '@/lib/auth/auth';
import { userRepository } from '@/lib/repositories';
import { loginSchema, validateSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    await ensureDatabaseConnection();

    const payload = await req.json();
    const parsed = validateSchema(loginSchema, payload);
    if ('error' in parsed) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;

    const user = await userRepository.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Get user permissions
    let permissions = user.permissions || [];
    if (permissions.length === 0 && user.role !== 'admin') {
      // Use default permissions for role
      const { DEFAULT_PERMISSIONS } = await import('@/lib/auth/permissions');
      permissions = DEFAULT_PERMISSIONS[user.role] || [];
    }

    const token = generateToken({
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
      permissions: permissions.length > 0 ? permissions : undefined,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        permissions: permissions.length > 0 ? permissions : undefined,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}


