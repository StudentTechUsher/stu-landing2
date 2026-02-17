import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { trackValidationEvent } from '../../lib/telemetry/validationEvents';
import { Button } from '../ui/Button';
import type { WalkthroughBubble, WalkthroughBubblePlacement, WalkthroughStepDefinition } from './types';
import { walkthroughSteps as defaultWalkthroughSteps } from './walkthroughSteps';

const STEP_QUERY_KEY = 'step';
const SOURCE_QUERY_KEY = 'source';

const getSingleQueryValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const clampIndex = (value: number, totalSteps: number) => Math.max(0, Math.min(value, totalSteps - 1));

const shouldIgnoreArrowKeyNavigation = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const interactiveTag = target.tagName.toLowerCase();
  return interactiveTag === 'input' || interactiveTag === 'textarea' || interactiveTag === 'select';
};

const buildFallbackBubble = (step: WalkthroughStepDefinition): WalkthroughBubble => ({
  id: `${step.id}-overview`,
  title: step.title,
  text: 'This screen is part of the end-to-end walkthrough.'
});

const bubblePlacementClassMap: Record<WalkthroughBubblePlacement, string> = {
  'top-left': 'md:top-6 md:left-6 md:right-auto',
  'top-right': 'md:top-6 md:right-6 md:left-auto',
  'center-left': 'md:top-1/2 md:left-6 md:right-auto',
  'center-right': 'md:top-1/2 md:right-6 md:left-auto',
  'bottom-left': 'md:bottom-6 md:left-6 md:right-auto',
  'bottom-right': 'md:bottom-6 md:right-6 md:left-auto'
};

const bubbleTailClassMap: Record<WalkthroughBubblePlacement, string> = {
  'top-left': '-bottom-2 left-8 border-b border-r',
  'top-right': '-bottom-2 right-8 border-b border-r',
  'center-left': '-bottom-2 left-8 border-b border-r',
  'center-right': '-bottom-2 right-8 border-b border-r',
  'bottom-left': '-top-2 left-8 border-t border-l',
  'bottom-right': '-top-2 right-8 border-t border-l'
};

interface BubbleOverlayProps {
  step: WalkthroughStepDefinition;
  isLastStep: boolean;
  onAdvanceView: () => void;
  onFinishWalkthrough: () => void;
}

