// Authentication middleware for API routes
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './auth';
import type { JWTPayload } from './types';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

// Helper function to authenticate request
function authenticateRequest(
  req: NextRequest,
  options?: { requireRole?: 'admin' | 'editor' }
): AuthenticatedRequest | NextResponse {
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

  // Check role if required
  if (options?.requireRole && payload.role !== options.requireRole && payload.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  // Attach user to request
  (req as AuthenticatedRequest).user = payload;
  return req as AuthenticatedRequest;
}

// Overload for routes without params
export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  options?: { requireRole?: 'admin' | 'editor' }
): (req: NextRequest) => Promise<NextResponse>;

// Overload for routes with params - accepts NextRequest in handler for flexibility
export function withAuth<TParams extends Record<string, string>>(
  handler: (
    req: NextRequest | AuthenticatedRequest,
    context: { params: Promise<TParams> }
  ) => Promise<NextResponse>,
  options?: { requireRole?: 'admin' | 'editor' }
): (
  req: NextRequest,
  context: { params: Promise<TParams> }
) => Promise<NextResponse>;

// Implementation - needs to be compatible with both overloads
// Using any for handler to allow both signatures
export function withAuth(
  handler: any,
  options?: { requireRole?: 'admin' | 'editor' }
): any {
  return async (
    req: NextRequest,
    context?: { params: Promise<Record<string, string>> }
  ): Promise<NextResponse> => {
    try {
      const authResult = authenticateRequest(req, options);
      if (authResult instanceof NextResponse) {
        return authResult;
      }

      const authenticatedReq = authResult;
      // If context is provided, pass it to handler, otherwise call handler with just req
      if (context) {
        return await handler(authenticatedReq, context);
      } else {
        return await handler(authenticatedReq);
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { success: false, message: 'Authentication error' },
        { status: 500 }
      );
    }
  };
}


