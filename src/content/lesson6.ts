import { Lesson } from './lessons';

export const lesson6: Lesson = {
  id: 6,
  slug: 'what-is-a-cicd-pipeline',
  title: 'What Is a CI/CD Pipeline?',
  subtitle: 'Stages, jobs, steps, runners — how pipelines orchestrate automation',
  module: 2,
  duration: '25 min',
  difficulty: 'Beginner',
  tags: ["Pipeline", "GitHub Actions", "YAML", "Automation"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'A **pipeline** is a series of automated steps that run in a defined order.\n\n**Pipeline vocabulary:**\n\n- **Pipeline** — The complete automated process from trigger to completion\n- **Stage** — A logical grouping of work (Build, Test, Deploy)\n- **Job** — A single unit of work that runs on one machine\n- **Step** — A single command or action within a job\n- **Runner** — The machine that executes a job\n- **Trigger** — The event that starts the pipeline\n- **Artifact** — A file produced by one job and passed to the next'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'A restaurant order flows through stations in a defined sequence:\n\nOrder Received → Food Prep → Quality Check → Packaging → Dispatch → Delivery\n\nEach station is like a pipeline **job**. The restaurant cannot dispatch the order before it has been packaged. Jobs run in sequence because each depends on the previous one.\n\nBut imagine a breakfast order: eggs and toast can be prepared simultaneously, then plated together. This is **parallel execution** — multiple jobs running at the same time, merging when both complete.'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: 'name: Full CI/CD Pipeline\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  build:\n    name: Build Application\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n\n  test:\n    name: Run Tests\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pytest tests/ -v\n\n  security:\n    name: Security Scan\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install safety && safety check\n\n  deploy:\n    name: Deploy to Production\n    needs: [test, security]\n    runs-on: ubuntu-latest\n    if: github.ref == \'refs/heads/main\'\n    steps:\n      - name: Deploy\n        run: echo "Deploying application..." '
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l6q1',
          question: "What is a 'runner' in a CI/CD pipeline?",
          options: ["A developer who manually deploys code", "The machine (virtual or physical) that executes pipeline jobs", "A script that checks code quality", "A notification sent when the pipeline completes"],
          correctIndex: 1,
          explanation: 'A runner is the computing environment where jobs execute. GitHub-hosted runners are fresh virtual machines provided by GitHub.'
        },
        {
          id: 'l6q2',
          question: 'Job B has `needs: [A, C]`. When does Job B run?',
          options: ["At the same time as A and C", "Before A and C start", "After both A and C have completed successfully", "Only if A fails"],
          correctIndex: 2,
          explanation: '`needs: [A, C]` means Job B waits until BOTH Job A and Job C have completed successfully.'
        },
        {
          id: 'l6q3',
          question: "What does `if: github.ref == 'refs/heads/main'` do?",
          options: ["Runs pipeline only on Mondays", "Restricts a job to only run when the push is to the main branch", "Checks if the repository is public", "Validates commit message format"],
          correctIndex: 1,
          explanation: 'This condition means the job only runs when the push was to the main branch, preventing feature branches from deploying to production.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['A pipeline is an automated assembly line: trigger → stages → jobs → steps → result', 'Jobs can run sequentially (using `needs:`) or in parallel for speed', '`needs:` creates dependencies — a deploy job cannot run if tests fail', 'Runners are fresh virtual machines provided by your CI platform', 'Conditions (`if:`) let you control exactly when each job runs']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Lesson 7 focuses on Build Automation — what a build is, how dependencies are managed, and how to troubleshoot common build failures.'
    }
  ]
};
