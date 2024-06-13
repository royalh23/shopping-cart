import { Link } from 'react-router-dom';
import styles from '../styles/ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.errorPage} data-testid="error-page">
      <h1>Oops, page not found</h1>
      <p>
        Click <Link to="/">here</Link> to get back to homepage.
      </p>
    </div>
  );
}
