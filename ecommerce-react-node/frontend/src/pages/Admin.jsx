import { useEffect, useState } from 'react';
import { productService, errorMessage } from '../services/api.js';
import { brl } from '../components/ProductCard.jsx';

const empty = { name: '', price: '', stock: '', emoji: '📦', description: '' };

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setProducts((await productService.list({ limit: 50 })).data);
    } catch (e) {
      setError(errorMessage(e));
    }
  };
  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    setError('');
    const body = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editingId) await productService.update(editingId, body);
      else await productService.create(body);
      setForm(empty);
      setEditingId(null);
      load();
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  async function remove(id) {
    if (!confirm('Remover este produto?')) return;
    try { await productService.remove(id); load(); } catch (e) { setError(errorMessage(e)); }
  }

  function edit(p) {
    setEditingId(p.id);
    setForm({ name: p.name, price: p.price, stock: p.stock, emoji: p.emoji, description: p.description });
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section>
      <h2>Administração de produtos</h2>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={submit}>
        <input required placeholder="Nome" value={form.name} onChange={set('name')} />
        <input required type="number" step="0.01" min="0" placeholder="Preço" value={form.price} onChange={set('price')} />
        <input required type="number" min="0" step="1" placeholder="Estoque" value={form.stock} onChange={set('stock')} />
        <input placeholder="Emoji" value={form.emoji} onChange={set('emoji')} />
        <input placeholder="Descrição" value={form.description} onChange={set('description')} />
        <button>{editingId ? 'Salvar alterações' : 'Criar produto'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(empty); }}>Cancelar</button>}
      </form>

      <table>
        <thead><tr><th>Produto</th><th>Preço</th><th>Estoque</th><th /></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.emoji} {p.name}</td>
              <td>{brl(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => edit(p)}>Editar</button>{' '}
                <button className="danger" onClick={() => remove(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
