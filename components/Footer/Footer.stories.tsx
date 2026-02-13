import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Sections/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const DarkContext: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 pt-24">
      <Footer />
    </div>
  )
};
