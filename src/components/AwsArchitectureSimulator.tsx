import React, { useState, useEffect, useRef } from 'react';
import { 
  Cloud, 
  Shield, 
  Server, 
  Layers, 
  Cpu, 
  Database, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  ArrowRight, 
  Zap, 
  Lock, 
  FileCode, 
  DollarSign,
  Globe,
  Radio,
  Sliders,
  Sparkles
} from 'lucide-react';

export type SimulationScenario = 'happy-path' | 'cve-blocked' | 'oidc-denied' | 'health-failure';

interface NodeInfo {
  id: string;
  name: string;
  awsService: string;
  role: string;
  category: 'auth' | 'registry' | 'compute' | 'network' | 'storage' | 'observability';
  icon: string;
  status: 'idle' | 'active' | 'success' | 'warning' | 'error';
  badge: string;
  cliCommand: string;
  configSnippet: string;
  bestPractice: string;
  costTip: string;
}

const AWS_NODES: Record<string, NodeInfo> = {
  oidc: {
    id: 'oidc',
    name: 'AWS IAM & STS OIDC',
    awsService: 'AWS Security Token Service (STS)',
    role: 'Cryptographic authentication for GitHub Actions without hardcoded AWS Secret Keys',
    category: 'auth',
    icon: '🔐',
    status: 'idle',
    badge: 'Zero-Secret Auth',
    cliCommand: 'aws sts get-caller-identity',
    configSnippet: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:kerthikdev/cicd-masterclass:ref:refs/heads/main"
        }
      }
    }
  ]
}`,
    bestPractice: 'Always restrict the IAM trust policy condition to specific repository and branch (`ref:refs/heads/main`). Never use wildcard `*` in production.',
    costTip: 'AWS STS OIDC token generation is 100% FREE with unlimited authentication requests.'
  },
  ecr: {
    id: 'ecr',
    name: 'Amazon ECR',
    awsService: 'Elastic Container Registry',
    role: 'Private, highly secure Docker registry with automated vulnerability scanning on push',
    category: 'registry',
    icon: '📦',
    status: 'idle',
    badge: 'Docker Registry',
    cliCommand: 'aws ecr describe-images --repository-name food-order-api',
    configSnippet: `aws-actions/amazon-ecr-login@v2
docker build -t 123456789012.dkr.ecr.us-east-1.amazonaws.com/food-order-api:\${{ github.sha }} .
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/food-order-api:\${{ github.sha }}`,
    bestPractice: 'Enable "Scan on push" and configure Image Tag Immutability so releases cannot be overwritten by mistake.',
    costTip: 'Storage costs ~$0.10/GB/month. Set ECR Lifecycle Policies to automatically purge untagged images older than 14 days.'
  },
  ecs: {
    id: 'ecs',
    name: 'Amazon ECS (Fargate)',
    awsService: 'Elastic Container Service',
    role: 'Serverless container orchestration running microservices across multiple Availability Zones',
    category: 'compute',
    icon: '🚀',
    status: 'idle',
    badge: 'Serverless Compute',
    cliCommand: 'aws ecs update-service --cluster production --service food-order-api --force-new-deployment',
    configSnippet: `{
  "family": "food-order-api-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "food-order-api",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/food-order-api:v2.4.0",
      "portMappings": [{ "containerPort": 8000, "protocol": "tcp" }],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/food-order-api",
          "awslogs-region": "us-east-1"
        }
      }
    }
  ]
}`,
    bestPractice: 'Use minimum 2 tasks across 2 Availability Zones for high availability. Leverage rolling updates with minimumHealthyPercent: 100%.',
    costTip: 'Fargate Spot pricing can reduce compute costs by up to 70% for staging and non-critical environments.'
  },
  alb: {
    id: 'alb',
    name: 'AWS Application Load Balancer',
    awsService: 'Elastic Load Balancing (ALB)',
    role: 'Intelligent HTTP/HTTPS traffic router, TLS termination, and health check gatekeeper',
    category: 'network',
    icon: '⚖️',
    status: 'idle',
    badge: 'Traffic Balancer',
    cliCommand: 'aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:...',
    configSnippet: `{
  "HealthCheckProtocol": "HTTP",
  "HealthCheckPort": "8000",
  "HealthCheckPath": "/health",
  "HealthCheckIntervalSeconds": 15,
  "HealthCheckTimeoutSeconds": 5,
  "HealthyThresholdCount": 2,
  "UnhealthyThresholdCount": 3
}`,
    bestPractice: 'Ensure the `/health` endpoint tests database and Redis connectivity so broken instances do not receive live traffic.',
    costTip: 'One ALB (~$16/mo) can serve multiple microservices using path-based routing rules (/api/orders, /api/users).'
  },
  s3: {
    id: 's3',
    name: 'Amazon S3 & CloudFront',
    awsService: 'Simple Storage Service + CDN',
    role: 'Global edge delivery for static web assets, documentation, and build artifacts',
    category: 'storage',
    icon: '🌐',
    status: 'idle',
    badge: 'Static CDN Hosting',
    cliCommand: 'aws s3 sync dist/ s3://food-order-frontend-prod && aws cloudfront create-invalidation --distribution-id E123 --paths "/*"',
    configSnippet: `# GitHub Actions Step
