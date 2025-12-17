// Database connection utility for API routes
import { connectDatabase, getDatabaseConnection } from './database';

let isConnected = false;

export async function ensureDatabaseConnection(): Promise<void> {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  } else {
    // Check if still connected
    const connection = getDatabaseConnection();
    if (!connection.adapter.isConnected()) {
      await connectDatabase();
    }
  }
}

