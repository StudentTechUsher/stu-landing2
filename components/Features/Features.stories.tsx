import type { Meta, StoryObj } from '@storybook/react';
import { Features } from './Features';

const meta: Meta<typeof Features> = {
  title: 'Sections/Features',
  component: Features
};

export default meta;
type Story = StoryObj<typeof Features>;

export const DesktopGrid: Story = {};

export const MobileGrid: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const DarkGrid: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <Features />
    </div>
  )
};
