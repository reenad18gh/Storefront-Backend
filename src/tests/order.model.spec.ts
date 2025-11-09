import { OrderStore } from '../models/order';
import { ProductStore } from '../models/product';
import { UserStore } from '../models/user';
import { truncateAll } from './helpers/db';

const orders = new OrderStore();
const products = new ProductStore();
const users = new UserStore();

describe('Order Model', () => {
  beforeAll(async () => {
    await truncateAll();
    await users.create({ firstname: 'Nora', lastname: 'Al', password: '123' });
    await products.create({ name: 'Phone', price: 1000 });
  });

  it('create opens order for user', async () => {
    const user = (await users.index())[0];
    const o = await orders.create({ status: 'active', user_id: user.id as number });
    expect(o.id).toBeDefined();
    expect(o.status).toBe('active');
  });

  it('addProduct adds item to order', async () => {
    const order = (await orders.index())[0];
    const prod = (await products.index())[0];
    const row = await orders.addProduct(2, order.id as number, prod.id as number);
    expect(row.quantity).toBe(2);
  });

  it('currentOrderByUser returns active order', async () => {
    const user = (await users.index())[0];
    const cur = await orders.currentOrderByUser(user.id as number);
    expect(cur.user_id).toEqual(user.id);
  });
});
