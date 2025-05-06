import { Router } from "express";
import { verifyRole, authenticate } from "../middleware/auth";
import * as userController from "../controller/user.controller";

const router = Router();

router.post("/signup", userController.signup);

router.get("/", authenticate, userController.getUsers);

router.delete(
  "/deleteUser/:username",
  verifyRole("admin"),
  userController.deleteUser
);

router.patch("/updateUser", verifyRole("admin"), userController.updateUser);
export default router;
