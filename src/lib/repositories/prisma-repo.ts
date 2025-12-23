import { prisma } from "../db/prisma";
import type { Repository, QueryFilter, QueryOptions } from "../db/types";


// Helper to handle Prisma's specific query format vs our generic filter
// This is a basic implementation and might need to be expanded for complex queries
export class PrismaRepository<T> implements Repository<T> {
    private model: any;

    constructor(modelName: string) {
        // @ts-ignore - dynamic access to prisma models
        this.model = prisma[modelName];

        if (!this.model) {
            console.error(`[PrismaRepository] Model '${modelName}' not found in Prisma client. Make sure 'prisma generate' has been run.`);
        }
    }

    async find(filter: QueryFilter = {}, options: QueryOptions = {}): Promise<T[]> {
        const prismaArgs: any = {
            where: this.mapFilter(filter),
        };

        if (options.sort) {
            const orderBy: any[] = [];
            for (const [key, value] of Object.entries(options.sort)) {
                const direction = value === 1 ? 'asc' : (value === -1 ? 'desc' : value);
                orderBy.push({ [key]: direction });
            }
            prismaArgs.orderBy = orderBy;
        }

        if (options.limit) {
            prismaArgs.take = options.limit;
        }

        if (options.skip) {
            prismaArgs.skip = options.skip;
        }

        if (options.select) {
            // Prisma select is an object conforming to Select<T>
            // converting string[] to { field: true }
            prismaArgs.select = options.select.reduce((acc, field) => ({ ...acc, [field]: true }), {});
        }

        const results = await this.model.findMany(prismaArgs);
        return results.map((item: any) => this.mapResult(item));
    }

    async findOne(filter: QueryFilter = {}, options: QueryOptions = {}): Promise<T | null> {
        const prismaArgs: any = {
            where: this.mapFilter(filter),
        };

        // findFirst is analogous to findOne
        const result = await this.model.findFirst(prismaArgs);
        return result ? this.mapResult(result) : null;
    }

    async findById(id: string, options: QueryOptions = {}): Promise<T | null> {
        const result = await this.model.findUnique({
            where: { id },
        });
        return result ? this.mapResult(result) : null;
    }

    async create(data: Partial<T>): Promise<T> {
        const result = await this.model.create({
            data,
        });
        return this.mapResult(result);
    }

    async updateById(id: string, update: Partial<T>): Promise<T | null> {
        const result = await this.model.update({
            where: { id },
            data: update,
        });
        return result ? this.mapResult(result) : null;
    }

    async deleteById(id: string): Promise<boolean> {
        try {
            await this.model.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async count(filter: QueryFilter = {}): Promise<number> {
        return this.model.count({
            where: this.mapFilter(filter),
        });
    }

    // Map generic query filters to Prisma 'where' clauses
    private mapFilter(filter: QueryFilter): any {
        const where: any = {};

        for (const [key, value] of Object.entries(filter)) {
            if (key === '$text') {
                // Full text search
                const searchVal = (value as any).$search;
                // Prisma full text search syntax depends on the provider
                // For boolean search in MySQL:
                if (searchVal) {
                    // This assumes the model has @@fulltext indexes and we are using one of the fields in the search
                    // Simplest approach: search across compatible fields?
                    // Actually Prisma 5+ full text search is usually:
                    // title: { search: 'term' }
                    // But since we don't know which fields, this generic mapping is tricky.
                    // For now, we ignore $text in generic repo or implement specific overrides.
                    // Let's assume the calling code handles specific search if needed, 
                    // BUT existing code uses $text. 

                    // Hack: existing code passes $text: { $search: '...' }
                    // We should probably rely on specific usage sites or try to adapt.
                    // For now, let's log potential issue and skip.
                    console.warn("Prisma generic repo: $text search not fully supported in generic mapFilter yet.", key, value);
                }
            } else if (Array.isArray(value)) {
                // { category: ['A', 'B'] } -> { category: { in: ['A', 'B'] } }
                where[key] = { in: value };
            } else {
                // Direct equality
                where[key] = value;
            }
        }
        return where;
    }

    // Helper to map Prisma result to include _id for Mongoose compatibility
    private mapResult(item: any): T {
        if (item && item.id && !item._id) {
            return { ...item, _id: item.id };
        }
        return item;
    }
}

export function createPrismaRepository<T>(modelName: string): Repository<T> {
    return new PrismaRepository<T>(modelName);
}
