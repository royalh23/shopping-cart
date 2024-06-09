import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  return (
    <>
      <NavBar />
      <Outlet context={[items, setItems]} />
    </>
  );
}

export default App;
