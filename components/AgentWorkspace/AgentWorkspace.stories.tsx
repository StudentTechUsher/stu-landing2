import type { Meta, StoryObj } from '@storybook/react';
import { AgentWorkspace } from './AgentWorkspace';

const meta: Meta<typeof AgentWorkspace> = {
  title: 'Sections/AgentWorkspace',
  component: AgentWorkspace
};

export default meta;
type Story = StoryObj<typeof AgentWorkspace>;

export const Desktop: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const DarkSurface: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <AgentWorkspace />
    </div>
  )
};
