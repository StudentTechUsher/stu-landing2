import type { Meta, StoryObj } from '@storybook/react';
import { ProfileBuilder } from './ProfileBuilder';

const meta: Meta<typeof ProfileBuilder> = {
  title: 'Recruiter/ProfileBuilderDefineCapabilityModels',
  component: ProfileBuilder,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ProfileBuilder>;

export const GuidedDefault: Story = {};

export const AgentAssisted: Story = {
  args: {
    defaultAgentOpen: true
  }
};

export const AdvancedConfiguration: Story = {
  args: {
    defaultMode: 'advanced'
  }
};

export const MobileGuided: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    layout: 'padded'
  }
};

export const DarkSurfaceGuided: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <ProfileBuilder />
    </div>
  )
};

export const DarkSurfaceAdvanced: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <ProfileBuilder defaultMode="advanced" defaultAgentOpen />
    </div>
  )
};
