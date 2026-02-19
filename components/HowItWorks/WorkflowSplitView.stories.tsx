import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowSplitView } from './WorkflowSplitView';

const meta: Meta<typeof WorkflowSplitView> = {
  title: 'Sections/WorkflowSplitView',
  component: WorkflowSplitView
};

export default meta;
type Story = StoryObj<typeof WorkflowSplitView>;

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
    <div className="dark min-h-screen bg-slate-950 p-6">
      <WorkflowSplitView />
    </div>
  )
};
