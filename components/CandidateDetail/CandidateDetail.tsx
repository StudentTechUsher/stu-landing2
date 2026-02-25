import dynamic from 'next/dynamic';
import defaultCandidateAvatar from '../../public/images/Gemini_Generated_Image_2jzqqj2jzqqj2jzq.png';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
  loading: () => <div className="h-[96px] w-full" aria-hidden="true" />
});

export type CandidateAlignmentBand = 'Standout' | 'Ready' | 'Developing' | 'Emerging';

const bandClassMap: Record<CandidateAlignmentBand, string> = {
  Standout: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100',
  Ready: 'bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-100',
  Developing: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100',
  Emerging: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-100'
};

const alignmentScaleItems: Array<{ band: CandidateAlignmentBand; dotClassName: string }> = [
  { band: 'Emerging', dotClassName: 'bg-rose-500' },
  { band: 'Developing', dotClassName: 'bg-amber-500' },
  { band: 'Ready', dotClassName: 'bg-teal-500' },
  { band: 'Standout', dotClassName: 'bg-emerald-400' }
];

const readinessLadderItems: Array<{ band: CandidateAlignmentBand; description: string }> = [
  { band: 'Emerging', description: 'Baseline evidence submitted.' },
  { band: 'Developing', description: 'Capability signal is improving with validated artifacts.' },
  { band: 'Ready', description: 'Interview readiness is supported by consistent evidence.' },
  { band: 'Standout', description: 'High-confidence fit with strong early-ramp potential.' }
];

const capabilityBarTones = [
  { trackClassName: 'bg-rose-100 dark:bg-rose-500/20', fillClassName: 'bg-rose-500', scoreClassName: 'text-rose-700 dark:text-rose-300' },
  { trackClassName: 'bg-amber-100 dark:bg-amber-500/20', fillClassName: 'bg-amber-500', scoreClassName: 'text-amber-700 dark:text-amber-300' },
  { trackClassName: 'bg-sky-100 dark:bg-sky-500/20', fillClassName: 'bg-sky-500', scoreClassName: 'text-sky-700 dark:text-sky-300' },
  { trackClassName: 'bg-slate-200 dark:bg-slate-500/20', fillClassName: 'bg-slate-500', scoreClassName: 'text-slate-700 dark:text-slate-300' },
  { trackClassName: 'bg-fuchsia-100 dark:bg-fuchsia-500/20', fillClassName: 'bg-fuchsia-500', scoreClassName: 'text-fuchsia-700 dark:text-fuchsia-300' },
  { trackClassName: 'bg-emerald-100 dark:bg-emerald-500/20', fillClassName: 'bg-emerald-500', scoreClassName: 'text-emerald-700 dark:text-emerald-300' }
] as const;

type CapabilityScore = { label: string; score: number };
type VideoSignal = { label: string; duration: string; url: string };
type ReferenceContact = {
  fullName: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
  quote: string;
};
type QualitativeSignals = {
  introVideo: VideoSignal;
  projectDemoVideo: VideoSignal;
  references: ReferenceContact[];
};

export type CandidateDetailRecord = {
  fullName: string;
  anonymousLabel: string;
  targetRole: string;
  university: string;
  educationProgram: string;
  anticipatedGraduationYear: number;
  alignmentScore: number;
  alignmentBand: CandidateAlignmentBand;
  metadataTags: string[];
  capabilities: CapabilityScore[];
  topQualifyingReason?: string;
  qualitativeSignals?: QualitativeSignals;
  avatarSrc?: string;
};

export interface CandidateDetailProps {
  candidate?: CandidateDetailRecord;
  anonymizedPreview?: boolean;
  showQualitativeSignals?: boolean;
  showAlignmentLegend?: boolean;
  alignmentProfileMode?: 'gauge' | 'scale' | 'ladder' | 'capability';
  showTopQualifyingReasonAction?: boolean;
  onTopQualifyingReasonAction?: () => void;
  showInviteButton?: boolean;
  inviteButtonLabel?: string;
  inviteButtonClassName?: string;
  invited?: boolean;
  onInvite?: () => void;
  className?: string;
}

