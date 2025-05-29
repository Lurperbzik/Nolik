import { Invitation, ResponseInvitation } from "./invitation.model";
import { InvitationDao } from "./invitation.dao";
import { HttpException } from "../model/exception";

export class InvitationManager {
  private invitationsCache: Map<number, Invitation[]> = new Map();
  private dao: InvitationDao = new InvitationDao();

  private async getByUserIdFromDB(userId: number): Promise<Invitation[]> {
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

  public async getByUserId(userId: number): Promise<Invitation[]> {
    try {
      if (this.invitationsCache.has(userId)) {
        return this.invitationsCache.get(userId) || [];
      }
      return await this.getByUserIdFromDB(userId);
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async getByCollectionUrl({
    collectionUrl,
    userId,
  }: {
    collectionUrl: string;
    userId: number;
  }): Promise<Invitation[]> {
    try {
      const response = await this.dao.getByCollectionUrl({
        collectionUrl,
        userId: userId.toString(),
      });
      return response;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async create(invitation: ResponseInvitation): Promise<void> {
    try {
      return await this.dao.create(invitation);
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async delete(invitation: Invitation): Promise<boolean> {
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
      return true;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async accept(invitation: Invitation): Promise<void> {
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
    userId,
  }: {
    collectionUrl: string;
    userId: number;
  }): void {
    if (this.invitationsCache.has(userId)) {
      const cachedInvitations = this.invitationsCache.get(userId) || [];
      this.invitationsCache.set(
        userId,
        cachedInvitations.filter((inv) => inv.urlCollection !== collectionUrl)
      );
    }
  }
}
