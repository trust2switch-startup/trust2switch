import type { Model, FilterQuery, UpdateQuery, Document, LeanDocument } from 'mongoose';
import type { QueryFilter, QueryOptions, Repository } from './types';

// Generic Mongo-backed repository with lean results for fast reads
export function createMongoRepository<T extends Document>(model: Model<T>): Repository<LeanDocument<T>> {
  return {
    async find(filter: QueryFilter = {}, options: QueryOptions = {}) {
      const query = model.find(filter as FilterQuery<T>);
      applyQueryOptions(query, options);
      return query.lean<LeanDocument<T>[]>().exec();
    },

    async findOne(filter: QueryFilter = {}, options: QueryOptions = {}) {
      const query = model.findOne(filter as FilterQuery<T>);
      applyQueryOptions(query, options);
      return query.lean<LeanDocument<T>>().exec();
    },

    async findById(id: string, options: QueryOptions = {}) {
      const query = model.findById(id as FilterQuery<T>);
      applyQueryOptions(query, options);
      return query.lean<LeanDocument<T>>().exec();
    },

    async create(data: Partial<T>) {
      const doc = await model.create(data);
      return doc.toObject() as LeanDocument<T>;
    },

    async updateById(id: string, update: Partial<T>) {
      const query = model.findByIdAndUpdate(id as FilterQuery<T>, update as UpdateQuery<T>, {
        new: true,
        runValidators: true,
      });
      return query.lean<LeanDocument<T>>().exec();
    },

    async deleteById(id: string) {
      const res = await model.findByIdAndDelete(id as FilterQuery<T>).exec();
      return Boolean(res);
    },

    async count(filter: QueryFilter = {}) {
      return model.countDocuments(filter as FilterQuery<T>).exec();
    },
  };
}

function applyQueryOptions<T extends Document>(query: any, options: QueryOptions) {
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
