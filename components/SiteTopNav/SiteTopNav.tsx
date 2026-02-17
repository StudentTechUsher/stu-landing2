import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackValidationEvent } from '../../lib/telemetry/validationEvents';
import { Button } from '../ui/Button';

export interface SiteTopNavProps {
  context?: 'landing' | 'walkthrough';
}

export const SiteTopNav = ({ context = 'landing' }: SiteTopNavProps) => {
  const router = useRouter();

  const handleSeeHowItWorks = () => {
    if (context === 'landing') {
      trackValidationEvent('landing_cta_clicked', {
        ctaId: 'see_how_it_works',
        location: 'sticky_nav',
        destination: '/walkthrough'
      });
      trackValidationEvent('walkthrough_entry_clicked', {
        source: 'sticky_nav'
      });
    }

    void router.push(context === 'landing' ? { pathname: '/walkthrough', query: { source: 'sticky_nav' } } : '/walkthrough');
  };

  const handleRequestDemo = () => {
    if (context === 'landing') {
      trackValidationEvent('landing_cta_clicked', {
        ctaId: 'request_demo',
        location: 'sticky_nav',
        destination: '#pilot'
      });
    }

    void router.push('/#pilot');
  };

  return (
    <div className="sticky top-0 z-40 border-b border-[#cfdad5] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 py-3">
        <Link
          href="/"
          className="text-3xl font-bold leading-none tracking-tight text-[#0a1f1a] transition-opacity hover:opacity-80 dark:text-slate-100"
          aria-label="Stu home"
        >
          stu.
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleSeeHowItWorks} aria-label="See how it works">
            See how it works
          </Button>
          <Button size="sm" onClick={handleRequestDemo} aria-label="Request Demo">
            Request Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
