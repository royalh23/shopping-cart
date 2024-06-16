import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const cartItemsAmount = cartItems.reduce((prev, cur) => prev + cur.amount, 0);

  return (
    <>
      <NavBar cartItemsAmount={cartItemsAmount} />
      <Outlet context={[cartItems, setCartItems]} />
    </>
  );
}

export default App;
