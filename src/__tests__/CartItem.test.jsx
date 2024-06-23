import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import routes from '../routes';
import { render, screen } from '@testing-library/react';

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

const entry = { initialEntries: ['/shopping-items'] };

it("Renders item's image", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(screen.getByAltText('mock title')).toBeInTheDocument();
});

it("Renders item's title", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(
    screen.getByRole('heading', { name: 'mock title' }),
  ).toBeInTheDocument();
});

it("Renders item's unit price", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(screen.getByTestId('unit-price')).toBeInTheDocument();
});

it("Renders item's quantity", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(screen.getByTestId('quantity')).toBeInTheDocument();
});

it("Renders item's end price", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(screen.getByTestId('end-price')).toBeInTheDocument();
});

it('Renders a remove button', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));

  expect(
    screen.getByRole('button', { name: 'Remove from cart' }),
  ).toBeInTheDocument();
});

it('Remove button removes item from cart when clicked', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
  await user.type(screen.getByLabelText('Choose the quantity:'), '1');
  await user.click(screen.getByRole('button', { name: 'Add to cart' }));
  await user.click(screen.getByRole('link', { name: 'Cart' }));
  await user.click(screen.getByRole('button', { name: 'Remove from cart' }));

  expect(screen.queryByAltText('mock title')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'mock title' }),
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId('unit-price')).not.toBeInTheDocument();
  expect(screen.queryByTestId('quantity')).not.toBeInTheDocument();
  expect(screen.queryByTestId('end-price')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Remove from cart' }),
  ).not.toBeInTheDocument();
});
