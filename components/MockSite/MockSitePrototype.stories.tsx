import { linkTo } from '@storybook/addon-links';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { CandidateExplorer } from '../CandidateExplorer/CandidateExplorer';
import { EmployerDashboardPipelineOverview } from '../EmployerDashboardPipelineOverview/EmployerDashboardPipelineOverview';
import { OutcomeFeedbackLoop } from '../OutcomeFeedbackLoop/OutcomeFeedbackLoop';
import { ProfileBuilder } from '../ProfileBuilder/ProfileBuilder';
import { RecruiterImportScoringWorkbench } from '../RecruiterImportScoringWorkbench/RecruiterImportScoringWorkbench';
import { StudentAIAgentGuidancePanel } from '../StudentAIAgentGuidancePanel/StudentAIAgentGuidancePanel';
import { StudentArtifactRepository } from '../StudentArtifactRepository/StudentArtifactRepository';
import { StudentDashboardCapabilityOverview } from '../StudentDashboardCapabilityOverview/StudentDashboardCapabilityOverview';
import { StudentOnboardingSignup } from '../StudentOnboardingSignup/StudentOnboardingSignup';
import { StudentPathwayPlanner } from '../StudentPathwayPlanner/StudentPathwayPlanner';
import { ChartIcon, LayersIcon, LoopIcon, ModelIcon } from '../ui/Icons';

type Audience = 'recruiter' | 'student';

type NavItem = {
  key: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: ({ className }: { className?: string }) => JSX.Element;
  storyId: string;
};

const CandidateIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    <path d="M5 20a7 7 0 0114 0" />
  </svg>
);

const GuidanceIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M12 3l1.8 3.8L18 8.2l-3 2.8.7 4-3.7-2-3.7 2 .7-4-3-2.8 4.2-1.4L12 3z" />
    <path d="M12 16.5V21" />
  </svg>
);

const recruiterNavItems: NavItem[] = [
  {
    key: 'recruiter-model',
    label: 'Capability Model',
    shortLabel: 'Model',
    description: 'Define role-aligned scoring standards',
    icon: ModelIcon,
    storyId: 'mock-site-app-navigation--recruiter-model-view'
  },
  {
    key: 'recruiter-pipeline',
    label: 'Pipeline Overview',
    shortLabel: 'Pipeline',
    description: 'Inspect readiness and signal density',
    icon: ChartIcon,
    storyId: 'mock-site-app-navigation--recruiter-pipeline-view'
  },
  {
    key: 'recruiter-import',
    label: 'Off-Platform Scoring',
    shortLabel: 'Import',
    description: 'Import and score external candidates',
    icon: LayersIcon,
    storyId: 'mock-site-app-navigation--recruiter-import-scoring-view'
  },
  {
    key: 'recruiter-candidates',
    label: 'Candidate Explorer',
    shortLabel: 'Candidates',
    description: 'Review evidence, videos, and references',
    icon: CandidateIcon,
    storyId: 'mock-site-app-navigation--recruiter-candidate-explorer-view'
  },
  {
    key: 'recruiter-calibration',
    label: 'Outcome Calibration',
    shortLabel: 'Calibration',
    description: 'Apply outcome feedback to scoring',
    icon: LoopIcon,
    storyId: 'mock-site-app-navigation--recruiter-calibration-view'
  }
];

const studentNavItems: NavItem[] = [
  {
    key: 'student-onboarding',
    label: 'Onboarding',
    shortLabel: 'Onboard',
    description: 'Capture baseline profile and intent',
    icon: ModelIcon,
    storyId: 'mock-site-app-navigation--student-onboarding-view'
  },
  {
    key: 'student-dashboard',
    label: 'Capability Dashboard',
    shortLabel: 'Dashboard',
    description: 'Track readiness and priority actions',
    icon: ChartIcon,
    storyId: 'mock-site-app-navigation--student-dashboard-view'
  },
  {
    key: 'student-artifacts',
    label: 'Artifact Repository',
    shortLabel: 'Artifacts',
    description: 'Manage projects, work samples, and evidence',
    icon: LayersIcon,
    storyId: 'mock-site-app-navigation--student-artifacts-view'
  },
  {
    key: 'student-pathway',
    label: 'Pathway Planner',
    shortLabel: 'Pathway',
    description: 'Plan milestones by impact and timeline',
    icon: LoopIcon,
    storyId: 'mock-site-app-navigation--student-pathway-view'
  },
  {
    key: 'student-guidance',
    label: 'AI Guidance',
    shortLabel: 'Guidance',
    description: 'Get coaching with rationale and next steps',
    icon: GuidanceIcon,
    storyId: 'mock-site-app-navigation--student-guidance-view'
  }
];

