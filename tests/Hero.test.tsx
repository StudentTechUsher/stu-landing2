import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HERO_HEADLINE, Hero } from '../components/Hero/Hero';

describe('Hero', () => {
  it('renders the one-sentence headline', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1, name: HERO_HEADLINE })).toBeInTheDocument();
  });
});
