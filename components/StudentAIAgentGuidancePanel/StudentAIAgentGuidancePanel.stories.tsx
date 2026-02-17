import type { Meta, StoryObj } from '@storybook/react';
import { StudentAIAgentGuidancePanel } from './StudentAIAgentGuidancePanel';

const meta: Meta<typeof StudentAIAgentGuidancePanel> = {
  title: 'Student/StudentAIAgentGuidancePanel',
  component: StudentAIAgentGuidancePanel,
  render: (args) => <StudentAIAgentGuidancePanel key={`${args.targetProfileLabel}-${args.defaultPrompt}`} {...args} />,
  args: {
    targetProfileLabel: 'Entry-Level Data Engineer',
    defaultPrompt: 'How do I boost my alignment score?'
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof StudentAIAgentGuidancePanel>;

export const Desktop: Story = {};

export const ArtifactQuestion: Story = {
  args: {
    defaultPrompt: 'Which artifact should I add this week?'
  }
};

export const OptInQuestion: Story = {
  args: {
    defaultPrompt: 'Should I opt in to share my signal with Company X?'
  }
};

export const TimelineQuestion: Story = {
  args: {
    defaultPrompt: 'What should I put in my graduation timeline next?'
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
      <StudentAIAgentGuidancePanel />
    </div>
  )
};
