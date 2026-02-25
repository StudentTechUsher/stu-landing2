import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CandidateDetail } from '../CandidateDetail/CandidateDetail';
import {
  oneMinutePitch
} from '../../lib/mock/exampleData';
import {
  getPosthogFeatureFlag,
  subscribeToPosthogFeatureFlags
} from '../../lib/telemetry/posthog';
import {
  HERO_COPY_FLAG_KEY,
  persistHeroCopyVariant,
  resolveHeroCopyVariant,
  type HeroCopyVariant
} from '../../lib/telemetry/experiments';
import { trackValidationEvent } from '../../lib/telemetry/validationEvents';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { emphasizeStu } from '../ui/emphasizeStu';

export const HERO_HEADLINE = 'Build a Stronger early-career Pipeline';
export const HERO_SUBHEAD = 'Improve applicant quality, interview conversion, and time-to-productivity';
const HERO_HEADLINE_CONCRETE = HERO_HEADLINE;
const HERO_SUBHEAD_CONCRETE = HERO_SUBHEAD;
const PILOT_PREFILL_MESSAGE = "Hi stu. Team, let's discuss a pilot program at my organization.";

const secondaryCtaLinkClassName =
  'inline-flex h-9 items-center justify-center rounded-xl bg-white px-3 text-sm font-semibold text-[#18372e] ring-1 ring-[#bdd0c8] shadow-[0_10px_25px_-22px_rgba(10,31,26,0.7)] transition-all hover:bg-[#eef5f2] hover:ring-[#9ab9ad] dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-300 dark:hover:bg-slate-200 dark:hover:ring-slate-200';

export const Hero = () => {
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [heroCopyVariant, setHeroCopyVariant] = useState<HeroCopyVariant>('control');
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const heroHeadline = heroCopyVariant === 'concrete' ? HERO_HEADLINE_CONCRETE : HERO_HEADLINE;
  const heroSubhead = heroCopyVariant === 'concrete' ? HERO_SUBHEAD_CONCRETE : HERO_SUBHEAD;

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
      destination: '#pilot',
      heroCopyVariant
    });
    scrollToPilotForm();
  };

  const handleRequestEmployerPilotClick = () => {
    trackValidationEvent('landing_cta_clicked', {
      ctaId: 'request_employer_pilot',
      location: 'hero_primary',
      destination: '#pilot',
      heroCopyVariant
    });
    scrollToPilotForm(PILOT_PREFILL_MESSAGE);
  };

  const handleReadBriefClick = () => {
    trackValidationEvent('landing_cta_clicked', {
      ctaId: 'read_one_minute_brief',
      location: 'hero_secondary',
      heroCopyVariant
    });
    setIsBriefOpen(true);
  };

  useEffect(() => {
    const syncVariant = () => {
      const flagValue = getPosthogFeatureFlag(HERO_COPY_FLAG_KEY);
      const nextVariant = resolveHeroCopyVariant(flagValue);
      setHeroCopyVariant(nextVariant);
      persistHeroCopyVariant(nextVariant);
    };

    syncVariant();
    const detach = subscribeToPosthogFeatureFlags(syncVariant);

    return () => {
      detach();
    };
  }, []);

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
            aria-label="stu. home"
          >
            stu.
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#36524a] dark:text-slate-300 md:flex">
            <a href="#problem" className="transition-colors hover:text-[#0a1f1a] dark:hover:text-slate-100">
              Why hiring misses
            </a>
            <a href="#model" className="transition-colors hover:text-[#0a1f1a] dark:hover:text-slate-100">
              How <b>stu.</b> works
            </a>
            <a href="#difference" className="transition-colors hover:text-[#0a1f1a] dark:hover:text-slate-100">
              What changes
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

        <div className="grid gap-8 lg:grid-cols-[1.28fr_0.72fr] lg:items-stretch lg:gap-10">
          <div className="space-y-6 lg:flex lg:h-full lg:flex-col lg:justify-center lg:pr-8">
            <Badge className="self-start bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/30">
              For teams hiring interns and new grads
            </Badge>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-6xl">
              {heroHeadline}
            </h1>
            <p className="max-w-3xl text-xl leading-9 text-[#203c34] dark:text-slate-300">{emphasizeStu(heroSubhead)}</p>
            <ol className="max-w-3xl list-decimal space-y-1.5 pl-6 text-lg leading-8 text-[#203c34] dark:text-slate-300">
              <li>Develop a clear capability model for new hires</li>
              <li>Better assess student readiness</li>
              <li>Identify and inspire growth opportunities</li>
            </ol>
            <div className="pt-2">
              <div className="flex justify-center">
                <Button
                  size="lg"
                  aria-label="Request Employer Pilot"
                  onClick={handleRequestEmployerPilotClick}
                >
                  Request Employer Pilot
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  aria-label="Read one-minute brief"
                  onClick={handleReadBriefClick}
                >
                  Read one-minute brief
                </Button>
                <Link
                  href={{ pathname: '/walkthrough', query: { source: 'hero' } }}
                  aria-label="See how it works"
                  className={secondaryCtaLinkClassName}
                  onClick={() => {
                    trackValidationEvent('landing_cta_clicked', {
                      ctaId: 'see_how_it_works',
                      location: 'hero_secondary',
                      destination: '/walkthrough',
                      heroCopyVariant
                    });
                    trackValidationEvent('walkthrough_entry_clicked', {
                      source: 'hero',
                      heroCopyVariant
                    });
                  }}
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:flex lg:justify-end">
            <CandidateDetail
              showInviteButton={true}
              inviteButtonLabel="Fast-track to Interview"
              inviteButtonClassName="pointer-events-none cursor-default"
              showQualitativeSignals={false}
              showAlignmentLegend={false}
              alignmentProfileMode="capability"
              showTopQualifyingReasonAction={true}
              className="mx-auto w-full max-w-[480px] rounded-[26px] border-[#cfdad5] bg-white/95 p-4 shadow-[0_24px_52px_-34px_rgba(10,31,26,0.45)] lg:mx-0 lg:max-w-[440px] dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-[0_26px_56px_-34px_rgba(2,6,23,0.9)]"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#problem"
            className="group inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#42645a] transition-colors hover:text-[#0a1f1a] dark:text-slate-400 dark:hover:text-slate-100"
            aria-label="Scroll to explore more details below"
          >
            <span>Scroll for details</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#bfd2ca] bg-white/75 transition-colors group-hover:border-[#95b2a7] group-hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:group-hover:border-slate-500">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                <path d="M5.5 8.5L10 13l4.5-4.5" />
              </svg>
            </span>
          </a>
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
                  {emphasizeStu('stu. in one minute')}
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
