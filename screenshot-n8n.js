const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // Navigate to n8n
    await page.goto('http://localhost:5678', { waitUntil: 'networkidle', timeout: 10000 });

    // Wait a bit for the page to fully load
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'n8n-current-view.png',
      fullPage: true
    });

    console.log('Screenshot saved to n8n-current-view.png');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
