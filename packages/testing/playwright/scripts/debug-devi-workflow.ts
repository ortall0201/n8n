import { chromium, type Browser, type Page } from '@playwright/test';

async function debugDeviWorkflow() {
  console.log('🎭 Starting Playwright to debug Devi workflow...');

  const browser: Browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  const context = await browser.newContext();
  const page: Page = await context.newPage();

  // Listen to console messages
  page.on('console', (msg) => {
    const text = msg.text();
    if (text.includes('🔍') || text.includes('✅') || text.includes('❌') || text.includes('MERGE') || text.includes('DEBUG')) {
      console.log(`[Browser Console] ${text}`);
    }
  });

  try {
    const baseUrl = process.env.N8N_BASE_URL || 'http://localhost:5678';
    console.log(`📍 Navigating to ${baseUrl}...`);

    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');

    // Check if login is needed
    const loginButton = page.getByRole('button', { name: /sign in|log in/i });
    if (await loginButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('🔐 Login page detected');
      console.log('⏳ Waiting 30 seconds for manual login...');
      await page.waitForTimeout(30000);
    }

    // Navigate to workflows
    console.log('📂 Navigating to workflows page...');
    await page.goto(`${baseUrl}/workflows`);
    await page.waitForLoadState('networkidle');

    // Find the Fashion Insights workflow
    console.log('🔍 Looking for Fashion Insights workflow...');

    const workflowCard = page.locator('[data-test-id*="workflow"], .workflow-card').filter({
      hasText: /Fashion Insights.*Google Analytics/i
    }).first();

    const workflowCount = await workflowCard.count();

    if (workflowCount === 0) {
      console.log('❌ Could not find Fashion Insights workflow');
      console.log('📋 Listing all workflows:');
      const allWorkflows = await page.locator('[data-test-id*="workflow-card"]').allTextContents();
      allWorkflows.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));

      await page.screenshot({ path: 'n8n-workflows-list.png', fullPage: true });
      console.log('📸 Screenshot saved to n8n-workflows-list.png');
      return;
    }

    console.log('✅ Found workflow! Opening...');
    await workflowCard.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('🎯 Looking for Execute Workflow button...');

    // Click the execute workflow button
    const executeButton = page.getByRole('button', { name: /execute|test workflow/i }).first();

    if (await executeButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('▶️ Clicking Execute Workflow...');
      await executeButton.click();

      console.log('⏳ Waiting for execution (30 seconds)...');
      await page.waitForTimeout(30000);

      // Check for execution results
      console.log('🔍 Checking execution results...');

      // Look for error indicators
      const errorNodes = page.locator('[class*="error"], [class*="has-issues"], [data-test-id*="node-error"]');
      const errorCount = await errorNodes.count();

      if (errorCount > 0) {
        console.log(`❌ Found ${errorCount} error node(s)!`);

        // Take a screenshot
        await page.screenshot({ path: 'n8n-execution-error.png', fullPage: true });
        console.log('📸 Screenshot saved to n8n-execution-error.png');

        // Try to click on error nodes and get details
        for (let i = 0; i < Math.min(errorCount, 3); i++) {
          const errorNode = errorNodes.nth(i);
          const nodeName = await errorNode.getAttribute('data-name') || await errorNode.textContent() || `Node ${i}`;

          console.log(`\n🔍 Clicking error node: ${nodeName}`);
          await errorNode.click();
          await page.waitForTimeout(1000);

          // Look for error panel
          const errorPanel = page.locator('[class*="error-panel"], [class*="node-error-view"]');
          if (await errorPanel.isVisible({ timeout: 2000 }).catch(() => false)) {
            const errorText = await errorPanel.textContent();
            console.log(`❌ Error details:\n${errorText}`);
          }
        }

        // Look specifically for the GitHub Prepare node
        const githubPrepareNode = page.locator('[data-name*="Prepare Content for GitHub"]');
        if (await githubPrepareNode.count() > 0) {
          console.log('\n🔍 Found GitHub Prepare node, clicking it...');
          await githubPrepareNode.click();
          await page.waitForTimeout(1000);

          // Get the output data
          const outputTab = page.getByRole('tab', { name: /output/i });
          if (await outputTab.isVisible().catch(() => false)) {
            await outputTab.click();
            await page.waitForTimeout(500);

            const outputContent = await page.locator('[class*="output"]').textContent();
            console.log('📄 Node output:', outputContent?.slice(0, 500));
          }
        }

      } else {
        console.log('✅ No errors detected!');
        await page.screenshot({ path: 'n8n-execution-success.png', fullPage: true });
        console.log('📸 Screenshot saved to n8n-execution-success.png');

        // Check if files were created
        console.log('\n📁 Checking if files were created...');
        const fs = require('fs');
        const path = require('path');
        const deviContentPath = path.join(process.cwd(), '../../devi-content/week-1');

        if (fs.existsSync(deviContentPath)) {
          const files = fs.readdirSync(deviContentPath);
          console.log('✅ Files in devi-content/week-1:', files);
        } else {
          console.log('❌ devi-content/week-1 folder not found');
        }
      }

    } else {
      console.log('❌ Could not find Execute Workflow button');
      await page.screenshot({ path: 'n8n-no-execute-button.png', fullPage: true });
    }

    console.log('\n⏸️  Pausing for 15 seconds for inspection...');
    await page.waitForTimeout(15000);

  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: 'n8n-playwright-error.png', fullPage: true });
  } finally {
    console.log('🏁 Closing browser...');
    await browser.close();
  }
}

debugDeviWorkflow().catch(console.error);
