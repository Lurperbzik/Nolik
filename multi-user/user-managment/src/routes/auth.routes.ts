import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { authenticate } from "../middleware/auth";

const router = Router();
router.post("/login", authController.login);
router.get("/check-auth", authenticate, (req, res) => {
  res.status(200).json({ authenticated: true, user: (req as any).user });
});
router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});
export default router;
