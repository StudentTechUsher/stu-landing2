import type { Meta, StoryObj } from '@storybook/react';
import { RecruiterImportScoringWorkbench } from './RecruiterImportScoringWorkbench';

const meta: Meta<typeof RecruiterImportScoringWorkbench> = {
  title: 'Recruiter/RecruiterImportScoringWorkbench',
  component: RecruiterImportScoringWorkbench,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof RecruiterImportScoringWorkbench>;

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
      <RecruiterImportScoringWorkbench />
    </div>
  )
};
