import defaultCandidateAvatar from '../../public/images/Gemini_Generated_Image_2jzqqj2jzqqj2jzq.png';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export type CandidateAlignmentBand = 'Standout' | 'Ready' | 'Developing' | 'Emerging';

const bandClassMap: Record<CandidateAlignmentBand, string> = {
  Standout: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100',
  Ready: 'bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-100',
  Developing: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100',
  Emerging: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-100'
};

type CapabilityScore = { label: string; score: number };

export type CandidateDetailRecord = {
  fullName: string;
  anonymousLabel: string;
  targetRole: string;
  university: string;
  alignmentScore: number;
  alignmentBand: CandidateAlignmentBand;
  metadataTags: string[];
  capabilities: CapabilityScore[];
  avatarSrc?: string;
};

export interface CandidateDetailProps {
  candidate?: CandidateDetailRecord;
  anonymizedPreview?: boolean;
  showInviteButton?: boolean;
  invited?: boolean;
  onInvite?: () => void;
  className?: string;
}

export const defaultCandidateDetail: CandidateDetailRecord = {
  fullName: 'Avery Park',
  anonymousLabel: 'Candidate 1042',
  targetRole: 'Product Analyst',
  university: 'Brigham Young University',
  alignmentScore: 91,
  alignmentBand: 'Standout',
  metadataTags: [
    'Annual Case Study Competition Finalist',
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
  ]
};

export const CandidateDetail = ({
  candidate = defaultCandidateDetail,
  anonymizedPreview = false,
  showInviteButton = true,
  invited = false,
  onInvite,
  className = ''
}: CandidateDetailProps) => {
  const displayName = anonymizedPreview ? candidate.anonymousLabel : candidate.fullName;
  const avatarSrc = candidate.avatarSrc ?? defaultCandidateAvatar.src;

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
            <h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">{displayName}</h3>
          </div>
        </div>
      }
    >
      <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3f5f54] dark:text-slate-400">
            Alignment signal
          </p>
          <div className="flex items-center gap-2">
            <Badge className={bandClassMap[candidate.alignmentBand]}>{candidate.alignmentBand}</Badge>
            <p className="text-sm font-semibold text-[#15382f] dark:text-slate-100">Score {candidate.alignmentScore}</p>
          </div>
        </div>
        <p className="mt-1 text-xs text-[#4a665e] dark:text-slate-300">
          {candidate.targetRole} · {anonymizedPreview ? 'Identity and university masked while preview mode is on.' : candidate.university}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {candidate.metadataTags.map((tag) => (
            <Badge
              key={`${candidate.fullName}-${tag}`}
              className="bg-[#eaf7f2] text-[#1f4a3c] ring-1 ring-[#c4ddd1] dark:bg-emerald-500/10 dark:text-emerald-100 dark:ring-emerald-400/30"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
          Supporting capability detail
        </p>
        <div className="space-y-2">
          {candidate.capabilities.map((capability) => (
            <div
              key={`${candidate.fullName}-${capability.label}`}
              className="rounded-xl border border-[#d4e1db] bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-1 flex items-center justify-between text-xs font-medium text-[#436059] dark:text-slate-300">
                <span>{capability.label}</span>
                <span className="font-semibold text-[#123b30] dark:text-slate-100">{capability.score}</span>
              </div>
              <div className="h-2 rounded-full bg-[#dbe7e1] dark:bg-slate-700">
                <div className="h-full rounded-full bg-[#12f987]" style={{ width: `${capability.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showInviteButton ? (
        <Button type="button" className="mt-4 w-full" onClick={onInvite}>
          {invited ? 'Invite sent - send again' : 'Invite to early conversation'}
        </Button>
      ) : null}
    </Card>
  );
};
