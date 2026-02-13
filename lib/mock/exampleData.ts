export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: 'modeling' | 'normalization' | 'scoring' | 'feedback';
};

export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarSrc: string;
};

export const oneSentenceDescription =
  'Stu is an early-talent alignment platform that translates employer-defined hiring standards into measurable, longitudinal capability pathways — improving candidate readiness before hiring begins.';

export const thirtySecondPitch =
  'Companies spend millions recruiting early-career talent, yet hiring remains noisy and unpredictable. Stu shifts hiring upstream by translating employer-defined capability standards into AI-guided, multi-year development pathways for students. As students progress through coursework, projects, and extracurriculars, we structure and normalize those artifacts into measurable capability vectors aligned with company hiring profiles. The result is a higher-density pipeline of candidates who are demonstrably aligned before they ever apply.';

export const oneMinutePitch =
  'Stu gives employers a structured way to define what ready early-career talent looks like before hiring cycles begin. We convert those capability standards into longitudinal pathways students can follow across academics, projects, and experiential learning. As learners produce artifacts, we normalize evidence into comparable capability vectors and score alignment against employer profiles. Employers then access a higher-signal, privacy-aware candidate pool and can pilot against real outcomes. The system continuously calibrates with hiring and on-the-job performance data so profile quality improves over time. The result is lower screening noise, stronger interview conversion, faster time-to-productivity, and lower early attrition.';

export const features: FeatureItem[] = [
  {
    id: 'f-1',
    title: 'Employer Capability Modeling',
    description:
      'Define role-specific capabilities with clear behavioral and technical signals before recruiting begins.',
    icon: 'modeling'
  },
  {
    id: 'f-2',
    title: 'Artifact Normalization & Capability Inference',
    description:
      'Convert coursework, projects, and extracurricular artifacts into measurable capability vectors.',
    icon: 'normalization'
  },
  {
    id: 'f-3',
    title: 'Alignment Scoring & Candidate Visibility',
    description:
      'Score student readiness against employer standards and surface anonymized, high-signal candidates.',
    icon: 'scoring'
  },
  {
    id: 'f-4',
    title: 'Outcome Calibration & Feedback Loop',
    description:
      'Refine capability models with interview and hire outcomes to improve accuracy over time.',
    icon: 'feedback'
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'Stu helped us reduce screening noise and focus interviews on candidates with clear capability evidence.',
    name: 'Avery Morgan',
    title: 'Director of Early Careers',
    company: 'Northbridge Systems',
    avatarSrc: '/images/avatar-placeholder.svg'
  },
  {
    id: 't-2',
    quote:
      'We saw better conversion from interview to offer because candidate readiness was measurable before application.',
    name: 'Jordan Patel',
    title: 'Talent Acquisition Lead',
    company: 'Horizon Analytics',
    avatarSrc: '/images/avatar-placeholder.svg'
  }
];

export const capabilityProfileExample = {
  role: 'Junior Product Analyst',
  capabilities: [
    { name: 'Structured problem solving', weight: 0.32 },
    { name: 'Data communication', weight: 0.28 },
    { name: 'Collaborative execution', weight: 0.2 },
    { name: 'Business judgment', weight: 0.2 }
  ],
  signals: ['course projects', 'internship outcomes', 'team artifacts']
};

export const howItWorksSteps = [
  {
    id: 'h-1',
    title: 'Define capability profile',
    description: 'Employers set hiring standards and capability weights for target roles.'
  },
  {
    id: 'h-2',
    title: 'Student development & artifacts',
    description: 'Students follow pathways and generate artifacts that reflect capability growth.'
  },
  {
    id: 'h-3',
    title: 'Alignment scoring & anonymized pool',
    description: 'Stu scores alignment and presents a privacy-aware candidate pool to employers.'
  },
  {
    id: 'h-4',
    title: 'Pilot & calibrate outcomes',
    description: 'Hiring outcomes calibrate capability models to improve future prediction quality.'
  }
];
