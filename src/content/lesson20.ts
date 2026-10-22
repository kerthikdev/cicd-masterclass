import { Lesson } from './lessons';

export const lesson20: Lesson = {
  id: 20,
  slug: 'final-recap-quiz-and-production-workflow',
  title: 'Final Recap, Quiz, and Production Workflow',
  subtitle: 'Consolidate everything — quiz, interview prep, and what to learn next',
  module: 4,
  duration: '45 min',
  difficulty: 'Advanced',
  tags: ["Recap", "Quiz", "Interview Prep", "Production", "Next Steps"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'You have completed all 20 lessons! Here is the complete picture:\n\n1. Developer writes code on a feature branch, pushed via Git\n2. GitHub triggers the pipeline via webhook\n3. CI: dependencies installed, code compiled, linting runs\n4. CI: tests run, coverage gate enforced, security scans complete\n5. CI: Docker image built with multi-stage Dockerfile\n6. CI: Image pushed to Amazon ECR with commit SHA tag\n7. CD: Automatically deployed to staging ECS service\n8. CD: Team reviews in staging (or automated approval)\n9. CD: Deployed to production ECS via rolling/blue-green\n10. Verification: Health checks pass, CloudWatch metrics stable\n11. Monitoring: Logs, metrics, traces continuously monitored\n12. Feedback: User feedback informs the next development cycle'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'The complete restaurant analogy from start to finish:\n\n🍔 Customer orders → 👨\u200d🍳 Chef writes recipe → 📚 Recipe enters shared book → 🏃 Kitchen notified → 🔥 Food prepared → ✅ Quality inspected → 📦 Packaged → 🚗 Dispatched → 🏠 Delivered → 😊 Customer satisfied → ⭐ Feedback improves next order\n\nThis cycle runs thousands of times per day at top technology companies. You now understand every stage of this automated, reliable, and repeatable process.'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# Complete CI/CD production checklist verification\necho "=== CI/CD Production Readiness Check ==="\n\necho "--- Code Quality ---"\nflake8 src/ tests/ && echo "✅ Linting passed"\nmypy src/ && echo "✅ Type checking passed"\npytest tests/ --cov=src --cov-fail-under=80 && echo "✅ Tests passed with 80%+ coverage"\n\necho "--- Security ---"\ngitleaks detect && echo "✅ No secrets detected"\npip-audit -r requirements.txt && echo "✅ No vulnerable dependencies"\nbandit -r src/ -ll && echo "✅ No SAST issues"\ntrivy image food-order-api:latest --exit-code 1 && echo "✅ No critical container CVEs"\n\necho "--- Deployment ---"\ncurl -f https://api.food-order.example.com/health && echo "✅ Health check passing"\ncurl -f https://api.food-order.example.com/ready && echo "✅ Readiness check passing"\n\necho "--- Monitoring ---"\naws cloudwatch describe-alarms --state-value OK && echo "✅ All alarms in OK state"\n\necho "=== All checks passed — production ready! ===" '
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l20q1',
          question: 'A developer pushes code to GitHub. Within seconds, a build starts automatically. What enables this?',
          options: ["The developer manually clicks 'Run' in GitHub Actions", "A webhook fires from GitHub to the CI system", "The CI system polls GitHub every 10 seconds", "An AWS Lambda monitors the repository"],
          correctIndex: 1,
          explanation: 'A webhook is an HTTP notification sent by GitHub to the CI system the moment a push occurs.'
        },
        {
          id: 'l20q2',
          question: 'What is the key advantage of Docker for application packaging?',
          options: ["Docker makes code run faster", "Docker packages the application and all its dependencies into one portable unit that runs identically everywhere", "Docker eliminates the need for testing", "Docker automatically fixes bugs"],
          correctIndex: 1,
          explanation: "Docker's value is portability and consistency — the exact same image runs identically on any machine."
        },
        {
          id: 'l20q3',
          question: 'Your pipeline deploys successfully but users report the app is broken. What is the first step?',
          options: ["Redeploy the same version", "Rollback to the previous version immediately, then investigate logs", "Wait for more users to report", "Increase ECS task memory"],
          correctIndex: 1,
          explanation: 'When users are affected, first priority is restoring service — rollback. Then investigate at a measured pace.'
        },
        {
          id: 'l20q4',
          question: 'What is OIDC used for in GitHub Actions AWS deployments?',
          options: ["Compressing Docker images", "Authenticating GitHub Actions with AWS without storing any long-lived access keys", "Encrypting pipeline logs", "Running tests in parallel"],
          correctIndex: 1,
          explanation: 'OIDC lets GitHub issue a short-lived signed token that AWS can verify, eliminating the need to store AWS access keys.'
        },
        {
          id: 'l20q5',
          question: 'Which deployment strategy provides the FASTEST rollback?',
          options: ["Rolling deployment", "Canary deployment", "Blue-Green deployment — instantly flip all traffic back to Blue", "Recreate deployment"],
          correctIndex: 2,
          explanation: 'Blue-Green keeps the old environment running. Rolling back is an instant load balancer configuration change.'
        },
        {
          id: 'l20q6',
          question: 'A developer committed an AWS access key to a public GitHub repository. What is the correct response?',
          options: ["Delete the file and push a new commit", "Make the repository private", "Immediately rotate the key in AWS IAM, assume it is compromised, check CloudTrail", "Wait to see if anyone reports unusual billing"],
          correctIndex: 2,
          explanation: "Git history is permanent — deleting the file doesn't remove the secret. The key must be immediately rotated and assumed compromised."
        },
        {
          id: 'l20q7',
          question: 'What does `--cov-fail-under=80` do?',
          options: ["Limits test execution time to 80 seconds", "Selects only 80% of tests to run", "Fails the pipeline if test code coverage drops below 80%", "Requires at least 80 test cases"],
          correctIndex: 2,
          explanation: 'This flag makes pytest exit with failure if the measured code coverage is below 80%.'
        },
        {
          id: 'l20q8',
          question: 'What is the testing pyramid principle?',
          options: ["Run tests on three servers simultaneously", "Have many fast unit tests, fewer integration tests, and very few slow E2E tests", "All tests should be end-to-end", "Unit tests are the least valuable"],
          correctIndex: 1,
          explanation: 'Many fast unit tests at the base, fewer integration tests, and a small number of E2E tests balances coverage, speed, and reliability.'
        },
        {
          id: 'l20q9',
          question: 'What is the difference between Continuous Delivery and Continuous Deployment?',
          options: ["Delivery is for small teams", "Delivery auto-deploys to staging but requires human approval for production; Deployment deploys automatically", "Delivery uses Docker; Deployment uses VMs", "They are synonyms"],
          correctIndex: 1,
          explanation: 'Continuous Delivery keeps code deployable with human approval for production. Continuous Deployment deploys automatically without any human action.'
        },
        {
          id: 'l20q10',
          question: 'What does a `safety check -r requirements.txt` failure mean?',
          options: ["The requirements.txt has a syntax error", "One or more Python dependencies has a known security vulnerability (CVE)", "The Python version is incompatible", "The test runner cannot find test files"],
          correctIndex: 1,
          explanation: '`safety check` compares your dependencies against a CVE database. A failure means one or more packages has a known vulnerability.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['CI/CD automates the entire software delivery journey: code → build → test → package → deploy → monitor', 'The food ordering analogy maps perfectly to every stage of software delivery', 'Security is not an afterthought — integrate it into every stage (DevSecOps)', 'Monitoring and automatic rollback complete the cycle — deployment is the beginning, not the end', 'The tools (GitHub Actions, Docker, AWS) matter less than the principles — they transfer to any platform']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Congratulations on completing the CI/CD Masterclass! Recommended next topics: Kubernetes, Terraform, GitOps, and Observability.'
    }
  ]
};
