type PostHogProperties = Record<string, unknown>;
type PostHogFeatureFlagValue = string | boolean | undefined;
type PostHogFeatureFlags = Record<string, string | boolean>;

type PostHogClient = {
  init?: (apiKey: string, config?: PostHogProperties) => void;
  capture?: (eventName: string, properties?: PostHogProperties) => void;
  startSessionRecording?: () => void;
  getFeatureFlag?: (key: string) => PostHogFeatureFlagValue;
  onFeatureFlags?: (callback: (flags: string[], variants?: PostHogFeatureFlags) => void) => (() => void) | void;
};

declare global {
  interface Window {
    posthog?: PostHogClient;
  }
}

const DEFAULT_POSTHOG_HOST = 'https://us.i.posthog.com';
const MAX_QUEUED_EVENTS = 200;
const POSTHOG_READY_EVENT = 'stu:posthog-ready';

let scriptLoadPromise: Promise<void> | null = null;
let isInitializing = false;
let isInitialized = false;
const eventQueue: Array<{ name: string; properties: PostHogProperties }> = [];

const normalizeHost = (host: string) => host.replace(/\/$/, '');

const getPosthogKey = () => process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() ?? '';
const getPosthogHost = () => normalizeHost(process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || DEFAULT_POSTHOG_HOST);

const getAllowedHosts = () => {
  const configuredHosts = process.env.NEXT_PUBLIC_POSTHOG_ALLOWED_HOSTS?.trim();
  if (!configuredHosts) {
    return ['stuplanning.com', 'www.stuplanning.com'];
  }

  return configuredHosts
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
};

const isAllowedHost = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  const allowedHosts = getAllowedHosts();
  return allowedHosts.includes(hostname);
};

const isPosthogEnabled = () => Boolean(getPosthogKey()) && isAllowedHost();

const getAssetHost = (apiHost: string) => {
  if (apiHost.includes('-assets.i.posthog.com')) return apiHost;
  if (apiHost.includes('.i.posthog.com')) return apiHost.replace('.i.posthog.com', '-assets.i.posthog.com');
  return 'https://us-assets.i.posthog.com';
};

const flushQueuedEvents = () => {
  if (typeof window === 'undefined' || !window.posthog?.capture) return;
  while (eventQueue.length > 0) {
    const next = eventQueue.shift();
    if (!next) return;
    window.posthog.capture(next.name, next.properties);
  }
};

const enqueueEvent = (name: string, properties: PostHogProperties) => {
  eventQueue.push({ name, properties });
  if (eventQueue.length > MAX_QUEUED_EVENTS) {
    eventQueue.splice(0, eventQueue.length - MAX_QUEUED_EVENTS);
  }
};

const loadPosthogScript = (apiHost: string) => {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.posthog?.capture && window.posthog?.init) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-stu-posthog="true"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load PostHog script.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.stuPosthog = 'true';
    script.src = `${getAssetHost(apiHost)}/static/array.js`;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null;
      reject(new Error('Failed to load PostHog script.'));
    };

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
};

export const initPosthog = () => {
  if (typeof window === 'undefined' || isInitialized || isInitializing) return;
  if (!isPosthogEnabled()) return;

  const key = getPosthogKey();
  if (!key) return;

  const host = getPosthogHost();
  isInitializing = true;

  void loadPosthogScript(host)
    .then(() => {
      if (!window.posthog?.init) return;

      window.posthog.init(key, {
        api_host: host,
        autocapture: true,
        capture_pageview: false,
        capture_pageleave: true,
        disable_session_recording: false,
        person_profiles: 'identified_only'
      });

      window.posthog.startSessionRecording?.();
      isInitialized = true;
      flushQueuedEvents();
      window.dispatchEvent(new Event(POSTHOG_READY_EVENT));
    })
    .finally(() => {
      isInitializing = false;
    });
};

export const getPosthogFeatureFlag = (key: string): PostHogFeatureFlagValue => {
  if (typeof window === 'undefined') return undefined;
  if (!isPosthogEnabled()) return undefined;

  initPosthog();
  return window.posthog?.getFeatureFlag?.(key);
};

export const subscribeToPosthogFeatureFlags = (listener: () => void) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }
  if (!isPosthogEnabled()) {
    return () => undefined;
  }

  let detachFeatureFlagListener: (() => void) | undefined;

  const bindListener = () => {
    if (!window.posthog?.onFeatureFlags) {
      listener();
      return;
    }

    const maybeDetach = window.posthog.onFeatureFlags(() => {
      listener();
    });

    if (typeof maybeDetach === 'function') {
      detachFeatureFlagListener = maybeDetach;
    }

    listener();
  };

  const handlePosthogReady = () => {
    bindListener();
  };

  if (window.posthog?.onFeatureFlags) {
    bindListener();
  } else {
    window.addEventListener(POSTHOG_READY_EVENT, handlePosthogReady, { once: true });
    initPosthog();
  }

  return () => {
    window.removeEventListener(POSTHOG_READY_EVENT, handlePosthogReady);
    detachFeatureFlagListener?.();
  };
};

export const capturePosthogEvent = (name: string, properties: PostHogProperties = {}) => {
  if (typeof window === 'undefined') return;
  if (!isPosthogEnabled()) return;

  if (!isInitialized || !window.posthog?.capture) {
    enqueueEvent(name, properties);
    initPosthog();
    return;
  }

  window.posthog.capture(name, properties);
};

export const capturePosthogPageView = (url: string) => {
  capturePosthogEvent('$pageview', {
    $current_url: url
  });
};

const getCurrentRoute = () => {
  if (typeof window === 'undefined') return '';
  return `${window.location.pathname}${window.location.search}`;
};

const stringifyUnknown = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (value instanceof Error) return value.message;

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

export const registerPosthogErrorTracking = () => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }
  if (!isPosthogEnabled()) {
    return () => undefined;
  }

  const handleError = (event: ErrorEvent) => {
    capturePosthogEvent('frontend_error', {
      message: event.message || 'Unknown error',
      filename: event.filename || null,
      line: event.lineno || null,
      column: event.colno || null,
      stack: event.error instanceof Error ? event.error.stack || null : null,
      route: getCurrentRoute()
    });
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    capturePosthogEvent('frontend_unhandled_rejection', {
      reason: stringifyUnknown(event.reason),
      route: getCurrentRoute()
    });
  };

  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);

  return () => {
    window.removeEventListener('error', handleError);
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  };
};
