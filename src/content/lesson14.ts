import { Lesson } from './lessons';

export const lesson14: Lesson = {
  id: 14,
  slug: 'deploying-to-aws',
  title: 'Deploying to AWS',
  subtitle: 'EC2, ECS, ECR, IAM — how code reaches the cloud',
  module: 3,
  duration: '35 min',
  difficulty: 'Intermediate',
  tags: ["AWS", "ECS", "ECR", "EC2", "IAM", "Load Balancer"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: "AWS (Amazon Web Services) is the world's largest cloud platform. For CI/CD and deployment:\n\n**EC2 (Elastic Compute Cloud)** — Virtual servers in the cloud. Rent by the hour.\n\n**ECS (Elastic Container Service)** — Managed service that runs Docker containers at scale. Tell ECS 'run this image with 2 copies' and it handles scheduling, health checks, and restarts.\n\n**ECR (Elastic Container Registry)** — Private Docker image registry on AWS.\n\n**IAM (Identity and Access Management)** — Controls who and what can access AWS resources.\n\n**ALB (Application Load Balancer)** — Distributes user traffic across multiple running containers.\n\n**S3 (Simple Storage Service)** — Object storage for artifacts, logs, and backups."
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'AWS services map to restaurant infrastructure:\n\n- **VPC** = The restaurant building (your private network)\n- **ALB** = The front door open to customers\n- **ECS** = Kitchen where food is prepared (containers)\n- **ECR** = Pantry/storage for ingredients (Docker images)\n- **IAM** = Staff ID cards and access levels\n- **Route 53** = Restaurant address on Google Maps\n- **Auto Scaling** = Ability to handle the dinner rush'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# GitHub Actions: Build and Deploy to AWS ECS\nname: Deploy to AWS ECS\n\non:\n  push:\n    branches: [ main ]\n\nenv:\n  AWS_REGION: us-east-1\n  ECR_REPOSITORY: food-order-api\n  ECS_CLUSTER: production-cluster\n  ECS_SERVICE: food-order-api-service\n\npermissions:\n  id-token: write\n  contents: read\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Configure AWS credentials (OIDC)\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/GitHubActionsRole\n          aws-region: ${{ env.AWS_REGION }}\n\n      - name: Login to ECR\n        id: login-ecr\n        uses: aws-actions/amazon-ecr-login@v2\n\n      - name: Build and push image\n        env:\n          REGISTRY: ${{ steps.login-ecr.outputs.registry }}\n          TAG: ${{ github.sha }}\n        run: |\n          docker build -t $REGISTRY/$ECR_REPOSITORY:$TAG .\n          docker push $REGISTRY/$ECR_REPOSITORY:$TAG\n\n      - name: Update ECS service\n        run: |\n          aws ecs update-service \\\n            --cluster $ECS_CLUSTER \\\n            --service $ECS_SERVICE \\\n            --force-new-deployment\n          aws ecs wait services-stable \\\n            --cluster $ECS_CLUSTER \\\n            --services $ECS_SERVICE'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l14q1',
          question: 'What is Amazon ECR used for in a CI/CD pipeline?',
          options: ["Running serverless functions", "Storing and serving Docker images privately", "Managing DNS for your application", "Running automated tests"],
          correctIndex: 1,
          explanation: 'Amazon ECR (Elastic Container Registry) is a private Docker registry. Your pipeline pushes images to ECR after building, and ECS pulls from ECR when deploying.'
        },
        {
          id: 'l14q2',
          question: 'What does a load balancer (ALB) do?',
          options: ["Builds Docker images from source code", "Stores application logs", "Distributes incoming user traffic across multiple running containers", "Manages IAM roles and permissions"],
          correctIndex: 2,
          explanation: 'An Application Load Balancer receives all incoming traffic and distributes it across healthy container instances.'
        },
        {
          id: 'l14q3',
          question: 'Why is IAM important for CI/CD?',
          options: ["It builds Docker images faster", "It controls what your CI/CD pipeline is permitted to do in AWS", "It automatically deploys to production", "It compresses Docker images"],
          correctIndex: 1,
          explanation: 'IAM defines what each identity (including your GitHub Actions role) is allowed to do in AWS. Properly configured roles give your pipeline only the minimum permissions it needs.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['The AWS flow: GitHub → build image → push to ECR → deploy to ECS → serve via ALB', 'ECS manages running containers; ECR stores Docker images; ALB routes traffic to healthy containers', 'IAM roles control what your pipeline can do in AWS — always use least-privilege permissions', 'Use OIDC (not stored access keys) for GitHub Actions to authenticate with AWS', 'Set budget alerts in AWS before creating resources — unexpected bills are common for beginners']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: "Lesson 15 covers deployment strategies — rolling, blue-green, and canary. You'll learn how to release new versions with zero downtime."
    }
  ]
};
