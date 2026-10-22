#!/usr/bin/env python3
"""Generate lesson files 6-20 for the CI/CD masterclass."""

import os

base = "/Users/kerthik/Downloads/Playground/cicd-masterclass/src/content"

lessons_data = {
    6: {
        "slug": "what-is-a-cicd-pipeline",
        "title": "What Is a CI/CD Pipeline?",
        "subtitle": "Stages, jobs, steps, runners — how pipelines orchestrate automation",
        "module": 2,
        "duration": "25 min",
        "difficulty": "Beginner",
        "tags": ["Pipeline", "GitHub Actions", "YAML", "Automation"],
    },
    7: {
        "slug": "build-automation",
        "title": "Build Automation",
        "subtitle": "Compiling, packaging, and producing deployable artifacts",
        "module": 2,
        "duration": "25 min",
        "difficulty": "Beginner",
        "tags": ["Build", "Dependencies", "Artifacts", "npm", "pip"],
    },
    8: {
        "slug": "automated-testing-and-quality-gates",
        "title": "Automated Testing and Quality Gates",
        "subtitle": "The inspection station that stops broken code from reaching users",
        "module": 2,
        "duration": "30 min",
        "difficulty": "Intermediate",
        "tags": ["Testing", "Quality Gates", "pytest", "Jest", "CI"],
    },
    9: {
        "slug": "artifacts-and-container-images",
        "title": "Artifacts and Container Images",
        "subtitle": "From source code to sealed, portable Docker packages",
        "module": 2,
        "duration": "30 min",
        "difficulty": "Intermediate",
        "tags": ["Docker", "Containers", "ECR", "Artifacts", "Images"],
    },
    10: {
        "slug": "choosing-a-cicd-tool",
        "title": "Choosing a CI/CD Tool",
        "subtitle": "GitHub Actions, Jenkins, GitLab CI/CD, AWS CodePipeline compared",
        "module": 2,
        "duration": "20 min",
        "difficulty": "Beginner",
        "tags": ["GitHub Actions", "Jenkins", "GitLab CI", "AWS CodePipeline", "YAML"],
    },
    11: {
        "slug": "pipeline-triggers-and-webhooks",
        "title": "Pipeline Triggers and Webhooks",
        "subtitle": "How the kitchen gets notified the moment an order arrives",
        "module": 3,
        "duration": "20 min",
        "difficulty": "Intermediate",
        "tags": ["Triggers", "Webhooks", "Events", "Automation"],
    },
    12: {
        "slug": "environment-configuration-and-secrets",
        "title": "Environment Configuration and Secrets",
        "subtitle": "Managing API keys, passwords, and environment variables safely",
        "module": 3,
        "duration": "25 min",
        "difficulty": "Intermediate",
        "tags": ["Secrets", "Environment Variables", "Security", "IAM", "GitHub Secrets"],
    },
    13: {
        "slug": "deployment-fundamentals",
        "title": "Deployment Fundamentals",
        "subtitle": "What actually happens when code is deployed to a server",
        "module": 3,
        "duration": "25 min",
        "difficulty": "Intermediate",
        "tags": ["Deployment", "Servers", "Health Checks", "ECS", "Application Startup"],
    },
    14: {
        "slug": "deploying-to-aws",
        "title": "Deploying to AWS",
        "subtitle": "EC2, ECS, ECR, IAM — how code reaches the cloud",
        "module": 3,
        "duration": "35 min",
        "difficulty": "Intermediate",
        "tags": ["AWS", "ECS", "ECR", "EC2", "IAM", "Load Balancer"],
    },
    15: {
        "slug": "deployment-strategies",
        "title": "Deployment Strategies",
        "subtitle": "Rolling, blue-green, and canary — zero-downtime release techniques",
        "module": 3,
        "duration": "25 min",
        "difficulty": "Intermediate",
        "tags": ["Rolling Deployment", "Blue-Green", "Canary", "Zero Downtime", "Rollback"],
    },
    16: {
        "slug": "pipeline-failures-and-troubleshooting",
        "title": "Pipeline Failures and Troubleshooting",
        "subtitle": "Diagnosing and fixing the most common CI/CD problems",
        "module": 4,
        "duration": "25 min",
        "difficulty": "Intermediate",
        "tags": ["Debugging", "Troubleshooting", "Logs", "Pipeline Errors"],
    },
    17: {
        "slug": "security-in-cicd-devsecops",
        "title": "Security in CI/CD (DevSecOps)",
        "subtitle": "Shifting security left — building secure pipelines by default",
        "module": 4,
        "duration": "25 min",
        "difficulty": "Intermediate",
        "tags": ["DevSecOps", "SAST", "Dependency Scanning", "Docker Scanning", "Secret Detection"],
    },
    18: {
        "slug": "monitoring-rollback-and-recovery",
        "title": "Monitoring, Rollback, and Recovery",
        "subtitle": "What happens after deployment — tracking, alerting, and responding",
        "module": 4,
        "duration": "25 min",
        "difficulty": "Intermediate",
        "tags": ["Monitoring", "CloudWatch", "Rollback", "Incident Response", "Prometheus"],
    },
    19: {
        "slug": "real-world-cicd-project",
        "title": "Real-World CI/CD Project",
        "subtitle": "Build a complete automated pipeline for a food ordering application",
        "module": 4,
        "duration": "60 min",
        "difficulty": "Advanced",
        "tags": ["Project", "FastAPI", "Docker", "GitHub Actions", "AWS", "End-to-End"],
    },
    20: {
        "slug": "final-recap-quiz-and-production-workflow",
        "title": "Final Recap, Quiz, and Production Workflow",
        "subtitle": "Consolidate everything — quiz, interview prep, and what to learn next",
        "module": 4,
        "duration": "45 min",
        "difficulty": "Advanced",
        "tags": ["Recap", "Quiz", "Interview Prep", "Production", "Next Steps"],
    },
}

