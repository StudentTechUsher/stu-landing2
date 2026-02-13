import {
  testimonials as defaultTestimonials,
  type TestimonialItem
} from '../../lib/mock/exampleData';
import { Card } from '../ui/Card';

export interface TestimonialProps {
  items?: TestimonialItem[];
  mode?: 'single' | 'carousel-mock';
}

export const Testimonial = ({ items = defaultTestimonials, mode = 'single' }: TestimonialProps) => {
  const shownItems = mode === 'single' ? items.slice(0, 1) : items;

  return (
    <section aria-labelledby="testimonial-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <h2 id="testimonial-title" className="text-3xl font-semibold tracking-tight text-slate-900">
        Employer outcomes
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {shownItems.map((item) => (
          <Card
            key={item.id}
            header={
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.avatarSrc}
                  alt={`${item.name} avatar`}
                  loading="lazy"
                  className="h-12 w-12 rounded-full border border-slate-200"
                />
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">
                    {item.title}, {item.company}
                  </p>
                </div>
              </div>
            }
          >
            <blockquote className="text-sm italic leading-6 text-slate-700">{item.quote}</blockquote>
          </Card>
        ))}
      </div>
      {mode === 'carousel-mock' ? (
        <p className="mt-3 text-sm text-slate-500">Carousel mock: swap cards by drag or navigation controls.</p>
      ) : null}
    </section>
  );
};
