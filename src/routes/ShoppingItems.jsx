import ShoppingItem from '../components/ShoppingItem';
import useItems from '../hooks/use-items';
import styles from '../styles/ShoppingItems.module.css';

export default function ShoppingItems() {
  const { items, loading, error } = useItems();

  return (
    <main className={styles.main}>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
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
                id={item.id}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
