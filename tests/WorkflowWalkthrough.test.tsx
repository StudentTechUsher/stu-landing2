import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WorkflowWalkthrough } from '../components/Walkthrough/WorkflowWalkthrough';
import type { WalkthroughStepDefinition } from '../components/Walkthrough/types';

type MockRouter = {
  isReady: boolean;
  pathname: string;
  query: Record<string, string | string[] | undefined>;
  replace: ReturnType<typeof vi.fn>;
  push: ReturnType<typeof vi.fn>;
};

let mockRouter: MockRouter;

vi.mock('next/router', () => ({
  useRouter: () => mockRouter
}));

const testSteps: WalkthroughStepDefinition[] = [
  {
    id: 'step-one',
    chapter: 'Recruiter setup',
    title: 'Step One',
    bubbles: [
      { id: 'step-one-note-1', title: 'Note One', text: 'First note one', placement: 'top-right' },
      { id: 'step-one-note-2', title: 'Note Two', text: 'Second note one', placement: 'bottom-left' }
    ],
    render: () => <div>Rendered Step One</div>
  },
  {
    id: 'step-two',
    chapter: 'Student foundation',
    title: 'Step Two',
    bubbles: [{ id: 'step-two-note-1', title: 'Note One', text: 'First note two' }],
    render: () => <div>Rendered Step Two</div>
  },
  {
    id: 'step-three',
    chapter: 'Calibration',
    title: 'Step Three',
    bubbles: [{ id: 'step-three-note-1', title: 'Note One', text: 'First note three' }],
    render: () => <div>Rendered Step Three</div>
  }
];

describe('WorkflowWalkthrough', () => {
  beforeEach(() => {
    mockRouter = {
      isReady: true,
      pathname: '/walkthrough',
      query: {},
      replace: vi.fn().mockResolvedValue(true),
      push: vi.fn().mockResolvedValue(true)
    };

    mockRouter.replace.mockImplementation(async (nextRoute: { query?: Record<string, string | string[] | undefined> }) => {
      mockRouter.query = nextRoute.query ?? {};
      return true;
    });
  });

  it('renders first step by default', () => {
    render(<WorkflowWalkthrough steps={testSteps} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Step One' })).toBeInTheDocument();
    expect(screen.getByText('Rendered Step One')).toBeInTheDocument();
    expect(screen.getByText('View 1 of 3')).toBeInTheDocument();
  });

  it('moves forward with button and backward with keyboard', () => {
    render(<WorkflowWalkthrough steps={testSteps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next note' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next view' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Step Two' })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByRole('heading', { level: 1, name: 'Step One' })).toBeInTheDocument();
  });

  it('supports note-by-note bubble navigation per view', () => {
    render(<WorkflowWalkthrough steps={testSteps} />);

    expect(screen.getByText('First note one')).toBeInTheDocument();
    expect(screen.getByText('First note one').closest('article')).toHaveClass('md:top-6', 'md:right-6');
    fireEvent.click(screen.getByRole('button', { name: 'Next note' }));
    expect(screen.getByText('Second note one')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next view' })).toBeInTheDocument();
    expect(screen.getByText('Second note one').closest('article')).toHaveClass('md:bottom-6', 'md:left-6');

    fireEvent.click(screen.getByRole('button', { name: 'Previous note' }));
    expect(screen.getByText('First note one')).toBeInTheDocument();
  });

  it('falls back to the first step when query step is invalid', async () => {
    mockRouter.query = { step: 'does-not-exist' };
    render(<WorkflowWalkthrough steps={testSteps} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Step One' })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalled();
    });

    const lastReplaceCall = mockRouter.replace.mock.calls[mockRouter.replace.mock.calls.length - 1]?.[0] as {
      query?: Record<string, string | string[] | undefined>;
    };
    expect(lastReplaceCall.query?.step).toBe('step-one');
  });

  it('shows final CTA on the last step', () => {
    render(<WorkflowWalkthrough steps={testSteps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next note' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next view' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next view' }));

    expect(screen.getByRole('button', { name: 'Request pilot conversation' })).toBeInTheDocument();
  });
});
