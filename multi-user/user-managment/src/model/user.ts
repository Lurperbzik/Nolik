import pool from "../database/index";
import bcrypt from "bcrypt";
import { HttpException } from "./exception";

export interface User {
  username: string;
  password: string;
  role?: string;
}

export interface UserResponse {
  username: string;
  id: string;
}

export class Model {
  public async signup({ username, password }: User): Promise<String> {
    try {
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (existingUser.rows.length > 0) {
        throw new HttpException("Username is already in use", 400);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await pool.query(
        "INSERT INTO users (username, password) values ($1, $2)",
        [username, hashedPassword]
      );

      return "User created successfully";
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async getUsers(): Promise<UserResponse[]> {
    return new Promise((resolve, reject) => {
      pool.query("SELECT username, id FROM users", (err, res) => {
        if (err) {
          reject(new HttpException(err.message, 500));
          return;
        }
        if (res.rows.length === 0) {
          resolve([]);
          return;
        }

        const users = res.rows.map((row: any) => ({
          username: row.username,
          id: row.id,
        }));
        resolve(users);
      });
    });
  }

  public async deleteUser({ username }: User): Promise<String> {
    return new Promise((resolve, reject) => {
      pool.query(
        "DELETE FROM users WHERE username = $1",
        [username],
        async (err, res) => {
          if (err) {
            reject(new HttpException(err.message, 500));
            return;
          }

          resolve(`User ${username} deleted successfully`);
        }
      );
    });
  }

  public async updateUser({ username, password, role }: User): Promise<String> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return new Promise((resolve, reject) => {
      const query = `UPDATE USERS SET username = $1, password = $2, role = $3 WHERE username = $4`;
      const values = [username, hashedPassword, role, username];

      pool.query(query, values, (err, res) => {
        if (err) {
          reject(new HttpException(err.message, 500));
        } else if (res.rowCount === 0) {
          reject(
            new HttpException(`No user found with username: ${username}`, 404)
          );
        } else {
          resolve(`User ${username} updated successfully`);
        }
      });
    });
  }
}
