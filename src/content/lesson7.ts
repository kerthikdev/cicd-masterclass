import { Lesson } from './lessons';

export const lesson7: Lesson = {
  id: 7,
  slug: 'build-automation',
  title: 'Build Automation',
  subtitle: 'Compiling, packaging, and producing deployable artifacts',
  module: 2,
  duration: '25 min',
  difficulty: 'Beginner',
  tags: ["Build", "Dependencies", "Artifacts", "npm", "pip"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'Source code is text that humans write. A **build** is the process of transforming that source code into something computers can actually run.\n\nBuilding involves:\n1. **Download dependencies** — install all external libraries your code needs\n2. **Compile** — convert source code to machine-readable format\n3. **Run pre-build checks** — linting, formatting validation\n4. **Bundle/package** — combine everything into a deployable unit\n5. **Produce an artifact** — the final output file(s) ready to deploy'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'A chef cannot serve raw ingredients to a customer. They must be transformed through a cooking process.\n\n- **Raw ingredients** = Source code (unexecutable text files)\n- **The recipe** = Build script (instructions for transformation)\n- **Fetching missing ingredients** = Installing dependencies\n- **Cooking process** = Compilation or bundling\n- **Quality check during cooking** = Linting and type-checking\n- **The finished dish** = Build artifact (deployable application)'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# Python build steps\npython -m venv venv\nsource venv/bin/activate\n\n# Install dependencies\npip install -r requirements.txt\n\n# Code quality check\nflake8 src/ --max-line-length=120\n\n# Type check\nmypy src/ --ignore-missing-imports\n\n# Run tests\npytest tests/ -v\n\n# ── requirements.txt (pin exact versions for reproducibility)\n# fastapi==0.115.0\n# uvicorn==0.31.0\n# pytest==8.3.3'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l7q1',
          question: "What is a 'build artifact'?",
          options: ["A bug discovered during the build", "The source code before compilation", "The deployable output produced by the build process", "A log file from the CI runner"],
          correctIndex: 2,
          explanation: 'A build artifact is the output of the build process — the file or directory that is actually deployed to servers.'
        },
        {
          id: 'l7q2',
          question: 'Why use `npm ci` instead of `npm install` in CI?',
          options: ["npm ci is faster and installs exact versions from package-lock.json for reproducible builds", "npm install doesn't work in CI", "npm ci skips downloading node_modules", "npm ci automatically fixes conflicts"],
          correctIndex: 0,
          explanation: '`npm ci` deletes node_modules first and installs EXACTLY what is in package-lock.json, ensuring every pipeline run gets identical dependencies.'
        },
        {
          id: 'l7q3',
          question: 'If a build passes locally but fails in CI, what is most likely?',
          options: ["The CI server is broken", "A syntax error only appears on Linux", "A dependency is installed locally but missing from requirements.txt", "The developer has faster internet"],
          correctIndex: 2,
          explanation: 'The "works on my machine" problem usually means a dependency was installed locally but not declared in the dependency file. CI starts fresh, so undeclared dependencies are not available.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['A build transforms source code into a deployable artifact', 'Dependencies must be explicitly declared — not assumed to be installed', 'Use `npm ci` (not `npm install`) for reproducible CI builds with locked dependency versions', 'Build artifacts are immutable and versioned — build once, deploy anywhere', 'Fast feedback from build failures is critical; add caching to keep builds under 5 minutes']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: "Lesson 8 covers the most critical quality gate: Automated Testing. You'll learn about unit, integration, and end-to-end tests, quality gates, and why a failing test must stop a release."
    }
  ]
};
