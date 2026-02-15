import type { Meta, StoryObj } from '@storybook/react';
import { StudentOnboardingSignup } from './StudentOnboardingSignup';

const meta: Meta<typeof StudentOnboardingSignup> = {
  title: 'Student/StudentOnboardingSignup',
  component: StudentOnboardingSignup,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof StudentOnboardingSignup>;

export const Desktop: Story = {};

export const PrefilledRoleTemplate: Story = {
  args: {
    defaultTemplateId: 'associate-consultant',
    defaultCampusEmail: 'student@asu.edu'
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
      <StudentOnboardingSignup />
    </div>
  )
};
