import pool from "../database/index";
import { HttpException } from "./exception";

export interface Collection {
  name: string;
  owner: string;
  platform: string;
  url: string;
}

export class Model {
  public async getCollections(userId: string): Promise<Collection[]> {
    try {
      const result1 = await pool.query(
        "SELECT * FROM collections WHERE owner_id = $1",
        [userId]
      );

      const result2 = await pool.query(
        "SELECT c.* FROM collection_members cm JOIN collections c ON cm.collection_id = c.id WHERE cm.user_id = $1",
        [userId]
      );

      const mapRowToCollection = (row: any): Collection => ({
        name: row.name,
        owner: row.owner,
        platform: row.platform,
        url: row.url,
      });

      return [
        ...result1.rows.map(mapRowToCollection),
        ...result2.rows.map(mapRowToCollection),
      ];
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  public async createCollection(
    collection: Collection,
    userId: string
  ): Promise<void> {
    try {
      const existingCollection = await pool.query(
        "SELECT * FROM collections WHERE url = $1 AND owner_id = $2",
        [collection.url, userId]
      );
      if (existingCollection.rows.length > 0) {
        throw new HttpException("Collection already exists", 400);
      }
      const existingMember = await pool.query(
        "SELECT c.* FROM collections c INNER JOIN collection_invites ci ON c.id = ci.collection_id WHERE ci.invited_user_id = $1 AND c.url = $2",
        [userId, collection.url]
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
          userId,
        ]
      );
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async deleteCollection(
    collection: Collection,
    userId: string
  ): Promise<void> {
    try {
      const result = await pool.query(
        "DELETE FROM collections WHERE url = $1 AND owner_id = $2",
        [collection.url, userId]
      );
      if (result.rowCount === 0) {
        throw new HttpException("Collection not found", 404);
      }
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async canDeleteCollection(
    collection: Collection,
    userId: string
  ): Promise<void> {
    try {
      const result = await pool.query(
        "SELECT * FROM collections WHERE owner_id = $1 AND url = $2",
        [userId, collection.url]
      );

      const result2 = await pool.query(
        "SELECT * FROM collection_members WHERE user_id = $1 AND collection_id = (SELECT id FROM collections WHERE url = $2)",
        [userId, collection.url]
      );

      if (result.rows.length === 0 && result2.rows.length === 0) {
        throw new HttpException("Collection not found", 404);
      }

      if (result2.rows.length > 0) {
        await pool.query(
          "DELETE FROM collection_members WHERE user_id = $1 AND collection_id = (SELECT id FROM collections WHERE url = $2)",
          [userId, collection.url]
        );
        throw new HttpException("Collection deleted", 200);
      }
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }
}
