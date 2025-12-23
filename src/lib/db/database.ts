// Database connection manager with abstraction layer
import { MongoDBAdapter } from './adapters/mongodb';
import { MySQLAdapter } from './adapters/mysql';
import { PostgreSQLAdapter } from './adapters/postgresql';
import type { DatabaseAdapter, DatabaseType, DatabaseConnection } from './types';
import { env, requireDatabaseUrl } from '../env';

declare global {
  var mongoose: {
    conn: DatabaseConnection | null;
    promise: Promise<DatabaseConnection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

let dbConnection: DatabaseConnection | null = null;

export async function connectDatabase(): Promise<void> {
  // If we have a cached connection, use it
  if (cached.conn) {
    dbConnection = cached.conn;
    return;
  }

  try {
    const dbType = env.DATABASE_TYPE as DatabaseType;
    const connectionString = requireDatabaseUrl();

    // specific logic for Mongoose to handle potential re-connections or buffering
    if (dbType === 'mongodb') {
      if (!cached.promise) {
        const adapter = new MongoDBAdapter(connectionString);
        cached.promise = adapter.connect().then(() => {
          return {
            adapter,
            type: dbType,
          };
        });
      }

      dbConnection = await cached.promise;
      cached.conn = dbConnection;
      return;
    }

    // Fallback for other DB types (no global caching specific logic implemented yet for them as they are placeholders)
    // But we still follow the pattern
    let adapter: DatabaseAdapter;

    switch (dbType) {
      case 'postgresql':
        adapter = new PostgreSQLAdapter(connectionString);
        console.warn('PostgreSQL adapter is a placeholder. Implement connect() before use.');
        break;
      case 'mysql':
        adapter = new MySQLAdapter(connectionString);
        console.warn('MySQL adapter is a placeholder. Implement connect() before use.');
        break;
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }

    await adapter.connect();
    dbConnection = {
      adapter,
      type: dbType,
    };

  } catch (error: any) {
    console.error('Database connection failed:', error?.message);
    console.error('Environment check:', {
      DATABASE_TYPE: env.DATABASE_TYPE,
      hasConnectionString: !!env.CONNECTION_STRING,
      NODE_ENV: process.env.NODE_ENV,
    });
    // Reset cache on error so we can retry
    cached.promise = null;
    throw new Error(
      `Database connection failed: ${error?.message || 'Unknown error'}. ` +
      `Please check your MONGODB_URI or DATABASE_URL environment variable.`
    );
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (dbConnection) {
    await dbConnection.adapter.disconnect();
    dbConnection = null;
    cached.conn = null;
    cached.promise = null;
  }
}

export function getDatabaseConnection(): DatabaseConnection {
  // Try to use local variable first, then cached
  if (dbConnection && dbConnection.adapter.isConnected()) {
    return dbConnection;
  }

  if (cached.conn && cached.conn.adapter.isConnected()) {
    dbConnection = cached.conn;
    return cached.conn;
  }

  throw new Error('Database not connected. Call connectDatabase() first.');
}

export function getDatabaseType(): DatabaseType {
  return dbConnection?.type || 'mongodb';
}

