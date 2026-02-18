import { expect, test } from '@playwright/test';

test.describe('Employer contact form', () => {
  test('submits and shows success feedback', async ({ page }) => {
    let requestBody: Record<string, string> | null = null;

    await page.route('**/api/pilot-conversation', async (route) => {
      const request = route.request();
      expect(request.method()).toBe('POST');
      requestBody = JSON.parse(request.postData() ?? '{}') as Record<string, string>;

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Pilot request email sent.',
          id: 'email_123'
        })
      });
    });

    await page.goto('/');

    const form = page.locator('form[aria-label="Employer contact form"]');
    await form.getByLabel('Name').fill('Jane Recruiter');
    await form.getByLabel('Work email').fill('jane@company.com');
    await form.getByLabel('Annual graduate hires').fill('50+');
    await form.getByLabel('Primary goal').fill('Improve interview conversion.');

    await form.getByRole('button', { name: 'Request Pilot Conversation' }).click();

    await expect(page.getByText('Pilot request email sent.')).toBeVisible();
    expect(requestBody).toEqual({
      name: 'Jane Recruiter',
      email: 'jane@company.com',
      volume: '50+',
      goal: 'Improve interview conversion.'
    });
  });

  test('shows API error feedback when submission fails', async ({ page }) => {
    await page.route('**/api/pilot-conversation', async (route) => {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Unable to reach Resend right now.'
        })
      });
    });

    await page.goto('/');

    const form = page.locator('form[aria-label="Employer contact form"]');
    await form.getByLabel('Name').fill('Pat Hiring Manager');
    await form.getByLabel('Work email').fill('pat@company.com');

    await form.getByRole('button', { name: 'Request Pilot Conversation' }).click();

    await expect(page.getByText('Unable to reach Resend right now.')).toBeVisible();
  });
});
