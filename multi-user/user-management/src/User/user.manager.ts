import { User, UserResponse } from "./user.model";
import { UserDao } from "./user.dao";
import { HttpException } from "../model/exception";

export class UserManager {
  private usersCache: Map<number, UserResponse> = new Map();
  private dao: UserDao = new UserDao();
  private static instance: UserManager;

  private constructor() {
    try {
      this.refresh();
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  public async create(user: User): Promise<String> {
    try {
      const result = await this.dao.create(user);
      const newUser = new UserResponse({
        username: result.username,
        id: result.id || -1,
      });
      this.usersCache.set(newUser.id, newUser);
      return "User created successfully";
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async delete(user: User): Promise<String> {
    try {
      const result = await this.dao.delete(user);
      this.usersCache.delete(user.id || -1);
      return result;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async updatePassword(user: User): Promise<String> {
    try {
      const result = await this.dao.updatePassword(user);
      return result;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async updateApiKey(user: User): Promise<String> {
    try {
      const result = await this.dao.updateApiKey(user);
      return result;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async refresh(): Promise<{ id: number; username: string }[]> {
    try {
      const users = await this.dao.getAll();
      this.usersCache.clear();
      users.forEach((user) => {
        const userResponse = new UserResponse({
          username: user.username,
          id: user.id,
        });
        this.usersCache.set(user.id, userResponse);
      });
      return Array.from(this.usersCache.values()).map((user) => ({
        id: user.id,
        username: user.username,
      }));
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public getAll(): UserResponse[] {
    return Array.from(this.usersCache.values());
  }

  public async getApiKeyById(id: number): Promise<string | null> {
    return await this.dao.getApiKeyById(id);
  }
}
