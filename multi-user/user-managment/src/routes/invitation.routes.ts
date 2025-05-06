import { Router } from "express";
import { authenticate } from "../middleware/auth";
import * as invitationController from "../controller/invitation.controller";

const router = Router();

router.get("/", authenticate, invitationController.getInvitations);
router.delete("/", authenticate, invitationController.deleteInvitation);
router.post("/", authenticate, invitationController.createInvitation);
router.post("/accept", authenticate, invitationController.acceptInvitation);
router.post("/decline", authenticate, invitationController.declineInvitation);

export default router;
