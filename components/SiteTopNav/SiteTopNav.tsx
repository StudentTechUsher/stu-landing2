import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackValidationEvent } from '../../lib/telemetry/validationEvents';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type SiteTopNavContext = 'landing' | 'walkthrough';
type SiteTopNavAudience = 'recruiter' | 'student';

export interface SiteTopNavProps {
  context?: SiteTopNavContext;
  audience?: SiteTopNavAudience;
  defaultMobileMenuOpen?: boolean;
}

type NavLink = {
  label: string;
  href: string | { pathname: string; query: Record<string, string> };
};

const buildLinks = (context: SiteTopNavContext, audience: SiteTopNavAudience): NavLink[] => {
  if (context === 'landing' && audience === 'recruiter') {
    return [
      { label: 'Hiring ROI', href: '#problem' },
      { label: 'How Stu works', href: '#model' },
      { label: 'What changes', href: '#difference' }
    ];
  }

  if (context === 'landing' && audience === 'student') {
    return [
      { label: 'How Stu works', href: '#model' },
      { label: 'Build evidence', href: { pathname: '/walkthrough', query: { step: 'student-artifact-repository' } } },
      { label: 'Plan pathway', href: { pathname: '/walkthrough', query: { step: 'student-pathway-planner' } } }
    ];
  }

  if (context === 'walkthrough' && audience === 'recruiter') {
    return [
      { label: 'Setup model', href: { pathname: '/walkthrough', query: { step: 'recruiter-profile-model' } } },
      { label: 'Pipeline signal', href: { pathname: '/walkthrough', query: { step: 'recruiter-pipeline-overview' } } },
      { label: 'Candidate action', href: { pathname: '/walkthrough', query: { step: 'recruiter-candidate-explorer' } } }
    ];
  }

  return [
    { label: 'Onboarding', href: { pathname: '/walkthrough', query: { step: 'student-onboarding-intent' } } },
    { label: 'Evidence', href: { pathname: '/walkthrough', query: { step: 'student-artifact-repository' } } },
    { label: 'Pathway planner', href: { pathname: '/walkthrough', query: { step: 'student-pathway-planner' } } }
  ];
};

export const SiteTopNav = ({
  context = 'landing',
  audience = 'recruiter',
  defaultMobileMenuOpen = false
}: SiteTopNavProps) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(defaultMobileMenuOpen);

  const navLinks = useMemo(() => buildLinks(context, audience), [audience, context]);
  const audienceBadgeLabel = audience === 'recruiter' ? 'Recruiter workspace' : 'Student workspace';
  const secondaryActionLabel = audience === 'recruiter' ? 'See how it works' : 'See student walkthrough';
  const primaryActionLabel = audience === 'recruiter' ? 'Request Demo' : 'Request Access';

  const handleSecondaryAction = () => {
    setMobileMenuOpen(false);

    const destinationStep = audience === 'student' ? 'student-onboarding-intent' : undefined;
    const source = audience === 'student' ? 'sticky_nav_student' : 'sticky_nav';

    if (context === 'landing') {
      trackValidationEvent('landing_cta_clicked', {
        ctaId: audience === 'student' ? 'see_student_walkthrough' : 'see_how_it_works',
        location: 'sticky_nav',
        destination: '/walkthrough'
      });
      trackValidationEvent('walkthrough_entry_clicked', {
        source
      });
    }

    void router.push(
      context === 'landing'
        ? { pathname: '/walkthrough', query: { source, ...(destinationStep ? { step: destinationStep } : {}) } }
        : { pathname: '/walkthrough', query: destinationStep ? { step: destinationStep } : {} }
    );
  };

  const handlePrimaryAction = () => {
    setMobileMenuOpen(false);

    if (context === 'landing') {
      trackValidationEvent('landing_cta_clicked', {
        ctaId: audience === 'student' ? 'request_student_access' : 'request_demo',
        location: 'sticky_nav',
        destination: '#pilot'
      });
    }

    void router.push('/#pilot');
  };

  return (
    <div className="sticky top-0 z-40 border-b border-[#cfdad5] bg-white/90 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="text-3xl font-bold leading-none tracking-tight text-[#0a1f1a] transition-opacity hover:opacity-80 dark:text-slate-100"
              aria-label="Stu home"
            >
              stu.
            </Link>
            <Badge className="hidden bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] md:inline-flex dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/35">
              {audienceBadgeLabel}
            </Badge>
          </div>

          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={`${audience}-${context}-${link.label}`}
                href={link.href}
                className="text-sm font-semibold text-[#2a4a40] transition-colors hover:text-[#0a1f1a] dark:text-slate-300 dark:hover:text-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="secondary" size="sm" onClick={handleSecondaryAction} aria-label={secondaryActionLabel}>
              {secondaryActionLabel}
            </Button>
            <Button size="sm" onClick={handlePrimaryAction} aria-label={primaryActionLabel}>
              {primaryActionLabel}
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#bfd2ca] bg-white text-[#24443a] transition-colors hover:bg-[#edf5f1] md:hidden dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="text-lg leading-none">{mobileMenuOpen ? 'X' : '≡'}</span>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="mt-3 rounded-2xl border border-[#cddad4] bg-[#f8fcfa] p-3 md:hidden dark:border-slate-700 dark:bg-slate-900/80">
            <Badge className="bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/35">
              {audienceBadgeLabel}
            </Badge>

            <nav className="mt-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-${audience}-${context}-${link.label}`}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#224238] transition-colors hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button variant="secondary" size="sm" onClick={handleSecondaryAction} aria-label={secondaryActionLabel}>
                {secondaryActionLabel}
              </Button>
              <Button size="sm" onClick={handlePrimaryAction} aria-label={primaryActionLabel}>
                {primaryActionLabel}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
