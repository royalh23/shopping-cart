import { createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import routes from '../routes';
import { RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

vi.mock('../components/CartItem.jsx', () => {
  return {
    default: () => <div data-testid="cart-item"></div>,
  };
});

vi.mock('../components/Checkout.jsx', () => {
  return {
    default: () => <div data-testid="checkout"></div>,
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

const entries = { initialEntries: ['/shopping-items', '/cart'] };

describe('When there are items in the cart', () => {
  it("Renders 'Your cart' as a heading", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

    render(<RouterProvider router={router} />);

    await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
    await user.type(screen.getByLabelText('Choose the quantity:'), '1');
    await user.click(screen.getByRole('button', { name: 'Add to cart' }));
    await user.click(screen.getByRole('link', { name: 'Cart' }));

    expect(
      screen.getByRole('heading', { name: 'Your cart' }),
    ).toBeInTheDocument();
  });

  it('Renders all items in the cart (one item)', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

    render(<RouterProvider router={router} />);

    await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
    await user.type(screen.getByLabelText('Choose the quantity:'), '1');
    await user.click(screen.getByRole('button', { name: 'Add to cart' }));
    await user.click(screen.getByRole('link', { name: 'Cart' }));

    expect(screen.getAllByTestId('cart-item').length).toBe(1);
  });

  it.skip('Renders all items in the cart (two items)', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

    render(<RouterProvider router={router} />);

    const cartLink = screen.getByRole('link', { name: 'Cart' });

    console.log(screen.getAllByRole('button'));

    await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
    await user.type(screen.getByLabelText('Choose the quantity:'), '1');
    await user.click(screen.getByRole('button', { name: 'Add to cart' }));
    await user.click(screen.getAllByRole('button', { name: 'Buy' })[1]);
    await user.type(screen.getByLabelText('Choose the quantity:'), '1');
    await user.click(screen.getByRole('button', { name: 'Add to cart' }));
    await user.click(cartLink);

    expect(screen.getAllByTestId('cart-ite').length).toBe(2);
  });

  it('Renders the checkout section', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { ...entries, initialIndex: 0 });

    render(<RouterProvider router={router} />);

    await user.click(screen.getAllByRole('button', { name: 'Buy' })[0]);
    await user.type(screen.getByLabelText('Choose the quantity:'), '1');
    await user.click(screen.getByRole('button', { name: 'Add to cart' }));
    await user.click(screen.getByRole('link', { name: 'Cart' }));

    expect(screen.getByTestId('checkout')).toBeInTheDocument();
  });
});

describe('When there are no items in the cart', async () => {
  it("Renders 'Your shopping cart is empty.' as a paragraph", () => {
    const router = createMemoryRouter(routes, entries);

    render(<RouterProvider router={router} />);

    expect(
      screen.getByText('Your shopping cart is empty.'),
    ).toBeInTheDocument();
  });

  it("Renders a 'Start shopping' link", () => {
    const router = createMemoryRouter(routes, entries);

    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole('link', { name: 'Start shopping' }),
    ).toBeInTheDocument();
  });

  it.skip('The link renders the shopping items page when clicked');
});
