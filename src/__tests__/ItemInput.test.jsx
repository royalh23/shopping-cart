import { render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import routes from '../routes';
import { RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

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

it("Renders item's price", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  expect(screen.getByTestId('price')).toBeInTheDocument();
});

it("Renders 'Choose the quantity:' as a label", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  expect(screen.getByText('Choose the quantity:')).toBeInTheDocument();
});

it('Renders an input field', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  expect(screen.getByLabelText('Choose the quantity:')).toBeInTheDocument();
});

it("Renders a 'Cancel' button", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
});

it("Renders an 'Add to cart' button", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  expect(
    screen.getByRole('button', { name: 'Add to cart' }),
  ).toBeInTheDocument();
});

it("Renders input field's value when user types in it", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  const input = screen.getByLabelText('Choose the quantity:');

  await user.type(input, '123');

  expect(input).toHaveValue(123);
});

it("Removes InputItem when 'Cancel' is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  const cancelButton = screen.getByRole('button', { name: 'Cancel' });

  await user.click(cancelButton);

  expect(screen.queryByTestId('price')).not.toBeInTheDocument();
  expect(screen.queryByText('Choose the quantity:')).not.toBeInTheDocument();
  expect(
    screen.queryByLabelText('Choose the quantity:'),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Cancel' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Add to cart' }),
  ).not.toBeInTheDocument();
});

it("Renders cart items' amount on the Cart link when 'Add to cart' is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const buyButton = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(buyButton);

  const input = screen.getByLabelText('Choose the quantity:');
  const addButton = screen.getByRole('button', { name: 'Add to cart' });

  await user.type(input, '1');
  await user.click(addButton);

  expect(screen.getByTestId('span').textContent).toMatch(1);
});