const BubbleOverlay = ({ step, isLastStep, onAdvanceView, onFinishWalkthrough }: BubbleOverlayProps) => {
  const bubbles = step.bubbles.length > 0 ? step.bubbles : [buildFallbackBubble(step)];
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [bubbleOffsets, setBubbleOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const dragStateRef = useRef<{
    pointerId: number;
    key: string;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

  const normalizedBubbleIndex = clampIndex(bubbleIndex, bubbles.length);
  const activeBubble = bubbles[normalizedBubbleIndex] ?? bubbles[0];
  const hasMultipleBubbles = bubbles.length > 1;
  const isLastNote = normalizedBubbleIndex === bubbles.length - 1;
  const placement = activeBubble.placement ?? 'bottom-left';
  const bubbleKey = `${step.id}:${activeBubble.id}`;
  const baseOffsetX = activeBubble.offsetX ?? 0;
  const baseOffsetY = activeBubble.offsetY ?? 0;
  const currentOffset = bubbleOffsets[bubbleKey] ?? { x: baseOffsetX, y: baseOffsetY };
  const hasMoved = currentOffset.x !== baseOffsetX || currentOffset.y !== baseOffsetY;
  const isCenterPlacement = placement === 'center-left' || placement === 'center-right';

  const offsetStyle = {
    transform: `${isCenterPlacement ? 'translateY(-50%) ' : ''}translate(${currentOffset.x}px, ${currentOffset.y}px)`
  };

  const resetPosition = () => {
    setBubbleOffsets((current) => ({
      ...current,
      [bubbleKey]: { x: baseOffsetX, y: baseOffsetY }
    }));
  };

  const handleDragStart = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      key: bubbleKey,
      startX: event.clientX,
      startY: event.clientY,
      baseX: currentOffset.x,
      baseY: currentOffset.y
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    setBubbleOffsets((current) => ({
      ...current,
      [dragState.key]: {
        x: dragState.baseX + deltaX,
        y: dragState.baseY + deltaY
      }
    }));
  };

  const handleDragEnd = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) return;
    dragStateRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 p-4 sm:p-6">
      <article
        className={`pointer-events-auto absolute bottom-4 left-4 right-4 rounded-2xl border border-[#c8d9d2] bg-white p-4 shadow-[0_18px_36px_-28px_rgba(10,31,26,0.78)] sm:bottom-6 sm:left-6 sm:right-6 md:w-[min(38rem,calc(100%-3rem))] md:bottom-auto ${bubblePlacementClassMap[placement]}`}
        style={offsetStyle}
      >
        <span className={`absolute h-4 w-4 rotate-45 border-[#c8d9d2] bg-white ${bubbleTailClassMap[placement]}`} aria-hidden />
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62]">
            Guide note {normalizedBubbleIndex + 1} of {bubbles.length}
          </p>
          <div className="flex items-center gap-2">
            {hasMoved ? (
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-[11px] font-semibold text-[#3f5b53] ring-1 ring-[#c8d9d2] transition-colors hover:bg-[#f0f5f3]"
                onClick={resetPosition}
              >
                Reset position
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Drag note"
              className="touch-none select-none rounded-lg px-2 py-1 text-[11px] font-semibold text-[#3f5b53] ring-1 ring-[#c8d9d2] transition-colors hover:bg-[#f0f5f3] active:cursor-grabbing"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              Drag
            </button>
          </div>
        </div>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#0a1f1a]">{activeBubble.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#2f4a41]">{activeBubble.text}</p>
        <div className="mt-3 flex items-center justify-end gap-2">
          {hasMultipleBubbles ? (
            <Button
              variant="secondary"
              size="sm"
              aria-label="Previous note"
              onClick={() => setBubbleIndex((current) => Math.max(0, current - 1))}
              disabled={normalizedBubbleIndex === 0}
            >
              Previous note
            </Button>
          ) : null}
          <Button
            variant={isLastNote ? 'primary' : 'secondary'}
            size="sm"
            aria-label={isLastNote ? (isLastStep ? 'Request pilot conversation' : 'Next view') : 'Next note'}
            onClick={() => {
              if (!isLastNote) {
                setBubbleIndex((current) => Math.min(bubbles.length - 1, current + 1));
                return;
              }

              if (isLastStep) {
                onFinishWalkthrough();
                return;
              }

              onAdvanceView();
            }}
          >
            {isLastNote ? (isLastStep ? 'Request pilot conversation' : 'Next view') : 'Next note'}
          </Button>
        </div>
      </article>
    </div>
  );
};

export interface WorkflowWalkthroughProps {
  steps?: WalkthroughStepDefinition[];
}

export const WorkflowWalkthrough = ({ steps = defaultWalkthroughSteps }: WorkflowWalkthroughProps) => {
  const router = useRouter();
  const totalSteps = steps.length;

  const [localStepIndex, setLocalStepIndex] = useState(0);
  const hasTrackedViewRef = useRef(false);
  const lastTrackedStepIdRef = useRef<string | null>(null);
  const completionTrackedRef = useRef(false);

  const queryStep = getSingleQueryValue(router.query[STEP_QUERY_KEY]);
  const querySource = getSingleQueryValue(router.query[SOURCE_QUERY_KEY]);

  const queryStepIndex = useMemo(() => {
    if (!queryStep) return 0;
    const indexFromQuery = steps.findIndex((step) => step.id === queryStep);
    return indexFromQuery >= 0 ? indexFromQuery : 0;
  }, [queryStep, steps]);

  const activeStepIndex = useMemo(() => {
    if (router.isReady && queryStep) {
      return clampIndex(queryStepIndex, totalSteps);
    }
    return clampIndex(localStepIndex, totalSteps);
  }, [localStepIndex, queryStep, queryStepIndex, router.isReady, totalSteps]);

  const updateStepInUrl = useCallback(
    (stepId: string) => {
      const nextQuery = {
        ...router.query,
        [STEP_QUERY_KEY]: stepId
      };

      void router.replace(
        {
          pathname: router.pathname,
          query: nextQuery
        },
        undefined,
        { shallow: true, scroll: false }
      );
    },
    [router]
  );

  useEffect(() => {
    if (!router.isReady || totalSteps === 0) return;

    const normalizedIndex = queryStep ? queryStepIndex : 0;
    const normalizedStepId = steps[normalizedIndex].id;

    if (queryStep !== normalizedStepId) {
      updateStepInUrl(normalizedStepId);
    }
  }, [queryStep, queryStepIndex, router.isReady, steps, totalSteps, updateStepInUrl]);

  useEffect(() => {
    if (!router.isReady || hasTrackedViewRef.current) return;
    hasTrackedViewRef.current = true;
    trackValidationEvent('walkthrough_viewed', {
      source: querySource ?? 'direct'
    });
  }, [querySource, router.isReady]);

  useEffect(() => {
    if (!router.isReady || totalSteps === 0) return;

    const activeStep = steps[activeStepIndex];
    if (!activeStep || lastTrackedStepIdRef.current === activeStep.id) return;

    lastTrackedStepIdRef.current = activeStep.id;
    trackValidationEvent('walkthrough_step_viewed', {
      stepId: activeStep.id,
      stepIndex: activeStepIndex + 1,
      chapter: activeStep.chapter
    });
  }, [activeStepIndex, router.isReady, steps, totalSteps]);

  useEffect(() => {
    if (!router.isReady || totalSteps === 0 || completionTrackedRef.current) return;
    if (activeStepIndex !== totalSteps - 1) return;

    completionTrackedRef.current = true;
    trackValidationEvent('walkthrough_completed', {
      stepsTotal: totalSteps
    });
  }, [activeStepIndex, router.isReady, totalSteps]);

  const goToIndex = useCallback(
    (nextIndex: number, interaction: 'next' | 'back') => {
      if (totalSteps === 0) return;

      const clampedIndex = clampIndex(nextIndex, totalSteps);
      const previousStep = steps[activeStepIndex];
      const nextStep = steps[clampedIndex];

      if (!nextStep || !previousStep) return;
      if (clampedIndex === activeStepIndex) return;

      if (interaction === 'next') {
        trackValidationEvent('walkthrough_step_next_clicked', {
          fromStepId: previousStep.id,
          toStepId: nextStep.id,
          toStepIndex: clampedIndex + 1
        });
      }

      if (interaction === 'back') {
        trackValidationEvent('walkthrough_step_back_clicked', {
          fromStepId: previousStep.id,
          toStepId: nextStep.id,
          toStepIndex: clampedIndex + 1
        });
      }

      setLocalStepIndex(clampedIndex);
      updateStepInUrl(nextStep.id);
    },
    [activeStepIndex, steps, totalSteps, updateStepInUrl]
  );

  useEffect(() => {
    if (totalSteps === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreArrowKeyNavigation(event.target)) return;

      if (event.key === 'ArrowRight' && activeStepIndex < totalSteps - 1) {
        event.preventDefault();
        goToIndex(activeStepIndex + 1, 'next');
      }

      if (event.key === 'ArrowLeft' && activeStepIndex > 0) {
        event.preventDefault();
        goToIndex(activeStepIndex - 1, 'back');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStepIndex, goToIndex, totalSteps]);

  if (totalSteps === 0) {
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <p className="text-sm text-[#3f5a52]">No walkthrough steps are available.</p>
      </section>
    );
  }

  const activeStep = steps[activeStepIndex];
  const isLastStep = activeStepIndex === totalSteps - 1;

  const handleExitCta = () => {
    trackValidationEvent('walkthrough_exit_cta_clicked', {
      stepId: activeStep.id
    });
    void router.push('/#pilot');
  };

  return (
    <section aria-label="Validation walkthrough" className="mx-auto w-full max-w-[1700px] px-4 pb-10 pt-6 sm:px-6">
      <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f]">{activeStep.chapter}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#0a1f1a] md:text-3xl">{activeStep.title}</h1>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62]">
          View {activeStepIndex + 1} of {totalSteps}
        </p>
      </header>

      <div className="relative rounded-3xl border border-[#cfdad5] bg-white/88 p-3 shadow-[0_20px_36px_-30px_rgba(10,31,26,0.62)]">
        <div className="h-[min(76vh,1040px)] min-h-[560px] overflow-auto rounded-2xl border border-[#d5e1db] bg-[#f6fbf8]">
          <div key={activeStep.id} className="min-h-full">
            {activeStep.render()}
          </div>
        </div>

        <BubbleOverlay
          key={activeStep.id}
          step={activeStep}
          isLastStep={isLastStep}
          onAdvanceView={() => goToIndex(activeStepIndex + 1, 'next')}
          onFinishWalkthrough={handleExitCta}
        />
      </div>
    </section>
  );
};
