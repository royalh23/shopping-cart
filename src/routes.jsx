import App from './App';
import Home from './routes/Home';
import ShoppingItems from './routes/ShoppingItems';
import Cart from './routes/Cart';
import ErrorPage from './routes/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shopping-items', element: <ShoppingItems /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
];

export default routes;
