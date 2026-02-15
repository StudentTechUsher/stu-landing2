import type { Meta, StoryObj } from '@storybook/react';
import { OutcomeFeedbackLoop } from './OutcomeFeedbackLoop';

const meta: Meta<typeof OutcomeFeedbackLoop> = {
  title: 'Recruiter/OutcomeFeedbackLoop',
  component: OutcomeFeedbackLoop,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof OutcomeFeedbackLoop>;

export const Desktop: Story = {};

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
      <OutcomeFeedbackLoop />
    </div>
  )
};
