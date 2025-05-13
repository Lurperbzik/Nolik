import pool from "../database/index";
import { HttpException } from "./exception";

export interface Invitation {
  collectionUrl: string;
  invitedUsername: string;
}

export interface CollectionInvitation {
  nameCollection: string;
  ownerCollection: string;
  platformCollection: string;
  urlCollection: string;
  invitedUserId: number;
  invitedByUserId: number;
  collectionId: number;
  status: string;
  invitedByUsername: string;
  invitedUsername: number;
}

export class Model {
  public async getInvitations(userId: string): Promise<CollectionInvitation[]> {
    try {
      const result = await pool.query(
        "SELECT c.*, ci.*, invited_user.username AS invited_username, inviter_user.username AS inviter_username FROM collections c INNER JOIN collection_invites ci ON c.id = ci.collection_id INNER JOIN users invited_user ON ci.invited_user_id = invited_user.id INNER JOIN users inviter_user ON ci.invited_by_user_id = inviter_user.id WHERE ci.invited_user_id = $1 AND ci.status = 'pending';",
        [userId]
      );

      const mapRowToCollectionInvitation = (
        row: any
      ): CollectionInvitation => ({
        nameCollection: row.name,
        ownerCollection: row.owner,
        platformCollection: row.platform,
        urlCollection: row.url,
        invitedUserId: row.invited_user_id,
        collectionId: row.collection_id,
        status: row.status,
        invitedByUserId: row.invited_by_user_id,
        invitedByUsername: row.inviter_username,
        invitedUsername: row.invited_username,
      });

      return result.rows.map(mapRowToCollectionInvitation);
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  public async getInvitationsByUserId(
    userId: string
  ): Promise<CollectionInvitation[]> {
    try {
      const result = await pool.query(
        "SELECT c.*, ci.*, invited_user.username AS invited_username, inviter_user.username AS inviter_username FROM collections c INNER JOIN collection_invites ci ON c.id = ci.collection_id INNER JOIN users invited_user ON ci.invited_user_id = invited_user.id INNER JOIN users inviter_user ON ci.invited_by_user_id = inviter_user.id WHERE ci.invited_by_user_id = $1",
        [userId]
      );

      const mapRowToCollectionInvitation = (
        row: any
      ): CollectionInvitation => ({
        nameCollection: row.name,
        ownerCollection: row.owner,
        platformCollection: row.platform,
        urlCollection: row.url,
        invitedUserId: row.invited_user_id,
        collectionId: row.collection_id,
        status: row.status,
        invitedByUserId: row.invited_by_user_id,
        invitedByUsername: row.inviter_username,
        invitedUsername: row.invited_username,
      });

      return result.rows.map(mapRowToCollectionInvitation);
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  public async getInvitationsByCollectionUrl(
    collectionUrl: string,
    userId: string
  ): Promise<CollectionInvitation[]> {
    try {
      const result = await pool.query(
        "SELECT c.*, ci.*, invited_user.username AS invited_username, inviter_user.username AS inviter_username FROM collections c INNER JOIN collection_invites ci ON c.id = ci.collection_id INNER JOIN users invited_user ON ci.invited_user_id = invited_user.id INNER JOIN users inviter_user ON ci.invited_by_user_id = inviter_user.id WHERE c.url = $1 AND ci.invited_by_user_id = $2",
        [collectionUrl, userId]
      );

      const mapRowToCollectionInvitation = (
        row: any
      ): CollectionInvitation => ({
        nameCollection: row.name,
        ownerCollection: row.owner,
        platformCollection: row.platform,
        urlCollection: row.url,
        invitedUserId: row.invited_user_id,
        collectionId: row.collection_id,
        status: row.status,
        invitedByUserId: row.invited_by_user_id,
        invitedByUsername: row.inviter_username,
        invitedUsername: row.invited_username,
      });

      return result.rows.map(mapRowToCollectionInvitation);
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  public async createInvitation(
    invitation: Invitation,
    userId: string
  ): Promise<void> {
    try {
      let result = await pool.query(
        "SELECT id FROM collections WHERE url = $1",
        [invitation.collectionUrl]
      );
      if (result.rows.length === 0) {
        throw new HttpException("Collection not found", 404);
      }
      const collectionId = result.rows[0].id;
      result = await pool.query("SELECT id FROM users WHERE username = $1", [
        invitation.invitedUsername,
      ]);
      if (result.rows.length === 0) {
        throw new HttpException("User not found", 404);
      }
      const invitedUserId = result.rows[0].id;

      const existingInvitation = await pool.query(
        "SELECT * FROM collection_invites WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3",
        [collectionId, invitedUserId, userId]
      );
      if (existingInvitation.rows.length > 0) {
        throw new HttpException("Invitation already exists", 409);
      }
      await pool.query(
        "INSERT INTO collection_invites (collection_id, invited_user_id, invited_by_user_id) VALUES ($1, $2, $3)",
        [collectionId, invitedUserId, userId]
      );
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async deleteInvitation(
    invitation: CollectionInvitation
  ): Promise<void> {
    try {
      const result = await pool.query(
        "DELETE FROM collection_invites WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3",
        [
          invitation.collectionId,
          invitation.invitedUserId,
          invitation.invitedByUserId,
        ]
      );
      if (result.rowCount === 0) {
        throw new HttpException("Invitation not found", 404);
      }
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async acceptInvitation(
    invitation: CollectionInvitation
  ): Promise<void> {
    try {
      const result = await pool.query(
        "UPDATE collection_invites SET status = 'accepted' WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3",
        [
          invitation.collectionId,
          invitation.invitedUserId,
          invitation.invitedByUserId,
        ]
      );
      if (result.rowCount === 0) {
        throw new HttpException("Invitation not found", 404);
      }
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async declineInvitation(
    invitation: CollectionInvitation
  ): Promise<void> {
    try {
      const result = await pool.query(
        "DELETE FROM collection_invites WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3",
        [
          invitation.collectionId,
          invitation.invitedUserId,
          invitation.invitedByUserId,
        ]
      );
      if (result.rowCount === 0) {
        throw new HttpException("Invitation not found", 404);
      }
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }
}
