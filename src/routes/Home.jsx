import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import maleShopper from '../assets/male-shopper.jpeg';

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.heading}>
          A store where you can find everything!
        </h1>
        <p className={styles.para}>
          Anything you need, at your fingertips. Take a look!
        </p>
        <Link to="shopping-items" className={styles.link}>
          Start shopping
        </Link>
      </div>
      <div className={styles.mainImg}>
        <img src={maleShopper} alt="Male shopper" />
      </div>
    </main>
  );
}
