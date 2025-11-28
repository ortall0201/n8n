const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Opening n8n...');
    await page.goto('http://localhost:5678', { waitUntil: 'networkidle', timeout: 10000 });

    await page.waitForTimeout(2000);

    // Take screenshot of workflows page
    await page.screenshot({ path: 'n8n-workflows-page.png', fullPage: true });
    console.log('Screenshot saved: n8n-workflows-page.png');

    // Try to find and click on the workflow
    console.log('Looking for Fashion Insights workflow...');

    const workflowCard = await page.locator('text=/Fashion Insights/i').first();

    if (await workflowCard.count() > 0) {
      console.log('Found workflow, clicking...');
      await workflowCard.click();
      await page.waitForTimeout(3000);

      // Take screenshot of the workflow canvas
      await page.screenshot({ path: 'n8n-workflow-canvas.png', fullPage: true });
      console.log('Workflow screenshot saved: n8n-workflow-canvas.png');

      // Try to zoom out to see all nodes
      await page.keyboard.press('Control+-');
      await page.keyboard.press('Control+-');
      await page.waitForTimeout(1000);

      await page.screenshot({ path: 'n8n-workflow-full.png', fullPage: true });
      console.log('Full workflow screenshot saved: n8n-workflow-full.png');

    } else {
      console.log('Could not find Fashion Insights workflow');
    }

    console.log('\n✅ Screenshots saved. Check the files to see the connections.');

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: 'n8n-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
