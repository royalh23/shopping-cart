import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.heading}>Shopping App</h1>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="shopping-items"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Shopping items
          </NavLink>
        </li>
        <li>
          <NavLink
            to="cart"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
