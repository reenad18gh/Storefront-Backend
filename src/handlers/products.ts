import { Application, Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { verifyToken } from './middleware';

const store = new ProductModel();

const create = async (req: Request, res: Response) => {
  res.json(await store.create(req.body));
};
const index = async (_req: Request, res: Response) => {
  res.json(await store.index());
};
const show = async (req: Request, res: Response) => {
  res.json(await store.show(parseInt(req.params.id)));
};
const byCategory = async (req: Request, res: Response) => {
  res.json(await store.byCategory(req.params.name));
};

export default function productsRoutes(app: Application) {
  app.post('/products', verifyToken, create);
  app.get('/products', index);
  app.get('/products/:id', show);
  app.get('/products/category/:name', byCategory);
}
