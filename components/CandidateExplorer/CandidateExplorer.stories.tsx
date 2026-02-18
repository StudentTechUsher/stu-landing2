import type { Meta, StoryObj } from '@storybook/react';
import defaultCandidateAvatar from '../../public/images/Gemini_Generated_Image_2jzqqj2jzqqj2jzq.png';
import { CandidateExplorer } from './CandidateExplorer';

const meta: Meta<typeof CandidateExplorer> = {
  title: 'Recruiter/CandidateExplorer',
  component: CandidateExplorer,
  args: {
    candidateAvatarSrc: defaultCandidateAvatar.src
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof CandidateExplorer>;

export const Desktop: Story = {};

export const AnonymousPreview: Story = {
  args: {
    defaultAnonymized: true
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
      <CandidateExplorer />
    </div>
  )
};
