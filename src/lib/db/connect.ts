// Database connection utility for API routes
import { prisma } from "./prisma";

let isConnected = false;

export async function ensureDatabaseConnection(): Promise<void> {
  // Prisma manages connection pool automatically
  // Ideally we don't need to do anything, but for compatibility with existing calls:
  try {
    await prisma.$connect();
    isConnected = true;
  } catch (error) {
    console.error("Failed to connect to database via Prisma", error);
    throw error;
  }
}

