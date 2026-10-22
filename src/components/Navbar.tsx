import React from 'react';
import { 
  Sparkles, 
  Search, 
  Award, 
  Terminal, 
  BookOpen, 
  Menu, 
  X, 
  Home, 
  Layers, 
  HelpCircle,
  UtensilsCrossed
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'lesson' | 'simulator' | 'reference' | 'presentation';
  onNavigate: (view: 'home' | 'lesson' | 'simulator' | 'reference' | 'presentation', lessonSlug?: string) => void;
  percentComplete: number;
  onOpenSearch: () => void;
  onOpenCertificate: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  percentComplete,
  onOpenSearch,
  onOpenCertificate,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl">🍔</span>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base md:text-lg text-slate-900 tracking-tight">
                  CI/CD <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Masterclass</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded font-semibold hidden sm:inline">
                  20 Lessons
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">From Food Delivery to Production Pipelines</p>
            </div>
          </button>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'home'
                ? 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => onNavigate('lesson', 'introduction-to-cicd')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'lesson'
                ? 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => onNavigate('simulator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'simulator'
                ? 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-blue-600" />
            <span>Pipeline Simulator</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <button
            onClick={() => onNavigate('reference')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'reference'
                ? 'bg-white text-blue-700 border border-slate-200 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cheat Sheet</span>
          </button>

          <button
            onClick={() => onNavigate('presentation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'presentation'
                ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                : 'text-amber-800 hover:text-amber-950 hover:bg-amber-50'
            }`}
          >
            <span>📽️</span>
            <span>PPT Slides (20)</span>
          </button>
        </nav>

        {/* Right Action Icons & Progress */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl text-xs transition-colors shadow-sm"
            title="Search lessons (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Certificate Button */}
          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold transition-all shadow-sm"
            title="View Certificate"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Certificate</span>
          </button>

          {/* Progress Badge */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-2.5 py-1 rounded-xl shadow-sm">
            <div className="w-6 h-6 relative flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600 transition-all duration-500"
                  strokeDasharray={`${percentComplete}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <span className="text-xs font-mono font-bold text-slate-800">{percentComplete}%</span>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen}
    </header>
  );
};
