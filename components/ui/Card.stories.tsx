import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Badge } from './Badge';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    header: { control: 'text' },
    footer: { control: 'text' }
  },
  args: {
    header: 'Example Header',
    footer: 'Example Footer'
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const FeatureCard: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <p className="text-sm text-slate-600">
        Convert student learning evidence into employer-aligned capability vectors.
      </p>
    </Card>
  )
};

export const TestimonialCard: Story = {
  render: () => (
    <Card
      className="max-w-md"
      header={<Badge>Employer Voice</Badge>}
      footer={<span className="text-sm font-medium text-slate-700">Avery Morgan, Northbridge</span>}
    >
      <p className="text-sm text-slate-600">
        We improved interview conversion by prioritizing students with measurable readiness scores.
      </p>
    </Card>
  )
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <Card header="Mobile Card" footer="Footer text">
      <p className="text-sm text-slate-600">This card adapts to smaller breakpoints and keeps readable spacing.</p>
    </Card>
  )
};

export const DarkSurface: Story = {
  render: () => (
    <div className="dark rounded-2xl bg-slate-950 p-6">
      <Card header="Dark Card" footer="Footer text">
        <p className="text-sm text-slate-600">Card spacing and hierarchy are preserved in dark contexts.</p>
      </Card>
    </div>
  )
};
