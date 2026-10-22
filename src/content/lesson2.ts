import { Lesson } from './lessons';

export const lesson2: Lesson = {
  id: 2,
  slug: 'how-software-reaches-the-customer',
  title: 'How Software Reaches the Customer',
  subtitle: 'From developer laptop to live production — the complete journey',
  module: 1,
  duration: '20 min',
  difficulty: 'Beginner',
  tags: ['Software Delivery', 'Environments', 'SDLC'],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: [
        'What source code, developers, servers, and releases are',
        'The difference between Development, Staging, and Production environments',
        'How traditional (manual) software delivery worked',
        'Why manual delivery fails at scale',
        'How to map each restaurant station to a software stage'
      ]
    },
    {
      type: 'explanation',
      title: 'The Four Environments of Software',
      content: "Modern software runs across multiple environments — each serving a different purpose:\n\n**Development (Dev):** A developer's local machine. Code is written, modified, and tested here first. Think of it as a chef's home kitchen where new recipes are practised.\n\n**Staging (Pre-production):** A server that mirrors production exactly, but real users do not access it. It's the final dress rehearsal before going live. Like the restaurant testing a new menu item internally before it appears on the public menu.\n\n**Production (Prod):** The live environment that real users interact with. Any bug here affects real people. This is the restaurant open to the public.\n\n**Testing:** Sometimes a separate environment just for running automated tests, isolated so test data does not pollute other environments."
    },
    {
      type: 'analogy',
      title: '🍔 Restaurant Stations as Software Stages',
      content: "A restaurant does not take raw ingredients straight from the delivery truck and serve them to customers. The food passes through organised stations:\n\n- **Receiving dock** → Code enters version control (GitHub)\n- **Prep kitchen** → Development environment (writing code)\n- **Test kitchen** → Staging environment (final checks)\n- **Service window** → Production deployment (live for users)\n- **Customer table** → Users accessing the application\n\nThe chef (developer) does not hand food directly to the customer. Every station serves a purpose and catches potential problems before the next stage."
    },
    {
      type: 'analogy-table',
      title: 'Restaurant Station → Software Environment',
      headers: ['🍽️ Restaurant Station', '💻 Software Environment', '📌 Purpose'],
      rows: [
        ["Chef's personal notes", 'Local development machine', 'Where code is written and first tested'],
        ['Prep kitchen', 'Development server', 'Integration point for team code'],
        ['Test kitchen (closed)', 'Staging environment', 'Final testing before release'],
        ['Restaurant open to public', 'Production environment', 'Real users, real data, must be stable'],
        ['Customer order history', 'Version control (Git)', 'Track every change ever made']
      ]
    },
    {
      type: 'deep-dive',
      title: 'Traditional vs. Automated Delivery',
      content: "**Old-fashioned manual delivery (before CI/CD):**\n\n1. Developer finishes a feature after 2 weeks of work\n2. Sends their files in a ZIP archive to a release manager\n3. Release manager manually merges all teams' ZIP files on a Friday afternoon\n4. Discovers conflicts between Team A and Team B's code — 3-hour emergency fix\n5. Manually SSHes into the production server and copies files\n6. Crosses fingers and hopes nothing breaks\n7. Gets a 2am phone call — the login page is down for 50,000 users\n\nThis process, called \"big bang releases\", was the industry standard before DevOps.\n\n**Modern automated delivery (CI/CD):**\n\n1. Developer finishes a small feature (takes 2 hours, not 2 weeks)\n2. Pushes to GitHub — pipeline triggers automatically in seconds\n3. Code is built, all tests run in 5 minutes\n4. If tests pass, code is deployed to staging automatically\n5. A quick human review (or fully automated) → deploy to production\n6. Monitoring confirms all health checks pass\n7. Developer goes home on time. No weekend emergencies."
    },
    {
      type: 'code',
      title: 'What a Traditional Manual Release Script Looked Like',
      language: 'bash',
      code: `#!/bin/bash
# Old-school manual deploy script — DO NOT USE
echo "WARNING: Manual deployment in progress!"
read -p "Enter version to deploy (e.g. v1.2.3): " VERSION

# Manually copy files to server
scp -r ./dist/* deploy@production-server:/var/www/html/

# Manually restart the application
ssh deploy@production-server "sudo systemctl restart myapp"

echo "Deployment complete (hopefully...)"
echo "Please monitor the app manually for the next hour."`
    },
    {
      type: 'code-explanation',
      title: 'Why This Approach Fails',
      items: [
        '`scp` — manually copying files. One wrong path destroys production.',
        'No version tracking — who deployed what and when?',
        'No automated rollback — if it breaks, you need to manually undo everything.',
        'No tests before deployment — bugs go straight to users.',
        'Human error — the person typing the wrong version number at 11pm.',
        '`sudo systemctl restart` — requires root access on production, a security nightmare.'
      ]
    },
    {
      type: 'mistakes',
      title: 'Common Mistakes in Early Software Delivery',
      items: [
        '❌ Deploying directly to production without testing',
        "❌ Sharing a single server between developers (breaking each other's work)",
        '❌ No version control — "Who changed this file and when?"',
        '❌ Big bang releases every 6 months instead of small, frequent updates',
        '❌ No monitoring — discovering issues only when customers complain'
      ]
    },
    {
      type: 'exercise',
      title: 'Practical Exercise',
      content: "**Map your favourite app's delivery pipeline:**\n\nPick any app you use daily (WhatsApp, Spotify, YouTube).\n\n1. Estimate how many developers work on it (hundreds? thousands?)\n2. Think about how many code changes happen per day\n3. Imagine what would happen if every change required a manual deployment\n4. Research if that company has a blog about their deployment process (many do!)\n\nCompanies like Google, Netflix, and Amazon deploy to production thousands of times per day. This is only possible with fully automated CI/CD pipelines."
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l2q1',
          question: 'What is the "staging environment" used for?',
          options: ['Where developers write code on their laptops', 'A mirror of production for final testing before release', 'Where users access the live application', 'Storing database backups'],
          correctIndex: 1,
          explanation: 'Staging mirrors the production environment exactly and is used for final testing before a real release. Real users never access it.'
        },
        {
          id: 'l2q2',
          question: 'What was the main problem with "big bang releases"?',
          options: ['They were too frequent and caused server overload', 'Developers had to write too much documentation', 'Infrequent, large releases concentrated risk and made problems hard to isolate', 'They required too much hardware'],
          correctIndex: 2,
          explanation: 'Big bang releases combined months of changes into one massive deployment. When something broke, it was extremely difficult to identify which of the hundreds of changes caused the problem.'
        },
        {
          id: 'l2q3',
          question: 'In the restaurant analogy, what does "Production environment" map to?',
          options: ["The chef's home kitchen", "The restaurant's test kitchen", 'The restaurant open to the public with real customers', "The food supplier's warehouse"],
          correctIndex: 2,
          explanation: 'Production is the live environment where real users interact with the application — exactly like a restaurant open to the public serving paying customers.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: [
        'Software travels through Dev → Staging → Production environments before reaching users',
        'Each environment serves a gating purpose — catching problems before the next stage',
        "Traditional manual delivery was slow, error-prone, and didn't scale",
        'CI/CD replaces manual steps with automated pipelines triggered by code pushes',
        'Small, frequent releases are safer than large, infrequent big-bang deployments'
      ]
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next: Lesson 3',
      content: "Now that you understand the delivery journey, Lesson 3 dives into Continuous Integration — the first half of CI/CD. You'll learn how Git repositories, automated builds, and test automation work together to catch problems the moment they are introduced."
    }
  ]
};
