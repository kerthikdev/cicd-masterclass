import { Lesson } from './lessons';

export const lesson19: Lesson = {
  id: 19,
  slug: 'real-world-cicd-project',
  title: 'Real-World CI/CD Project',
  subtitle: 'Build a complete automated pipeline for a food ordering application',
  module: 4,
  duration: '60 min',
  difficulty: 'Advanced',
  tags: ["Project", "FastAPI", "Docker", "GitHub Actions", "AWS", "End-to-End"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'This project builds a FastAPI food ordering API and a complete CI/CD pipeline.\n\n**Architecture:**\n- **Application:** FastAPI (Python) REST API\n- **Tests:** pytest with 80%+ coverage\n- **Container:** Multi-stage Dockerfile\n- **Registry:** Amazon ECR\n- **Compute:** Amazon ECS Fargate\n- **Pipeline:** GitHub Actions: Test → Security → Build → Deploy\n- **Monitoring:** CloudWatch logs with SNS alerts\n- **Rollback:** Automatic on health check failure\n\n**Estimated AWS cost:** $15-25/month for minimal setup. Delete resources after the project.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'Building the complete restaurant automation system:\n\n1. **Design the menu** (write the FastAPI application)\n2. **Write the recipes** (create tests that verify the menu is correct)\n3. **Package the kitchen** (build a Docker container)\n4. **Store in the warehouse** (push to Amazon ECR)\n5. **Open the restaurant** (deploy to AWS ECS)\n6. **Hire health inspectors** (configure CloudWatch monitoring)\n7. **Train the staff** (set up automated rollback)\n8. **Open for business** (verify everything works end-to-end)'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# .github/workflows/pipeline.yml\nname: Food Order API — Complete Pipeline\n\non:\n  push:\n    branches: [ main ]\n\npermissions:\n  id-token: write\n  contents: read\n\njobs:\n  test:\n    name: Test and Quality Checks\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4.1.1\n      - uses: actions/setup-python@v4.7.0\n        with: { python-version: \'3.11\', cache: \'pip\' }\n      - run: pip install -r requirements.txt -r requirements-dev.txt\n      - run: flake8 src/ tests/\n      - run: pytest tests/ -v --cov=src --cov-fail-under=80\n\n  security:\n    name: Security Scan\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4.1.1\n      - run: pip install pip-audit bandit\n      - run: pip-audit -r requirements.txt\n      - run: bandit -r src/ -ll -ii\n\n  build:\n    name: Build and Push Docker Image\n    needs: [test, security]\n    if: github.ref == \'refs/heads/main\'\n    runs-on: ubuntu-latest\n    outputs:\n      image: ${{ steps.push.outputs.image }}\n    steps:\n      - uses: actions/checkout@v4.1.1\n      - uses: aws-actions/configure-aws-credentials@v4.0.2\n        with:\n          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/GitHubActionsRole\n          aws-region: us-east-1\n      - id: login-ecr\n        uses: aws-actions/amazon-ecr-login@v2.0.1\n      - id: push\n        run: |\n          docker build -t ${{ steps.login-ecr.outputs.registry }}/food-order-api:${{ github.sha }} .\n          docker push ${{ steps.login-ecr.outputs.registry }}/food-order-api:${{ github.sha }}\n          echo "image=${{ steps.login-ecr.outputs.registry }}/food-order-api:${{ github.sha }}" >> $GITHUB_OUTPUT\n\n  deploy:\n    name: Deploy to Production\n    needs: build\n    environment: production\n    runs-on: ubuntu-latest\n    steps:\n      - uses: aws-actions/configure-aws-credentials@v4.0.2\n        with:\n          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/GitHubActionsRole\n          aws-region: us-east-1\n      - run: |\n          aws ecs update-service --cluster production --service food-order-api-service --force-new-deployment\n          aws ecs wait services-stable --cluster production --services food-order-api-service'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l19q1',
          question: 'In the project pipeline, why does the `build` job have `needs: [test, security]`?',
          options: ["To run all jobs in parallel", "To ensure tests AND security scans both pass before building the Docker image", "GitHub requires this syntax", "To save GitHub Actions minutes"],
          correctIndex: 1,
          explanation: '`needs: [test, security]` means the build job only runs when BOTH the test job AND the security job complete successfully.'
        },
        {
          id: 'l19q2',
          question: 'Why are action versions pinned to exact tags in this project?',
          options: ["Shorter tags are deprecated", "Exact version pinning prevents supply chain attacks where a mutable tag could be updated to malicious code", "GitHub Actions requires exact pinning", "Pinning improves execution speed"],
          correctIndex: 1,
          explanation: 'Pinning to exact versions is a security best practice. A compromised action repository could push malicious code that all `@v4` users would automatically run.'
        },
        {
          id: 'l19q3',
          question: 'What should you do with AWS resources after the learning project?',
          options: ["Keep them running — they don't cost anything", "Stop the ECS service and delete ECR images to avoid ongoing costs", "Change the service to a different region", "Scale the service up for better performance"],
          correctIndex: 1,
          explanation: 'AWS charges for ECS tasks even when idle. After the project, set the desired count to 0 or delete the service.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['A complete pipeline: Test → Security → Build (Docker) → Deploy (ECS), each dependent on the previous', 'Pin all action versions to specific semver or SHA for supply chain security', 'Use `cov-fail-under` to enforce minimum test coverage as a quality gate', 'OIDC + GitHub Actions Secrets is the correct secret management approach', 'Always clean up AWS resources after learning projects to avoid unexpected billing']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Lesson 20 is the final lesson — comprehensive recap, interactive quiz, interview questions, production checklist, and recommended next learning paths.'
    }
  ]
};
