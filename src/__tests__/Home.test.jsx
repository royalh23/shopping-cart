import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from '../routes';

vi.mock('../routes/ShoppingItems.jsx', () => {
  return {
    default: () => <div data-testid="shopping-items">Shopping items page</div>,
  };
});

it("Renders 'A store where you can find everything!' as a heading", () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  expect(
    screen.getByRole('heading', {
      name: 'A store where you can find everything!',
    }),
  ).toBeInTheDocument();
});

it("Renders 'Anything you need, at your fingertips. Take a look!' as a paragraph", () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  expect(
    screen.getByText('Anything you need, at your fingertips. Take a look!'),
  ).toBeInTheDocument();
});

it("Renders a 'Start shopping' link", () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  expect(
    screen.getByRole('link', { name: 'Start shopping' }),
  ).toBeInTheDocument();
});

it('Renders the shopping items page when the link is clicked', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const shoppingItemsLink = screen.getByRole('link', {
    name: 'Start shopping',
  });

  await user.click(shoppingItemsLink);

  expect(screen.getByTestId('shopping-items')).toBeInTheDocument();
});

it('Renders an image', () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  expect(screen.getByAltText('Male shopper')).toBeInTheDocument();
});
