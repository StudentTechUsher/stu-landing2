import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  capabilityPreviewDescription,
  heroHighlights,
  oneMinutePitch,
  oneSentenceDescription
} from '../../lib/mock/exampleData';
import { trackValidationEvent } from '../../lib/telemetry/validationEvents';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { emphasizeStu } from '../ui/emphasizeStu';

export const HERO_HEADLINE = 'The intelligence layer between universities and employers.';
export const HERO_SUBHEAD = oneSentenceDescription;
const PILOT_PREFILL_MESSAGE = "Hi stu. Team, let's discuss a pilot program at my organization.";

const walkthroughCtaClassName =
  'inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-base font-semibold text-[#18372e] ring-1 ring-[#bdd0c8] shadow-[0_10px_25px_-22px_rgba(10,31,26,0.7)] transition-all hover:bg-[#eef5f2] hover:ring-[#9ab9ad] dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-300 dark:hover:bg-slate-200 dark:hover:ring-slate-200';

const workflowPreview = [
  { id: 'w-1', label: 'Employer profiles codified', value: '12 dimensions', width: 'w-[86%]' },
  { id: 'w-2', label: 'Artifacts normalized', value: '4.7M data points', width: 'w-[72%]' },
  { id: 'w-3', label: 'Readiness scored', value: 'Probabilistic fit', width: 'w-[64%]' },
  { id: 'w-4', label: 'Outcomes recalibrated', value: 'Weekly model tuning', width: 'w-[58%]' }
];

const heroStats = [
  { id: 's-1', label: 'Signal lens', value: 'Longitudinal' },
  { id: 's-2', label: 'Scoring mode', value: 'Outcome-calibrated' },
  { id: 's-3', label: 'Hiring stage', value: 'Pre-application' }
];

export const Hero = () => {
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const scrollToPilotForm = (prefillGoal?: string) => {
    const pilotSection = document.getElementById('pilot');
    const goalInput = document.getElementById('employer-goal') as HTMLTextAreaElement | null;

    if (goalInput && prefillGoal && !goalInput.value.trim()) {
      goalInput.value = prefillGoal;
      goalInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    if (pilotSection) {
      pilotSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (goalInput && prefillGoal) {
      window.setTimeout(() => goalInput.focus(), 300);
    }
  };

  const handleRequestDemoClick = () => {
    trackValidationEvent('landing_cta_clicked', {
      ctaId: 'request_demo',
      location: 'hero_nav',
      destination: '#pilot'
    });
    scrollToPilotForm();
  };

  const handleRequestEmployerPilotClick = () => {
    trackValidationEvent('landing_cta_clicked', {
      ctaId: 'request_employer_pilot',
      location: 'hero_primary',
      destination: '#pilot'
    });
    scrollToPilotForm(PILOT_PREFILL_MESSAGE);
  };

  const handleReadBriefClick = () => {
    trackValidationEvent('landing_cta_clicked', {
      ctaId: 'read_one_minute_brief',
      location: 'hero_secondary'
    });
    setIsBriefOpen(true);
  };

  useEffect(() => {
    if (!isBriefOpen) return;

    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsBriefOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isBriefOpen]);

  return (
    <header className="relative overflow-hidden border-b border-[#cdd9d4] dark:border-slate-800">
      <div className="pointer-events-none absolute -top-20 left-0 z-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(18,249,135,0.38),rgba(18,249,135,0))]" />
      <div className="pointer-events-none absolute -right-24 top-14 z-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(18,249,135,0.22),rgba(18,249,135,0))]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-6 lg:pb-16">
        <nav className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold leading-none tracking-tight text-[#0a1f1a] transition-opacity hover:opacity-80 dark:text-slate-100"
            aria-label="Stu home"
          >
            stu.
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#36524a] dark:text-slate-300 md:flex">
            <a href="#problem" className="transition-colors hover:text-[#0a1f1a] dark:hover:text-slate-100">
              Problem
            </a>
            <a href="#model" className="transition-colors hover:text-[#0a1f1a] dark:hover:text-slate-100">
              Model
            </a>
            <a href="#difference" className="transition-colors hover:text-[#0a1f1a] dark:hover:text-slate-100">
              Differentiation
            </a>
          </div>
          <Button
            variant="secondary"
            size="sm"
            aria-label="Request Demo"
            onClick={handleRequestDemoClick}
          >
            Request Demo
          </Button>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-5">
            <Badge className="bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/30">
              Early-talent intelligence layer
            </Badge>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-5xl">
              {HERO_HEADLINE}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#203c34] dark:text-slate-300">{emphasizeStu(HERO_SUBHEAD)}</p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                aria-label="Request Employer Pilot"
                onClick={handleRequestEmployerPilotClick}
              >
                Request Employer Pilot
              </Button>
              <Button
                variant="secondary"
                size="lg"
                aria-label="Read one-minute brief"
                onClick={handleReadBriefClick}
              >
                Read one-minute brief
              </Button>
              <Link
                href={{ pathname: '/walkthrough', query: { source: 'hero' } }}
                aria-label="See how it works"
                className={walkthroughCtaClassName}
                onClick={() => {
                  trackValidationEvent('landing_cta_clicked', {
                    ctaId: 'see_how_it_works',
                    location: 'hero_primary',
                    destination: '/walkthrough'
                  });
                  trackValidationEvent('walkthrough_entry_clicked', {
                    source: 'hero'
                  });
                }}
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#cfdad5] bg-white/95 p-5 shadow-[0_24px_52px_-34px_rgba(10,31,26,0.45)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-[0_26px_56px_-34px_rgba(2,6,23,0.9)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4d6b62] dark:text-slate-400">
              Capability Alignment Preview
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#0a1f1a] dark:text-slate-100">From coursework to calibrated capability</h2>
            <p className="mt-3 text-sm leading-6 text-[#4a655d] dark:text-slate-300">{emphasizeStu(capabilityPreviewDescription)}</p>

            <div className="mt-5 space-y-3">
              {workflowPreview.map((item) => (
                <article key={item.id} className="rounded-2xl border border-[#d6e0db] bg-[#f9fcfb] p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.08em] text-[#446258] dark:text-slate-400">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#dbe7e1] dark:bg-slate-700">
                    <div className={`h-full rounded-full bg-[#12f987] ${item.width}`} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <article key={stat.id} className="rounded-2xl border border-[#d5e0da] bg-[#f5faf7] p-3 dark:border-slate-700 dark:bg-slate-800/70">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#537168] dark:text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-sm font-semibold text-[#0f2b23] dark:text-slate-100">{stat.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {heroHighlights.map((highlight) => (
            <article
              key={highlight}
              className="rounded-2xl border border-[#cfe0d8] bg-white/70 px-4 py-2.5 text-sm font-medium text-[#26443b] dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-200"
            >
              {highlight}
            </article>
          ))}
        </div>
      </div>

      {isBriefOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1f1a]/70 p-4" aria-hidden={false}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="one-minute-brief-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#cfd9d5] bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#4e6d64]">One-minute pitch</p>
                <h2 id="one-minute-brief-title" className="mt-1 text-2xl font-semibold text-[#0a1f1a]">
                  Stu in one minute
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setIsBriefOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-[#314d45] transition-colors hover:bg-[#eef4f1]"
                aria-label="Close one-minute brief"
              >
                Close
              </button>
            </div>
            <p className="text-sm leading-7 text-[#345149]">{emphasizeStu(oneMinutePitch)}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
};
