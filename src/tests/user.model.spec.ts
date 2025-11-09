import { UserStore } from '../models/user';
import { truncateAll } from './helpers/db';

const store = new UserStore();

describe('User Model', () => {
  beforeAll(async () => { await truncateAll(); });

  it('create hashes password and returns user', async () => {
    const u = await store.create({ firstname: 'Ali', lastname: 'Saud', password: 'pass123' });
    expect(u.id).toBeDefined();
    expect(u.firstname).toBe('Ali');
  });

  it('index returns users', async () => {
    const users = await store.index();
    expect(users.length).toBeGreaterThan(0);
  });

  it('show returns a user', async () => {
    const first = (await store.index())[0];
    const res = await store.show(first.id as number);
    expect(res?.id).toEqual(first.id);
  });

  it('authenticate returns user on correct password', async () => {
    const ok = await store.authenticate('Ali', 'Saud', 'pass123');
    expect(ok).toBeTruthy();
  });
});
