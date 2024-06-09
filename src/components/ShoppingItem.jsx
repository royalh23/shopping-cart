import styles from '../styles/ShoppingItem.module.css';
import PropTypes from 'prop-types';

export default function ShoppingItem({ title, price, imageURL }) {
  return (
    <div className={styles.item}>
      <img src={imageURL} alt={title} className={styles.image} />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.buy}>
        <div className={styles.price}>${price}</div>
        <button className={styles.button}>Buy</button>
      </div>
    </div>
  );
}

ShoppingItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  imageURL: PropTypes.string,
};
