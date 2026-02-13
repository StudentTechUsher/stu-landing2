import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../components/ui/Button';

describe('Button', () => {
  it('renders with label and calls click handler', () => {
    const onClick = vi.fn();

    render(
      <Button aria-label="Request a Pilot" onClick={onClick}>
        Request a Pilot
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Request a Pilot' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
