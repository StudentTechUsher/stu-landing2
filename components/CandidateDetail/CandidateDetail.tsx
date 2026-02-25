import dynamic from 'next/dynamic';
import defaultCandidateAvatar from '../../public/images/Gemini_Generated_Image_2jzqqj2jzqqj2jzq.png';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false
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
    { label: 'Business judgment', score: 87 }
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
        <div className="flex justify-center">
          <div className="w-40">
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
        {showAlignmentLegend ? (
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
