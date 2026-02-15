import type { Meta, StoryObj } from '@storybook/react';
import { CandidateExplorer } from './CandidateExplorer';

const meta: Meta<typeof CandidateExplorer> = {
  title: 'Recruiter/CandidateExplorer',
  component: CandidateExplorer,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof CandidateExplorer>;

export const Desktop: Story = {};

export const AnonymousPreview: Story = {
  args: {
    defaultAnonymized: true
  }
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    layout: 'padded'
  }
};

export const DarkSurface: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <CandidateExplorer />
    </div>
  )
};
