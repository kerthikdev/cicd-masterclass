import { Lesson } from './lessons';

export const lesson4: Lesson = {
  id: 4,
  slug: 'continuous-delivery-vs-deployment',
  title: 'Continuous Delivery vs. Continuous Deployment',
  subtitle: 'Understanding the spectrum from CI to fully automated releases',
  module: 1,
  duration: '20 min',
  difficulty: 'Beginner',
  tags: ['CD', 'Delivery', 'Deployment', 'Approval Gates'],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: [
        'The precise difference between CI, Continuous Delivery, and Continuous Deployment',
        'What approval gates are and when you need them',
        'Real-world examples of each model',
        'How the restaurant analogy applies to dispatch decisions',
        'How to choose the right CD model for your organisation'
      ]
    },
    {
      type: 'explanation',
      title: 'The Three Levels of Automation',
      content: "CI/CD is not a binary choice — it exists on a spectrum:\n\n**Level 1: Continuous Integration (CI)**\nCode is automatically built and tested on every push. Deployment is entirely manual. Teams might deploy once a week.\n\n**Level 2: Continuous Delivery**\nEvery change that passes CI is automatically deployed to staging. Production deployment requires a human to click a button. The team could release any time — but chooses when.\n\n**Level 3: Continuous Deployment**\nEvery change that passes all automated quality gates is automatically deployed to production, with no human intervention. Companies like GitHub and Netflix deploy hundreds of times per day.\n\nThe critical insight: **the difference between Delivery and Deployment is whether a human must approve the production release**."
    },
    {
      type: 'analogy',
      title: '🍔 The Restaurant Dispatch Analogy',
      content: "Three restaurants handle dispatch very differently:\n\n**Restaurant A (CI only):** The kitchen prepares and inspects the order. The manager must manually call a driver, package the order, and arrange delivery.\n\n**Restaurant B (Continuous Delivery):** The order is automatically placed at the dispatch window, ready to go. The manager approves each order before a driver picks it up. The order is READY but needs approval.\n\n**Restaurant C (Continuous Deployment):** The moment the order passes quality inspection, it is automatically packaged and a driver is dispatched. No manager approval needed — the quality checks are trusted completely."
    },
    {
      type: 'comparison-table',
      title: 'CI vs CD vs Continuous Deployment',
      headers: ['Feature', '✅ CI', '✅ Continuous Delivery', '🚀 Continuous Deployment'],
      rows: [
        ['Auto build & test', 'Yes', 'Yes', 'Yes'],
        ['Auto deploy to staging', 'No', 'Yes', 'Yes'],
        ['Auto deploy to production', 'No', 'No', 'Yes'],
        ['Human approval required', 'For all deploys', 'For production only', 'Never'],
        ['Typical release frequency', 'Weekly/monthly', 'On demand (daily)', 'On every commit'],
        ['Complexity', 'Low', 'Medium', 'High'],
        ['Who uses it', 'Most teams', 'Mature teams', 'Top-tier tech companies']
      ]
    },
    {
      type: 'code',
      title: 'GitHub Actions: Continuous Delivery with Approval Gate',
      language: 'yaml',
      code: `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: pytest tests/ -v

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to Staging
        run: echo "Deploying to staging server..."

  # REQUIRES HUMAN APPROVAL before running
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production  # configured with required reviewers
    steps:
      - name: Deploy to Production
        run: echo "Deploying to production server..."`
    },
    {
      type: 'info-box',
      title: '💡 Which Model Should You Use?',
      content: 'Start with CI → add Continuous Delivery → move to Continuous Deployment as your test suite matures and you trust your automated quality gates. Most teams should target Continuous Delivery first. Continuous Deployment requires near-perfect test coverage and robust monitoring.'
    },
    {
      type: 'analogy-table',
      title: 'CD Model Comparison via Restaurant',
      headers: ['🍔 Restaurant Stage', '📦 Continuous Delivery', '🚀 Continuous Deployment'],
      rows: [
        ['Order prepared & inspected', 'Automatic', 'Automatic'],
        ['Placed at dispatch window', 'Automatic', 'Automatic'],
        ['Manager approval for pickup', 'Required ✋', 'Not needed ✅'],
        ['Driver dispatched', 'After approval', 'Immediately'],
        ['Who controls timing', 'Restaurant manager', 'Quality inspection result']
      ]
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l4q1',
          question: 'What is the key difference between Continuous Delivery and Continuous Deployment?',
          options: ['Continuous Delivery has no tests; Continuous Deployment does', 'Continuous Delivery requires human approval for production; Continuous Deployment does not', 'Continuous Deployment deploys to staging; Continuous Delivery deploys to production', 'They are the same thing with different names'],
          correctIndex: 1,
          explanation: 'Continuous Delivery keeps code in a deployable state and requires a human to approve the production release. Continuous Deployment removes that human approval — every passing build goes to production automatically.'
        },
        {
          id: 'l4q2',
          question: 'A bank must have a compliance officer approve all production releases. Which CD model does this represent?',
          options: ['Continuous Deployment', 'Continuous Integration only', 'Continuous Delivery with an approval gate', 'Manual deployment (no CI/CD)'],
          correctIndex: 2,
          explanation: 'An approval gate in the pipeline requires a designated person to approve before production deployment. This is Continuous Delivery — the code is ready, but a human controls the exact moment of release.'
        },
        {
          id: 'l4q3',
          question: 'Which type of company is most suited for Continuous Deployment?',
          options: ['A company that releases quarterly after manual testing', 'A healthcare company with strict FDA regulations', 'A mature tech company with high test coverage and robust monitoring', 'A startup with no automated tests'],
          correctIndex: 2,
          explanation: 'Continuous Deployment requires mature automated test suites and monitoring. Top-tier tech companies like GitHub and Netflix use it — every commit that passes all checks goes straight to production.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: [
        'CI = automated build and test; Delivery = auto-deploy to staging, human approves production; Deployment = fully automated',
        'Approval gates are required checkpoints where a human must approve before the pipeline continues',
        'Continuous Delivery is the recommended starting point for most teams',
        'Continuous Deployment requires mature test coverage and monitoring infrastructure',
        'The goal of the entire CD spectrum is making releases predictable, low-risk, and stress-free'
      ]
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next: Lesson 5',
      content: "Module 2 begins with Lesson 5: Git and GitHub. You'll learn the foundational version control skills that make CI/CD possible — repositories, commits, branches, and pull requests."
    }
  ]
};
