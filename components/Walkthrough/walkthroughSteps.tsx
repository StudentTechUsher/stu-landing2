import { CandidateExplorer } from '../CandidateExplorer/CandidateExplorer';
import { EmployerDashboardPipelineOverview } from '../EmployerDashboardPipelineOverview/EmployerDashboardPipelineOverview';
import { OutcomeFeedbackLoop } from '../OutcomeFeedbackLoop/OutcomeFeedbackLoop';
import { ProfileBuilder } from '../ProfileBuilder/ProfileBuilder';
import { StudentAIAgentGuidancePanel } from '../StudentAIAgentGuidancePanel/StudentAIAgentGuidancePanel';
import { StudentArtifactRepository } from '../StudentArtifactRepository/StudentArtifactRepository';
import { StudentDashboardCapabilityOverview } from '../StudentDashboardCapabilityOverview/StudentDashboardCapabilityOverview';
import { StudentOnboardingSignup } from '../StudentOnboardingSignup/StudentOnboardingSignup';
import { StudentPathwayPlanner } from '../StudentPathwayPlanner/StudentPathwayPlanner';
import type { WalkthroughStepDefinition } from './types';

export const walkthroughSteps: WalkthroughStepDefinition[] = [
  {
    id: 'recruiter-profile-model',
    chapter: 'Recruiter setup',
    title: 'Define capability model',
    bubbles: [
      {
        id: 'r1-overview',
        title: 'Start with recruiter-defined standards',
        text: 'Recruiters define the capability model first so every downstream signal is anchored to explicit hiring intent.',
        placement: 'top-left'
      },
      {
        id: 'r1-agent',
        title: 'Agent-assisted setup',
        text: 'Guided + agent-assisted tools reduce the setup burden and make first-time model creation faster.',
        placement: 'top-right'
      }
    ],
    render: () => <ProfileBuilder defaultMode="guided" defaultAgentOpen />,
    eventContext: {
      persona: 'recruiter',
      journeyStage: 'setup',
      objective: 'Create role-aligned capability standards'
    }
  },
  {
    id: 'student-onboarding-intent',
    chapter: 'Student foundation',
    title: 'Capture intent and baseline evidence',
    bubbles: [
      {
        id: 's1-sequence',
        title: 'Intent capture in sequence',
        text: 'The flow captures student context and evidence before target role details so recommendations personalize correctly.',
        placement: 'top-left'
      },
      {
        id: 's1-agent',
        title: 'Live guidance from first input',
        text: 'As data is entered, the agent can suggest next fields and reduce ambiguity for students who are still exploring.',
        placement: 'center-right'
      }
    ],
    render: () => <StudentOnboardingSignup />,
    eventContext: {
      persona: 'student',
      journeyStage: 'onboarding',
      objective: 'Collect baseline profile and evidence inputs'
    }
  },
  {
    id: 'student-capability-dashboard',
    chapter: 'Student progression',
    title: 'Student capability overview',
    bubbles: [
      {
        id: 's2-score',
        title: 'Probabilistic readiness, not rigid thresholds',
        text: 'Students see alignment bands and dimension progress tied to target profiles, without exposing gameable internals.',
        placement: 'top-left'
      },
      {
        id: 's2-actions',
        title: 'Always actionable',
        text: 'The dashboard highlights next-most-valuable actions so students always know what to do next.',
        placement: 'center-right'
      }
    ],
    render: () => <StudentDashboardCapabilityOverview scenario="in-progress" />,
    eventContext: {
      persona: 'student',
      journeyStage: 'progress',
      objective: 'Monitor alignment and prioritize next actions'
    }
  },
  {
    id: 'student-artifact-repository',
    chapter: 'Student evidence',
    title: 'Artifact repository',
    bubbles: [
      {
        id: 's3-centralize',
        title: 'Centralize evidence',
        text: 'Coursework, projects, certifications, competitions, and leadership signals are captured in one structured place.',
        placement: 'top-left'
      },
      {
        id: 's3-signal',
        title: 'Signal quality improves over time',
        text: 'Capability tags are system-derived so recruiter signal quality improves as evidence depth grows.',
        placement: 'center-left'
      }
    ],
    render: () => <StudentArtifactRepository />,
    eventContext: {
      persona: 'student',
      journeyStage: 'evidence',
      objective: 'Centralize artifacts that drive capability signal quality'
    }
  },
  {
    id: 'student-pathway-planner',
    chapter: 'Student progression',
    title: 'Graduation timeline planner',
    bubbles: [
      {
        id: 's4-timeline',
        title: 'Flexible graduation timeline',
        text: 'Planning works for any time-to-graduation, not just a fixed 4-year sequence.',
        placement: 'top-left'
      },
      {
        id: 's4-lift',
        title: 'Action-to-outcome transparency',
        text: 'Each milestone shows projected alignment lift so students can prioritize high-impact moves.',
        placement: 'center-right'
      }
    ],
    render: () => <StudentPathwayPlanner />,
    eventContext: {
      persona: 'student',
      journeyStage: 'planning',
      objective: 'Sequence milestones that maximize capability growth'
    }
  },
  {
    id: 'student-agent-guidance',
    chapter: 'Student coaching',
    title: 'AI agent guidance panel',
    bubbles: [
      {
        id: 's5-guidance',
        title: 'Coach-like agent experience',
        text: 'Students can ask direct questions and receive next steps tailored to their current profile and evidence.',
        placement: 'top-right'
      },
      {
        id: 's5-rationale',
        title: 'Transparent rationale',
        text: 'Recommendations include explanation traces so students understand why each suggestion matters.',
        placement: 'center-right'
      }
    ],
    render: () => <StudentAIAgentGuidancePanel />,
    eventContext: {
      persona: 'student',
      journeyStage: 'coaching',
      objective: 'Translate model outputs into understandable guidance'
    }
  },
  {
    id: 'recruiter-pipeline-overview',
    chapter: 'Recruiter signal review',
    title: 'Employer pipeline overview',
    bubbles: [
      {
        id: 'r2-preapply',
        title: 'Signal before applications',
        text: 'Recruiters can inspect opted-in readiness distribution and capability strength before formal application review.',
        placement: 'top-left'
      },
      {
        id: 'r2-filters',
        title: 'Contextual filtering',
        text: 'University, target role, and capability bands let teams quickly isolate segments that matter most.',
        placement: 'center-left'
      }
    ],
    render: () => <EmployerDashboardPipelineOverview />,
    eventContext: {
      persona: 'recruiter',
      journeyStage: 'pipeline',
      objective: 'Assess student readiness distribution and signal quality'
    }
  },
  {
    id: 'recruiter-candidate-explorer',
    chapter: 'Recruiter action',
    title: 'Candidate explorer',
    bubbles: [
      {
        id: 'r3-drilldown',
        title: 'From aggregate to individual',
        text: 'Recruiters move from pipeline patterns to candidate-level evidence and capability breakdown in one step.',
        placement: 'top-left'
      },
      {
        id: 'r3-actions',
        title: 'Action-oriented workflow',
        text: 'Teams can flag candidates, attach notes, and prep outreach without leaving the explorer.',
        placement: 'center-right'
      }
    ],
    render: () => <CandidateExplorer />,
    eventContext: {
      persona: 'recruiter',
      journeyStage: 'action',
      objective: 'Convert candidate signal into outreach decisions'
    }
  },
  {
    id: 'outcome-feedback-loop',
    chapter: 'Calibration',
    title: 'Outcome feedback loop',
    bubbles: [
      {
        id: 'c1-loop',
        title: 'Close the calibration loop',
        text: 'Interview, offer, hire, and performance outcomes feed back into model tuning.',
        placement: 'top-left'
      },
      {
        id: 'c1-improvement',
        title: 'Quality improves over time',
        text: 'Teams can see adjustment guidance and apply model updates based on observed hiring outcomes.',
        placement: 'center-right'
      }
    ],
    render: () => <OutcomeFeedbackLoop />,
    eventContext: {
      persona: 'platform',
      journeyStage: 'calibration',
      objective: 'Close the loop from hiring outcomes back to scoring quality'
    }
  }
];
