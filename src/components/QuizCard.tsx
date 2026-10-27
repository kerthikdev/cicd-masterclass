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
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 my-4 transition-all hover:border-blue-300 shadow-xs">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-xl text-blue-700 border border-blue-200 mt-0.5 shadow-xs">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">Knowledge Check</span>
          <h4 className="text-base sm:text-lg font-bold text-slate-950 mt-0.5 leading-snug">{question.question}</h4>
        </div>
      </div>

      <div className="space-y-2.5 mb-4">
        {question.options.map((option, idx) => {
          let btnStyle = 'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-blue-400 hover:bg-blue-50/50 hover:text-slate-950';

          if (isAnswered) {
            if (idx === question.correctIndex) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/40 shadow-xs';
            } else if (idx === selectedIdx && !isCorrect) {
              btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/40 shadow-xs';
            } else {
              btnStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between group font-medium ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 group-hover:text-blue-700 group-hover:border-blue-400 transition-colors shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {isAnswered && idx === question.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              {isAnswered && idx === selectedIdx && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`p-4 rounded-xl text-sm border animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Not quite! Here is why:</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
