const { chromium } = require('playwright');

(async () => {
  console.log('Opening browser...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: null // Use full screen
  });

  const page = await context.newPage();

  console.log('Navigating to n8n workflow editor...');
  await page.goto('http://localhost:5678/workflow/Instagram%20Fashion%20Insights%20-%20Influencer%20Products%20+%20Voice%20AI', { waitUntil: 'networkidle' });

  console.log('\n=== Browser is open and ready ===');
  console.log('The browser will stay open.');
  console.log('If you need to login, please do so.');
  console.log('Then click the "Execute workflow" button.');
  console.log('\nPress Ctrl+C in this terminal when you want to close the browser.');

  // Keep browser open indefinitely
  await new Promise(() => {}); // Never resolves, keeps running
})();

process.on('SIGINT', () => {
  console.log('\nClosing browser...');
  process.exit(0);
});
