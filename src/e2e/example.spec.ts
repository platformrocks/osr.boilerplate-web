/**
 * File: src/e2e/example.spec.ts
 * Purpose: E2E tests for the OSR Boilerplate Web home page functionality
 * Author: platform.rocks
 * License: MIT
 */
import { expect, test } from '@playwright/test';

/**
 * Test group for home page functionality
 */
test.describe('Home Page', () => {
  /**
   * Test that the home page loads successfully and displays the main heading
   */
  test('should load home page and display main heading', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Wait for the page to be loaded
    await page.waitForLoadState('networkidle');

    // Check that the main heading is visible
    await expect(page.locator('h1')).toBeVisible();

    // Verify the page title contains expected text
    await expect(page).toHaveTitle(/Open Source Iniciative by platform.rocks/);

    // Check for the presence of the main heading text
    const heading = page.locator('h1').first();
    await expect(heading).toContainText('Open Source Rocks');
  });

  /**
   * Test that internationalization links are present and functional
   */
  test('should display language switcher links', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Wait for the page to be loaded
    await page.waitForLoadState('networkidle');

    // Check that language links are present
    const ptLink = page.locator('a[href="/pt-BR"]');
    const enLink = page.locator('a[href="/en-US"]');
    const esLink = page.locator('a[href="/es-ES"]');

    await expect(ptLink).toBeVisible();
    await expect(enLink).toBeVisible();
    await expect(esLink).toBeVisible();
  });

  /**
   * Test navigation between different locales
   */
  test('should navigate between different locales', async ({ page }) => {
    // Start at the home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate directly to English locale
    await page.goto('/en-US');
    await page.waitForLoadState('networkidle');

    // Verify we're on the English version
    expect(page.url()).toContain('/en-US');

    // Navigate directly to Spanish locale
    await page.goto('/es-ES');
    await page.waitForLoadState('networkidle');

    // Verify we're on the Spanish version
    expect(page.url()).toContain('/es-ES');

    // Navigate directly to Portuguese locale
    await page.goto('/pt-BR');
    await page.waitForLoadState('networkidle');

    // Verify we're on the Portuguese version
    expect(page.url()).toContain('/pt-BR');
  });

  /**
   * Test that the page is responsive and displays correctly on mobile
   */
  test('should display correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to the home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that the main heading is still visible on mobile
    await expect(page.locator('h1')).toBeVisible();

    // Verify that the layout adapts to mobile (check for mobile-specific classes)
    const mainContainer = page.locator('div.grid');
    await expect(mainContainer).toBeVisible();
  });

  /**
   * Test basic accessibility features
   */
  test('should have basic accessibility features', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Check that links have proper href attributes
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    // Check that the page has a proper title
    await expect(page).toHaveTitle(/.+/);
  });
});
