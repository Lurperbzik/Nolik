import { Model, User } from "../model/user";
import { HttpException } from "../model/exception";

const model = new Model();

export const signup = async (req: any, res: any) => {
  const { username, password } = req.body as User;

  if (username === null || password === null) {
    res.status(400).json("Incorrect values");
    return;
  }

  try {
    const message = await model.signup({ username, password } as User);
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
    const users = await model.getUsers();
    res.status(200).json(users);
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const deleteUser = async (req: any, res: any) => {
  const username = req.params.username || null;

  if (username === null) {
    res.status(400).json("Incorrect values");
    return;
  }

  try {
    await model.deleteUser({ username } as User);
    res.status(200).json("User deleted");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const updateUser = async (req: any, res: any) => {
  const { username, password, role } = req.body as User;

  if (username === null || password === null || role === null) {
    res.status(400).json("Incorrect username");
    return;
  }

  try {
    await model.updateUser({ username, password, role } as User);
    res.status(200).json("User updated");
  } catch (err: any) {
    if (err instanceof HttpException) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
