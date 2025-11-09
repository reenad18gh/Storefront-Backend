import { ProductStore } from '../models/product';
import { truncateAll } from './helpers/db';

const store = new ProductStore();

describe('Product Model', () => {
  beforeAll(async () => { await truncateAll(); });

  it('create returns created product', async () => {
    const p = await store.create({ name: 'Book', price: 20 });
    expect(p.id).toBeDefined();
    expect(p.name).toBe('Book');
    expect(p.price).toBe(20);
  });

  it('index returns array', async () => {
    const list = await store.index();
    expect(Array.isArray(list)).toBeTrue();
    expect(list.length).toBeGreaterThan(0);
  });

  it('show returns one product', async () => {
    const first = (await store.index())[0];
    const res = await store.show(first.id as number);
    expect(res?.id).toEqual(first.id);
  });

  it('update edits product', async () => {
    const first = (await store.index())[0];
    const updated = await store.update({ id: first.id as number, name: 'Pen', price: 5 });
    expect(updated.name).toBe('Pen');
    expect(updated.price).toBe(5);
  });

  it('delete removes product', async () => {
    const created = await store.create({ name: 'Temp', price: 1 });
    const deleted = await store.delete(created.id as number);
    expect(deleted.id).toEqual(created.id);
  });
});
