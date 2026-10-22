import React from 'react';
import { LessonSection } from '../content/lessons';
import { CodeBlock } from './CodeBlock';
import { QuizCard } from './QuizCard';
import { 
  CheckCircle, 
  UtensilsCrossed, 
  Lightbulb, 
  AlertTriangle, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ArrowRight,
  Flame,
  Info
} from 'lucide-react';

interface SectionRendererProps {
  section: LessonSection;
  savedAnswers: Record<string, { selected: number; isCorrect: boolean }>;
  onAnswerQuiz: (questionId: string, selected: number, isCorrect: boolean) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  savedAnswers,
  onAnswerQuiz,
}) => {
  switch (section.type) {
    case 'objectives':
      return (
        <div className="bg-gradient-to-br from-cyan-950/40 to-slate-900/60 border border-cyan-500/25 rounded-2xl p-6 my-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Learning Goals</span>
              <h3 className="text-lg font-bold text-slate-100">{section.title || 'What You Will Learn'}</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {section.items?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-slate-900/60 border border-cyan-500/10 p-3 rounded-xl text-slate-300 text-sm">
                <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'analogy':
      return (
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/30 via-slate-900 to-orange-950/20 border-2 border-amber-500/30 rounded-2xl p-6 my-6 shadow-2xl">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 text-8xl pointer-events-none select-none">
            🍔
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">Mental Model & Analogy</span>
              <h3 className="text-xl font-bold text-amber-100 flex items-center gap-2">
                {section.title || '🍔 The Food Ordering Analogy'}
              </h3>
            </div>
          </div>
          <div className="text-slate-200 text-sm md:text-base leading-relaxed space-y-3 prose prose-invert max-w-none">
            {section.content?.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );

    case 'analogy-table':
    case 'comparison-table':
      return (
        <div className="my-6 rounded-2xl border border-cyan-500/20 overflow-hidden shadow-xl bg-[#0d1321]">
          {section.title && (
            <div className="px-6 py-4 bg-slate-900 border-b border-cyan-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h4 className="font-semibold text-slate-100 text-sm md:text-base">{section.title}</h4>
              </div>
              <span className="text-xs text-cyan-400 font-mono">Stage by Stage Comparison</span>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900/80 border-b border-cyan-500/10">
                  {section.headers?.map((header, idx) => (
                    <th key={idx} className="py-3 px-5 text-cyan-300 font-semibold text-xs uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {section.rows?.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-cyan-950/20 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-3.5 px-5 text-slate-300 align-top leading-relaxed">
                        {cellIdx === 0 && <span className="font-medium text-amber-300/90">{cell}</span>}
                        {cellIdx === 1 && <span className="font-mono text-cyan-200 text-xs md:text-sm">{cell}</span>}
                        {cellIdx > 1 && <span>{cell}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'deep-dive':
      return (
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-cyan-950/30 border border-indigo-500/30 rounded-2xl p-6 my-6 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <Lightbulb className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">Technical Deep Dive</span>
              <h3 className="text-lg font-bold text-slate-100">{section.title}</h3>
            </div>
          </div>
          <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-3">
            {section.content?.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      );

    case 'visual':
      return (
        <div className="bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-6 my-6 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3 text-cyan-400">
            <Layers className="w-4 h-4" />
            <h4 className="font-bold text-sm uppercase tracking-wider font-mono">{section.title || 'Pipeline Architecture'}</h4>
          </div>
          <div className="p-4 bg-[#0a0e1a] rounded-xl border border-cyan-500/10 font-mono text-sm text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
            {section.content}
          </div>
        </div>
      );

    case 'code':
      return (
        <div className="my-5">
          {section.title && (
            <h4 className="text-sm font-semibold text-slate-300 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              {section.title}
            </h4>
          )}
          <CodeBlock code={section.code || ''} language={section.language} title={section.title} />
        </div>
      );

    case 'code-explanation':
      return (
        <div className="bg-slate-900/70 border border-cyan-500/15 rounded-xl p-5 my-4">
          <h4 className="font-semibold text-slate-200 text-sm mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            {section.title || 'Code Breakdown'}
          </h4>
          {section.content && <p className="text-sm text-slate-300 mb-3 leading-relaxed">{section.content}</p>}
          {section.items && (
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                  <span className="text-cyan-400 font-bold shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'mistakes':
      return (
        <div className="bg-gradient-to-r from-rose-950/30 to-slate-900 border border-rose-500/30 rounded-2xl p-6 my-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">Common Pitfalls</span>
              <h3 className="text-lg font-bold text-rose-100">{section.title || 'Mistakes to Avoid'}</h3>
            </div>
          </div>
          {section.content && <p className="text-sm text-slate-300 mb-3">{section.content}</p>}
          {section.items && (
            <div className="space-y-2.5">
              {section.items.map((mistake, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-rose-500/10 text-xs md:text-sm text-slate-300">
                  <Flame className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'exercise':
      return (
        <div className="bg-gradient-to-br from-emerald-950/30 via-slate-900 to-teal-950/20 border border-emerald-500/30 rounded-2xl p-6 my-6 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">Hands-on Challenge</span>
              <h3 className="text-lg font-bold text-emerald-100">{section.title || 'Practice Exercise'}</h3>
            </div>
          </div>
          <div className="text-sm text-slate-300 leading-relaxed space-y-2">
            {section.content?.split('\n\n').map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      );

    case 'quiz':
      return (
        <div className="my-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              {section.title || 'Knowledge Check'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">Test your comprehension</span>
          </div>
          {section.quizQuestions?.map((q) => (
            <QuizCard
              key={q.id}
              question={q}
              savedAnswer={savedAnswers[q.id]}
              onAnswer={onAnswerQuiz}
            />
          ))}
        </div>
      );

    case 'summary':
      return (
        <div className="bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-6 my-6 shadow-xl">
          <div className="flex items-center gap-2.5 mb-4 text-cyan-400">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-100">{section.title || 'Key Takeaways'}</h3>
          </div>
          <div className="space-y-2.5">
            {section.items?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5">
                  {idx + 1}
                </div>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'next-preview':
      return (
        <div className="bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-500/20 rounded-2xl p-5 my-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Coming Up Next</span>
            <p className="text-sm font-medium text-slate-200 mt-1">{section.content}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-cyan-400 shrink-0 ml-4 animate-pulse" />
        </div>
      );

    case 'explanation':
    default:
      return (
        <div className="my-6">
          {section.title && (
            <h3 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2.5">
              <span className="w-1.5 h-6 rounded bg-gradient-to-b from-cyan-400 to-blue-500 inline-block"></span>
              {section.title}
            </h3>
          )}
          <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-4">
            {section.content?.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );
  }
};
