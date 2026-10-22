import React from 'react';
import { modules, lessons, Module } from '../content/lessons';
import { 
  Play, 
  Sparkles, 
  BookOpen, 
  Terminal, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  UtensilsCrossed, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Layers,
  ChevronRight,
  Flame,
  Clock
} from 'lucide-react';

interface HomePageProps {
  onStartCourse: (slug?: string) => void;
  onOpenSimulator: () => void;
  onOpenReference: () => void;
  completedLessons: number[];
  percentComplete: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartCourse,
  onOpenSimulator,
  onOpenReference,
  completedLessons,
  percentComplete,
}) => {
  // Find first uncompleted lesson
  const nextLesson = lessons.find((l) => !completedLessons.includes(l.id)) || lessons[0];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-6 shadow-lg shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Interactive CI/CD & DevOps Engineering Course</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-tight">
            Master CI/CD Through The{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Food Ordering 🍔
            </span>{' '}
            Analogy
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From a customer clicking <span className="text-amber-300 font-semibold">"Place Order"</span> to a chef cooking, inspecting, packaging, and delivering hot food — learn how developers push code to GitHub and automatically deploy live cloud applications with zero downtime.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onStartCourse(nextLesson.slug)}
              className="flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-slate-950 font-black text-base rounded-2xl hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{completedLessons.length > 0 ? `Resume Lesson ${nextLesson.id}: ${nextLesson.title}` : 'Start Free Course (20 Lessons)'}</span>
            </button>

            <button
              onClick={onOpenSimulator}
              className="flex items-center gap-2 px-6 py-4 bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 font-bold text-base rounded-2xl hover:bg-cyan-950/30 transition-all"
            >
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Launch Pipeline Simulator</span>
            </button>
          </div>

          {/* Key Stats Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-[#0e1628]/80 border border-cyan-500/15 p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">20</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Sequential Lessons</div>
            </div>
            <div className="bg-[#0e1628]/80 border border-cyan-500/15 p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">4</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Core Modules</div>
            </div>
            <div className="bg-[#0e1628]/80 border border-cyan-500/15 p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">60+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Quiz Questions</div>
            </div>
            <div className="bg-[#0e1628]/80 border border-cyan-500/15 p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-indigo-300 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Hands-On & Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Central Mental Model: Interactive Comparison Card */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0c1324] via-[#090d18] to-[#121b33] border-2 border-cyan-500/25 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <UtensilsCrossed className="w-4 h-4" />
                <span>The Core Mental Model</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
                How Food Delivery Maps to Modern CI/CD
              </h2>
            </div>
            <button
              onClick={onOpenSimulator}
              className="self-start md:self-auto flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 px-4 py-2 rounded-xl border border-cyan-500/30 transition-colors"
            >
              <span>Test In Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-cyan-500/15 p-5 rounded-2xl hover:border-cyan-500/40 transition-all">
              <div className="text-2xl mb-2">📱 → ⚡</div>
              <h4 className="text-sm font-bold text-slate-200">1. Order → Commit</h4>
              <p className="text-xs text-amber-300/90 mt-1 font-medium">🍔 Customer places meal order</p>
              <p className="text-xs text-cyan-300/90 mt-0.5">💻 Developer runs `git push origin main`</p>
            </div>

            <div className="bg-slate-900/80 border border-cyan-500/15 p-5 rounded-2xl hover:border-cyan-500/40 transition-all">
              <div className="text-2xl mb-2">🍳 → ⚙️</div>
              <h4 className="text-sm font-bold text-slate-200">2. Kitchen → Build & Test</h4>
              <p className="text-xs text-amber-300/90 mt-1 font-medium">🍔 Chef grills patty & inspects quality</p>
              <p className="text-xs text-cyan-300/90 mt-0.5">💻 Bundler compiles app & tests execute</p>
            </div>

            <div className="bg-slate-900/80 border border-cyan-500/15 p-5 rounded-2xl hover:border-cyan-500/40 transition-all">
              <div className="text-2xl mb-2">📦 → 🐳</div>
              <h4 className="text-sm font-bold text-slate-200">3. Sealed Box → Docker Image</h4>
              <p className="text-xs text-amber-300/90 mt-1 font-medium">🍔 Food sealed in tamper-proof box</p>
              <p className="text-xs text-cyan-300/90 mt-0.5">💻 App packaged into immutable container</p>
            </div>

            <div className="bg-slate-900/80 border border-cyan-500/15 p-5 rounded-2xl hover:border-cyan-500/40 transition-all">
              <div className="text-2xl mb-2">🛵 → 🚀</div>
              <h4 className="text-sm font-bold text-slate-200">4. Delivery → Production Cloud</h4>
              <p className="text-xs text-amber-300/90 mt-1 font-medium">🍔 Rider delivers food to customer</p>
              <p className="text-xs text-cyan-300/90 mt-0.5">💻 AWS ECS updates service with 0 downtime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap: 4 Modules */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Structured Learning Path
          </span>
          <h2 className="text-3xl font-black text-slate-100 mt-1">4 Comprehensive Modules</h2>
          <p className="text-sm text-slate-400 mt-2">
            20 sequential lessons designed for beginners with quizzes, code snippets, visual flows, and real-world tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod: Module) => {
            const moduleLessons = lessons.filter((l) => mod.lessonIds.includes(l.id));
            const completedCount = moduleLessons.filter((l) => completedLessons.includes(l.id)).length;
            const progress = Math.round((completedCount / moduleLessons.length) * 100);

            return (
              <div
                key={mod.id}
                className="bg-[#0b101d] border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-cyan-500/20">
                        {mod.icon}
                      </span>
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                          Module {mod.id}
                        </span>
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {mod.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                      {completedCount}/{moduleLessons.length} Done
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-slate-400 mb-5 leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-900 rounded-full h-1.5 mb-5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Lessons included */}
                  <div className="space-y-2">
                    {moduleLessons.map((l) => {
                      const isDone = completedLessons.includes(l.id);
                      return (
                        <div
                          key={l.id}
                          onClick={() => onStartCourse(l.slug)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/30 cursor-pointer border border-transparent hover:border-cyan-500/20 text-xs text-slate-300 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-cyan-400 font-semibold">{l.id}.</span>
                            <span className="font-medium text-slate-200">{l.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500">{l.duration}</span>
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cyan-500/10 flex justify-end">
                  <button
                    onClick={() => onStartCourse(moduleLessons[0].slug)}
                    className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Explore Module</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
