import { Lesson } from './lessons';

export const lesson1: Lesson = {
  id: 1,
  slug: 'introduction-to-cicd',
  title: 'Introduction to CI/CD',
  subtitle: 'Why software delivery is a solved problem — and how CI/CD solves it',
  module: 1,
  duration: '15 min',
  difficulty: 'Beginner',
  tags: ['CI/CD', 'DevOps', 'Basics'],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: [
        'What software development is and why delivery matters',
        'The problems with old-fashioned manual delivery',
        'What CI/CD stands for and why it was invented',
        'How the food ordering analogy maps to software delivery',
        "A bird's-eye view of the complete CI/CD workflow"
      ]
    },
    {
      type: 'explanation',
      title: 'What Is Software Development?',
      content: "Every app you use — Instagram, Google Maps, your bank's mobile app — is built by developers who write code. That code must travel from a developer's computer to a server so users can access it. This journey is called **software delivery**.\n\nImagine a team of 10 developers all working on the same app. Every day they write new features, fix bugs, and improve performance. The challenge is: how do you safely combine all their changes and get them to users quickly and reliably?\n\nFor decades, this was done manually. A developer would finish their work, email a ZIP file to someone, who would then manually copy files to a server. This was slow, error-prone, and painful. CI/CD was invented to automate this entire process."
    },
    {
      type: 'analogy',
      title: '🍔 The Food Ordering Analogy',
      content: "Think of your favourite food delivery app. When you place an order:\n\n1. **You place the order** — You select items and confirm. This is instant.\n2. **The restaurant receives it** — The kitchen is immediately notified.\n3. **Food is prepared** — Chefs follow a recipe with quality steps.\n4. **Quality is checked** — The manager verifies the order before packaging.\n5. **It is packaged** — Sealed in a box ready for transport.\n6. **A driver picks it up** — The delivery vehicle heads your way.\n7. **It arrives at your door** — You receive exactly what you ordered.\n8. **You give feedback** — Stars and reviews improve future orders.\n\nNow replace \"food order\" with \"code change\" and \"delivery to your door\" with \"new feature live for users\". That is CI/CD."
    },
    {
      type: 'analogy-table',
      title: 'Food Order → Software Delivery Mapping',
      headers: ['🍔 Food Ordering Stage', '💻 Software Equivalent'],
      rows: [
        ['Customer places an order', 'Developer writes and pushes code'],
        ['Order enters the restaurant system', 'Code reaches GitHub / version control'],
        ['Kitchen receives the order', 'CI/CD pipeline triggers automatically'],
        ['Food preparation by chefs', 'Application is compiled and built'],
        ['Quality inspection by manager', 'Automated tests and security checks run'],
        ['Packaging in a sealed box', 'Build artifact or Docker image created'],
        ['Driver picks up and dispatches', 'Application deployed to cloud server'],
        ['Delivery confirmation text', 'Health checks verify deployment success'],
        ['Customer feedback / stars', 'Monitoring, logs, and alerts in production']
      ]
    },
    {
      type: 'deep-dive',
      title: 'What Does CI/CD Actually Stand For?',
      content: "**CI = Continuous Integration**\nDevelopers integrate (combine) their code changes into a shared repository frequently — multiple times per day. Each integration triggers an automated process that builds the application and runs tests. Problems are caught within minutes, not weeks.\n\n**CD = Continuous Delivery** (or Continuous Deployment)\nAfter code passes CI, CD takes over. Continuous Delivery means the code is always in a deployable state — a human clicks a button to release it. Continuous Deployment goes one step further: the release happens automatically with zero human intervention.\n\nThe key word is **Continuous** — meaning these processes run every single time a developer pushes code, automatically, without someone manually triggering them."
    },
    {
      type: 'visual',
      title: 'The Complete CI/CD Flow',
      content: 'Developer → Push Code → GitHub → Build → Test → Package → Deploy → Verify → Users\n\nEach arrow represents an automated step. No human needs to manually trigger anything after the initial code push.'
    },
    {
      type: 'mistakes',
      title: 'Common Misconceptions',
      items: [
        '❌ "CI/CD is only for big companies" — False. Even solo developers benefit enormously from automation.',
        '❌ "CI/CD replaces testing" — False. CI/CD runs tests; it does not eliminate the need to write them.',
        '❌ "Continuous Deployment means no testing" — False. It means tests are so thorough that human approval is unnecessary.',
        '❌ "CI and CD are the same thing" — False. CI is about integration; CD is about delivery or deployment.',
        '❌ "Setting up CI/CD takes months" — False. A basic pipeline can be running in under an hour.'
      ]
    },
    {
      type: 'exercise',
      title: 'Practical Exercise',
      content: "**Reflection Exercise (No Computer Required)**\n\nThink of any software update you have received on your phone — an app update, a new feature, a bug fix. Write down:\n\n1. Who probably made the change? (A developer somewhere)\n2. How did it get from their computer to your phone?\n3. How many steps do you think were involved?\n4. What could go wrong if one step failed?\n\nThis mental model will help you appreciate why automating the delivery pipeline is so valuable."
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l1q1',
          question: 'What does CI stand for in CI/CD?',
          options: ['Continuous Integration', 'Code Inspection', 'Continuous Installation', 'Cloud Infrastructure'],
          correctIndex: 0,
          explanation: 'CI stands for Continuous Integration — the practice of frequently merging code changes into a shared repository and automatically building and testing the result.'
        },
        {
          id: 'l1q2',
          question: 'In the food ordering analogy, what does "quality inspection by the manager" represent?',
          options: ['A developer manually reviewing files', 'Automated tests and security checks', 'The deployment to production', 'Writing documentation'],
          correctIndex: 1,
          explanation: 'Quality inspection maps to automated tests and security checks — processes that verify the code works correctly before it is shipped to users.'
        },
        {
          id: 'l1q3',
          question: 'What is the main problem CI/CD solves?',
          options: ['Writing better code faster', 'Making servers cheaper', 'Automating and making reliable the process of delivering software to users', 'Eliminating the need for developers'],
          correctIndex: 2,
          explanation: 'CI/CD primarily solves the problem of slow, unreliable, manual software delivery by automating the entire pipeline from code commit to production.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: [
        "Software delivery is the journey from a developer's code to running in production for users",
        'Manual delivery is slow, error-prone, and does not scale with modern development speed',
        'CI (Continuous Integration) automates building and testing whenever code is pushed',
        'CD (Continuous Delivery/Deployment) automates getting tested code to production',
        'The food ordering analogy maps every restaurant stage to a software delivery stage'
      ]
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next: Lesson 2',
      content: "In Lesson 2, we will trace exactly how software reaches users — from source code and developers to production servers. We'll compare traditional manual delivery with modern automated delivery, and map every restaurant station to a software development stage."
    }
  ]
};
