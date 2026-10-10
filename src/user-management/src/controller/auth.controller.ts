import { Request, Response } from "express";
import { model, User } from "../model/auth";
import { HttpException } from "../model/exception";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body as User;

  if (!username || !password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    const token = await model.login({ username, password } as User);
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(200).json({
      ok: true,
      message: "Login successful",
    });
  } catch (err) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({
        error: err.message,
      });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
