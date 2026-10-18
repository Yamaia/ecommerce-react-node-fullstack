import { useCart } from '../context/CartContext.jsx';

export const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function ProductCard({ product }) {
  const { add } = useCart();
  const out = product.stock === 0;
  return (
    <article className="card">
      <div className="emoji">{product.emoji}</div>
      <h3>{product.name}</h3>
      <p className="muted">{product.description}</p>
      <strong className="price">{brl(product.price)}</strong>
      <small className="muted">{out ? 'Esgotado' : `${product.stock} em estoque`}</small>
      <button disabled={out} onClick={() => add(product)}>Adicionar ao carrinho</button>
    </article>
  );
}
