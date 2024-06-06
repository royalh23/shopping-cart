import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

vi.mock('../components/NavBar.jsx', () => {
  return {
    default: () => <h1>NavBar</h1>,
  };
});

it('Renders the navigation bar', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'NavBar' })).toBeInTheDocument();
});
