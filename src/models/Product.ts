import db from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    const conn = await db.connect();
    const res = await conn.query('SELECT * FROM products ORDER BY id');
    conn.release();
    return res.rows;
  }

  async show(id: number): Promise<Product|undefined> {
    const conn = await db.connect();
    const res = await conn.query('SELECT * FROM products WHERE id=$1', [id]);
    conn.release();
    return res.rows[0];
  }

  async create(p: Product): Promise<Product> {
    const conn = await db.connect();
    const res = await conn.query(
      'INSERT INTO products (name, price, category) VALUES ($1,$2,$3) RETURNING *',
      [p.name, p.price, p.category || null]
    );
    conn.release();
    return res.rows[0];
  }

  async byCategory(name: string): Promise<Product[]> {
    const conn = await db.connect();
    const res = await conn.query('SELECT * FROM products WHERE category=$1', [name]);
    conn.release();
    return res.rows;
  }
}
