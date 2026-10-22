import { Lesson } from './lessons';

export const lesson11: Lesson = {
  id: 11,
  slug: 'pipeline-triggers-and-webhooks',
  title: 'Pipeline Triggers and Webhooks',
  subtitle: 'How the kitchen gets notified the moment an order arrives',
  module: 3,
  duration: '20 min',
  difficulty: 'Intermediate',
  tags: ["Triggers", "Webhooks", "Events", "Automation"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: "A **trigger** is the event that starts a pipeline. Without a trigger, pipelines just sit idle. Triggers make automation event-driven.\n\n**Types of triggers:**\n\n**Push trigger** — Fires when code is pushed to a branch. Most common.\n\n**Pull Request trigger** — Fires when a PR is opened, updated, or merged.\n\n**Branch filter** — Restricts which branches trigger the pipeline.\n\n**Scheduled trigger (cron)** — Runs on a schedule. Used for nightly builds and dependency scans.\n\n**Manual trigger** — A human clicks 'Run'. Used for intentional production deployments.\n\n**API/Webhook trigger** — An external system calls your pipeline."
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: "A modern restaurant uses a digital ordering system. When a customer submits an order:\n\n1. The order management system **fires a notification** (the webhook)\n2. The kitchen display screen **receives the notification** instantly\n3. The relevant kitchen station **starts preparing** immediately\n\nThe kitchen doesn't POLL ('is there an order?') — it LISTENS and REACTS.\n\nThis is exactly how webhooks work: GitHub doesn't wait for your CI to ask 'is there new code?' — GitHub sends an HTTP notification the moment a push happens."
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: "name: Complete Trigger Examples\n\non:\n  # Trigger 1: Push to specific branches\n  push:\n    branches:\n      - main\n      - 'release/**'    # Matches release/1.0, release/2.0\n    paths:\n      - 'src/**'        # Only trigger if src/ changed\n    paths-ignore:\n      - 'docs/**'       # Don't trigger for doc-only changes\n\n  # Trigger 2: Pull request events\n  pull_request:\n    branches: [ main ]\n    types: [opened, synchronize, reopened]\n\n  # Trigger 3: Scheduled run (every day at 2 AM UTC)\n  schedule:\n    - cron: '0 2 * * *'\n\n  # Trigger 4: Manual trigger\n  workflow_dispatch:\n    inputs:\n      environment:\n        description: 'Deploy to which environment?'\n        required: true\n        default: 'staging'\n        type: choice\n        options: [staging, production]"
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l11q1',
          question: 'You want CI to run only when files in `src/` change. What do you configure?',
          options: ["A cron schedule for every hour", "Path filters: `paths: ['src/**']` in the trigger configuration", "A manual workflow_dispatch trigger", "A branch filter for the docs branch"],
          correctIndex: 1,
          explanation: 'Path filters restrict the trigger to only fire when specified paths are affected by the push.'
        },
        {
          id: 'l11q2',
          question: 'What is a webhook?',
          options: ["A type of CI runner that supports web applications", "An HTTP request sent by GitHub to your CI system to notify it of an event", "A type of YAML configuration for scheduled pipelines", "A security mechanism for encrypting pipeline logs"],
          correctIndex: 1,
          explanation: 'A webhook is an HTTP POST request GitHub sends to a configured URL when an event occurs.'
        },
        {
          id: 'l11q3',
          question: 'When should you use a scheduled trigger?',
          options: ["For every code push — scheduled is more reliable", "Only for manual deployments", "For time-based tasks like nightly builds, dependency scans, or database backups", "When you want the pipeline to run continuously"],
          correctIndex: 2,
          explanation: 'Scheduled (cron) triggers are for time-based automation — nightly security scans, daily dependency update checks.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['Triggers make pipelines event-driven: push, PR, scheduled, manual, and API triggers', 'Branch and path filters prevent unnecessary pipeline runs', 'Webhooks are HTTP notifications from GitHub to your CI system', 'Always verify webhook signatures to prevent malicious pipeline triggers', 'Use `workflow_dispatch` for manual production deployments that require intentional human action']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: "Lesson 12 covers one of the most critical security topics: environment configuration and secrets management. You'll learn how to safely handle API keys, passwords, and tokens."
    }
  ]
};
