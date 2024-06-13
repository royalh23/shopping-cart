import { useState } from 'react';
import styles from '../styles/ItemInput.module.css';
import Button from './Button';
import PropTypes from 'prop-types';

export default function ItemInput({ price, handleCancel }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.price} data-testid="price">
        ${price}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="quantity">Choose the quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={inputValue}
          onChange={handleInputChange}
          min="1"
          max="25"
          required
          className={styles.input}
        />
        <div className={styles.buttons}>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Add to cart</Button>
        </div>
      </form>
    </div>
  );
}

ItemInput.propTypes = {
  price: PropTypes.number.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
