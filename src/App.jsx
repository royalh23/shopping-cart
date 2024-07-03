import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { useState, useMemo } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const cartItemsAmount = useMemo(() => {
    return cartItems.reduce((prev, cur) => prev + cur.amount, 0);
  }, [cartItems]);

  return (
    <>
      <NavBar cartItemsAmount={cartItemsAmount} />
      <Outlet context={[cartItems, setCartItems]} />
    </>
  );
}

export default App;
