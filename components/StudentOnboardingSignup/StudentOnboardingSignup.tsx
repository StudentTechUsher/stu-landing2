import { useMemo, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type RoleTemplate = {
  id: string;
  label: string;
  role: string;
  company: string;
  skillDomain: string;
  summary: string;
};

type StudentArchetype = 'builder' | 'analyst' | 'strategist' | 'operator';
type LearningMode = 'project' | 'coursework' | 'collaborative' | 'independent';
type StudentYear = 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4' | 'Graduate';
type CourseworkSource = 'sis_sync' | 'csv_upload' | 'manual_later';
type ProjectSignal = 'github' | 'portfolio' | 'both' | 'not_yet';

type AgentSuggestion = {
  id: string;
  title: string;
  action: string;
  rationale: string;
  impact: string;
};

const roleTemplates: RoleTemplate[] = [
  {
    id: 'product-analyst',
    label: 'Product Analyst Track',
    role: 'Product Analyst',
    company: 'Shopify',
    skillDomain: 'Product analytics',
    summary: 'Build hypothesis-driven product analysis and stakeholder communication skills.'
  },
  {
    id: 'data-analyst',
    label: 'Data Analyst Track',
    role: 'Data Analyst',
    company: 'HubSpot',
    skillDomain: 'Data analytics',
    summary: 'Focus on SQL, dashboard storytelling, and measurable business recommendations.'
  },
  {
    id: 'associate-consultant',
    label: 'Consulting Track',
    role: 'Associate Consultant',
    company: 'Deloitte',
    skillDomain: 'Business strategy',
    summary: 'Develop structured problem solving and concise executive communication.'
  },
  {
    id: 'software-engineer',
    label: 'Software Engineering Track',
    role: 'Software Engineer',
    company: 'Atlassian',
    skillDomain: 'Engineering systems',
    summary: 'Practice implementation depth, code quality, and delivery reliability.'
  }
];

const skillDomainOptions = [
  'Data analytics',
  'Product analytics',
  'Business strategy',
  'Engineering systems',
  'UX research',
  'Growth and marketing analytics'
] as const;

const studentArchetypes: Array<{ id: StudentArchetype; label: string; detail: string }> = [
  { id: 'builder', label: 'Builder', detail: 'Learns by shipping projects and iterating quickly.' },
  { id: 'analyst', label: 'Analyst', detail: 'Learns by pattern finding, metrics, and structured review.' },
  { id: 'strategist', label: 'Strategist', detail: 'Learns by frameworks, tradeoffs, and business context.' },
  { id: 'operator', label: 'Operator', detail: 'Learns by execution systems, reliability, and follow-through.' }
];

const learningModes: Array<{ id: LearningMode; label: string }> = [
  { id: 'project', label: 'Project-based learning' },
  { id: 'coursework', label: 'Coursework-first' },
  { id: 'collaborative', label: 'Team collaboration' },
  { id: 'independent', label: 'Independent deep work' }
];

const studentYearOptions: StudentYear[] = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduate'];

const courseworkSourceOptions: Array<{ id: CourseworkSource; label: string }> = [
  { id: 'sis_sync', label: 'SIS sync' },
  { id: 'csv_upload', label: 'CSV upload' },
  { id: 'manual_later', label: 'Manual later' }
];

const projectSignalOptions: Array<{ id: ProjectSignal; label: string }> = [
  { id: 'github', label: 'GitHub linked' },
  { id: 'portfolio', label: 'Portfolio linked' },
  { id: 'both', label: 'GitHub + portfolio' },
  { id: 'not_yet', label: 'Not yet' }
];

const pathwayByDomain: Record<string, string[]> = {
  'Data analytics': [
    'SQL diagnostics and data quality checks',
    'Business KPI framing and metric decomposition',
    'Dashboard narrative and insight communication'
  ],
  'Product analytics': [
    'Experiment design and impact measurement',
    'Retention and funnel analysis',
    'Cross-functional recommendation writing'
  ],
  'Business strategy': [
    'Case structuring and hypothesis trees',
    'Market sizing and prioritization tradeoffs',
    'Executive summary presentation drills'
  ],
  'Engineering systems': [
    'Implementation planning and code design reviews',
    'System reliability and testing strategies',
    'Iteration velocity and pull-request quality'
  ],
  'UX research': [
    'Research plan and participant interview strategy',
    'Evidence synthesis and decision frameworks',
    'Usability findings and recommendation storytelling'
  ],
  'Growth and marketing analytics': [
    'Acquisition funnel segmentation',
    'Channel attribution and incrementality basics',
    'Campaign optimization narrative for hiring panels'
  ]
};

const emailRegex = /^[^\s@]+@[^\s@]+\.edu$/i;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const getInitialTemplate = (id?: string) => {
  return roleTemplates.find((template) => template.id === id) ?? roleTemplates[0];
};

export interface StudentOnboardingSignupProps {
  defaultTemplateId?: string;
  defaultCampusEmail?: string;
}

export const StudentOnboardingSignup = ({
  defaultTemplateId,
  defaultCampusEmail = ''
}: StudentOnboardingSignupProps) => {
  const initialTemplate = useMemo(() => getInitialTemplate(defaultTemplateId), [defaultTemplateId]);

  const [campusEmail, setCampusEmail] = useState(defaultCampusEmail);
  const [studentYear, setStudentYear] = useState<StudentYear | ''>('');
  const [majorTrack, setMajorTrack] = useState('');
  const [studentArchetype, setStudentArchetype] = useState<StudentArchetype | ''>('');
  const [learningMode, setLearningMode] = useState<LearningMode | ''>('');
  const [weeklyCommitment, setWeeklyCommitment] = useState(6);

  const [courseworkSource, setCourseworkSource] = useState<CourseworkSource | ''>('');
  const [projectSignal, setProjectSignal] = useState<ProjectSignal | ''>('');
  const [projectLink, setProjectLink] = useState('');
  const [certificationCount, setCertificationCount] = useState(0);
  const [leadershipEvidence, setLeadershipEvidence] = useState(false);
  const [testEvidence, setTestEvidence] = useState(false);

  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplate.id);
  const [targetRole, setTargetRole] = useState(initialTemplate.role);
  const [targetCompany, setTargetCompany] = useState(initialTemplate.company);
  const [skillDomain, setSkillDomain] = useState(initialTemplate.skillDomain);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const selectedTemplate = useMemo(
    () => roleTemplates.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId]
  );

  const campusEmailValid = emailRegex.test(campusEmail.trim());

  const baselineFieldCount = useMemo(() => {
    return [campusEmailValid, studentYear !== '', majorTrack.trim().length > 1, studentArchetype !== '', learningMode !== ''].filter(Boolean)
      .length;
  }, [campusEmailValid, learningMode, majorTrack, studentArchetype, studentYear]);

  const artifactSignalCount = useMemo(() => {
    let count = 0;

    if (courseworkSource !== '') count += 1;
    if (projectSignal === 'github' || projectSignal === 'portfolio' || projectSignal === 'both') count += 1;
    if (certificationCount > 0) count += 1;
    if (leadershipEvidence) count += 1;
    if (testEvidence) count += 1;

    return count;
  }, [certificationCount, courseworkSource, leadershipEvidence, projectSignal, testEvidence]);

  const baselineReady = baselineFieldCount === 5;
  const artifactsReady = artifactSignalCount >= 2;
  const goalsUnlocked = baselineReady && artifactsReady;

  const goalsFieldCount = useMemo(() => {
    return [targetRole.trim().length > 1, targetCompany.trim().length > 1, skillDomain.trim().length > 1].filter(Boolean).length;
  }, [skillDomain, targetCompany, targetRole]);

  const goalsReady = goalsUnlocked && goalsFieldCount === 3;

  const completionScore = useMemo(() => {
    const baselineScore = (baselineFieldCount / 5) * 45;
    const artifactScore = clamp((artifactSignalCount / 4) * 25, 0, 25);
    const goalScore = goalsUnlocked ? (goalsFieldCount / 3) * 30 : 0;

    return Math.round(clamp(baselineScore + artifactScore + goalScore, 0, 100));
  }, [artifactSignalCount, baselineFieldCount, goalsFieldCount, goalsUnlocked]);

  const personalizationReadiness = clamp(completionScore + (selectedTemplate ? 5 : 0), 0, 100);

  const companySuggestions = useMemo(() => {
    return Array.from(new Set(roleTemplates.map((template) => template.company)));
  }, []);

  const evidenceTagSignals = useMemo(() => {
    const tags: string[] = [];

    if (projectSignal === 'github' || projectSignal === 'portfolio' || projectSignal === 'both') {
      tags.push('Technical depth');
      tags.push('Applied execution');
    }

    if (leadershipEvidence) tags.push('Collaboration signal');
    if (certificationCount > 0) tags.push('Credential signal');
    if (testEvidence) tags.push('Performance evidence');

    return Array.from(new Set(tags));
  }, [certificationCount, leadershipEvidence, projectSignal, testEvidence]);

  const pathwayRecommendations = useMemo(() => {
    if (!goalsUnlocked) {
      return [
        'Complete learner baseline to unlock role-specific pathway planning.',
        'Add at least two artifact signals so recommendations can calibrate to evidence.',
        'After unlock, select role + company + domain to generate capability milestones.'
      ];
    }

    const domainPathway = pathwayByDomain[skillDomain] ?? pathwayByDomain['Data analytics'];

    return [
      `Role intent baseline: ${targetRole || 'Early-career role not set yet'}`,
      ...domainPathway,
      `Employer targeting signal: ${targetCompany || 'Target company not selected'}`
    ];
  }, [goalsUnlocked, skillDomain, targetCompany, targetRole]);

  const liveAgentSuggestions = useMemo<AgentSuggestion[]>(() => {
    const suggestions: AgentSuggestion[] = [];

    if (!campusEmailValid) {
      suggestions.push({
        id: 'email',
        title: 'Verify campus identity first',
        action: 'Use a valid .edu email',
        rationale: 'This unlocks SIS/course ingestion and university-linked context.',
        impact: 'Artifact repository setup'
      });
    }

    if (studentArchetype === '') {
      suggestions.push({
        id: 'archetype',
        title: 'Identify how you learn best',
        action: 'Pick a student archetype',
        rationale: 'Archetype changes recommendation tone and milestone style.',
        impact: 'AI guidance panel quality'
      });
    }

    if (learningMode === '') {
      suggestions.push({
        id: 'mode',
        title: 'Set preferred learning mode',
        action: 'Choose project, coursework, team, or independent',
        rationale: 'Planner sequencing adapts to how you execute work.',
        impact: 'Pathway planner schedule fit'
      });
    }

    if (baselineReady && courseworkSource === '') {
      suggestions.push({
        id: 'coursework',
        title: 'Add coursework source next',
        action: 'Select SIS sync, CSV, or manual intake',
        rationale: 'Course data anchors your baseline capability measurements.',
        impact: 'Capability overview accuracy'
      });
    }

    if (baselineReady && (projectSignal === '' || projectSignal === 'not_yet')) {
      suggestions.push({
        id: 'projects',
        title: 'Strengthen applied evidence',
        action: 'Link GitHub or portfolio artifacts',
        rationale: 'Applied project signals increase confidence for technical/readiness scoring.',
        impact: 'Artifact quality score'
      });
    }

    if (artifactSignalCount < 2) {
      suggestions.push({
        id: 'artifact-minimum',
        title: 'Reach minimum evidence threshold',
        action: 'Add at least two artifact signals',
        rationale: 'You need enough evidence before goal templates can personalize reliably.',
        impact: 'Unlock role targeting'
      });
    }

    if (goalsUnlocked && targetRole.trim().length < 2) {
      suggestions.push({
        id: 'role',
        title: 'Now define your early-career role',
        action: 'Set a target role or apply a template',
        rationale: 'Role intent selects the capability model used to score progress.',
        impact: 'Capability alignment score'
      });
    }

    if (goalsUnlocked && targetCompany.trim().length < 2) {
      suggestions.push({
        id: 'company',
        title: 'Add a target employer signal',
        action: 'Pick a company to calibrate context',
        rationale: 'Company context helps tune pathway milestones and examples.',
        impact: 'Interview readiness relevance'
      });
    }

    if (goalsUnlocked && skillDomain.trim().length === 0) {
      suggestions.push({
        id: 'domain',
        title: 'Select a skill domain',
        action: 'Choose your primary domain focus',
        rationale: 'Domain drives recommended blocks and measurable checkpoint ordering.',
        impact: 'Pathway sequence precision'
      });
    }

    if (goalsReady) {
      suggestions.unshift({
        id: 'ready',
        title: 'Onboarding profile is strong',
        action: 'Generate your first capability pathway',
        rationale: 'Enough context is captured to produce high-confidence guidance.',
        impact: 'Dashboard + planner activation'
      });
    }

    return suggestions.slice(0, 5);
  }, [
    artifactSignalCount,
    baselineReady,
    campusEmailValid,
    goalsReady,
    goalsUnlocked,
    learningMode,
    projectSignal,
    skillDomain,
    studentArchetype,
    targetCompany,
    targetRole,
    courseworkSource
  ]);

  const applyTemplate = (template: RoleTemplate) => {
    if (!goalsUnlocked) {
      setStatusMessage('Complete learner baseline and evidence intake before applying role templates.');
      return;
    }

    setSelectedTemplateId(template.id);
    setTargetRole(template.role);

    if (targetCompany.trim().length === 0 || companySuggestions.includes(targetCompany)) {
      setTargetCompany(template.company);
    }

    if (skillDomain.trim().length === 0) {
      setSkillDomain(template.skillDomain);
    }

    setStatusMessage(`Applied template: ${template.label}.`);
  };

  const captureIntent = () => {
    if (!baselineReady) {
      setStatusMessage('Finish learner baseline first so agent recommendations have context.');
      return;
    }

    if (!artifactsReady) {
      setStatusMessage('Add at least two evidence signals before setting final career targets.');
      return;
    }

    if (!goalsReady) {
      setStatusMessage('Complete target role, company, and skill domain to finalize personalization.');
      return;
    }

    setStatusMessage(`Intent captured. Personalized ${skillDomain.toLowerCase()} pathway is now ready for ${targetRole}.`);
  };

  return (
    <section aria-labelledby="student-onboarding-signup-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="rounded-[32px] border border-[#cfddd6] bg-[#f8fcfa] p-6 shadow-[0_24px_54px_-36px_rgba(10,31,26,0.45)] dark:border-slate-700 dark:bg-slate-900/75">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4c6860] dark:text-slate-400">
              Student onboarding
            </p>
            <h2
              id="student-onboarding-signup-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-4xl"
            >
              Understand student profile before career-target setup
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#436059] dark:text-slate-300">
              Sequence matters. Capture learner signals first, then unlock role and employer targeting so
              <strong className="font-bold"> stu.</strong> can generate stronger agentic guidance.
            </p>
          </div>
          <Badge className="bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/35">
            Agent-aware intake flow
          </Badge>
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-[#d2dfd9] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">1. Baseline</p>
            <p className="mt-1 text-sm text-[#1f4035] dark:text-slate-200">Identity, year, archetype, learning mode</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">2. Evidence intake</p>
            <p className="mt-1 text-sm text-[#1f4035] dark:text-slate-200">Artifacts and signals that validate readiness</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">3. Goal setup</p>
            <p className="mt-1 text-sm text-[#1f4035] dark:text-slate-200">Role, company, domain after unlock</p>
          </div>
        </div>

        <div className="mt-7 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <Card
            className="bg-white/95 p-5 dark:bg-slate-900/80"
            header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Create account and set goals</h3>}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Step 1 · Student baseline
              </p>
              <label className="mt-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Campus email
                <input
                  type="email"
                  value={campusEmail}
                  onChange={(event) => setCampusEmail(event.target.value)}
                  placeholder="name@university.edu"
                  className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
                <span
                  className={`mt-1 block text-[11px] ${
                    campusEmail.length === 0 || campusEmailValid
                      ? 'text-[#4f6a62] dark:text-slate-400'
                      : 'text-rose-700 dark:text-rose-300'
                  }`}
                >
                  Use your campus email ending in <strong>.edu</strong>.
                </span>
              </label>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Student year
                  <select
                    value={studentYear}
                    onChange={(event) => setStudentYear(event.target.value as StudentYear)}
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select year</option>
                    {studentYearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Major / focus area
                  <input
                    value={majorTrack}
                    onChange={(event) => setMajorTrack(event.target.value)}
                    placeholder="Ex: Information Systems"
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Student archetype</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {studentArchetypes.map((archetype) => {
                    const isActive = studentArchetype === archetype.id;
                    return (
                      <button
                        key={archetype.id}
                        type="button"
                        onClick={() => setStudentArchetype(archetype.id)}
                        className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                          isActive
                            ? 'border-[#0fd978] bg-[#e9fef3] dark:border-emerald-500 dark:bg-emerald-500/10'
                            : 'border-[#d3e0da] bg-white hover:bg-[#f4faf7] dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'
                        }`}
                      >
                        <p className="text-sm font-semibold text-[#11352b] dark:text-slate-100">{archetype.label}</p>
                        <p className="mt-1 text-[11px] leading-4 text-[#48635b] dark:text-slate-300">{archetype.detail}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Learning mode</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {learningModes.map((mode) => {
                    const isActive = learningMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setLearningMode(mode.id)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                          isActive
                            ? 'border-[#0fd978] bg-[#12f987] text-[#0a1f1a]'
                            : 'border-[#c4d5ce] bg-white text-[#3a574e] hover:bg-[#eff6f2] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Weekly commitment ({weeklyCommitment} hrs)
                <input
                  type="range"
                  min={2}
                  max={18}
                  value={weeklyCommitment}
                  onChange={(event) => setWeeklyCommitment(Number(event.target.value))}
                  className="mt-2 w-full accent-[#12f987]"
                />
              </label>
            </div>

            <div className="mt-5 border-t border-[#dfe8e3] pt-4 dark:border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Step 2 · Evidence baseline (artifact intake)
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Coursework source
                  <select
                    value={courseworkSource}
                    onChange={(event) => setCourseworkSource(event.target.value as CourseworkSource)}
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select source</option>
                    {courseworkSourceOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Project signal
                  <select
                    value={projectSignal}
                    onChange={(event) => setProjectSignal(event.target.value as ProjectSignal)}
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select signal</option>
                    {projectSignalOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {projectSignal !== '' && projectSignal !== 'not_yet' ? (
                <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Project link
                  <input
                    value={projectLink}
                    onChange={(event) => setProjectLink(event.target.value)}
                    placeholder="https://github.com/username or portfolio URL"
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
              ) : null}

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Certifications
                  <select
                    value={certificationCount}
                    onChange={(event) => setCertificationCount(Number(event.target.value))}
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value={0}>None yet</option>
                    <option value={1}>1 certification</option>
                    <option value={2}>2 certifications</option>
                    <option value={3}>3+ certifications</option>
                  </select>
                </label>

                <label className="mt-7 flex items-center gap-2 rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 text-sm font-medium text-[#1f3f35] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={leadershipEvidence}
                    onChange={(event) => setLeadershipEvidence(event.target.checked)}
                    className="h-4 w-4 accent-[#12f987]"
                  />
                  Clubs / leadership
                </label>

                <label className="mt-7 flex items-center gap-2 rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 text-sm font-medium text-[#1f3f35] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={testEvidence}
                    onChange={(event) => setTestEvidence(event.target.checked)}
                    className="h-4 w-4 accent-[#12f987]"
                  />
                  Test performance evidence
                </label>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {evidenceTagSignals.length === 0 ? (
                  <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">No artifact tags yet</Badge>
                ) : (
                  evidenceTagSignals.map((tag) => <Badge key={tag}>{tag}</Badge>)
                )}
              </div>
            </div>

            <div className="mt-5 border-t border-[#dfe8e3] pt-4 dark:border-slate-700">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Step 3 · Target role and goals
                </p>
                <Badge className={goalsUnlocked ? '' : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100'}>
                  {goalsUnlocked ? 'Unlocked' : 'Locked'}
                </Badge>
              </div>

              {!goalsUnlocked ? (
                <p className="mt-2 rounded-xl border border-dashed border-[#c8d7d1] bg-[#f7fcf9] px-3 py-2 text-xs text-[#4f6a62] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  Complete baseline and add at least two evidence signals to unlock target role, template, company, and
                  skill-domain setup.
                </p>
              ) : (
                <>
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                      What is your target early-career role?
                    </p>
                    <input
                      value={targetRole}
                      onChange={(event) => setTargetRole(event.target.value)}
                      placeholder="Ex: Product Analyst"
                      className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                      Suggested templates
                    </p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {roleTemplates.map((template) => {
                        const isActive = selectedTemplateId === template.id;
                        return (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => applyTemplate(template)}
                            className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                              isActive
                                ? 'border-[#0fd978] bg-[#e9fef3] dark:border-emerald-500 dark:bg-emerald-500/10'
                                : 'border-[#d3e0da] bg-white hover:bg-[#f4faf7] dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'
                            }`}
                          >
                            <p className="text-sm font-semibold text-[#11352b] dark:text-slate-100">{template.label}</p>
                            <p className="mt-1 text-[11px] leading-4 text-[#48635b] dark:text-slate-300">{template.summary}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                      Target company
                      <input
                        value={targetCompany}
                        onChange={(event) => setTargetCompany(event.target.value)}
                        placeholder="Ex: Atlassian"
                        className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                      Skill domain
                      <select
                        value={skillDomain}
                        onChange={(event) => setSkillDomain(event.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                      >
                        {skillDomainOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {companySuggestions.map((company) => (
                      <button
                        key={company}
                        type="button"
                        onClick={() => setTargetCompany(company)}
                        className="rounded-full border border-[#c4d5ce] bg-white px-3 py-1 text-xs font-semibold text-[#3a574e] transition-colors hover:bg-[#eff6f2] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        {company}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button type="button" onClick={captureIntent}>
                Create account and continue
              </Button>
              <Badge className="bg-[#eef6f1] text-[#325148] dark:bg-slate-700 dark:text-slate-200">
                Setup completion {completionScore}%
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
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">AI guidance panel preview</h3>}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Live agent suggestions</p>
              <div className="mt-3 space-y-2">
                {liveAgentSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <p className="text-sm font-semibold text-[#133a30] dark:text-slate-100">{suggestion.title}</p>
                    <p className="mt-1 text-xs text-[#48635b] dark:text-slate-300">
                      Action: {suggestion.action}
                    </p>
                    <p className="mt-1 text-xs text-[#48635b] dark:text-slate-300">Why: {suggestion.rationale}</p>
                    <Badge className="mt-2 bg-[#eef6f1] text-[#325148] dark:bg-slate-700 dark:text-slate-200">{suggestion.impact}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Personalized pathway preview</h3>}
            >
              <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Readiness snapshot</p>
                <p className="mt-2 text-sm text-[#1f4035] dark:text-slate-200">Personalization readiness: {personalizationReadiness}%</p>
                <div className="mt-2 h-2 rounded-full bg-[#dbe7e1] dark:bg-slate-700">
                  <div className="h-full rounded-full bg-[#12f987]" style={{ width: `${personalizationReadiness}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge>{targetRole || 'Role pending'}</Badge>
                  <Badge>{targetCompany || 'Company pending'}</Badge>
                  <Badge>{skillDomain || 'Domain pending'}</Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Recommended pathway blocks
                </p>
                {pathwayRecommendations.map((step, index) => (
                  <div
                    key={`pathway-step-${index}`}
                    className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 text-sm text-[#1f4035] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#dff8ec] text-[11px] font-semibold text-[#1a5a42] dark:bg-emerald-500/20 dark:text-emerald-100">
                      {index + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </Card>

            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Next student views enabled</h3>}
            >
              <div className="space-y-2">
                <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-[#133a30] dark:text-slate-100">Student Dashboard - Capability Overview</p>
                  <p className="mt-1 text-xs text-[#48635b] dark:text-slate-300">Needs baseline + goals.</p>
                  <Badge className="mt-2">{baselineReady && goalsReady ? 'Ready' : 'Pending'}</Badge>
                </div>
                <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-[#133a30] dark:text-slate-100">Artifact Repository</p>
                  <p className="mt-1 text-xs text-[#48635b] dark:text-slate-300">Needs at least two artifact signals.</p>
                  <Badge className="mt-2">{artifactsReady ? 'Ready' : 'Pending'}</Badge>
                </div>
                <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-[#133a30] dark:text-slate-100">Pathway Planner + AI Agent Guidance</p>
                  <p className="mt-1 text-xs text-[#48635b] dark:text-slate-300">Needs baseline, evidence, and role intent.</p>
                  <Badge className="mt-2">{goalsReady ? 'Ready' : 'Pending'}</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
