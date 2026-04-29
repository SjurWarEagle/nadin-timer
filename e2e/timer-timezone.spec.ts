// fallow-ignore-next-line unused-files
import { test, expect, chromium, Browser, BrowserContext } from '@playwright/test';

test.describe('Timer Timezone Test', () => {
  let browser: Browser;
  let context: BrowserContext;

  test('5-minute timer should show ~5 minutes regardless of timezone', async () => {
    // Create browser with explicit timezone
    browser = await chromium.launch();
    context = await browser.newContext({
      timezoneId: 'America/Los_Angeles',
      locale: 'en-US'
    });
    const page = await context.newPage();

    try {
      // Navigate to the timer app
      await page.goto('http://localhost:96');

      // Click on the 5 minute button
      const fiveMinButton = page.locator('button.time', { hasText: '5' }).first();
      await fiveMinButton.click();

      // Wait for navigation to run timer page
      await page.waitForURL(/\/run/);

      // Wait a moment for timer to initialize and tick
      await page.waitForTimeout(500);

      // Get the displayed time (format: MM:SS)
      // The timer should show something close to 05:00
      const timerText = await page.locator('.time-display, app-run-timer').textContent();

      // Extract minutes from timer display
      // Expected format is typically "05:xx" or similar
      const minuteMatch = timerText?.match(/(\d+):(\d+)/);

      if (minuteMatch) {
        const displayedMinutes = parseInt(minuteMatch[1], 10);

        // Should be 5 minutes (with some tolerance for tick-down)
        expect(displayedMinutes).toBeGreaterThanOrEqual(4);
        expect(displayedMinutes).toBeLessThanOrEqual(5);
      }

      // Also verify we don't have garbage like 8+ hours
      const minuteValue = parseInt(minuteMatch?.[1] || '0', 10);
      expect(minuteValue).toBeLessThan(60); // Should not be hours

    } finally {
      await context.close();
      await browser.close();
    }
  });

  test('timer should work correctly in Tokyo timezone (UTC+9)', async () => {
    browser = await chromium.launch();
    context = await browser.newContext({
      timezoneId: 'Asia/Tokyo',
      locale: 'ja-JP'
    });
    const page = await context.newPage();

    try {
      await page.goto('http://localhost:96');

      const fiveMinButton = page.locator('button.time', { hasText: '5' }).first();
      await fiveMinButton.click();

      await page.waitForURL(/\/run/);
      await page.waitForTimeout(500);

      const timerText = await page.locator('app-run-timer').textContent();
      const minuteMatch = timerText?.match(/(\d+):(\d+)/);

      if (minuteMatch) {
        const displayedMinutes = parseInt(minuteMatch[1], 10);
        expect(displayedMinutes).toBeGreaterThanOrEqual(4);
        expect(displayedMinutes).toBeLessThanOrEqual(5);
      }

    } finally {
      await context.close();
      await browser.close();
    }
  });

  test('timer should work correctly in London timezone (UTC+0)', async () => {
    browser = await chromium.launch();
    context = await browser.newContext({
      timezoneId: 'Europe/London',
      locale: 'en-GB'
    });
    const page = await context.newPage();

    try {
      await page.goto('http://localhost:96');

      const fiveMinButton = page.locator('button.time', { hasText: '5' }).first();
      await fiveMinButton.click();

      await page.waitForURL(/\/run/);
      await page.waitForTimeout(500);

      const timerText = await page.locator('app-run-timer').textContent();
      const minuteMatch = timerText?.match(/(\d+):(\d+)/);

      if (minuteMatch) {
        const displayedMinutes = parseInt(minuteMatch[1], 10);
        expect(displayedMinutes).toBeGreaterThanOrEqual(4);
        expect(displayedMinutes).toBeLessThanOrEqual(5);
      }

    } finally {
      await context.close();
      await browser.close();
    }
  });
});
