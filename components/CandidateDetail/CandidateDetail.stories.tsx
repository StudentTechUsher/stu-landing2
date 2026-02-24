import type { Meta, StoryObj } from '@storybook/react';
import { CandidateDetail } from './CandidateDetail';

const meta: Meta<typeof CandidateDetail> = {
  title: 'Recruiter/CandidateDetail',
  component: CandidateDetail,
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj<typeof CandidateDetail>;

export const Standout: Story = {};

export const RecruiterSignals: Story = {
  args: {
    showQualitativeSignals: true
  }
};

export const AnonymousPreview: Story = {
  args: {
    anonymizedPreview: true,
    showInviteButton: false
  }
};

export const EmbeddedPreview: Story = {
  args: {
    showQualitativeSignals: false,
    showInviteButton: false
  }
};
