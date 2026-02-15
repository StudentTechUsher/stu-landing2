import type { Meta, StoryObj } from '@storybook/react';
import { EmployerDashboardPipelineOverview } from './EmployerDashboardPipelineOverview';

const meta: Meta<typeof EmployerDashboardPipelineOverview> = {
  title: 'Recruiter/EmployerDashboardPipelineOverview',
  component: EmployerDashboardPipelineOverview,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof EmployerDashboardPipelineOverview>;

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
    <div className="dark min-h-screen bg-slate-950 p-6">
      <EmployerDashboardPipelineOverview />
    </div>
  )
};
