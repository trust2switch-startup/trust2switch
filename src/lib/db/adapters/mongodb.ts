// MongoDB adapter using Mongoose
import mongoose, { Connection } from 'mongoose';
import type { DatabaseAdapter } from '../types';

export class MongoDBAdapter implements DatabaseAdapter {
  private connection: Connection | null = null;
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async connect(): Promise<void> {
    if (this.isConnected()) {
      return;
    }

    try {
      // Add connection options for better reliability in production
      const connectionOptions = {
        serverSelectionTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 45000, // 45 seconds
        connectTimeoutMS: 10000, // 10 seconds
        maxPoolSize: 10,
        retryWrites: true,
        retryReads: true,
      };

      await mongoose.connect(this.connectionString, connectionOptions);
      this.connection = mongoose.connection;
      console.log('MongoDB connected successfully');
    } catch (error: any) {
      console.error('MongoDB connection error:', error);
      console.error('Connection string provided:', this.connectionString ? 'Yes (hidden)' : 'No');
      console.error('Error details:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log('MongoDB disconnected');
    }
  }

  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  getConnection(): Connection {
    if (!this.connection) {
      throw new Error('MongoDB not connected');
    }
    return this.connection;
  }
}

