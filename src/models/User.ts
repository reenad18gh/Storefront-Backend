import db from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export class UserModel {
  async index(): Promise<Omit<User,'password'>[]> {
    const conn = await db.connect();
    const sql = 'SELECT id, firstname, lastname FROM users';
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  }

  async show(id: number): Promise<Omit<User,'password'>|undefined> {
    const conn = await db.connect();
    const sql = 'SELECT id, firstname, lastname FROM users WHERE id=$1';
    const res = await conn.query(sql, [id]);
    conn.release();
    return res.rows[0];
  }

  async create(u: User): Promise<Omit<User,'password'>> {
    const hash = bcrypt.hashSync(u.password + pepper, saltRounds);
    const conn = await db.connect();
    const sql =
      'INSERT INTO users (firstname, lastname, password_digest) VALUES ($1,$2,$3) RETURNING id, firstname, lastname';
    const res = await conn.query(sql, [u.firstname, u.lastname, hash]);
    conn.release();
    return res.rows[0];
  }

  async authenticate(firstname: string, password: string): Promise<Omit<User,'password'>|null> {
    const conn = await db.connect();
    const sql = 'SELECT * FROM users WHERE firstname=$1';
    const res = await conn.query(sql, [firstname]);
    conn.release();
    if (res.rows.length && bcrypt.compareSync(password + pepper, res.rows[0].password_digest)) {
      const { id, firstname, lastname } = res.rows[0];
      return { id, firstname, lastname } as any;
    }
    return null;
  }
}
