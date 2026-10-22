import React from 'react';
import { AwsArchitectureSimulator } from '../components/AwsArchitectureSimulator';
import { 
  Cloud, 
  ArrowRight, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Server,
  Sparkles
} from 'lucide-react';

interface AwsSimulatorPageProps {
  onBackToCourse: () => void;
  onOpenPresentation?: () => void;
}

export const AwsSimulatorPage: React.FC<AwsSimulatorPageProps> = ({ 
  onBackToCourse,
  onOpenPresentation
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 space-y-10">
      {/* Header Breadcrumbs & Title */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <Cloud className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive AWS Cloud Architecture Lab</span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenPresentation && (
              <button
                onClick={onOpenPresentation}
                className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
              >
                <span>📽️ View AWS Slide 16</span>
              </button>
            )}
            <button
              onClick={onBackToCourse}
              className="text-xs text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-1"
            >
              <span>Back to Overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AWS Cloud Architecture & Deployment Simulator
        </h1>
        <p className="text-slate-600 text-sm md:text-base mt-2 max-w-4xl leading-relaxed">
          Experience how real-world engineering teams deploy modern containerized applications to <span className="font-semibold text-slate-900">Amazon Web Services (AWS)</span> with zero downtime. Test OpenID Connect (OIDC) token exchanges, Amazon ECR container pushes, ECS Fargate rolling updates, Application Load Balancer health routing, and automatic CloudWatch rollbacks.
        </p>
      </div>

      {/* Main Interactive Simulator Canvas */}
      <AwsArchitectureSimulator />

      {/* Educational Deep Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Zero-Secret OIDC Federation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Storing permanent AWS Access Keys in repository secrets is a severe security risk. With OIDC, GitHub mints a short-lived cryptographically signed token that AWS STS verifies in milliseconds.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Serverless Fargate Rolling Updates</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Amazon ECS launches your new container tasks side-by-side with running instances. Traffic is only redirected once health check probes return HTTP 200 OK across all availability zones.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Automated CloudWatch Rollback</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If a deployment causes a spike in 5XX error responses or fails health probes, CloudWatch metric alarms trigger an instant automatic rollback to the previous task definition without human intervention.
          </p>
        </div>
      </div>
    </div>
  );
};
