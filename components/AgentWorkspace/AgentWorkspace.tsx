import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const panels = [
  {
    id: 'agent-1',
    title: 'Capability Mapping Agent',
    detail: 'Converts employer role criteria into weighted capability definitions.'
  },
  {
    id: 'agent-2',
    title: 'Readiness Evidence Agent',
    detail: 'Normalizes student artifacts into comparable capability vectors.'
  },
  {
    id: 'agent-3',
    title: 'Outcome Calibration Agent',
    detail: 'Learns from interview, hire, and retention outcomes to tune scoring.'
  }
] as const;

export const AgentWorkspace = () => {
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const selectedPanel = useMemo(
    () => panels.find((panel) => panel.id === selectedPanelId) ?? null,
    [selectedPanelId]
  );

  useEffect(() => {
    if (!selectedPanel) return;

    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPanelId(null);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedPanel]);

  return (
    <section aria-labelledby="agent-workspace-title" className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 id="agent-workspace-title" className="text-3xl font-semibold tracking-tight text-slate-900">
          Agent workspace preview
        </h2>
        <Badge>Prototype</Badge>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {panels.map((panel) => (
          <Card
            key={panel.id}
            header={<h3 className="text-base font-semibold text-slate-900">{panel.title}</h3>}
            footer={
              <Button
                variant="ghost"
                size="sm"
                aria-label={`Open details for ${panel.title}`}
                onClick={() => setSelectedPanelId(panel.id)}
              >
                View details
              </Button>
            }
          >
            <p className="text-sm text-slate-600">{panel.detail}</p>
          </Card>
        ))}
      </div>

      {selectedPanel ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="agent-dialog-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <h3 id="agent-dialog-title" className="text-xl font-semibold text-slate-900">
              {selectedPanel.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{selectedPanel.detail}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              TODO: Wire this modal to real agent state from Vercel AI SDK + Anthropic-backed workflows.
            </p>
            <div className="mt-5 flex justify-end">
              <Button
                ref={closeButtonRef}
                variant="secondary"
                aria-label="Close agent details"
                onClick={() => setSelectedPanelId(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
