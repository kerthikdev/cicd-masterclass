import { Lesson } from './lessons';

export const lesson13: Lesson = {
  id: 13,
  slug: 'deployment-fundamentals',
  title: 'Deployment Fundamentals',
  subtitle: 'What actually happens when code is deployed to a server',
  module: 3,
  duration: '25 min',
  difficulty: 'Intermediate',
  tags: ["Deployment", "Servers", "Health Checks", "ECS", "Application Startup"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: '**Deployment** is the process of making a new version of your application available and running so users can access it.\n\nDeployment involves:\n1. **Pulling the artifact** — downloading the Docker image from the registry\n2. **Stopping the old version** — gracefully shutting down the running application\n3. **Starting the new version** — launching the new version and waiting for it to become ready\n4. **Health checking** — automatically verifying the new version responds correctly\n5. **Routing traffic** — directing user requests to the new version\n6. **Cleanup** — removing the old version (or keeping it for rollback)\n\nA failed deployment should AUTOMATICALLY roll back to the previous version.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'The dispatch-to-delivery process mirrors software deployment:\n\n**Dispatch (deployment start):** The packaged order is assigned to a driver. The driver picks up the order (pulls the artifact).\n\n**Delivery confirmation (health check):** The driver rings the doorbell (sends a health check request). The customer opens the door (the application responds with HTTP 200 OK).\n\n**Failure handling (rollback):** If no one answers after 3 attempts (health check fails), the driver returns and the order is replaced. The customer receives the previous order while the issue is investigated.'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# Health check endpoint in FastAPI\nfrom fastapi import FastAPI\nimport os\nfrom datetime import datetime\n\napp = FastAPI()\n\n@app.get("/health")\nasync def health_check():\n    """CI/CD and load balancers call this to verify the app is healthy."""\n    return {\n        "status": "healthy",\n        "timestamp": datetime.utcnow().isoformat(),\n        "version": os.getenv("APP_VERSION", "unknown"),\n        "environment": os.getenv("ENVIRONMENT", "unknown")\n    }\n\n@app.get("/ready")\nasync def readiness_check():\n    """Readiness check — verifies app can serve traffic."""\n    try:\n        # Check database connection here\n        return {"status": "ready", "database": "connected"}\n    except Exception as e:\n        from fastapi import HTTPException\n        raise HTTPException(status_code=503, detail=f"Not ready: {str(e)}")\n\n# In CI pipeline, verify health after deployment:\n# for i in 1 2 3 4 5; do\n#   status=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL/health)\n#   [ "$status" == "200" ] && echo "Health check passed!" && exit 0\n#   sleep 15\n# done\n# echo "Health check FAILED — triggering rollback"\n# exit 1'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l13q1',
          question: 'What is the purpose of a health check endpoint `/health`?',
          options: ["To display application documentation", "To allow CI/CD systems and load balancers to verify the application is running correctly", "To check the developer's computer health", "To run database migrations"],
          correctIndex: 1,
          explanation: 'The /health endpoint returns HTTP 200 when the application is healthy. CI/CD pipelines, load balancers, and container orchestrators call this endpoint.'
        },
        {
          id: 'l13q2',
          question: 'What should happen if a health check fails after deployment?',
          options: ["Send an email and wait", "Keep the new version running and monitor more closely", "Automatically rollback to the previous working version", "Restart the health check from scratch"],
          correctIndex: 2,
          explanation: 'A failed health check after deployment means the new version is broken. The pipeline should automatically rollback to restore service.'
        },
        {
          id: 'l13q3',
          question: 'What does `aws ecs wait services-stable` do?',
          options: ["Creates a new ECS cluster", "Blocks the pipeline until ECS confirms all tasks are healthy", "Deletes old ECS tasks immediately", "Checks if the ECS service has enough memory"],
          correctIndex: 1,
          explanation: '`aws ecs wait services-stable` polls ECS until the service has reached a stable state — all running tasks are healthy.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['Deployment: pull artifact → stop old version → start new version → health check → route traffic', 'Health check endpoints (/health, /ready) are essential for CI/CD and load balancers', 'Always implement automatic rollback when a health check fails after deployment', 'Use liveness checks (is the app alive?) and readiness checks (can it serve traffic?) separately', 'Never report a deployment as successful until health checks pass']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: "Lesson 14 takes you into AWS — EC2, ECS, ECR, IAM, and load balancers. You'll learn how Docker images travel from your pipeline to running on AWS infrastructure."
    }
  ]
};
