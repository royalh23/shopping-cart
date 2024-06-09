import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function useItems() {
  const [items, setItems] = useOutletContext();
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
            id: item.id,
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
  }, [setItems]);

  return { items, loading, error };
}