const AppShell = ({
  audience,
  activeKey,
  navItems,
  children
}: {
  audience: Audience;
  activeKey: string;
  navItems: NavItem[];
  children: ReactNode;
}) => {
  const audienceLabel = audience === 'recruiter' ? 'Recruiter' : 'Student';

  return (
    <div className="-m-4 min-h-screen bg-[#f1f7f4] text-[#0a1f1a] dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1800px]">
        <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 border-r border-[#cad9d2] bg-white/90 p-4 backdrop-blur lg:block dark:border-slate-700 dark:bg-slate-900/90">
          <div className="flex h-full flex-col">
            <button
              type="button"
              onClick={linkTo(navItems[0].storyId)}
              className="self-start text-3xl font-bold leading-none tracking-tight text-[#0a1f1a] transition-opacity hover:opacity-80 dark:text-slate-100"
              aria-label={`Go to ${audienceLabel} home view`}
            >
              stu.
            </button>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#446258] dark:text-slate-400">
              {audienceLabel} Navigation
            </p>

            <nav className="mt-2 space-y-2">
              {navItems.map((item) => {
                const isActive = item.key === activeKey;
                const Icon = item.icon;

                return (
                  <button
                    key={`sidebar-${audience}-${item.key}`}
                    type="button"
                    onClick={linkTo(item.storyId)}
                    className={`w-full rounded-2xl border px-3 py-3 text-left transition-colors ${
                      isActive
                        ? 'border-[#0fd978] bg-[#ecfff5] dark:border-emerald-500 dark:bg-emerald-500/10'
                        : 'border-[#d4e1db] bg-white hover:bg-[#f2f8f5] dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                          isActive
                            ? 'bg-[#12f987] text-[#0a1f1a]'
                            : 'bg-[#e9f2ee] text-[#2b4b41] dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-[#143a2f] dark:text-slate-100">{item.label}</span>
                        <span className="mt-0.5 block text-xs text-[#4a665d] dark:text-slate-300">{item.description}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-50 border-b border-[#cad9d2] bg-white/90 px-4 py-3 backdrop-blur lg:hidden dark:border-slate-700 dark:bg-slate-900/90">
            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl font-bold leading-none tracking-tight text-[#0a1f1a] dark:text-slate-100">stu.</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#446258] dark:text-slate-400">
                {audienceLabel}
              </span>
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {navItems.map((item) => {
                const isActive = item.key === activeKey;
                const Icon = item.icon;

                return (
                  <button
                    key={`mobile-${audience}-${item.key}`}
                    type="button"
                    onClick={linkTo(item.storyId)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'border-[#0fd978] bg-[#ecfff5] text-[#12392f] dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-100'
                        : 'border-[#d4e1db] bg-white text-[#24443a] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

const RecruiterView = ({ activeKey, children }: { activeKey: string; children: ReactNode }) => (
  <AppShell audience="recruiter" activeKey={activeKey} navItems={recruiterNavItems}>
    <main className="min-h-screen text-[#0a1f1a] dark:text-slate-100">{children}</main>
  </AppShell>
);

const StudentView = ({ activeKey, children }: { activeKey: string; children: ReactNode }) => (
  <AppShell audience="student" activeKey={activeKey} navItems={studentNavItems}>
    <main className="min-h-screen text-[#0a1f1a] dark:text-slate-100">{children}</main>
  </AppShell>
);

const meta: Meta = {
  title: 'Mock Site/App Navigation',
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj;

export const RecruiterModelView: Story = {
  render: () => (
    <RecruiterView activeKey="recruiter-model">
      <ProfileBuilder defaultMode="guided" defaultAgentOpen />
    </RecruiterView>
  )
};

export const RecruiterPipelineView: Story = {
  render: () => (
    <RecruiterView activeKey="recruiter-pipeline">
      <EmployerDashboardPipelineOverview />
    </RecruiterView>
  )
};

export const RecruiterImportScoringView: Story = {
  render: () => (
    <RecruiterView activeKey="recruiter-import">
      <RecruiterImportScoringWorkbench />
    </RecruiterView>
  )
};

export const RecruiterCandidateExplorerView: Story = {
  render: () => (
    <RecruiterView activeKey="recruiter-candidates">
      <CandidateExplorer />
    </RecruiterView>
  )
};

export const RecruiterCalibrationView: Story = {
  render: () => (
    <RecruiterView activeKey="recruiter-calibration">
      <OutcomeFeedbackLoop />
    </RecruiterView>
  )
};

export const StudentOnboardingView: Story = {
  render: () => (
    <StudentView activeKey="student-onboarding">
      <StudentOnboardingSignup />
    </StudentView>
  )
};

export const StudentDashboardView: Story = {
  render: () => (
    <StudentView activeKey="student-dashboard">
      <StudentDashboardCapabilityOverview scenario="in-progress" />
    </StudentView>
  )
};

export const StudentArtifactsView: Story = {
  render: () => (
    <StudentView activeKey="student-artifacts">
      <StudentArtifactRepository />
    </StudentView>
  )
};

export const StudentPathwayView: Story = {
  render: () => (
    <StudentView activeKey="student-pathway">
      <StudentPathwayPlanner />
    </StudentView>
  )
};

export const StudentGuidanceView: Story = {
  render: () => (
    <StudentView activeKey="student-guidance">
      <StudentAIAgentGuidancePanel />
    </StudentView>
  )
};

export const MobileRecruiterCandidateExplorerView: Story = {
  render: () => (
    <RecruiterView activeKey="recruiter-candidates">
      <CandidateExplorer />
    </RecruiterView>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const MobileStudentDashboardView: Story = {
  render: () => (
    <StudentView activeKey="student-dashboard">
      <StudentDashboardCapabilityOverview scenario="in-progress" />
    </StudentView>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
