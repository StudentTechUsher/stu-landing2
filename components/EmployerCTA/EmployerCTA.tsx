import Link from 'next/link';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export interface EmployerCTAProps {
  includeTestimonial?: boolean;
}

export const EmployerCTA = ({ includeTestimonial = true }: EmployerCTAProps) => {
  return (
    <section aria-labelledby="employer-cta-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <Card className="overflow-hidden p-0">
        <div className="grid gap-8 p-6 md:grid-cols-[1.3fr_1fr] md:p-8">
          <div className="space-y-5">
            <h2 id="employer-cta-title" className="text-3xl font-semibold tracking-tight text-slate-900">
              Run an employer pilot with measurable outcomes
            </h2>
            <p className="text-slate-700">
              Define your hiring capability profile, evaluate anonymized student alignment, and calibrate
              readiness signals with real hiring outcomes.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              <li>Reduce time-to-productivity by filtering for verified capability evidence.</li>
              <li>Increase interview conversion with higher-signal candidate visibility.</li>
              <li>Lower early attrition through better pre-hire role alignment.</li>
            </ul>
            {includeTestimonial ? (
              <blockquote className="rounded-xl bg-slate-50 p-4 text-sm italic text-slate-700">
                &ldquo;We moved from broad early-career screening to readiness-based interviews in one
                pilot cycle.&rdquo;
              </blockquote>
            ) : null}
          </div>
          <form className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5" aria-label="Employer contact form">
            <div>
              <label htmlFor="employer-name" className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="employer-name"
                name="name"
                type="text"
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
                placeholder="Hiring lead"
              />
            </div>
            <div>
              <label htmlFor="employer-email" className="mb-1 block text-sm font-medium text-slate-700">
                Work email
              </label>
              <input
                id="employer-email"
                name="email"
                type="email"
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
                placeholder="name@company.com"
              />
            </div>
            <Button type="submit" className="w-full" aria-label="Request a Pilot">
              Request a Pilot
            </Button>
            <p className="text-center text-sm text-slate-600">
              Need details first?{' '}
              <Link href="/contact" className="font-medium text-slate-900 underline underline-offset-2">
                Visit contact page
              </Link>
              .
            </p>
          </form>
        </div>
      </Card>
    </section>
  );
};
