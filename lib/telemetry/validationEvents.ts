import { capturePosthogEvent } from './posthog';

export type ValidationEventName =
  | 'landing_cta_clicked'
  | 'pilot_request_submitted'
  | 'pilot_request_failed'
  | 'walkthrough_entry_clicked'
  | 'walkthrough_viewed'
  | 'walkthrough_step_viewed'
  | 'walkthrough_step_next_clicked'
  | 'walkthrough_step_back_clicked'
  | 'walkthrough_chapter_jump_clicked'
  | 'walkthrough_completed'
  | 'walkthrough_exit_cta_clicked';

type ValidationEventValue = string | number | boolean | null;
export type ValidationEventPayload = Record<string, ValidationEventValue | undefined>;

export const VALIDATION_EVENT_WINDOW_EVENT = 'stu:validation-event';
export const VALIDATION_EVENT_STORAGE_KEY = 'stu:validation-event-log';
const MAX_EVENT_LOG_SIZE = 200;

type ValidationEventRecord = ValidationEventPayload & {
  event: 'stu_validation';
  eventName: ValidationEventName;
  timestamp: string;
};

type ValidationWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

const isEventRecordArray = (value: unknown): value is ValidationEventRecord[] => {
  return Array.isArray(value);
};

export const trackValidationEvent = (name: ValidationEventName, payload: ValidationEventPayload = {}) => {
  if (typeof window === 'undefined') return;

  const eventRecord: ValidationEventRecord = {
    event: 'stu_validation',
    eventName: name,
    timestamp: new Date().toISOString(),
    ...payload
  };

  const telemetryWindow = window as ValidationWindow;
  if (Array.isArray(telemetryWindow.dataLayer)) {
    telemetryWindow.dataLayer.push(eventRecord);
  }

  window.dispatchEvent(
    new CustomEvent(VALIDATION_EVENT_WINDOW_EVENT, {
      detail: eventRecord
    })
  );

  try {
    const existingLogRaw = window.sessionStorage.getItem(VALIDATION_EVENT_STORAGE_KEY);
    const existingLogParsed = existingLogRaw ? (JSON.parse(existingLogRaw) as unknown) : [];
    const nextLog = isEventRecordArray(existingLogParsed) ? existingLogParsed : [];
    nextLog.push(eventRecord);

    if (nextLog.length > MAX_EVENT_LOG_SIZE) {
      nextLog.splice(0, nextLog.length - MAX_EVENT_LOG_SIZE);
    }

    window.sessionStorage.setItem(VALIDATION_EVENT_STORAGE_KEY, JSON.stringify(nextLog));
  } catch {
    // Silently ignore storage failures in restricted browser contexts.
  }

  capturePosthogEvent(name, eventRecord);
};
