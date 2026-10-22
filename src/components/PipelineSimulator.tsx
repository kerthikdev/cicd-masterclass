import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Sparkles, 
  UtensilsCrossed, 
  Code2, 
  ChevronRight,
  ShieldAlert,
  Server,
  Layers,
  Flame
} from 'lucide-react';

export interface Stage {
  id: string;
  name: string;
  foodName: string;
  foodIcon: string;
  codeIcon: string;
  durationMs: number;
  foodDescription: string;
  codeDescription: string;
  softwareLog: string[];
  foodLog: string[];
}

const STAGES: Stage[] = [
  {
    id: 'trigger',
    name: '1. Event Trigger',
    foodName: '1. Order Placed',
    foodIcon: '📱',
    codeIcon: '⚡',
    durationMs: 1200,
    foodDescription: 'Customer places burger order on Swiggy/Zomato. Restaurant POS chimes immediately.',
    codeDescription: 'Developer runs `git push origin main`. GitHub webhook notifies CI runner.',
    foodLog: [
      '[12:00:01] 🛎️ New Order #4892 received from App',
      '[12:00:01] Order Items: 1x Deluxe Cheese Burger, 1x Crispy Fries',
      '[12:00:02] Order pushed to Kitchen Display System (KDS)',
      '[12:00:02] ✅ Kitchen Station #3 accepted order'
    ],
    softwareLog: [
      '[12:00:01] git push origin main [commit 8f2a1c: "feat: add payment retry logic"]',
      '[12:00:01] Webhook triggered: event="push", ref="refs/heads/main"',
      '[12:00:02] GitHub Actions runner provisioned: ubuntu-latest (4 vCPU, 16GB RAM)',
      '[12:00:02] ✅ Workflow "Deploy Production" started'
    ]
  },
  {
    id: 'lint',
    name: '2. Lint & Validate',
    foodName: '2. Order & Ingredient Check',
    foodIcon: '📋',
    codeIcon: '🔍',
    durationMs: 1400,
    foodDescription: 'Kitchen manager checks bun, patty, cheese inventory and verifies recipe parameters.',
    codeDescription: 'ESLint and Prettier inspect code formatting, typing, and syntax errors.',
    foodLog: [
      '[12:00:03] Checking inventory: Brioche buns (IN STOCK)',
      '[12:00:03] Checking inventory: Grass-fed patty (IN STOCK)',
      '[12:00:04] Checking allergens checklist: dairy verified',
      '[12:00:04] ✅ All recipe ingredients verified and reserved'
    ],
    softwareLog: [
      '[12:00:03] Running eslint --ext .ts,.tsx src/',
      '[12:00:03] Checking formatting with prettier --check "src/**/*.{ts,tsx}"',
      '[12:00:04] TypeScript compiler check: tsc --noEmit',
      '[12:00:04] ✅ 0 errors, 0 warnings found. Code style compliant'
    ]
  },
  {
    id: 'build',
    name: '3. Application Build',
    foodName: '3. Kitchen Preparation',
    foodIcon: '🍳',
    codeIcon: '⚙️',
    durationMs: 1800,
    foodDescription: 'Chefs grill the patty to 160°F, toast buns, layer toppings, and melt cheese.',
    codeDescription: 'Bundler (Vite / Webpack) compiles TS into minified, optimized JS & CSS assets.',
    foodLog: [
      '[12:00:05] Heating grill to 375°F',
      '[12:00:06] Searing patty: internal temperature 165°F reached',
      '[12:00:06] Toasting sesame brioche bun for 45s',
      '[12:00:07] Assembling: patty + cheddar + secret sauce + lettuce',
      '[12:00:07] ✅ Deluxe Burger assembled and hot on the counter'
    ],
    softwareLog: [
      '[12:00:05] Installing dependencies: npm ci --prefer-offline',
      '[12:00:06] Compiling React 18 frontend + Node.js backend',
      '[12:00:06] Bundling modules: 142 chunks processed in 1.4s',
      '[12:00:07] Minifying assets: dist/assets/index-D8f2.js (148 kB gzip)',
      '[12:00:07] ✅ Build artifact compiled successfully into ./dist'
    ]
  },
  {
    id: 'test',
    name: '4. Automated Testing',
    foodName: '4. Taste & Hygiene Check',
    foodIcon: '🔬',
    codeIcon: '🧪',
    durationMs: 1600,
    foodDescription: 'Manager tastes sample batch, checks thermometer, ensures no hair or contamination.',
    codeDescription: 'Automated Unit tests (Jest), Integration tests (Supertest), and Security scans run.',
    foodLog: [
      '[12:00:08] Quality Control: Thermometer probe reading 168°F (PASS)',
      '[12:00:08] Weight test: 320 grams target +/- 5g (PASS: 322g)',
      '[12:00:09] Visual inspection: Sauce distribution uniform (PASS)',
      '[12:00:09] ✅ Quality Inspection passed. Food certified safe and delicious'
    ],
    softwareLog: [
      '[12:00:08] Executing test suite: npm test',
      '[12:00:08] PASS src/tests/auth.test.ts (8 tests passed)',
      '[12:00:09] PASS src/tests/payments.test.ts (14 tests passed)',
      '[12:00:09] PASS src/tests/order-flow.integration.ts (6 tests passed)',
      '[12:00:09] ✅ Test Results: 28/28 passed (100% coverage on critical paths)'
    ]
  },
  {
    id: 'package',
    name: '5. Container Packaging',
    foodName: '5. Thermal Packaging',
    foodIcon: '📦',
    codeIcon: '🐳',
    durationMs: 1600,
    foodDescription: 'Burger sealed inside tamper-proof foil and thermal insulated box to keep it fresh.',
    codeDescription: 'Docker builds lightweight container image and tags it into Amazon ECR / Docker Hub.',
    foodLog: [
      '[12:00:10] Wrapping burger in gold-foil insulation wrap',
      '[12:00:10] Sealing tamper-evident safety sticker: #STK-9921',
      '[12:00:11] Placing into thermal delivery pouch with receipt attached',
      '[12:00:11] ✅ Package sealed, barcode scanned, ready for driver pickup'
    ],
    softwareLog: [
      '[12:00:10] docker build -t food-app:v2.4.1 .',
      '[12:00:10] Step 1/8: FROM node:20-alpine (Layer cached)',
      '[12:00:11] Step 5/8: COPY ./dist /usr/share/nginx/html',
      '[12:00:11] docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/food-app:v2.4.1',
      '[12:00:11] ✅ Sealed image digest: sha256:4a8b... stored in registry'
    ]
  },
  {
    id: 'deploy',
    name: '6. Live Deployment',
    foodName: '6. Rider Dispatched',
    foodIcon: '🛵',
    codeIcon: '🚀',
    durationMs: 1800,
    foodDescription: 'Delivery driver navigates to destination address with turn-by-turn GPS tracking.',
    codeDescription: 'AWS ECS initiates rolling update: starts new container tasks and routes traffic.',
    foodLog: [
      '[12:00:12] Driver Alex assigned to Order #4892 (Vehicle: EV Scooter)',
      '[12:00:12] Route calculated: 2.4 km, estimated transit time 8 mins',
      '[12:00:13] In transit: 500m away from customer location',
      '[12:00:13] ✅ Driver arrived outside customer building'
    ],
    softwareLog: [
      '[12:00:12] aws ecs update-service --cluster prod --service web --task-definition web:24',
      '[12:00:12] Rolling deployment: Launching 2 new container tasks (v2.4.1)',
      '[12:00:13] Target Group: new tasks registered with Application Load Balancer',
      '[12:00:13] ✅ Traffic shifted 100% to v2.4.1. Old tasks gracefully terminated'
    ]
  },
  {
    id: 'health',
    name: '7. Health Verification',
    foodName: '7. Customer Confirms',
    foodIcon: '😋',
    codeIcon: '💚',
    durationMs: 1400,
    foodDescription: 'Customer receives hot meal, takes first bite, and gives 5-star rating on the app.',
    codeDescription: 'Automated synthetic probe hits `/health`, confirms HTTP 200, metrics report green.',
    foodLog: [
      '[12:00:14] Doorbell rung, OTP #8412 verified by customer',
      '[12:00:14] Package handed over in pristine condition',
      '[12:00:15] Customer review received: ⭐⭐⭐⭐⭐ "Super fast and piping hot!"',
      '[12:00:15] 🎉 ORDER LIFECYCLE COMPLETE: Total elapsed 14 minutes'
    ],
    softwareLog: [
      '[12:00:14] HTTP GET https://app.company.com/health',
      '[12:00:14] Response: HTTP 200 OK (Latency: 14ms, DB Pool: healthy)',
      '[12:00:15] Datadog / CloudWatch metrics: 0 error rate, CPU 12%',
      '[12:00:15] 🎉 DEPLOYMENT SUCCESSFUL: Zero-downtime release completed'
    ]
  }
];

