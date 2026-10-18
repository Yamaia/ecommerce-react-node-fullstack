import { Router } from 'express';
import { db } from '../data/db.js';
import { HttpError } from '../middleware/validate.js';

const router = Router();

router.get('/', (_req, res) => res.json(db.load().orders));

// body: { customer: { name, email }, items: [{ productId, quantity }] }
router.post('/', (req, res, next) => {
  const state = db.load();
  const { customer, items } = req.body ?? {};
  if (!customer?.name || !customer?.email) return next(new HttpError(400, 'Informe nome e e-mail do cliente'));
  if (!Array.isArray(items) || items.length === 0) return next(new HttpError(400, 'Carrinho vazio'));

  const lines = [];
  for (const item of items) {
    const product = state.products.find((p) => p.id === Number(item.productId));
    const qty = Number(item.quantity);
    if (!product) return next(new HttpError(404, `Produto ${item.productId} não encontrado`));
    if (!Number.isInteger(qty) || qty < 1) return next(new HttpError(400, `Quantidade inválida para ${product.name}`));
    if (product.stock < qty) return next(new HttpError(409, `Estoque insuficiente para ${product.name}`));
    lines.push({ product, qty });
  }

  lines.forEach(({ product, qty }) => (product.stock -= qty));
  const order = {
    id: state.nextOrderId++,
    customer,
    items: lines.map(({ product, qty }) => ({ productId: product.id, name: product.name, price: product.price, quantity: qty })),
    total: Number(lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0).toFixed(2)),
    createdAt: new Date().toISOString()
  };
  state.orders.push(order);
  db.save();
  res.status(201).json(order);
});

export default router;
