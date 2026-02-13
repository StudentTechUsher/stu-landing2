import type { Meta, StoryObj } from '@storybook/react';
import { Pricing } from './Pricing';

const meta: Meta<typeof Pricing> = {
  title: 'Sections/Pricing',
  component: Pricing,
  args: {
    highlightPlan: 'pilot'
  }
};

export default meta;
type Story = StoryObj<typeof Pricing>;

export const HighlightPilot: Story = {};

export const HighlightStandard: Story = {
  args: {
    highlightPlan: 'standard'
  }
};

export const MobileCards: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const DarkSurface: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <Pricing highlightPlan="pilot" />
    </div>
  )
};
