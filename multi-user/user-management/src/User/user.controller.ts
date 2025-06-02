import { UserManager } from "./user.manager";
import { User } from "./user.model";
import { HttpException } from "../model/exception";
import { UserSocket } from "../Sockets/utils/user.socket";
import { CustomRequest } from "../middleware/auth";

const manager = UserManager.getInstance();
const socket = new UserSocket();

export const createUser = async (req: CustomRequest, res: any) => {
  const role = req.role;
  if (role !== "admin") {
    res.status(403).json("Forbidden: Only admins can create users");
    return;
  }

  const user: User = req.body;

  if (!user.username || !user.password) {
    res.status(400).json("Username and password are required");
    return;
  }

  try {
    const message = await manager.create(user);
    socket.onUsersChange();
    res.status(201).json({ message });
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const deleteUser = async (req: CustomRequest, res: any) => {
  const role = req.role;
  if (role !== "admin") {
    res.status(403).json("Forbidden: Only admins can delete users");
    return;
  }
  const user: User = req.body;

  if (!user.id || !user.username) {
    res.status(400).json("User ID and username are required");
    return;
  }

  try {
    const message = await manager.delete(user);
    socket.onUsersChange();
    res.status(200).json({ message });
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const updateUserPassword = async (req: CustomRequest, res: any) => {
  const userId = req.user;
  const password = req.body.password;
  if (!userId || !password) {
    res.status(400).json("User ID and password are required");
    return;
  }

  const user: User = new User({
    id: parseInt(userId),
    password: password,
    username: "",
    role: "",
  });

  try {
    const message = await manager.updatePassword(user);
    res.status(200).json({ message });
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const updateUserApiKey = async (req: any, res: any) => {
  const userId = req.user;
  const apiKey = req.body.apiKey;
  const user: User = new User({
    id: userId,
    apiKey: apiKey,
    username: "",
    role: "",
  });

  if (!user.id || !user.apiKey || user.id !== userId) {
    res.status(400).json("User ID and API key are required");
    return;
  }

  try {
    const message = await manager.updateApiKey(user);
    res.status(200).json({ message });
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await manager.getAll();
    res.status(200).json(users);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
