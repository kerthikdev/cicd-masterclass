import React from 'react';
import { PipelineSimulator } from '../components/PipelineSimulator';
import { 
  Sparkles, 
  Terminal, 
  UtensilsCrossed, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface SimulatorPageProps {
  onBackToCourse: () => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onBackToCourse }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Laboratory</span>
          </div>
          <button
            onClick={onBackToCourse}
            className="text-xs text-slate-400 hover:text-cyan-300 font-mono flex items-center gap-1"
          >
            <span>Back to Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Visual CI/CD Pipeline Simulator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
          Test real automated deployment scenarios without risking production. Watch how code moves from a developer push through building, automated testing, Docker containerization, and AWS cloud deployment — all mapped stage-by-stage to the food ordering journey.
        </p>
      </div>

      {/* Simulator Component */}
      <PipelineSimulator />

      {/* Explanation Cards below simulator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-[#0e1628] border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">Quality Gates & Automated Checks</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Just like a kitchen manager halts orders when meat temperatures are substandard, a CI/CD pipeline immediately aborts if linting, unit tests, or security scans fail. Broken code never touches users.
          </p>
        </div>

        <div className="bg-[#0e1628] border border-amber-500/20 rounded-2xl p-6 shadow-xl">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit mb-4">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">Immutable Packaging (Docker)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sealing a burger in insulated foil guarantees it arrives with the exact temperature and taste intended. Similarly, Docker bundles code, OS libraries, and runtimes into a sealed container that behaves identically everywhere.
          </p>
        </div>

        <div className="bg-[#0e1628] border border-emerald-500/20 rounded-2xl p-6 shadow-xl">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">Zero-Downtime Releases</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            A restaurant doesn't close for hours just to update the menu. Modern CI/CD spins up new containers side-by-side, conducts health checks, and shifts traffic seamlessly before taking down old versions.
          </p>
        </div>
      </div>
    </div>
  );
};
