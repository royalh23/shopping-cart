import { useEffect, useState } from 'react';

export default function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchItems = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products?limit=15', {
          signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP error: Status ${res.status}`);
        }

        const data = await res.json();

        setItems(
          data.map((item) => ({
            title: item.title,
            price: item.price,
            imageURL: item.image,
            id: crypto.randomUUID(),
          })),
        );
        setError(null);
      } catch (err) {
        setError(err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    return () => controller.abort();
  }, []);

  return { items, loading, error };
}
