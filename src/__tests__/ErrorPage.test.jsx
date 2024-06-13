import { createMemoryRouter } from 'react-router-dom';
import routes from '../routes';
import { RouterProvider } from 'react-router';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('../App.jsx', () => {
  return {
    default: () => <p>App page</p>,
  };
});

const entry = { initialEntries: ['/error'] };

it('Renders the error page', () => {
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  expect(screen.getByTestId('error-page')).toMatchSnapshot();
});

it("Renders the main page when 'here' link is clicked", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, entry);

  render(<RouterProvider router={router} />);

  const link = screen.getByRole('link', { name: 'here' });

  await user.click(link);

  expect(screen.getByText('App page')).toBeInTheDocument();
});
