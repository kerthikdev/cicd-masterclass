import { Lesson } from './lessons';

export const lesson17: Lesson = {
  id: 17,
  slug: 'security-in-cicd-devsecops',
  title: 'Security in CI/CD (DevSecOps)',
  subtitle: 'Shifting security left — building secure pipelines by default',
  module: 4,
  duration: '25 min',
  difficulty: 'Intermediate',
  tags: ["DevSecOps", "SAST", "Dependency Scanning", "Docker Scanning", "Secret Detection"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: "**DevSecOps** integrates security practices directly into the DevOps pipeline, rather than treating security as a separate phase after development.\n\n**'Shift left'** means moving security checks earlier — to the moment code is written or pushed. A security tool in CI that runs in seconds catches a vulnerability before it reaches production.\n\n**Security scan categories:**\n\n- **Secret Detection** — Catch API keys accidentally committed to code\n- **SAST (Static Application Security Testing)** — Analyse source code for vulnerabilities\n- **Dependency Scanning** — Check third-party packages for known CVEs\n- **Docker Image Scanning** — Check base OS and installed packages in your image\n- **DAST** — Test the running application for vulnerabilities"
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'Restaurant food safety maps to DevSecOps:\n\n- **Checking if ingredients are expired** = Dependency vulnerability scanning\n- **Detecting contaminants in storage** = Secret detection (GitLeaks)\n- **Health inspector review of kitchen practices** = SAST (Bandit, Semgrep)\n- **Verifying supplier food safety certificates** = Docker image scanning (Trivy)\n- **Restaurant must pass health inspection before opening** = Branch protection: security must pass before merge\n- **Trusted supplier list only** = Pin action versions; vet third-party actions'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: "name: Security Pipeline\n\non: [push, pull_request]\n\njobs:\n  security-scan:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n        with:\n          fetch-depth: 0   # Full history for secret scanning\n\n      # 1. SECRET DETECTION\n      - name: Run GitLeaks\n        uses: gitleaks/gitleaks-action@v2\n        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n\n      # 2. DEPENDENCY VULNERABILITY SCAN\n      - uses: actions/setup-python@v4\n        with: { python-version: '3.11' }\n      - run: pip install pip-audit && pip-audit -r requirements.txt\n\n      # 3. SAST (Static Analysis)\n      - name: Run Bandit\n        run: pip install bandit && bandit -r src/ -ll -ii\n\n      # 4. DOCKER IMAGE SCANNING\n      - name: Build image for scanning\n        run: docker build -t scan-image:test .\n\n      - name: Run Trivy\n        uses: aquasecurity/trivy-action@master\n        with:\n          image-ref: 'scan-image:test'\n          severity: 'CRITICAL,HIGH'\n          exit-code: '1'  # Fail pipeline on critical CVEs"
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l17q1',
          question: "What does 'shift left' mean in DevSecOps?",
          options: ["Moving CI/CD servers to a different region", "Running security checks earlier — at code commit time rather than before release", "Reducing security tools to save money", "Moving from manual to automated testing"],
          correctIndex: 1,
          explanation: '"Shift left" means moving security checks to the earliest possible point — ideally when code is pushed. Finding a vulnerability in CI is far cheaper than in production.'
        },
        {
          id: 'l17q2',
          question: 'What does Trivy scan?',
          options: ["YAML syntax errors", "Docker images for OS-level and package vulnerabilities", "Git commit history for exposed secrets", "Python code for injection vulnerabilities"],
          correctIndex: 1,
          explanation: 'Trivy (by Aqua Security) is a container vulnerability scanner that scans Docker images and reports known CVEs.'
        },
        {
          id: 'l17q3',
          question: 'Why is `actions/checkout@v4.1.1` safer than `actions/checkout@v4`?',
          options: ["Specific version is always faster", "The specific version is pinned to an exact release; the tag `v4` could point to different code if updated", "Older versions have better compatibility", "GitHub requires exact version pinning"],
          correctIndex: 1,
          explanation: "A mutable tag like `@v4` can change its target. If the action's repository is compromised, all workflows using the mutable tag would automatically run malicious code."
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['DevSecOps = security built into the pipeline, not bolted on afterwards', 'Four key scan types: secret detection, dependency scan, SAST, Docker image scan', 'Branch protection rules enforce that security checks must pass before code reaches main', 'Supply chain attacks target build tools and pipelines — not just the application', 'Pin action versions to exact tags or SHAs to prevent supply chain compromise']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Lesson 18 covers monitoring, rollback, and recovery — what happens after your code is deployed.'
    }
  ]
};
