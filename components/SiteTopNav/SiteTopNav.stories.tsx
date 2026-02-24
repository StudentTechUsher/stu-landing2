import type { Meta, StoryObj } from '@storybook/react';
import { SiteTopNav } from './SiteTopNav';

const meta: Meta<typeof SiteTopNav> = {
  title: 'Navigation/SiteTopNav',
  component: SiteTopNav,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    context: 'landing',
    audience: 'recruiter'
  }
};

export default meta;
type Story = StoryObj<typeof SiteTopNav>;

export const RecruiterDesktop: Story = {};

export const StudentDesktop: Story = {
  args: {
    audience: 'student'
  }
};

export const RecruiterWalkthroughDesktop: Story = {
  args: {
    context: 'walkthrough',
    audience: 'recruiter'
  }
};

export const MobileRecruiterClosed: Story = {
  args: {
    context: 'landing',
    audience: 'recruiter',
    defaultMobileMenuOpen: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const MobileRecruiterOpen: Story = {
  args: {
    context: 'landing',
    audience: 'recruiter',
    defaultMobileMenuOpen: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const MobileStudentOpen: Story = {
  args: {
    context: 'landing',
    audience: 'student',
    defaultMobileMenuOpen: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
