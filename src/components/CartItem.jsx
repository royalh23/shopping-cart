import styles from '../styles/CartItem.module.css';
import PropTypes from 'prop-types';
import Button from './Button';
import { useOutletContext } from 'react-router-dom';

export default function CartItem({ title, imageURL, price, amount }) {
  const [cartItems, setCartItems] = useOutletContext();

  const handleRemove = () => {
    setCartItems(cartItems.filter((item) => item.title !== title));
  };

  return (
    <div className={styles.container}>
      <img src={imageURL} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.infoContent}>
          Unit price: <span className={styles.span}>${price}</span>
        </div>
        <div className={styles.infoContent}>
          Quantity: <span className={styles.span}>{amount}</span>
        </div>
        <div className={styles.infoContent}>
          End price: <span className={styles.span}>${price * amount}</span>
        </div>
        <Button onClick={handleRemove}>Remove from cart</Button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};
