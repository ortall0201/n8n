#!/usr/bin/env node
/**
 * Make.com MCP Server
 *
 * This is a custom MCP server implementation for Make.com (Integromat).
 * It provides MCP-compatible interfaces for:
 * - Triggering Make scenarios
 * - Getting scenario execution status
 * - Listing available scenarios
 * - Updating scenario blueprints
 *
 * Environment Variables:
 *   MAKE_API_TOKEN - Your Make.com API token
 *   MAKE_TEAM_ID   - (Optional) Your Make.com team ID
 *   MAKE_REGION    - (Optional) Make.com region (us1, us2, eu1, eu2)
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');

require('dotenv').config();

// Configuration
const CONFIG = {
  apiToken: process.env.MAKE_API_TOKEN,
  teamId: process.env.MAKE_TEAM_ID,
  region: process.env.MAKE_REGION || 'us1',
};

// Make.com API base URL based on region
const API_BASE_URL = `https://${CONFIG.region}.make.com/api/v2`;

/**
 * Make API Client
 */
class MakeClient {
  constructor(apiToken, teamId = null) {
    this.apiToken = apiToken;
    this.teamId = teamId;
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Make HTTP request to Make.com API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Token ${this.apiToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Make.com API error (${response.status}): ${error}`);
    }

    return response.json();
  }

  /**
   * List all scenarios
   */
  async listScenarios() {
    const endpoint = this.teamId
      ? `/teams/${this.teamId}/scenarios`
      : '/scenarios';

    return this.request(endpoint);
  }

  /**
   * Get scenario details
   */
  async getScenario(scenarioId) {
    return this.request(`/scenarios/${scenarioId}`);
  }

  /**
   * Trigger a scenario via webhook
   *
   * Note: This requires the scenario to have a webhook trigger configured
   */
  async triggerScenario(webhookUrl, data = {}) {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to trigger scenario: ${response.statusText}`);
    }

    return response.json().catch(() => ({ success: true }));
  }

  /**
   * Get scenario execution history
   */
  async getExecutionHistory(scenarioId, limit = 10) {
    return this.request(`/scenarios/${scenarioId}/executions?limit=${limit}`);
  }

  /**
   * Get execution details
   */
  async getExecution(executionId) {
    return this.request(`/executions/${executionId}`);
  }

  /**
   * Update scenario blueprint
   */
  async updateScenarioBlueprint(scenarioId, blueprint) {
    return this.request(`/scenarios/${scenarioId}`, {
      method: 'PATCH',
      body: JSON.stringify({ blueprint }),
    });
  }

  /**
   * Activate/deactivate scenario
   */
  async setScenarioActive(scenarioId, active) {
    return this.request(`/scenarios/${scenarioId}`, {
      method: 'PATCH',
      body: JSON.stringify({ scheduling: { type: active ? 'interval' : 'manual' } }),
    });
  }
}

/**
 * MCP Server Implementation
 */
class MakeMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'make-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Validate configuration
    if (!CONFIG.apiToken) {
      console.error('ERROR: MAKE_API_TOKEN environment variable is required');
      process.exit(1);
    }

    this.client = new MakeClient(CONFIG.apiToken, CONFIG.teamId);
    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'list_scenarios',
          description: 'List all Make.com scenarios in your account',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_scenario',
          description: 'Get details of a specific Make.com scenario',
          inputSchema: {
            type: 'object',
            properties: {
              scenario_id: {
                type: 'string',
                description: 'The ID of the scenario',
              },
            },
            required: ['scenario_id'],
          },
        },
        {
          name: 'trigger_scenario',
          description: 'Trigger a Make.com scenario via webhook URL',
          inputSchema: {
            type: 'object',
            properties: {
              webhook_url: {
                type: 'string',
                description: 'The webhook URL of the scenario',
              },
              data: {
                type: 'object',
                description: 'Data to send to the webhook (optional)',
              },
            },
            required: ['webhook_url'],
          },
        },
        {
          name: 'get_execution_history',
          description: 'Get execution history for a scenario',
          inputSchema: {
            type: 'object',
            properties: {
              scenario_id: {
                type: 'string',
                description: 'The ID of the scenario',
              },
              limit: {
                type: 'number',
                description: 'Number of executions to return (default: 10)',
              },
            },
            required: ['scenario_id'],
          },
        },
        {
          name: 'get_execution',
          description: 'Get details of a specific execution',
          inputSchema: {
            type: 'object',
            properties: {
              execution_id: {
                type: 'string',
                description: 'The ID of the execution',
              },
            },
            required: ['execution_id'],
          },
        },
        {
          name: 'update_scenario_blueprint',
          description: 'Update a scenario blueprint/configuration',
          inputSchema: {
            type: 'object',
            properties: {
              scenario_id: {
                type: 'string',
                description: 'The ID of the scenario',
              },
              blueprint: {
                type: 'object',
                description: 'The new blueprint configuration',
              },
            },
            required: ['scenario_id', 'blueprint'],
          },
        },
        {
          name: 'set_scenario_active',
          description: 'Activate or deactivate a scenario',
          inputSchema: {
            type: 'object',
            properties: {
              scenario_id: {
                type: 'string',
                description: 'The ID of the scenario',
              },
              active: {
                type: 'boolean',
                description: 'true to activate, false to deactivate',
              },
            },
            required: ['scenario_id', 'active'],
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'list_scenarios':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(await this.client.listScenarios(), null, 2),
                },
              ],
            };

          case 'get_scenario':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(await this.client.getScenario(args.scenario_id), null, 2),
                },
              ],
            };

          case 'trigger_scenario':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    await this.client.triggerScenario(args.webhook_url, args.data || {}),
                    null,
                    2
                  ),
                },
              ],
            };

          case 'get_execution_history':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    await this.client.getExecutionHistory(args.scenario_id, args.limit || 10),
                    null,
                    2
                  ),
                },
              ],
            };

          case 'get_execution':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(await this.client.getExecution(args.execution_id), null, 2),
                },
              ],
            };

          case 'update_scenario_blueprint':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    await this.client.updateScenarioBlueprint(args.scenario_id, args.blueprint),
                    null,
                    2
                  ),
                },
              ],
            };

          case 'set_scenario_active':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    await this.client.setScenarioActive(args.scenario_id, args.active),
                    null,
                    2
                  ),
                },
              ],
            };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Make.com MCP server running on stdio');
  }
}

// Run server
if (require.main === module) {
  const server = new MakeMCPServer();
  server.run().catch(console.error);
}

module.exports = { MakeMCPServer, MakeClient };
