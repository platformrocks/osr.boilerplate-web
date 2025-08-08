# End-to-End Testing

This directory contains End-to-End (E2E) tests for the OSR Boilerplate Web application using [Playwright](https://playwright.dev/).

## Overview

E2E tests validate the application's functionality from a user's perspective, testing complete user workflows across different browsers and devices.

## Test Structure

```
src/e2e/
├── example.spec.ts      # Example test file demonstrating best practices
└── README.md           # This file
```

## Running Tests

### Available Scripts

- `pnpm test:e2e` - Run all E2E tests headlessly
- `pnpm test:e2e:headed` - Run tests with browser UI visible
- `pnpm test:e2e:debug` - Run tests in debug mode with step-by-step execution
- `pnpm test:e2e:ui` - Open Playwright UI for interactive test development
- `pnpm test:e2e:report` - View HTML test report
- `pnpm test:e2e:install` - Install/update browser dependencies

### Quick Start

1. **Install browser dependencies** (first time only):

   ```bash
   pnpm test:e2e:install
   ```

2. **Start the development server**:

   ```bash
   pnpm dev
   ```

3. **Run tests in another terminal**:
   ```bash
   pnpm test:e2e
   ```

## Test Configuration

The Playwright configuration is located at `playwright.config.ts` in the project root and includes:

- **Browsers**: Chromium, Firefox, WebKit (Safari)
- **Base URL**: http://localhost:3000
- **Test Directory**: `src/e2e`
- **Retry Logic**: 2 retries on CI, 0 locally
- **Parallel Execution**: Optimized for CI/CD pipelines
- **Reports**: HTML reports with screenshots and traces on failure

## Writing Tests

### Test File Naming

- Use `.spec.ts` suffix for test files
- Name files descriptively (e.g., `auth.spec.ts`, `checkout.spec.ts`)
- Group related tests in the same file

### Basic Test Structure

```typescript
import { expect, test } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should perform specific action', async ({ page }) => {
    // Navigate to page
    await page.goto('/path');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Perform actions and assertions
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Wait for elements** before interacting with them
3. **Use data-testid attributes** for reliable element selection
4. **Test user workflows** rather than implementation details
5. **Include accessibility checks** where appropriate
6. **Clean up after tests** if they create persistent data

### Internationalization Testing

Since this application supports multiple locales (EN, ES, PT-BR), include tests that verify:

- Language switching functionality
- Proper content display in different locales
- URL structure with locale prefixes

### Example Test Patterns

```typescript
// Testing navigation
test('should navigate between pages', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page).toHaveURL('/en-US/about');
});

// Testing forms
test('should submit contact form', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[data-testid="name-input"]', 'John Doe');
  await page.fill('[data-testid="email-input"]', 'john@example.com');
  await page.click('[data-testid="submit-button"]');
  await expect(page.locator('.success-message')).toBeVisible();
});

// Testing responsive design
test('should work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
});
```

## Debugging Tests

### Using Playwright Inspector

```bash
pnpm test:e2e:debug
```

This opens the Playwright Inspector, allowing you to:

- Step through tests line by line
- Inspect page elements
- View network requests
- Debug test failures

### Using Playwright UI

```bash
pnpm test:e2e:ui
```

This opens a web interface for:

- Running tests interactively
- Viewing test results
- Analyzing test traces
- Debugging failures

## Continuous Integration

The Playwright configuration is optimized for CI environments:

- **Retries**: Failed tests retry automatically
- **Parallelization**: Tests run in parallel for faster execution
- **Artifacts**: Screenshots and traces saved on failure
- **Reports**: HTML reports generated for test results

### GitHub Actions Example

```yaml
- name: Install dependencies
  run: pnpm install

- name: Install Playwright browsers
  run: pnpm test:e2e:install

- name: Build application
  run: pnpm build

- name: Run E2E tests
  run: pnpm test:e2e

- name: Upload test reports
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Troubleshooting

### Common Issues

1. **Tests fail intermittently**
   - Add proper wait conditions (`waitForLoadState`, `waitForSelector`)
   - Increase timeout values if necessary
   - Check for race conditions

2. **Elements not found**
   - Verify selectors are correct
   - Ensure elements are visible before interacting
   - Use `data-testid` attributes for stable selection

3. **Browser installation issues**
   - Run `pnpm test:e2e:install` to reinstall browsers
   - Check system requirements
   - Clear Playwright cache if needed

### Getting Help

- [Playwright Documentation](https://playwright.dev/docs)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Troubleshooting Guide](https://playwright.dev/docs/troubleshooting)

## Contributing

When adding new features, please include corresponding E2E tests that:

1. Cover the main user workflow
2. Test edge cases and error conditions
3. Verify internationalization support
4. Include accessibility checks
5. Follow the established patterns and conventions

Remember to run the full test suite before submitting pull requests:

```bash
pnpm test:e2e
```
