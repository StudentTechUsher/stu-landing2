import { operatingModelSteps as defaultSteps, type OperatingStep } from '../../lib/mock/exampleData';

export interface HowItWorksProps {
  steps?: OperatingStep[];
}

export const HowItWorks = ({ steps = defaultSteps }: HowItWorksProps) => {
  return (
    <section id="model" aria-labelledby="how-it-works-title" className="border-y border-[#cedbd6] bg-white/75">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f]">Operating model</p>
        <h2 id="how-it-works-title" className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1f1a] md:text-4xl">
          A feedback-driven early-talent intelligence layer
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#435f56]">
          Stu translates employer hiring standards into measurable pathways, then uses outcomes to continuously
          improve prediction quality.
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
      </div>
    </section>
  );
};
