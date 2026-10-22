import { Lesson } from './lessons';

export const lesson10: Lesson = {
  id: 10,
  slug: 'choosing-a-cicd-tool',
  title: 'Choosing a CI/CD Tool',
  subtitle: 'GitHub Actions, Jenkins, GitLab CI/CD, AWS CodePipeline compared',
  module: 2,
  duration: '20 min',
  difficulty: 'Beginner',
  tags: ["GitHub Actions", "Jenkins", "GitLab CI", "AWS CodePipeline", "YAML"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'There are dozens of CI/CD tools, but four dominate the industry:\n\n**GitHub Actions** — Built into GitHub. Zero setup if your code is already on GitHub. Thousands of pre-built actions. Free tier for public repos. Best choice for new projects.\n\n**Jenkins** — The veteran. Open-source, self-hosted. Extremely flexible via plugins. Requires more setup and maintenance. Common in large enterprises.\n\n**GitLab CI/CD** — Built into GitLab. Similar to GitHub Actions with a unified DevOps platform. Strong container registry integration.\n\n**AWS CodePipeline** — Native AWS service. Integrates deeply with all AWS tools. Best when your entire infrastructure is AWS.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: "Different restaurants have different order management systems:\n\n- **GitHub Actions** = The restaurant's built-in point-of-sale system — comes included, easy to use\n- **Jenkins** = A fully customisable kitchen management system — requires setup but extremely flexible\n- **GitLab CI** = An integrated restaurant management platform (orders, inventory, scheduling)\n- **AWS CodePipeline** = A delivery system built specifically for Amazon restaurants"
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: "# The SAME pipeline in three different tools:\n\n# GitHub Actions (.github/workflows/ci.yml)\nname: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n      - run: pytest tests/\n\n# ─────────────────────────────────────────────\n\n# GitLab CI (.gitlab-ci.yml)\n# test-job:\n#   image: python:3.11\n#   script:\n#     - pip install -r requirements.txt\n#     - pytest tests/\n\n# ─────────────────────────────────────────────\n\n# Jenkins (Jenkinsfile)\n# pipeline {\n#   agent { docker { image 'python:3.11' } }\n#   stages {\n#     stage('Test') {\n#       steps {\n#         sh 'pip install -r requirements.txt'\n#         sh 'pytest tests/'\n#       }\n#     }\n#   }\n# }\n# Notice: all three do the SAME THING. Concepts transfer."
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l10q1',
          question: 'Your team uses GitHub and wants the simplest CI/CD setup. Which tool is best?',
          options: ["Jenkins — it has the most plugins", "AWS CodePipeline — it scales infinitely", "GitHub Actions — it is built into GitHub with no additional setup", "A custom bash script"],
          correctIndex: 2,
          explanation: 'GitHub Actions is built into GitHub, requires zero additional setup, and has thousands of pre-built actions.'
        },
        {
          id: 'l10q2',
          question: 'What indentation style does YAML require?',
          options: ["Tabs only", "Either tabs or spaces", "Spaces only (tabs cause errors)", "No indentation required"],
          correctIndex: 2,
          explanation: 'YAML requires spaces for indentation — tabs are not allowed and will cause parse errors.'
        },
        {
          id: 'l10q3',
          question: "A company's security policy requires code never leaves their network. What runner type do they need?",
          options: ["GitHub-hosted runners", "Self-hosted runners on their own private servers", "AWS Lambda functions", "Docker Hub runners"],
          correctIndex: 1,
          explanation: 'Self-hosted runners install the CI agent on machines the company controls. Code never leaves the private network.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['GitHub Actions (easiest), Jenkins (most flexible), GitLab CI (unified platform), AWS CodePipeline (AWS-native)', 'YAML is the configuration language for most CI/CD tools — use spaces, not tabs', 'Pipeline concepts (stages, jobs, triggers, artifacts) are the same across all tools', 'Hosted runners = zero infra management; self-hosted = control and privacy', 'Choose your tool based on where your code lives and what infrastructure you use']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Module 3 begins! Lesson 11 deep-dives into pipeline triggers and webhooks — the event-driven mechanism that starts your pipeline automatically.'
    }
  ]
};
