import { render, screen } from '@testing-library/react';
import Button from '../components/Button';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

it('Renders a button with its children text', () => {
  render(<Button>Button</Button>);

  expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument();
});

it('Calls the onClick handler if there is one', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();

  render(<Button onClick={onClick}>Button</Button>);

  await user.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalled();
});
