import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Orders endpoints', () => {
  let token = '';
  let productId = 0;
  let orderId = 0;

  beforeAll(async () => {
    const u = await request.post('/users').send({ firstname: 'o', lastname: 'u', password: 'p' });
    token = u.body.token;
    const p = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Pen', price: 5, category: 'stationery' });
    productId = p.body.id;
  });

  it('creates order', async () => {
    const res = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, status: 'active' });
    expect(res.status).toBe(200);
    orderId = res.body.id;
  });

  it('adds product to order', async () => {
    const res = await request
      .post(`/orders/${orderId}/products`)
      .set('Authorization', `Bearer ${token}`)
      .send({ product_id: productId, quantity: 3 });
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(3);
  });
});
