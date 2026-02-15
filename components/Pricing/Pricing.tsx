import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export type PlanKey = 'pilot' | 'standard' | 'enterprise';

export interface PricingProps {
  highlightPlan?: PlanKey;
}

const plans: Array<{
  id: PlanKey;
  title: string;
  summary: string;
  bullets: string[];
  cta: string;
}> = [
  {
    id: 'pilot',
    title: 'Pilot',
    summary: 'Validate readiness scoring with one hiring cohort.',
    bullets: ['Capability profile setup', 'Anonymized candidate pool', 'Outcome calibration review'],
    cta: 'Request Pilot Scope'
  },
  {
    id: 'standard',
    title: 'Standard',
    summary: 'Scale alignment workflows across multiple target roles.',
    bullets: ['Multi-role profile support', 'Program analytics', 'Quarterly model tuning'],
    cta: 'Talk to Sales'
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    summary: 'Cross-region integration for high-volume early-career hiring.',
    bullets: ['Custom governance controls', 'Enterprise reporting', 'Priority support'],
    cta: 'Contact us for pricing'
  }
];

export const Pricing = ({ highlightPlan = 'pilot' }: PricingProps) => {
  return (
    <section aria-labelledby="pricing-title" className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 id="pricing-title" className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Pricing paths for pilot-to-scale adoption
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => {
            const isHighlighted = plan.id === highlightPlan;

            return (
              <Card
                key={plan.id}
                className={isHighlighted ? 'ring-2 ring-slate-900 shadow-lg dark:ring-slate-300 dark:shadow-[0_24px_52px_-34px_rgba(2,6,23,0.9)]' : ''}
                header={
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{plan.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{plan.summary}</p>
                  </div>
                }
              >
                <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Button
                  variant={isHighlighted ? 'primary' : 'secondary'}
                  className="w-full"
                  aria-label={`${plan.title} pricing action`}
                >
                  {plan.cta}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
