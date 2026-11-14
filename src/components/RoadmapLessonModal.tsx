import React, { useState } from 'react';
import { RoadmapLessonDetail } from '../data/packetTracerLessonContent';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles, 
  Terminal, 
  AlertTriangle, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';

interface RoadmapLessonModalProps {
  lesson: RoadmapLessonDetail;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const RoadmapLessonModal: React.FC<RoadmapLessonModalProps> = ({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  onPrevLesson,
  onNextLesson,
  hasPrev = false,
  hasNext = false,
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [hasAnsweredQuiz, setHasAnsweredQuiz] = useState(false);

  // Reset quiz state when lesson changes
  React.useEffect(() => {
    setSelectedQuizAnswer(null);
    setHasAnsweredQuiz(false);
    setCopiedPrompt(false);
    setCopiedSnippetIndex(null);
  }, [lesson.id]);

  if (!isOpen) return null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSelectQuiz = (idx: number) => {
    if (hasAnsweredQuiz) return;
    setSelectedQuizAnswer(idx);
    setHasAnsweredQuiz(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            MODAL HEADER
            ========================================================================= */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {lesson.phaseTitle}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              lesson.difficulty === 'Beginner'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : lesson.difficulty === 'Intermediate'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {lesson.difficulty}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ⏱️ {lesson.estimatedReadTime} read
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Close Lesson"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            MODAL BODY CONTENT (SCROLLABLE)
            ========================================================================= */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-800 text-sm leading-relaxed">
          {/* Lesson Title & Overview */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
              {lesson.title}
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
              {lesson.overview}
            </p>
          </div>

          {/* Mental Model & Real-World Analogy */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-amber-100/40 border border-amber-200/90 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-amber-900 font-black text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Mental Model: {lesson.mentalModelAnalogy.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-normal">
              {lesson.mentalModelAnalogy.description}
            </p>
          </div>

          {/* Deep Dive Sections with Explanations & Code Snippets */}
          <div className="space-y-6">
            {lesson.deepDiveSections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <span className="text-blue-600 font-mono text-sm">#{idx + 1}</span>
                  <span>{sec.heading}</span>
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-normal">
                  {sec.content}
                </div>

                {sec.codeSnippet && (
                  <div className="mt-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs shadow-md">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                      <span>{sec.codeSnippet.title}</span>
                      <button
                        onClick={() => handleCopyCode(sec.codeSnippet!.code, idx)}
                        className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                        title="Copy code snippet"
                      >
                        {copiedSnippetIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold text-[10px]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 font-mono text-xs overflow-x-auto text-emerald-300 selection:bg-emerald-900 leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hands-On Lab Exercise Card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Hands-On Exercise: {lesson.handsOnLab.labTitle}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Interactive Lab
              </span>
            </div>

            {/* Prerequisites */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Prerequisites:
              </span>
              <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                {lesson.handsOnLab.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Step by Step */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Lab Instructions:
              </span>
              <ol className="list-decimal pl-5 text-xs text-slate-200 space-y-1.5">
                {lesson.handsOnLab.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>

            {/* AI Prompt Box */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-indigo-300">
                  AI Agent Execution Prompt (Copy & Paste):
                </span>
                <button
                  onClick={() => handleCopyPrompt(lesson.handsOnLab.aiPrompt)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-colors shadow-xs"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-900/50 text-indigo-200 font-mono text-xs leading-relaxed select-all">
                {lesson.handsOnLab.aiPrompt}
              </div>
            </div>

            {/* Expected Outcome */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs">
              <strong className="font-bold text-emerald-200">Expected Outcome: </strong>
              <span>{lesson.handsOnLab.expectedOutcome}</span>
            </div>
          </div>

          {/* Troubleshooting Tips */}
          {lesson.troubleshootingTips && lesson.troubleshootingTips.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Common Gotchas & Troubleshooting</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-rose-900/90 space-y-1">
                {lesson.troubleshootingTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Knowledge Check Quiz */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Milestone Knowledge Check</span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              {lesson.knowledgeQuiz.question}
            </p>

            <div className="space-y-2">
              {lesson.knowledgeQuiz.options.map((opt, oIdx) => {
                const isSelected = selectedQuizAnswer === oIdx;
                const isCorrect = oIdx === lesson.knowledgeQuiz.correctIndex;

                let optClass = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400';
                if (hasAnsweredQuiz) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                  } else {
                    optClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectQuiz(oIdx)}
                    disabled={hasAnsweredQuiz}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt}</span>
                    {hasAnsweredQuiz && isCorrect && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {hasAnsweredQuiz && (
              <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                selectedQuizAnswer === lesson.knowledgeQuiz.correctIndex
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}>
                <strong>
                  {selectedQuizAnswer === lesson.knowledgeQuiz.correctIndex
                    ? '🎉 Correct! '
                    : '💡 Explanation: '}
                </strong>
                <span>{lesson.knowledgeQuiz.explanation}</span>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            MODAL FOOTER (PREV / NEXT / ACTIONS)
            ========================================================================= */}
        <div className="sticky bottom-0 z-20 bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={onPrevLesson}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              hasPrev
                ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs'
                : 'text-slate-300 border border-slate-100 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Milestone</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <button
            onClick={onToggleComplete}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Mark as Incomplete' : 'Complete & Continue'}</span>
          </button>

          <button
            onClick={onNextLesson}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              hasNext
                ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs'
                : 'text-slate-300 border border-slate-100 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="hidden sm:inline">Next Milestone</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
