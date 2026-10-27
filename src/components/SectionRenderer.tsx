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
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 my-6 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">Learning Goals</span>
              <h3 className="text-lg font-extrabold text-slate-950">{section.title || 'What You Will Learn'}</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {section.items?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-white border border-blue-200/80 p-3.5 rounded-xl text-slate-800 text-sm font-medium shadow-xs">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'analogy':
      return (
        <div className="relative overflow-hidden bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 my-6 shadow-sm">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-15 text-8xl pointer-events-none select-none">
            🍔
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">Mental Model & Food Analogy</span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-2">
                {section.title || '🍔 The Food Ordering Analogy'}
              </h3>
            </div>
          </div>
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-3 font-normal max-w-none">
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
        <div className="my-6 rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          {section.title && (
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">{section.title}</h4>
              </div>
              <span className="text-xs text-blue-700 font-mono font-semibold">Stage by Stage Comparison</span>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 font-mono font-bold text-slate-800">
                  {section.headers?.map((header, idx) => (
                    <th key={idx} className="py-3 px-5 text-slate-900 font-bold text-xs uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {section.rows?.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-3.5 px-5 text-slate-800 align-top leading-relaxed font-medium">
                        {cellIdx === 0 && <span className="font-bold text-amber-900">{cell}</span>}
                        {cellIdx === 1 && <span className="font-mono text-blue-700 font-semibold text-xs sm:text-sm">{cell}</span>}
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
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-6 sm:p-8 my-6 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700">Technical Deep Dive</span>
              <h3 className="text-lg sm:text-xl font-black text-slate-950">{section.title}</h3>
            </div>
          </div>
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
            {section.content?.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      );

    case 'visual':
      return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 my-6 shadow-md text-slate-200">
          <div className="flex items-center gap-2.5 mb-3 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
            <Layers className="w-4 h-4" />
            <h4>{section.title || 'Pipeline Architecture Visual'}</h4>
          </div>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-sm text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
            {section.content}
          </div>
        </div>
      );

    case 'code':
      return (
        <div className="my-5">
          {section.title && (
            <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>{section.title}</span>
            </h4>
          )}
          <CodeBlock code={section.code || ''} language={section.language} title={section.title} />
        </div>
      );

    case 'code-explanation':
      return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-4 shadow-xs">
          <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span>{section.title || 'Code Breakdown'}</span>
          </h4>
          {section.content && <p className="text-sm text-slate-700 mb-3 leading-relaxed font-normal">{section.content}</p>}
          {section.items && (
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <span className="text-blue-600 font-bold shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'mistakes':
      return (
        <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 my-6 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700">Common Pitfalls</span>
              <h3 className="text-lg font-black text-rose-950">{section.title || 'Mistakes to Avoid'}</h3>
            </div>
          </div>
          {section.content && <p className="text-sm text-slate-700 mb-3 font-normal">{section.content}</p>}
          {section.items && (
            <div className="space-y-2.5">
              {section.items.map((mistake, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-rose-200 text-xs sm:text-sm text-slate-800 font-medium shadow-xs">
                  <Flame className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'exercise':
      return (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 my-6 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">Hands-on Challenge</span>
              <h3 className="text-lg font-black text-emerald-950">{section.title || 'Practice Exercise'}</h3>
            </div>
          </div>
          <div className="text-sm text-slate-800 leading-relaxed space-y-2 font-normal">
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
            <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>{section.title || 'Knowledge Check'}</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono font-medium">Test your comprehension</span>
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
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 my-6 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4 text-blue-700">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-black text-slate-950">{section.title || 'Key Takeaways'}</h3>
          </div>
          <div className="space-y-2.5">
            {section.items?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
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
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 my-6 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">Coming Up Next</span>
            <p className="text-sm font-bold text-slate-900 mt-1">{section.content}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 ml-4 animate-pulse" />
        </div>
      );

    case 'explanation':
    default:
      return (
        <div className="my-6">
          {section.title && (
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-3 flex items-center gap-2.5 tracking-tight">
              <span className="w-1.5 h-6 rounded bg-gradient-to-b from-blue-600 to-indigo-600 inline-block"></span>
              <span>{section.title}</span>
            </h3>
          )}
          <div className="text-slate-800 text-base leading-relaxed space-y-4 font-normal">
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
