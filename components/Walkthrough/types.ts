import type { ReactNode } from 'react';

export type WalkthroughChapter =
  | 'Recruiter setup'
  | 'Student foundation'
  | 'Student progression'
  | 'Student evidence'
  | 'Student coaching'
  | 'Recruiter signal review'
  | 'Recruiter action'
  | 'Calibration';

export type WalkthroughPersona = 'recruiter' | 'student' | 'platform';

export interface WalkthroughEventContext {
  persona: WalkthroughPersona;
  journeyStage: string;
  objective: string;
}

export type WalkthroughBubblePlacement =
  | 'top-left'
  | 'top-right'
  | 'center-left'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-right';

export interface WalkthroughBubble {
  id: string;
  title: string;
  text: string;
  placement?: WalkthroughBubblePlacement;
  offsetX?: number;
  offsetY?: number;
}

export interface WalkthroughStepDefinition {
  id: string;
  chapter: WalkthroughChapter;
  title: string;
  bubbles: WalkthroughBubble[];
  render: () => ReactNode;
  eventContext?: WalkthroughEventContext;
}
