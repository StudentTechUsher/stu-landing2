import type { Meta, StoryObj } from '@storybook/react';
import { StudentDashboardCapabilityOverview } from './StudentDashboardCapabilityOverview';

const meta: Meta<typeof StudentDashboardCapabilityOverview> = {
  title: 'Student/StudentDashboardCapabilityOverview',
  component: StudentDashboardCapabilityOverview,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof StudentDashboardCapabilityOverview>;

export const Desktop: Story = {};

export const DataEngineerProfile: Story = {
  args: {
    defaultProfileId: 'entry-data-engineer'
  }
};

export const ProductAnalystProfile: Story = {
  args: {
    defaultProfileId: 'entry-product-analyst'
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
      <StudentDashboardCapabilityOverview />
    </div>
  )
};
