import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../content/lessons';

interface QuizCardProps {
  question: QuizQuestion;
  savedAnswer?: { selected: number; isCorrect: boolean };
  onAnswer: (questionId: string, selected: number, isCorrect: boolean) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, savedAnswer, onAnswer }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(
    savedAnswer !== undefined ? savedAnswer.selected : null
  );

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    const isCorrect = idx === question.correctIndex;
    onAnswer(question.id, idx, isCorrect);
  };

  const isAnswered = selectedIdx !== null;
  const isCorrect = selectedIdx === question.correctIndex;

  return (
    <div className="bg-[#111827]/90 border border-cyan-500/20 rounded-xl p-5 my-4 transition-all hover:border-cyan-500/40 shadow-lg">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-cyan-950/60 rounded-lg text-cyan-400 border border-cyan-500/20 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Knowledge Check</span>
          <h4 className="text-base font-medium text-slate-100 mt-0.5">{question.question}</h4>
        </div>
      </div>

      <div className="space-y-2.5 mb-4">
        {question.options.map((option, idx) => {
          let btnStyle = 'border-slate-800 bg-[#0d1321] text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/50';

          if (isAnswered) {
            if (idx === question.correctIndex) {
              btnStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-medium ring-1 ring-emerald-500/50';
            } else if (idx === selectedIdx && !isCorrect) {
              btnStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200 font-medium ring-1 ring-rose-500/50';
            } else {
              btnStyle = 'border-slate-800/60 bg-[#0d1321]/40 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between group ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800/80 flex items-center justify-center text-xs font-semibold text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-950/60 transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {isAnswered && idx === question.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              {isAnswered && idx === selectedIdx && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`p-3.5 rounded-lg text-sm border animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Not quite! Here is why:</span>
              </>
            )}
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
