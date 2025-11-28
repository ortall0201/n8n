const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser to debug workflow...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to n8n...');
    await page.goto('http://localhost:5678', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Take screenshot of current state
    await page.screenshot({ path: 'n8n-debug-1-initial.png', fullPage: true });
    console.log('Screenshot 1: Initial state');

    // Look for the workflow canvas
    console.log('\nLooking for workflow nodes...');

    // Find "Prepare Email with Products" node
    const prepareEmailNode = await page.locator('text=/Prepare Email with Products/i').first();
    if (await prepareEmailNode.isVisible()) {
      console.log('Found "Prepare Email with Products" node!');
      await prepareEmailNode.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'n8n-debug-2-node-selected.png', fullPage: true });
      console.log('Screenshot 2: Node selected');

      // Look for execution data or errors
      const errorText = await page.locator('text=/error/i').first();
      if (await errorText.isVisible({ timeout: 2000 }).catch(() => false)) {
        const errorContent = await errorText.textContent();
        console.log('\n❌ ERROR FOUND:', errorContent);
      }

      // Look for output data
      const outputPanel = await page.locator('[data-test-id*="output"], .output-panel, [class*="output"]').first();
      if (await outputPanel.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log('\n📊 Output panel found');
        await page.screenshot({ path: 'n8n-debug-3-output.png', fullPage: true });
        console.log('Screenshot 3: Output panel');
      }
    }

    // Find the Execute Workflow button
    const executeButton = await page.locator('button:has-text("Execute workflow"), button:has-text("Execute")').first();
    if (await executeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('\n▶️ Found Execute button - clicking...');
      await executeButton.click();
      await page.waitForTimeout(5000); // Wait for execution
      await page.screenshot({ path: 'n8n-debug-4-after-execution.png', fullPage: true });
      console.log('Screenshot 4: After execution');

      // Check which nodes have green checkmarks
      console.log('\nChecking node execution status...');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'n8n-debug-5-final-state.png', fullPage: true });
      console.log('Screenshot 5: Final execution state');
    }

    // Click on "Prepare Email with Products" node again to see its state
    if (await prepareEmailNode.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('\nClicking on "Prepare Email with Products" to check execution result...');
      await prepareEmailNode.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'n8n-debug-6-prepare-email-result.png', fullPage: true });
      console.log('Screenshot 6: Prepare Email node result');
    }

    // Click on "Loop Over Subscribers" to check its output
    const loopNode = await page.locator('text=/Loop Over Subscribers/i').first();
    if (await loopNode.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('\nClicking on "Loop Over Subscribers" to check output...');
      await loopNode.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'n8n-debug-7-loop-output.png', fullPage: true });
      console.log('Screenshot 7: Loop node output');
    }

    console.log('\n✅ Debug complete! Check the n8n-debug-*.png files');
    console.log('Press Ctrl+C to close the browser.');

    // Keep browser open
    await page.waitForTimeout(120000); // 2 minutes

  } catch (error) {
    console.error('Error during debugging:', error.message);
    await page.screenshot({ path: 'n8n-debug-error.png', fullPage: true });
  }

  await browser.close();
})();
