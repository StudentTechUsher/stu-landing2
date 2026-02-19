import { Fragment } from 'react';

type SharedWorkflowStep = {
  id: string;
  title: string;
  description: string;
};

type WorkflowOutputLane = {
  id: 'recruiter' | 'student';
  label: string;
  title: string;
  description: string;
  highlights: string[];
};

const sharedSteps: SharedWorkflowStep[] = [
  {
    id: 'shared-1',
    title: 'Employers define role scorecards',
    description: 'Capability models and hiring standards are set before the recruiting cycle starts.'
  },
  {
    id: 'shared-2',
    title: 'Students pick target roles and companies',
    description: 'Each student aligns to the opportunities they want and the standards those teams care about.'
  },
  {
    id: 'shared-3',
    title: 'Students upload artifacts',
    description: 'Projects, coursework, internships, and leadership evidence are submitted as structured signals.'
  },
  {
    id: 'shared-4',
    title: 'stu. normalizes and scores evidence',
    description: 'Artifacts are translated into indexed capability signals tied to each recruiter-defined scorecard.'
  }
];

const outputLanes: WorkflowOutputLane[] = [
  {
    id: 'recruiter',
    label: 'Recruiter output (primary)',
    title: 'Pipeline recommendations with clear decision context',
    description:
      'Recruiters see who to prioritize, who to hold, and why based on role-specific readiness and evidence quality.',
    highlights: ['Interview conversion likelihood', 'Onboarding friction risk', 'Early-career performance confidence']
  },
  {
    id: 'student',
    label: 'Student output (secondary)',
    title: 'Targeted career prep before apply',
    description:
      'Students get specially curated next steps so they can close priority gaps before entering your funnel.',
    highlights: ['Highest-impact capability gaps', 'Recommended next artifacts', 'Timing for re-scoring']
  }
];

const SharedStepCard = ({ step, index }: { step: SharedWorkflowStep; index: number }) => (
  <article className="min-w-0 flex-1 rounded-2xl border border-[#d2ddd8] bg-white p-4 shadow-[0_14px_32px_-30px_rgba(10,31,26,0.55)] dark:border-slate-700 dark:bg-slate-900">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4d6a61] dark:text-slate-400">Shared step</span>
      <span className="text-xs font-semibold text-[#2b4c42] dark:text-slate-300">{index + 1}</span>
    </div>
    <h3 className="text-sm font-semibold text-[#0d261f] dark:text-slate-100">{step.title}</h3>
    <p className="mt-2 text-xs leading-5 text-[#4b665d] dark:text-slate-300">{step.description}</p>
  </article>
);

