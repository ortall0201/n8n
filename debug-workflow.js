const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000 // Slow down actions for visibility
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('Navigating to n8n...');
  await page.goto('http://localhost:5678', { waitUntil: 'networkidle' });

  console.log('Waiting for page to load...');
  await page.waitForTimeout(3000);

  // Check if we need to login
  const loginButton = await page.$('button:has-text("Sign in")');
  if (loginButton) {
    console.log('Login page detected - you may need to login manually');
  }

  // Look for workflows
  const workflows = await page.$$('[data-test-id*="workflow"]');
  console.log(`Found ${workflows.length} workflow elements`);

  // Take a screenshot
  await page.screenshot({ path: 'n8n-current-state.png', fullPage: true });
  console.log('Screenshot saved as n8n-current-state.png');

  console.log('\n=== Browser is now open ===');
  console.log('Please navigate to your workflow and execute it.');
  console.log('Press Ctrl+C in this terminal when done to close the browser.');

  // Keep browser open
  await page.waitForTimeout(300000); // Wait 5 minutes before auto-closing

  await browser.close();
})();
