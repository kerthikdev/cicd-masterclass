import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { 
  BookOpen, 
  Terminal, 
  Layers, 
  Search, 
  UtensilsCrossed, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ReferencePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const GLOSSARY_TERMS = [
    {
      term: 'Continuous Integration (CI)',
      foodAnalogy: 'Kitchen auto-ticket system',
      definition: 'The practice of frequently merging code changes into a central repository, followed by automated building and testing.',
      category: 'Core Concepts'
    },
    {
      term: 'Continuous Delivery (CD)',
      foodAnalogy: 'Food packed in bag, awaiting driver pickup',
      definition: 'Code is automatically tested and packaged, ready to be deployed to production at any time with a single click.',
      category: 'Core Concepts'
    },
    {
      term: 'Continuous Deployment',
      foodAnalogy: 'Drone instantly delivers meal right to customer doorstep',
      definition: 'Every code change that passes all automated tests is deployed to production automatically with zero manual human approval.',
      category: 'Core Concepts'
    },
    {
      term: 'Pipeline',
      foodAnalogy: 'The complete assembly line from kitchen prep to customer door',
      definition: 'A sequence of automated steps (lint, build, test, package, deploy) that code travels through.',
      category: 'Workflow'
    },
    {
      term: 'Runner / Agent',
      foodAnalogy: 'The kitchen station chef executing a specific dish preparation',
      definition: 'The compute virtual machine or container that executes pipeline jobs.',
      category: 'Infrastructure'
    },
    {
      term: 'Artifact',
      foodAnalogy: 'The completed, boxed burger ready on the pass counter',
      definition: 'The compiled, deployable binary, bundled ZIP, or Docker image generated during the build step.',
      category: 'Build'
    },
    {
      term: 'Quality Gate',
      foodAnalogy: 'Head chef checking food quality before letting it leave kitchen',
      definition: 'A strict checkpoint (e.g. 100% test pass rate, no security vulnerabilities) that must pass before advancing.',
      category: 'Testing'
    },
    {
      term: 'Rollback',
      foodAnalogy: 'Recalling bad meal and quickly handing customer fresh replacement',
      definition: 'Instantly reverting production to the previous known-good deployment if errors occur in a new release.',
      category: 'Deployment'
    },
    {
      term: 'Blue-Green Deployment',
      foodAnalogy: 'Two identical kitchens; one serves while other cooks next batch',
      definition: 'Running two identical environments (Blue=Live, Green=Idle). Deploy to Green, test, then switch router.',
      category: 'Deployment'
    },
    {
      term: 'Canary Release',
      foodAnalogy: 'Serving 5% of diners new dessert recipe before putting on main menu',
      definition: 'Deploying a new version to a tiny subset (e.g., 5%) of users first to test stability in real production.',
      category: 'Deployment'
    },
    {
      term: 'Rolling Update',
      foodAnalogy: 'Replacing dining tables one-by-one so restaurant stays open',
      definition: 'Incrementally replacing old server instances with new ones, ensuring zero downtime throughout.',
      category: 'Deployment'
    },
    {
      term: 'Webhook',
      foodAnalogy: 'The bell ringing inside the kitchen when online order arrives',
      definition: 'An automated HTTP callback sent from one system (GitHub) to trigger another (CI server).',
      category: 'Integration'
    }
  ];

  const GITHUB_ACTIONS_CHEATSHEET = `name: Production CI/CD
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v4

      - name: Set up Node.js runtime
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run automated test suite
        run: npm test

      - name: Build production bundle
        run: npm run build`;

  const DOCKER_CHEATSHEET = `# Build a Docker image with tag 'my-app:1.0.0'
docker build -t my-app:1.0.0 .

# Run container locally mapping host port 8080 to container port 80
docker run -d -p 8080:80 --name my-running-app my-app:1.0.0

# Authenticate with Amazon Elastic Container Registry (ECR)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Tag and push image to remote registry
docker tag my-app:1.0.0 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:1.0.0
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:1.0.0`;

  const filteredTerms = GLOSSARY_TERMS.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.foodAnalogy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      {/* Page Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Reference & Cheatsheets</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          DevOps & CI/CD Knowledge Bank
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Essential syntax, commands, and the complete Food Ordering → DevOps glossary.
        </p>
      </div>

      {/* Cheatsheets Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#0b101e] border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
              GitHub Actions Workflow (.github/workflows/ci.yml)
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              YAML Syntax
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Minimal production-grade pipeline with checkout, Node setup, caching, testing, and building.
          </p>
          <CodeBlock code={GITHUB_ACTIONS_CHEATSHEET} language="yaml" />
        </div>

        <div className="bg-[#0b101e] border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span>
              Essential Docker & Registry Commands
            </h3>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-500/30">
              CLI Reference
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Standard container build, local execution, and Amazon ECR registry push commands.
          </p>
          <CodeBlock code={DOCKER_CHEATSHEET} language="bash" />
        </div>
      </div>

      {/* Rosetta Stone Glossary */}
      <div className="bg-[#0b101e] border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/15">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Analogy Rosetta Stone</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mt-1">DevOps Terminology & Food Equivalents</h3>
          </div>

          {/* Search filter */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/20 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-2">{item.term}</h4>
                <div className="mt-2 text-xs text-amber-300/90 font-medium bg-amber-950/20 p-2 rounded-lg border border-amber-500/20 flex items-start gap-1.5">
                  <span>🍔</span>
                  <span>{item.foodAnalogy}</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.definition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
