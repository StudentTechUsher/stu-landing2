import type { Meta, StoryObj } from '@storybook/react';
import { StudentArtifactRepository } from './StudentArtifactRepository';

const meta: Meta<typeof StudentArtifactRepository> = {
  title: 'Student/StudentArtifactRepository',
  component: StudentArtifactRepository,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof StudentArtifactRepository>;

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
      <StudentArtifactRepository />
    </div>
  )
};
