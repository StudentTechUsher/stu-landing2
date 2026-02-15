import { useMemo, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type CapabilityKey = 'problemSolving' | 'dataCommunication' | 'executionReliability' | 'collaboration' | 'businessJudgment';

type CandidateSortKey =
  | 'alignment_desc'
  | 'alignment_asc'
  | 'problem_solving_desc'
  | 'communication_desc';

type CapabilityScores = Record<CapabilityKey, number>;

type Candidate = {
  id: string;
  fullName: string;
  anonymousLabel: string;
  university: string;
  targetRole: string;
  alignmentScore: number;
  capabilities: CapabilityScores;
};

const ALL_UNIVERSITIES = 'All universities';
const ALL_ROLES = 'All target roles';
const DEFAULT_CALENDAR_LINK = 'https://cal.com/stu/intro-call';

const capabilityDimensions = [
  { key: 'problemSolving', label: 'Problem solving' },
  { key: 'dataCommunication', label: 'Data communication' },
  { key: 'executionReliability', label: 'Execution reliability' },
  { key: 'collaboration', label: 'Collaboration' },
  { key: 'businessJudgment', label: 'Business judgment' }
] as const;

const sortOptions: Array<{ value: CandidateSortKey; label: string }> = [
  { value: 'alignment_desc', label: 'Highest alignment score' },
  { value: 'alignment_asc', label: 'Lowest alignment score' },
  { value: 'problem_solving_desc', label: 'Strongest problem solving' },
  { value: 'communication_desc', label: 'Strongest data communication' }
];

const candidatePool: Candidate[] = [
  {
    id: 'cand-1',
    fullName: 'Avery Park',
    anonymousLabel: 'Candidate 1042',
    university: 'Northeastern University',
    targetRole: 'Product Analyst',
    alignmentScore: 91,
    capabilities: {
      problemSolving: 93,
      dataCommunication: 89,
      executionReliability: 88,
      collaboration: 86,
      businessJudgment: 87
    }
  },
  {
    id: 'cand-2',
    fullName: 'Jordan Kim',
    anonymousLabel: 'Candidate 1187',
    university: 'Georgia Tech',
    targetRole: 'Data Analyst',
    alignmentScore: 87,
    capabilities: {
      problemSolving: 90,
      dataCommunication: 82,
      executionReliability: 85,
      collaboration: 78,
      businessJudgment: 80
    }
  },
  {
    id: 'cand-3',
    fullName: 'Taylor Singh',
    anonymousLabel: 'Candidate 1221',
    university: 'Arizona State University',
    targetRole: 'Associate Consultant',
    alignmentScore: 76,
    capabilities: {
      problemSolving: 79,
      dataCommunication: 75,
      executionReliability: 74,
      collaboration: 77,
      businessJudgment: 71
    }
  },
  {
    id: 'cand-4',
    fullName: 'Riley Carter',
    anonymousLabel: 'Candidate 1274',
    university: 'University of Michigan',
    targetRole: 'Data Analyst',
    alignmentScore: 72,
    capabilities: {
      problemSolving: 74,
      dataCommunication: 70,
      executionReliability: 73,
      collaboration: 69,
      businessJudgment: 68
    }
  },
  {
    id: 'cand-5',
    fullName: 'Morgan Nguyen',
    anonymousLabel: 'Candidate 1346',
    university: 'Purdue University',
    targetRole: 'Product Analyst',
    alignmentScore: 84,
    capabilities: {
      problemSolving: 83,
      dataCommunication: 85,
      executionReliability: 82,
      collaboration: 81,
      businessJudgment: 78
    }
  },
  {
    id: 'cand-6',
    fullName: 'Casey Brooks',
    anonymousLabel: 'Candidate 1410',
    university: 'University of Texas at Austin',
    targetRole: 'Associate Consultant',
    alignmentScore: 66,
    capabilities: {
      problemSolving: 68,
      dataCommunication: 64,
      executionReliability: 67,
      collaboration: 70,
      businessJudgment: 63
    }
  },
  {
    id: 'cand-7',
    fullName: 'Skyler Adams',
    anonymousLabel: 'Candidate 1492',
    university: 'Northeastern University',
    targetRole: 'Data Analyst',
    alignmentScore: 89,
    capabilities: {
      problemSolving: 88,
      dataCommunication: 86,
      executionReliability: 87,
      collaboration: 83,
      businessJudgment: 84
    }
  },
  {
    id: 'cand-8',
    fullName: 'Drew Morales',
    anonymousLabel: 'Candidate 1563',
    university: 'Georgia Tech',
    targetRole: 'Product Analyst',
    alignmentScore: 79,
    capabilities: {
      problemSolving: 81,
      dataCommunication: 80,
      executionReliability: 77,
      collaboration: 75,
      businessJudgment: 74
    }
  }
];

const getAlignmentBand = (alignmentScore: number) => {
  if (alignmentScore >= 85) return 'Standout';
  if (alignmentScore >= 70) return 'Ready';
  if (alignmentScore >= 55) return 'Developing';
  return 'Emerging';
};

const bandClassMap: Record<string, string> = {
  Standout: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100',
  Ready: 'bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-100',
  Developing: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100',
  Emerging: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-100'
};

export interface CandidateExplorerProps {
  defaultAnonymized?: boolean;
}

export const CandidateExplorer = ({ defaultAnonymized = false }: CandidateExplorerProps) => {
  const [selectedUniversity, setSelectedUniversity] = useState(ALL_UNIVERSITIES);
  const [selectedRole, setSelectedRole] = useState(ALL_ROLES);
  const [sortKey, setSortKey] = useState<CandidateSortKey>('alignment_desc');
  const [anonymizedPreview, setAnonymizedPreview] = useState(defaultAnonymized);

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(candidatePool[0]?.id ?? null);
  const [flaggedCandidateIds, setFlaggedCandidateIds] = useState<string[]>([]);
  const [invitedCandidateIds, setInvitedCandidateIds] = useState<string[]>([]);
  const [calendarSentCandidateIds, setCalendarSentCandidateIds] = useState<string[]>([]);

  const [calendarLinksByCandidateId, setCalendarLinksByCandidateId] = useState<Record<string, string>>({});
  const [calendarDraftByCandidateId, setCalendarDraftByCandidateId] = useState<Record<string, string>>({});
  const [notesByCandidateId, setNotesByCandidateId] = useState<Record<string, string[]>>({});
  const [noteDraftByCandidateId, setNoteDraftByCandidateId] = useState<Record<string, string>>({});
  const [activityByCandidateId, setActivityByCandidateId] = useState<Record<string, string[]>>({});

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const universities = useMemo(() => {
    return [ALL_UNIVERSITIES, ...new Set(candidatePool.map((candidate) => candidate.university))];
  }, []);

  const targetRoles = useMemo(() => {
    return [ALL_ROLES, ...new Set(candidatePool.map((candidate) => candidate.targetRole))];
  }, []);

  const filteredCandidates = useMemo(() => {
    const filtered = candidatePool.filter((candidate) => {
      const universityMatch = selectedUniversity === ALL_UNIVERSITIES || candidate.university === selectedUniversity;
      const roleMatch = selectedRole === ALL_ROLES || candidate.targetRole === selectedRole;
      return universityMatch && roleMatch;
    });

    const sorted = [...filtered];

    switch (sortKey) {
      case 'alignment_asc':
        sorted.sort((first, second) => first.alignmentScore - second.alignmentScore);
        break;
      case 'problem_solving_desc':
        sorted.sort((first, second) => second.capabilities.problemSolving - first.capabilities.problemSolving);
        break;
      case 'communication_desc':
        sorted.sort((first, second) => second.capabilities.dataCommunication - first.capabilities.dataCommunication);
        break;
      case 'alignment_desc':
      default:
        sorted.sort((first, second) => second.alignmentScore - first.alignmentScore);
        break;
    }

    return sorted;
  }, [selectedRole, selectedUniversity, sortKey]);

  const selectedCandidate = useMemo(() => {
    if (filteredCandidates.length === 0) return null;
    if (!selectedCandidateId) return filteredCandidates[0];

    return filteredCandidates.find((candidate) => candidate.id === selectedCandidateId) ?? filteredCandidates[0];
  }, [filteredCandidates, selectedCandidateId]);

  const calendarLinkDraft = selectedCandidate
    ? (calendarDraftByCandidateId[selectedCandidate.id] ?? calendarLinksByCandidateId[selectedCandidate.id] ?? DEFAULT_CALENDAR_LINK)
    : DEFAULT_CALENDAR_LINK;

  const noteDraft = selectedCandidate ? (noteDraftByCandidateId[selectedCandidate.id] ?? '') : '';

  const appendActivity = (candidateId: string, message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });

    const nextEntry = `${timestamp} · ${message}`;

    setActivityByCandidateId((current) => ({
      ...current,
      [candidateId]: [nextEntry, ...(current[candidateId] ?? [])].slice(0, 8)
    }));
  };

  const getDisplayName = (candidate: Candidate) => {
    return anonymizedPreview ? candidate.anonymousLabel : candidate.fullName;
  };

  const inviteCandidate = (candidate: Candidate) => {
    if (!invitedCandidateIds.includes(candidate.id)) {
      setInvitedCandidateIds((current) => [...current, candidate.id]);
    }

    appendActivity(candidate.id, 'Invited to early conversation');
    setStatusMessage(`Invite sent to ${getDisplayName(candidate)}.`);
  };

  const toggleFlagCandidate = () => {
    if (!selectedCandidate) return;

    const isFlagged = flaggedCandidateIds.includes(selectedCandidate.id);

    if (isFlagged) {
      setFlaggedCandidateIds((current) => current.filter((candidateId) => candidateId !== selectedCandidate.id));
      appendActivity(selectedCandidate.id, 'Removed early reach-out flag');
      setStatusMessage(`Removed reach-out flag for ${getDisplayName(selectedCandidate)}.`);
      return;
    }

    setFlaggedCandidateIds((current) => [...current, selectedCandidate.id]);
    appendActivity(selectedCandidate.id, 'Flagged for early reach-out');
    setStatusMessage(`Flagged ${getDisplayName(selectedCandidate)} for early reach-out.`);
  };

  const sendCalendarLink = () => {
    if (!selectedCandidate) return;

    const cleanLink = calendarLinkDraft.trim();

    if (cleanLink.length === 0) {
      setStatusMessage('Add a calendar URL before sending.');
      return;
    }

    if (!/^https?:\/\//i.test(cleanLink)) {
      setStatusMessage('Calendar link must start with http:// or https://');
      return;
    }

    setCalendarLinksByCandidateId((current) => ({
      ...current,
      [selectedCandidate.id]: cleanLink
    }));
    setCalendarDraftByCandidateId((current) => ({
      ...current,
      [selectedCandidate.id]: cleanLink
    }));

    if (!calendarSentCandidateIds.includes(selectedCandidate.id)) {
      setCalendarSentCandidateIds((current) => [...current, selectedCandidate.id]);
    }

    appendActivity(selectedCandidate.id, `Sent calendar link (${cleanLink})`);
    setStatusMessage(`Calendar link sent to ${getDisplayName(selectedCandidate)}.`);
  };

  const saveHiringTeamNote = () => {
    if (!selectedCandidate) return;

    const cleanNote = noteDraft.trim();

    if (cleanNote.length === 0) {
      setStatusMessage('Write a hiring team note before saving.');
      return;
    }

    setNotesByCandidateId((current) => ({
      ...current,
      [selectedCandidate.id]: [cleanNote, ...(current[selectedCandidate.id] ?? [])]
    }));

    appendActivity(selectedCandidate.id, 'Added hiring team note');
    setStatusMessage(`Saved hiring team note for ${getDisplayName(selectedCandidate)}.`);
    setNoteDraftByCandidateId((current) => ({
      ...current,
      [selectedCandidate.id]: ''
    }));
  };

  return (
    <section aria-labelledby="candidate-explorer-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="rounded-[32px] border border-[#cfddd6] bg-[#f8fcfa] p-6 shadow-[0_24px_54px_-36px_rgba(10,31,26,0.45)] dark:border-slate-700 dark:bg-slate-900/75">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4c6860] dark:text-slate-400">
              Candidate Explorer
            </p>
            <h2
              id="candidate-explorer-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-4xl"
            >
              Explore aligned talent before applications open
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#436059] dark:text-slate-300">
              Recruiters can sort candidate signals, compare capability breakdowns, and trigger early-conversation
              workflows from one unified pipeline screen.
            </p>
          </div>
          <Badge className="bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/35">
            Signal before applications
          </Badge>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
            University
            <select
              value={selectedUniversity}
              onChange={(event) => setSelectedUniversity(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            >
              {universities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
            Target role
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            >
              {targetRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
            Sort by
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as CandidateSortKey)}
              className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="inline-flex h-11 items-center gap-2 self-end rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm font-semibold text-[#1f4035] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
            <input
              type="checkbox"
              checked={anonymizedPreview}
              onChange={(event) => setAnonymizedPreview(event.target.checked)}
              className="h-4 w-4 accent-[#12f987]"
            />
            Anonymized preview
          </label>
        </div>

        <div className="mt-7 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <Card
            className="min-w-0 bg-white/95 p-5 dark:bg-slate-900/80 xl:h-full xl:flex xl:flex-col xl:[&>div:last-child]:min-h-0 xl:[&>div:last-child]:flex-1 xl:[&>div:last-child]:overflow-hidden"
            header={
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#55736a] dark:text-slate-400">
                    Candidate list
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">
                    {filteredCandidates.length} candidates in view
                  </h3>
                </div>
                <Badge>{sortOptions.find((option) => option.value === sortKey)?.label ?? 'Sorted'}</Badge>
              </div>
            }
          >
            {filteredCandidates.length === 0 ? (
              <p className="rounded-xl border border-dashed border-[#c8d7d1] bg-[#f7fcf9] px-4 py-6 text-sm text-[#4f6a62] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                No candidates match this filter set. Adjust university, role, or sort to continue exploring.
              </p>
            ) : (
              <div className="max-h-[52rem] min-h-0 space-y-3 overflow-y-auto pr-1 xl:h-full xl:max-h-none">
                {filteredCandidates.map((candidate) => {
                  const isSelected = selectedCandidate?.id === candidate.id;
                  const isInvited = invitedCandidateIds.includes(candidate.id);
                  const isFlagged = flaggedCandidateIds.includes(candidate.id);
                  const band = getAlignmentBand(candidate.alignmentScore);

                  return (
                    <article
                      key={candidate.id}
                      className={`rounded-2xl border px-4 py-3 transition-colors ${
                        isSelected
                          ? 'border-[#0fd978] bg-[#ecfff5] dark:border-emerald-500 dark:bg-emerald-500/10'
                          : 'border-[#d5e1db] bg-[#f9fdfb] dark:border-slate-700 dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#0f2b23] dark:text-slate-100">{getDisplayName(candidate)}</p>
                          <p className="mt-0.5 text-xs text-[#4c6860] dark:text-slate-400">
                            {candidate.targetRole} · {anonymizedPreview ? 'University hidden in preview' : candidate.university}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={bandClassMap[band]}>{band}</Badge>
                          <p className="mt-1 text-xs font-semibold text-[#1a3f33] dark:text-slate-200">
                            Alignment {candidate.alignmentScore}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                        {capabilityDimensions.map((dimension) => {
                          const score = candidate.capabilities[dimension.key];

                          return (
                            <div
                              key={`${candidate.id}-${dimension.key}`}
                              className="rounded-lg border border-[#d7e3dd] bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-950"
                            >
                              <div className="flex items-center justify-between text-[11px] text-[#3f5b53] dark:text-slate-300">
                                <span>{dimension.label}</span>
                                <span className="font-semibold text-[#163b30] dark:text-slate-100">{score}</span>
                              </div>
                              <div className="mt-1 h-1.5 rounded-full bg-[#dbe7e1] dark:bg-slate-700">
                                <div className="h-full rounded-full bg-[#12f987]" style={{ width: `${score}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button type="button" variant="secondary" size="sm" onClick={() => setSelectedCandidateId(candidate.id)}>
                          {isSelected ? 'Viewing details' : 'View details'}
                        </Button>
                        <Button type="button" size="sm" onClick={() => inviteCandidate(candidate)}>
                          {isInvited ? 'Re-send invite' : 'Invite to early conversation'}
                        </Button>
                        {isFlagged ? (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100">
                            Reach-out flagged
                          </Badge>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </Card>

          <div className="min-w-0 space-y-4 xl:sticky xl:top-6 xl:self-start">
            <Card
              className="bg-white/95 dark:bg-slate-900/80"
              header={
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#55736a] dark:text-slate-400">
                    Candidate detail
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">
                    {selectedCandidate ? getDisplayName(selectedCandidate) : 'No candidate selected'}
                  </h3>
                </div>
              }
            >
              {selectedCandidate ? (
                <>
                  <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#15382f] dark:text-slate-100">
                        Alignment score: {selectedCandidate.alignmentScore}
                      </p>
                      <Badge className={bandClassMap[getAlignmentBand(selectedCandidate.alignmentScore)]}>
                        {getAlignmentBand(selectedCandidate.alignmentScore)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-[#4a665e] dark:text-slate-300">
                      {selectedCandidate.targetRole} ·{' '}
                      {anonymizedPreview ? 'Identity and university masked while preview mode is on.' : selectedCandidate.university}
                    </p>
                  </div>

                  <div className="mt-3 space-y-2">
                    {capabilityDimensions.map((dimension) => {
                      const score = selectedCandidate.capabilities[dimension.key];

                      return (
                        <div
                          key={`detail-${dimension.key}`}
                          className="rounded-xl border border-[#d4e1db] bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                        >
                          <div className="mb-1 flex items-center justify-between text-xs font-medium text-[#436059] dark:text-slate-300">
                            <span>{dimension.label}</span>
                            <span className="font-semibold text-[#123b30] dark:text-slate-100">{score}</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#dbe7e1] dark:bg-slate-700">
                            <div className="h-full rounded-full bg-[#12f987]" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Button type="button" className="mt-4 w-full" onClick={() => inviteCandidate(selectedCandidate)}>
                    {invitedCandidateIds.includes(selectedCandidate.id)
                      ? 'Invite sent - send again'
                      : 'Invite to early conversation'}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-[#4a655d] dark:text-slate-300">Choose a candidate from the list to view details and actions.</p>
              )}
            </Card>

            <Card
              className="bg-white/95 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Recruiter actions</h3>}
            >
              {selectedCandidate ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" size="sm" onClick={toggleFlagCandidate}>
                      {flaggedCandidateIds.includes(selectedCandidate.id)
                        ? 'Remove early reach-out flag'
                        : 'Flag for early reach-out'}
                    </Button>
                    {calendarSentCandidateIds.includes(selectedCandidate.id) ? (
                      <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-100">Calendar sent</Badge>
                    ) : null}
                  </div>

                  <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                    Send calendar link
                    <div className="mt-2 flex gap-2">
                      <input
                        value={calendarLinkDraft}
                        onChange={(event) => {
                          if (!selectedCandidate) return;
                          setCalendarDraftByCandidateId((current) => ({
                            ...current,
                            [selectedCandidate.id]: event.target.value
                          }));
                        }}
                        className="h-10 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="https://calendar.example.com/recruiter"
                      />
                      <Button type="button" size="sm" onClick={sendCalendarLink}>
                        Send
                      </Button>
                    </div>
                  </label>

                  <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                    Hiring team notes
                    <textarea
                      value={noteDraft}
                      onChange={(event) => {
                        if (!selectedCandidate) return;
                        setNoteDraftByCandidateId((current) => ({
                          ...current,
                          [selectedCandidate.id]: event.target.value
                        }));
                      }}
                      className="mt-2 min-h-24 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 py-2 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                      placeholder="Attach notes from interviewers, panel feedback, or competency concerns."
                    />
                  </label>

                  <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={saveHiringTeamNote}>
                    Save note
                  </Button>

                  <div className="mt-4 space-y-2 rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Saved notes</p>
                    {(notesByCandidateId[selectedCandidate.id] ?? []).length === 0 ? (
                      <p className="text-xs text-[#4a655d] dark:text-slate-300">No notes attached yet.</p>
                    ) : (
                      (notesByCandidateId[selectedCandidate.id] ?? []).map((note, index) => (
                        <p key={`${selectedCandidate.id}-note-${index}`} className="text-xs leading-5 text-[#3f5b53] dark:text-slate-300">
                          {note}
                        </p>
                      ))
                    )}
                  </div>

                  {statusMessage ? (
                    <p className="mt-4 rounded-xl border border-[#cde0d8] bg-[#f4faf7] px-3 py-2 text-xs font-medium text-[#44645b] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      {statusMessage}
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="text-sm text-[#4a655d] dark:text-slate-300">Select a candidate to enable recruiter action flows.</p>
              )}
            </Card>

            <Card
              className="bg-white/95 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Activity log</h3>}
            >
              {selectedCandidate ? (
                <div className="space-y-2">
                  {(activityByCandidateId[selectedCandidate.id] ?? []).length === 0 ? (
                    <p className="text-xs text-[#4a655d] dark:text-slate-300">No recruiter actions captured for this candidate yet.</p>
                  ) : (
                    (activityByCandidateId[selectedCandidate.id] ?? []).map((entry, index) => (
                      <p
                        key={`${selectedCandidate.id}-activity-${index}`}
                        className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] px-3 py-2 text-xs leading-5 text-[#3f5b53] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {entry}
                      </p>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#4a655d] dark:text-slate-300">Activity appears after a candidate is selected.</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
