import { useState, type FormEvent } from 'react';
import {
  economicClaim,
  icpProfiles,
  internalVisionStatement,
  longerVisionNarrative,
  taglineOptions
} from '../../lib/mock/exampleData';
import { getPersistedHeroCopyVariant } from '../../lib/telemetry/experiments';
import { trackValidationEvent } from '../../lib/telemetry/validationEvents';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { emphasizeStu } from '../ui/emphasizeStu';

export const EmployerCTA = () => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  const handlePilotConversationRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const volume = String(formData.get('volume') ?? '').trim();
    const goal = String(formData.get('goal') ?? '').trim();
    const heroCopyVariant = getPersistedHeroCopyVariant();

    setSubmissionState('submitting');
    setSubmissionMessage(null);

    try {
      const response = await fetch('/api/pilot-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          volume,
          goal
        })
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) {
        const failureMessage = payload?.message ?? 'Unable to send pilot request email right now.';
        trackValidationEvent('pilot_request_failed', {
          source: 'employer_cta_form',
          reason: response.status >= 500 ? 'server_error' : 'request_error',
          heroCopyVariant: heroCopyVariant ?? null
        });
        setSubmissionState('error');
        setSubmissionMessage(failureMessage);
        return;
      }

      trackValidationEvent('pilot_request_submitted', {
        source: 'employer_cta_form',
        hasEmail: Boolean(email),
        hasVolume: Boolean(volume),
        hasGoal: Boolean(goal),
        heroCopyVariant: heroCopyVariant ?? null
      });
      setSubmissionState('sent');
      setSubmissionMessage(payload?.message ?? 'Pilot request sent. We will follow up shortly.');
      form.reset();
    } catch {
      trackValidationEvent('pilot_request_failed', {
        source: 'employer_cta_form',
        reason: 'network_error',
        heroCopyVariant: heroCopyVariant ?? null
      });
      setSubmissionState('error');
      setSubmissionMessage('Unable to send pilot request email right now.');
    }
  };

  return (
    <section id="pilot" aria-labelledby="employer-cta-title" className="mx-auto w-full max-w-7xl px-6 py-20">
      <Card className="overflow-hidden p-0">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f] dark:text-slate-400">Pilot program</p>
            <h2 id="employer-cta-title" className="text-3xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100">
              Run a pilot and track applicant quality, interview conversion, time-to-productivity, and early retention.
            </h2>
            <p className="text-sm leading-7 text-[#3f5a52] dark:text-slate-300">{emphasizeStu(economicClaim)}</p>

            <div>
              <h3 className="text-base font-semibold text-[#0f2b23] dark:text-slate-100">Best-fit teams right now</h3>
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
            onSubmit={handlePilotConversationRequest}
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
                placeholder="Improve applicant quality, increase interview conversion, shorten time-to-productivity, or improve early retention"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              aria-label="Request pilot conversation"
              disabled={submissionState === 'submitting'}
            >
              {submissionState === 'submitting' ? 'Sending...' : 'Request Pilot Conversation'}
            </Button>
            {submissionMessage ? (
              <p
                className={`rounded-xl px-3 py-2 text-xs font-medium ${
                  submissionState === 'sent'
                    ? 'border border-[#cfe2da] bg-[#f1fbf6] text-[#2d5b4a] dark:border-emerald-700/40 dark:bg-emerald-900/20 dark:text-emerald-200'
                    : 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-700/40 dark:bg-rose-900/20 dark:text-rose-200'
                }`}
              >
                {submissionMessage}
              </p>
            ) : null}
            <p className="text-center text-xs text-[#4d6961] dark:text-slate-400">
              We send a pilot plan within two business days.
            </p>
          </form>
        </div>
      </Card>
    </section>
  );
};
