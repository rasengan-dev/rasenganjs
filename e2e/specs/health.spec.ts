import { test, expect } from '@playwright/test';

test('smoke: page loads and returns 200', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
});
