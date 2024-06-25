import { createMemoryRouter } from 'react-router-dom';
import { expect, vi } from 'vitest';
import routes from '../routes';
import { RouterProvider } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../hooks/use-items.jsx', () => {
  return {
    default: () => ({
      items: Array.from({ length: 15 }, () => ({
        title: 'mock title',
        price: 1,
        imageURL: 'mock url',
        id: crypto.randomUUID(),
      })),
    }),
  };
});

const entries = { initialEntries: ['/shopping-items', '/cart'] };

it("Renders 'Total' as a heading", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(screen.getByRole('heading', { name: 'Total' })).toBeInTheDocument();
});

it('Renders the total price of all items', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(screen.getByTestId('total-price').textContent).toMatch('$1');
});

it('Renders the shipping taxes and discounts text', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(
    screen.getByText('Shipping taxes and discounts calculated at checkout'),
  ).toBeInTheDocument();
});

it('Renders the checkout button', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument();
});
