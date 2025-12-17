// Script to create an admin user
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
const envPath = resolve(process.cwd(), '.env.local');
const envResult = dotenv.config({ path: envPath });

if (envResult.error && !process.env.MONGODB_URI && !process.env.DATABASE_URL) {
  console.warn(`Warning: Could not load .env.local from ${envPath}`);
  console.warn('Trying .env file as fallback...');
  dotenv.config(); // Also try .env as fallback
}

import { connectDatabase } from '../src/lib/db/database';
import { User } from '../src/models/User';
import { hashPassword } from '../src/lib/auth/auth';
import { requireDatabaseUrl } from '../src/lib/env';

async function createAdminUser() {
  try {
    requireDatabaseUrl();
    const username = process.argv[2];
    const email = process.argv[3];
    const password = process.argv[4];

    if (!username || !email || !password) {
      console.error('Usage: npm run create-admin <username> <email> <password>');
      process.exit(1);
    }

    await connectDatabase();
    console.log('Connected to database');

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.error('User with this username or email already exists');
      process.exit(1);
    }

    // Create admin user
    const hashedPassword = await hashPassword(password);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await user.save();
    console.log(`Admin user "${username}" created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();

