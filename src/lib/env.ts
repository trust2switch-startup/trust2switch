// Environment variable loader and validator
// Ensures env vars are available in both Next.js and Node.js contexts
import { z } from 'zod';

if (typeof window === 'undefined') {
  try {
    const dotenv = require('dotenv');
    const path = require('path');

    dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  } catch (error) {
    console.warn('Could not load dotenv:', error);
  }
}

const envSchema = z.object({
  DATABASE_TYPE: z.enum(['mongodb', 'postgresql', 'mysql']).default('mongodb'),
  MONGODB_URI: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters')
    .default('your-secret-key-change-in-production'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  NODE_ENV: z.string().default('development'),
});

const parsed = envSchema.safeParse({
  DATABASE_TYPE: process.env.DATABASE_TYPE,
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsed.success) {
  console.error('Invalid environment configuration', parsed.error.format());
  throw new Error('Invalid environment configuration');
}

const data = parsed.data;
const connectionString = data.MONGODB_URI || data.DATABASE_URL || '';

export const env = {
  ...data,
  CONNECTION_STRING: connectionString,
};

export function requireDatabaseUrl(): string {
  if (!connectionString) {
    const errorMessage = 
      'Database connection string is required. ' +
      'Please set MONGODB_URI or DATABASE_URL environment variable. ' +
      `Current NODE_ENV: ${process.env.NODE_ENV || 'not set'}`;
    console.error('Database configuration error:', {
      MONGODB_URI: process.env.MONGODB_URI ? 'set (hidden)' : 'not set',
      DATABASE_URL: process.env.DATABASE_URL ? 'set (hidden)' : 'not set',
      DATABASE_TYPE: process.env.DATABASE_TYPE || 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set',
    });
    throw new Error(errorMessage);
  }
  return connectionString;
}

export function requireJwtSecret(): string {
  return data.JWT_SECRET;
}

