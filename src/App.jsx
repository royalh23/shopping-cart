import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <NavBar />
      <Outlet context={[cartItems, setCartItems]} />
    </>
  );
}

export default App;
