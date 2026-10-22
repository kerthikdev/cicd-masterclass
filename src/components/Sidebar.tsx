import React, { useState } from 'react';
import { modules, lessons, Module, Lesson } from '../content/lessons';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles,
  Bookmark,
  Check
} from 'lucide-react';

interface SidebarProps {
  currentLessonSlug: string;
  onSelectLesson: (slug: string) => void;
  completedLessons: number[];
  bookmarks: number[];
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLessonSlug,
  onSelectLesson,
  completedLessons,
  bookmarks,
  onToggleComplete,
  onToggleBookmark,
}) => {
  // Keep active module expanded by default
  const activeLesson = lessons.find((l) => l.slug === currentLessonSlug) || lessons[0];
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-[#090d19] border-r border-cyan-500/15 flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-cyan-500/10 bg-slate-900/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
            Course Curriculum
          </span>
          <h3 className="text-sm font-bold text-slate-200">20 Sequential Lessons</h3>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          {completedLessons.length} / 20 Done
        </span>
      </div>

      {/* Modules List */}
      <div className="p-3 space-y-4 flex-1">
        {modules.map((mod: Module) => {
          const isExpanded = !!expandedModules[mod.id];
          const moduleLessons = lessons.filter((l) => mod.lessonIds.includes(l.id));
          const completedInModule = moduleLessons.filter((l) => completedLessons.includes(l.id)).length;
          const isCurrentInModule = moduleLessons.some((l) => l.slug === currentLessonSlug);

          return (
            <div
              key={mod.id}
              className={`rounded-xl border transition-all ${
                isCurrentInModule
                  ? 'border-cyan-500/30 bg-[#0c1424]'
                  : 'border-slate-800/80 bg-slate-900/40'
              }`}
            >
              {/* Module Header Accordion Trigger */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full p-3 flex items-center justify-between text-left group hover:bg-white/5 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{mod.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        Module {mod.id}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        ({completedInModule}/{moduleLessons.length})
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {mod.title}
                    </h4>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                )}
              </button>

              {/* Lesson Items */}
              {isExpanded && (
                <div className="px-2 pb-2 pt-1 space-y-1 border-t border-cyan-500/10">
                  {moduleLessons.map((l: Lesson) => {
                    const isSelected = l.slug === currentLessonSlug;
                    const isCompleted = completedLessons.includes(l.id);
                    const isBookmarked = bookmarks.includes(l.id);

                    return (
                      <div
                        key={l.id}
                        className={`group relative flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-medium'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                        onClick={() => onSelectLesson(l.slug)}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          {/* Completion Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleComplete(l.id);
                            }}
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                              isCompleted
                                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                                : 'border border-slate-600 hover:border-cyan-400 text-transparent'
                            }`}
                            title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </button>

                          <div className="truncate">
                            <span className="text-[10px] text-cyan-400 font-mono mr-1.5 font-bold">
                              {l.id < 10 ? `0${l.id}` : l.id}.
                            </span>
                            <span className={isSelected ? 'text-cyan-100 font-semibold' : ''}>
                              {l.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100">
                          <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {l.duration.replace(' min', 'm')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