# Generic content for each lesson
lesson_contents = {
    6: {
        "explanation": "A **pipeline** is a series of automated steps that run in a defined order.\n\n**Pipeline vocabulary:**\n\n- **Pipeline** — The complete automated process from trigger to completion\n- **Stage** — A logical grouping of work (Build, Test, Deploy)\n- **Job** — A single unit of work that runs on one machine\n- **Step** — A single command or action within a job\n- **Runner** — The machine that executes a job\n- **Trigger** — The event that starts the pipeline\n- **Artifact** — A file produced by one job and passed to the next",
        "analogy": "A restaurant order flows through stations in a defined sequence:\n\nOrder Received → Food Prep → Quality Check → Packaging → Dispatch → Delivery\n\nEach station is like a pipeline **job**. The restaurant cannot dispatch the order before it has been packaged. Jobs run in sequence because each depends on the previous one.\n\nBut imagine a breakfast order: eggs and toast can be prepared simultaneously, then plated together. This is **parallel execution** — multiple jobs running at the same time, merging when both complete.",
        "code": """name: Full CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    name: Build Application
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt

  test:
    name: Run Tests
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pytest tests/ -v

  security:
    name: Security Scan
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install safety && safety check

  deploy:
    name: Deploy to Production
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy
        run: echo "Deploying application..." """,
        "quiz": [
            ("What is a 'runner' in a CI/CD pipeline?", ["A developer who manually deploys code", "The machine (virtual or physical) that executes pipeline jobs", "A script that checks code quality", "A notification sent when the pipeline completes"], 1, "A runner is the computing environment where jobs execute. GitHub-hosted runners are fresh virtual machines provided by GitHub."),
            ("Job B has `needs: [A, C]`. When does Job B run?", ["At the same time as A and C", "Before A and C start", "After both A and C have completed successfully", "Only if A fails"], 2, "`needs: [A, C]` means Job B waits until BOTH Job A and Job C have completed successfully."),
            ("What does `if: github.ref == 'refs/heads/main'` do?", ["Runs pipeline only on Mondays", "Restricts a job to only run when the push is to the main branch", "Checks if the repository is public", "Validates commit message format"], 1, "This condition means the job only runs when the push was to the main branch, preventing feature branches from deploying to production.")
        ],
        "takeaways": ["A pipeline is an automated assembly line: trigger → stages → jobs → steps → result", "Jobs can run sequentially (using `needs:`) or in parallel for speed", "`needs:` creates dependencies — a deploy job cannot run if tests fail", "Runners are fresh virtual machines provided by your CI platform", "Conditions (`if:`) let you control exactly when each job runs"],
        "next": "Lesson 7 focuses on Build Automation — what a build is, how dependencies are managed, and how to troubleshoot common build failures."
    },
    7: {
        "explanation": "Source code is text that humans write. A **build** is the process of transforming that source code into something computers can actually run.\n\nBuilding involves:\n1. **Download dependencies** — install all external libraries your code needs\n2. **Compile** — convert source code to machine-readable format\n3. **Run pre-build checks** — linting, formatting validation\n4. **Bundle/package** — combine everything into a deployable unit\n5. **Produce an artifact** — the final output file(s) ready to deploy",
        "analogy": "A chef cannot serve raw ingredients to a customer. They must be transformed through a cooking process.\n\n- **Raw ingredients** = Source code (unexecutable text files)\n- **The recipe** = Build script (instructions for transformation)\n- **Fetching missing ingredients** = Installing dependencies\n- **Cooking process** = Compilation or bundling\n- **Quality check during cooking** = Linting and type-checking\n- **The finished dish** = Build artifact (deployable application)",
        "code": """# Python build steps
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Code quality check
flake8 src/ --max-line-length=120

# Type check
mypy src/ --ignore-missing-imports

# Run tests
pytest tests/ -v

# ── requirements.txt (pin exact versions for reproducibility)
# fastapi==0.115.0
# uvicorn==0.31.0
# pytest==8.3.3""",
        "quiz": [
            ("What is a 'build artifact'?", ["A bug discovered during the build", "The source code before compilation", "The deployable output produced by the build process", "A log file from the CI runner"], 2, "A build artifact is the output of the build process — the file or directory that is actually deployed to servers."),
            ("Why use `npm ci` instead of `npm install` in CI?", ["npm ci is faster and installs exact versions from package-lock.json for reproducible builds", "npm install doesn't work in CI", "npm ci skips downloading node_modules", "npm ci automatically fixes conflicts"], 0, "`npm ci` deletes node_modules first and installs EXACTLY what is in package-lock.json, ensuring every pipeline run gets identical dependencies."),
            ("If a build passes locally but fails in CI, what is most likely?", ["The CI server is broken", "A syntax error only appears on Linux", "A dependency is installed locally but missing from requirements.txt", "The developer has faster internet"], 2, 'The "works on my machine" problem usually means a dependency was installed locally but not declared in the dependency file. CI starts fresh, so undeclared dependencies are not available.')
        ],
        "takeaways": ["A build transforms source code into a deployable artifact", "Dependencies must be explicitly declared — not assumed to be installed", "Use `npm ci` (not `npm install`) for reproducible CI builds with locked dependency versions", "Build artifacts are immutable and versioned — build once, deploy anywhere", "Fast feedback from build failures is critical; add caching to keep builds under 5 minutes"],
        "next": "Lesson 8 covers the most critical quality gate: Automated Testing. You'll learn about unit, integration, and end-to-end tests, quality gates, and why a failing test must stop a release."
    },
    8: {
        "explanation": "Automated tests are organised in a pyramid:\n\n**Unit Tests (many, fast)**\nTest a single function or class in complete isolation. Run in milliseconds.\n\n**Integration Tests (fewer, slower)**\nTest how multiple components work together.\n\n**End-to-End Tests (fewest, slowest)**\nTest the complete user journey through a real browser or API. These can take minutes each.\n\nA **Quality Gate** is a standard below which the pipeline fails. If test coverage drops below 80%, the pipeline stops.",
        "analogy": "A well-run restaurant has multiple quality checkpoints:\n\n**Unit check (ingredient level):** Is this tomato fresh? Is the cheese properly sliced?\n\n**Integration check (dish level):** Do all the ingredients work together?\n\n**End-to-end check (order level):** Does the complete order match what the customer requested?\n\n**Quality gate:** Food temperature below 65°C → the order does not leave the kitchen. In software: test coverage below 80% → the pipeline fails.",
        "code": """# tests/test_orders.py
import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

# Unit test: single function
def test_calculate_order_total():
    from src.services.order import calculate_total
    result = calculate_total([{"price": 10, "qty": 2}, {"price": 5, "qty": 1}])
    assert result == 25.0

# Integration test: API endpoint
def test_create_order_returns_201():
    response = client.post("/orders", json={
        "customer_name": "Alice",
        "items": [{"name": "Burger", "price": 12.99, "qty": 1}]
    })
    assert response.status_code == 201
    assert "order_id" in response.json()

# Quality gate: coverage enforcement
# pytest tests/ --cov=src --cov-fail-under=80""",
        "quiz": [
            ("A test checks that a single `calculate_discount()` function returns the correct value. What type is this?", ["End-to-end test", "Integration test", "Unit test", "Smoke test"], 2, "A unit test tests a single function or class in complete isolation."),
            ("What does `--cov-fail-under=80` do in pytest?", ["Limits test execution to 80 seconds", "Runs only 80% of available tests", "Fails the pipeline if test coverage is below 80%", "Requires 80 passing tests to succeed"], 2, "This flag makes pytest exit with a non-zero code if measured code coverage falls below 80%."),
            ("Why are end-to-end tests at the TOP (fewest) of the testing pyramid?", ["They are less important than unit tests", "They take longer to write and run, so you should have fewer of them", "They only work on production servers", "They are only used for security testing"], 1, "E2E tests are valuable but expensive — they spin up real browsers or services, take minutes to run, and can be flaky.")
        ],
        "takeaways": ["The testing pyramid: many fast unit tests → fewer integration tests → very few E2E tests", "Quality gates enforce minimum standards: coverage, no security vulnerabilities, no lint errors", "A failing test MUST stop the pipeline — otherwise tests are useless", "Linters (flake8, ESLint) and type checkers (mypy, TypeScript) catch issues before runtime", "Security dependency scanning should be a standard pipeline step"],
        "next": "Lesson 9 introduces Docker — the revolutionary packaging technology that creates immutable, portable application containers."
    },
    9: {
        "explanation": 'Before Docker, deploying was painful. The app worked on the developer\'s MacBook, but crashed on the Ubuntu production server — different Python version, different system libraries.\n\n"It works on my machine!" — the most famous phrase in software development.\n\nDocker solves this by packaging the application **together with everything it needs to run**: the runtime, system libraries, configuration, and code. This bundle is called a **Docker image**.\n\nWhen you run an image, you get a **container** — an isolated, reproducible environment that behaves identically on a developer\'s Mac, a CI runner, a staging server, or a production cloud server.',
        "analogy": "Imagine a premium meal kit service (like HelloFresh):\n\n- **Docker image** = The sealed meal kit box with all ingredients and cooking card\n- **Docker container** = The actual meal being prepared from the kit\n- **Dockerfile** = The packaging instructions that specify what goes in the box\n- **Docker Hub / ECR** = The warehouse where thousands of meal kits are stored\n- **Image tag** = The version label: \"Burger Kit v2.3\" vs \"Burger Kit v2.4\"\n- **Base image** = Starting with a standard box design (FROM python:3.11-slim)\n\nThe same sealed box produces the same meal in Tokyo, London, or Mumbai.",
        "code": """# Dockerfile — multi-stage for smaller, more secure images
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.11-slim AS runtime
# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser
WORKDIR /app
COPY --from=builder /install /usr/local
COPY src/ .
USER appuser
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \\
  CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Build and run:
# docker build -t food-order-api:v1.0 .
# docker run -p 8000:8000 food-order-api:v1.0""",
        "quiz": [
            ("What is the difference between a Docker image and a Docker container?", ["They are the same thing", "An image is a running instance; a container is a static file", "An image is a packaged, static blueprint; a container is a running instance", "Images are in Docker Hub; containers are in ECR"], 2, "A Docker image is a static, immutable blueprint. A container is a running instance of that image. You can run many containers from one image."),
            ("Why should you NEVER use `:latest` as your only image tag in production?", ["`:latest` is reserved for official images", "Without a specific version tag, you cannot trace which code version is running or rollback reliably", "`:latest` images are automatically deleted after 30 days", "Using `:latest` causes security vulnerabilities"], 1, "If all deployments use `:latest`, you cannot tell which code is running in production, and rollback means rebuilding. Version tags like commit hashes make every deployment traceable."),
            ("What is Amazon ECR?", ["A tool for writing Dockerfiles", "A private container registry for storing Docker images, integrated with AWS", "A testing framework for containerized applications", "Amazon's alternative to Docker"], 1, "Amazon Elastic Container Registry (ECR) is a private Docker image registry on AWS, storing images and integrating with ECS and other AWS services.")
        ],
        "takeaways": ["Docker packages your application with everything it needs — same behavior everywhere", "A Dockerfile is the recipe; a Docker image is the sealed package; a container is the running instance", "Use multi-stage Dockerfiles to keep final images small and secure", "Always run containers as non-root; never hardcode credentials inside images", "Use versioned image tags (commit hashes) — never deploy production with only `:latest`"],
        "next": "Lesson 10 surveys the major CI/CD tools — GitHub Actions, Jenkins, GitLab CI/CD, and AWS CodePipeline. You'll learn how to choose the right tool and see how the same pipeline concepts apply across all of them."
    },
    10: {
        "explanation": "There are dozens of CI/CD tools, but four dominate the industry:\n\n**GitHub Actions** — Built into GitHub. Zero setup if your code is already on GitHub. Thousands of pre-built actions. Free tier for public repos. Best choice for new projects.\n\n**Jenkins** — The veteran. Open-source, self-hosted. Extremely flexible via plugins. Requires more setup and maintenance. Common in large enterprises.\n\n**GitLab CI/CD** — Built into GitLab. Similar to GitHub Actions with a unified DevOps platform. Strong container registry integration.\n\n**AWS CodePipeline** — Native AWS service. Integrates deeply with all AWS tools. Best when your entire infrastructure is AWS.",
        "analogy": "Different restaurants have different order management systems:\n\n- **GitHub Actions** = The restaurant's built-in point-of-sale system — comes included, easy to use\n- **Jenkins** = A fully customisable kitchen management system — requires setup but extremely flexible\n- **GitLab CI** = An integrated restaurant management platform (orders, inventory, scheduling)\n- **AWS CodePipeline** = A delivery system built specifically for Amazon restaurants",
        "code": """# The SAME pipeline in three different tools:

# GitHub Actions (.github/workflows/ci.yml)
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: pytest tests/

# ─────────────────────────────────────────────

# GitLab CI (.gitlab-ci.yml)
# test-job:
#   image: python:3.11
#   script:
#     - pip install -r requirements.txt
#     - pytest tests/

# ─────────────────────────────────────────────

# Jenkins (Jenkinsfile)
# pipeline {
#   agent { docker { image 'python:3.11' } }
#   stages {
#     stage('Test') {
#       steps {
#         sh 'pip install -r requirements.txt'
#         sh 'pytest tests/'
#       }
#     }
#   }
# }
# Notice: all three do the SAME THING. Concepts transfer.""",
        "quiz": [
            ("Your team uses GitHub and wants the simplest CI/CD setup. Which tool is best?", ["Jenkins — it has the most plugins", "AWS CodePipeline — it scales infinitely", "GitHub Actions — it is built into GitHub with no additional setup", "A custom bash script"], 2, "GitHub Actions is built into GitHub, requires zero additional setup, and has thousands of pre-built actions."),
            ("What indentation style does YAML require?", ["Tabs only", "Either tabs or spaces", "Spaces only (tabs cause errors)", "No indentation required"], 2, "YAML requires spaces for indentation — tabs are not allowed and will cause parse errors."),
            ("A company's security policy requires code never leaves their network. What runner type do they need?", ["GitHub-hosted runners", "Self-hosted runners on their own private servers", "AWS Lambda functions", "Docker Hub runners"], 1, "Self-hosted runners install the CI agent on machines the company controls. Code never leaves the private network.")
        ],
        "takeaways": ["GitHub Actions (easiest), Jenkins (most flexible), GitLab CI (unified platform), AWS CodePipeline (AWS-native)", "YAML is the configuration language for most CI/CD tools — use spaces, not tabs", "Pipeline concepts (stages, jobs, triggers, artifacts) are the same across all tools", "Hosted runners = zero infra management; self-hosted = control and privacy", "Choose your tool based on where your code lives and what infrastructure you use"],
        "next": "Module 3 begins! Lesson 11 deep-dives into pipeline triggers and webhooks — the event-driven mechanism that starts your pipeline automatically."
    },
    11: {
        "explanation": "A **trigger** is the event that starts a pipeline. Without a trigger, pipelines just sit idle. Triggers make automation event-driven.\n\n**Types of triggers:**\n\n**Push trigger** — Fires when code is pushed to a branch. Most common.\n\n**Pull Request trigger** — Fires when a PR is opened, updated, or merged.\n\n**Branch filter** — Restricts which branches trigger the pipeline.\n\n**Scheduled trigger (cron)** — Runs on a schedule. Used for nightly builds and dependency scans.\n\n**Manual trigger** — A human clicks 'Run'. Used for intentional production deployments.\n\n**API/Webhook trigger** — An external system calls your pipeline.",
        "analogy": "A modern restaurant uses a digital ordering system. When a customer submits an order:\n\n1. The order management system **fires a notification** (the webhook)\n2. The kitchen display screen **receives the notification** instantly\n3. The relevant kitchen station **starts preparing** immediately\n\nThe kitchen doesn't POLL ('is there an order?') — it LISTENS and REACTS.\n\nThis is exactly how webhooks work: GitHub doesn't wait for your CI to ask 'is there new code?' — GitHub sends an HTTP notification the moment a push happens.",
        "code": """name: Complete Trigger Examples

on:
  # Trigger 1: Push to specific branches
  push:
    branches:
      - main
      - 'release/**'    # Matches release/1.0, release/2.0
    paths:
      - 'src/**'        # Only trigger if src/ changed
    paths-ignore:
      - 'docs/**'       # Don't trigger for doc-only changes

  # Trigger 2: Pull request events
  pull_request:
    branches: [ main ]
    types: [opened, synchronize, reopened]

  # Trigger 3: Scheduled run (every day at 2 AM UTC)
  schedule:
    - cron: '0 2 * * *'

  # Trigger 4: Manual trigger
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deploy to which environment?'
        required: true
        default: 'staging'
        type: choice
        options: [staging, production]""",
        "quiz": [
            ("You want CI to run only when files in `src/` change. What do you configure?", ["A cron schedule for every hour", "Path filters: `paths: ['src/**']` in the trigger configuration", "A manual workflow_dispatch trigger", "A branch filter for the docs branch"], 1, "Path filters restrict the trigger to only fire when specified paths are affected by the push."),
            ("What is a webhook?", ["A type of CI runner that supports web applications", "An HTTP request sent by GitHub to your CI system to notify it of an event", "A type of YAML configuration for scheduled pipelines", "A security mechanism for encrypting pipeline logs"], 1, "A webhook is an HTTP POST request GitHub sends to a configured URL when an event occurs."),
            ("When should you use a scheduled trigger?", ["For every code push — scheduled is more reliable", "Only for manual deployments", "For time-based tasks like nightly builds, dependency scans, or database backups", "When you want the pipeline to run continuously"], 2, "Scheduled (cron) triggers are for time-based automation — nightly security scans, daily dependency update checks.")
        ],
        "takeaways": ["Triggers make pipelines event-driven: push, PR, scheduled, manual, and API triggers", "Branch and path filters prevent unnecessary pipeline runs", "Webhooks are HTTP notifications from GitHub to your CI system", "Always verify webhook signatures to prevent malicious pipeline triggers", "Use `workflow_dispatch` for manual production deployments that require intentional human action"],
        "next": "Lesson 12 covers one of the most critical security topics: environment configuration and secrets management. You'll learn how to safely handle API keys, passwords, and tokens."
    },
    12: {
        "explanation": "An **environment variable** is a named value stored outside your application code that your application reads at runtime.\n\nExamples:\n- `DATABASE_URL=postgresql://user:pass@localhost:5432/mydb`\n- `AWS_REGION=us-east-1`\n- `STRIPE_API_KEY=sk_live_abcdef...`\n\n**Why not hardcode these in your code?**\n\n1. **Security:** API keys in code get committed to Git. A key committed even once can be found by scanning tools — even after you delete it.\n2. **Flexibility:** The same code runs in dev, staging, and production with different configs.\n3. **Collaboration:** Different developers have different database credentials.",
        "analogy": "Restaurant security maps to secret management:\n\n- **Safe storing the daily cash combination** = GitHub Actions Secrets / AWS Secrets Manager\n- **Each employee has their own key card** = Per-user IAM credentials with limited access\n- **The recipe printed in the menu (bad!)** = Hardcoding API keys in source code (catastrophic!)\n- **Manager approval required for the safe** = IAM role requires specific condition to assume\n- **Temporary staff get temporary access** = OIDC short-lived tokens that expire in minutes",
        "code": """# Step 1: Add secrets in GitHub UI:
# Repository → Settings → Secrets and variables → Actions → New repository secret

# Step 2: Reference secrets in your workflow
name: Deploy with Secrets

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # Secrets are injected as environment variables
      # GitHub NEVER prints them in logs (they appear as ***)
      - name: Connect to database
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: python scripts/check_db.py

      # BEST PRACTICE: Use OIDC — no AWS keys stored!
      - name: Configure AWS credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
          aws-region: us-east-1

      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster production \\
            --service food-order-api \\
            --force-new-deployment""",
        "quiz": [
            ("A developer hardcodes `API_KEY=sk_live_abc123` in Python and pushes to GitHub. What is the risk?", ["The code will not compile", "Automated bots scan GitHub for secrets and can steal the key within minutes", "GitHub will automatically delete the repository", "The key will stop working after 24 hours"], 1, "Automated scanners continuously monitor GitHub for known secret formats. An exposed key can be discovered and used within minutes of a push."),
            ("What is the advantage of OIDC over storing AWS access keys?", ["OIDC is faster", "OIDC never expires", "OIDC eliminates the need for long-lived static credentials — tokens are temporary and scoped", "OIDC does not require an IAM role"], 2, "OIDC allows GitHub Actions to obtain short-lived AWS credentials that expire within minutes, eliminating long-lived access keys."),
            ("What happens if a step accidentally prints a secret using echo?", ["The pipeline fails immediately", "GitHub masks the secret value in the logs, displaying *** instead", "The secret is permanently revealed", "Nothing — GitHub does not protect secrets in echo statements"], 1, "GitHub Actions automatically detects secret values in log output and replaces them with ***.")
        ],
        "takeaways": ["Environment variables store configuration outside code — the application reads them at runtime", "NEVER hardcode secrets in source code — Git history is permanent and secret-scanning bots are real", "Use GitHub Actions Secrets for simple credential storage in CI/CD workflows", "OIDC (OpenID Connect) eliminates the need for stored AWS credentials entirely — the gold standard", "Different environments should have separate secrets with least-privilege access"],
        "next": "Lesson 13 covers Deployment Fundamentals — what it actually means to deploy software, how servers receive new versions, health checks, and how to verify that your deployment succeeded."
    },
    13: {
        "explanation": "**Deployment** is the process of making a new version of your application available and running so users can access it.\n\nDeployment involves:\n1. **Pulling the artifact** — downloading the Docker image from the registry\n2. **Stopping the old version** — gracefully shutting down the running application\n3. **Starting the new version** — launching the new version and waiting for it to become ready\n4. **Health checking** — automatically verifying the new version responds correctly\n5. **Routing traffic** — directing user requests to the new version\n6. **Cleanup** — removing the old version (or keeping it for rollback)\n\nA failed deployment should AUTOMATICALLY roll back to the previous version.",
        "analogy": "The dispatch-to-delivery process mirrors software deployment:\n\n**Dispatch (deployment start):** The packaged order is assigned to a driver. The driver picks up the order (pulls the artifact).\n\n**Delivery confirmation (health check):** The driver rings the doorbell (sends a health check request). The customer opens the door (the application responds with HTTP 200 OK).\n\n**Failure handling (rollback):** If no one answers after 3 attempts (health check fails), the driver returns and the order is replaced. The customer receives the previous order while the issue is investigated.",
        "code": """# Health check endpoint in FastAPI
from fastapi import FastAPI
import os
from datetime import datetime

app = FastAPI()

@app.get("/health")
async def health_check():
    \"\"\"CI/CD and load balancers call this to verify the app is healthy.\"\"\"
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": os.getenv("APP_VERSION", "unknown"),
        "environment": os.getenv("ENVIRONMENT", "unknown")
    }

@app.get("/ready")
async def readiness_check():
    \"\"\"Readiness check — verifies app can serve traffic.\"\"\"
    try:
        # Check database connection here
        return {"status": "ready", "database": "connected"}
    except Exception as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=503, detail=f"Not ready: {str(e)}")

# In CI pipeline, verify health after deployment:
# for i in 1 2 3 4 5; do
#   status=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL/health)
#   [ "$status" == "200" ] && echo "Health check passed!" && exit 0
#   sleep 15
# done
# echo "Health check FAILED — triggering rollback"
# exit 1""",
        "quiz": [
            ("What is the purpose of a health check endpoint `/health`?", ["To display application documentation", "To allow CI/CD systems and load balancers to verify the application is running correctly", "To check the developer's computer health", "To run database migrations"], 1, "The /health endpoint returns HTTP 200 when the application is healthy. CI/CD pipelines, load balancers, and container orchestrators call this endpoint."),
            ("What should happen if a health check fails after deployment?", ["Send an email and wait", "Keep the new version running and monitor more closely", "Automatically rollback to the previous working version", "Restart the health check from scratch"], 2, "A failed health check after deployment means the new version is broken. The pipeline should automatically rollback to restore service."),
            ("What does `aws ecs wait services-stable` do?", ["Creates a new ECS cluster", "Blocks the pipeline until ECS confirms all tasks are healthy", "Deletes old ECS tasks immediately", "Checks if the ECS service has enough memory"], 1, "`aws ecs wait services-stable` polls ECS until the service has reached a stable state — all running tasks are healthy.")
        ],
        "takeaways": ["Deployment: pull artifact → stop old version → start new version → health check → route traffic", "Health check endpoints (/health, /ready) are essential for CI/CD and load balancers", "Always implement automatic rollback when a health check fails after deployment", "Use liveness checks (is the app alive?) and readiness checks (can it serve traffic?) separately", "Never report a deployment as successful until health checks pass"],
        "next": "Lesson 14 takes you into AWS — EC2, ECS, ECR, IAM, and load balancers. You'll learn how Docker images travel from your pipeline to running on AWS infrastructure."
    },
    14: {
        "explanation": "AWS (Amazon Web Services) is the world's largest cloud platform. For CI/CD and deployment:\n\n**EC2 (Elastic Compute Cloud)** — Virtual servers in the cloud. Rent by the hour.\n\n**ECS (Elastic Container Service)** — Managed service that runs Docker containers at scale. Tell ECS 'run this image with 2 copies' and it handles scheduling, health checks, and restarts.\n\n**ECR (Elastic Container Registry)** — Private Docker image registry on AWS.\n\n**IAM (Identity and Access Management)** — Controls who and what can access AWS resources.\n\n**ALB (Application Load Balancer)** — Distributes user traffic across multiple running containers.\n\n**S3 (Simple Storage Service)** — Object storage for artifacts, logs, and backups.",
        "analogy": "AWS services map to restaurant infrastructure:\n\n- **VPC** = The restaurant building (your private network)\n- **ALB** = The front door open to customers\n- **ECS** = Kitchen where food is prepared (containers)\n- **ECR** = Pantry/storage for ingredients (Docker images)\n- **IAM** = Staff ID cards and access levels\n- **Route 53** = Restaurant address on Google Maps\n- **Auto Scaling** = Ability to handle the dinner rush",
        "code": """# GitHub Actions: Build and Deploy to AWS ECS
name: Deploy to AWS ECS

on:
  push:
    branches: [ main ]

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: food-order-api
  ECS_CLUSTER: production-cluster
  ECS_SERVICE: food-order-api-service

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/GitHubActionsRole
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push image
        env:
          REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          TAG: ${{ github.sha }}
        run: |
          docker build -t $REGISTRY/$ECR_REPOSITORY:$TAG .
          docker push $REGISTRY/$ECR_REPOSITORY:$TAG

      - name: Update ECS service
        run: |
          aws ecs update-service \\
            --cluster $ECS_CLUSTER \\
            --service $ECS_SERVICE \\
            --force-new-deployment
          aws ecs wait services-stable \\
            --cluster $ECS_CLUSTER \\
            --services $ECS_SERVICE""",
        "quiz": [
            ("What is Amazon ECR used for in a CI/CD pipeline?", ["Running serverless functions", "Storing and serving Docker images privately", "Managing DNS for your application", "Running automated tests"], 1, "Amazon ECR (Elastic Container Registry) is a private Docker registry. Your pipeline pushes images to ECR after building, and ECS pulls from ECR when deploying."),
            ("What does a load balancer (ALB) do?", ["Builds Docker images from source code", "Stores application logs", "Distributes incoming user traffic across multiple running containers", "Manages IAM roles and permissions"], 2, "An Application Load Balancer receives all incoming traffic and distributes it across healthy container instances."),
            ("Why is IAM important for CI/CD?", ["It builds Docker images faster", "It controls what your CI/CD pipeline is permitted to do in AWS", "It automatically deploys to production", "It compresses Docker images"], 1, "IAM defines what each identity (including your GitHub Actions role) is allowed to do in AWS. Properly configured roles give your pipeline only the minimum permissions it needs.")
        ],
        "takeaways": ["The AWS flow: GitHub → build image → push to ECR → deploy to ECS → serve via ALB", "ECS manages running containers; ECR stores Docker images; ALB routes traffic to healthy containers", "IAM roles control what your pipeline can do in AWS — always use least-privilege permissions", "Use OIDC (not stored access keys) for GitHub Actions to authenticate with AWS", "Set budget alerts in AWS before creating resources — unexpected bills are common for beginners"],
        "next": "Lesson 15 covers deployment strategies — rolling, blue-green, and canary. You'll learn how to release new versions with zero downtime."
    },
    15: {
        "explanation": "Simply stopping the old version and starting the new one causes **downtime** — users get errors while the new version starts. Deployment strategies solve this by defining HOW you transition from old to new version.\n\n**Rolling Deployment** — Replace instances one at a time. New and old run simultaneously during deployment.\n\n**Blue-Green Deployment** — Run two identical environments. Switch all traffic from Blue (old) to Green (new) at once. Instant rollback by switching back.\n\n**Canary Deployment** — Route a small percentage (e.g., 10%) of traffic to the new version first. Monitor for errors. Gradually increase if healthy.",
        "analogy": "Restaurant menu rollout examples:\n\n**Rolling:** Update menus table by table. Tables 1-3 get the new menu first. If complaints arrive, fix the recipe before updating more tables.\n\n**Blue-Green:** Open a second identical restaurant with the new menu. Route customers from the old (Blue) to the new (Green) location. If Green has problems, all customers instantly return to Blue.\n\n**Canary:** Offer 5% of the most adventurous customers the new experimental menu. After monitoring their reactions, roll it out to everyone.",
        "code": """# Blue-Green deployment with AWS CodeDeploy
# appspec.yml
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: <TASK_DEFINITION>
        LoadBalancerInfo:
          ContainerName: food-order-api
          ContainerPort: 8000

Hooks:
  - BeforeAllowTraffic: CheckHealthBeforeTraffic
  - AfterAllowTraffic: VerifyDeploymentSuccess

# Canary deployment: traffic routing config
# {
#   "trafficRoutingConfig": {
#     "type": "TimeBasedCanary",
#     "timeBasedCanary": {
#       "canaryPercentage": 10,  // Start with 10% of traffic
#       "canaryInterval": 15     // Wait 15 minutes, then 100%
#     }
#   },
#   "autoRollbackConfiguration": {
#     "enabled": true,
#     "events": ["DEPLOYMENT_FAILURE", "DEPLOYMENT_STOP_ON_ALARM"]
#   }
# }""",
        "quiz": [
            ("Which deployment strategy has the fastest rollback time?", ["Rolling deployment", "Canary deployment", "Blue-Green deployment — instantly switch traffic back to the old environment", "Recreate deployment"], 2, "Blue-Green keeps the old environment running while Green receives traffic. Rolling back is instant — just switch the load balancer to route all traffic back to Blue."),
            ("What does '10% canary deployment' mean?", ["10% of the code is deployed", "10% of users are routed to the new version for testing; 90% remain on old version", "The deployment takes 10% less time", "10 containers run the new version"], 1, "A 10% canary routes 10% of user traffic to the new version. If metrics look good, the percentage is gradually increased to 100%."),
            ("Why does blue-green deployment cost more infrastructure?", ["Blue-green uses more CPU per container", "Both the old and new environments must run simultaneously during deployment", "Blue-green needs a separate monitoring system", "Blue-green uses a more expensive load balancer"], 1, "During blue-green deployment, both Blue and Green environments run simultaneously until traffic is shifted, temporarily doubling infrastructure costs.")
        ],
        "takeaways": ["Rolling: gradual replacement with medium rollback speed — best for standard updates", "Blue-Green: two full environments, instant rollback — best for critical systems", "Canary: test on a small percentage of real traffic — best for high-risk features at scale", "All three use load balancer traffic weighting to achieve zero downtime", "Configure automatic rollback triggers based on error rates or health check failures"],
        "next": "Module 4 begins! Lesson 16 teaches you how to diagnose and fix the most common pipeline failures with a practical troubleshooting decision tree."
    },
    16: {
        "explanation": "CI/CD pipelines fail for predictable, categorised reasons:\n\n**Category 1: Build Failures** — Missing dependency, syntax error, wrong language version\n\n**Category 2: Test Failures** — Actual bug introduced, flaky test, hardcoded test data changed\n\n**Category 3: Authentication Failures** — Expired GitHub secret, IAM permission missing, ECR token expired\n\n**Category 4: Deployment Failures** — Docker image not found, ECS task insufficient memory, health check fails\n\n**Category 5: Infrastructure Failures** — GitHub runner degraded, AWS service outage, rate limiting",
        "analogy": "Restaurant problems map to pipeline failures:\n\n- **Kitchen ran out of an ingredient** = Missing package in requirements.txt → add the package\n- **Recipe card has a typo** = YAML syntax error → fix YAML indentation\n- **Staff member has no access to pantry** = IAM permission denied → add the permission\n- **Dish description on menu wrong** = Wrong image tag in task definition → verify push succeeded\n- **Manager texted when order is ready** = Slack notification on pipeline status → configure Slack Action",
        "code": """# Common errors and fixes:

# ERROR 1: Missing dependency
# ModuleNotFoundError: No module named 'fastapi'
# Fix: Add fastapi to requirements.txt

# ERROR 2: YAML syntax error
# Error: mapping values are not allowed in this context
# Fix: Add missing colon: runs-on: ubuntu-latest (not runs-on ubuntu-latest)

# ERROR 3: AWS permission denied
# An error occurred (AccessDenied) when calling DescribeTaskDefinition
# Fix: Add ecs:DescribeTaskDefinition to the IAM role policy

# ERROR 4: Docker image not found
# CannotPullContainerError: repository does not exist or requires authentication
# Fix: Verify the image was successfully pushed to ECR in the build job

# Pipeline with notifications
name: Pipeline with Notifications

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pytest tests/ -v

      - name: Notify success
        if: success()
        run: echo "Tests passed! Notifying team..."

      - name: Notify failure
        if: failure()
        run: |
          echo "Pipeline FAILED on ${{ github.ref_name }}"
          echo "Actor: ${{ github.actor }}"
          echo "Commit: ${{ github.sha }}"
          # curl -X POST ${{ secrets.SLACK_WEBHOOK }} -d '{"text": "❌ Pipeline Failed!"}'""",
        "quiz": [
            ("A pipeline fails with `ModuleNotFoundError: No module named 'requests'`. What is the fix?", ["Reinstall Python on the CI runner", "Add `requests` to requirements.txt and commit the change", "Change the runner from ubuntu to macos", "Delete the failing test"], 1, "`ModuleNotFoundError` means a package was not installed. In CI, packages are only installed from requirements.txt."),
            ("Your pipeline fails in CI but the same command passes locally. What is most likely?", ["The CI server is faster", "A dependency or environment variable available locally is not configured in CI", "Tests are language-specific", "The branch name has a special character"], 1, '"Works on my machine" usually means a local dependency or env variable is not present in the clean CI environment.'),
            ("What does `if: failure()` do in a GitHub Actions step?", ["Causes the step to always fail", "Runs the step even when a previous step has failed", "Skips the step if any previous step failed", "Retries the step if it fails"], 1, "`if: failure()` runs the step only when a previous step has failed — essential for notification steps.")
        ],
        "takeaways": ["Pipeline failures fall into predictable categories: build, test, auth, deployment, infrastructure", "Always read the exact error message before guessing — it tells you exactly what failed", "Troubleshooting process: read logs → identify stage → check recent changes → reproduce locally", "Use `if: failure()` for notification steps so alerts fire even when the pipeline is broken", "Retry actions handle flaky tests and temporary external service issues"],
        "next": "Lesson 17 covers DevSecOps — integrating security into the CI/CD pipeline."
    },
    17: {
        "explanation": "**DevSecOps** integrates security practices directly into the DevOps pipeline, rather than treating security as a separate phase after development.\n\n**'Shift left'** means moving security checks earlier — to the moment code is written or pushed. A security tool in CI that runs in seconds catches a vulnerability before it reaches production.\n\n**Security scan categories:**\n\n- **Secret Detection** — Catch API keys accidentally committed to code\n- **SAST (Static Application Security Testing)** — Analyse source code for vulnerabilities\n- **Dependency Scanning** — Check third-party packages for known CVEs\n- **Docker Image Scanning** — Check base OS and installed packages in your image\n- **DAST** — Test the running application for vulnerabilities",
        "analogy": "Restaurant food safety maps to DevSecOps:\n\n- **Checking if ingredients are expired** = Dependency vulnerability scanning\n- **Detecting contaminants in storage** = Secret detection (GitLeaks)\n- **Health inspector review of kitchen practices** = SAST (Bandit, Semgrep)\n- **Verifying supplier food safety certificates** = Docker image scanning (Trivy)\n- **Restaurant must pass health inspection before opening** = Branch protection: security must pass before merge\n- **Trusted supplier list only** = Pin action versions; vet third-party actions",
        "code": """name: Security Pipeline

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0   # Full history for secret scanning

      # 1. SECRET DETECTION
      - name: Run GitLeaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # 2. DEPENDENCY VULNERABILITY SCAN
      - uses: actions/setup-python@v4
        with: { python-version: '3.11' }
      - run: pip install pip-audit && pip-audit -r requirements.txt

      # 3. SAST (Static Analysis)
      - name: Run Bandit
        run: pip install bandit && bandit -r src/ -ll -ii

      # 4. DOCKER IMAGE SCANNING
      - name: Build image for scanning
        run: docker build -t scan-image:test .

      - name: Run Trivy
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'scan-image:test'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'  # Fail pipeline on critical CVEs""",
        "quiz": [
            ("What does 'shift left' mean in DevSecOps?", ["Moving CI/CD servers to a different region", "Running security checks earlier — at code commit time rather than before release", "Reducing security tools to save money", "Moving from manual to automated testing"], 1, '"Shift left" means moving security checks to the earliest possible point — ideally when code is pushed. Finding a vulnerability in CI is far cheaper than in production.'),
            ("What does Trivy scan?", ["YAML syntax errors", "Docker images for OS-level and package vulnerabilities", "Git commit history for exposed secrets", "Python code for injection vulnerabilities"], 1, "Trivy (by Aqua Security) is a container vulnerability scanner that scans Docker images and reports known CVEs."),
            ("Why is `actions/checkout@v4.1.1` safer than `actions/checkout@v4`?", ["Specific version is always faster", "The specific version is pinned to an exact release; the tag `v4` could point to different code if updated", "Older versions have better compatibility", "GitHub requires exact version pinning"], 1, "A mutable tag like `@v4` can change its target. If the action's repository is compromised, all workflows using the mutable tag would automatically run malicious code.")
        ],
        "takeaways": ["DevSecOps = security built into the pipeline, not bolted on afterwards", "Four key scan types: secret detection, dependency scan, SAST, Docker image scan", "Branch protection rules enforce that security checks must pass before code reaches main", "Supply chain attacks target build tools and pipelines — not just the application", "Pin action versions to exact tags or SHAs to prevent supply chain compromise"],
        "next": "Lesson 18 covers monitoring, rollback, and recovery — what happens after your code is deployed."
    },
    18: {
        "explanation": "Deployment is not the end of the CI/CD cycle — it is the beginning of production responsibility. Monitoring tells you:\n\n- Is the application running?\n- Is it responding correctly?\n- Are errors increasing?\n- Is performance degrading?\n- Did this deployment cause any regression?\n\n**Three pillars of observability:**\n\n**Logs** — Text records of events. Raw but detailed.\n\n**Metrics** — Numerical measurements over time. Request count, error rate, response time. Good for dashboards and alerts.\n\n**Traces** — Follow a single request through all services.",
        "analogy": "A professional delivery service doesn't just dispatch and hope:\n\n**Real-time tracking (monitoring):** The delivery app tracks the driver's GPS and estimated arrival. Equivalent to dashboards showing request rates and error percentages.\n\n**Alerts (anomaly detection):** If a driver is stationary too long, dispatch is alerted. Equivalent to a CloudWatch alarm firing when error rate exceeds 1%.\n\n**Replacement order (rollback):** A new order is dispatched free of charge while the complaint is investigated. Equivalent to automatic rollback to the previous deployment.",
        "code": """# CloudWatch logging in ECS task definition
# "logConfiguration": {
#   "logDriver": "awslogs",
#   "options": {
#     "awslogs-group": "/ecs/food-order-api",
#     "awslogs-region": "us-east-1",
#     "awslogs-stream-prefix": "ecs"
#   }
# }

# Create CloudWatch alarm for error rate
aws cloudwatch put-metric-alarm \\
  --alarm-name "FoodOrderAPI-ErrorRate-High" \\
  --metric-name "5XXError" \\
  --namespace "AWS/ApplicationELB" \\
  --statistic Average \\
  --period 300 \\
  --threshold 0.01 \\
  --comparison-operator GreaterThanThreshold \\
  --evaluation-periods 1 \\
  --alarm-actions "arn:aws:sns:us-east-1:123456789012:deployment-alerts"

# View application logs
aws logs tail /ecs/food-order-api --follow --filter-pattern "ERROR"

# Prometheus metrics in FastAPI
from prometheus_client import Counter, Histogram
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status_code'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')""",
        "quiz": [
            ("What is the difference between logs and metrics?", ["Logs are stored in S3; metrics are in CloudWatch", "Logs are text records of specific events; metrics are numerical measurements aggregated over time", "Logs are for security; metrics are for performance", "They are the same — different names for the same data"], 1, "Logs are textual records of specific events. Metrics are numerical aggregations over time. Both are needed — logs for debugging, metrics for trends and alerting."),
            ("Your error rate jumped to 12% five minutes after a deployment. What should happen?", ["Wait 24 hours to see if it resolves", "Disable monitoring to reduce noise", "Automatic rollback triggers and restores the previous version; the team investigates", "Scale up containers to handle the load"], 2, "A 12% error rate after deployment is a strong signal of a bad release. Immediate rollback restores service while the team investigates."),
            ("What are 'the three pillars of observability'?", ["Builds, tests, deployments", "Logs, metrics, and traces", "Staging, production, monitoring", "GitHub, Docker, AWS"], 1, "The three pillars are Logs (event records), Metrics (numerical measurements), and Traces (request flow through distributed systems).")
        ],
        "takeaways": ["Monitoring completes the CI/CD cycle — deployment without monitoring is flying blind", "Three pillars: logs (events), metrics (numbers over time), traces (request flow)", "CloudWatch alarms + EventBridge + Lambda enables fully automated rollback", "Set meaningful alert thresholds — too sensitive causes noise; too lenient misses real problems", "Post-incident reviews (post-mortems) help teams learn and improve pipeline resilience"],
        "next": "Lesson 19 is the Real-World CI/CD Project — build a complete automated pipeline for a food ordering web application."
    },
    19: {
        "explanation": "This project builds a FastAPI food ordering API and a complete CI/CD pipeline.\n\n**Architecture:**\n- **Application:** FastAPI (Python) REST API\n- **Tests:** pytest with 80%+ coverage\n- **Container:** Multi-stage Dockerfile\n- **Registry:** Amazon ECR\n- **Compute:** Amazon ECS Fargate\n- **Pipeline:** GitHub Actions: Test → Security → Build → Deploy\n- **Monitoring:** CloudWatch logs with SNS alerts\n- **Rollback:** Automatic on health check failure\n\n**Estimated AWS cost:** $15-25/month for minimal setup. Delete resources after the project.",
        "analogy": "Building the complete restaurant automation system:\n\n1. **Design the menu** (write the FastAPI application)\n2. **Write the recipes** (create tests that verify the menu is correct)\n3. **Package the kitchen** (build a Docker container)\n4. **Store in the warehouse** (push to Amazon ECR)\n5. **Open the restaurant** (deploy to AWS ECS)\n6. **Hire health inspectors** (configure CloudWatch monitoring)\n7. **Train the staff** (set up automated rollback)\n8. **Open for business** (verify everything works end-to-end)",
        "code": """# .github/workflows/pipeline.yml
name: Food Order API — Complete Pipeline

on:
  push:
    branches: [ main ]

permissions:
  id-token: write
  contents: read

jobs:
  test:
    name: Test and Quality Checks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4.1.1
      - uses: actions/setup-python@v4.7.0
        with: { python-version: '3.11', cache: 'pip' }
      - run: pip install -r requirements.txt -r requirements-dev.txt
      - run: flake8 src/ tests/
      - run: pytest tests/ -v --cov=src --cov-fail-under=80

  security:
    name: Security Scan
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4.1.1
      - run: pip install pip-audit bandit
      - run: pip-audit -r requirements.txt
      - run: bandit -r src/ -ll -ii

  build:
    name: Build and Push Docker Image
    needs: [test, security]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    outputs:
      image: ${{ steps.push.outputs.image }}
    steps:
      - uses: actions/checkout@v4.1.1
      - uses: aws-actions/configure-aws-credentials@v4.0.2
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/GitHubActionsRole
          aws-region: us-east-1
      - id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2.0.1
      - id: push
        run: |
          docker build -t ${{ steps.login-ecr.outputs.registry }}/food-order-api:${{ github.sha }} .
          docker push ${{ steps.login-ecr.outputs.registry }}/food-order-api:${{ github.sha }}
          echo "image=${{ steps.login-ecr.outputs.registry }}/food-order-api:${{ github.sha }}" >> $GITHUB_OUTPUT

  deploy:
    name: Deploy to Production
    needs: build
    environment: production
    runs-on: ubuntu-latest
    steps:
      - uses: aws-actions/configure-aws-credentials@v4.0.2
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/GitHubActionsRole
          aws-region: us-east-1
      - run: |
          aws ecs update-service --cluster production --service food-order-api-service --force-new-deployment
          aws ecs wait services-stable --cluster production --services food-order-api-service""",
        "quiz": [
            ("In the project pipeline, why does the `build` job have `needs: [test, security]`?", ["To run all jobs in parallel", "To ensure tests AND security scans both pass before building the Docker image", "GitHub requires this syntax", "To save GitHub Actions minutes"], 1, "`needs: [test, security]` means the build job only runs when BOTH the test job AND the security job complete successfully."),
            ("Why are action versions pinned to exact tags in this project?", ["Shorter tags are deprecated", "Exact version pinning prevents supply chain attacks where a mutable tag could be updated to malicious code", "GitHub Actions requires exact pinning", "Pinning improves execution speed"], 1, "Pinning to exact versions is a security best practice. A compromised action repository could push malicious code that all `@v4` users would automatically run."),
            ("What should you do with AWS resources after the learning project?", ["Keep them running — they don't cost anything", "Stop the ECS service and delete ECR images to avoid ongoing costs", "Change the service to a different region", "Scale the service up for better performance"], 1, "AWS charges for ECS tasks even when idle. After the project, set the desired count to 0 or delete the service.")
        ],
        "takeaways": ["A complete pipeline: Test → Security → Build (Docker) → Deploy (ECS), each dependent on the previous", "Pin all action versions to specific semver or SHA for supply chain security", "Use `cov-fail-under` to enforce minimum test coverage as a quality gate", "OIDC + GitHub Actions Secrets is the correct secret management approach", "Always clean up AWS resources after learning projects to avoid unexpected billing"],
        "next": "Lesson 20 is the final lesson — comprehensive recap, interactive quiz, interview questions, production checklist, and recommended next learning paths."
    },
    20: {
        "explanation": "You have completed all 20 lessons! Here is the complete picture:\n\n1. Developer writes code on a feature branch, pushed via Git\n2. GitHub triggers the pipeline via webhook\n3. CI: dependencies installed, code compiled, linting runs\n4. CI: tests run, coverage gate enforced, security scans complete\n5. CI: Docker image built with multi-stage Dockerfile\n6. CI: Image pushed to Amazon ECR with commit SHA tag\n7. CD: Automatically deployed to staging ECS service\n8. CD: Team reviews in staging (or automated approval)\n9. CD: Deployed to production ECS via rolling/blue-green\n10. Verification: Health checks pass, CloudWatch metrics stable\n11. Monitoring: Logs, metrics, traces continuously monitored\n12. Feedback: User feedback informs the next development cycle",
        "analogy": "The complete restaurant analogy from start to finish:\n\n🍔 Customer orders → 👨‍🍳 Chef writes recipe → 📚 Recipe enters shared book → 🏃 Kitchen notified → 🔥 Food prepared → ✅ Quality inspected → 📦 Packaged → 🚗 Dispatched → 🏠 Delivered → 😊 Customer satisfied → ⭐ Feedback improves next order\n\nThis cycle runs thousands of times per day at top technology companies. You now understand every stage of this automated, reliable, and repeatable process.",
        "code": """# Complete CI/CD production checklist verification
echo "=== CI/CD Production Readiness Check ==="

echo "--- Code Quality ---"
flake8 src/ tests/ && echo "✅ Linting passed"
mypy src/ && echo "✅ Type checking passed"
pytest tests/ --cov=src --cov-fail-under=80 && echo "✅ Tests passed with 80%+ coverage"

echo "--- Security ---"
gitleaks detect && echo "✅ No secrets detected"
pip-audit -r requirements.txt && echo "✅ No vulnerable dependencies"
bandit -r src/ -ll && echo "✅ No SAST issues"
trivy image food-order-api:latest --exit-code 1 && echo "✅ No critical container CVEs"

echo "--- Deployment ---"
curl -f https://api.food-order.example.com/health && echo "✅ Health check passing"
curl -f https://api.food-order.example.com/ready && echo "✅ Readiness check passing"

echo "--- Monitoring ---"
aws cloudwatch describe-alarms --state-value OK && echo "✅ All alarms in OK state"

echo "=== All checks passed — production ready! ===" """,
        "quiz": [
            ("A developer pushes code to GitHub. Within seconds, a build starts automatically. What enables this?", ["The developer manually clicks 'Run' in GitHub Actions", "A webhook fires from GitHub to the CI system", "The CI system polls GitHub every 10 seconds", "An AWS Lambda monitors the repository"], 1, "A webhook is an HTTP notification sent by GitHub to the CI system the moment a push occurs."),
            ("What is the key advantage of Docker for application packaging?", ["Docker makes code run faster", "Docker packages the application and all its dependencies into one portable unit that runs identically everywhere", "Docker eliminates the need for testing", "Docker automatically fixes bugs"], 1, "Docker's value is portability and consistency — the exact same image runs identically on any machine."),
            ("Your pipeline deploys successfully but users report the app is broken. What is the first step?", ["Redeploy the same version", "Rollback to the previous version immediately, then investigate logs", "Wait for more users to report", "Increase ECS task memory"], 1, "When users are affected, first priority is restoring service — rollback. Then investigate at a measured pace."),
            ("What is OIDC used for in GitHub Actions AWS deployments?", ["Compressing Docker images", "Authenticating GitHub Actions with AWS without storing any long-lived access keys", "Encrypting pipeline logs", "Running tests in parallel"], 1, "OIDC lets GitHub issue a short-lived signed token that AWS can verify, eliminating the need to store AWS access keys."),
            ("Which deployment strategy provides the FASTEST rollback?", ["Rolling deployment", "Canary deployment", "Blue-Green deployment — instantly flip all traffic back to Blue", "Recreate deployment"], 2, "Blue-Green keeps the old environment running. Rolling back is an instant load balancer configuration change."),
            ("A developer committed an AWS access key to a public GitHub repository. What is the correct response?", ["Delete the file and push a new commit", "Make the repository private", "Immediately rotate the key in AWS IAM, assume it is compromised, check CloudTrail", "Wait to see if anyone reports unusual billing"], 2, "Git history is permanent — deleting the file doesn't remove the secret. The key must be immediately rotated and assumed compromised."),
            ("What does `--cov-fail-under=80` do?", ["Limits test execution time to 80 seconds", "Selects only 80% of tests to run", "Fails the pipeline if test code coverage drops below 80%", "Requires at least 80 test cases"], 2, "This flag makes pytest exit with failure if the measured code coverage is below 80%."),
            ("What is the testing pyramid principle?", ["Run tests on three servers simultaneously", "Have many fast unit tests, fewer integration tests, and very few slow E2E tests", "All tests should be end-to-end", "Unit tests are the least valuable"], 1, "Many fast unit tests at the base, fewer integration tests, and a small number of E2E tests balances coverage, speed, and reliability."),
            ("What is the difference between Continuous Delivery and Continuous Deployment?", ["Delivery is for small teams", "Delivery auto-deploys to staging but requires human approval for production; Deployment deploys automatically", "Delivery uses Docker; Deployment uses VMs", "They are synonyms"], 1, "Continuous Delivery keeps code deployable with human approval for production. Continuous Deployment deploys automatically without any human action."),
            ("What does a `safety check -r requirements.txt` failure mean?", ["The requirements.txt has a syntax error", "One or more Python dependencies has a known security vulnerability (CVE)", "The Python version is incompatible", "The test runner cannot find test files"], 1, "`safety check` compares your dependencies against a CVE database. A failure means one or more packages has a known vulnerability.")
        ],
        "takeaways": ["CI/CD automates the entire software delivery journey: code → build → test → package → deploy → monitor", "The food ordering analogy maps perfectly to every stage of software delivery", "Security is not an afterthought — integrate it into every stage (DevSecOps)", "Monitoring and automatic rollback complete the cycle — deployment is the beginning, not the end", "The tools (GitHub Actions, Docker, AWS) matter less than the principles — they transfer to any platform"],
        "next": "Congratulations on completing the CI/CD Masterclass! Recommended next topics: Kubernetes, Terraform, GitOps, and Observability."
    }
}

