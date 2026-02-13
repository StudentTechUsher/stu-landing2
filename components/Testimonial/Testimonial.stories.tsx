import type { Meta, StoryObj } from '@storybook/react';
import { Testimonial } from './Testimonial';

const meta: Meta<typeof Testimonial> = {
  title: 'Sections/Testimonial',
  component: Testimonial
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

export const Single: Story = {
  args: {
    mode: 'single'
  }
};

export const CarouselMock: Story = {
  args: {
    mode: 'carousel-mock'
  }
};

export const MobileSingle: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    mode: 'single'
  }
};

export const DarkSurface: Story = {
  render: () => (
    <div className="dark min-h-screen bg-slate-950 py-6">
      <Testimonial mode="single" />
    </div>
  )
};
