/**
 * Make.com Client Wrapper
 *
 * Simple client for interacting with Make.com scenarios from code.
 * Uses the Make MCP server under the hood.
 *
 * Usage:
 *   const MakeClient = require('./mcp/make-client');
 *   const client = new MakeClient();
 *
 *   // Trigger a scenario
 *   await client.trigger('https://hook.us1.make.com/your-webhook-url', { data: 'value' });
 *
 *   // Get scenario status
 *   const status = await client.getScenarioStatus('scenario-id');
 */

require('dotenv').config();

class MakeClient {
  constructor(apiToken = null, region = 'us1') {
    this.apiToken = apiToken || process.env.MAKE_API_TOKEN;
    this.region = region || process.env.MAKE_REGION || 'us1';
    this.baseUrl = `https://${this.region}.make.com/api/v2`;

    if (!this.apiToken) {
      console.warn('⚠️  MAKE_API_TOKEN not set. Some features may not work.');
    }
  }

  /**
   * Make HTTP request to Make.com API
   */
  async request(endpoint, options = {}) {
    if (!this.apiToken) {
      throw new Error('MAKE_API_TOKEN is required for this operation');
    }

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
   * Trigger a Make.com scenario via webhook URL
   *
   * @param {string} webhookUrl - The webhook URL (from your scenario)
   * @param {object} data - Data to send to the webhook
   * @returns {Promise<object>} Response from Make.com
   *
   * @example
   *   await client.trigger(
   *     'https://hook.us1.make.com/abc123',
   *     { email: 'user@example.com', action: 'subscribe' }
   *   );
   */
  async trigger(webhookUrl, data = {}) {
    console.log(`🔄 Triggering Make scenario: ${webhookUrl.substring(0, 50)}...`);

    try {
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

      // Some webhooks return JSON, some don't
      const result = await response.json().catch(() => ({ success: true }));
      console.log('✅ Scenario triggered successfully');

      return result;
    } catch (error) {
      console.error('❌ Failed to trigger scenario:', error.message);
      throw error;
    }
  }

  /**
   * List all scenarios in your account
   *
   * @returns {Promise<Array>} List of scenarios
   */
  async listScenarios() {
    console.log('📋 Listing Make.com scenarios...');
    const result = await this.request('/scenarios');
    console.log(`✅ Found ${result.scenarios?.length || 0} scenarios`);
    return result.scenarios || [];
  }

  /**
   * Get scenario details
   *
   * @param {string} scenarioId - The scenario ID
   * @returns {Promise<object>} Scenario details
   */
  async getScenario(scenarioId) {
    console.log(`📄 Getting scenario details: ${scenarioId}`);
    return this.request(`/scenarios/${scenarioId}`);
  }

  /**
   * Get scenario execution status
   *
   * @param {string} scenarioId - The scenario ID
   * @param {number} limit - Number of recent executions to fetch (default: 10)
   * @returns {Promise<Array>} Execution history
   */
  async getScenarioStatus(scenarioId, limit = 10) {
    console.log(`📊 Getting execution history for scenario: ${scenarioId}`);
    const result = await this.request(`/scenarios/${scenarioId}/executions?limit=${limit}`);
    return result.executions || [];
  }

  /**
   * Get details of a specific execution
   *
   * @param {string} executionId - The execution ID
   * @returns {Promise<object>} Execution details
   */
  async getExecution(executionId) {
    console.log(`🔍 Getting execution details: ${executionId}`);
    return this.request(`/executions/${executionId}`);
  }

  /**
   * Activate a scenario
   *
   * @param {string} scenarioId - The scenario ID
   * @returns {Promise<object>} Updated scenario
   */
  async activateScenario(scenarioId) {
    console.log(`▶️  Activating scenario: ${scenarioId}`);
    return this.request(`/scenarios/${scenarioId}`, {
      method: 'PATCH',
      body: JSON.stringify({ scheduling: { type: 'interval' } }),
    });
  }

  /**
   * Deactivate a scenario
   *
   * @param {string} scenarioId - The scenario ID
   * @returns {Promise<object>} Updated scenario
   */
  async deactivateScenario(scenarioId) {
    console.log(`⏸️  Deactivating scenario: ${scenarioId}`);
    return this.request(`/scenarios/${scenarioId}`, {
      method: 'PATCH',
      body: JSON.stringify({ scheduling: { type: 'manual' } }),
    });
  }

  /**
   * Update scenario blueprint/configuration
   *
   * @param {string} scenarioId - The scenario ID
   * @param {object} blueprint - New blueprint configuration
   * @returns {Promise<object>} Updated scenario
   */
  async updateBlueprint(scenarioId, blueprint) {
    console.log(`⚙️  Updating scenario blueprint: ${scenarioId}`);
    return this.request(`/scenarios/${scenarioId}`, {
      method: 'PATCH',
      body: JSON.stringify({ blueprint }),
    });
  }
}

// Export both class and convenience instance
module.exports = MakeClient;

// Also export a default instance for quick usage
module.exports.default = new MakeClient();

/**
 * Example usage:
 *
 * // Using class instance
 * const MakeClient = require('./mcp/make-client');
 * const client = new MakeClient();
 * await client.trigger('https://hook.us1.make.com/xyz', { data: 'value' });
 *
 * // Using default instance
 * const makeClient = require('./mcp/make-client').default;
 * await makeClient.trigger('https://hook.us1.make.com/xyz', { data: 'value' });
 *
 * // Integration with Fashion Insights
 * // Trigger a Make scenario when newsletter is sent
 * const makeClient = require('./mcp/make-client').default;
 *
 * async function onNewsletterSent(data) {
 *   await makeClient.trigger(process.env.MAKE_NEWSLETTER_WEBHOOK, {
 *     event: 'newsletter_sent',
 *     timestamp: new Date().toISOString(),
 *     subscribers: data.subscriberCount,
 *     insights: data.insights
 *   });
 * }
 */
