// Database connection manager with abstraction layer
import { MongoDBAdapter } from './adapters/mongodb';
import { MySQLAdapter } from './adapters/mysql';
import { PostgreSQLAdapter } from './adapters/postgresql';
import type { DatabaseAdapter, DatabaseType, DatabaseConnection } from './types';
import { env, requireDatabaseUrl } from '../env';

let dbConnection: DatabaseConnection | null = null;

export async function connectDatabase(): Promise<void> {
  try {
    const dbType = env.DATABASE_TYPE as DatabaseType;
    const connectionString = requireDatabaseUrl();

    let adapter: DatabaseAdapter;

    switch (dbType) {
      case 'mongodb':
        adapter = new MongoDBAdapter(connectionString);
        break;
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
  }
}

export function getDatabaseConnection(): DatabaseConnection {
  if (!dbConnection || !dbConnection.adapter.isConnected()) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return dbConnection;
}

export function getDatabaseType(): DatabaseType {
  return dbConnection?.type || 'mongodb';
}

