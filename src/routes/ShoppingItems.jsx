import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ShoppingItem from '../components/ShoppingItem';
import styles from '../styles/ShoppingItems.module.css';

export default function ShoppingItems() {
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
  }, []);

  return (
    <main className={styles.main}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1 className={styles.heading}>Items</h1>
          <div className={styles.items}>
            {items.map((item) => (
              <ShoppingItem
                key={item.id}
                title={item.title}
                price={item.price}
                imageURL={item.imageURL}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
