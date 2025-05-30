import { Collection } from "./collection.model";
import { CollectionDao } from "./collection.dao";
import { HttpException } from "../model/exception";

export class CollectionManager {
  private static instance: CollectionManager;
  private collectionsCache: Map<number, Collection[]> = new Map();
  private dao: CollectionDao = new CollectionDao();

  private constructor() {}

  public static getInstance(): CollectionManager {
    if (!CollectionManager.instance) {
      CollectionManager.instance = new CollectionManager();
    }
    return CollectionManager.instance;
  }

  public async create(collection: Collection): Promise<void> {
    if (!collection.ownerId) {
      throw new HttpException("User id is required", 400);
    }
    try {
      await this.dao.create(collection);
      const existingCollections =
        this.collectionsCache.get(collection.ownerId) || [];

      this.collectionsCache.set(collection.ownerId, [
        ...existingCollections,
        collection,
      ]);
      return;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async delete({
    collection,
    userId,
  }: {
    collection: Collection;
    userId: number;
  }): Promise<Map<number, Collection[]>> {
    // Deletes a collection
    // Returns user collections that have been modified

    if (!collection) {
      throw new HttpException("Collection not found", 404);
    }
    try {
      const updatedCollections: Map<number, Collection[]> = new Map();

      await this.dao.delete(collection, userId);
      // Find all users who have this collection in their cache
      this.collectionsCache.forEach((collections, key) => {
        if (
          collections.some(
            (c) => c.url === collection.url && c.owner == collection.owner
          )
        ) {
          this.collectionsCache.set(
            key,
            collections.filter((c) => c.url !== collection.url)
          );
          updatedCollections.set(key, this.collectionsCache.get(key) || []);
        }
      });

      return updatedCollections;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async update(collection: Collection): Promise<void> {
    if (!collection.ownerId || !collection.status) {
      throw new HttpException("User id and status are required", 400);
    }
    try {
      await this.dao.update(collection);
      this.getByUserIdFromDB({ userId: collection.ownerId });
      return;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async getAll(): Promise<Map<number, Collection[]>> {
    return this.collectionsCache;
  }

  public async getAllFromDB(): Promise<Collection[]> {
    try {
      const collections = await this.dao.getAll();
      this.collectionsCache.clear();
      collections.forEach((collection) => {
        const existingCollections =
          this.collectionsCache.get(collection.ownerId) || [];
        this.collectionsCache.set(collection.ownerId, [
          ...existingCollections,
          collection,
        ]);
      });
      return collections;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async getByUserId({
    userId,
  }: {
    userId: number;
  }): Promise<Collection[]> {
    if (!userId) {
      throw new HttpException("User id is required", 400);
    }
    try {
      if (this.collectionsCache.has(userId)) {
        return this.collectionsCache.get(userId) || [];
      }
      return await this.getByUserIdFromDB({ userId });
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async getByUserIdFromDB({
    userId,
  }: {
    userId: number;
  }): Promise<Collection[]> {
    if (!userId) {
      throw new HttpException("User id is required", 400);
    }
    try {
      const collections = await this.dao.getByUserId({
        userId: String(userId),
      });
      this.collectionsCache.set(userId, collections);
      return collections;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public removeFromCacheByUserId({ userId }: { userId: number }): void {
    if (this.collectionsCache.has(userId)) {
      this.collectionsCache.delete(userId);
    }
  }
}
