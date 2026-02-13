export type ProblemSignal = {
  id: string;
  text: string;
};

export type SolutionPillar = {
  id: string;
  title: string;
  description: string;
};

export type OperatingStep = {
  id: string;
  title: string;
  description: string;
};

export type Differentiator = {
  id: string;
  traditional: string;
  stu: string;
};

export type TargetProfile = {
  id: string;
  text: string;
};

export const oneSentenceDescription =
  'stu. is an early-talent alignment platform that translates employer-defined hiring standards into measurable, longitudinal capability pathways - improving candidate readiness before hiring begins.';

export const oneSentenceVisionary =
  'stu. builds the intelligence layer between universities and employers, transforming fragmented student activity into calibrated capability signals aligned to real hiring outcomes.';

export const thirtySecondPitch =
  'Companies spend millions recruiting early-career talent, yet hiring remains noisy and unpredictable. stu. shifts hiring upstream by translating employer-defined capability standards into AI-guided, multi-year development pathways for students. As students progress through coursework, projects, and extracurriculars, we structure and normalize those artifacts into measurable capability vectors aligned with company hiring profiles. The result is a higher-density pipeline of candidates who are demonstrably aligned before they ever apply.';

export const oneMinutePitch =
  'Early-career hiring is inefficient because the signal is weak. Employers rely on GPA, school brand, and resume heuristics that do not reliably predict performance. Meanwhile, students make academic and extracurricular decisions without clear visibility into what hiring-ready actually means. Stu solves this by operationalizing employer hiring standards into structured capability models. We ingest longitudinal student artifacts - coursework, projects, leadership roles, certifications - and translate them into normalized capability vectors aligned with specific employer profiles. As hiring outcomes accumulate, the system recalibrates to reflect what actually predicts interview and offer success. Instead of reacting to applicants, companies gain upstream influence over talent alignment. Instead of guessing, students receive probabilistic guidance toward roles where they are most likely to succeed. Stu reduces hiring noise and increases readiness before recruitment even begins.';

export const internalVisionStatement =
  'stu. becomes the operating system for early-career talent alignment - a capability translation layer that reduces uncertainty in hiring and replaces heuristic screening with outcome-calibrated signal.';

export const longerVisionNarrative =
  'Over time, stu. evolves into the standard infrastructure layer connecting universities and employers. Companies define capability expectations, students generate longitudinal development data, and hiring outcomes recalibrate the model continuously.';

export const economicClaim =
  'If stu. increases interview conversion, reduces junior ramp time, or lowers early attrition by even modest margins, the ROI exceeds enterprise subscription costs by multiples.';
export const taglineOptions = [
  'Build hiring-ready talent before hiring begins.',
  'Reduce hiring noise. Increase readiness.',
  'From coursework to capability.'
];

export const heroHighlights = [
  'Employer-defined capability models',
  'Longitudinal student signal translation',
  'Outcome-calibrated readiness scoring'
];

export const problemSignals: ProblemSignal[] = [
  {
    id: 'p-1',
    text: 'GPA varies by institution and grading culture.'
  },
  {
    id: 'p-2',
    text: 'Prestige often substitutes for measurable capability.'
  },
  {
    id: 'p-3',
    text: 'Resume screening compresses multi-year development into a static snapshot.'
  },
  {
    id: 'p-4',
    text: 'Students lack clarity on what hiring-ready truly means.'
  }
];

export const solutionPillars: SolutionPillar[] = [
  {
    id: 's-1',
    title: 'Employer Capability Modeling',
    description:
      'Companies define structured hiring-ready profiles across technical, applied, and behavioral dimensions.'
  },
  {
    id: 's-2',
    title: 'Artifact Structuring and Normalization',
    description:
      'Coursework, projects, certifications, and leadership experiences are translated into latent capability dimensions.'
  },
  {
    id: 's-3',
    title: 'Alignment Scoring',
    description:
      'Students are scored probabilistically against employer profiles using normalized capability vectors.'
  },
  {
    id: 's-4',
    title: 'Outcome Calibration',
    description:
      'Interview and offer outcomes refine model weights over time so readiness prediction improves each cycle.'
  }
];

export const operatingModelSteps: OperatingStep[] = [
  {
    id: 'o-1',
    title: 'Define target capability profiles',
    description:
      'Employer teams specify what hiring-ready looks like for each early-career role before recruiting starts.'
  },
  {
    id: 'o-2',
    title: 'Structure longitudinal artifacts',
    description:
      'Student activity across academics and applied work is converted into comparable evidence vectors.'
  },
  {
    id: 'o-3',
    title: 'Score candidate-role alignment',
    description:
      'Readiness is assessed probabilistically against employer benchmarks, not resume heuristics.'
  },
  {
    id: 'o-4',
    title: 'Calibrate to hiring outcomes',
    description:
      'Interview and offer outcomes continuously tune profile weights and signal interpretation.'
  }
];

export const differentiationSummary: Differentiator[] = [
  {
    id: 'd-1',
    traditional: 'LinkedIn and Handshake operate at application time.',
    stu: 'Stu operates during development.'
  },
  {
    id: 'd-2',
    traditional: 'Traditional hiring evaluates snapshots.',
    stu: 'Stu evaluates longitudinal behavior.'
  },
  {
    id: 'd-3',
    traditional: 'Prestige-based filtering amplifies bias.',
    stu: 'Stu scores demonstrated capability.'
  }
];

export const whatStuIsNot = [
  'Not a job board.',
  'Not resume optimization software.',
  'Not a bootcamp.',
  'Not a recruiting agency.',
  'Not a university replacement.'
];

export const icpProfiles: TargetProfile[] = [
  {
    id: 'i-1',
    text: 'Tech companies hiring 50+ graduates annually'
  },
  {
    id: 'i-2',
    text: 'Consulting firms with structured competency models'
  },
  {
    id: 'i-3',
    text: 'Engineering-driven enterprises with high junior ramp costs'
  },
  {
    id: 'i-4',
    text: 'Teams investing heavily in campus recruiting with measurable readiness goals'
  }
];

// Compatibility exports used by Storybook/demo API mocks.
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

export const features: FeatureItem[] = [
  {
    id: 'f-1',
    title: 'Employer Capability Modeling',
    description:
      'Define role-specific readiness standards before recruiting starts so downstream screening is anchored to explicit criteria.',
    icon: 'modeling'
  },
  {
    id: 'f-2',
    title: 'Artifact Normalization',
    description:
      'Translate coursework, projects, and experiences into comparable capability vectors instead of raw resume fragments.',
    icon: 'normalization'
  },
  {
    id: 'f-3',
    title: 'Probabilistic Alignment Scoring',
    description:
      'Score student-role fit against employer-defined capability models to improve interview signal density.',
    icon: 'scoring'
  },
  {
    id: 'f-4',
    title: 'Outcome Calibration Loop',
    description:
      'Interview and offer outcomes continuously recalibrate the model for stronger future prediction quality.',
    icon: 'feedback'
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'Stu helped us move from prestige-heavy filtering to capability-based early-career screening in one pilot cycle.',
    name: 'Casey Tran',
    title: 'Director of Early Careers',
    company: 'Northbridge Systems',
    avatarSrc: '/images/avatar-placeholder.svg'
  },
  {
    id: 't-2',
    quote:
      'We gained clearer interview conversion signal because readiness was measured before candidates ever applied.',
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

export const howItWorksSteps = operatingModelSteps.map((step) => ({
  id: step.id,
  title: step.title,
  description: step.description
}));
