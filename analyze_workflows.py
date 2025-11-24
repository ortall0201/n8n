#!/usr/bin/env python3
import os
import json
from collections import defaultdict
from pathlib import Path

# Define field categories
FIELD_CATEGORIES = {
    'Cloud & Infrastructure': [
        'Aws', 'Google', 'Microsoft', 'Azure', 'DigitalOcean',
        'Cloudflare', 'Heroku', 'Vercel'
    ],
    'Communication & Collaboration': [
        'Slack', 'Discord', 'Telegram', 'Teams', 'Zoom',
        'Mattermost', 'RocketChat'
    ],
    'Productivity & Project Management': [
        'Notion', 'Asana', 'Trello', 'Monday', 'Jira', 'Linear',
        'Airtable', 'Basecamp', 'ClickUp'
    ],
    'CRM & Sales': [
        'Salesforce', 'Hubspot', 'Pipedrive', 'Zendesk',
        'Freshworks', 'Zoho'
    ],
    'Development & DevOps': [
        'Github', 'Gitlab', 'Bitbucket', 'Jenkins', 'CircleCI',
        'Docker', 'Kubernetes'
    ],
    'Security & Identity': [
        'TheHiveProject', 'Cognito', 'IAM', 'Auth0', 'Okta',
        'OneLogin'
    ],
    'Marketing & Email': [
        'Mailchimp', 'SendGrid', 'Mandrill', 'MailerLite',
        'ActiveCampaign', 'ConvertKit'
    ],
    'Content & CMS': [
        'Wordpress', 'Contentful', 'Strapi', 'Ghost', 'Medium'
    ],
    'AI & Machine Learning': [
        'OpenAi', 'JinaAI', 'Perplexity', 'Anthropic', 'Cohere',
        'HuggingFace'
    ],
    'Data Processing & Utilities': [
        'Code', 'Set', 'Switch', 'Files', 'ReadPdf', 'WriteBinaryFile',
        'ReadBinaryFile', 'ReadBinaryFiles', 'MoveBinaryData',
        'RenameKeys', 'Crypto', 'Jwt', 'Html', 'MySql', 'ExecutionData',
        'DebugHelper', 'Wait', 'QuickChart'
    ],
    'Media & Entertainment': [
        'Spotify', 'YouTube', 'Twitch', 'SoundCloud'
    ],
}

def categorize_service(service_name):
    """Categorize a service into a field"""
    for field, services in FIELD_CATEGORIES.items():
        for service in services:
            if service.lower() in service_name.lower():
                return field
    return 'Other'

def main():
    # Find all workflow files
    workflow_files = []
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.workflow.json'):
                workflow_files.append(os.path.join(root, file))

    print(f"Total workflows found: {len(workflow_files)}\n")

    # Categorize workflows
    field_counts = defaultdict(int)
    service_counts = defaultdict(int)

    for workflow_path in workflow_files:
        # Extract service name from path
        parts = workflow_path.replace('\\', '/').split('/')

        # Find the service name (usually after 'nodes')
        service_name = 'Unknown'
        for i, part in enumerate(parts):
            if part == 'nodes' and i + 1 < len(parts):
                service_name = parts[i + 1]
                break

        service_counts[service_name] += 1
        field = categorize_service(service_name)
        field_counts[field] += 1

    # Calculate percentages
    total = len(workflow_files)

    # Sort by count
    sorted_fields = sorted(field_counts.items(), key=lambda x: x[1], reverse=True)
    sorted_services = sorted(service_counts.items(), key=lambda x: x[1], reverse=True)

    # Print results
    print("=" * 80)
    print("WORKFLOWS BY FIELD")
    print("=" * 80)
    print(f"{'Field':<50} {'Count':>8} {'Percentage':>10}")
    print("-" * 80)

    for field, count in sorted_fields:
        percentage = (count / total) * 100
        print(f"{field:<50} {count:>8} {percentage:>9.1f}%")

    print("-" * 80)
    print(f"{'TOTAL':<50} {total:>8} {100.0:>9.1f}%")
    print()

    # Print top services
    print("=" * 80)
    print("TOP 20 SERVICES/INTEGRATIONS")
    print("=" * 80)
    print(f"{'Service':<40} {'Count':>8} {'Percentage':>10} {'Field'}")
    print("-" * 80)

    for service, count in sorted_services[:20]:
        percentage = (count / total) * 100
        field = categorize_service(service)
        print(f"{service:<40} {count:>8} {percentage:>9.1f}%   [{field}]")

    print()

if __name__ == '__main__':
    main()
