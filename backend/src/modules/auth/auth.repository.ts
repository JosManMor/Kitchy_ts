import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import type { CreateUserDTO } from './auth.types.js';

export class AuthRepository {
  // Create a new user and return insertId
  static async createUser(pool: Pool, data: CreateUserDTO) {
    const sql = `INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(sql, [
      data.username,
      data.password,
      data.role_id,
    ]);
    return result.insertId;
  }

  static async getUserByUsername(pool: Pool, username: string) {
    const sql = `SELECT id, username, password, role_id FROM users WHERE username = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(sql, [username]);
    return rows.length ? rows[0] : null;
  }

  static async getUserById(pool: Pool, id: number) {
    const sql = `SELECT id, username, role_id FROM users WHERE id = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(sql, [id]);
    return rows.length ? rows[0] : null;
  }
}
