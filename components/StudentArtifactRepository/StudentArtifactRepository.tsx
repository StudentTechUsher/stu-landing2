import { type ChangeEvent, useMemo, useRef, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type ArtifactType = 'coursework' | 'project' | 'certification' | 'leadership' | 'competition' | 'test';
type ArtifactFilter = 'all' | ArtifactType;
type ProfileLinkKey = 'linkedin' | 'handshake' | 'github' | 'otherRepo';

type ArtifactTag =
  | 'Technical depth'
  | 'Applied execution'
  | 'Collaboration signal'
  | 'Systems thinking'
  | 'Communication signal'
  | 'Reliability signal';

type ArtifactRecord = {
  id: string;
  title: string;
  type: ArtifactType;
  source: string;
  description: string;
  link?: string;
  attachmentName?: string;
  tags: ArtifactTag[];
  updatedAt: string;
};

const artifactTypes: Array<{ id: ArtifactType; label: string }> = [
  { id: 'coursework', label: 'Coursework' },
  { id: 'project', label: 'Projects' },
  { id: 'certification', label: 'Certifications' },
  { id: 'leadership', label: 'Clubs / leadership' },
  { id: 'competition', label: 'Competitions' },
  { id: 'test', label: 'Test evidence' }
];

const artifactTagOptions: ArtifactTag[] = [
  'Technical depth',
  'Applied execution',
  'Collaboration signal',
  'Systems thinking',
  'Communication signal',
  'Reliability signal'
];

const artifactTypeLabelMap: Record<ArtifactType, string> = {
  coursework: 'Coursework',
  project: 'Project',
  certification: 'Certification',
  leadership: 'Leadership',
  competition: 'Competition',
  test: 'Test evidence'
};

const artifactTypeSourcePreset: Record<ArtifactType, string> = {
  coursework: 'SIS sync',
  project: 'GitHub',
  certification: 'Certification upload',
  leadership: 'Activity record',
  competition: 'Competition record',
  test: 'Performance score report'
};

const artifactTypeTagPreset: Record<ArtifactType, ArtifactTag[]> = {
  coursework: ['Technical depth', 'Systems thinking'],
  project: ['Applied execution', 'Technical depth'],
  certification: ['Technical depth', 'Reliability signal'],
  leadership: ['Collaboration signal', 'Communication signal'],
  competition: ['Applied execution', 'Collaboration signal'],
  test: ['Reliability signal', 'Systems thinking']
};

const artifactTypeToneClass: Record<ArtifactType, string> = {
  coursework: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-100',
  project: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100',
  certification: 'bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-100',
  leadership: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100',
  competition: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/20 dark:text-fuchsia-100',
  test: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
};

const tagToneClass: Record<ArtifactTag, string> = {
  'Technical depth': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100',
  'Applied execution': 'bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-100',
  'Collaboration signal': 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100',
  'Systems thinking': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-100',
  'Communication signal': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-100',
  'Reliability signal': 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
};

const profileLinkLabelMap: Record<ProfileLinkKey, string> = {
  linkedin: 'LinkedIn',
  handshake: 'Handshake',
  github: 'GitHub',
  otherRepo: 'Other repo'
};

const initialArtifacts: ArtifactRecord[] = [
  {
    id: 'artifact-1',
    title: 'Database Systems (A-)',
    type: 'coursework',
    source: 'SIS sync',
    description: 'Course transcript record with schema design and optimization modules completed.',
    tags: ['Technical depth', 'Systems thinking'],
    updatedAt: 'Feb 12, 2026'
  },
  {
    id: 'artifact-2',
    title: 'Pipeline Monitoring Project',
    type: 'project',
    source: 'GitHub',
    description: 'End-to-end data ingestion repo with alerting and retry strategy documentation.',
    link: 'https://github.com/student/pipeline-monitoring',
    tags: ['Applied execution', 'Technical depth', 'Reliability signal'],
    updatedAt: 'Feb 10, 2026'
  },
  {
    id: 'artifact-3',
    title: 'AWS Cloud Practitioner',
    type: 'certification',
    source: 'Certification upload',
    description: 'Credential verification uploaded from provider score report.',
    attachmentName: 'aws-cloud-practitioner-report.pdf',
    tags: ['Technical depth', 'Reliability signal'],
    updatedAt: 'Jan 30, 2026'
  },
  {
    id: 'artifact-4',
    title: 'Data Club Lead - Spring Cohort',
    type: 'leadership',
    source: 'Activity record',
    description: 'Led weekly sessions, coordinated peer mentors, and facilitated project demos.',
    tags: ['Collaboration signal', 'Communication signal'],
    updatedAt: 'Feb 3, 2026'
  },
  {
    id: 'artifact-5',
    title: 'Benchmark Challenge Percentile 82',
    type: 'test',
    source: 'Performance score report',
    description: 'Timed systems reasoning benchmark with percentile and rubric breakdown.',
    tags: ['Systems thinking', 'Reliability signal'],
    updatedAt: 'Feb 7, 2026'
  },
  {
    id: 'artifact-6',
    title: 'Campus Hackathon Finalist',
    type: 'competition',
    source: 'Competition record',
    description: 'Built and presented a team prototype under 24-hour product constraints.',
    tags: ['Applied execution', 'Collaboration signal', 'Communication signal'],
    updatedAt: 'Feb 14, 2026'
  }
];

const formatDate = () =>
  new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

export const StudentArtifactRepository = () => {
  const [artifacts, setArtifacts] = useState(initialArtifacts);
  const [activeFilter, setActiveFilter] = useState<ArtifactFilter>('all');
  const [selectedArtifactId, setSelectedArtifactId] = useState(initialArtifacts[0]?.id ?? null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [profileLinks, setProfileLinks] = useState<Record<ProfileLinkKey, string>>({
    linkedin: '',
    handshake: '',
    github: '',
    otherRepo: ''
  });
  const [getToKnowVideoName, setGetToKnowVideoName] = useState('');
  const [projectDemoVideoNames, setProjectDemoVideoNames] = useState<string[]>([]);

  const [draftType, setDraftType] = useState<ArtifactType>('coursework');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftSource, setDraftSource] = useState(artifactTypeSourcePreset.coursework);
  const [draftDescription, setDraftDescription] = useState('');
  const [draftLink, setDraftLink] = useState('');
  const [draftAttachmentName, setDraftAttachmentName] = useState('');
  const documentInputRef = useRef<HTMLInputElement | null>(null);
  const getToKnowVideoInputRef = useRef<HTMLInputElement | null>(null);
  const projectDemoVideoInputRef = useRef<HTMLInputElement | null>(null);
  const calculatedDraftTags = artifactTypeTagPreset[draftType];

  const filteredArtifacts = useMemo(() => {
    if (activeFilter === 'all') return artifacts;
    return artifacts.filter((artifact) => artifact.type === activeFilter);
  }, [activeFilter, artifacts]);

  const selectedArtifact = useMemo(() => {
    if (!selectedArtifactId) return filteredArtifacts[0] ?? artifacts[0] ?? null;
    return artifacts.find((artifact) => artifact.id === selectedArtifactId) ?? filteredArtifacts[0] ?? artifacts[0] ?? null;
  }, [artifacts, filteredArtifacts, selectedArtifactId]);

  const signalCoverage = useMemo(() => {
    return artifactTagOptions
      .map((tag) => ({
        tag,
        count: artifacts.filter((artifact) => artifact.tags.includes(tag)).length
      }))
      .sort((first, second) => second.count - first.count);
  }, [artifacts]);

  const maxTagCount = useMemo(() => {
    return Math.max(...signalCoverage.map((item) => item.count), 1);
  }, [signalCoverage]);

  const connectedProfileEntries = useMemo(() => {
    return (Object.entries(profileLinks) as Array<[ProfileLinkKey, string]>).filter(([, value]) => value.trim().length > 0);
  }, [profileLinks]);

  const handleDraftTypeChange = (nextType: ArtifactType) => {
    setDraftType(nextType);
    setDraftSource(artifactTypeSourcePreset[nextType]);
    setDraftLink('');
  };

  const handleDocumentSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setDraftAttachmentName(file.name);
    setStatusMessage(`Attached document: ${file.name}.`);
  };

  const handleProfileLinkChange = (key: ProfileLinkKey, value: string) => {
    setProfileLinks((current) => ({
      ...current,
      [key]: value
    }));
  };

  const handleGetToKnowVideoSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setGetToKnowVideoName(file.name);
    setStatusMessage(`Uploaded Get to Know You video: ${file.name}.`);
  };

  const handleProjectDemoVideoSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;
    const incomingNames = files.map((file) => file.name);
    setProjectDemoVideoNames((current) => {
      const next = new Set([...current, ...incomingNames]);
      return Array.from(next);
    });
    setStatusMessage(`Uploaded ${incomingNames.length} project demo video${incomingNames.length === 1 ? '' : 's'}.`);
  };

  const addArtifact = () => {
    if (draftTitle.trim().length < 2) {
      setStatusMessage('Add an artifact title before saving.');
      return;
    }

    const newArtifact: ArtifactRecord = {
      id: `artifact-${Date.now()}`,
      title: draftTitle.trim(),
      type: draftType,
      source: draftSource.trim() || artifactTypeSourcePreset[draftType],
      description: draftDescription.trim() || 'Student-linked evidence artifact.',
      link: draftLink.trim().length > 0 ? draftLink.trim() : undefined,
      attachmentName: draftAttachmentName.trim().length > 0 ? draftAttachmentName.trim() : undefined,
      tags: [...calculatedDraftTags],
      updatedAt: formatDate()
    };

    setArtifacts((current) => [newArtifact, ...current]);
    setSelectedArtifactId(newArtifact.id);
    setStatusMessage(`Added artifact: ${newArtifact.title}.`);

    setDraftTitle('');
    setDraftDescription('');
    setDraftLink('');
    setDraftAttachmentName('');
    if (documentInputRef.current) {
      documentInputRef.current.value = '';
    }
  };

  const syncCoursework = () => {
    setStatusMessage('SIS coursework sync requested. Updated records will appear as synced artifact cards.');
  };

  const importCourseworkCSV = () => {
    setStatusMessage('CSV coursework import staged. Validate column mapping to finalize ingestion.');
  };

  const connectGithub = () => {
    setProfileLinks((current) => ({
      ...current,
      github: current.github || 'https://github.com/username'
    }));
    setStatusMessage('GitHub link flow started. New project artifacts will be suggested after repository scan.');
  };

  const connectLinkedIn = () => {
    setProfileLinks((current) => ({
      ...current,
      linkedin: current.linkedin || 'https://linkedin.com/in/username'
    }));
    setStatusMessage('LinkedIn profile connected. Leadership and competition entries can now be imported as artifacts.');
  };

  const connectHandshake = () => {
    setProfileLinks((current) => ({
      ...current,
      handshake: current.handshake || 'https://joinhandshake.com/stu-profile'
    }));
    setStatusMessage('Handshake profile connected. Experience and applications can now be referenced as evidence.');
  };

  const connectOtherRepo = () => {
    setProfileLinks((current) => ({
      ...current,
      otherRepo: current.otherRepo || 'https://gitlab.com/username/project'
    }));
    setStatusMessage('Additional project repository connected. External code evidence is now linkable.');
  };

  const saveExternalLinks = () => {
    if (connectedProfileEntries.length === 0) {
      setStatusMessage('Add at least one profile or repository link before saving.');
      return;
    }

    setStatusMessage(`Saved ${connectedProfileEntries.length} connected profile source${connectedProfileEntries.length === 1 ? '' : 's'}.`);
  };

  return (
    <section aria-labelledby="student-artifact-repository-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="rounded-[32px] border border-[#cfddd6] bg-[#f8fcfa] p-6 shadow-[0_24px_54px_-36px_rgba(10,31,26,0.45)] dark:border-slate-700 dark:bg-slate-900/75">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4c6860] dark:text-slate-400">
              Student artifact repository
            </p>
            <h2
              id="student-artifact-repository-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-[#0a1f1a] dark:text-slate-100 md:text-4xl"
            >
              Collect evidence that powers capability signals
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#436059] dark:text-slate-300">
              Upload or link coursework, projects, certifications, leadership records, competitions, and test
              evidence. Each artifact is tagged so your capability progress reflects real, reviewable proof.
            </p>
          </div>
          <Badge className="bg-[#e9fef3] text-[#0a402d] ring-1 ring-[#b8e9ce] dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-400/35">
            Evidence-driven pathways
          </Badge>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={syncCoursework}>
            Sync SIS coursework
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={importCourseworkCSV}>
            Import coursework CSV
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={connectGithub}>
            Connect GitHub
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={connectLinkedIn}>
            Connect LinkedIn
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={connectHandshake}>
            Connect Handshake
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={connectOtherRepo}>
            Connect other repo
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              activeFilter === 'all'
                ? 'border-[#0fd978] bg-[#12f987] text-[#0a1f1a]'
                : 'border-[#c4d5ce] bg-white text-[#3a574e] hover:bg-[#eff6f2] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            All artifacts
          </button>
          {artifactTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setActiveFilter(type.id)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                activeFilter === type.id
                  ? 'border-[#0fd978] bg-[#12f987] text-[#0a1f1a]'
                  : 'border-[#c4d5ce] bg-white text-[#3a574e] hover:bg-[#eff6f2] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <Card
            className="bg-white/95 p-5 dark:bg-slate-900/80 xl:h-full xl:flex xl:flex-col xl:[&>div:last-child]:min-h-0 xl:[&>div:last-child]:flex-1 xl:[&>div:last-child]:overflow-hidden"
            header={
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#55736a] dark:text-slate-400">
                    Artifact cards
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">
                    {filteredArtifacts.length} artifacts in view
                  </h3>
                </div>
                <Badge>{activeFilter === 'all' ? 'All types' : artifactTypeLabelMap[activeFilter]}</Badge>
              </div>
            }
          >
            {filteredArtifacts.length === 0 ? (
              <p className="rounded-xl border border-dashed border-[#c8d7d1] bg-[#f7fcf9] px-4 py-6 text-sm text-[#4f6a62] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                No artifacts for this filter yet. Add or link one from the panel on the right.
              </p>
            ) : (
              <div className="max-h-[56rem] min-h-0 space-y-3 overflow-y-auto pr-1 xl:h-full xl:max-h-none">
                {filteredArtifacts.map((artifact) => {
                  const isSelected = selectedArtifact?.id === artifact.id;

                  return (
                    <article
                      key={artifact.id}
                      className={`rounded-2xl border px-4 py-3 transition-colors ${
                        isSelected
                          ? 'border-[#0fd978] bg-[#ecfff5] dark:border-emerald-500 dark:bg-emerald-500/10'
                          : 'border-[#d5e1db] bg-[#f9fdfb] dark:border-slate-700 dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-[#0f2b23] dark:text-slate-100">{artifact.title}</p>
                          <p className="mt-0.5 text-xs text-[#4c6860] dark:text-slate-400">
                            {artifact.source} · Updated {artifact.updatedAt}
                          </p>
                        </div>
                        <Badge className={artifactTypeToneClass[artifact.type]}>{artifactTypeLabelMap[artifact.type]}</Badge>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[#48635b] dark:text-slate-300">{artifact.description}</p>

                      {artifact.attachmentName ? (
                        <p className="mt-1 text-xs font-medium text-[#3f5d54] dark:text-slate-300">
                          Document attached: {artifact.attachmentName}
                        </p>
                      ) : null}

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {artifact.tags.map((tag) => (
                          <span
                            key={`${artifact.id}-${tag}`}
                            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${tagToneClass[tag]}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button type="button" variant="secondary" size="sm" onClick={() => setSelectedArtifactId(artifact.id)}>
                          {isSelected ? 'Viewing details' : 'View details'}
                        </Button>
                        {artifact.link ? (
                          <a
                            href={artifact.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm font-semibold text-[#21453a] transition-colors hover:bg-[#eef5f2] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            Open link
                          </a>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </Card>

          <div className="space-y-4">
            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Profile links and video uploads</h3>}
            >
              <p className="text-xs leading-5 text-[#4f6a62] dark:text-slate-300">
                Link external profiles and repositories recruiters already use, then upload short videos for human signal.
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  LinkedIn URL
                  <input
                    value={profileLinks.linkedin}
                    onChange={(event) => handleProfileLinkChange('linkedin', event.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Handshake URL
                  <input
                    value={profileLinks.handshake}
                    onChange={(event) => handleProfileLinkChange('handshake', event.target.value)}
                    placeholder="https://joinhandshake.com/..."
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  GitHub URL
                  <input
                    value={profileLinks.github}
                    onChange={(event) => handleProfileLinkChange('github', event.target.value)}
                    placeholder="https://github.com/username"
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Other project repo
                  <input
                    value={profileLinks.otherRepo}
                    onChange={(event) => handleProfileLinkChange('otherRepo', event.target.value)}
                    placeholder="GitLab / Bitbucket / other"
                    className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={connectLinkedIn}>
                  Auto-fill LinkedIn
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={connectHandshake}>
                  Auto-fill Handshake
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={connectGithub}>
                  Auto-fill GitHub
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={connectOtherRepo}>
                  Auto-fill other repo
                </Button>
              </div>

              <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={saveExternalLinks}>
                Save linked profiles
              </Button>

              <div className="mt-4 border-t border-[#dfe8e3] pt-4 dark:border-slate-700">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Video evidence</p>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-sm font-semibold text-[#12392f] dark:text-slate-100">Get to Know You video</p>
                    <p className="mt-1 text-xs text-[#48635b] dark:text-slate-300">Recommended: 60-90 seconds.</p>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-3"
                      onClick={() => getToKnowVideoInputRef.current?.click()}
                    >
                      Upload intro video
                    </Button>
                    <p className="mt-2 text-xs text-[#48635b] dark:text-slate-300">
                      {getToKnowVideoName || 'No intro video uploaded yet.'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-sm font-semibold text-[#12392f] dark:text-slate-100">Project demo videos</p>
                    <p className="mt-1 text-xs text-[#48635b] dark:text-slate-300">Upload one or more walkthrough clips.</p>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-3"
                      onClick={() => projectDemoVideoInputRef.current?.click()}
                    >
                      Upload project demos
                    </Button>
                    <p className="mt-2 text-xs text-[#48635b] dark:text-slate-300">
                      {projectDemoVideoNames.length === 0
                        ? 'No demo videos uploaded yet.'
                        : `${projectDemoVideoNames.length} project demo video${projectDemoVideoNames.length === 1 ? '' : 's'} uploaded.`}
                    </p>
                    {projectDemoVideoNames.length > 0 ? (
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[#48635b] dark:text-slate-300">
                        {projectDemoVideoNames.map((videoName) => (
                          <li key={videoName}>{videoName}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>

                <input
                  ref={getToKnowVideoInputRef}
                  type="file"
                  className="sr-only"
                  accept="video/*"
                  onChange={handleGetToKnowVideoSelect}
                />
                <input
                  ref={projectDemoVideoInputRef}
                  type="file"
                  className="sr-only"
                  accept="video/*"
                  multiple
                  onChange={handleProjectDemoVideoSelect}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {connectedProfileEntries.length === 0 ? (
                  <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">No profile links saved</Badge>
                ) : (
                  connectedProfileEntries.map(([key]) => <Badge key={`connected-${key}`}>{profileLinkLabelMap[key]} linked</Badge>)
                )}
              </div>
            </Card>

            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Artifact detail</h3>}
            >
              {selectedArtifact ? (
                <>
                  <div className="rounded-xl border border-[#d4e1db] bg-[#f8fcfa] p-3 dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#15382f] dark:text-slate-100">{selectedArtifact.title}</p>
                      <Badge className={artifactTypeToneClass[selectedArtifact.type]}>{artifactTypeLabelMap[selectedArtifact.type]}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-[#4a665e] dark:text-slate-300">
                      {selectedArtifact.source} · Updated {selectedArtifact.updatedAt}
                    </p>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#48635b] dark:text-slate-300">{selectedArtifact.description}</p>

                  {selectedArtifact.attachmentName ? (
                    <p className="mt-2 text-xs font-medium text-[#3f5d54] dark:text-slate-300">
                      Document attached: {selectedArtifact.attachmentName}
                    </p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selectedArtifact.tags.map((tag) => (
                      <span key={`detail-${tag}`} className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${tagToneClass[tag]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-[#4a655d] dark:text-slate-300">Select an artifact card to inspect details.</p>
              )}
            </Card>

            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Add or link artifact</h3>}
            >
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Artifact type
                <select
                  value={draftType}
                  onChange={(event) => handleDraftTypeChange(event.target.value as ArtifactType)}
                  className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                >
                  {artifactTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Title
                <input
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  placeholder="Artifact title"
                  className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>

              <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Source
                <input
                  value={draftSource}
                  onChange={(event) => setDraftSource(event.target.value)}
                  placeholder="SIS sync / GitHub / portfolio"
                  className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>

              <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Link (optional)
                <input
                  value={draftLink}
                  onChange={(event) => setDraftLink(event.target.value)}
                  placeholder="https://..."
                  className="mt-2 h-11 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                  Document (optional)
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={() => documentInputRef.current?.click()}>
                    Upload document
                  </Button>
                  {draftAttachmentName ? (
                    <span className="text-xs font-medium text-[#3f5d54] dark:text-slate-300">{draftAttachmentName}</span>
                  ) : (
                    <span className="text-xs text-[#557168] dark:text-slate-400">No document selected</span>
                  )}
                </div>
                <input
                  ref={documentInputRef}
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.txt,.rtf,.md,.csv,.ppt,.pptx"
                  onChange={handleDocumentSelect}
                />
              </div>

              <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">
                Description
                <textarea
                  value={draftDescription}
                  onChange={(event) => setDraftDescription(event.target.value)}
                  className="mt-2 min-h-20 w-full rounded-xl border border-[#bfd2ca] bg-white px-3 py-2 text-sm text-[#0a1f1a] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4f6a62] dark:text-slate-400">Capability signal tags</p>
                <p className="mt-2 text-xs leading-5 text-[#4f6a62] dark:text-slate-300">
                  Calculated automatically by the signal model based on artifact type and evidence content.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {calculatedDraftTags.map((tag) => (
                    <span key={`draft-${tag}`} className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${tagToneClass[tag]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Button type="button" className="mt-4" onClick={addArtifact}>
                Add artifact card
              </Button>

              {statusMessage ? (
                <p className="mt-4 rounded-xl border border-[#cde0d8] bg-[#f4faf7] px-3 py-2 text-xs font-medium text-[#44645b] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {statusMessage}
                </p>
              ) : null}
            </Card>

            <Card
              className="bg-white/95 p-5 dark:bg-slate-900/80"
              header={<h3 className="text-xl font-semibold text-[#0a1f1a] dark:text-slate-100">Signal coverage summary</h3>}
            >
              <div className="space-y-2">
                {signalCoverage.map((signal) => {
                  const width = Math.max((signal.count / maxTagCount) * 100, signal.count === 0 ? 0 : 14);

                  return (
                    <div key={`coverage-${signal.tag}`}>
                      <div className="mb-1 flex items-center justify-between text-xs font-medium text-[#4a655d] dark:text-slate-300">
                        <span>{signal.tag}</span>
                        <span>{signal.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#dbe7e1] dark:bg-slate-700">
                        <div className="h-full rounded-full bg-[#12f987]" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
