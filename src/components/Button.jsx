import styles from '../styles/Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ children, onClick = null, type = null }) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
