import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../database/index";
import { HttpException } from "./exception";

export interface User {
  username: string;
  password: string;
}

export class UserModel {
  private secretKey: string = process.env.JWTPRIVATEKEY || "defaultSecretKey";

  public async login({ username, password }: User): Promise<string> {
    try {
      const result = await pool.query(
        "SELECT id, username, password, role FROM Users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) {
        throw new HttpException("User not found", 404);
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return this.generateToken(user.id, user.role);
      } else {
        throw new HttpException("Incorrect password", 401);
      }
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  private generateToken(userId: string, userRole: string): string {
    return jwt.sign({ userId, userRole }, this.secretKey, { expiresIn: "12h" });
  }
}

export const model = new UserModel();
