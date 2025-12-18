// Authentication types
import type { Permission } from './permissions';

export interface JWTPayload {
  userId: string;
  username: string;
  role: 'admin' | 'editor' | 'custom';
  permissions?: Permission[];
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
    permissions?: Permission[];
  };
  message?: string;
}


