import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'ghost']
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg']
    },
    children: {
      control: 'text'
    }
  },
  args: {
    children: 'Request a Pilot',
    variant: 'primary',
    size: 'md',
    'aria-label': 'Request a Pilot'
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-wrap gap-3">
          {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
            <Button
              key={`${size}-${variant}`}
              size={size}
              variant={variant}
              aria-label={`${variant} ${size} button`}
            >
              {variant} {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark rounded-2xl bg-slate-900 p-6">
      <Button variant="secondary" aria-label="Secondary action">
        Secondary Action
      </Button>
    </div>
  )
};
