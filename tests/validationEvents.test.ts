import { describe, expect, it, vi } from 'vitest';
import {
  trackValidationEvent,
  VALIDATION_EVENT_STORAGE_KEY,
  VALIDATION_EVENT_WINDOW_EVENT
} from '../lib/telemetry/validationEvents';

describe('trackValidationEvent', () => {
  it('no-ops safely when window is unavailable', () => {
    const originalWindow = globalThis.window;

    vi.stubGlobal('window', undefined);
    expect(() => trackValidationEvent('walkthrough_viewed')).not.toThrow();

    vi.stubGlobal('window', originalWindow);
  });

  it('writes to dataLayer, dispatches custom event, and stores in session log', () => {
    const telemetryWindow = window as Window & {
      dataLayer?: Array<Record<string, unknown>>;
    };

    telemetryWindow.dataLayer = [];
    window.sessionStorage.removeItem(VALIDATION_EVENT_STORAGE_KEY);

    const onEvent = vi.fn();
    window.addEventListener(VALIDATION_EVENT_WINDOW_EVENT, onEvent as EventListener);

    trackValidationEvent('walkthrough_step_viewed', {
      stepId: 'student-dashboard',
      stepIndex: 3,
      chapter: 'Student progression'
    });

    expect(Array.isArray(telemetryWindow.dataLayer)).toBe(true);
    expect(telemetryWindow.dataLayer?.length).toBe(1);
    expect(telemetryWindow.dataLayer?.[0]).toMatchObject({
      event: 'stu_validation',
      eventName: 'walkthrough_step_viewed',
      stepId: 'student-dashboard',
      stepIndex: 3
    });

    expect(onEvent).toHaveBeenCalledTimes(1);

    const storedRaw = window.sessionStorage.getItem(VALIDATION_EVENT_STORAGE_KEY);
    expect(storedRaw).not.toBeNull();

    const storedEvents = JSON.parse(storedRaw ?? '[]') as Array<Record<string, unknown>>;
    expect(storedEvents.length).toBe(1);
    expect(storedEvents[0]).toMatchObject({
      eventName: 'walkthrough_step_viewed',
      chapter: 'Student progression'
    });

    window.removeEventListener(VALIDATION_EVENT_WINDOW_EVENT, onEvent as EventListener);
    delete telemetryWindow.dataLayer;
    window.sessionStorage.removeItem(VALIDATION_EVENT_STORAGE_KEY);
  });
});