- name: Deploy Frontend to S3
  run: aws s3 sync ./dist s3://\${{ secrets.AWS_S3_BUCKET }} --delete
- name: Invalidate CloudFront CDN
  run: aws cloudfront create-invalidation --distribution-id \${{ secrets.CF_DIST_ID }} --paths "/*"`,
    bestPractice: 'Always keep S3 Block Public Access ENABLED. Use CloudFront Origin Access Control (OAC) to serve files privately.',
    costTip: 'CloudFront provides 1TB free outbound data transfer each month under the AWS Free Tier.'
  },
  cloudwatch: {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    awsService: 'CloudWatch Alarms & Container Insights',
    role: 'Real-time observability, latency metrics, container logs, and automated rollback triggers',
    category: 'observability',
    icon: '📊',
    status: 'idle',
    badge: 'Observability & Alarms',
    cliCommand: 'aws cloudwatch describe-alarms --alarm-names "High5XXErrors"',
    configSnippet: `aws cloudwatch put-metric-alarm \\
  --alarm-name "High5XXErrors" \\
  --metric-name "HTTPCode_Target_5XX_Count" \\
  --namespace "AWS/ApplicationELB" \\
  --statistic "Sum" \\
  --period 60 \\
  --threshold 5 \\
  --comparison-operator "GreaterThanThreshold" \\
  --alarm-actions "arn:aws:sns:us-east-1:123456789012:ecs-auto-rollback"`,
    bestPractice: 'Set metric alarms for both latency (p99 > 800ms) and error rates (5XX > 1%). Hook alarms directly to CodeDeploy or ECS for auto-rollback.',
    costTip: 'Set CloudWatch log retention to 14 or 30 days instead of "Never Expire" to prevent unexpected storage bills.'
  }
};

export const AwsArchitectureSimulator: React.FC = () => {
  const [scenario, setScenario] = useState<SimulationScenario>('happy-path');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ecs');
  const [logs, setLogs] = useState<Array<{ time: string; text: string; type: 'info' | 'success' | 'warn' | 'error' | 'cmd' }>>([]);
  const [activeTab, setActiveTab] = useState<'topology' | 'yaml' | 'cost'>('topology');
  const [copiedYaml, setCopiedYaml] = useState(false);
  
  // Real-time metric indicators
  const [v1Tasks, setV1Tasks] = useState(2);
  const [v2Tasks, setV2Tasks] = useState(0);
  const [trafficSplit, setTrafficSplit] = useState<{ v1: number; v2: number }>({ v1: 100, v2: 0 });
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'checking' | 'degraded' | 'failed'>('healthy');
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedNode = AWS_NODES[selectedNodeId] || AWS_NODES.ecs;

  // Reset simulator
  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentStep(0);
    setV1Tasks(2);
    setV2Tasks(0);
    setTrafficSplit({ v1: 100, v2: 0 });
    setHealthStatus('healthy');
    setLogs([
      { time: '00:00.00', text: 'System ready. Select a scenario and press "Run AWS Deployment".', type: 'info' }
    ]);
  };

  useEffect(() => {
    handleReset();
  }, [scenario]);

  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error' | 'cmd') => {
    const now = new Date();
    const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')}`;
    setLogs(prev => [...prev.slice(-40), { time: timeStr, text, type }]);
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(1);
    setLogs([]);

    const baseDelay = 1200 / speed;

    if (scenario === 'happy-path') {
      // Step 1: OIDC Auth
      addLog('🚀 [GitHub Actions] Workflow triggered on push to main (commit: 9f41b2a)', 'cmd');
      addLog('🔐 Requesting JWT OIDC token from GitHub Token Service...', 'info');
      
      timerRef.current = setTimeout(() => {
        setCurrentStep(2);
        addLog('✅ AWS STS: AssumeRoleWithWebIdentity verified. Issued temporary 60-min IAM credentials.', 'success');
        addLog('📦 Logging into Amazon ECR registry: 123456789012.dkr.ecr.us-east-1.amazonaws.com', 'cmd');

        // Step 2: ECR Push
        timerRef.current = setTimeout(() => {
          setCurrentStep(3);
          addLog('🐳 Building multi-stage Docker image: food-order-api:9f41b2a', 'cmd');
          addLog('🛡️ Trivy Security Scan: 0 CRITICAL, 0 HIGH vulnerabilities found in image layers.', 'success');
          addLog('⬆️ Pushed image digest: sha256:d8a94bc12 to Amazon ECR.', 'success');

          // Step 3: Register Task Definition & Spin up v2 tasks
          timerRef.current = setTimeout(() => {
            setCurrentStep(4);
            setV2Tasks(2);
            setHealthStatus('checking');
            addLog('📋 Registered new ECS Task Definition: food-order-api:48 (image tag 9f41b2a)', 'cmd');
            addLog('🚀 ECS Service scheduler: Launching 2 new Fargate tasks (v2.4.0) alongside v1...', 'info');

            // Step 4: Health Check verification
            timerRef.current = setTimeout(() => {
              setCurrentStep(5);
              setHealthStatus('healthy');
              addLog('⚖️ ALB Target Group: Sending HTTP GET /health to new container ports (8000)...', 'cmd');
              addLog('✅ ALB Target Group: Target 10.0.1.42:8000 responded HTTP 200 OK (latency: 14ms)', 'success');
              addLog('✅ ALB Target Group: Target 10.0.2.89:8000 responded HTTP 200 OK (latency: 12ms)', 'success');

              // Step 5: Traffic Shift
              timerRef.current = setTimeout(() => {
                setCurrentStep(6);
                setTrafficSplit({ v1: 0, v2: 100 });
                addLog('🔀 ALB Listener Rule: Shifted 100% of live production traffic to v2 tasks.', 'info');
                addLog('⏳ ECS Service: Deregistering old v1 tasks. Waiting 30s for connection draining...', 'info');

                // Step 6: Complete
                timerRef.current = setTimeout(() => {
                  setCurrentStep(7);
                  setV1Tasks(0);
                  setIsRunning(false);
                  addLog('🎉 ECS Service Stable! 2 tasks running on Fargate v2. Zero downtime achieved.', 'success');
                  addLog('📊 CloudWatch Alarm: High5XXErrors state is OK. Deployment 100% complete.', 'success');
                }, baseDelay * 1.2);

              }, baseDelay);
            }, baseDelay);
          }, baseDelay);
        }, baseDelay);
      }, baseDelay);

    } else if (scenario === 'cve-blocked') {
      // DevSecOps CVE Block
      addLog('🚀 [GitHub Actions] Workflow triggered on branch feature/payment-v2', 'cmd');
      addLog('🔐 AWS STS OIDC assumed successfully.', 'success');
      
      timerRef.current = setTimeout(() => {
        setCurrentStep(2);
        addLog('🐳 Building Docker image with unpinned base image (python:3.9-slim)...', 'cmd');
        
        timerRef.current = setTimeout(() => {
          setCurrentStep(3);
          addLog('🚨 Amazon ECR Enhanced Scanning alert detected in layer 4!', 'warn');
          addLog('❌ CVE-2024-21626 [CRITICAL] detected: Container escape vulnerability in runc.', 'error');
          addLog('⛔ Pipeline Policy: Deploy aborted. Image will NOT be scheduled to Amazon ECS.', 'error');
          setIsRunning(false);
        }, baseDelay * 1.5);
      }, baseDelay);

    } else if (scenario === 'oidc-denied') {
      // OIDC Security Rejection
      addLog('🚀 [GitHub Actions] Workflow triggered on unauthorized fork repository', 'cmd');
      addLog('🔐 Attempting to assume IAM Role arn:aws:iam::123456789012:role/GitHubActionsProdRole...', 'cmd');
      
      timerRef.current = setTimeout(() => {
        setCurrentStep(2);
        addLog('❌ AWS STS Error: AccessDenied — AssumeRoleWithWebIdentity', 'error');
        addLog('⚠️ Reason: Token claims (sub: repo:attacker/fork:ref:main) do NOT match IAM Trust Policy condition.', 'error');
        addLog('🛡️ Security Guardrail: Unauthorized repository rejected. Zero AWS access granted.', 'warn');
        setIsRunning(false);
      }, baseDelay * 1.5);

    } else if (scenario === 'health-failure') {
      // Health Check Failure & Rollback
      addLog('🚀 [GitHub Actions] Push to main. OIDC Auth & Docker build successful.', 'cmd');
      addLog('📦 Pushed image food-order-api:faulty-build to Amazon ECR.', 'success');

      timerRef.current = setTimeout(() => {
        setCurrentStep(4);
        setV2Tasks(2);
        setHealthStatus('checking');
        addLog('🚀 ECS launched 2 new Fargate tasks (v2). Registering with ALB target group...', 'info');

        timerRef.current = setTimeout(() => {
          setCurrentStep(5);
          setHealthStatus('failed');
          addLog('❌ ALB Target Health Check failed: GET /health returned HTTP 500 Internal Server Error!', 'error');
          addLog('💥 Container log: "DatabaseConnectionError: Host not reachable on port 5432"', 'error');
          addLog('🚨 CloudWatch Alarm triggered: TargetUnhealthyCount >= 2 for 30s', 'error');

          timerRef.current = setTimeout(() => {
            setCurrentStep(6);
            setHealthStatus('healthy');
            setV2Tasks(0);
            setV1Tasks(2);
            setTrafficSplit({ v1: 100, v2: 0 });
            addLog('🔄 AUTOMATED ROLLBACK: ECS rolling back service to previous stable task v1.', 'warn');
            addLog('✅ ALB kept 100% of live traffic on stable v1 tasks. Zero user downtime experienced!', 'success');
            setIsRunning(false);
          }, baseDelay * 1.5);
        }, baseDelay * 1.2);
      }, baseDelay);
    }
  };

  const copyYamlToClipboard = () => {
    navigator.clipboard.writeText(productionWorkflowYaml);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
  };

  const productionWorkflowYaml = `# Production-Grade GitHub Actions AWS ECS Deployment with OIDC
name: Deploy to Production AWS ECS

on:
  push:
    branches: [ main ]

permissions:
  id-token: write   # Mandatory for AWS STS OIDC federation
  contents: read

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: food-order-api
  ECS_CLUSTER: production-cluster
  ECS_SERVICE: food-order-api-service
  ECS_TASK_DEFINITION: .aws/task-definition.json

jobs:
  deploy:
    name: Deploy to AWS Cloud
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      # 1. Zero-Secret AWS Authentication via OIDC
      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsProdRole
          aws-region: \${{ env.AWS_REGION }}
          audience: sts.amazonaws.com

      # 2. Login to Amazon ECR
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      # 3. Build & Scan Container
      - name: Build, tag, and push Docker image
        id: build-image
        env:
          REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t $REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          echo "image=$REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

      # 4. Update ECS Task Definition
      - name: Fill in new image ID in task definition
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: \${{ env.ECS_TASK_DEFINITION }}
          container-name: food-order-api
          image: \${{ steps.build-image.outputs.image }}

      # 5. Zero-Downtime Rolling Deployment to ECS
      - name: Deploy Amazon ECS task definition
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: \${{ steps.task-def.outputs.task-definition }}
          service: \${{ env.ECS_SERVICE }}
          cluster: \${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true`;

  return (
    <div className="space-y-8">
      {/* Top Banner & Scenario Selector */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-2">
              <Cloud className="w-3.5 h-3.5 text-amber-600" />
              <span>AWS Cloud Interactive Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              GitHub Actions ➔ Amazon Web Services (AWS)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Simulate end-to-end cloud deployments using AWS STS OIDC, Amazon ECR, ECS Fargate serverless containers, Application Load Balancers, and automated CloudWatch rollbacks.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <button
              onClick={() => { setScenario('happy-path'); }}
              disabled={isRunning}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                scenario === 'happy-path'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>1. Zero-Downtime Deploy</span>
            </button>

            <button
              onClick={() => { setScenario('cve-blocked'); }}
              disabled={isRunning}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                scenario === 'cve-blocked'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>2. ECR CVE Block</span>
            </button>

            <button
              onClick={() => { setScenario('oidc-denied'); }}
              disabled={isRunning}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                scenario === 'oidc-denied'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>3. OIDC Access Denied</span>
            </button>

            <button
              onClick={() => { setScenario('health-failure'); }}
              disabled={isRunning}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                scenario === 'health-failure'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>4. Health Fail & Rollback</span>
            </button>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                isRunning
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 hover:scale-105 active:scale-95'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? 'Simulation In Progress...' : 'Run AWS Deployment'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>

            {/* Speed Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <span className="text-[11px] text-slate-500 px-2 font-medium">Speed:</span>
              {[1, 2, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded-lg font-bold text-xs ${
                    speed === s ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Status Badges */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">ALB Target Health:</span>
              <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full ${
                healthStatus === 'healthy' ? 'bg-emerald-100 text-emerald-800' :
                healthStatus === 'checking' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  healthStatus === 'healthy' ? 'bg-emerald-500' :
                  healthStatus === 'checking' ? 'bg-amber-500 animate-pulse' :
                  'bg-rose-500'
                }`}></span>
                {healthStatus.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Live Traffic Split:</span>
              <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                v1: {trafficSplit.v1}% | v2: {trafficSplit.v2}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('topology')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'topology'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Interactive AWS Topology & Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab('yaml')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'yaml'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Production GitHub Actions YAML</span>
        </button>

        <button
          onClick={() => setActiveTab('cost')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'cost'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>AWS Pricing & Architecture Guide</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE TOPOLOGY & INSPECTOR */}
      {activeTab === 'topology' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Canvas: AWS Service Nodes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 text-white shadow-lg border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
                  <span>AWS VIRTUAL PRIVATE CLOUD (VPC) • US-EAST-1</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Click any service to inspect</span>
              </div>

              {/* Node Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(AWS_NODES).map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  let isActiveStep = false;
                  if (node.id === 'oidc' && currentStep === 1) isActiveStep = true;
                  if (node.id === 'ecr' && (currentStep === 2 || currentStep === 3)) isActiveStep = true;
                  if (node.id === 'ecs' && (currentStep === 4 || currentStep === 6)) isActiveStep = true;
                  if (node.id === 'alb' && currentStep === 5) isActiveStep = true;
                  if (node.id === 'cloudwatch' && currentStep === 7) isActiveStep = true;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all relative overflow-hidden ${
                        isSelected
                          ? 'bg-slate-800/90 border-amber-400 shadow-md shadow-amber-500/10 scale-[1.02]'
                          : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-600'
                      } ${isActiveStep ? 'ring-2 ring-blue-400 animate-pulse' : ''}`}
                    >
                      {isActiveStep && (
                        <div className="absolute top-0 right-0 px-2 py-0.5 bg-blue-500 text-[10px] font-black uppercase text-white rounded-bl-lg">
                          Active
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{node.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-white">{node.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{node.awsService}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] border-t border-slate-700/50 pt-2 text-slate-300">
                        <span className="text-slate-400">{node.badge}</span>
                        <span className="text-cyan-400 font-semibold flex items-center gap-1">
                          Inspect <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Fargate Live Task Dashboard */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-blue-400" />
                    <span>Amazon ECS Fargate Tasks (Running Containers)</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">Desired: 2 Tasks</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Task Version 1 */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-300 font-bold">Image: v1.0 (Stable)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v1Tasks > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {v1Tasks} RUNNING
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Traffic: {trafficSplit.v1}%</span>
                      <span>Health: 200 OK</span>
                    </div>
                  </div>

                  {/* Task Version 2 */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-300 font-bold">Image: v2.0 (New)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v2Tasks > 0 ? 'bg-blue-950 text-blue-400 border border-blue-800 animate-pulse' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {v2Tasks} RUNNING
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Traffic: {trafficSplit.v2}%</span>
                      <span className={healthStatus === 'failed' ? 'text-rose-400 font-bold' : ''}>
                        Health: {healthStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Terminal Log */}
            <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 text-white font-mono text-xs shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-slate-200">Live Execution Terminal</span>
                </div>
                <span className="text-[11px] text-slate-500">Auto-scrolling</span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-600 select-none">{log.time}</span>
                    <span className={
                      log.type === 'success' ? 'text-emerald-400 font-medium' :
                      log.type === 'warn' ? 'text-amber-400 font-medium' :
                      log.type === 'error' ? 'text-rose-400 font-bold' :
                      log.type === 'cmd' ? 'text-cyan-300 font-semibold' :
                      'text-slate-300'
                    }>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Inspector Drawer */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedNode.icon}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{selectedNode.name}</h3>
                  <p className="text-xs text-blue-600 font-semibold">{selectedNode.awsService}</p>
                </div>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-bold">
                {selectedNode.badge}
              </span>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Service Responsibility</h5>
              <p className="text-sm text-slate-700 leading-relaxed">{selectedNode.role}</p>
            </div>

            {/* AWS CLI Quick Command */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">AWS CLI Command</h5>
                <span className="text-[10px] text-slate-400">Run in terminal</span>
              </div>
              <div className="bg-slate-900 text-cyan-300 p-3 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                <code>{selectedNode.cliCommand}</code>
              </div>
            </div>

            {/* Configuration Snippet */}
            <div>
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Infrastructure Configuration</h5>
              <div className="bg-slate-950 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] max-h-48 overflow-y-auto leading-relaxed border border-slate-800">
                <pre>{selectedNode.configSnippet}</pre>
              </div>
            </div>

            {/* Best Practice Callout */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>DevOps Security Best Practice</span>
              </div>
              <p className="text-blue-800 leading-relaxed">{selectedNode.bestPractice}</p>
            </div>

            {/* Cost Optimization Tip */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>AWS Cost Optimization Tip</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">{selectedNode.costTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTION YAML WORKFLOW */}
      {activeTab === 'yaml' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Production-Ready GitHub Actions AWS Deployment Workflow
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Zero hardcoded secret keys. Uses OpenID Connect (OIDC) to securely assume an AWS IAM Role.
              </p>
            </div>

            <button
              onClick={copyYamlToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto"
            >
              {copiedYaml ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedYaml ? 'Copied to Clipboard!' : 'Copy Workflow YAML'}</span>
            </button>
          </div>

          <div className="bg-slate-950 text-slate-200 p-6 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
            <pre>{productionWorkflowYaml}</pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-1">1. permissions: id-token: write</h4>
              <p className="text-slate-600 leading-relaxed">
                Allows GitHub Actions to mint a signed JWT token containing the branch and repository identity to present to AWS STS.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-1">2. No Access Keys Stored</h4>
              <p className="text-slate-600 leading-relaxed">
                Eliminates the danger of leaked AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY credentials permanently.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-1">3. wait-for-service-stability</h4>
              <p className="text-slate-600 leading-relaxed">
                Causes the pipeline job to pause and monitor ALB health check probes before considering the deployment successful.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AWS PRICING & ARCHITECTURE GUIDE */}
      {activeTab === 'cost' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              AWS Production Architecture & Cost Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Estimated monthly costs for running this CI/CD microservices stack on AWS Free Tier and Starter Production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase">Amazon ECS Fargate</div>
              <div className="text-2xl font-black text-slate-900 mt-2">$15 - $25<span className="text-xs font-normal text-slate-500">/mo</span></div>
              <p className="text-xs text-slate-600 mt-2">
                2 tasks (0.5 vCPU, 1GB RAM) running 24/7 across 2 Availability Zones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase">Application Load Balancer</div>
              <div className="text-2xl font-black text-slate-900 mt-2">$16 - $20<span className="text-xs font-normal text-slate-500">/mo</span></div>
              <p className="text-xs text-slate-600 mt-2">
                $0.0225/hr + LCU charges for SSL/TLS certificates and health routing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase">Amazon ECR & S3</div>
              <div className="text-2xl font-black text-slate-900 mt-2">$1 - $3<span className="text-xs font-normal text-slate-500">/mo</span></div>
              <p className="text-xs text-slate-600 mt-2">
                Storage for 10-20 container versions with lifecycle auto-cleanup.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="text-xs font-bold text-blue-700 uppercase">AWS STS & OIDC Auth</div>
              <div className="text-2xl font-black text-blue-900 mt-2">$0.00<span className="text-xs font-normal text-blue-700">/mo</span></div>
              <p className="text-xs text-blue-800 mt-2">
                100% Free! Unlimited OIDC token verification from GitHub Actions.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Cost Optimization Golden Rule for Learning & Practice</span>
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              When building your learning project from Lesson 19, keep your ECS service scaled to 0 tasks when you are not actively testing. Run <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">aws ecs update-service --desired-count 0</code> at the end of your study session to avoid idle compute billing!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
