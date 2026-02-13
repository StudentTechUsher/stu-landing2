import { howItWorksSteps as defaultSteps } from '../../lib/mock/exampleData';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export interface HowItWorksProps {
  steps?: typeof defaultSteps;
}

export const HowItWorks = ({ steps = defaultSteps }: HowItWorksProps) => {
  return (
    <section aria-labelledby="how-it-works-title" className="border-y border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 id="how-it-works-title" className="text-3xl font-semibold tracking-tight text-slate-900">
          How it works
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              header={
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-slate-900">{step.title}</span>
                  <Badge className="bg-slate-900 text-white">{index + 1}</Badge>
                </div>
              }
            >
              <p className="text-sm leading-6 text-slate-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
