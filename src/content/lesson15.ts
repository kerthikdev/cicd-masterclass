import { Lesson } from './lessons';

export const lesson15: Lesson = {
  id: 15,
  slug: 'deployment-strategies',
  title: 'Deployment Strategies',
  subtitle: 'Rolling, blue-green, and canary — zero-downtime release techniques',
  module: 3,
  duration: '25 min',
  difficulty: 'Intermediate',
  tags: ["Rolling Deployment", "Blue-Green", "Canary", "Zero Downtime", "Rollback"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'Simply stopping the old version and starting the new one causes **downtime** — users get errors while the new version starts. Deployment strategies solve this by defining HOW you transition from old to new version.\n\n**Rolling Deployment** — Replace instances one at a time. New and old run simultaneously during deployment.\n\n**Blue-Green Deployment** — Run two identical environments. Switch all traffic from Blue (old) to Green (new) at once. Instant rollback by switching back.\n\n**Canary Deployment** — Route a small percentage (e.g., 10%) of traffic to the new version first. Monitor for errors. Gradually increase if healthy.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'Restaurant menu rollout examples:\n\n**Rolling:** Update menus table by table. Tables 1-3 get the new menu first. If complaints arrive, fix the recipe before updating more tables.\n\n**Blue-Green:** Open a second identical restaurant with the new menu. Route customers from the old (Blue) to the new (Green) location. If Green has problems, all customers instantly return to Blue.\n\n**Canary:** Offer 5% of the most adventurous customers the new experimental menu. After monitoring their reactions, roll it out to everyone.'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# Blue-Green deployment with AWS CodeDeploy\n# appspec.yml\nversion: 0.0\nResources:\n  - TargetService:\n      Type: AWS::ECS::Service\n      Properties:\n        TaskDefinition: <TASK_DEFINITION>\n        LoadBalancerInfo:\n          ContainerName: food-order-api\n          ContainerPort: 8000\n\nHooks:\n  - BeforeAllowTraffic: CheckHealthBeforeTraffic\n  - AfterAllowTraffic: VerifyDeploymentSuccess\n\n# Canary deployment: traffic routing config\n# {\n#   "trafficRoutingConfig": {\n#     "type": "TimeBasedCanary",\n#     "timeBasedCanary": {\n#       "canaryPercentage": 10,  // Start with 10% of traffic\n#       "canaryInterval": 15     // Wait 15 minutes, then 100%\n#     }\n#   },\n#   "autoRollbackConfiguration": {\n#     "enabled": true,\n#     "events": ["DEPLOYMENT_FAILURE", "DEPLOYMENT_STOP_ON_ALARM"]\n#   }\n# }'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l15q1',
          question: 'Which deployment strategy has the fastest rollback time?',
          options: ["Rolling deployment", "Canary deployment", "Blue-Green deployment — instantly switch traffic back to the old environment", "Recreate deployment"],
          correctIndex: 2,
          explanation: 'Blue-Green keeps the old environment running while Green receives traffic. Rolling back is instant — just switch the load balancer to route all traffic back to Blue.'
        },
        {
          id: 'l15q2',
          question: "What does '10% canary deployment' mean?",
          options: ["10% of the code is deployed", "10% of users are routed to the new version for testing; 90% remain on old version", "The deployment takes 10% less time", "10 containers run the new version"],
          correctIndex: 1,
          explanation: 'A 10% canary routes 10% of user traffic to the new version. If metrics look good, the percentage is gradually increased to 100%.'
        },
        {
          id: 'l15q3',
          question: 'Why does blue-green deployment cost more infrastructure?',
          options: ["Blue-green uses more CPU per container", "Both the old and new environments must run simultaneously during deployment", "Blue-green needs a separate monitoring system", "Blue-green uses a more expensive load balancer"],
          correctIndex: 1,
          explanation: 'During blue-green deployment, both Blue and Green environments run simultaneously until traffic is shifted, temporarily doubling infrastructure costs.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['Rolling: gradual replacement with medium rollback speed — best for standard updates', 'Blue-Green: two full environments, instant rollback — best for critical systems', 'Canary: test on a small percentage of real traffic — best for high-risk features at scale', 'All three use load balancer traffic weighting to achieve zero downtime', 'Configure automatic rollback triggers based on error rates or health check failures']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Module 4 begins! Lesson 16 teaches you how to diagnose and fix the most common pipeline failures with a practical troubleshooting decision tree.'
    }
  ]
};
