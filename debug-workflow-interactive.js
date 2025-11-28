const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('Navigating to n8n...');
  await page.goto('http://localhost:5678', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take initial screenshot
  await page.screenshot({ path: 'n8n-step1-initial.png', fullPage: true });
  console.log('Step 1: Initial state captured');

  // Check if login is needed
  const emailInput = await page.$('input[type="email"], input[name="email"]');
  if (emailInput) {
    console.log('\n=== LOGIN REQUIRED ===');
    console.log('Please login manually in the browser window.');
    console.log('After logging in, I will help you navigate to the workflow.');

    // Wait for login (URL changes after login)
    await page.waitForURL(/\/(workflow|workflows|home|executions)/, { timeout: 60000 });
    console.log('Login successful!');
    await page.screenshot({ path: 'n8n-step2-logged-in.png', fullPage: true });
  }

  // Navigate to workflows page
  console.log('\nNavigating to workflows...');
  await page.goto('http://localhost:5678/workflows', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'n8n-step3-workflows-list.png', fullPage: true });
  console.log('Step 3: Workflows list captured');

  // Try to find the fashion insights workflow
  const workflowCards = await page.$$('[data-test-id*="workflow-card"], .workflow-card, [class*="card"]');
  console.log(`\nFound ${workflowCards.length} workflow cards`);

  // Look for the workflow by name
  const fashionWorkflow = await page.$('text=/Fashion Insights/i');
  if (fashionWorkflow) {
    console.log('Found Fashion Insights workflow! Clicking...');
    await fashionWorkflow.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'n8n-step4-workflow-opened.png', fullPage: true });
    console.log('Step 4: Workflow opened');

    // Look for Execute Workflow button
    const executeButton = await page.$('button:has-text("Execute Workflow"), button:has-text("Execute"), [data-test-id*="execute"]');
    if (executeButton) {
      console.log('\n✅ Execute Workflow button found!');
      console.log('You can now click it to execute the workflow.');

      // Highlight the button
      await executeButton.evaluate(el => {
        el.style.border = '3px solid red';
        el.style.boxShadow = '0 0 10px red';
      });
    } else {
      console.log('\n⚠️ Execute button not found. Taking screenshot for debugging...');
    }
  } else {
    console.log('\n⚠️ Fashion Insights workflow not found in the list.');
    console.log('Available workflows on the page - check n8n-step3-workflows-list.png');
  }

  console.log('\n=== Browser is ready ===');
  console.log('Screenshots saved: n8n-step1-initial.png, n8n-step2-logged-in.png, n8n-step3-workflows-list.png, n8n-step4-workflow-opened.png');
  console.log('Press Ctrl+C when done to close the browser.');

  // Keep browser open
  await page.waitForTimeout(600000); // 10 minutes

  await browser.close();
})();
