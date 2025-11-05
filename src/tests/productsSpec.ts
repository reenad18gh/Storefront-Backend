import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Products endpoints', () => {
  let token = '';

  beforeAll(async () => {
    const res = await request.post('/users').send({
      firstname: 'tester',
      lastname: 'one',
      password: 'pass'
    });
    token = res.body.token;
  });

  it('creates product (protected)', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Book', price: 50, category: 'edu' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Book');
  });

  it('lists products', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
  });
});
