import { features as defaultFeatures, type FeatureItem } from '../../lib/mock/exampleData';
import { Card } from '../ui/Card';
import { ChartIcon, LayersIcon, LoopIcon, ModelIcon } from '../ui/Icons';

export interface FeaturesProps {
  items?: FeatureItem[];
}

const iconMap = {
  modeling: ModelIcon,
  normalization: LayersIcon,
  scoring: ChartIcon,
  feedback: LoopIcon
};

export const Features = ({ items = defaultFeatures }: FeaturesProps) => {
  return (
    <section aria-labelledby="features-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 id="features-title" className="text-3xl font-semibold tracking-tight text-slate-900">
          Built for measurable employer-student alignment
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((feature) => {
          const Icon = iconMap[feature.icon];

          return (
            <Card
              key={feature.id}
              header={
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <span className="rounded-lg bg-slate-100 p-2 text-slate-700">
                    <Icon aria-hidden="true" />
                  </span>
                  {feature.title}
                </div>
              }
            >
              <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
