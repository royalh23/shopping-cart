import styles from '../styles/ItemInput.module.css';
import Button from './Button';
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

export default function ItemInput({
  title,
  price,
  imageURL,
  id,
  handleCancel,
}) {
  const [cartItems, setCartItems] = useOutletContext();
  const [inputValue, setInputValue] = useState(
    cartItems.length === 0 || !cartItems.some((item) => item.title === title)
      ? ''
      : cartItems.find((item) => item.title === title).amount,
  );

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { title, price, imageURL, id, amount: +inputValue };
    if (cartItems.some((item) => item.title === newItem.title))
      setCartItems(
        cartItems.map((item) =>
          item.title === newItem.title ? newItem : item,
        ),
      );
    else setCartItems([...cartItems, newItem]);
    handleCancel();
  };

  return (
    <div className={styles.container}>
      <div className={styles.price} data-testid="price">
        ${price}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor={id}>Choose the quantity:</label>
        <input
          type="number"
          id={id}
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
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
