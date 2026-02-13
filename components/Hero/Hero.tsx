import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  heroHighlights,
  oneMinutePitch,
  oneSentenceDescription,
  oneSentenceVisionary,
  taglineOptions,
  thirtySecondPitch
} from '../../lib/mock/exampleData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const HERO_HEADLINE = taglineOptions[0];
export const HERO_SUBHEAD = oneSentenceDescription;

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
    <header className="relative overflow-hidden border-b border-[#cdd9d4]">
      <div className="pointer-events-none absolute -top-20 left-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(18,249,135,0.38),rgba(18,249,135,0))]" />
      <div className="pointer-events-none absolute -right-24 top-14 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(18,249,135,0.22),rgba(18,249,135,0))]" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-8">
        <nav className="mb-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-[#0a1f1a] leading-none transition-opacity hover:opacity-80"
            aria-label="Stu home"
          >
            stu.
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#36524a] md:flex">
            <a href="#problem" className="transition-colors hover:text-[#0a1f1a]">
              Problem
            </a>
            <a href="#model" className="transition-colors hover:text-[#0a1f1a]">
              Model
            </a>
            <a href="#difference" className="transition-colors hover:text-[#0a1f1a]">
              Differentiation
            </a>
          </div>
          <Button variant="secondary" size="sm" aria-label="Request Demo">
            Request Demo
          </Button>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <Badge className="bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce]">Early-talent intelligence layer</Badge>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#0a1f1a] md:text-5xl">
              {HERO_HEADLINE}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#203c34]">{HERO_SUBHEAD}</p>
            <p className="max-w-2xl text-base leading-7 text-[#4c665f]">{oneSentenceVisionary}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" aria-label="Request Employer Pilot">
                Request Employer Pilot
              </Button>
              <Button
                variant="secondary"
                size="lg"
                aria-label="Read one-minute brief"
                onClick={() => setIsBriefOpen(true)}
              >
                Read one-minute brief
              </Button>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#cfdad5] bg-white/95 p-6 shadow-[0_24px_52px_-34px_rgba(10,31,26,0.45)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4d6b62]">Capability Alignment Preview</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#0a1f1a]">From coursework to calibrated capability</h2>
            <p className="mt-3 text-sm leading-6 text-[#4a655d]">{thirtySecondPitch.slice(0, 150)}...</p>

            <div className="mt-6 space-y-3">
              {workflowPreview.map((item) => (
                <article key={item.id} className="rounded-2xl border border-[#d6e0db] bg-[#f9fcfb] p-3">
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.08em] text-[#446258]">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#dbe7e1]">
                    <div className={`h-full rounded-full bg-[#12f987] ${item.width}`} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <article key={stat.id} className="rounded-2xl border border-[#d5e0da] bg-[#f5faf7] p-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#537168]">{stat.label}</p>
                  <p className="mt-2 text-sm font-semibold text-[#0f2b23]">{stat.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {heroHighlights.map((highlight) => (
            <article
              key={highlight}
              className="rounded-2xl border border-[#cfe0d8] bg-white/70 px-4 py-3 text-sm font-medium text-[#26443b]"
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
            <p className="text-sm leading-7 text-[#345149]">{oneMinutePitch}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
};
