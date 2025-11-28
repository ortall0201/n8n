const fs = require('fs');
const path = require('path');

// Read the workflow JSON
const workflowPath = path.join(__dirname, 'workflows', 'fashion-insights-INFLUENCER-PRODUCTS.json');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

console.log('📅 Adding Weekly Schedule Trigger...\n');

// Create a new Schedule Trigger node
const scheduleNode = {
  "parameters": {
    "rule": {
      "interval": [
        {
          "field": "weeks",
          "weeksInterval": 1,
          "daysOfWeek": [
            {
              "day": "monday"
            }
          ],
          "hoursInterval": 1,
          "minutesInterval": 1,
          "hour": 9,
          "minute": 0
        }
      ]
    }
  },
  "id": "weekly-schedule-trigger",
  "name": "Weekly Schedule (Every Monday 9 AM)",
  "type": "n8n-nodes-base.scheduleTrigger",
  "typeVersion": 1.2,
  "position": [
    240,
    150
  ]
};

// Check if schedule node already exists
const existingSchedule = workflow.nodes.find(node => node.id === 'weekly-schedule-trigger');

if (existingSchedule) {
  console.log('⚠️  Weekly schedule trigger already exists. Skipping...');
} else {
  // Add the schedule node to the beginning of the nodes array
  workflow.nodes.unshift(scheduleNode);
  console.log('✅ Added schedule trigger node');
}

// Update connections to include the schedule trigger
// Both manual trigger and schedule trigger should connect to Bright Data node
if (!workflow.connections["Weekly Schedule (Every Monday 9 AM)"]) {
  workflow.connections["Weekly Schedule (Every Monday 9 AM)"] = {
    "main": [
      [
        {
          "node": "Bright Data - Get Instagram Posts",
          "type": "main",
          "index": 0
        }
      ]
    ]
  };
  console.log('✅ Connected schedule trigger to workflow');
}

// Save the updated workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');

console.log('');
console.log('🎉 SUCCESS! Weekly schedule added!');
console.log('');
console.log('📋 Schedule Configuration:');
console.log('   ⏰ Frequency: Every Monday at 9:00 AM');
console.log('   📅 Interval: Weekly (every 1 week)');
console.log('   🔄 Automatic: Yes (runs without manual trigger)');
console.log('');
console.log('📝 Workflow now has TWO triggers:');
console.log('   1. ⏰ Weekly Schedule (Every Monday 9 AM) - Automatic');
console.log('   2. 🔘 Manual Trigger - For testing');
console.log('');
console.log('💡 To change the schedule:');
console.log('   - Open n8n workflow editor');
console.log('   - Click on "Weekly Schedule" node');
console.log('   - Adjust day/time as needed');
console.log('');
console.log('🚀 Your newsletter will now send automatically every Monday at 9 AM!');
console.log('');
