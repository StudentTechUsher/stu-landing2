import { useMemo, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type CapabilityKey =
  | 'technicalDepth'
  | 'appliedSystemsThinking'
  | 'dataManagement'
  | 'collaboration'
  | 'executionReliability';

type CapabilityScores = Record<CapabilityKey, number>;

type ProgressStatus = 'priority-gap' | 'watch' | 'on-track';
type EmphasisLevel = 'above' | 'baseline' | 'below';

type ActionStep = {
  id: string;
  title: string;
  description: string;
  eta: string;
  dimensionBoost: Partial<CapabilityScores>;
};

type GenericCapabilityProfile = {
  id: string;
  label: string;
  detail: string;
  frameworkLabel: string;
  baseTargetScores: CapabilityScores;
  nextSteps: ActionStep[];
};

type CompanySignalProfile = {
  id: string;
  name: string;
  studentVisibleSignals: string[];
  emphasis: Partial<Record<CapabilityKey, EmphasisLevel>>;
  hiddenAdjustments: Partial<CapabilityScores>;
};

const capabilityDimensions: Array<{
  key: CapabilityKey;
  label: string;
  weight: number;
  publicDefinition: string;
}> = [
  {
    key: 'technicalDepth',
    label: 'Technical depth',
    weight: 0.23,
    publicDefinition: 'Ability to apply core tools and methods with quality under real constraints.'
  },
  {
    key: 'appliedSystemsThinking',
    label: 'Applied systems thinking',
    weight: 0.2,
    publicDefinition: 'Ability to reason across components, dependencies, and downstream impact.'
  },
  {
    key: 'dataManagement',
    label: 'Data management',
    weight: 0.2,
    publicDefinition: 'Ability to structure, validate, and maintain data quality in practical workflows.'
  },
  {
    key: 'collaboration',
    label: 'Collaboration',
    weight: 0.17,
    publicDefinition: 'Ability to align with peers, communicate context, and deliver in shared environments.'
  },
  {
    key: 'executionReliability',
    label: 'Execution reliability',
    weight: 0.2,
    publicDefinition: 'Ability to deliver scoped outcomes consistently and predictably over time.'
  }
];

const initialCurrentScores: CapabilityScores = {
  technicalDepth: 59,
  appliedSystemsThinking: 63,
  dataManagement: 61,
  collaboration: 69,
  executionReliability: 58
};

const genericProfiles: GenericCapabilityProfile[] = [
  {
    id: 'entry-data-engineer',
    label: 'Entry-Level Data Engineer',
    frameworkLabel: 'Public Generic Capability Framework',
    detail: 'Neutral entry-level framework for analytics and platform implementation roles.',
    baseTargetScores: {
      technicalDepth: 80,
      appliedSystemsThinking: 76,
      dataManagement: 82,
      collaboration: 68,
      executionReliability: 79
    },
    nextSteps: [
      {
        id: 'de-step-1',
        title: 'Build a small ETL workflow and publish reliability notes',
        description: 'Document failure handling and monitoring assumptions for one data pipeline artifact.',
        eta: '7 days',
        dimensionBoost: { technicalDepth: 5, executionReliability: 4 }
      },
      {
        id: 'de-step-2',
        title: 'Complete data quality validation challenge',
        description: 'Run checks on one dataset and summarize findings with remediation recommendations.',
        eta: '5 days',
        dimensionBoost: { dataManagement: 6, appliedSystemsThinking: 3 }
      },
      {
        id: 'de-step-3',
        title: 'Present architecture tradeoffs to non-technical audience',
        description: 'Create a one-page system brief translating technical decisions into business outcomes.',
        eta: '3 days',
        dimensionBoost: { collaboration: 4, appliedSystemsThinking: 3 }
      }
    ]
  },
  {
    id: 'entry-product-analyst',
    label: 'Entry-Level Product Analyst',
    frameworkLabel: 'Public Generic Capability Framework',
    detail: 'Neutral framework for product analytics and decision-support roles.',
    baseTargetScores: {
      technicalDepth: 70,
      appliedSystemsThinking: 80,
      dataManagement: 72,
      collaboration: 74,
      executionReliability: 73
    },
    nextSteps: [
      {
        id: 'pa-step-1',
        title: 'Publish one funnel diagnosis with impact hypotheses',
        description: 'Frame bottlenecks, candidate interventions, and expected behavioral impact.',
        eta: '6 days',
        dimensionBoost: { appliedSystemsThinking: 5, dataManagement: 3 }
      },
      {
        id: 'pa-step-2',
        title: 'Design and critique an experiment plan',
        description: 'Propose metrics, guardrails, and interpretation caveats for one product question.',
        eta: '4 days',
        dimensionBoost: { technicalDepth: 3, executionReliability: 4 }
      },
      {
        id: 'pa-step-3',
        title: 'Lead one stakeholder evidence review',
        description: 'Run a short readout and gather decisions from cross-functional peers.',
        eta: '2 days',
        dimensionBoost: { collaboration: 5, appliedSystemsThinking: 2 }
      }
    ]
  },
  {
    id: 'entry-associate-consultant',
    label: 'Entry-Level Associate Consultant',
    frameworkLabel: 'Public Generic Capability Framework',
    detail: 'Neutral framework for strategy and client-facing advisory pathways.',
    baseTargetScores: {
      technicalDepth: 65,
      appliedSystemsThinking: 81,
      dataManagement: 66,
      collaboration: 79,
      executionReliability: 74
    },
    nextSteps: [
      {
        id: 'ac-step-1',
        title: 'Complete two structured case simulations',
        description: 'Practice decomposition, synthesis, and recommendation under time constraints.',
        eta: '5 days',
        dimensionBoost: { appliedSystemsThinking: 6, executionReliability: 2 }
      },
      {
        id: 'ac-step-2',
        title: 'Write one executive recommendation brief',
        description: 'Translate analysis into a concise recommendation with tradeoff rationale.',
        eta: '3 days',
        dimensionBoost: { collaboration: 4, appliedSystemsThinking: 3 }
      },
      {
        id: 'ac-step-3',
        title: 'Facilitate one peer decision workshop',
        description: 'Lead a team discussion, capture options, and align on next steps.',
        eta: '4 days',
        dimensionBoost: { collaboration: 5, executionReliability: 3 }
      }
    ]
  }
];

const companySignalProfiles: CompanySignalProfile[] = [
  {
    id: 'company-x',
    name: 'Company X',
    studentVisibleSignals: [
      'Emphasizes production-scale system reliability more than average.',
      'Values evidence of data management under real constraints.'
    ],
    emphasis: {
      executionReliability: 'above',
      dataManagement: 'above',
      collaboration: 'baseline'
    },
    hiddenAdjustments: {
      executionReliability: 4,
      dataManagement: 3,
      collaboration: 1
    }
  },
  {
    id: 'company-y',
    name: 'Company Y',
    studentVisibleSignals: [
      'Values open-source contributions and applied project depth.',
      'Looks for strong systems thinking across ambiguous product contexts.'
    ],
    emphasis: {
      technicalDepth: 'above',
      appliedSystemsThinking: 'above',
      collaboration: 'baseline'
    },
    hiddenAdjustments: {
      technicalDepth: 4,
      appliedSystemsThinking: 3,
      collaboration: 1
    }
  },
  {
    id: 'company-z',
    name: 'Company Z',
    studentVisibleSignals: [
      'Prioritizes collaborative execution and dependable delivery.',
      'Expects practical evidence of cross-functional implementation habits.'
    ],
    emphasis: {
      collaboration: 'above',
      executionReliability: 'above',
      technicalDepth: 'baseline'
    },
    hiddenAdjustments: {
      collaboration: 4,
      executionReliability: 3,
      technicalDepth: 1
    }
  }
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const sumBoost = (boost: Partial<CapabilityScores>) => {
  return capabilityDimensions.reduce((sum, dimension) => sum + (boost[dimension.key] ?? 0), 0);
};

const computeAlignmentScore = (currentScores: CapabilityScores, targetScores: CapabilityScores) => {
  const weightedRatio = capabilityDimensions.reduce((sum, dimension) => {
    const current = currentScores[dimension.key];
    const target = targetScores[dimension.key];
    const ratio = target <= 0 ? 1 : clamp(current / target, 0, 1);
    return sum + ratio * dimension.weight;
  }, 0);

  return Math.round(weightedRatio * 100);
};

const estimateAlignmentDelta = (currentScores: CapabilityScores, targetScores: CapabilityScores, boost: Partial<CapabilityScores>) => {
  const before = computeAlignmentScore(currentScores, targetScores);

  const simulated = capabilityDimensions.reduce<CapabilityScores>((next, dimension) => {
    const increase = boost[dimension.key] ?? 0;
    next[dimension.key] = clamp(currentScores[dimension.key] + increase, 0, 100);
    return next;
  }, { ...currentScores });

  const after = computeAlignmentScore(simulated, targetScores);
  return after - before;
};

const getAdjustedTargetScores = (baseTargetScores: CapabilityScores, selectedCompanies: CompanySignalProfile[]) => {
  if (selectedCompanies.length === 0) {
    return { ...baseTargetScores };
  }

  return capabilityDimensions.reduce<CapabilityScores>((next, dimension) => {
    const averageAdjustment = Math.round(
      selectedCompanies.reduce((sum, company) => sum + (company.hiddenAdjustments[dimension.key] ?? 0), 0) /
        selectedCompanies.length
    );

    next[dimension.key] = clamp(baseTargetScores[dimension.key] + averageAdjustment, 40, 95);
    return next;
  }, {} as CapabilityScores);
};

const getAlignmentBand = (alignmentScore: number) => {
  if (alignmentScore >= 78) {
    return {
      band: 'Strong',
      detail: 'You are trending toward strong readiness for selected targets.',
      className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100'
    };
  }

  if (alignmentScore >= 58) {
    return {
      band: 'Competitive',
      detail: 'You are competitive in several dimensions with clear opportunities to improve.',
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100'
    };
  }

  return {
    band: 'Emerging',
    detail: 'Your foundation is forming. Focused capability steps can move this quickly.',
    className: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-100'
  };
};

const getProgressStatus = (progress: number): ProgressStatus => {
  if (progress < 70) return 'priority-gap';
  if (progress < 85) return 'watch';
  return 'on-track';
};

const progressStatusClassMap: Record<ProgressStatus, string> = {
  'priority-gap': 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-100',
  watch: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100',
  'on-track': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100'
};

const impactLabel = (score: number) => {
  if (score >= 7) return 'Likely high impact';
  if (score >= 4) return 'Likely medium impact';
  return 'Foundational impact';
};

const impactBadgeClass = (label: string) => {
  if (label === 'Likely high impact') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100';
  if (label === 'Likely medium impact') return 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100';
  return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200';
};

export interface StudentDashboardCapabilityOverviewProps {
  defaultProfileId?: string;
}

export const StudentDashboardCapabilityOverview = ({
  defaultProfileId = 'entry-data-engineer'
}: StudentDashboardCapabilityOverviewProps) => {
  const [selectedProfileId, setSelectedProfileId] = useState(defaultProfileId);
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>(['company-x']);
  const [currentScores, setCurrentScores] = useState(initialCurrentScores);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const selectedProfile = useMemo(() => {
    return genericProfiles.find((profile) => profile.id === selectedProfileId) ?? genericProfiles[0];
  }, [selectedProfileId]);

  const selectedCompanies = useMemo(() => {
    return companySignalProfiles.filter((company) => selectedCompanyIds.includes(company.id));
  }, [selectedCompanyIds]);

  const adjustedTargetScores = useMemo(() => {
    return getAdjustedTargetScores(selectedProfile.baseTargetScores, selectedCompanies);
  }, [selectedCompanies, selectedProfile.baseTargetScores]);

  const alignmentScore = useMemo(() => {
    return computeAlignmentScore(currentScores, adjustedTargetScores);
  }, [adjustedTargetScores, currentScores]);

  const alignmentBand = useMemo(() => getAlignmentBand(alignmentScore), [alignmentScore]);

  const confidenceScore = useMemo(() => {
    const confidence = 56 + selectedCompanies.length * 9 + Math.min(completedStepIds.length * 3, 15);
    return clamp(confidence, 52, 91);
  }, [completedStepIds.length, selectedCompanies.length]);

  const dimensionProgress = useMemo(() => {
    return capabilityDimensions.map((dimension) => {
      const current = currentScores[dimension.key];
      const target = adjustedTargetScores[dimension.key];
      const progress = clamp(Math.round((current / target) * 100), 0, 100);
      const gap = Math.max(target - current, 0);
      const status = getProgressStatus(progress);

      const companyEmphasisAbove = selectedCompanies.some((company) => company.emphasis[dimension.key] === 'above');

      return {
        ...dimension,
        current,
        target,
        progress,
        gap,
        status,
        companyEmphasisAbove
      };
    });
  }, [adjustedTargetScores, currentScores, selectedCompanies]);

  const gapAlerts = useMemo(() => {
    return dimensionProgress
      .filter((dimension) => dimension.status !== 'on-track')
      .sort((first, second) => first.progress - second.progress);
  }, [dimensionProgress]);

  const projectedNextSteps = useMemo(() => {
    return selectedProfile.nextSteps
      .map((step) => {
        const baseDelta = estimateAlignmentDelta(currentScores, adjustedTargetScores, step.dimensionBoost);

        const employerFitBonus = selectedCompanies.reduce((sum, company) => {
          return (
            sum +
            capabilityDimensions.reduce((inner, dimension) => {
              const stepTouchesDimension = (step.dimensionBoost[dimension.key] ?? 0) > 0;
              const companyEmphasizesDimension = (company.hiddenAdjustments[dimension.key] ?? 0) > 0;
              return inner + (stepTouchesDimension && companyEmphasizesDimension ? 1 : 0);
            }, 0)
          );
        }, 0);

        const impactScore = baseDelta + employerFitBonus * 1.6 + sumBoost(step.dimensionBoost) * 0.08;
        const label = impactLabel(impactScore);

        return {
          ...step,
          completed: completedStepIds.includes(step.id),
          baseDelta,
          employerFitBonus,
          impactScore,
          label
        };
      })
      .sort((first, second) => {
        if (first.completed !== second.completed) return first.completed ? 1 : -1;
        if (first.impactScore !== second.impactScore) return second.impactScore - first.impactScore;
        return second.employerFitBonus - first.employerFitBonus;
      });
  }, [adjustedTargetScores, completedStepIds, currentScores, selectedCompanies, selectedProfile]);

  const upcomingSteps = projectedNextSteps.filter((step) => !step.completed).slice(0, 3);

  const toggleCompany = (companyId: string) => {
    setSelectedCompanyIds((current) => {
      if (current.includes(companyId)) {
        if (current.length === 1) {
          setStatusMessage('Keep at least one target company selected for personalized guidance.');
          return current;
        }

        return current.filter((id) => id !== companyId);
      }

      return [...current, companyId];
    });
  };

  const applyStep = (step: ActionStep) => {
    if (completedStepIds.includes(step.id)) return;

    setCurrentScores((current) => {
      return capabilityDimensions.reduce<CapabilityScores>((next, dimension) => {
        const increase = step.dimensionBoost[dimension.key] ?? 0;
        next[dimension.key] = clamp(current[dimension.key] + increase, 0, 100);
        return next;
      }, { ...current });
    });

    setCompletedStepIds((current) => [...current, step.id]);
    setStatusMessage(`Logged step completion: ${step.title}. Guidance has been recalibrated.`);
  };

  const resetProgress = () => {
    setCurrentScores(initialCurrentScores);
    setCompletedStepIds([]);
    setStatusMessage('Progress reset to baseline snapshot.');
  };

  return (
    <section aria-labelledby="student-capability-dashboard-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="rounded-[32px] border border-[#cfddd6] bg-[#f8fcfa] p-6 shadow-[0_24px_54px_-36px_rgba(10,31,26,0.45)] dark:border-slate-700 dark:bg-slate-900/75">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4c6860] dark:text-slate-400">
              Student dashboard
            </p>
            <h2
              id="student-capability-dashboard-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-4xl"
            >
              Capability overview
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#436059] dark:text-slate-300">
              Public role frameworks anchor fair exploration, employer emphasis stays abstracted, and guidance remains
              probabilistic to prevent gaming.
            </p>
          </div>
          <Badge className="bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/35">
            Measurable capability pathways
          </Badge>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          <Card
            className="bg-white/95 p-5 dark:bg-slate-900/80"
            header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Tier 1 · Public generic capability framework</h3>}
          >
            <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
              Target role profile
              <select
                value={selectedProfile.id}
                onChange={(event) => {
                  setSelectedProfileId(event.target.value);
                  setStatusMessage('Generic role framework updated.');
                }}
                className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              >
                {genericProfiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.label}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-[11px] text-[#4f6a62] dark:text-slate-400">{selectedProfile.detail}</span>
            </label>

            <div className="mt-3 space-y-2">
              {capabilityDimensions.map((dimension) => (
                <div
                  key={`framework-${dimension.key}`}
                  className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                >
                  <p className="text-sm font-semibold text-[#14372d] dark:text-slate-100">{dimension.label}</p>
                  <p className="mt-1 text-xs text-[#4c6860] dark:text-slate-300">{dimension.publicDefinition}</p>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-[#4c6860] dark:text-slate-300">
              This framework is public and role-level only. It is intentionally not company-specific.
            </p>
          </Card>

          <Card
            className="bg-white/95 p-5 dark:bg-slate-900/80"
            header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Tier 2 · Employer-tuned emphasis (abstracted)</h3>}
          >
            <p className="text-sm text-[#48635b] dark:text-slate-300">
              Employers tune internal weighting privately. Students see directional emphasis, not exact thresholds.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {companySignalProfiles.map((company) => {
                const isActive = selectedCompanyIds.includes(company.id);

                return (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() => toggleCompany(company.id)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'border-[#0fd978] bg-[#12f987] text-[#0a1f1a]'
                        : 'border-[#c4d5ce] bg-white text-[#3a574e] hover:bg-[#eff6f2] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {company.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 space-y-2">
              {selectedCompanies.map((company) => (
                <div
                  key={`signal-${company.id}`}
                  className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                >
                  <p className="text-sm font-semibold text-[#14372d] dark:text-slate-100">{company.name}</p>
                  {company.studentVisibleSignals.map((signal) => (
                    <p key={`${company.id}-${signal}`} className="mt-1 text-xs text-[#4c6860] dark:text-slate-300">
                      {signal}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-[#4c6860] dark:text-slate-300">
              Exact weights and numerical hiring thresholds remain hidden to preserve signal integrity.
            </p>
          </Card>
        </div>

        <div className="mt-7 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <Card
            className="bg-white/95 p-5 dark:bg-slate-900/80"
            header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Tier 3 · Personalized probabilistic guidance</h3>}
          >
            <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Alignment signal</p>
                <Badge className={alignmentBand.className}>{alignmentBand.band}</Badge>
              </div>
              <p className="mt-1 text-3xl font-semibold text-[#0f2b23] dark:text-slate-100">{alignmentScore}</p>
              <p className="mt-1 text-xs text-[#4c6860] dark:text-slate-300">{alignmentBand.detail}</p>
              <p className="mt-1 text-[11px] text-[#4c6860] dark:text-slate-400">
                Probabilistic confidence {confidenceScore}% · Exact employer thresholds are intentionally abstracted.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {dimensionProgress.map((dimension) => (
                <div
                  key={dimension.key}
                  className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <p className="font-semibold text-[#123b30] dark:text-slate-100">{dimension.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4c6860] dark:text-slate-300">Signal {dimension.current}</span>
                      <Badge className={progressStatusClassMap[dimension.status]}>
                        {dimension.status === 'on-track'
                          ? 'On track'
                          : dimension.status === 'watch'
                            ? 'Watch'
                            : 'Priority gap'}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-[#dbe7e1] dark:bg-slate-700">
                    <div className="h-full rounded-full bg-[#12f987]" style={{ width: `${dimension.progress}%` }} />
                  </div>
                  {dimension.companyEmphasisAbove ? (
                    <p className="mt-1 text-[11px] text-[#4c6860] dark:text-slate-400">
                      Selected companies place above-average emphasis on this dimension.
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={resetProgress}>
                Reset simulation
              </Button>
              <Badge className="bg-[#eef6f1] text-[#325148] dark:bg-slate-700 dark:text-slate-200">
                {completedStepIds.length} steps logged
              </Badge>
            </div>

            {statusMessage ? (
              <p className="mt-4 rounded-xl border border-[#cde0d8] bg-[#f4faf7] px-3 py-2 text-xs font-medium text-[#44645b] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {statusMessage}
              </p>
            ) : null}
          </Card>

          <div className="space-y-4">
            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Next most valuable steps</h3>}
            >
              {upcomingSteps.length === 0 ? (
                <p className="text-sm text-[#48635b] dark:text-slate-300">
                  All recommended steps are completed for this profile. Switch profile or reset simulation.
                </p>
              ) : (
                <div className="space-y-2">
                  {upcomingSteps.map((step) => (
                    <div
                      key={step.id}
                      className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[#14372d] dark:text-slate-100">{step.title}</p>
                        <Badge className={impactBadgeClass(step.label)}>{step.label}</Badge>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-[#4c6860] dark:text-slate-300">{step.description}</p>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-medium text-[#48635b] dark:text-slate-300">Estimated effort: {step.eta}</p>
                        <Button type="button" size="sm" onClick={() => applyStep(step)}>
                          Log as completed
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Gap alerts</h3>}
            >
              {gapAlerts.length === 0 ? (
                <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-[#15382f] dark:text-slate-100">No major gaps detected</p>
                  <p className="mt-1 text-xs text-[#4c6860] dark:text-slate-300">
                    You are within expected range across core capability dimensions.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {gapAlerts.map((alert) => {
                    const mappedStep = selectedProfile.nextSteps.find((step) => (step.dimensionBoost[alert.key] ?? 0) > 0);

                    return (
                      <div
                        key={`gap-${alert.key}`}
                        className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-[#14372d] dark:text-slate-100">{alert.label}</p>
                          <Badge className={progressStatusClassMap[alert.status]}>
                            {alert.status === 'priority-gap' ? 'Priority gap' : 'Watch'}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-[#4c6860] dark:text-slate-300">
                          This dimension is currently below expected range for {selectedProfile.label}.
                        </p>
                        {alert.companyEmphasisAbove ? (
                          <p className="mt-1 text-xs text-[#4c6860] dark:text-slate-300">
                            It is above-average emphasis for one or more selected companies.
                          </p>
                        ) : null}
                        {mappedStep ? (
                          <p className="mt-1 text-xs text-[#4c6860] dark:text-slate-300">
                            Suggested action: {mappedStep.title}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
