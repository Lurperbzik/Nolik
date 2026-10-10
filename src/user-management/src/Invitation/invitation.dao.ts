import pool from "../database";
import { HttpException } from "../model/exception";
import { Invitation, ResponseInvitation } from "./invitation.model";

export class InvitationDao {
  public async getByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Invitation[]> {
    try {
      const result = await pool.query(
        `
        SELECT c.*, ci.*, invited_user.username AS invited_username, inviter_user.username AS inviter_username 
        FROM collections c 
        INNER JOIN collection_invites ci ON c.id = ci.collection_id 
        INNER JOIN users invited_user ON ci.invited_user_id = invited_user.id 
        INNER JOIN users inviter_user ON ci.invited_by_user_id = inviter_user.id 
        WHERE ci.invited_user_id = $1 AND ci.status = 'pending' OR ci.invited_by_user_id = $2;
        `,
        [userId, userId]
      );

      return result.rows.map((row: any) =>
        Invitation.fromJson({
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
        })
      );
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  public async create(invitation: ResponseInvitation): Promise<void> {
    try {
      let result = await pool.query(
        `
        SELECT id 
        FROM collections 
        WHERE url = $1
        `,
        [invitation.collectionUrl]
      );
      if (result.rows.length === 0) {
        throw new HttpException("Collection not found", 404);
      }
      const collectionId = result.rows[0].id;
      result = await pool.query(
        `
        SELECT id 
        FROM users 
        WHERE id = $1
        `,
        [invitation.invitedUserId]
      );
      if (result.rows.length === 0) {
        throw new HttpException("User not found", 404);
      }
      const invitedUserId = result.rows[0].id;

      const existingInvitation = await pool.query(
        `
        SELECT * 
        FROM collection_invites 
        WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3
        `,
        [collectionId, invitedUserId, invitation.invitedByUserId]
      );
      if (existingInvitation.rows.length > 0) {
        throw new HttpException("Invitation already exists", 409);
      }
      await pool.query(
        `
        INSERT INTO collection_invites 
        (collection_id, invited_user_id, invited_by_user_id) 
        VALUES ($1, $2, $3)
        `,
        [collectionId, invitedUserId, invitation.invitedByUserId]
      );
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async delete(invitation: Invitation): Promise<void> {
    try {
      const result = await pool.query(
        `
        DELETE FROM collection_invites 
        WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3
        `,
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

  public async accept(invitation: Invitation): Promise<void> {
    try {
      const result = await pool.query(
        `
        UPDATE collection_invites 
        SET status = 'accepted' 
        WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3
        `,
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

  public async decline(invitation: Invitation): Promise<void> {
    try {
      const result = await pool.query(
        `
        DELETE FROM collection_invites 
        WHERE collection_id = $1 AND invited_user_id = $2 AND invited_by_user_id = $3
        `,
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
