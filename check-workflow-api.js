const http = require('http');

console.log('🔍 Checking n8n workflow via API...\n');

// Function to make HTTP request
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5678,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function main() {
  try {
    // 1. Get list of workflows
    console.log('📋 Fetching workflows...');
    const workflowsResp = await makeRequest('/rest/workflows');

    if (workflowsResp.status !== 200) {
      console.log('❌ Failed to fetch workflows. Is n8n running on localhost:5678?');
      console.log('Response:', workflowsResp);
      return;
    }

    const workflows = workflowsResp.data.data || workflowsResp.data;
    console.log(`✅ Found ${workflows.length} workflows\n`);

    // Find the Fashion Insights workflow
    const deviWorkflow = workflows.find(w =>
      w.name && w.name.includes('Fashion Insights') && w.name.includes('Google Analytics')
    );

    if (!deviWorkflow) {
      console.log('❌ Could not find "Fashion Insights - Google Analytics" workflow');
      console.log('\n📋 Available workflows:');
      workflows.forEach((w, i) => {
        console.log(`  ${i + 1}. ${w.name} (ID: ${w.id})`);
      });
      return;
    }

    console.log(`✅ Found workflow: "${deviWorkflow.name}"`);
    console.log(`   ID: ${deviWorkflow.id}`);
    console.log(`   Active: ${deviWorkflow.active}\n`);

    // 2. Get workflow details
    console.log('🔍 Fetching workflow details...');
    const workflowResp = await makeRequest(`/rest/workflows/${deviWorkflow.id}`);

    if (workflowResp.status !== 200) {
      console.log('❌ Failed to fetch workflow details');
      return;
    }

    const workflow = workflowResp.data;
    console.log(`✅ Workflow has ${workflow.nodes.length} nodes\n`);

    // Find the key nodes
    const mergeNode = workflow.nodes.find(n => n.name.includes('Merge All Devi Content'));
    const prepareNode = workflow.nodes.find(n => n.name.includes('Prepare Content for GitHub'));
    const affiliateNode = workflow.nodes.find(n => n.name.includes('Affiliate Link Processor'));

    if (mergeNode) {
      console.log('🔀 Found Merge node:', mergeNode.name);
      console.log('   Type:', mergeNode.type);
      console.log('   Position:', mergeNode.position);
    }

    if (affiliateNode) {
      console.log('💰 Found Affiliate node:', affiliateNode.name);
    }

    if (prepareNode) {
      console.log('💾 Found GitHub Prepare node:', prepareNode.name);
    }

    console.log('\n📊 Node connections:');
    const connections = workflow.connections;

    if (mergeNode) {
      const mergeName = mergeNode.name;
      console.log(`\n  Nodes connecting TO "${mergeName}":`);

      Object.keys(connections).forEach(nodeName => {
        const nodeConns = connections[nodeName];
        if (nodeConns.main) {
          nodeConns.main.forEach((connArray, index) => {
            connArray.forEach(conn => {
              if (conn.node === mergeName) {
                console.log(`    - ${nodeName} (output ${index})`);
              }
            });
          });
        }
      });

      if (connections[mergeName]) {
        console.log(`\n  "${mergeName}" connects TO:`);
        const mergeConns = connections[mergeName].main || [];
        mergeConns.forEach((connArray, index) => {
          connArray.forEach(conn => {
            console.log(`    - ${conn.node} (input ${conn.index})`);
          });
        });
      }
    }

    // 3. Get recent executions
    console.log('\n\n📜 Fetching recent executions...');
    const execResp = await makeRequest(`/rest/executions?filter=${encodeURIComponent(JSON.stringify({ workflowId: deviWorkflow.id }))}&limit=5`);

    if (execResp.status !== 200) {
      console.log('❌ Failed to fetch executions');
      return;
    }

    const executions = execResp.data.data || execResp.data;

    if (executions.length === 0) {
      console.log('⚠️  No recent executions found. Run the workflow first!');
      return;
    }

    console.log(`✅ Found ${executions.length} recent execution(s)\n`);

    // Get the most recent execution
    const latestExec = executions[0];
    console.log(`📍 Latest execution:`);
    console.log(`   ID: ${latestExec.id}`);
    console.log(`   Status: ${latestExec.finished ? '✅ Finished' : latestExec.stoppedAt ? '❌ Stopped' : '⏳ Running'}`);
    console.log(`   Started: ${new Date(latestExec.startedAt).toLocaleString()}`);

    if (latestExec.stoppedAt) {
      console.log(`   Error: ${latestExec.data?.resultData?.error?.message || 'Unknown'}`);
    }

    // 4. Get execution details
    console.log('\n🔍 Fetching execution details...');
    const execDetailResp = await makeRequest(`/rest/executions/${latestExec.id}`);

    if (execDetailResp.status !== 200) {
      console.log('❌ Failed to fetch execution details');
      return;
    }

    const execDetail = execDetailResp.data;
    const execData = execDetail.data || {};
    const resultData = execData.resultData || {};
    const runData = resultData.runData || {};

    console.log(`\n📊 Execution node results:\n`);

    // Check specific nodes
    if (runData[mergeNode?.name]) {
      const mergeData = runData[mergeNode.name];
      console.log(`🔀 ${mergeNode.name}:`);
      console.log(`   Executions: ${mergeData.length}`);
      if (mergeData[0]?.data?.main) {
        const outputItems = mergeData[0].data.main[0] || [];
        console.log(`   Output items: ${outputItems.length}`);
        if (outputItems.length > 0) {
          const firstItem = outputItems[0].json;
          console.log(`   Output fields:`, Object.keys(firstItem).join(', '));
          console.log(`   Has ig_script:`, !!firstItem.ig_script);
          console.log(`   Has tiktok_script:`, !!firstItem.tiktok_script);
          console.log(`   Has blog_html:`, !!firstItem.blog_html);
        }
      }
    }

    if (runData[prepareNode?.name]) {
      const prepareData = runData[prepareNode.name];
      console.log(`\n💾 ${prepareNode.name}:`);
      console.log(`   Executions: ${prepareData.length}`);

      if (prepareData[0]?.error) {
        console.log(`   ❌ ERROR:`, prepareData[0].error.message);
        console.log(`   Error details:`, prepareData[0].error);
      } else if (prepareData[0]?.data?.main) {
        const outputItems = prepareData[0].data.main[0] || [];
        console.log(`   Output items: ${outputItems.length}`);
        if (outputItems.length > 0) {
          const firstItem = outputItems[0].json;
          console.log(`   Output fields:`, Object.keys(firstItem).join(', '));
        }
      }
    }

    // Show any error nodes
    const errorNodes = Object.keys(runData).filter(nodeName => {
      const nodeData = runData[nodeName];
      return nodeData.some(exec => exec.error);
    });

    if (errorNodes.length > 0) {
      console.log(`\n❌ Nodes with errors:\n`);
      errorNodes.forEach(nodeName => {
        const nodeData = runData[nodeName];
        nodeData.forEach((exec, i) => {
          if (exec.error) {
            console.log(`   ${nodeName} (execution ${i}):`);
            console.log(`     Error: ${exec.error.message}`);
            if (exec.error.description) {
              console.log(`     Description: ${exec.error.description}`);
            }
          }
        });
      });
    }

    console.log('\n✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
