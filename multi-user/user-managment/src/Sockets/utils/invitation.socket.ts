import { connectedUsers } from "../webSocket";
import { InvitationManager } from "../../Invitation/invitation.manager";
import {
  Invitation,
  ResponseInvitation,
} from "../../Invitation/invitation.model";

export class InvitationSocket {
  private invitationManager: InvitationManager =
    InvitationManager.getInstance();

  public async onCreateInvitation(invitation: ResponseInvitation) {
    if (!invitation) return;

    let socket = connectedUsers.get(invitation.invitedUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getReceivedByUserId(
          invitation.invitedUserId
        );
      socket.emit("receivedInvitations", invitations);
    }
    socket = connectedUsers.get(invitation.invitedByUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getSentByUserId(
          invitation.invitedByUserId
        );
      socket.emit("sentInvitations", invitations);
    }
  }

  public async onDeleteInvitation(invitation: Invitation) {
    if (!invitation) return;
    let socket = connectedUsers.get(invitation.invitedUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getReceivedByUserId(
          invitation.invitedUserId
        );
      socket.emit("receivedInvitations", invitations);
    }
    socket = connectedUsers.get(invitation.invitedByUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getSentByUserId(
          invitation.invitedByUserId
        );
      socket.emit("sentInvitations", invitations);
    }
  }

  public async onAcceptInvitation(invitation: Invitation) {
    if (!invitation) return;

    let socket = connectedUsers.get(invitation.invitedUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getReceivedByUserId(
          invitation.invitedUserId
        );
      socket.emit("receivedInvitations", invitations);
    }
    socket = connectedUsers.get(invitation.invitedByUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getSentByUserId(
          invitation.invitedByUserId
        );
      socket.emit("sentInvitations", invitations);
    }
  }

  public async onDeclineInvitation(invitation: Invitation) {
    if (!invitation) return;

    let socket = connectedUsers.get(invitation.invitedUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getReceivedByUserId(
          invitation.invitedUserId
        );
      socket.emit("receivedInvitations", invitations);
    }
    socket = connectedUsers.get(invitation.invitedByUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getSentByUserId(
          invitation.invitedByUserId
        );
      socket.emit("sentInvitations", invitations);
    }
  }

  public async onDeleteCollection(
    collectionUrl: string,
    invitedByUserId: number
  ) {
    if (!collectionUrl || !invitedByUserId) return;

    const affectedUserIds: number[] =
      this.invitationManager.removeFromCacheByCollectionUrl({
        collectionUrl,
        invitedByUserId,
      });

    for (const userId of affectedUserIds) {
      const socket = connectedUsers.get(userId);
      if (socket) {
        const invitations: Invitation[] =
          await this.invitationManager.getReceivedByUserId(invitedByUserId);
        socket.emit("receivedInvitations", invitations);
      }
    }

    const socket = connectedUsers.get(invitedByUserId);
    if (socket) {
      const invitations: Invitation[] =
        await this.invitationManager.getSentByUserId(invitedByUserId);
      socket.emit("sentInvitations", invitations);
    }
  }
}
