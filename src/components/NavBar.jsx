import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/NavBar.module.css';

export default function NavBar({ cartItemsAmount }) {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.heading}>Shopping App</h1>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.link}` : styles.link
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="shopping-items"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.link}` : styles.link
            }
          >
            Shopping items
          </NavLink>
        </li>
        <li className={styles.spanContainer}>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.link}` : styles.link
            }
          >
            Cart
          </NavLink>
          {cartItemsAmount !== 0 && (
            <span data-testid="span" className={styles.span}>
              {cartItemsAmount}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

NavBar.propTypes = {
  cartItemsAmount: PropTypes.number.isRequired,
};
