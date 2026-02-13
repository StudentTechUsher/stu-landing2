import type { Meta, StoryObj } from '@storybook/react';
import { EmployerCTA } from './EmployerCTA';

const meta: Meta<typeof EmployerCTA> = {
  title: 'Sections/EmployerCTA',
  component: EmployerCTA,
  args: {
    includeTestimonial: true
  }
};

export default meta;
type Story = StoryObj<typeof EmployerCTA>;

export const WithTestimonial: Story = {};

export const WithoutTestimonial: Story = {
  args: {
    includeTestimonial: false
  }
};

export const MobileForm: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const DarkSurface: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <EmployerCTA includeTestimonial />
    </div>
  )
};
