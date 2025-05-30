import { UserManager } from "./user.manager";
import { User } from "./user.model";
import { HttpException } from "../model/exception";
import { UserSocket } from "../Sockets/utils/user.socket";

const manager = UserManager.getInstance();
const socket = new UserSocket();

export const createUser = async (req: any, res: any) => {
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

export const deleteUser = async (req: any, res: any) => {
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

export const updateUser = async (req: any, res: any) => {
  const user: User = req.body;

  if (!user.id || !user.password) {
    res.status(400).json("User ID and password are required");
    return;
  }

  try {
    const message = await manager.update(user);
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
