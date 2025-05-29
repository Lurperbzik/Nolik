import pool from "../database";
import { HttpException } from "../model/exception";
import { Collection } from "./collection.model";

export class CollectionDao {
  public async create(collection: Collection): Promise<void> {
    if (!collection.ownerId) {
      throw new HttpException("User id is required", 400);
    }
    try {
      const existingCollection = await pool.query(
        "SELECT * FROM collections WHERE url = $1 AND owner_id = $2",
        [collection.url, collection.ownerId]
      );
      if (existingCollection.rows.length > 0) {
        throw new HttpException("Collection already exists", 400);
      }
      const existingMember = await pool.query(
        "SELECT c.* FROM collections c INNER JOIN collection_invites ci ON c.id = ci.collection_id WHERE ci.invited_user_id = $1 AND c.url = $2",
        [collection.ownerId, collection.url]
      );
      if (existingMember.rows.length > 0) {
        throw new HttpException("Collection already exists", 400);
      }

      await pool.query(
        "INSERT INTO collections (name, owner, url, platform, owner_id) VALUES ($1, $2, $3, $4, $5)",
        [
          collection.name,
          collection.owner,
          collection.url,
          collection.platform,
          collection.ownerId,
        ]
      );
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async update(collection: Collection): Promise<void> {
    try {
      await pool.query(
        "UPDATE collections SET status = $1 WHERE url = $2 AND owner_id = $3",
        [collection.status, collection.url, collection.ownerId]
      );
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async delete(collection: Collection): Promise<boolean> {
    try {
      const result = await pool.query(
        "DELETE FROM collections WHERE url = $1 AND owner_id = $2",
        [collection.url, collection.ownerId]
      );
      if (result.rowCount === 0) {
        return false;
      }
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
    return true;
  }

  public async getAll(): Promise<Collection[]> {
    try {
      const result = await pool.query("SELECT * FROM collections");
      if (result.rows.length > 0) {
        return result.rows.map((row: any) => {
          return new Collection({
            id: row.id,
            name: row.name,
            owner: row.owner,
            platform: row.platform,
            url: row.url,
            ownerId: row.owner_id,
            status: row.status,
          });
        });
      }
      return [];
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  public async getByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Collection[]> {
    try {
      const result1 = await pool.query(
        "SELECT * FROM collections WHERE owner_id = $1",
        [userId]
      );

      const result2 = await pool.query(
        "SELECT c.* FROM collection_members cm JOIN collections c ON cm.collection_id = c.id WHERE cm.user_id = $1",
        [userId]
      );

      const mapRowToCollection = (row: any): Collection =>
        new Collection({
          id: row.id,
          name: row.name,
          owner: row.owner,
          platform: row.platform,
          url: row.url,
          status: row.status,
          ownerId: row.owner_id,
        });

      return [
        ...result1.rows.map(mapRowToCollection),
        ...result2.rows.map(mapRowToCollection),
      ];
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }
}
