import { useState } from 'react';
import styles from '../styles/ShoppingItem.module.css';
import PropTypes from 'prop-types';
import ItemInput from './ItemInput';
import Button from './Button';

export default function ShoppingItem({ title, price, imageURL }) {
  const [isBuyClicked, setIsBuyClicked] = useState(false);

  const handleClick = () => setIsBuyClicked(!isBuyClicked);

  return (
    <div className={styles.item} data-testid="item">
      <img src={imageURL} alt={title} className={styles.image} />
      <h2 className={styles.title}>{title}</h2>
      {isBuyClicked ? (
        <ItemInput price={price} handleCancel={handleClick} />
      ) : (
        <div className={styles.buy}>
          <div className={styles.price}>${price}</div>
          <Button onClick={handleClick}>Buy</Button>
        </div>
      )}
    </div>
  );
}

ShoppingItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
};
