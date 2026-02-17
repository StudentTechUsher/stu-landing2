import type { Meta, StoryObj } from '@storybook/react';
import { StudentPathwayPlanner } from './StudentPathwayPlanner';

const meta: Meta<typeof StudentPathwayPlanner> = {
  title: 'Student/StudentPathwayPlanner',
  component: StudentPathwayPlanner,
  render: (args) => (
    <StudentPathwayPlanner key={`${args.currentAcademicYear}-${args.yearsToGraduation}-${args.targetProfileLabel}`} {...args} />
  ),
  args: {
    targetProfileLabel: 'Entry-Level Data Engineer',
    baselineAlignmentScore: 61,
    currentAcademicYear: 1,
    yearsToGraduation: 4
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof StudentPathwayPlanner>;

export const Desktop: Story = {};

export const ProductAnalystTarget: Story = {
  args: {
    targetProfileLabel: 'Entry-Level Product Analyst',
    baselineAlignmentScore: 58,
    currentAcademicYear: 2,
    yearsToGraduation: 3
  }
};

export const TransferStudentTwoYearsLeft: Story = {
  args: {
    targetProfileLabel: 'Entry-Level Data Engineer',
    baselineAlignmentScore: 66,
    currentAcademicYear: 3,
    yearsToGraduation: 2
  }
};

export const ExtendedTimeline: Story = {
  args: {
    targetProfileLabel: 'Entry-Level Product Analyst',
    baselineAlignmentScore: 54,
    currentAcademicYear: 1,
    yearsToGraduation: 6
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
      <StudentPathwayPlanner />
    </div>
  )
};
