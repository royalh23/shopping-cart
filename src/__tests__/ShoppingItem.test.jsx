import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import routes from '../routes';
import userEvent from '@testing-library/user-event';

vi.mock('../components/ItemInput.jsx', () => {
  return {
    default: () => <p>item input</p>,
  };
});

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

const entry = {
  initialEntries: ['/shopping-items'],
};

it("Renders item's title", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(
    screen.getAllByRole('heading', { name: 'mock title' })[0],
  ).toBeInTheDocument();
});

it("Renders item's image", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getAllByAltText('mock title')[0]).toBeInTheDocument();
});

it("Renders item's price", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getAllByText('$1')[0]).toBeInTheDocument();
});

it("Renders a 'Buy' button", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getAllByRole('button', { name: 'Buy' })[0]).toBeInTheDocument();
});

it("Renders an input field when 'Buy' button is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const button = screen.getAllByRole('button', { name: 'Buy' })[0];

  await user.click(button);

  expect(screen.getByText('item input')).toBeInTheDocument();
});
