import db from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: 'active' | 'complete';
};

export class OrderModel {
  async create(o: Order): Promise<Order> {
    const conn = await db.connect();
    const res = await conn.query(
      'INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *',
      [o.user_id, o.status]
    );
    conn.release();
    return res.rows[0];
  }

  async show(id: number): Promise<any> {
    const conn = await db.connect();
    const res = await conn.query(
      `SELECT o.*, json_agg(json_build_object('product_id', op.product_id, 'quantity', op.quantity)) AS items
       FROM orders o
       LEFT JOIN order_products op ON o.id = op.order_id
       WHERE o.id = $1
       GROUP BY o.id`,
      [id]
    );
    conn.release();
    return res.rows[0];
  }

  async addProduct(order_id: number, product_id: number, quantity: number): Promise<any> {
    const conn = await db.connect();
    const res = await conn.query(
      'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *',
      [order_id, product_id, quantity]
    );
    conn.release();
    return res.rows[0];
  }
}
