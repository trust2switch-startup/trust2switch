// Database connection manager with abstraction layer
import { MongoDBAdapter } from './adapters/mongodb';
import { MySQLAdapter } from './adapters/mysql';
import { PostgreSQLAdapter } from './adapters/postgresql';
import type { DatabaseAdapter, DatabaseType, DatabaseConnection } from './types';
import { env, requireDatabaseUrl } from '../env';

let dbConnection: DatabaseConnection | null = null;

export async function connectDatabase(): Promise<void> {
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

