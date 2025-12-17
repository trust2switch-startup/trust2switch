// Database configuration
export const databaseConfig = {
  // Connection will be established using environment variables
  // MONGODB_URI or DATABASE_URL
  defaultType: (process.env.DATABASE_TYPE || 'mongodb') as 'mongodb' | 'postgresql' | 'mysql',
};