const HorizontalFlowConnector = () => (
  <div className="flex shrink-0 items-center px-1 text-[#95a9a0] dark:text-slate-500" aria-hidden>
    <svg viewBox="0 0 52 24" className="h-6 w-12 overflow-visible">
      <path d="M3 12H42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M37 7L42 12L37 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="flow-dot" cx="7" cy="12" r="2">
        <animate attributeName="cx" from="7" to="38" dur="1.1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.1s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

const VerticalFlowConnector = () => (
  <div className="flex justify-center py-1 text-[#95a9a0] dark:text-slate-500" aria-hidden>
    <svg viewBox="0 0 24 56" className="h-14 w-6 overflow-visible">
      <path d="M12 4V45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 40L12 45L17 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="flow-dot" cx="12" cy="8" r="2">
        <animate attributeName="cy" from="8" to="40" dur="1.1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.1s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

const SplitFlowConnector = () => (
  <div className="text-[#95a9a0] dark:text-slate-500" aria-hidden>
    <svg viewBox="0 0 100 42" className="h-24 w-full overflow-visible">
      <path d="M50 2V13" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M50 13C50 23 43 23 36 23H20V34" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 13C50 23 57 23 64 23H80V34" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 31L20 34L23 31" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M77 31L80 34L83 31" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />

      <circle className="flow-dot" r="1.6">
        <animateMotion path="M50 2V13" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle className="flow-dot" r="1.6">
        <animateMotion path="M50 13C50 23 43 23 36 23H20V34" dur="1.4s" begin="0.15s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.4s" begin="0.15s" repeatCount="indefinite" />
      </circle>
      <circle className="flow-dot" r="1.6">
        <animateMotion path="M50 13C50 23 57 23 64 23H80V34" dur="1.4s" begin="0.35s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.4s" begin="0.35s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

const OutputLaneCard = ({ lane, isPrimary }: { lane: WorkflowOutputLane; isPrimary: boolean }) => (
  <article
    className={`rounded-2xl border p-4 ${
      isPrimary
        ? 'border-[#bdd5c8] bg-[#f1faf5] shadow-[0_18px_38px_-28px_rgba(10,31,26,0.45)] dark:border-emerald-500/35 dark:bg-emerald-500/8'
        : 'border-[#d2ddd8] bg-white shadow-[0_14px_32px_-30px_rgba(10,31,26,0.45)] dark:border-slate-700 dark:bg-slate-900'
    }`}
  >
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4d6a61] dark:text-slate-400">{lane.label}</p>
    <h3 className="text-sm font-semibold text-[#0d261f] dark:text-slate-100">{lane.title}</h3>
    <p className="mt-2 text-xs leading-5 text-[#4b665d] dark:text-slate-300">{lane.description}</p>
    <ul className="mt-3 space-y-1">
      {lane.highlights.map((highlight) => (
        <li key={`${lane.id}-${highlight}`} className="text-xs font-medium text-[#35584c] dark:text-slate-200">
          {highlight}
        </li>
      ))}
    </ul>
  </article>
);

export const WorkflowSplitView = () => {
  return (
    <div className="mt-10 rounded-3xl border border-[#cfdcd6] bg-[#f7fcfa] p-5 shadow-[0_24px_45px_-36px_rgba(10,31,26,0.45)] dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f] dark:text-slate-400">Workflow preview</p>
        <p className="text-xs font-medium text-[#486259] dark:text-slate-300">Animated dataflow between steps</p>
      </div>
      <p className="mt-2 text-lg font-semibold text-[#0a1f1a] dark:text-slate-100">One evidence layer, two decision outputs.</p>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#456057] dark:text-slate-300">
        After artifacts are scored, the same capability engine powers recruiter pipeline recommendations and student prep guidance.
      </p>

      <div className="mt-6 hidden xl:flex xl:items-stretch xl:gap-2">
        {sharedSteps.map((step, index) => (
          <Fragment key={step.id}>
            <SharedStepCard step={step} index={index} />
            {index < sharedSteps.length - 1 ? <HorizontalFlowConnector /> : null}
          </Fragment>
        ))}
      </div>

      <div className="mt-6 space-y-2 xl:hidden">
        {sharedSteps.map((step, index) => (
          <div key={step.id}>
            <SharedStepCard step={step} index={index} />
            {index < sharedSteps.length - 1 ? <VerticalFlowConnector /> : null}
          </div>
        ))}
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#9ecbb6] dark:bg-emerald-500/40" />
        <span className="rounded-full bg-[#e3f7ee] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1f4b3b] ring-1 ring-[#b4dfca] dark:bg-emerald-500/15 dark:text-emerald-100 dark:ring-emerald-500/40">
          Split outputs after artifact scoring
        </span>
        <span className="h-px flex-1 bg-[#9ecbb6] dark:bg-emerald-500/40" />
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <SplitFlowConnector />

        <div className="grid grid-cols-2 gap-4">
          <OutputLaneCard lane={outputLanes[0]} isPrimary />
          <OutputLaneCard lane={outputLanes[1]} isPrimary={false} />
        </div>
      </div>

      <style jsx>{`
        .flow-dot {
          fill: #12c979;
          opacity: 0;
          filter: drop-shadow(0 0 3px rgba(18, 201, 121, 0.7));
        }

        @media (prefers-reduced-motion: reduce) {
          .flow-dot {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
