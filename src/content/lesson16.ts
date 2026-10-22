import { Lesson } from './lessons';

export const lesson16: Lesson = {
  id: 16,
  slug: 'pipeline-failures-and-troubleshooting',
  title: 'Pipeline Failures and Troubleshooting',
  subtitle: 'Diagnosing and fixing the most common CI/CD problems',
  module: 4,
  duration: '25 min',
  difficulty: 'Intermediate',
  tags: ["Debugging", "Troubleshooting", "Logs", "Pipeline Errors"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'CI/CD pipelines fail for predictable, categorised reasons:\n\n**Category 1: Build Failures** — Missing dependency, syntax error, wrong language version\n\n**Category 2: Test Failures** — Actual bug introduced, flaky test, hardcoded test data changed\n\n**Category 3: Authentication Failures** — Expired GitHub secret, IAM permission missing, ECR token expired\n\n**Category 4: Deployment Failures** — Docker image not found, ECS task insufficient memory, health check fails\n\n**Category 5: Infrastructure Failures** — GitHub runner degraded, AWS service outage, rate limiting'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'Restaurant problems map to pipeline failures:\n\n- **Kitchen ran out of an ingredient** = Missing package in requirements.txt → add the package\n- **Recipe card has a typo** = YAML syntax error → fix YAML indentation\n- **Staff member has no access to pantry** = IAM permission denied → add the permission\n- **Dish description on menu wrong** = Wrong image tag in task definition → verify push succeeded\n- **Manager texted when order is ready** = Slack notification on pipeline status → configure Slack Action'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# Common errors and fixes:\n\n# ERROR 1: Missing dependency\n# ModuleNotFoundError: No module named \'fastapi\'\n# Fix: Add fastapi to requirements.txt\n\n# ERROR 2: YAML syntax error\n# Error: mapping values are not allowed in this context\n# Fix: Add missing colon: runs-on: ubuntu-latest (not runs-on ubuntu-latest)\n\n# ERROR 3: AWS permission denied\n# An error occurred (AccessDenied) when calling DescribeTaskDefinition\n# Fix: Add ecs:DescribeTaskDefinition to the IAM role policy\n\n# ERROR 4: Docker image not found\n# CannotPullContainerError: repository does not exist or requires authentication\n# Fix: Verify the image was successfully pushed to ECR in the build job\n\n# Pipeline with notifications\nname: Pipeline with Notifications\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pytest tests/ -v\n\n      - name: Notify success\n        if: success()\n        run: echo "Tests passed! Notifying team..."\n\n      - name: Notify failure\n        if: failure()\n        run: |\n          echo "Pipeline FAILED on ${{ github.ref_name }}"\n          echo "Actor: ${{ github.actor }}"\n          echo "Commit: ${{ github.sha }}"\n          # curl -X POST ${{ secrets.SLACK_WEBHOOK }} -d \'{"text": "❌ Pipeline Failed!"}\''
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l16q1',
          question: "A pipeline fails with `ModuleNotFoundError: No module named 'requests'`. What is the fix?",
          options: ["Reinstall Python on the CI runner", "Add `requests` to requirements.txt and commit the change", "Change the runner from ubuntu to macos", "Delete the failing test"],
          correctIndex: 1,
          explanation: '`ModuleNotFoundError` means a package was not installed. In CI, packages are only installed from requirements.txt.'
        },
        {
          id: 'l16q2',
          question: 'Your pipeline fails in CI but the same command passes locally. What is most likely?',
          options: ["The CI server is faster", "A dependency or environment variable available locally is not configured in CI", "Tests are language-specific", "The branch name has a special character"],
          correctIndex: 1,
          explanation: '"Works on my machine" usually means a local dependency or env variable is not present in the clean CI environment.'
        },
        {
          id: 'l16q3',
          question: 'What does `if: failure()` do in a GitHub Actions step?',
          options: ["Causes the step to always fail", "Runs the step even when a previous step has failed", "Skips the step if any previous step failed", "Retries the step if it fails"],
          correctIndex: 1,
          explanation: '`if: failure()` runs the step only when a previous step has failed — essential for notification steps.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['Pipeline failures fall into predictable categories: build, test, auth, deployment, infrastructure', 'Always read the exact error message before guessing — it tells you exactly what failed', 'Troubleshooting process: read logs → identify stage → check recent changes → reproduce locally', 'Use `if: failure()` for notification steps so alerts fire even when the pipeline is broken', 'Retry actions handle flaky tests and temporary external service issues']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Lesson 17 covers DevSecOps — integrating security into the CI/CD pipeline.'
    }
  ]
};
