import App from './App';
import ErrorPage from './routes/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
