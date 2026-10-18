import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import { errorHandler, notFound } from './middleware/validate.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? '*' }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
