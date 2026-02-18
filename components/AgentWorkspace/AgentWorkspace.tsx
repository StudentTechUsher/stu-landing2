import { differentiationSummary, whatStuIsNot } from '../../lib/mock/exampleData';
import { Card } from '../ui/Card';
import { emphasizeStu } from '../ui/emphasizeStu';

export const AgentWorkspace = () => {
  return (
    <section id="difference" aria-labelledby="difference-title" className="mx-auto w-full max-w-7xl px-6 py-20">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4a675f] dark:text-slate-400">Differentiation</p>
          <h2
            id="difference-title"
            className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-4xl"
          >
            <b>stu.</b> changes what recruiters can see before application season
          </h2>

          <div className="mt-6 space-y-3">
            {differentiationSummary.map((comparison) => (
              <article
                key={comparison.id}
                className="grid gap-4 rounded-3xl border border-[#cfddd6] bg-white p-5 dark:border-slate-700 dark:bg-slate-900/80 md:grid-cols-2"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#627b73] dark:text-slate-400">Status quo</p>
                  <p className="mt-2 text-sm leading-6 text-[#4f6961] dark:text-slate-300">{comparison.traditional}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b3a2a] dark:text-emerald-300">With <b>stu.</b></p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#11352b] dark:text-slate-100">{comparison.stu}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Card
          header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">{emphasizeStu('What stu. is not')}</h3>}
          className="bg-[#f8fcfa] dark:bg-slate-900/70"
        >
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#3f5a52] dark:text-slate-300">
            {whatStuIsNot.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-[#0f3027] dark:text-slate-100">
            <b>stu.</b> gives teams clearer evidence before interviews, so early-career hiring decisions are less guesswork.
          </p>
        </Card>
      </div>
    </section>
  );
};
