import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <h1>Shopping App</h1>
      <ul className={styles.list}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="shopping-items">Shopping items</NavLink>
        </li>
        <li>
          <NavLink to="cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
}