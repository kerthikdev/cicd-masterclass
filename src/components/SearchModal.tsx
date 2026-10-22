import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Clock, Tag } from 'lucide-react';
import { lessons, Lesson } from '../content/lessons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectLesson }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLessons = query.trim() === ''
    ? lessons.slice(0, 8)
    : lessons.filter((l) =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        l.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0e1626] border border-cyan-500/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[75vh]">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/15 bg-slate-900/90">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Search lessons, concepts, tools (e.g. Docker, GitHub Actions, AWS)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 select-none hover:text-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {filteredLessons.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No matching lessons found for "{query}". Try searching for "Git", "Docker", "Pipeline", or "Rollback".
            </div>
          ) : (
            filteredLessons.map((l: Lesson) => (
              <div
                key={l.id}
                onClick={() => {
                  onSelectLesson(l.slug);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-transparent hover:border-cyan-500/30 hover:bg-slate-900/80 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 group-hover:border-cyan-500/50">
                    {l.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {l.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{l.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {l.duration}
                      </span>
                      {l.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <BookOpen className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 ml-3" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
