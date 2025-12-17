import type { Model, QueryFilter as MongooseQueryFilter, UpdateQuery, Document } from 'mongoose';
import type { QueryFilter, QueryOptions, Repository } from './types';

// LeanDocument type for Mongoose 9+ (lean() returns plain objects)
type LeanDocument<T> = Omit<T, keyof Document> & { _id: any };

// Generic Mongo-backed repository with lean results for fast reads
export function createMongoRepository<T = any>(model: Model<T>): Repository<LeanDocument<T>> {
  return {
    async find(filter: QueryFilter = {}, options: QueryOptions = {}) {
      const query = model.find(filter as MongooseQueryFilter<T>);
      applyQueryOptions(query, options);
      return query.lean<LeanDocument<T>[]>().exec();
    },

    async findOne(filter: QueryFilter = {}, options: QueryOptions = {}) {
      const query = model.findOne(filter as MongooseQueryFilter<T>);
      applyQueryOptions(query, options);
      return query.lean<LeanDocument<T>>().exec();
    },

    async findById(id: string, options: QueryOptions = {}) {
      const query = model.findById(id);
      applyQueryOptions(query, options);
      return query.lean<LeanDocument<T>>().exec();
    },

    async create(data: Partial<LeanDocument<T>>) {
      const doc = await model.create(data as any);
      // model.create returns a single document when given a single object
      const singleDoc = Array.isArray(doc) ? doc[0] : doc;
      return singleDoc.toObject() as LeanDocument<T>;
    },

    async updateById(id: string, update: Partial<LeanDocument<T>>) {
      const query = model.findByIdAndUpdate(id, update as UpdateQuery<T>, {
        new: true,
        runValidators: true,
      });
      return query.lean<LeanDocument<T>>().exec();
    },

    async deleteById(id: string) {
      const res = await model.findByIdAndDelete(id).exec();
      return Boolean(res);
    },

    async count(filter: QueryFilter = {}) {
      return model.countDocuments(filter as MongooseQueryFilter<T>).exec();
    },
  };
}

function applyQueryOptions(query: any, options: QueryOptions) {
  if (options.sort) {
    query.sort(options.sort as Record<string, 1 | -1>);
  }

  if (typeof options.limit === 'number') {
    query.limit(options.limit);
  }

  if (typeof options.skip === 'number') {
    query.skip(options.skip);
  }

  if (options.select?.length) {
    query.select(options.select.join(' '));
  }
}
