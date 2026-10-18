import { useEffect, useState } from 'react';
import { productService, errorMessage } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        setResult(await productService.list({ search, sort, page, limit: 8 }));
      } catch (e) {
        setError(errorMessage(e));
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [search, sort, page]);

  return (
    <section>
      <div className="toolbar">
        <input
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          <option value="">Ordenar</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
          <option value="name">Nome</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? <p>Carregando...</p> : (
        <div className="grid">
          {result.data.map((p) => <ProductCard key={p.id} product={p} />)}
          {!result.data.length && !error && <p>Nenhum produto encontrado.</p>}
        </div>
      )}

      <div className="pager">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page} de {result.pages}</span>
        <button disabled={page >= result.pages} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>
    </section>
  );
}
