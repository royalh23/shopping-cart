import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import routes from '../routes';

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

it('Renders item correctly', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/shopping-items'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getAllByTestId('item')[0]).toMatchSnapshot();
});
