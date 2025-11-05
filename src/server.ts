import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'Storefront API' });
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

const PORT = process.env.PORT || 3000;
if (process.env.ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on :${PORT}`));
}

export default app;
