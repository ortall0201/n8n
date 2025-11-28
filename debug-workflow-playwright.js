const { chromium } = require('playwright');

(async () => {
  console.log('🎭 Starting Playwright to debug n8n workflow...');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen to console messages from the page
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (text.includes('🔍') || text.includes('✅') || text.includes('❌')) {
      console.log(`[Browser Console] ${text}`);
    }
  });

  try {
    console.log('📍 Navigating to n8n...');
    await page.goto('http://localhost:5678');
    await page.waitForTimeout(2000);

    // Check if we're on login page or main page
    const isLoginPage = await page.locator('input[type="password"]').count() > 0;

    if (isLoginPage) {
      console.log('🔐 Login page detected - you may need to log in manually');
      console.log('⏳ Waiting 30 seconds for you to log in...');
      await page.waitForTimeout(30000);
    }

    console.log('🔍 Looking for workflows page...');

    // Go to workflows page
    await page.goto('http://localhost:5678/workflows');
    await page.waitForTimeout(2000);

    console.log('🔍 Looking for "Fashion Insights" workflow...');

    // Find the workflow - try different selectors
    const workflowLink = page.locator('text=/Fashion Insights.*Google Analytics/i').first();

    if (await workflowLink.count() > 0) {
      console.log('✅ Found workflow! Opening it...');
      await workflowLink.click();
      await page.waitForTimeout(3000);

      console.log('🎯 Looking for Execute Workflow button...');

      // Look for the Execute Workflow button
      const executeButton = page.locator('button:has-text("Execute workflow"), button:has-text("Test workflow")').first();

      if (await executeButton.count() > 0) {
        console.log('✅ Found Execute button!');
        console.log('▶️ Clicking Execute Workflow...');
        await executeButton.click();
        console.log('⏳ Waiting for execution to complete...');
        await page.waitForTimeout(10000);

        // Check for error nodes (red nodes)
        const errorNodes = await page.locator('[class*="error"], [class*="failed"]').count();

        if (errorNodes > 0) {
            console.log('❌ Found error nodes! Taking screenshot...');
            await page.screenshot({ path: 'n8n-error-screenshot.png', fullPage: true });
            console.log('📸 Screenshot saved to n8n-error-screenshot.png');

            // Try to find and click the error node
            console.log('🔍 Looking for error details...');
            const errorNode = page.locator('[class*="error"], [class*="failed"]').first();
            await errorNode.click();
            await page.waitForTimeout(1000);

            // Look for error message in panel
            const errorText = await page.locator('[class*="error"], [class*="message"]').allTextContents();
            console.log('❌ Error messages found:');
            errorText.forEach(text => console.log('  ', text));
        } else {
          console.log('✅ No errors detected! Checking node outputs...');
          await page.screenshot({ path: 'n8n-success-screenshot.png', fullPage: true });
          console.log('📸 Screenshot saved to n8n-success-screenshot.png');
        }
      } else {
        console.log('❌ Could not find Execute Workflow button');
        await page.screenshot({ path: 'n8n-no-execute-button.png', fullPage: true });
      }
    } else {
      console.log('❌ Could not find Fashion Insights workflow');
      console.log('📋 Available workflows:');
      const workflows = await page.locator('[data-test-id*="workflow"], .workflow-item').allTextContents();
      workflows.forEach(w => console.log('  -', w));
      await page.screenshot({ path: 'n8n-workflows-list.png', fullPage: true });
    }

    console.log('\n⏸️  Pausing for 10 seconds so you can inspect...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'n8n-error.png', fullPage: true });
  } finally {
    console.log('🏁 Done! Closing browser...');
    await browser.close();
  }
})();
