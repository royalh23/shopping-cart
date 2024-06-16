import styles from '../styles/ItemInput.module.css';
import Button from './Button';
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

export default function ItemInput({
  title,
  price,
  imageURL,
  id,
  inputValue,
  setInputValue,
  handleCancel,
}) {
  const [cartItems, setCartItems] = useOutletContext();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { title, price, imageURL, id, amount: +inputValue };
    if (cartItems.some((item) => item.id === newItem.id)) {
      setCartItems(
        cartItems.map((item) => (item.id === newItem.id ? newItem : item)),
      );
    } else {
      setCartItems([...cartItems, newItem]);
    }
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
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
