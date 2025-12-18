// Authentication types
export interface JWTPayload {
  userId: string;
  username: string;
  role: 'admin' | 'editor';
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  message?: string;
}


