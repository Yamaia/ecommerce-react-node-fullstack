import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { count } = useCart();
  return (
    <header className="header">
      <NavLink to="/" className="logo">🛒 Loja Dev</NavLink>
      <nav>
        <NavLink to="/">Produtos</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/cart">Carrinho ({count})</NavLink>
      </nav>
    </header>
  );
}
