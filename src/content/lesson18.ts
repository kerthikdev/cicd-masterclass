import { Lesson } from './lessons';

export const lesson18: Lesson = {
  id: 18,
  slug: 'monitoring-rollback-and-recovery',
  title: 'Monitoring, Rollback, and Recovery',
  subtitle: 'What happens after deployment — tracking, alerting, and responding',
  module: 4,
  duration: '25 min',
  difficulty: 'Intermediate',
  tags: ["Monitoring", "CloudWatch", "Rollback", "Incident Response", "Prometheus"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'Deployment is not the end of the CI/CD cycle — it is the beginning of production responsibility. Monitoring tells you:\n\n- Is the application running?\n- Is it responding correctly?\n- Are errors increasing?\n- Is performance degrading?\n- Did this deployment cause any regression?\n\n**Three pillars of observability:**\n\n**Logs** — Text records of events. Raw but detailed.\n\n**Metrics** — Numerical measurements over time. Request count, error rate, response time. Good for dashboards and alerts.\n\n**Traces** — Follow a single request through all services.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: "A professional delivery service doesn't just dispatch and hope:\n\n**Real-time tracking (monitoring):** The delivery app tracks the driver's GPS and estimated arrival. Equivalent to dashboards showing request rates and error percentages.\n\n**Alerts (anomaly detection):** If a driver is stationary too long, dispatch is alerted. Equivalent to a CloudWatch alarm firing when error rate exceeds 1%.\n\n**Replacement order (rollback):** A new order is dispatched free of charge while the complaint is investigated. Equivalent to automatic rollback to the previous deployment."
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# CloudWatch logging in ECS task definition\n# "logConfiguration": {\n#   "logDriver": "awslogs",\n#   "options": {\n#     "awslogs-group": "/ecs/food-order-api",\n#     "awslogs-region": "us-east-1",\n#     "awslogs-stream-prefix": "ecs"\n#   }\n# }\n\n# Create CloudWatch alarm for error rate\naws cloudwatch put-metric-alarm \\\n  --alarm-name "FoodOrderAPI-ErrorRate-High" \\\n  --metric-name "5XXError" \\\n  --namespace "AWS/ApplicationELB" \\\n  --statistic Average \\\n  --period 300 \\\n  --threshold 0.01 \\\n  --comparison-operator GreaterThanThreshold \\\n  --evaluation-periods 1 \\\n  --alarm-actions "arn:aws:sns:us-east-1:123456789012:deployment-alerts"\n\n# View application logs\naws logs tail /ecs/food-order-api --follow --filter-pattern "ERROR"\n\n# Prometheus metrics in FastAPI\nfrom prometheus_client import Counter, Histogram\nREQUEST_COUNT = Counter(\'http_requests_total\', \'Total HTTP requests\', [\'method\', \'endpoint\', \'status_code\'])\nREQUEST_DURATION = Histogram(\'http_request_duration_seconds\', \'HTTP request duration\')'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l18q1',
          question: 'What is the difference between logs and metrics?',
          options: ["Logs are stored in S3; metrics are in CloudWatch", "Logs are text records of specific events; metrics are numerical measurements aggregated over time", "Logs are for security; metrics are for performance", "They are the same — different names for the same data"],
          correctIndex: 1,
          explanation: 'Logs are textual records of specific events. Metrics are numerical aggregations over time. Both are needed — logs for debugging, metrics for trends and alerting.'
        },
        {
          id: 'l18q2',
          question: 'Your error rate jumped to 12% five minutes after a deployment. What should happen?',
          options: ["Wait 24 hours to see if it resolves", "Disable monitoring to reduce noise", "Automatic rollback triggers and restores the previous version; the team investigates", "Scale up containers to handle the load"],
          correctIndex: 2,
          explanation: 'A 12% error rate after deployment is a strong signal of a bad release. Immediate rollback restores service while the team investigates.'
        },
        {
          id: 'l18q3',
          question: "What are 'the three pillars of observability'?",
          options: ["Builds, tests, deployments", "Logs, metrics, and traces", "Staging, production, monitoring", "GitHub, Docker, AWS"],
          correctIndex: 1,
          explanation: 'The three pillars are Logs (event records), Metrics (numerical measurements), and Traces (request flow through distributed systems).'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['Monitoring completes the CI/CD cycle — deployment without monitoring is flying blind', 'Three pillars: logs (events), metrics (numbers over time), traces (request flow)', 'CloudWatch alarms + EventBridge + Lambda enables fully automated rollback', 'Set meaningful alert thresholds — too sensitive causes noise; too lenient misses real problems', 'Post-incident reviews (post-mortems) help teams learn and improve pipeline resilience']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Lesson 19 is the Real-World CI/CD Project — build a complete automated pipeline for a food ordering web application.'
    }
  ]
};
