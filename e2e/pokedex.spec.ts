import { test, expect } from '@playwright/test';

test.describe('Pokedex User Journey', () => {
  test('US1: Navigate to Pokedex from home page', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200');
    
    // Verify Pokedex button is visible
    const pokedexButton = page.locator('a:has-text("Pokedex")');
    await expect(pokedexButton).toBeVisible();
    
    // Measure page transition time
    const startTime = Date.now();
    await pokedexButton.click();
    
    // Assert URL ends with /pokedex
    await expect(page).toHaveURL(/.*\/pokedex/);
    
    // Assert heading is visible
    const heading = page.locator('h1:has-text("Pokedex")');
    await expect(heading).toBeVisible();
    
    // SC-001: Page transition should be under 3 seconds
    const transitionTime = Date.now() - startTime;
    expect(transitionTime).toBeLessThan(3000);
  });

  test('US2: Pokemon cards render with data', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200/pokedex');
    
    // Wait for loading to complete and cards to render
    const startTime = Date.now();
    const cards = page.locator('app-pokemon-card');
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
    
    // SC-002: First card should render within 5 seconds
    const renderTime = Date.now() - startTime;
    expect(renderTime).toBeLessThan(5000);
    
    // Verify at least one card has image and name
    const firstCard = cards.first();
    await expect(firstCard.locator('img')).toBeVisible();
    await expect(firstCard.locator('p')).not.toBeEmpty();
  });

  test('US3: Load More pagination works', async ({ page }) => {
    await page.goto('http://127.0.0.1:4200/pokedex');
    
    // Wait for initial cards
    const cards = page.locator('app-pokemon-card');
    await expect(cards.first()).toBeVisible();
    
    // Get initial count
    const initialCount = await cards.count();
    
    // Click Load More
    const loadMoreButton = page.locator('button:has-text("Load More")');
    if (await loadMoreButton.isVisible()) {
      await loadMoreButton.click();
      
      // Wait for more cards to load
      await page.waitForTimeout(1000);
      
      // Verify count increased
      const newCount = await cards.count();
      expect(newCount).toBeGreaterThan(initialCount);
    }
  });

  test('Image fallback when sprite fails to load', async ({ page }) => {
    // Intercept sprite CDN requests and return 404
    await page.route('**/PokeAPI/sprites/**', route => route.fulfill({
      status: 404,
      body: 'Not Found'
    }));
    
    await page.goto('http://127.0.0.1:4200/pokedex');
    
    // Wait for cards to render
    const cards = page.locator('app-pokemon-card');
    await expect(cards.first()).toBeVisible();
    
    // Verify fallback placeholder is visible (CSS class)
    const firstCard = cards.first();
    await expect(firstCard.locator('.fallback-placeholder')).toBeVisible();
  });

  test('Error state and retry functionality', async ({ page }) => {
    // Intercept PokeAPI and return 500
    await page.route('**/pokeapi.co/api/v2/pokemon**', route => route.fulfill({
      status: 500,
      body: 'Internal Server Error'
    }));
    
    await page.goto('http://127.0.0.1:4200/pokedex');
    
    // Verify error message
    const errorMessage = page.locator('text=Could not load Pokemon. Please try again.');
    await expect(errorMessage).toBeVisible();
    
    // Verify retry button
    const retryButton = page.locator('button:has-text("Retry")');
    await expect(retryButton).toBeVisible();
  });
});
