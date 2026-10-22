import React, { useEffect, useRef } from 'react';
import { lessons, Lesson, modules } from '../content/lessons';
import { Sidebar } from '../components/Sidebar';
import { SectionRenderer } from '../components/SectionRenderer';
import { 
  Check, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Share2, 
  CheckCircle2,
  Layers,
  ChevronRight
} from 'lucide-react';

interface LessonPageProps {
  currentLessonSlug: string;
  onSelectLesson: (slug: string) => void;
  completedLessons: number[];
  bookmarks: number[];
  quizScores: Record<string, { selected: number; isCorrect: boolean }>;
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onAnswerQuiz: (questionId: string, selected: number, isCorrect: boolean) => void;
  onBackToOverview: () => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  currentLessonSlug,
  onSelectLesson,
  completedLessons,
  bookmarks,
  quizScores,
  onToggleComplete,
  onToggleBookmark,
  onAnswerQuiz,
  onBackToOverview,
}) => {
  const lesson = lessons.find((l) => l.slug === currentLessonSlug) || lessons[0];
  const moduleInfo = modules.find((m) => m.id === lesson.module);

  const prevLesson = lessons.find((l) => l.id === lesson.id - 1);
  const nextLesson = lessons.find((l) => l.id === lesson.id + 1);

  const isCompleted = completedLessons.includes(lesson.id);
  const isBookmarked = bookmarks.includes(lesson.id);

  const contentTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when lesson changes
    if (contentTopRef.current) {
      contentTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentLessonSlug]);

  const handleNextWithComplete = () => {
    if (!isCompleted) {
      onToggleComplete(lesson.id);
    }
    if (nextLesson) {
      onSelectLesson(nextLesson.slug);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]" ref={contentTopRef}>
      {/* Course Sidebar */}
      <Sidebar
        currentLessonSlug={currentLessonSlug}
        onSelectLesson={onSelectLesson}
        completedLessons={completedLessons}
        bookmarks={bookmarks}
        onToggleComplete={onToggleComplete}
        onToggleBookmark={onToggleBookmark}
      />

      {/* Main Lesson Content Area */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-8 w-full overflow-hidden">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
          <button onClick={onBackToOverview} className="hover:text-cyan-400 transition-colors">
            Course Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-400 font-mono font-medium">
            Module {lesson.module}: {moduleInfo?.title}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-medium truncate">Lesson {lesson.id}</span>
        </div>

        {/* Lesson Header */}
        <header className="pb-8 border-b border-cyan-500/15 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                Lesson {lesson.id < 10 ? `0${lesson.id}` : lesson.id} of 20
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900 text-slate-400 border border-slate-800 flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                {lesson.duration}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-950/40 text-blue-300 border border-blue-500/30">
                {lesson.difficulty}
              </span>
            </div>

            {/* Action buttons: Bookmark & Complete */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(lesson.id)}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
                  isBookmarked
                    ? 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => onToggleComplete(lesson.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:from-cyan-400 hover:to-blue-400 shadow-cyan-500/20'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
            {lesson.title}
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {lesson.subtitle}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono bg-slate-900/90 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Lesson Sections */}
        <div className="space-y-6">
          {lesson.sections.map((section, idx) => (
            <SectionRenderer
              key={idx}
              section={section}
              savedAnswers={quizScores}
              onAnswerQuiz={onAnswerQuiz}
            />
          ))}
        </div>

        {/* Bottom Navigation Controls */}
        <div className="mt-14 pt-8 border-t border-cyan-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevLesson ? (
            <button
              onClick={() => onSelectLesson(prevLesson.slug)}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-500 uppercase font-mono">Previous</span>
                <span className="truncate max-w-[180px] block">{prevLesson.title}</span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block"></div>
          )}

          {nextLesson ? (
            <button
              onClick={handleNextWithComplete}
              className="w-full sm:w-auto flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 rounded-xl font-bold text-sm hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <div className="text-left">
                <span className="block text-[10px] text-slate-900 uppercase font-mono font-semibold">
                  Complete & Next
                </span>
                <span className="truncate max-w-[220px] block">{nextLesson.title}</span>
              </div>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isCompleted) onToggleComplete(lesson.id);
                onBackToOverview();
              }}
              className="w-full sm:w-auto flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm rounded-xl hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Finish Course & Claim Certificate!</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
