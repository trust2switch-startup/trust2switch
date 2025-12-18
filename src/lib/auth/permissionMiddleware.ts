// Permission checking middleware
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './auth';
import { hasPermission, parsePermissions, DEFAULT_PERMISSIONS } from './permissions';
import type { Resource, Action } from './permissions';
import type { JWTPayload } from './types';
import { userRepository } from '@/lib/repositories';
import { ensureDatabaseConnection } from '@/lib/db/connect';

export interface PermissionOptions {
  resource: Resource;
  action: Action;
}

// Get user permissions from token or database
async function getUserPermissions(payload: JWTPayload): Promise<any[]> {
  // If permissions are in token, use them
  if (payload.permissions) {
    return payload.permissions;
  }

  // Otherwise fetch from database
  try {
    await ensureDatabaseConnection();
    const user = await userRepository.findById(payload.userId);
    if (!user) {
      return [];
    }

    // If user has custom permissions, use them
    if (user.permissions && user.permissions.length > 0) {
      return user.permissions;
    }

    // Otherwise use default permissions for role
    return DEFAULT_PERMISSIONS[user.role] || [];
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return [];
  }
}

// Middleware to check permissions
export function withPermission(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse>,
  options: PermissionOptions
) {
  return async (
    req: NextRequest,
    context?: { params: Promise<Record<string, string>> }
  ): Promise<NextResponse> => {
    try {
      // Authenticate first
      const authHeader = req.headers.get('authorization');
      const token = extractTokenFromHeader(authHeader);

      if (!token) {
        return NextResponse.json(
          { success: false, message: 'Authentication required' },
          { status: 401 }
        );
      }

      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { success: false, message: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Admin role has all permissions
      if (payload.role === 'admin') {
        if (context) {
          return await handler(req, context);
        }
        return await handler(req);
      }

      // Check permissions for non-admin users
      const permissions = await getUserPermissions(payload);
      const userHasPermission = hasPermission(
        permissions,
        options.resource,
        options.action
      );

      if (!userHasPermission) {
        return NextResponse.json(
          {
            success: false,
            message: `You don't have permission to ${options.action} ${options.resource}`,
          },
          { status: 403 }
        );
      }

      // User has permission, proceed
      if (context) {
        return await handler(req, context);
      }
      return await handler(req);
    } catch (error) {
      console.error('Permission middleware error:', error);
      return NextResponse.json(
        { success: false, message: 'Permission check error' },
        { status: 500 }
      );
    }
  };
}
