import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Users endpoints', () => {
  let token = '';

  it('creates user and returns token', async () => {
    const res = await request.post('/users').send({
      firstname: 'rinad',
      lastname: 'alghamdi',
      password: '123456'
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('gets users with token', async () => {
    const res = await request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
  });
});