export const defaultCandidateDetail: CandidateDetailRecord = {
  fullName: 'Avery Park',
  anonymousLabel: 'Candidate 1042',
  targetRole: 'Product Analyst',
  university: 'Brigham Young University',
  educationProgram: 'BYU BSIS',
  anticipatedGraduationYear: 2028,
  alignmentScore: 91,
  alignmentBand: 'Standout',
  metadataTags: [
    '2 references available',
    '10+ Project Artifacts',
    "President of BYU's AIS Chapter",
    '+5 Additional Hiring Signals'
  ],
  capabilities: [
    { label: 'Problem solving', score: 93 },
    { label: 'Data communication', score: 89 },
    { label: 'Execution reliability', score: 88 },
    { label: 'Collaboration', score: 86 },
    { label: 'Business judgment', score: 87 },
    { label: 'Programming fluency', score: 84 }
  ],
  topQualifyingReason: "Avery recently achieved first place in the Marriott School's annual case competition, demonstrating strong analytical thinking and executive-level presentation skills under pressure.",
  qualitativeSignals: {
    introVideo: {
      label: 'Get to know you',
      duration: '1:30',
      url: 'https://videos.stu.dev/avery-park-intro'
    },
    projectDemoVideo: {
      label: 'Project demo',
      duration: '3:45',
      url: 'https://videos.stu.dev/avery-park-project-demo'
    },
    references: [
      {
        fullName: 'Nicole Jensen',
        role: 'Capstone Faculty Advisor',
        organization: 'Brigham Young University',
        email: 'nicole.jensen@byu.edu',
        phone: '(801) 555-0102',
        quote: 'Avery translates ambiguous project requirements into clean experiments and clearly communicates tradeoffs.'
      },
      {
        fullName: 'Ethan Roberts',
        role: 'Product Manager Intern Supervisor',
        organization: 'Acme Growth Labs',
        email: 'ethan.roberts@acmegrowth.com',
        phone: '(312) 555-0144',
        quote: 'Avery ran weekly updates with design and analytics and consistently surfaced the right decision risks early.'
      },
      {
        fullName: 'Maya Collins',
        role: 'Student Org President Mentor',
        organization: 'AIS Chapter at BYU',
        email: 'maya.collins@alumni.byu.edu',
        phone: '(385) 555-0188',
        quote: 'When deadlines stacked up, Avery still kept the team organized and delivered polished client-ready work.'
      }
    ]
  }
};

