import { Router } from "express";
import { authenticate } from "../middleware/auth";
import * as invitationController from "../Invitation/invitation.controller";

const router = Router();

router.get(
  "/received",
  authenticate,
  invitationController.getReceivedInvitations
);
router.get("/sent", authenticate, invitationController.getSentInvitations);
router.delete("/", authenticate, invitationController.deleteInvitation);
router.post("/", authenticate, invitationController.createInvitation);
router.post("/accept", authenticate, invitationController.acceptInvitation);
router.post("/decline", authenticate, invitationController.declineInvitation);

export default router;
