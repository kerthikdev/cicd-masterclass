# CI/CD Masterclass: From Manual Software Delivery to Full Automation 🚀

A modern, interactive, comprehensive educational web application and 20-slide presentation deck teaching **Continuous Integration and Continuous Delivery/Deployment (CI/CD)** and **GitHub Actions** from zero to production cloud pipelines.

Built with a consistent, intuitive real-world analogy throughout: **The Food Ordering and Delivery System 🍔**.

---

## 👨‍💻 Instructor & Creator
- **Instructor**: **Kerthik**
- **Current Position**: Project Manager at **TNQ**
- **Background**: Ex-DevOps Engineer at **SentinelFox**
- **Venture**: Building **OrivianLabs** (*DevOps, Cloud Systems & Production Engineering*)

---

## 📚 Curriculum Overview (20 Lessons & Slides)

1. **Slide 1 — Introduction to CI/CD**: From Manual Work to Automated Software Delivery
2. **Slide 2 — What Happens Before CI/CD?**: Traditional Software Development & The Manual Era
3. **Slide 3 — Who Introduced CI/CD?**: The History and Evolution of CI/CD (1990s XP to Modern Cloud)
4. **Slide 4 — What Changed After CI/CD?**: From Manual Releases to Automated Delivery (Comparison Matrix)
5. **Slide 5 — What Is CI/CD?**: Understanding CI, Continuous Delivery, and Continuous Deployment
6. **Slide 6 — What Is Git?**: Tracking Every Change in Code & Essential CLI Workflows
7. **Slide 7 — What Is GitHub?**: A Central Place for Code, Collaboration & Pull Requests
8. **Slide 8 — What Tools Are Used for CI/CD?**: The CI/CD Tool Ecosystem Matrix
9. **Slide 9 — Why Choose GitHub Actions?**: 6 Strategic Reasons for Modern Teams
10. **Slide 10 — What Is GitHub Actions?**: The Automation Engine (Events, Runners, Workflows, Jobs, Steps)
11. **Slide 11 — How Does GitHub Actions Work?**: From Code Push to Automated Execution
12. **Slide 12 — Understanding the Workflow File**: Line-by-Line Breakdown of `.github/workflows/ci.yml`
13. **Slide 13 — What Happens When We Push Code?**: The Complete CI Pipeline & Test Gate Scenarios
14. **Slide 14 — The Four Major Stages of Delivery**: Build, Test, Package, and Deploy
15. **Slide 15 — Docker and Container Images**: How Do We Package Our Application?
16. **Slide 16 — Deploying to AWS**: From GitHub Actions to Amazon ECR and Amazon ECS
17. **Slide 17 — Security and Approval in CI/CD**: Automate Safely, Not Just Quickly (DevSecOps)
18. **Slide 18 — What Happens When a Pipeline Fails?**: Failure Handling, Monitoring, and Rollback
19. **Slide 19 — Real-World Project**: Automated Food Ordering Application (End-to-End Pipeline)
20. **Slide 20 — Final Summary**: One Code Push, Automated Delivery (From Beginner to Practitioner)

---

## 🍔 The Food Ordering Analogy

| Software Lifecycle Stage | Food Ordering Equivalent 🍔 |
| :--- | :--- |
| **Developer pushes code (`git push`)** | Customer places an order on the delivery app |
| **GitHub Webhook Trigger** | Kitchen display receives digital ticket |
| **CI Build & Dependency Install** | Washing ingredients & preheating kitchen ovens |
| **Automated Unit & Integration Tests** | Sous-chef taste-testing food before plating |
| **Docker Container Packaging** | Sealing hot food in a standardized bento box |
| **Continuous Delivery (CDel) Gate** | Shift manager approving dispatch at counter |
| **Continuous Deployment (CDep)** | Autonomous delivery drone dispatching instantly |
| **AWS Cloud ECS Deployment** | Delivery rider delivering food to customer door (200 OK) |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Presentation Deck**: Full-screen 16:9 keynote engine with keyboard navigation (`F`, `Space`, `←`, `→`)
- **Deck Generator**: Python script (`scripts/create_presentation.py`) generating native PowerPoint (`.pptx`)
- **Code & Pipelines**: GitHub Actions workflow (`.github/workflows/*.yml`), Dockerfile, AWS ECR/ECS architecture

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/kerthikdev/cicd-masterclass.git
cd cicd-masterclass
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Regenerate PowerPoint Presentation (.pptx)
```bash
python3 scripts/create_presentation.py
```
Outputs `CICD_Masterclass_20_Slides.pptx` in the root and `public/` directories.

---

## 📄 License
MIT License. Created by Kerthik.
