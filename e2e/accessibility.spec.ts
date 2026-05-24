import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('default page passes critical accessibility checks', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .options({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })
    .exclude('.pill')
    .analyze();
  expect(results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious')).toEqual([]);
});
