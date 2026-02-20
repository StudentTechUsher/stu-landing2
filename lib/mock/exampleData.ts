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
  'stu. helps employers define role skills, score student evidence against those skills, and identify candidates who are ready before recruiting season.';

export const oneSentenceVisionary =
  'stu. gives employers and universities a shared skills map so teams can hire earlier on evidence and students know what to build toward.';

export const capabilityPreviewDescription =
  'stu. maps coursework, projects, internships, leadership, and extracurricular work to role skills, then improves scoring using interview and offer outcomes.';

export const problemSectionSummary =
  'Companies spend millions recruiting early-career talent, but GPA, school name, and resume snapshots are weak predictors of job readiness.';

export const thirtySecondPitch =
  'Companies spend millions on early-career hiring, but resumes and GPA alone do not show who is actually ready. stu. lets hiring teams define role skills up front, then maps student classes, projects, and internships to those skills. Students get clear guidance on what to improve, and employers get a stronger interview pool before applications open.';

export const oneMinutePitch =
  'Early-career hiring is hard because most teams are forced to screen on weak signals like GPA, school name, and resume polish. Students also struggle because they cannot see which skills each role actually requires. stu. connects both sides with one shared framework. Employers define role scorecards first. Students then connect coursework, projects, internships, leadership roles, and certifications as evidence. stu. scores that evidence against each role so hiring teams can see strengths, gaps, and readiness earlier. As interview and offer results come in, the scoring is updated to match what predicts success in real hiring cycles. The outcome is simpler: employers get a better interview pool, and students get clearer next steps long before they apply.';

export const internalVisionStatement =
  'stu. gives employers and students one shared view of readiness, replacing resume guesswork with evidence tied to hiring results.';

export const longerVisionNarrative =
  'Over time, employers define role scorecards, students build evidence against them, and every hiring cycle makes the scoring more accurate.';

export const economicClaim =
  'If stu. improves applicant quality, increases interview conversion, shortens time-to-productivity, or improves early retention, the savings can exceed subscription cost.';
export const taglineOptions = [
  'Know who is ready before applications open.',
  'Turn student work into hiring evidence.',
  'Hire for skills, not resume signals.'
];

export const heroHighlights = [
  'Employer-defined capability models',
  'Longitudinal student signal translation',
  'Outcome-calibrated readiness scoring'
];

export const problemSignals: ProblemSignal[] = [
  {
    id: 'p-1',
    text: 'GPA is not comparable across schools, majors, or grading policies.'
  },
  {
    id: 'p-2',
    text: 'School prestige often stands in for real skill evidence.'
  },
  {
    id: 'p-3',
    text: 'A one-page resume hides 3-4 years of project and internship work.'
  },
  {
    id: 'p-4',
    text: 'Students rarely know which skills each entry-level role actually requires.'
  }
];

export const solutionPillars: SolutionPillar[] = [
  {
    id: 's-1',
    title: 'Define role skill scorecards',
    description:
      'Hiring teams choose the exact technical, applied, and behavioral skills each role requires.'
  },
  {
    id: 's-2',
    title: 'Turn student work into evidence',
    description:
      'Coursework, projects, internships, certifications, and leadership work are mapped to those role skills.'
  },
  {
    id: 's-3',
    title: 'Score readiness for each role',
    description:
      'Each student gets a role-specific readiness score with clear strengths and gaps.'
  },
  {
    id: 's-4',
    title: 'Improve scoring with outcomes',
    description:
      'Interview and offer results tune scoring each recruiting cycle so predictions get better over time.'
  }
];

export const operatingModelSteps: OperatingStep[] = [
  {
    id: 'o-1',
    title: 'Set role scorecards',
    description:
      'Hiring managers define what ready looks like for each role before recruiting starts.'
  },
  {
    id: 'o-2',
    title: 'Collect student evidence',
    description:
      'Student classes, projects, internships, leadership, competitions, and certifications are converted into comparable evidence.'
  },
  {
    id: 'o-3',
    title: 'Guide improvement before apply',
    description:
      'stu. scores each student against role scorecards and recommends the highest-impact next steps before they enter your pipeline.'
  },
  {
    id: 'o-4',
    title: 'Improve with hiring outcomes',
    description:
      'Interview and offer results continuously improve how the scoring model weighs evidence.'
  }
];

export const differentiationSummary: Differentiator[] = [
  {
    id: 'd-1',
    traditional: 'LinkedIn and Handshake mostly enter the process once students apply.',
    stu: 'stu. starts earlier while students are still building evidence.'
  },
  {
    id: 'd-2',
    traditional: 'Traditional hiring often judges one resume snapshot.',
    stu: 'stu. tracks progress over time across classes, projects, and internships.'
  },
  {
    id: 'd-3',
    traditional: 'Screening often relies on school prestige and keyword matching.',
    stu: 'stu. scores demonstrated skills against role scorecards.'
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
    text: 'Tech companies hiring 50+ grads each year'
  },
  {
    id: 'i-2',
    text: 'Consulting firms hiring in repeatable analyst cohorts'
  },
  {
    id: 'i-3',
    text: 'Engineering organizations where junior ramp time is expensive'
  },
  {
    id: 'i-4',
    text: 'Campus recruiting teams measured on conversion and early retention'
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