export const CandidateDetail = ({
  candidate = defaultCandidateDetail,
  anonymizedPreview = false,
  showQualitativeSignals = true,
  showAlignmentLegend = false,
  alignmentProfileMode = 'gauge',
  showTopQualifyingReasonAction = false,
  onTopQualifyingReasonAction,
  showInviteButton = true,
  inviteButtonLabel,
  inviteButtonClassName = '',
  invited = false,
  onInvite,
  className = ''
}: CandidateDetailProps) => {
  const displayName = anonymizedPreview ? candidate.anonymousLabel : candidate.fullName;
  const cohortLabel = `${candidate.educationProgram} ${candidate.anticipatedGraduationYear} Cohort`;
  const displayTitle = anonymizedPreview ? displayName : `${displayName} — ${cohortLabel}`;
  const avatarSrc = candidate.avatarSrc ?? defaultCandidateAvatar.src;
  const alignmentScore = Math.max(0, Math.min(100, candidate.alignmentScore));
  const activeLadderIndex = readinessLadderItems.findIndex((item) => item.band === candidate.alignmentBand);
  const candidateFirstName = candidate.fullName.trim().split(/\s+/)[0] ?? 'candidate';
  const topQualifyingReasonActionLabel = anonymizedPreview
    ? 'See more about this candidate'
    : `See more about ${candidateFirstName}`;
  const openSignalLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  const handleTopQualifyingReasonAction = () => {
    if (onTopQualifyingReasonAction) {
      onTopQualifyingReasonAction();
    }
  };

  return (
    <Card
      className={`bg-white/95 dark:bg-slate-900/80 ${className}`}
      header={
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#55736a] dark:text-slate-400">
            Candidate detail
          </p>
          <div className="mt-1 flex items-center gap-3">
            <img
              src={avatarSrc}
              alt={anonymizedPreview ? 'Selected candidate profile avatar' : `${candidate.fullName} profile avatar`}
              className="h-11 w-11 rounded-xl border border-[#cfe0d8] object-cover shadow-[0_8px_20px_-14px_rgba(10,31,26,0.75)] dark:border-slate-700"
            />
            <h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">{displayTitle}</h3>
          </div>
        </div>
      }
    >
      <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-2.5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3f5f54] dark:text-slate-400">
            Alignment signal
          </p>
          <div className="flex items-center gap-2">
            <Badge className={bandClassMap[candidate.alignmentBand]}>{candidate.alignmentBand}</Badge>
            <p className="text-sm font-semibold text-[#15382f] dark:text-slate-100">Score {candidate.alignmentScore}</p>
          </div>
        </div>
        <p className="mt-0.5 text-xs text-[#4a665e] dark:text-slate-300">
          {candidate.targetRole} · {anonymizedPreview ? 'Identity and university masked while preview mode is on.' : candidate.university}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {candidate.metadataTags.slice(0, 3).map((tag) => (
            <Badge
              key={`${candidate.fullName}-${tag}`}
              className="bg-[#eaf7f2] text-[#1f4a3c] ring-1 ring-[#c4ddd1] dark:bg-emerald-500/10 dark:text-emerald-100 dark:ring-emerald-400/30"
            >
              {tag}
            </Badge>
          ))}
          {candidate.metadataTags.length > 3 ? (
            <Badge className="bg-white/80 text-[#42645a] ring-1 ring-[#d0dfd8] dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
              +3 more signals
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="mt-2.5">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
          Alignment profile
        </p>
        {alignmentProfileMode === 'capability' ? (
          <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-2 py-2 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2 px-0.5">
              <p className="text-xs font-semibold text-[#15382f] dark:text-slate-100">Capability snapshot</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                {candidate.alignmentBand} · {candidate.alignmentScore}
              </p>
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5">
              {candidate.capabilities.map((capability, index) => {
                const tone = capabilityBarTones[index % capabilityBarTones.length];

                return (
                  <article
                    key={`${candidate.fullName}-${capability.label}`}
                    className="rounded-lg border border-[#d7e4de] bg-white/90 px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[10px] font-semibold leading-[1.2] text-[#26473d] dark:text-slate-200">{capability.label}</p>
                      <p className={`text-[10px] font-semibold ${tone.scoreClassName}`}>{capability.score}</p>
                    </div>
                    <div className={`mt-1 h-1.5 overflow-hidden rounded-full ${tone.trackClassName}`}>
                      <div className={`h-full rounded-full ${tone.fillClassName}`} style={{ width: `${capability.score}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : alignmentProfileMode === 'ladder' ? (
          <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-2.5 py-2 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-[#15382f] dark:text-slate-100">Current stage: {candidate.alignmentBand}</p>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Score {candidate.alignmentScore}</p>
            </div>
            <ol className="mt-2 space-y-2">
              {readinessLadderItems.map((item, index) => {
                const isCompleted = index < activeLadderIndex;
                const isCurrent = index === activeLadderIndex;
                const hasNextStep = index < readinessLadderItems.length - 1;

                return (
                  <li key={item.band} className="relative pl-7">
                    {hasNextStep ? (
                      <span
                        className={`absolute left-[9px] top-4 h-6 w-px ${index < activeLadderIndex ? 'bg-emerald-300 dark:bg-emerald-500/60' : 'bg-[#ccdad4] dark:bg-slate-700'}`}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={`absolute left-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                        isCurrent
                          ? 'bg-emerald-500 text-white'
                          : isCompleted
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100'
                            : 'bg-[#e8efeb] text-[#59736a] dark:bg-slate-800 dark:text-slate-300'
                      }`}
                      aria-hidden="true"
                    >
                      {isCompleted ? '✓' : index + 1}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-semibold ${isCurrent ? 'text-[#10372d] dark:text-slate-100' : 'text-[#3f5f54] dark:text-slate-300'}`}>
                        {item.band}
                      </p>
                      {isCurrent ? (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">Current</span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#4a665e] dark:text-slate-400">{item.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : alignmentProfileMode === 'scale' ? (
          <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-2.5 py-2 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-[#15382f] dark:text-slate-100">
                {candidate.alignmentBand} ({candidate.alignmentScore})
              </p>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Emerging to standout</p>
            </div>
            <div className="relative mt-2">
              <div className="flex h-3 overflow-hidden rounded-full bg-[#e2ece7] dark:bg-slate-700">
                <div className="h-full bg-rose-500" style={{ width: '12%' }} />
                <div className="h-full bg-amber-500" style={{ width: '18%' }} />
                <div className="h-full bg-teal-500" style={{ width: '25%' }} />
                <div className="h-full bg-emerald-400" style={{ width: '45%' }} />
              </div>
              <span
                className="absolute -top-1.5 h-6 w-0.5 -translate-x-1/2 rounded-full bg-[#102b23] dark:bg-slate-100"
                style={{ left: `${alignmentScore}%` }}
                aria-hidden="true"
              />
            </div>
            {showAlignmentLegend ? (
              <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-[#58736a] dark:text-slate-400">
                <span>Emerging</span>
                <span>Developing</span>
                <span>Ready</span>
                <span>Standout</span>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-40">
              <div className="h-[96px] w-full">
                <GaugeComponent
                  type="semicircle"
                  value={candidate.alignmentScore}
                  minValue={0}
                  maxValue={100}
                  marginInPercent={{ top: 0.04, bottom: 0.00, left: 0.07, right: 0.07 }}
                  arc={{
                    width: 0.22,
                    padding: 0.005,
                    cornerRadius: 4,
                    subArcs: [
                      { length: 0.12, color: '#f43f5e' },
                      { length: 0.18, color: '#f59e0b' },
                      { length: 0.25, color: '#14b8a6' },
                      { length: 0.45, color: '#12f987' }
                    ]
                  }}
                  pointer={{
                    type: 'needle',
                    length: 0.75,
                    width: 12,
                    animate: false,
                    strokeWidth: 0,
                    baseColor: '#dbeee5'
                  }}
                  labels={{
                    valueLabel: {
                      matchColorWithArc: false,
                      style: {
                        fontSize: '30px',
                        fontWeight: '700',
                        fill: '#000000',
                        textShadow: 'none'
                      }
                    },
                    tickLabels: {
                      hideMinMax: true,
                      ticks: [],
                      defaultTickLineConfig: { hide: true },
                      defaultTickValueConfig: { hide: true }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {showAlignmentLegend && alignmentProfileMode === 'gauge' ? (
          <div className="mt-0.5 flex flex-wrap items-center justify-center gap-1">
            {alignmentScaleItems.map((item) => {
              const isActiveBand = item.band === candidate.alignmentBand;

              return (
                <span
                  key={item.band}
                  className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActiveBand
                      ? 'bg-[#eaf7f2] text-[#164236] ring-1 ring-[#b8d9cc] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/40'
                      : 'bg-transparent text-[#58736a] ring-1 ring-[#d2e2db] dark:text-slate-400 dark:ring-slate-700'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${item.dotClassName}`} aria-hidden="true" />
                  {item.band}
                </span>
              );
            })}
          </div>
        ) : null}
        {candidate.topQualifyingReason ? (
          <div className="mt-2 rounded-xl border border-[#d4e1db] bg-[#f3fbf7] px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4c6860] dark:text-slate-400">
              Top qualifying reason
            </p>
            <p className="mt-1 text-xs leading-[1.55] text-[#1f3d34] dark:text-slate-200">
              {candidate.topQualifyingReason}
            </p>
            {showTopQualifyingReasonAction ? (
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#1b5847] transition-colors hover:text-[#0f3d31] dark:text-emerald-200 dark:hover:text-emerald-100"
                onClick={handleTopQualifyingReasonAction}
              >
                <span className="underline decoration-[#1b5847] decoration-[1.5px] underline-offset-[3px] dark:decoration-emerald-200">
                  {topQualifyingReasonActionLabel}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {showQualitativeSignals && candidate.qualitativeSignals ? (
        <div className="mt-3 rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3f5f54] dark:text-slate-400">Beyond the resume</p>
          <p className="mt-1 text-xs text-[#4a665e] dark:text-slate-300">
            Structured qualitative signal layered on top of capability scoring.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[candidate.qualitativeSignals.introVideo, candidate.qualitativeSignals.projectDemoVideo].map((video) => (
              <article
                key={`${candidate.fullName}-${video.label}`}
                className="rounded-xl border border-[#d4e1db] bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="text-sm font-semibold text-[#12392f] dark:text-slate-100">{video.label}</p>
                <p className="mt-0.5 text-xs text-[#4a665e] dark:text-slate-300">Duration {video.duration}</p>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="mt-2 w-full"
                  onClick={() => openSignalLink(video.url)}
                >
                  Open video
                </Button>
              </article>
            ))}
          </div>

          <div className="mt-3 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
              Reference contacts
            </p>
            {candidate.qualitativeSignals.references.map((reference) => (
              <article
                key={`${candidate.fullName}-${reference.email}`}
                className="rounded-xl border border-[#d4e1db] bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="text-sm font-semibold text-[#12392f] dark:text-slate-100">{reference.fullName}</p>
                <p className="text-xs text-[#4a665e] dark:text-slate-300">
                  {reference.role} · {reference.organization}
                </p>
                <p className="mt-2 text-xs italic leading-5 text-[#36544b] dark:text-slate-300">
                  &quot;{reference.quote}&quot;
                </p>
                <p className="mt-2 text-xs text-[#4a665e] dark:text-slate-300">
                  {anonymizedPreview ? 'Reveal candidate identity to access contact info.' : `${reference.email} · ${reference.phone}`}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {showInviteButton ? (
        <Button type="button" size="lg" className={`mt-4 w-full gap-2 ${inviteButtonClassName}`} onClick={onInvite}>
          <span>{invited ? 'Invite sent — send again' : (inviteButtonLabel ?? 'Invite to early conversation')}</span>
          {!invited ? (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          ) : null}
        </Button>
      ) : null}
    </Card>
  );
};
