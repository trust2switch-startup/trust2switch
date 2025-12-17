// Script to check if environment variables are loaded correctly
import dotenv from 'dotenv';
import { resolve } from 'path';

console.log('Checking environment variables...\n');

// Load environment variables from .env.local
const envPath = resolve(process.cwd(), '.env.local');
console.log(`Looking for .env.local at: ${envPath}\n`);

const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  console.warn(`⚠ Warning: Could not load .env.local: ${envResult.error.message}`);
  console.warn('Trying .env file as fallback...\n');
  dotenv.config(); // Also try .env as fallback
} else {
  console.log('✓ Successfully loaded .env.local\n');
}

// Check required variables
const requiredVars = {
  'DATABASE_TYPE': process.env.DATABASE_TYPE || 'mongodb (default)',
  'MONGODB_URI': process.env.MONGODB_URI ? '✓ Set' : '✗ NOT SET',
  'DATABASE_URL': process.env.DATABASE_URL ? '✓ Set' : '✗ NOT SET',
  'JWT_SECRET': process.env.JWT_SECRET ? '✓ Set' : '✗ NOT SET',
  'JWT_EXPIRES_IN': process.env.JWT_EXPIRES_IN || '7d (default)',
};

console.log('Environment Variables Status:');
console.log('─────────────────────────────');
Object.entries(requiredVars).forEach(([key, value]) => {
  const status = value.startsWith('✓') ? '✓' : value.startsWith('✗') ? '✗' : '•';
  console.log(`${status} ${key}: ${value}`);
});

console.log('\n');

// Check if connection string is available
const connectionString = process.env.MONGODB_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ ERROR: MONGODB_URI or DATABASE_URL is required!');
  console.error('\nPlease create a .env.local file in the project root with:');
  console.error('  MONGODB_URI=your-mongodb-connection-string');
  console.error('\nExample for local MongoDB:');
  console.error('  MONGODB_URI=mongodb://localhost:27017/trust2switch');
  console.error('\nExample for MongoDB Atlas:');
  console.error('  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name');
  process.exit(1);
} else {
  // Mask the connection string for security
  const masked = connectionString.replace(/(mongodb\+?srv?:\/\/[^:]+:)[^@]+(@.+)/, '$1***$2');
  console.log(`✓ Connection string found: ${masked}`);
  console.log('\n✅ All required environment variables are set!');
}

