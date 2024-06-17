import styles from '../styles/Cart.module.css';
import { Link, useOutletContext } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useOutletContext();

  return (
    <main className={styles.main}>
      {cartItems.length === 0 ? (
        <>
          <p className={styles.para}>Your shopping cart is empty.</p>
          <Link to="/shopping-items" className={styles.link}>
            Start shopping
          </Link>
        </>
      ) : (
        <div></div>
      )}
    </main>
  );
}
