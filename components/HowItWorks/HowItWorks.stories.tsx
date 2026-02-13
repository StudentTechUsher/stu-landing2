import type { Meta, StoryObj } from '@storybook/react';
import { HowItWorks } from './HowItWorks';

const meta: Meta<typeof HowItWorks> = {
  title: 'Sections/HowItWorks',
  component: HowItWorks
};

export default meta;
type Story = StoryObj<typeof HowItWorks>;

export const DesktopStepper: Story = {};

export const MobileStepper: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const DarkStepper: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <HowItWorks />
    </div>
  )
};
