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

  const button = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(button);

  expect(screen.getByTestId('price')).toBeInTheDocument();
});

it("Renders 'Choose the quantity:' as a label", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const button = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(button);

  expect(screen.getByText('Choose the quantity:')).toBeInTheDocument();
});

it('Renders an input field', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const button = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(button);

  expect(screen.getByLabelText('Choose the quantity:')).toBeInTheDocument();
});

it("Renders a 'Cancel' button", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const button = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(button);

  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
});

it("Renders an 'Add to cart' button", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const button = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(button);

  expect(
    screen.getByRole('button', { name: 'Add to cart' }),
  ).toBeInTheDocument();
});

it("Removes InputItem when 'Cancel' is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const button = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(button);

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
