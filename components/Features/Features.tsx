import {
  icpProfiles,
  problemSignals,
  problemSectionSummary,
  solutionPillars,
  type ProblemSignal,
  type SolutionPillar
} from '../../lib/mock/exampleData';
import { Card } from '../ui/Card';

export interface FeaturesProps {
  problems?: ProblemSignal[];
  solutions?: SolutionPillar[];
}

export const Features = ({ problems = problemSignals, solutions = solutionPillars }: FeaturesProps) => {
  return (
    <section id="problem" aria-labelledby="problem-title" className="mx-auto w-full max-w-7xl px-6 py-20">
      <div className="rounded-3xl border border-[#cfddd6] bg-white/70 p-6 shadow-[0_18px_44px_-34px_rgba(10,31,26,0.45)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f] dark:text-slate-400">Who this is for first</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-3xl">
          Teams hiring 50+ new grads a year who are tired of resume guesswork
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {icpProfiles.map((profile) => (
            <span
              key={profile.id}
              className="rounded-full border border-[#cad9d2] bg-[#f3f8f5] px-3 py-1 text-xs font-medium text-[#29473f] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {profile.text}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card
          header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Why early-career hiring breaks today</h3>}
          className="bg-white/90 dark:bg-slate-900/75"
        >
          <p className="text-sm leading-6 text-[#3f5b53] dark:text-slate-300">
            {problemSectionSummary}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[#3d5951] dark:text-slate-300">
            {problems.map((signal) => (
              <li key={signal.id}>{signal.text}</li>
            ))}
          </ul>
        </Card>

        <Card
          header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">How <b>stu.</b> makes screening more reliable</h3>}
          className="bg-[#f8fdf9] dark:bg-slate-900/75"
        >
          <p className="text-sm leading-6 text-[#3f5b53] dark:text-slate-300">
            <b>stu.</b> is not a job board. It is a scoring layer that turns student work into comparable hiring evidence.
          </p>
          <div className="mt-4 space-y-3">
            {solutions.map((pillar) => (
              <article key={pillar.id} className="rounded-2xl border border-[#d0ddd7] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-sm font-semibold text-[#0f2b23] dark:text-slate-100">{pillar.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#48635b] dark:text-slate-300">{pillar.description}</p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
