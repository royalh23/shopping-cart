import { createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import routes from '../routes';
import { RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

vi.mock('../routes/ShoppingItems.jsx', () => {
  return {
    default: () => <div data-testid="shopping-items">Shopping items page</div>,
  };
});

const entry = { initialEntries: ['/cart'] };

it("Renders 'Your shopping cart is empty.' as a paragraph when there are no items in the cart", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getByText('Your shopping cart is empty.')).toBeInTheDocument();
});

it("Renders a 'Start shopping' link", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(
    screen.getByRole('link', { name: 'Start shopping' }),
  ).toBeInTheDocument();
});

it('Renders the shopping items page when the link is clicked', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const shoppingItemsLink = screen.getByRole('link', {
    name: 'Start shopping',
  });

  await user.click(shoppingItemsLink);

  expect(screen.getByTestId('shopping-items')).toBeInTheDocument();
});
