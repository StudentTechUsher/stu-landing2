import { useEffect, useRef, useState } from 'react';
import { oneMinutePitch, oneSentenceDescription } from '../../lib/mock/exampleData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const HERO_HEADLINE =
  'Align university talent with employer hiring standards — before hiring begins.';
export const HERO_SUBHEAD =
  'Stu translates employer hiring expectations into measurable student capability pathways so companies find higher-quality candidates earlier.';
export const HERO_SMALL_PITCH =
  'Companies spend millions recruiting early-career talent but hiring remains noisy. Stu translates employer capability profiles into multi-year development pathways, normalizes student artifacts into capability vectors, and calibrates models with hiring outcomes — increasing candidate readiness before applications.';

export interface HeroProps {
  imageSrc?: string;
}

export const Hero = ({ imageSrc = '/images/hero-placeholder.svg' }: HeroProps) => {
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
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Badge className="bg-slate-900 text-white">Employer-ready talent, earlier</Badge>
          <p className="text-sm text-slate-600">{oneSentenceDescription}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{HERO_HEADLINE}</h1>
          <p className="text-lg text-slate-700">{HERO_SUBHEAD}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>{HERO_SMALL_PITCH}</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" aria-label="Request a Pilot">
              Request a Pilot
            </Button>
            <Button
              variant="secondary"
              size="lg"
              aria-label="See Employer Brief"
              onClick={() => setIsBriefOpen(true)}
            >
              See Employer Brief
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge>Trusted by pilot employers</Badge>
            <Badge>Privacy-aware candidate visibility</Badge>
            <Badge>Outcome-calibrated scoring</Badge>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt="Stu capability alignment dashboard preview"
            loading="lazy"
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </div>

      {isBriefOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4" aria-hidden={false}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="employer-brief-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 id="employer-brief-title" className="text-2xl font-semibold text-slate-900">
                Employer Brief
              </h2>
              <button
                ref={closeButtonRef}
                onClick={() => setIsBriefOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                aria-label="Close employer brief"
              >
                Close
              </button>
            </div>
            <p className="text-sm leading-7 text-slate-700">{oneMinutePitch}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
};
