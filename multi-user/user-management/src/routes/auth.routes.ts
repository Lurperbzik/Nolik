import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { authenticate, verifyRole } from "../middleware/auth";
import { CustomRequest } from "../middleware/auth";

const router = Router();
router.post("/login", authController.login);
router.get("/check-auth", authenticate, (req: CustomRequest, res) => {
  const token = req.cookies.jwt;
  const role = req.role;
  res
    .status(200)
    .json({
      authenticated: true,
      user: (req as any).user,
      token: token,
      role: role,
    });
});
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
