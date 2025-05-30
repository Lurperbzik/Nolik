import pool from "../database/index";
import { HttpException } from "../model/exception";
import bcrypt from "bcrypt";
import { User } from "./user.model";

export class UserDao {
  public async create(user: User): Promise<User> {
    if (!user.password) {
      throw new HttpException("Password is required", 400);
    }
    try {
      const existingUser = await pool.query(
        `
        SELECT * 
        FROM users 
        WHERE username = $1
        `,
        [user.username]
      );

      if (existingUser.rows.length > 0) {
        throw new HttpException("Username is already in use", 400);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const result = await pool.query(
        `
        INSERT INTO users 
        (username, password) 
        VALUES ($1, $2) 
        RETURNING *
        `,
        [user.username, hashedPassword]
      );

      return result.rows[0];
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }

  public async delete(user: User): Promise<String> {
    if (!user.id) {
      throw new HttpException("User ID is required", 400);
    }
    return new Promise((resolve, reject) => {
      pool.query(
        `
        DELETE FROM users 
        WHERE id = $1
        `,
        [user.id],
        async (err) => {
          if (err) {
            reject(new HttpException(err.message, 500));
            return;
          }
          resolve(`User ${user.username} deleted successfully`);
        }
      );
    });
  }

  public async update(user: User): Promise<String> {
    if (!user.id || !user.password) {
      throw new HttpException("User ID and password are required", 400);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    return new Promise((resolve, reject) => {
      const query = `
      UPDATE USERS 
      SET password = $1, role = $2 
      WHERE id = $3
      `;
      const values = [hashedPassword, user.role, user.id];

      pool.query(query, values, (err, res) => {
        if (err) {
          reject(new HttpException(err.message, 500));
        } else if (res.rowCount === 0) {
          reject(
            new HttpException(
              `No user found with username: ${user.username}`,
              404
            )
          );
        } else {
          resolve(`User ${user.username} updated successfully`);
        }
      });
    });
  }

  public async getAll(): Promise<{ id: number; username: string }[]> {
    return new Promise((resolve, reject) => {
      pool.query(
        `
        SELECT id, username 
        FROM users
        `,
        (err, res) => {
          if (err) {
            reject(new HttpException(err.message, 500));
          } else {
            if (res.rows.length === 0) {
              resolve([]);
              return;
            }

            const users = res.rows.map((row: any) => ({
              id: row.id,
              username: row.username,
            }));
            resolve(users);
          }
        }
      );
    });
  }
}
