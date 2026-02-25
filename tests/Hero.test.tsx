import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HERO_HEADLINE, Hero } from '../components/Hero/Hero';

describe('Hero', () => {
  it('renders the one-sentence headline', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1, name: HERO_HEADLINE })).toBeInTheDocument();
  });

  it('renders See how it works CTA linked to walkthrough', () => {
    render(<Hero />);

    const walkthroughLink = screen.getByRole('link', { name: 'See how it works' });
    expect(walkthroughLink).toBeInTheDocument();
    expect(walkthroughLink).toHaveAttribute('href', '/walkthrough?source=hero');
  });

  it('scrolls to the pilot section when Request Demo is clicked', () => {
    render(<Hero />);
    const pilotSection = document.createElement('section');
    pilotSection.id = 'pilot';
    const scrollSpy = vi.fn();
    pilotSection.scrollIntoView = scrollSpy;
    document.body.appendChild(pilotSection);

    fireEvent.click(screen.getByRole('button', { name: 'Request Demo' }));
    expect(scrollSpy).toHaveBeenCalledOnce();
  });

  it('prefills the pilot message when Request Employer Pilot is clicked', () => {
    render(<Hero />);
    const pilotSection = document.createElement('section');
    pilotSection.id = 'pilot';
    pilotSection.scrollIntoView = vi.fn();
    document.body.appendChild(pilotSection);

    const goalInput = document.createElement('textarea');
    goalInput.id = 'employer-goal';
    document.body.appendChild(goalInput);

    fireEvent.click(screen.getByRole('button', { name: 'Request Employer Pilot' }));
    expect(goalInput.value).toBe("Hi stu. Team, let's discuss a pilot program at my organization.");
  });

  it('shows compact capability snapshot in the hero candidate card', () => {
    render(<Hero />);

    expect(screen.getByText('Capability snapshot')).toBeInTheDocument();
    expect(screen.getByText('Problem solving')).toBeInTheDocument();
    expect(screen.getByText('Business judgment')).toBeInTheDocument();
  });

  it('shows top qualifying reason action for the featured candidate', () => {
    render(<Hero />);

    expect(screen.getByRole('button', { name: 'See more about Avery' })).toBeInTheDocument();
  });

  it('does not navigate when top qualifying reason action is clicked on landing hero', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<Hero />);

    fireEvent.click(screen.getByRole('button', { name: 'See more about Avery' }));
    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
