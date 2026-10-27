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
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive CI/CD Laboratory</span>
          </div>
          <button
            onClick={onBackToCourse}
            className="text-xs text-slate-500 hover:text-blue-600 font-bold font-mono flex items-center gap-1 transition-colors"
          >
            <span>Back to Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Visual CI/CD Pipeline Simulator
        </h1>
        <p className="text-slate-600 text-sm md:text-base mt-2 max-w-3xl leading-relaxed font-normal">
          Test real automated deployment scenarios without risking production. Watch how code moves from a developer push through building, automated testing, Docker containerization, and AWS cloud deployment — all mapped stage-by-stage to the food ordering journey.
        </p>
      </div>

      {/* Simulator Component */}
      <PipelineSimulator />

      {/* Explanation Cards below simulator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 w-fit mb-4 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-950 mb-2">Quality Gates & Automated Checks</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Just like a kitchen manager halts orders when meat temperatures are substandard, a CI/CD pipeline immediately aborts if linting, unit tests, or security scans fail. Broken code never touches users.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 w-fit mb-4 shadow-xs">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-950 mb-2">Immutable Packaging (Docker)</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Sealing a burger in insulated foil guarantees it arrives with the exact temperature and taste intended. Similarly, Docker bundles code, OS libraries, and runtimes into a sealed container that behaves identically everywhere.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit mb-4 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-950 mb-2">Zero-Downtime Releases</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            A restaurant doesn't close for hours just to update the menu. Modern CI/CD spins up new containers side-by-side, conducts health checks, and shifts traffic seamlessly before taking down old versions.
          </p>
        </div>
      </div>
    </div>
  );
};
