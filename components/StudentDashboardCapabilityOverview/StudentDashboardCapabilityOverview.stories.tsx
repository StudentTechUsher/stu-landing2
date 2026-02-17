import type { Meta, StoryObj } from '@storybook/react';
import { StudentDashboardCapabilityOverview, type StudentDashboardScenario } from './StudentDashboardCapabilityOverview';

const scenarioOptions: StudentDashboardScenario[] = ['new-student', 'in-progress', 'strong-signal'];

const meta: Meta<typeof StudentDashboardCapabilityOverview> = {
  title: 'Student/StudentDashboardCapabilityOverview',
  component: StudentDashboardCapabilityOverview,
  render: (args) => <StudentDashboardCapabilityOverview key={`${args.scenario}-${args.defaultProfileId}`} {...args} />,
  args: {
    scenario: 'in-progress',
    defaultProfileId: 'entry-data-engineer'
  },
  argTypes: {
    scenario: {
      control: 'select',
      options: scenarioOptions
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof StudentDashboardCapabilityOverview>;

export const Desktop: Story = {};

export const NewStudentState: Story = {
  args: {
    scenario: 'new-student',
    defaultProfileId: 'entry-data-engineer'
  }
};

export const InProgressState: Story = {
  args: {
    scenario: 'in-progress',
    defaultProfileId: 'entry-data-engineer'
  }
};

export const StrongSignalState: Story = {
  args: {
    scenario: 'strong-signal',
    defaultProfileId: 'entry-data-engineer'
  }
};

export const ProductAnalystProfile: Story = {
  args: {
    scenario: 'in-progress',
    defaultProfileId: 'entry-product-analyst'
  }
};

export const AssociateConsultantProfile: Story = {
  args: {
    scenario: 'in-progress',
    defaultProfileId: 'entry-associate-consultant'
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
