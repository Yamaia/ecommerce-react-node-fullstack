import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { orderService, errorMessage } from '../services/api.js';
import { brl } from '../components/ProductCard.jsx';

export default function Cart() {
  const { items, total, setQty, remove, clear } = useCart();
  const [customer, setCustomer] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [sending, setSending] = useState(false);

  async function checkout(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', msg: '' });
    try {
      const order = await orderService.create({
        customer,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity }))
      });
      clear();
      setStatus({ type: 'ok', msg: `Pedido #${order.id} realizado! Total: ${brl(order.total)}` });
    } catch (err) {
      setStatus({ type: 'error', msg: errorMessage(err) });
    } finally {
      setSending(false);
    }
  }

  return (
    <section>
      <h2>Carrinho</h2>
      {status.msg && <p className={status.type === 'ok' ? 'success' : 'error'}>{status.msg}</p>}
      {!items.length ? <p>Seu carrinho está vazio.</p> : (
        <>
          <table>
            <thead><tr><th>Produto</th><th>Preço</th><th>Qtd</th><th>Subtotal</th><th /></tr></thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.emoji} {i.name}</td>
                  <td>{brl(i.price)}</td>
                  <td>
                    <input type="number" min="1" max={i.stock} value={i.quantity}
                      onChange={(e) => setQty(i.id, Number(e.target.value))} />
                  </td>
                  <td>{brl(i.price * i.quantity)}</td>
                  <td><button className="danger" onClick={() => remove(i.id)}>Remover</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: {brl(total)}</h3>
          <form className="form" onSubmit={checkout}>
            <input required placeholder="Seu nome" value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
            <input required type="email" placeholder="Seu e-mail" value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
            <button disabled={sending}>{sending ? 'Enviando...' : 'Finalizar compra'}</button>
          </form>
        </>
      )}
    </section>
  );
}
