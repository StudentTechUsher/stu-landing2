import type { Preview } from '@storybook/react';
import '../styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'padded'
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-4">
        <Story />
      </div>
    )
  ]
};

export default preview;
