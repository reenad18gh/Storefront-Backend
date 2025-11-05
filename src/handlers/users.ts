import { Application, Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { verifyToken } from './middleware';

const store = new UserModel();

const create = async (req: Request, res: Response) => {
  const user = await store.create(req.body);
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
  res.json({ token, user });
};

const authenticate = async (req: Request, res: Response) => {
  const u = await store.authenticate(req.body.firstname, req.body.password);
  if (!u) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
  res.json({ token, user: u });
};

const index = async (_req: Request, res: Response) => {
  res.json(await store.index());
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id));
  res.json(user);
};

export default function usersRoutes(app: Application) {
  app.post('/users', create);
  app.post('/users/auth', authenticate);
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, show);
}