for lesson_num, meta in lessons_data.items():
    content = lesson_contents[lesson_num]
    prev_lesson = lesson_num - 1 if lesson_num > 1 else None
    
    quiz_items = []
    for i, (q, opts, correct, expl) in enumerate(content["quiz"]):
        opts_str = ", ".join([f'"{o}"' for o in opts])
        quiz_items.append(f'''        {{
          id: 'l{lesson_num}q{i+1}',
          question: {repr(q)},
          options: [{opts_str}],
          correctIndex: {correct},
          explanation: {repr(expl)}
        }}''')
    
    takeaway_items = ", ".join([repr(t) for t in content["takeaways"]])
    tags_str = ", ".join([f'"{t}"' for t in meta["tags"]])
    joined_quiz = ",\n".join(quiz_items)
    
    ts_content = f'''import {{ Lesson }} from './lessons';

export const lesson{lesson_num}: Lesson = {{
  id: {lesson_num},
  slug: '{meta["slug"]}',
  title: {repr(meta["title"])},
  subtitle: {repr(meta["subtitle"])},
  module: {meta["module"]},
  duration: {repr(meta["duration"])},
  difficulty: {repr(meta["difficulty"])},
  tags: [{tags_str}],
  sections: [
    {{
      type: 'objectives',
      title: 'What You Will Learn',
      items: {repr(list(next(iter([]))  if False else ["See the lesson content for this topic's objectives"]))}
    }},
    {{
      type: 'explanation',
      title: 'Core Concept',
      content: {repr(content["explanation"])}
    }},
    {{
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: {repr(content["analogy"])}
    }},
    {{
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: {repr(content["code"])}
    }},
    {{
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
{joined_quiz}
      ]
    }},
    {{
      type: 'summary',
      title: 'Key Takeaways',
      items: [{takeaway_items}]
    }},
    {{
      type: 'next-preview',
      title: 'Coming Up Next',
      content: {repr(content["next"])}
    }}
  ]
}};
'''
    
    filepath = os.path.join(base, f"lesson{lesson_num}.ts")
    with open(filepath, 'w') as f:
        f.write(ts_content)
    print(f"Written lesson{lesson_num}.ts")

print("All lesson files generated!")
