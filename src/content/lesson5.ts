import { Lesson } from './lessons';

export const lesson5: Lesson = {
  id: 5, slug: 'git-and-github', title: 'Git and GitHub',
  subtitle: 'The version control foundation that makes CI/CD possible',
  module: 2, duration: '30 min', difficulty: 'Beginner',
  tags: ['Git', 'GitHub', 'Version Control', 'Branching'],
  sections: [
    { type: 'objectives', title: 'What You Will Learn', items: ['The difference between Git and GitHub','Core concepts: repository, commit, branch, merge, pull request','Essential Git commands every developer uses daily','How pushing code to GitHub triggers a CI/CD pipeline','How the food analogy maps to version control'] },
    { type: 'explanation', title: 'Git vs GitHub — Two Different Things', content: "**Git** is a tool installed on your computer. It tracks every change to every file in your project — a detailed history log that lets you undo any change, see who changed what, and work on multiple versions simultaneously.\n\n**GitHub** is a website (github.com) where you store your Git repository online. All team members push their code here. GitHub also provides: pull requests, code review, issue tracking, and CI/CD via GitHub Actions.\n\nThe relationship: Git is the engine; GitHub is the garage where you park and share your engine.\n\nOther platforms similar to GitHub: GitLab, Bitbucket, Azure DevOps." },
    { type: 'analogy', title: '🍔 Order History and Menu Changes', content: "Think of Git/GitHub as the restaurant's recipe management system:\n\n- **Repository** = The complete recipe book for the entire restaurant\n- **Commit** = \"Chef Sarah updated the burger recipe at 2:30 PM\" (a saved, timestamped change)\n- **Branch** = A private test copy of the recipe book where a chef tries new ideas\n- **Merge** = The approved new recipe is added to the official recipe book\n- **Pull Request** = Chef submits their recipe for the head chef to review\n- **Clone** = Each chef gets their own personal copy of the recipe book\n- **Push** = Chef sends their personal updates to the central recipe book" },
    { type: 'analogy-table', title: 'Git Concepts → Restaurant Kitchen', headers: ['🍔 Restaurant Equivalent', '💻 Git Concept', '📌 What It Does'], rows: [['Complete recipe book', 'Repository (repo)', 'Stores all code and complete history'],['A timestamped recipe update', 'Commit', 'A saved snapshot of changes with a message'],['Private test copy of menu', 'Branch', 'Isolated workspace for a feature or fix'],['Merging approved recipe into book', 'Merge / Pull Request', 'Combining a feature branch back to main'],['Getting today\'s updated recipe book', 'git pull', 'Download the latest changes from GitHub'],['Sending your updates to the book', 'git push', 'Upload local commits to GitHub']] },
    { type: 'code', title: 'Essential Git Commands', language: 'bash', code: `# Setting up Git for the first time
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Starting a project
git init                     # Create new Git repo
git clone <url>              # Copy existing repo from GitHub

# Daily development cycle
git status                   # See which files changed
git add .                    # Stage ALL changed files
git commit -m "Add user login feature"

# Working with branches
git checkout -b feature/login  # Create and switch to new branch
git switch main              # Switch back to main
git merge feature/login      # Merge feature into current branch

# Syncing with GitHub
git pull origin main         # Get latest changes
git push origin feature/login  # Send your branch to GitHub

# Inspecting history
git log --oneline            # See commit history (compact)
git diff                     # See exactly what changed` },
    { type: 'exercise', title: 'Hands-On Exercise', content: "**Create your first GitHub repository and push code:**\n\n1. Create a free account at github.com\n2. Click \"New repository\" → Name it \"cicd-practice\" → Initialize with a README\n3. Clone it: `git clone https://github.com/YOUR_USERNAME/cicd-practice`\n4. Create a file: `echo \"Hello CI/CD!\" > hello.txt`\n5. Stage and commit: `git add . && git commit -m \"Add hello.txt\"`\n6. Push: `git push origin main`\n7. Refresh your GitHub page — your file appears!\n\n**Bonus:** Create a branch, add a different file, and open a Pull Request on GitHub." },
    { type: 'quiz', title: 'Knowledge Check', quizQuestions: [{ id: 'l5q1', question: 'What is the difference between Git and GitHub?', options: ['They are exactly the same', 'Git is a local version control tool; GitHub is a cloud platform for hosting Git repositories', 'GitHub is the command-line tool; Git is the website', 'Git is for individuals; GitHub is only for teams'], correctIndex: 1, explanation: 'Git is an open-source command-line tool for tracking file changes. GitHub is a web platform where you host and share Git repositories with additional collaboration features.' },{ id: 'l5q2', question: 'You want to work on a new feature without affecting the main codebase. What do you create?', options: ['A new repository', 'A commit', 'A branch', 'A fork'], correctIndex: 2, explanation: 'A branch creates an isolated copy of the codebase where you can make changes freely. When complete and reviewed, you merge it back to the main branch.' },{ id: 'l5q3', question: 'In what order should you run these Git commands when finishing work on a feature?', options: ['push → add → commit', 'commit → add → push', 'add → commit → push', 'push → commit → add'], correctIndex: 2, explanation: 'The correct order is: `git add` (stage changes), `git commit` (save the snapshot), `git push` (upload to GitHub).' }] },
    { type: 'summary', title: 'Key Takeaways', items: ["Git tracks every file change; GitHub hosts your Git repo as the team's central hub", 'Branches let you work in isolation without affecting the main codebase', 'Pull Requests are the gateway for code review before merging — and trigger CI automatically', 'The sequence add → commit → push sends your work to GitHub', 'Every git push can automatically trigger a CI/CD pipeline via GitHub webhooks'] },
    { type: 'next-preview', title: 'Coming Up Next: Lesson 6', content: "With Git mastered, Lesson 6 dives into the CI/CD pipeline itself — stages, jobs, steps, runners, and triggers. You'll learn how a pipeline configuration file orchestrates the entire automated journey." }
  ]
};
