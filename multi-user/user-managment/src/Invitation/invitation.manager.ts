import { Invitation, ResponseInvitation } from "./invitation.model";
import { InvitationDao } from "./invitation.dao";
import { HttpException } from "../model/exception";

export class InvitationManager {
  private static instance: InvitationManager;
  // Cache to store invitations by userId -> invitationsTO and invitationsFROM
  private invitationsCache: Map<number, Invitation[]> = new Map();
  private dao: InvitationDao = new InvitationDao();

  private constructor() {}

  public static getInstance(): InvitationManager {
    if (!InvitationManager.instance) {
      InvitationManager.instance = new InvitationManager();
    }
    return InvitationManager.instance;
  }

  public async getByUserIdFromDB(userId: number): Promise<Invitation[]> {
    try {
      const response = await this.dao.getByUserId({
        userId: userId.toString(),
      });
      this.invitationsCache.set(userId, response);
      return response;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public getReceivedByUserId(userId: number): Invitation[] {
    const invitations = this.invitationsCache.get(userId) || [];
    return invitations.filter((inv) => inv.invitedUserId === userId);
  }

  public getSentByUserId(userId: number): Invitation[] {
    const invitations = this.invitationsCache.get(userId) || [];
    return invitations.filter((inv) => inv.invitedByUserId === userId);
  }

  public async create(invitation: ResponseInvitation): Promise<void> {
    try {
      await this.dao.create(invitation);
      if (this.invitationsCache.has(invitation.invitedUserId)) {
        await this.getByUserIdFromDB(invitation.invitedUserId);
      }

      if (this.invitationsCache.has(invitation.invitedByUserId)) {
        await this.getByUserIdFromDB(invitation.invitedByUserId);
      }
      return;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async delete(invitation: Invitation): Promise<void> {
    try {
      await this.dao.delete(invitation);
      if (this.invitationsCache.has(invitation.invitedUserId)) {
        const cachedInvitations =
          this.invitationsCache.get(invitation.invitedUserId) || [];
        this.invitationsCache.set(
          invitation.invitedUserId,
          cachedInvitations.filter(
            (inv) => inv.collectionId !== invitation.collectionId
          )
        );
      }
      if (this.invitationsCache.has(invitation.invitedByUserId)) {
        const cachedInvitations =
          this.invitationsCache.get(invitation.invitedByUserId) || [];
        this.invitationsCache.set(
          invitation.invitedByUserId,
          cachedInvitations.filter(
            (inv) => inv.collectionId !== invitation.collectionId
          )
        );
      }
      return;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async accept(invitation: Invitation): Promise<void> {
    invitation.status = "accepted";
    try {
      await this.dao.accept(invitation);
      if (this.invitationsCache.has(invitation.invitedUserId)) {
        const cachedInvitations =
          this.invitationsCache.get(invitation.invitedUserId) || [];
        this.invitationsCache.set(
          invitation.invitedUserId,
          cachedInvitations.filter(
            (inv) => inv.collectionId !== invitation.collectionId
          )
        );
      }
      if (this.invitationsCache.has(invitation.invitedByUserId)) {
        const cachedInvitations =
          this.invitationsCache.get(invitation.invitedByUserId) || [];
        this.invitationsCache.set(invitation.invitedByUserId, [
          ...cachedInvitations.filter(
            (inv) => inv.collectionId !== invitation.collectionId
          ),
          invitation,
        ]);
      }
      return;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async decline(invitation: Invitation): Promise<void> {
    try {
      await this.dao.decline(invitation);
      if (this.invitationsCache.has(invitation.invitedUserId)) {
        const cachedInvitations =
          this.invitationsCache.get(invitation.invitedUserId) || [];
        this.invitationsCache.set(
          invitation.invitedUserId,
          cachedInvitations.filter(
            (inv) => inv.collectionId !== invitation.collectionId
          )
        );
      }
      if (this.invitationsCache.has(invitation.invitedByUserId)) {
        const cachedInvitations =
          this.invitationsCache.get(invitation.invitedByUserId) || [];
        this.invitationsCache.set(
          invitation.invitedByUserId,
          cachedInvitations.filter(
            (inv) => inv.collectionId !== invitation.collectionId
          )
        );
      }
      return;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public removeFromCacheByUserId(userId: number): void {
    if (this.invitationsCache.has(userId)) {
      this.invitationsCache.delete(userId);
    }
  }

  public removeFromCacheByCollectionUrl({
    collectionUrl,
    invitedByUserId,
  }: {
    collectionUrl: string;
    invitedByUserId: number;
  }): number[] {
    // Get all userIds that have invitations in the cache
    const userIds = Array.from(this.invitationsCache.keys());
    // Filter userIds that have invitations for the specified collectionUrl and invitedByUserId
    const affectedUserIds = userIds.filter((userId) => {
      const invitations = this.invitationsCache.get(userId) || [];
      return invitations.some(
        (inv) =>
          inv.urlCollection === collectionUrl &&
          inv.invitedByUserId === invitedByUserId
      );
    });
    // Remove invitations from the cache for each affected userId
    this.invitationsCache.forEach((invitations, userId) => {
      this.invitationsCache.set(
        userId,
        invitations.filter(
          (inv) =>
            !(
              inv.urlCollection === collectionUrl &&
              inv.invitedByUserId === invitedByUserId &&
              inv.invitedUserId !== userId
            )
        )
      );
    });

    return affectedUserIds;
  }
}
