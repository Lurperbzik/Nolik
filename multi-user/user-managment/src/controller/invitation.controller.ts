import { HttpException } from "../model/exception";
import { CustomRequest } from "../middleware/auth";
import { Model } from "../model/invitation";
import { CollectionInvitation, Invitation } from "../model/invitation";

export const getInvitations = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }

  try {
    const model = new Model();
    const invitations: CollectionInvitation[] =
      await model.getInvitations(userId);
    res.status(200).json(invitations);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const getInvitationsByCollectionUrl = async (
  req: CustomRequest,
  res: any
) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }

  const collectionUrl = decodeURIComponent(req.params.collectionUrl);

  if (!collectionUrl) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const model = new Model();
    const invitations: CollectionInvitation[] =
      await model.getInvitationsByCollectionUrl(collectionUrl, userId);
    res.status(200).json(invitations);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const getInvitationsByUserId = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const model = new Model();
    const invitations: CollectionInvitation[] =
      await model.getInvitationsByUserId(userId);
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

  const invitation = req.body as Invitation;
  if (!invitation) {
    res.status(400).json("Incorrect values");
    return;
  }
  if (!invitation.collectionUrl || !invitation.invitedUsername) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const model = new Model();
    await model.createInvitation(invitation, userId);
    res.status(200).json("Invitation created");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const deleteInvitation = async (req: any, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }

  const invitation = req.body as CollectionInvitation;

  if (userId != invitation.invitedByUserId) {
    res.status(400).json("Incorrect values");
    return;
  }

  if (!invitation) {
    res.status(400).json("Incorrect values");
    return;
  }

  if (invitation.invitedByUserId !== userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const model = new Model();
    await model.deleteInvitation(invitation);
    res.status(200).json("Invitation deleted");
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

  const invitation = req.body as CollectionInvitation;
  if (!invitation) {
    res.status(400).json("Incorrect values");
    return;
  }
  if (invitation.invitedUserId !== Number(userId)) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const model = new Model();
    await model.acceptInvitation(invitation);
    res.status(200).json("Invitation accepted");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const declineInvitation = async (req: any, res: any) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json("Incorrect values");
    return;
  }

  const invitation = req.body as CollectionInvitation;
  if (!invitation) {
    res.status(400).json("Incorrect values");
    return;
  }
  if (invitation.invitedUserId !== userId) {
    res.status(400).json("Incorrect values");
    return;
  }
  try {
    const model = new Model();
    await model.declineInvitation(invitation);
    res.status(200).json("Invitation declined");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
