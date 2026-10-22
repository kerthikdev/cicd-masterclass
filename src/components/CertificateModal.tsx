import React, { useState } from 'react';
import { Award, X, Download, Share2, CheckCircle2, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateName: (name: string) => void;
  percentComplete: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateName,
  percentComplete,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  if (!isOpen) return null;

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b101e] border-2 border-cyan-500/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 z-10 bg-slate-900/80 p-2 rounded-full border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12 relative bg-gradient-to-br from-[#0c1427] via-[#090d18] to-[#121c35]">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none"></div>

          <div className="text-center max-w-xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 shadow-xl shadow-cyan-500/10">
              <Award className="w-12 h-12 text-cyan-400" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold block mb-1">
                Certificate of Completion
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
                CI/CD & DevOps Engineering Masterclass
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                From Food Ordering Analogy to Production Cloud Deployment
              </p>
            </div>

            <div className="py-2 border-y border-cyan-500/20">
              <span className="text-xs text-slate-400 uppercase tracking-widest block mb-2">This certifies that</span>
              {editingName ? (
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-slate-900 border border-cyan-500 px-3 py-1 rounded text-lg font-bold text-cyan-300 text-center"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      onUpdateName(tempName);
                      setEditingName(false);
                    }}
                    className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h3
                  onClick={() => setEditingName(true)}
                  className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 cursor-pointer hover:underline"
                  title="Click to edit your name"
                >
                  {userName} ✎
                </h3>
              )}
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Has successfully mastered all 20 modules covering Continuous Integration, Continuous Delivery,
              Docker Containerization, AWS ECS Deployments, Pipeline Failures, and Zero-Downtime Releases.
            </p>

            <div className="flex items-center justify-between text-left pt-4 border-t border-slate-800 text-xs text-slate-400">
              <div>
                <span className="block text-[10px] uppercase text-slate-500">Issued On</span>
                <span className="font-mono text-slate-300">{dateStr}</span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] uppercase text-slate-500">Status</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {percentComplete}% Completed
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase text-slate-500">Credential ID</span>
                <span className="font-mono text-slate-300">CICD-2026-FOD-884</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-sm rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Save / Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
