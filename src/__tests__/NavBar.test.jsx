import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import routes from '../routes';

vi.mock('../routes/Home.jsx', () => {
  return {
    default: () => <div data-testid="home">Home page</div>,
  };
});

vi.mock('../routes/ShoppingItems.jsx', () => {
  return {
    default: () => <div data-testid="shopping-items">Shopping items page</div>,
  };
});

vi.mock('../routes/Cart.jsx', () => {
  return {
    default: () => <div data-testid="cart">Cart page</div>,
  };
});

it("Renders 'Shopping App' as a heading", () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  expect(
    screen.getByRole('heading', { name: 'Shopping App' }),
  ).toBeInTheDocument();
});

it('Renders 3 links', () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const links = screen.getAllByRole('link');

  expect(links.length).toEqual(3);
});

it("Renders 'Home', 'Shopping Items', and 'Cart' links", () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const links = screen.getAllByRole('link');

  expect(links[0].textContent).toMatch('Home');
  expect(links[1].textContent).toMatch('Shopping items');
  expect(links[2].textContent).toMatch('Cart');
});

it("Renders the homepage when the 'Home' link is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const homeLink = screen.getByRole('link', { name: 'Home' });

  await user.click(homeLink);

  expect(screen.getByTestId('home')).toBeInTheDocument();
});

it("Renders the shopping items page when the 'Shopping items' link is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const shoppingItemsLink = screen.getByRole('link', {
    name: 'Shopping items',
  });

  await user.click(shoppingItemsLink);

  expect(screen.getByTestId('shopping-items')).toBeInTheDocument();
});

it("Renders the cart page when the 'Cart' link is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const cartLink = screen.getByRole('link', {
    name: 'Cart',
  });

  await user.click(cartLink);

  expect(screen.getByTestId('cart')).toBeInTheDocument();
});
