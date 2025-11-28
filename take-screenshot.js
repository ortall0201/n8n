const { chromium } = require('playwright');

(async () => {
  console.log('Connecting to existing browser...');

  try {
    // Connect to the running browser
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const contexts = browser.contexts();

    if (contexts.length > 0) {
      const pages = contexts[0].pages();
      if (pages.length > 0) {
        const page = pages[0];

        console.log('Taking screenshot...');
        await page.screenshot({ path: 'n8n-execution-state.png', fullPage: true });
        console.log('Screenshot saved as n8n-execution-state.png');

        // Get the URL
        const url = page.url();
        console.log('Current URL:', url);
      }
    }

    await browser.close();
  } catch (error) {
    console.log('Could not connect to browser. Taking manual screenshot attempt...');

    // Fallback: open new browser instance
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:5678', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'n8n-execution-state.png', fullPage: true });
    console.log('Screenshot saved as n8n-execution-state.png');
    await browser.close();
  }
})();
