import {
  capabilityProfileExample,
  features,
  howItWorksSteps,
  testimonials,
  type FeatureItem,
  type TestimonialItem
} from './exampleData';

const simulateLatency = async <T>(data: T, delayMs = 250): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });

export const fetchFeatures = async (): Promise<FeatureItem[]> => {
  // TODO: Replace with real capability scoring endpoint once backend contracts are finalized.
  return simulateLatency(features);
};

export const fetchTestimonials = async (): Promise<TestimonialItem[]> => {
  // TODO: Replace with employer onboarding data source when CRM integration is available.
  return simulateLatency(testimonials);
};

export const fetchCapabilityProfile = async () => {
  // TODO: Add analytics hooks for profile interactions and CTA funnel instrumentation.
  return simulateLatency(capabilityProfileExample);
};

export const fetchHowItWorksSteps = async () => simulateLatency(howItWorksSteps);
