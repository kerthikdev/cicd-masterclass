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
      term: 'Webhook',
      foodAnalogy: 'Bell ringing at the kitchen counter when order arrives',
      definition: 'An automated HTTP callback message sent from GitHub to the CI server to trigger a pipeline run.',
      category: 'Integration'
    },
    {
      term: 'Docker Container',
      foodAnalogy: 'Insulated foil takeout box maintaining food freshness',
      definition: 'A standardized unit of software packaging code and all dependencies so it runs reliably everywhere.',
      category: 'Packaging'
    },
    {
      term: 'Container Registry (ECR / Docker Hub)',
      foodAnalogy: 'The restaurant dry-storage pantry holding standardized meal boxes',
      definition: 'A cloud storage repository for storing, versioning, and distributing Docker container images.',
      category: 'Infrastructure'
    },
    {
      term: 'Secret / Credential',
      foodAnalogy: 'The restaurant cash safe combination code',
      definition: 'Sensitive information (API keys, passwords, private certificates) encrypted and injected at runtime.',
      category: 'Security'
    },
    {
      term: 'Zero-Downtime Deployment',
      foodAnalogy: 'Serving new menu dishes while kitchen is open without closing doors',
      definition: 'Releasing new software versions without any service interruption or error spikes for active users.',
      category: 'Deployment'
    }
  ];

  const GITHUB_ACTIONS_CHEATSHEET = `name: Production CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter & Tests
        run: |
          npm run lint
          npm test -- --coverage`;

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
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 space-y-10">
      {/* Page Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold mb-3 shadow-xs">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Quick Reference & Cheatsheets</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          DevOps & CI/CD Knowledge Bank
        </h1>
        <p className="text-slate-600 text-sm md:text-base mt-2 font-normal">
          Essential syntax, commands, and the complete Food Ordering ➔ DevOps glossary.
        </p>
      </div>

      {/* Cheatsheets Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span>GitHub Actions Workflow (.github/workflows/ci.yml)</span>
            </h3>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 font-bold">
              YAML Syntax
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 font-normal">
            Minimal production-grade pipeline with checkout, Node setup, caching, testing, and building.
          </p>
          <CodeBlock code={GITHUB_ACTIONS_CHEATSHEET} language="yaml" />
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
              <span className="w-3 h-3 rounded-full bg-amber-600"></span>
              <span>Essential Docker & Registry Commands</span>
            </h3>
            <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 font-bold">
              CLI Reference
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 font-normal">
            Standard container build, local execution, and Amazon ECR registry push commands.
          </p>
          <CodeBlock code={DOCKER_CHEATSHEET} language="bash" />
        </div>
      </div>

      {/* Rosetta Stone Glossary */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-mono font-bold uppercase">
              <UtensilsCrossed className="w-4 h-4 text-amber-600" />
              <span>Analogy Rosetta Stone</span>
            </div>
            <h3 className="text-xl font-black text-slate-950 mt-1 tracking-tight">DevOps Terminology & Food Equivalents</h3>
          </div>

          {/* Search filter */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terms, analogies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white shadow-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {item.category}
                </span>
                <h4 className="text-base font-extrabold text-slate-950 mt-2.5">{item.term}</h4>
                <div className="mt-2.5 text-xs text-amber-950 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2 shadow-xs">
                  <span className="text-sm">🍔</span>
                  <span>{item.foodAnalogy}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-normal">{item.definition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
