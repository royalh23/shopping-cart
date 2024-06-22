import CartItem from '../components/CartItem';
import Checkout from '../components/Checkout';
import styles from '../styles/Cart.module.css';
import { Link, useOutletContext } from 'react-router-dom';

export default function Cart() {
  const [cartItems] = useOutletContext();

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
        <>
          <h1 className={styles.heading}>Your cart</h1>
          <div className={styles.container}>
            <div className={styles.subContainer}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  title={item.title}
                  imageURL={item.imageURL}
                  price={item.price}
                  amount={item.amount}
                />
              ))}
            </div>
            <Checkout />
          </div>
        </>
      )}
    </main>
  );
}
