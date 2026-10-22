import { Lesson } from './lessons';

export const lesson9: Lesson = {
  id: 9,
  slug: 'artifacts-and-container-images',
  title: 'Artifacts and Container Images',
  subtitle: 'From source code to sealed, portable Docker packages',
  module: 2,
  duration: '30 min',
  difficulty: 'Intermediate',
  tags: ["Docker", "Containers", "ECR", "Artifacts", "Images"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'Before Docker, deploying was painful. The app worked on the developer\'s MacBook, but crashed on the Ubuntu production server — different Python version, different system libraries.\n\n"It works on my machine!" — the most famous phrase in software development.\n\nDocker solves this by packaging the application **together with everything it needs to run**: the runtime, system libraries, configuration, and code. This bundle is called a **Docker image**.\n\nWhen you run an image, you get a **container** — an isolated, reproducible environment that behaves identically on a developer\'s Mac, a CI runner, a staging server, or a production cloud server.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'Imagine a premium meal kit service (like HelloFresh):\n\n- **Docker image** = The sealed meal kit box with all ingredients and cooking card\n- **Docker container** = The actual meal being prepared from the kit\n- **Dockerfile** = The packaging instructions that specify what goes in the box\n- **Docker Hub / ECR** = The warehouse where thousands of meal kits are stored\n- **Image tag** = The version label: "Burger Kit v2.3" vs "Burger Kit v2.4"\n- **Base image** = Starting with a standard box design (FROM python:3.11-slim)\n\nThe same sealed box produces the same meal in Tokyo, London, or Mumbai.'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# Dockerfile — multi-stage for smaller, more secure images\nFROM python:3.11-slim AS builder\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir --prefix=/install -r requirements.txt\n\nFROM python:3.11-slim AS runtime\n# Create non-root user for security\nRUN groupadd -r appuser && useradd -r -g appuser appuser\nWORKDIR /app\nCOPY --from=builder /install /usr/local\nCOPY src/ .\nUSER appuser\nEXPOSE 8000\nHEALTHCHECK --interval=30s --timeout=10s --retries=3 \\\n  CMD curl -f http://localhost:8000/health || exit 1\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]\n\n# Build and run:\n# docker build -t food-order-api:v1.0 .\n# docker run -p 8000:8000 food-order-api:v1.0'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l9q1',
          question: 'What is the difference between a Docker image and a Docker container?',
          options: ["They are the same thing", "An image is a running instance; a container is a static file", "An image is a packaged, static blueprint; a container is a running instance", "Images are in Docker Hub; containers are in ECR"],
          correctIndex: 2,
          explanation: 'A Docker image is a static, immutable blueprint. A container is a running instance of that image. You can run many containers from one image.'
        },
        {
          id: 'l9q2',
          question: 'Why should you NEVER use `:latest` as your only image tag in production?',
          options: ["`:latest` is reserved for official images", "Without a specific version tag, you cannot trace which code version is running or rollback reliably", "`:latest` images are automatically deleted after 30 days", "Using `:latest` causes security vulnerabilities"],
          correctIndex: 1,
          explanation: 'If all deployments use `:latest`, you cannot tell which code is running in production, and rollback means rebuilding. Version tags like commit hashes make every deployment traceable.'
        },
        {
          id: 'l9q3',
          question: 'What is Amazon ECR?',
          options: ["A tool for writing Dockerfiles", "A private container registry for storing Docker images, integrated with AWS", "A testing framework for containerized applications", "Amazon's alternative to Docker"],
          correctIndex: 1,
          explanation: 'Amazon Elastic Container Registry (ECR) is a private Docker image registry on AWS, storing images and integrating with ECS and other AWS services.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['Docker packages your application with everything it needs — same behavior everywhere', 'A Dockerfile is the recipe; a Docker image is the sealed package; a container is the running instance', 'Use multi-stage Dockerfiles to keep final images small and secure', 'Always run containers as non-root; never hardcode credentials inside images', 'Use versioned image tags (commit hashes) — never deploy production with only `:latest`']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: "Lesson 10 surveys the major CI/CD tools — GitHub Actions, Jenkins, GitLab CI/CD, and AWS CodePipeline. You'll learn how to choose the right tool and see how the same pipeline concepts apply across all of them."
    }
  ]
};
