import { HttpException } from "../model/exception";
import { Invitation, ResponseInvitation } from "./invitation.model";
import { CustomRequest } from "../middleware/auth";
import { InvitationManager } from "./invitation.manager";
import { InvitationSocket } from "../Sockets/utils/invitation.socket";
import { CollectionSocket } from "../Sockets/utils/collection.socket";

const manager = InvitationManager.getInstance();
const socket = new InvitationSocket();
const collectionSocket = new CollectionSocket();

export const getReceivedInvitations = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const invitations = await manager.getReceivedByUserId(parseInt(userId));
    res.status(200).json(invitations);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const getSentInvitations = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const invitations = await manager.getSentByUserId(parseInt(userId));
    res.status(200).json(invitations);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const createInvitation = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  const invitation: ResponseInvitation = req.body;
  invitation.invitedByUserId = parseInt(userId);
  try {
    await manager.create(invitation);
    await socket.onCreateInvitation(invitation);
    res.status(201).json(invitation);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const deleteInvitation = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId || userId !== req.body.invitedByUserId) {
    res.status(400).json("Incorrect values");
    return;
  }
  const invitation: Invitation = req.body;
  invitation.invitedByUserId = parseInt(userId);
  try {
    await manager.delete(invitation);
    await socket.onDeleteInvitation(invitation);
    await collectionSocket.onDeleteInvitation(invitation.invitedUserId);
    res.status(200).json("Invitation deleted successfully");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const acceptInvitation = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  const invitation: Invitation = req.body;
  try {
    await manager.accept(invitation);
    await socket.onAcceptInvitation(invitation);
    await collectionSocket.onAcceptCollection(String(invitation.invitedUserId));
    res.status(200).json("Invitation accepted successfully");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const declineInvitation = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  const invitation: Invitation = req.body;
  try {
    await manager.decline(invitation);
    await socket.onDeclineInvitation(invitation);
    res.status(200).json("Invitation declined successfully");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
