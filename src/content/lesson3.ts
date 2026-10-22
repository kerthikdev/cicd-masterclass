import { Lesson } from './lessons';

export const lesson3: Lesson = {
  id: 3,
  slug: 'continuous-integration',
  title: 'Continuous Integration (CI)',
  subtitle: 'Merge code frequently, catch problems instantly',
  module: 1,
  duration: '25 min',
  difficulty: 'Beginner',
  tags: ['CI', 'Git', 'Automation', 'Testing'],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: [
        'The precise definition of Continuous Integration',
        'Why integrating code frequently is important',
        'What Git repositories and shared codebases are',
        'How automated builds and tests work in CI',
        'A real-world example of two developers working on the same application'
      ]
    },
    {
      type: 'explanation',
      title: 'What Is Continuous Integration?',
      content: '**Continuous Integration (CI)** is the practice of all developers on a team merging their code changes into a shared central repository multiple times per day, with each merge automatically triggering a build and test run.\n\nThe word "continuous" is key. Before CI, developers would work in isolation for weeks, then try to merge everything at once. The result was called "integration hell" — hours or days of resolving conflicts, broken builds, and mysterious bugs.\n\nCI solves this with one simple rule: **integrate often, automate everything**.\n\nEvery time a developer pushes code, the CI system:\n1. Pulls the latest combined code\n2. Builds the application from scratch\n3. Runs all automated tests\n4. Reports the result within minutes\n\nIf the build or tests fail, the developer is notified immediately and fixes the problem while the context is still fresh in their mind.'
    },
    {
      type: 'analogy',
      title: '🍔 The Kitchen Coordination Analogy',
      content: "Imagine a busy restaurant kitchen with 5 chefs:\n\n**Without coordination (before CI):** Each chef works independently for a week, then on Friday everyone brings their dishes to the pass together. Chef A made a sauce that contains an allergen Chef B's dish was supposed to avoid. Complete chaos at the service window.\n\n**With continuous coordination (CI equivalent):** Each chef updates the shared recipe board every hour. Whenever a chef adds a new ingredient, an automated system checks if it conflicts with other dishes. A conflict is caught within minutes, not discovered at the dinner rush.\n\nThe shared recipe board = Git repository\nChecking for conflicts = Automated build and tests\nCatching problems early = The entire value proposition of CI"
    },
    {
      type: 'deep-dive',
      title: 'How CI Works: A Real Example',
      content: "Meet Sarah and James, both developers on a Python web application.\n\n**9:00 AM** — Both pull the latest code from GitHub. The app has 500 tests, all passing.\n\n**11:30 AM** — Sarah finishes a new user profile feature. She pushes to GitHub. CI triggers:\n- All 500 tests run and pass ✅\n- Sarah gets a green notification\n\n**12:15 PM** — James finishes a performance improvement. He pushes to GitHub. CI triggers:\n- 3 tests fail ❌ — James's optimization broke Sarah's new validation logic\n- James gets a red notification with exact test names and error messages\n\n**12:20 PM** — James sees the failure and fixes the conflict in 10 minutes.\n\n**Without CI:** This conflict would be discovered weeks later, making it extremely difficult to identify the root cause."
    },
    {
      type: 'code',
      title: 'A Basic CI Configuration (.github/workflows/ci.yml)',
      language: 'yaml',
      code: `name: Continuous Integration

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run linter
        run: flake8 src/ --max-line-length=120

      - name: Run tests
        run: pytest tests/ -v --tb=short

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: test-results.xml`
    },
    {
      type: 'code-explanation',
      title: 'Breaking Down the CI Configuration',
      items: [
        '`on: push:` — This pipeline runs automatically on every code push',
        '`branches: [ main, develop ]` — Only for these branches, not experimental ones',
        '`runs-on: ubuntu-latest` — GitHub provides a fresh, clean virtual machine',
        '`actions/checkout@v4` — Downloads your code onto the CI machine',
        '`pip install -r requirements.txt` — Installs all app dependencies from the list',
        '`flake8 src/` — Code quality checker: catches style errors and obvious bugs',
        '`pytest tests/ -v` — Runs all test files in the tests/ folder with verbose output',
        '`if: always()` — Upload results even if tests fail, so we can see what broke'
      ]
    },
    {
      type: 'analogy-table',
      title: 'CI Concepts Mapped to the Restaurant',
      headers: ['🍔 Restaurant Kitchen', '💻 CI Equivalent'],
      rows: [
        ['Shared recipe book all chefs update', 'Git repository (shared codebase)'],
        ['A chef adds a new recipe', 'Developer pushes code to GitHub'],
        ['Kitchen manager reviews for conflicts', 'CI system runs automated checks'],
        ['Taste test before serving', 'Automated tests run on the build'],
        ['Dish rejected if it tastes wrong', 'CI fails if tests fail — code not merged'],
        ['All chefs notified of recipe changes', 'All developers notified of build results']
      ]
    },
    {
      type: 'mistakes',
      title: 'Common CI Mistakes',
      items: [
        '❌ Committing to main branch directly without a feature branch',
        '❌ Pushing code that does not build locally first — "it works on my machine"',
        '❌ Ignoring CI failures — building a culture of "red is OK"',
        '❌ Having CI take 45 minutes — fast feedback is essential; aim for under 10 minutes',
        '❌ Writing no tests — CI with no tests only verifies the app compiles, not that it works'
      ]
    },
    {
      type: 'exercise',
      title: 'Practical Exercise',
      content: '**Trace a CI failure:**\n\nGiven this CI output:\n```\nFAILED tests/test_user.py::test_user_profile_update - AssertionError\nExpected: {"name": "Sarah", "email": "sarah@example.com"}\nGot:      {"name": "Sarah", "email": null}\n```\n\n1. Which test failed?\n2. What did the test expect vs what it got?\n3. Which developer\'s change likely caused this?\n4. What should the developer do next?\n\nThink through this — CI provides exactly this level of detail to make debugging fast.'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l3q1',
          question: 'What does "Continuous" mean in Continuous Integration?',
          options: ['The pipeline runs 24 hours a day regardless of code changes', 'Developers integrate their changes frequently, multiple times per day', 'The application runs continuously without restarts', 'Tests run forever in an infinite loop'],
          correctIndex: 1,
          explanation: '"Continuous" means integrating code changes frequently — multiple times per day — rather than in large batches every few weeks.'
        },
        {
          id: 'l3q2',
          question: 'What is "integration hell"?',
          options: ['When a CI server runs out of disk space', 'The painful process of merging weeks of isolated work, full of conflicts and broken code', 'When too many tests run simultaneously', 'A specific error in Jenkins pipelines'],
          correctIndex: 1,
          explanation: 'Integration hell describes the painful experience of trying to merge large amounts of code developed in isolation. CI prevents this by integrating small, frequent changes.'
        },
        {
          id: 'l3q3',
          question: 'If a CI pipeline fails, what is the correct response?',
          options: ['Mark it as acceptable and continue', 'Restart the pipeline and hope it passes', 'The developer who broke it should fix it immediately while the context is fresh', 'Wait until the end of the sprint to fix all failures at once'],
          correctIndex: 2,
          explanation: 'The developer who introduced the failing change should fix it immediately. The context is freshest now, and an unfixed failure blocks the rest of the team.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: [
        'CI means merging code to a shared repository many times per day, with automated build and test on every merge',
        "Early problem detection is the core value — catch bugs when they're introduced, not weeks later",
        'A CI pipeline: checkout → install → lint → test → report',
        'GitHub Actions is a popular, free CI platform built directly into GitHub',
        'Fast pipelines (under 10 minutes) are critical for CI to be effective'
      ]
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next: Lesson 4',
      content: "Lesson 4 draws the critical distinctions between CI, Continuous Delivery, and Continuous Deployment. You'll learn about approval gates, release policies, and when to use each model."
    }
  ]
};
