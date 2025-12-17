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
      await mongoose.connect(this.connectionString);
      this.connection = mongoose.connection;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
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

