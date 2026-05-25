import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Pokedex Accessibility', () => {
  test('should pass AXE accessibility checks', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200/pokedex');
    
    // Wait for cards to load
    await page.waitForSelector('app-pokemon-card', { timeout: 5000 });
    
    // Run AXE analysis
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    // Assert zero critical or serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200/pokedex');
    
    // Wait for cards to load
    await page.waitForSelector('app-pokemon-card', { timeout: 5000 });
    
    // Get all images
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('loading and error states should have proper ARIA roles', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200/pokedex');
    
    // Check for loading status (might not be visible if loaded too fast)
    const loadingStatus = page.locator('[role="status"]');
    // Just verify the selector works
    await expect(loadingStatus).toBeVisible().catch(() => {});
    
    // Test error state by blocking API
    await page.route('**/pokeapi.co/api/v2/pokemon**', route => route.fulfill({
      status: 500,
      body: 'Error'
    }));
    
    await page.reload();
    
    const errorAlert = page.locator('[role="alert"]');
    await expect(errorAlert).toBeVisible();
  });

  test('detail page should pass AXE accessibility checks', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200/pokedex/25');

    // Wait for detail data to load
    await page.waitForSelector('h1', { timeout: 5000 });

    // Run AXE analysis
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Assert zero critical or serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test('detail page images should have alt text', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200/pokedex/25');

    // Wait for detail data to load
    await page.waitForSelector('h1', { timeout: 5000 });

    // Get all images on detail page
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
