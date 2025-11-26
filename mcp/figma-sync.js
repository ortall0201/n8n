#!/usr/bin/env node
/**
 * Figma MCP Sync Script
 *
 * This script uses the Figma MCP server to:
 * 1. Read Figma designs from the configured FIGMA_FILE_KEY
 * 2. Extract frames, components, and layouts
 * 3. Convert Figma designs → React/TypeScript components
 * 4. Export generated UI to lovable-ui/ folder
 *
 * Usage:
 *   node mcp/figma-sync.js [options]
 *
 * Options:
 *   --page <name>     Sync specific page only (e.g., "Landing Page")
 *   --component <id>  Sync specific component by ID
 *   --dry-run         Show what would be synced without writing files
 *   --output <path>   Custom output directory (default: lovable-ui/pages)
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration
const CONFIG = {
  figmaFileKey: process.env.FIGMA_FILE_KEY,
  figmaToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
  outputDir: path.join(__dirname, '..', 'lovable-ui', 'pages'),
  componentsDir: path.join(__dirname, '..', 'lovable-ui', 'components'),
};

// Validate environment variables
function validateConfig() {
  const missing = [];
  if (!CONFIG.figmaFileKey) missing.push('FIGMA_FILE_KEY');
  if (!CONFIG.figmaToken) missing.push('FIGMA_PERSONAL_ACCESS_TOKEN');

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.error('\nPlease set these in your .env file or environment.');
    process.exit(1);
  }
}

/**
 * Call Figma MCP server to get file data
 *
 * In a real implementation, this would use the MCP protocol to communicate
 * with the Figma MCP server. For now, we'll use Figma REST API directly.
 */
async function fetchFigmaFile() {
  console.log('📥 Fetching Figma file data...');

  const url = `https://api.figma.com/v1/files/${CONFIG.figmaFileKey}`;

  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': CONFIG.figmaToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`✅ Loaded Figma file: "${data.name}"`);
  return data;
}

/**
 * Extract components from Figma document
 */
function extractComponents(figmaData) {
  console.log('🔍 Extracting components...');

  const components = [];
  const pages = figmaData.document.children || [];

  pages.forEach(page => {
    console.log(`   📄 Page: "${page.name}"`);

    if (page.children) {
      page.children.forEach(node => {
        if (node.type === 'FRAME' || node.type === 'COMPONENT') {
          components.push({
            id: node.id,
            name: node.name,
            type: node.type,
            page: page.name,
            width: node.absoluteBoundingBox?.width,
            height: node.absoluteBoundingBox?.height,
            node: node,
          });
        }
      });
    }
  });

  console.log(`✅ Found ${components.length} components/frames`);
  return components;
}

/**
 * Convert Figma component to React component
 *
 * This is a simplified conversion. In production, you'd want more sophisticated
 * parsing of Figma styles, layouts, and components.
 */
function figmaToReact(component) {
  const componentName = component.name
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');

  // Extract basic styling from Figma node
  const styles = extractStyles(component.node);

  // Generate React component
  const code = `// Auto-generated from Figma: ${component.name}
// Page: ${component.page}
// Last synced: ${new Date().toISOString()}

import React from 'react';

export default function ${componentName}() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '${styles.backgroundColor}',
        color: '${styles.textColor}',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-serif font-light mb-6">
          ${component.name}
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          This component was generated from Figma.
          Edit this file to customize the implementation.
        </p>

        {/* TODO: Implement actual component logic based on Figma design */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <p className="text-sm text-gray-500">
            Component dimensions: ${component.width}px × ${component.height}px
          </p>
        </div>
      </div>
    </div>
  );
}
`;

  return code;
}

/**
 * Extract basic styles from Figma node
 */
function extractStyles(node) {
  const styles = {
    backgroundColor: '#FAFAF8',
    textColor: '#1A1A1A',
  };

  // Extract background color
  if (node.backgroundColor) {
    const { r, g, b } = node.backgroundColor;
    styles.backgroundColor = rgbToHex(r, g, b);
  }

  // Extract fills
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === 'SOLID' && fill.color) {
      const { r, g, b } = fill.color;
      styles.backgroundColor = rgbToHex(r, g, b);
    }
  }

  return styles;
}

/**
 * Convert RGB (0-1) to hex color
 */
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Write generated component to file
 */
function writeComponent(component, code, dryRun = false) {
  const fileName = component.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') + '.tsx';

  const filePath = path.join(CONFIG.outputDir, fileName);

  if (dryRun) {
    console.log(`   [DRY RUN] Would write: ${filePath}`);
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`   ✅ Generated: ${fileName}`);
}

/**
 * Main sync function
 */
async function syncFigmaToUI(options = {}) {
  console.log('\n🎨 Figma → UI Sync Starting...\n');

  validateConfig();

  try {
    // Fetch Figma file data
    const figmaData = await fetchFigmaFile();

    // Extract components
    const components = extractComponents(figmaData);

    if (components.length === 0) {
      console.log('⚠️  No components found to sync');
      return;
    }

    // Filter by page if specified
    let componentsToSync = components;
    if (options.page) {
      componentsToSync = components.filter(c => c.page === options.page);
      console.log(`\n🔍 Filtering by page: "${options.page}" (${componentsToSync.length} components)`);
    }

    // Filter by component ID if specified
    if (options.component) {
      componentsToSync = components.filter(c => c.id === options.component);
      console.log(`\n🔍 Filtering by component ID: "${options.component}"`);
    }

    // Generate React components
    console.log('\n⚙️  Generating React components...\n');
    componentsToSync.forEach(component => {
      const code = figmaToReact(component);
      writeComponent(component, code, options.dryRun);
    });

    console.log(`\n✨ Sync complete! Generated ${componentsToSync.length} components.`);
    console.log(`📁 Output directory: ${CONFIG.outputDir}\n`);

  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--page' && args[i + 1]) {
      options.page = args[i + 1];
      i++;
    } else if (arg === '--component' && args[i + 1]) {
      options.component = args[i + 1];
      i++;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--output' && args[i + 1]) {
      CONFIG.outputDir = args[i + 1];
      i++;
    } else if (arg === '--help') {
      console.log(`
Figma MCP Sync Script

Usage:
  node mcp/figma-sync.js [options]

Options:
  --page <name>     Sync specific page only
  --component <id>  Sync specific component by ID
  --dry-run         Show what would be synced without writing files
  --output <path>   Custom output directory (default: lovable-ui/pages)
  --help            Show this help message

Examples:
  # Sync all components from Figma
  node mcp/figma-sync.js

  # Sync only "Landing Page"
  node mcp/figma-sync.js --page "Landing Page"

  # Dry run to see what would be synced
  node mcp/figma-sync.js --dry-run
`);
      process.exit(0);
    }
  }

  return options;
}

// Run if called directly
if (require.main === module) {
  const options = parseArgs();
  syncFigmaToUI(options);
}

module.exports = { syncFigmaToUI, fetchFigmaFile, extractComponents, figmaToReact };
