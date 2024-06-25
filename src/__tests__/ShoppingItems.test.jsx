import { createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import routes from '../routes';
import { RouterProvider } from 'react-router';
import { render, screen } from '@testing-library/react';

vi.mock('../components/ShoppingItem.jsx', () => {
  return {
    default: () => <div data-testid="shopping-item"></div>,
  };
});

vi.mock('../hooks/use-items.jsx', () => {
  return {
    default: vi
      .fn()
      .mockReturnValueOnce({ loading: true })
      .mockReturnValueOnce({ error: 'Error' })
      .mockReturnValueOnce({
        items: Array.from({ length: 15 }, () => ({ id: crypto.randomUUID() })),
      }),
  };
});

const entry = {
  initialEntries: ['/shopping-items'],
};

it("Renders 'Loading...' when the API request is in progress", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it("Renders 'Error' when there is an error", () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getByText('Error')).toBeInTheDocument();
});

it('Renders 15 shopping items', () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getAllByTestId('shopping-item').length).toEqual(15);
});
