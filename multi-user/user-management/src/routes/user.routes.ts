import { Router } from "express";
import { verifyRole, authenticate } from "../middleware/auth";
import * as userController from "../User/user.controller";

const router = Router();

router.post("/", verifyRole("admin"), userController.createUser);

router.get("/", authenticate, userController.getUsers);

router.delete("/:username", verifyRole("admin"), userController.deleteUser);

router.put("/password", authenticate, userController.updateUserPassword);
router.put("/api-key", authenticate, userController.updateUserApiKey);
export default router;
