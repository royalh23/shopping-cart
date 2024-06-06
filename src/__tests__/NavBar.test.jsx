import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import routes from '../routes';

vi.mock('../routes/Home.jsx', () => {
  return {
    default: () => <h1>Home</h1>,
  };
});

vi.mock('../routes/ShoppingItems.jsx', () => {
  return {
    default: () => <h1>Shopping items</h1>,
  };
});

vi.mock('../routes/Cart.jsx', () => {
  return {
    default: () => <h1>Cart</h1>,
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

it("Renders homepage when 'Home' link is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const homeLink = screen.getByRole('link', { name: 'Home' });

  await user.click(homeLink);

  expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
});

it("Renders shopping items when 'Shopping items' link is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const shoppingItemsLink = screen.getByRole('link', {
    name: 'Shopping items',
  });

  await user.click(shoppingItemsLink);

  expect(
    screen.getByRole('heading', { name: 'Shopping items' }),
  ).toBeInTheDocument();
});

it("Renders cart when 'Cart' link is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const cartLink = screen.getByRole('link', {
    name: 'Cart',
  });

  await user.click(cartLink);

  expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument();
});
