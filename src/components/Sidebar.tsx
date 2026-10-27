import React, { useState } from 'react';
import { modules, lessons, Module, Lesson } from '../content/lessons';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
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
  onToggleComplete,
}) => {
  // Keep all modules expanded by default
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
    <aside className="w-full lg:w-80 shrink-0 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto shadow-xs">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold block">
            Course Curriculum
          </span>
          <h3 className="text-sm font-extrabold text-slate-900">20 Sequential Lessons</h3>
        </div>
        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 shadow-xs">
          {completedLessons.length} / 20 Done
        </span>
      </div>

      {/* Modules List */}
      <div className="p-3 space-y-3 flex-1">
        {modules.map((mod: Module) => {
          const isExpanded = !!expandedModules[mod.id];
          const moduleLessons = lessons.filter((l) => mod.lessonIds.includes(l.id));
          const completedInModule = moduleLessons.filter((l) => completedLessons.includes(l.id)).length;
          const isCurrentInModule = moduleLessons.some((l) => l.slug === currentLessonSlug);

          return (
            <div
              key={mod.id}
              className={`rounded-2xl border transition-all ${
                isCurrentInModule
                  ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Module Header Accordion Trigger */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full p-3 flex items-center justify-between text-left group hover:bg-slate-50 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg p-1.5 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
                    {mod.icon}
                  </span>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">
                        Module {mod.id}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        ({completedInModule}/{moduleLessons.length})
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {mod.title}
                    </h4>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                )}
              </button>

              {/* Lesson Items */}
              {isExpanded && (
                <div className="px-2 pb-2 pt-1 space-y-1 border-t border-slate-100">
                  {moduleLessons.map((l: Lesson) => {
                    const isSelected = l.slug === currentLessonSlug;
                    const isCompleted = completedLessons.includes(l.id);

                    return (
                      <div
                        key={l.id}
                        className={`group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold shadow-xs'
                            : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                        }`}
                        onClick={() => onSelectLesson(l.slug)}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {/* Completion Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleComplete(l.id);
                            }}
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                              isCompleted
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                                : 'border border-slate-300 hover:border-blue-400 text-transparent bg-white'
                            }`}
                            title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </button>

                          <div className="truncate">
                            <span className="text-[10px] text-blue-600 font-mono mr-1.5 font-bold">
                              {l.id < 10 ? `0${l.id}` : l.id}.
                            </span>
                            <span className={isSelected ? 'text-blue-950 font-bold' : 'font-medium'}>
                              {l.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-0.5">
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
