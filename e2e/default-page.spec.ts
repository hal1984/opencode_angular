import { test, expect } from '@playwright/test';

test('default welcome page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Hello, opencode_angular');
});
