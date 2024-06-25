import { useOutletContext } from 'react-router-dom';
import styles from '../styles/Checkout.module.css';
import Button from './Button';

export default function Checkout() {
  const [cartItems] = useOutletContext();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Total</h2>
        <div className={styles.total} data-testid="total-price">
          ${cartItems.reduce((prev, cur) => prev + cur.price * cur.amount, 0)}
        </div>
      </div>
      <p className={styles.para}>
        Shipping taxes and discounts calculated at checkout
      </p>
      <Button>Checkout</Button>
    </div>
  );
}
