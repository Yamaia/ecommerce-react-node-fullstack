import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'cart';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const found = items.find((i) => i.id === action.product.id);
      if (found) {
        return items.map((i) =>
          i.id === found.id ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) } : i
        );
      }
      const { id, name, price, emoji, stock } = action.product;
      return [...items, { id, name, price, emoji, stock, quantity: 1 }];
    }
    case 'setQty':
      return items.map((i) =>
        i.id === action.id ? { ...i, quantity: Math.max(1, Math.min(action.quantity, i.stock)) } : i
      );
    case 'remove':
      return items.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      total: items.reduce((s, i) => s + i.quantity * i.price, 0),
      add: (product) => dispatch({ type: 'add', product }),
      setQty: (id, quantity) => dispatch({ type: 'setQty', id, quantity }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' })
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
