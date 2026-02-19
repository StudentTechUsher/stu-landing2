import { operatingModelSteps as defaultSteps, type OperatingStep } from '../../lib/mock/exampleData';
import { WorkflowSplitView } from './WorkflowSplitView';

export interface HowItWorksProps {
  steps?: OperatingStep[];
}

export const HowItWorks = ({ steps = defaultSteps }: HowItWorksProps) => {
  return (
    <section id="model" aria-labelledby="how-it-works-title" className="border-y border-[#cedbd6] bg-white/75">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f]">How it works</p>
        <h2 id="how-it-works-title" className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1f1a] md:text-4xl">
          How <b>stu.</b> works in practice
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#435f56]">
          Employers define role scorecards, students connect proof from classes and projects, stu. recommends the highest-impact next steps before applications open, and hiring outcomes make scoring better each cycle.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className="rounded-3xl border border-[#cfdcd6] bg-white p-5 shadow-[0_16px_30px_-28px_rgba(10,31,26,0.5)]"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#12f987] text-sm font-semibold text-[#0a1f1a]">
                {index + 1}
              </div>
              <h3 className="text-base font-semibold text-[#0a1f1a]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#49645c]">{step.description}</p>
            </article>
          ))}
        </div>

        <WorkflowSplitView />
      </div>
    </section>
  );
};
