import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

vi.mock('../components/NavBar.jsx', () => {
  return {
    default: () => <div data-testid="navbar">NavBar</div>,
  };
});

it('Renders the navigation bar', () => {
  render(<App />);

  expect(screen.getByTestId('navbar')).toBeInTheDocument();
});
