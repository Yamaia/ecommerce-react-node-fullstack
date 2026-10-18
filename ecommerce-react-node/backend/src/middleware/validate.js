export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function validateProduct(req, _res, next) {
  const { name, price, stock } = req.body ?? {};
  const errors = [];
  if (typeof name !== 'string' || name.trim().length < 2) errors.push('name deve ter ao menos 2 caracteres');
  if (typeof price !== 'number' || !(price >= 0)) errors.push('price deve ser um número >= 0');
  if (!Number.isInteger(stock) || stock < 0) errors.push('stock deve ser um inteiro >= 0');
  if (errors.length) return next(new HttpError(400, 'Dados inválidos', errors));
  next();
}

export function notFound(_req, _res, next) {
  next(new HttpError(404, 'Rota não encontrada'));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: err.message || 'Erro interno', details: err.details });
}
