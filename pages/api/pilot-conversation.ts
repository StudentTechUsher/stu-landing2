import type { NextApiRequest, NextApiResponse } from 'next';

type PilotConversationBody = {
  name?: string;
  email?: string;
  volume?: string;
  goal?: string;
};

type ErrorResponse = {
  message: string;
};

type SuccessResponse = {
  message: string;
  id: string;
};

const getTrimmed = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const buildEmailBody = (name: string, email: string, volume: string, goal: string) => {
  return [
    'Pilot conversation request details:',
    '',
    `Name: ${name || 'Not provided'}`,
    `Email: ${email || 'Not provided'}`,
    `Annual graduate hires: ${volume || 'Not provided'}`,
    '',
    'Primary goal:',
    goal || 'Not provided'
  ].join('\n');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY ?? process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ message: 'Missing Resend API key. Add RESEND_API_KEY in your environment.' });
  }

  const fromEmail = process.env.PILOT_FROM_EMAIL ?? 'onboarding@resend.dev';
  const defaultRecipient = process.env.PILOT_RECIPIENT_EMAIL ?? process.env.NEXT_PUBLIC_PILOT_EMAIL ?? 'vin@stuplanning.com';

  const payload = (req.body ?? {}) as PilotConversationBody;
  const name = getTrimmed(payload.name);
  const email = getTrimmed(payload.email);
  const volume = getTrimmed(payload.volume);
  const goal = getTrimmed(payload.goal);

  const subject = `Pilot conversation request${name ? ` - ${name}` : ''}`;
  const text = buildEmailBody(name, email, volume, goal);

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [defaultRecipient],
        subject,
        text,
        ...(email ? { reply_to: email } : {})
      })
    });

    if (!resendResponse.ok) {
      const errorPayload = (await resendResponse.json().catch(() => null)) as { message?: string } | null;
      const message = errorPayload?.message ?? 'Resend request failed.';
      return res.status(502).json({ message });
    }

    const successPayload = (await resendResponse.json().catch(() => null)) as { id?: string } | null;
    const id = successPayload?.id;
    if (!id) {
      return res.status(502).json({ message: 'Resend accepted request but returned no message id.' });
    }

    return res.status(200).json({
      message: 'Pilot request email sent.',
      id
    });
  } catch {
    return res.status(502).json({ message: 'Unable to reach Resend right now.' });
  }
}
