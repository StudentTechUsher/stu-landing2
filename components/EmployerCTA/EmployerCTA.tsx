import {
  economicClaim,
  icpProfiles,
  internalVisionStatement,
  longerVisionNarrative,
  taglineOptions
} from '../../lib/mock/exampleData';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { emphasizeStu } from '../ui/emphasizeStu';

export const EmployerCTA = () => {
  return (
    <section id="pilot" aria-labelledby="employer-cta-title" className="mx-auto w-full max-w-7xl px-6 py-20">
      <Card className="overflow-hidden p-0">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f] dark:text-slate-400">Pilot pathway</p>
            <h2 id="employer-cta-title" className="text-3xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100">
              Run an employer pilot with measurable outcomes
            </h2>
            <p className="text-sm leading-7 text-[#3f5a52] dark:text-slate-300">{emphasizeStu(economicClaim)}</p>

            <div>
              <h3 className="text-base font-semibold text-[#0f2b23] dark:text-slate-100">Ideal early customers</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#436058] dark:text-slate-300">
                {icpProfiles.map((profile) => (
                  <li key={profile.id}>{profile.text}</li>
                ))}
              </ul>
            </div>

            <blockquote className="rounded-2xl border border-[#cddad5] bg-[#f7fcf9] p-4 text-sm italic leading-7 text-[#355148] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {emphasizeStu(internalVisionStatement)}
            </blockquote>

            <p className="text-sm leading-7 text-[#436058] dark:text-slate-300">{emphasizeStu(longerVisionNarrative)}</p>

            <div className="flex flex-wrap gap-2">
              {taglineOptions.map((tagline) => (
                <span
                  key={tagline}
                  className="rounded-full border border-[#c9d9d2] bg-white px-3 py-1 text-xs font-medium text-[#2d4a42] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {tagline}
                </span>
              ))}
            </div>
          </div>

          <form
            className="space-y-4 rounded-3xl border border-[#cedbd5] bg-[#f8fdf9] p-5 dark:border-slate-700 dark:bg-slate-800/80"
            aria-label="Employer contact form"
          >
            <div>
              <label htmlFor="employer-name" className="mb-1 block text-sm font-medium text-[#2b4940] dark:text-slate-200">
                Name
              </label>
              <input
                id="employer-name"
                name="name"
                type="text"
                className="h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
                placeholder="Hiring lead"
              />
            </div>
            <div>
              <label htmlFor="employer-email" className="mb-1 block text-sm font-medium text-[#2b4940] dark:text-slate-200">
                Work email
              </label>
              <input
                id="employer-email"
                name="email"
                type="email"
                className="h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label htmlFor="employer-volume" className="mb-1 block text-sm font-medium text-[#2b4940] dark:text-slate-200">
                Annual graduate hires
              </label>
              <input
                id="employer-volume"
                name="volume"
                type="text"
                className="h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
                placeholder="50+"
              />
            </div>
            <div>
              <label htmlFor="employer-goal" className="mb-1 block text-sm font-medium text-[#2b4940] dark:text-slate-200">
                Primary goal
              </label>
              <textarea
                id="employer-goal"
                name="goal"
                className="min-h-24 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 py-2 text-sm text-[#0a1f1a] placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
                placeholder="Increase interview conversion, reduce ramp time, or lower early attrition"
              />
            </div>
            <Button type="submit" className="w-full" aria-label="Request pilot conversation">
              Request Pilot Conversation
            </Button>
            <p className="text-center text-xs text-[#4d6961] dark:text-slate-400">
              Structured pilot briefs are returned within two business days.
            </p>
          </form>
        </div>
      </Card>
    </section>
  );
};
