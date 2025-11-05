import { Application, Request, Response } from 'express';
import { OrderModel } from '../models/Order';
import { verifyToken } from './middleware';

const store = new OrderModel();

const create = async (req: Request, res: Response) => {
  res.json(await store.create(req.body));
};
const show = async (req: Request, res: Response) => {
  res.json(await store.show(parseInt(req.params.id)));
};
const addProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_id, quantity } = req.body;
  res.json(await store.addProduct(parseInt(id), product_id, quantity));
};

export default function ordersRoutes(app: Application) {
  app.post('/orders', verifyToken, create);
  app.get('/orders/:id', verifyToken, show);
  app.post('/orders/:id/products', verifyToken, addProduct);
}
