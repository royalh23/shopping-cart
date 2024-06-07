import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

vi.mock('../components/NavBar.jsx', () => {
  return {
    default: () => <p>NavBar</p>,
  };
});

it('Renders the navigation bar', () => {
  render(<App />);

  expect(screen.getByText('NavBar')).toBeInTheDocument();
});
