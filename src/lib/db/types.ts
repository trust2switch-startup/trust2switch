// Database abstraction types

export type DatabaseType = 'mongodb' | 'postgresql' | 'mysql';

export interface DatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}

export type SortDirection = 1 | -1 | { $meta: 'textScore' };

export interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: Record<string, SortDirection>;
  select?: string[];
}

export interface DatabaseConnection {
  adapter: DatabaseAdapter;
  type: DatabaseType;
}

export type QueryFilter = Record<string, unknown>;

export interface Repository<T> {
  find(filter?: QueryFilter, options?: QueryOptions): Promise<T[]>;
  findOne(filter?: QueryFilter, options?: QueryOptions): Promise<T | null>;
  findById(id: string, options?: QueryOptions): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  updateById(id: string, update: Partial<T>): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  count(filter?: QueryFilter): Promise<number>;
}

