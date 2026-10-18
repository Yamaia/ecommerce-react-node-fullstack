import { Router } from 'express';
import { db } from '../data/db.js';
import { HttpError, validateProduct } from '../middleware/validate.js';

const router = Router();

// GET /products?search=&page=1&limit=12&sort=price_asc|price_desc|name
router.get('/', (req, res) => {
  const { products } = db.load();
  const search = String(req.query.search ?? '').toLowerCase().trim();
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
  const sort = req.query.sort;

  let list = products.filter((p) => p.name.toLowerCase().includes(search));
  if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

  const total = list.length;
  list = list.slice((page - 1) * limit, page * limit);
  res.json({ data: list, page, limit, total, pages: Math.ceil(total / limit) || 1 });
});

router.get('/:id', (req, res, next) => {
  const product = db.load().products.find((p) => p.id === Number(req.params.id));
  if (!product) return next(new HttpError(404, 'Produto não encontrado'));
  res.json(product);
});

router.post('/', validateProduct, (req, res) => {
  const state = db.load();
  const { name, price, stock, description = '', emoji = '📦' } = req.body;
  const product = { id: state.nextProductId++, name: name.trim(), price, stock, description, emoji };
  state.products.push(product);
  db.save();
  res.status(201).json(product);
});

router.put('/:id', validateProduct, (req, res, next) => {
  const state = db.load();
  const idx = state.products.findIndex((p) => p.id === Number(req.params.id));
  if (idx === -1) return next(new HttpError(404, 'Produto não encontrado'));
  const { name, price, stock, description = '', emoji = '📦' } = req.body;
  state.products[idx] = { ...state.products[idx], name: name.trim(), price, stock, description, emoji };
  db.save();
  res.json(state.products[idx]);
});

router.delete('/:id', (req, res, next) => {
  const state = db.load();
  const idx = state.products.findIndex((p) => p.id === Number(req.params.id));
  if (idx === -1) return next(new HttpError(404, 'Produto não encontrado'));
  state.products.splice(idx, 1);
  db.save();
  res.status(204).end();
});

export default router;