export const PipelineSimulator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'both' | 'code' | 'food'>('both');
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(-1);
  const [stageStatuses, setStageStatuses] = useState<('idle' | 'running' | 'success' | 'failed')[]>(
    new Array(STAGES.length).fill('idle')
  );
  const [isRunning, setIsRunning] = useState(false);
  const [failureType, setFailureType] = useState<'none' | 'build' | 'test' | 'deploy'>('none');
  const [logs, setLogs] = useState<{ text: string; mode: 'software' | 'food' | 'system'; timestamp: string }[]>([]);
  const [selectedStageForDetails, setSelectedStageForDetails] = useState<number>(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, mode: 'software' | 'food' | 'system') => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { text, mode, timestamp: time }]);
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setCurrentStageIdx(-1);
    setStageStatuses(new Array(STAGES.length).fill('idle'));
    setLogs([
      {
        text: 'Ready to run pipeline simulation. Click "Run Successful Pipeline" or simulate a failure.',
        mode: 'system',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const runSimulation = async (failAt: 'none' | 'build' | 'test' | 'deploy' = 'none') => {
    if (isRunning) return;
    setIsRunning(true);
    setFailureType(failAt);
    setLogs([]);
    setStageStatuses(new Array(STAGES.length).fill('idle'));

    addLog(`🚀 Pipeline initiated! Target mode: [${activeMode.toUpperCase()}]`, 'system');
    if (failAt !== 'none') {
      addLog(`⚠️ SIMULATING INTENTIONAL FAILURE AT STAGE: [${failAt.toUpperCase()}]`, 'system');
    }

    for (let i = 0; i < STAGES.length; i++) {
      setCurrentStageIdx(i);
      setSelectedStageForDetails(i);

      setStageStatuses((prev) => {
        const next = [...prev];
        next[i] = 'running';
        return next;
      });

      const stage = STAGES[i];

      // Stream logs for this stage
      for (const log of stage.softwareLog) {
        addLog(log, 'software');
        await new Promise((r) => setTimeout(r, 180));
      }
      for (const log of stage.foodLog) {
        addLog(log, 'food');
        await new Promise((r) => setTimeout(r, 180));
      }

      // Check if we should fail here
      const shouldFail =
        (failAt === 'build' && stage.id === 'build') ||
        (failAt === 'test' && stage.id === 'test') ||
        (failAt === 'deploy' && stage.id === 'deploy');

      if (shouldFail) {
        setStageStatuses((prev) => {
          const next = [...prev];
          next[i] = 'failed';
          return next;
        });

        if (failAt === 'build') {
          addLog('❌ FATAL BUILD ERROR: Module not found "missing-dep". Compilation aborted.', 'software');
          addLog('❌ KITCHEN ERROR: Chef burned the patties. Smoke alarm triggered. Kitchen halted.', 'food');
        } else if (failAt === 'test') {
          addLog('❌ TEST SUITE FAILED: Expected status 200 but received 500 on /api/orders', 'software');
          addLog('❌ HYGIENE INSPECTION FAILED: Internal food temperature under 140°F. Batch rejected.', 'food');
        } else if (failAt === 'deploy') {
          addLog('❌ DEPLOYMENT FAILED: ECS task crashed on boot: Out of Memory (OOM). Triggering auto-rollback!', 'software');
          addLog('❌ DELIVERY FAILED: Delivery vehicle broke down mid-route. Dispatching backup driver.', 'food');
        }

        addLog(`🛑 Pipeline failed at stage: ${stage.name}. Halting execution to prevent bad delivery.`, 'system');
        setIsRunning(false);
        return;
      }

      // Mark success
      setStageStatuses((prev) => {
        const next = [...prev];
        next[i] = 'success';
        return next;
      });

      await new Promise((r) => setTimeout(r, 300));
    }

    addLog('🎉 PIPELINE COMPLETED SUCCESSFULLY! All quality gates passed.', 'system');
    setIsRunning(false);
  };

  const selectedStage = STAGES[selectedStageForDetails];

  return (
    <div className="bg-[#0b101d] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl my-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2 mt-1">
            CI/CD Pipeline Simulator
            <span className="text-sm font-normal text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              🍔 Food Delivery Dual-Engine
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Watch code move through every automated gate alongside the food ordering journey.
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex items-center bg-[#070b14] p-1 rounded-xl border border-cyan-500/20 text-xs">
          <button
            onClick={() => setActiveMode('both')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeMode === 'both' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🍔 Dual Analogy View
          </button>
          <button
            onClick={() => setActiveMode('code')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeMode === 'code' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            💻 Software Only
          </button>
          <button
            onClick={() => setActiveMode('food')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeMode === 'food' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🍔 Food Only
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center gap-3 py-5 border-b border-cyan-500/10">
        <button
          onClick={() => runSimulation('none')}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-sm rounded-xl hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Run Successful Pipeline</span>
        </button>

        <button
          onClick={() => runSimulation('test')}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2.5 bg-rose-950/40 text-rose-300 border border-rose-500/40 hover:bg-rose-900/40 text-xs md:text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Simulate Test Failure</span>
        </button>

        <button
          onClick={() => runSimulation('build')}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-950/40 text-amber-300 border border-amber-500/40 hover:bg-amber-900/40 text-xs md:text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Simulate Build Error</span>
        </button>

        <button
          onClick={resetPipeline}
          disabled={isRunning}
          className="flex items-center gap-2 px-3 py-2.5 text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 text-xs rounded-xl ml-auto hover:border-slate-700 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Visual Pipeline Pipeline Track */}
      <div className="py-6 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[780px] justify-between relative">
          {STAGES.map((stage, idx) => {
            const status = stageStatuses[idx];
            const isCurrent = currentStageIdx === idx;
            const isSelected = selectedStageForDetails === idx;

            let borderStyle = 'border-slate-800 bg-[#0e1626]';
            let statusBadge = <span className="text-slate-500 text-xs">Waiting</span>;

            if (status === 'running') {
              borderStyle = 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/40 animate-pulse';
              statusBadge = <span className="text-cyan-400 text-xs flex items-center gap-1"><Clock className="w-3 h-3 animate-spin" /> In Progress</span>;
            } else if (status === 'success') {
              borderStyle = 'border-emerald-500 bg-emerald-950/30';
              statusBadge = <span className="text-emerald-400 text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Passed</span>;
            } else if (status === 'failed') {
              borderStyle = 'border-rose-500 bg-rose-950/40 ring-2 ring-rose-500/50';
              statusBadge = <span className="text-rose-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Failed</span>;
            }

            return (
              <React.Fragment key={stage.id}>
                <div
                  onClick={() => setSelectedStageForDetails(idx)}
                  className={`flex-1 min-w-[110px] cursor-pointer rounded-xl border p-3 transition-all relative ${borderStyle} ${
                    isSelected ? 'shadow-lg shadow-cyan-500/20 scale-105' : 'hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">
                      {activeMode === 'food' ? stage.foodIcon : activeMode === 'code' ? stage.codeIcon : `${stage.foodIcon} ${stage.codeIcon}`}
                    </span>
                    {statusBadge}
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate">
                    {activeMode === 'food' ? stage.foodName : stage.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {activeMode === 'food' ? 'Food Check' : 'Automation Step'}
                  </div>
                </div>

                {idx < STAGES.length - 1 && (
                  <div className="text-slate-600 shrink-0">
                    <ChevronRight className={`w-4 h-4 ${stageStatuses[idx] === 'success' ? 'text-emerald-400' : ''}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Inspector & Live Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        {/* Stage Insight Card */}
        <div className="lg:col-span-5 bg-[#0e1626] border border-cyan-500/15 rounded-xl p-5">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/10 mb-4">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Stage Inspector: Step {selectedStageForDetails + 1}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono">
              {stageStatuses[selectedStageForDetails].toUpperCase()}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
            <span>{selectedStage.foodIcon}</span>
            <span>{selectedStage.name}</span>
          </h3>

          <div className="space-y-4 text-xs md:text-sm">
            {(activeMode === 'both' || activeMode === 'code') && (
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-xs mb-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Software DevOps Pipeline</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{selectedStage.codeDescription}</p>
              </div>
            )}

            {(activeMode === 'both' || activeMode === 'food') && (
              <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-500/20">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs mb-1">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>🍔 Food Ordering Parallel</span>
                </div>
                <p className="text-amber-200/90 leading-relaxed">{selectedStage.foodDescription}</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Terminal Logs */}
        <div className="lg:col-span-7 bg-[#070b14] border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[280px]">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-semibold text-slate-300">CI/CD Runner Output & Delivery Log</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono text-emerald-400">STREAMING</span>
            </div>
          </div>

          <div
            ref={logContainerRef}
            className="p-4 overflow-y-auto font-mono text-xs space-y-1.5 flex-1 bg-[#070b14] text-slate-300 leading-relaxed"
          >
            {logs.length === 0 ? (
              <div className="text-slate-600 italic py-8 text-center">
                Terminal ready. Start a pipeline run to observe live execution stream...
              </div>
            ) : (
              logs.map((log, idx) => {
                let color = 'text-slate-300';
                if (log.text.includes('✅') || log.text.includes('PASS') || log.text.includes('SUCCESSFUL')) {
                  color = 'text-emerald-400 font-semibold';
                } else if (log.text.includes('❌') || log.text.includes('FAILED') || log.text.includes('ERROR')) {
                  color = 'text-rose-400 font-bold';
                } else if (log.text.includes('⚠️') || log.text.includes('HALT')) {
                  color = 'text-amber-400 font-semibold';
                } else if (log.mode === 'food') {
                  color = 'text-amber-200';
                } else if (log.mode === 'system') {
                  color = 'text-cyan-400 font-medium';
                }

                return (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none text-[10px] shrink-0">{log.timestamp}</span>
                    <span className={color}>{log.text}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
