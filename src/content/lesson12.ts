import { Lesson } from './lessons';

export const lesson12: Lesson = {
  id: 12,
  slug: 'environment-configuration-and-secrets',
  title: 'Environment Configuration and Secrets',
  subtitle: 'Managing API keys, passwords, and environment variables safely',
  module: 3,
  duration: '25 min',
  difficulty: 'Intermediate',
  tags: ["Secrets", "Environment Variables", "Security", "IAM", "GitHub Secrets"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'An **environment variable** is a named value stored outside your application code that your application reads at runtime.\n\nExamples:\n- `DATABASE_URL=postgresql://user:pass@localhost:5432/mydb`\n- `AWS_REGION=us-east-1`\n- `STRIPE_API_KEY=sk_live_abcdef...`\n\n**Why not hardcode these in your code?**\n\n1. **Security:** API keys in code get committed to Git. A key committed even once can be found by scanning tools — even after you delete it.\n2. **Flexibility:** The same code runs in dev, staging, and production with different configs.\n3. **Collaboration:** Different developers have different database credentials.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'Restaurant security maps to secret management:\n\n- **Safe storing the daily cash combination** = GitHub Actions Secrets / AWS Secrets Manager\n- **Each employee has their own key card** = Per-user IAM credentials with limited access\n- **The recipe printed in the menu (bad!)** = Hardcoding API keys in source code (catastrophic!)\n- **Manager approval required for the safe** = IAM role requires specific condition to assume\n- **Temporary staff get temporary access** = OIDC short-lived tokens that expire in minutes'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# Step 1: Add secrets in GitHub UI:\n# Repository → Settings → Secrets and variables → Actions → New repository secret\n\n# Step 2: Reference secrets in your workflow\nname: Deploy with Secrets\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      # Secrets are injected as environment variables\n      # GitHub NEVER prints them in logs (they appear as ***)\n      - name: Connect to database\n        env:\n          DATABASE_URL: ${{ secrets.DATABASE_URL }}\n        run: python scripts/check_db.py\n\n      # BEST PRACTICE: Use OIDC — no AWS keys stored!\n      - name: Configure AWS credentials via OIDC\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole\n          aws-region: us-east-1\n\n      - name: Deploy to ECS\n        run: |\n          aws ecs update-service \\\n            --cluster production \\\n            --service food-order-api \\\n            --force-new-deployment'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l12q1',
          question: 'A developer hardcodes `API_KEY=sk_live_abc123` in Python and pushes to GitHub. What is the risk?',
          options: ["The code will not compile", "Automated bots scan GitHub for secrets and can steal the key within minutes", "GitHub will automatically delete the repository", "The key will stop working after 24 hours"],
          correctIndex: 1,
          explanation: 'Automated scanners continuously monitor GitHub for known secret formats. An exposed key can be discovered and used within minutes of a push.'
        },
        {
          id: 'l12q2',
          question: 'What is the advantage of OIDC over storing AWS access keys?',
          options: ["OIDC is faster", "OIDC never expires", "OIDC eliminates the need for long-lived static credentials — tokens are temporary and scoped", "OIDC does not require an IAM role"],
          correctIndex: 2,
          explanation: 'OIDC allows GitHub Actions to obtain short-lived AWS credentials that expire within minutes, eliminating long-lived access keys.'
        },
        {
          id: 'l12q3',
          question: 'What happens if a step accidentally prints a secret using echo?',
          options: ["The pipeline fails immediately", "GitHub masks the secret value in the logs, displaying *** instead", "The secret is permanently revealed", "Nothing — GitHub does not protect secrets in echo statements"],
          correctIndex: 1,
          explanation: 'GitHub Actions automatically detects secret values in log output and replaces them with ***.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['Environment variables store configuration outside code — the application reads them at runtime', 'NEVER hardcode secrets in source code — Git history is permanent and secret-scanning bots are real', 'Use GitHub Actions Secrets for simple credential storage in CI/CD workflows', 'OIDC (OpenID Connect) eliminates the need for stored AWS credentials entirely — the gold standard', 'Different environments should have separate secrets with least-privilege access']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Lesson 13 covers Deployment Fundamentals — what it actually means to deploy software, how servers receive new versions, health checks, and how to verify that your deployment succeeded.'
    }
  ]
};
