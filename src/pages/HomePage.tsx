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
  Clock,
  Cloud
} from 'lucide-react';

interface HomePageProps {
  onStartCourse: (slug?: string) => void;
  onOpenSimulator: () => void;
  onOpenAws?: () => void;
  onOpenReference: () => void;
  completedLessons: number[];
  percentComplete: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartCourse,
  onOpenSimulator,
  onOpenAws,
  onOpenReference,
  completedLessons,
  percentComplete,
}) => {
  // Find first uncompleted lesson
  const nextLesson = lessons.find((l) => !completedLessons.includes(l.id)) || lessons[0];

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-16 overflow-hidden">
        {/* Soft Ambient Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-blue-100/60 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Interactive CI/CD & DevOps Engineering Masterclass</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Master CI/CD Through The{' '}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Food Ordering 🍔
            </span>{' '}
            Analogy
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            From a customer clicking <strong className="text-amber-800 font-bold">"Place Order"</strong> to a chef cooking, inspecting, packaging, and delivering hot food — learn how developers push code to GitHub and automatically deploy live cloud applications with zero downtime.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onStartCourse(nextLesson.slug)}
              className="flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-base rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{completedLessons.length > 0 ? `Resume Lesson ${nextLesson.id}: ${nextLesson.title}` : 'Start Free Course (20 Lessons)'}</span>
            </button>

            <button
              onClick={onOpenSimulator}
              className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-800 hover:border-blue-400 hover:text-blue-600 font-bold text-base rounded-2xl hover:bg-slate-50 transition-all shadow-xs"
            >
              <Terminal className="w-5 h-5 text-blue-600" />
              <span>Pipeline Simulator</span>
            </button>

            {onOpenAws && (
              <button
                onClick={onOpenAws}
                className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 font-black text-base rounded-2xl hover:shadow-xl hover:shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 shadow-xs"
              >
                <Cloud className="w-5 h-5 text-slate-950" />
                <span>AWS Cloud Lab</span>
              </button>
            )}
          </div>

          {/* Key Stats Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">20</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Sequential Lessons</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">4</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Core Modules</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">60+</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Quiz Questions</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">100%</div>
              <div className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Hands-On & Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Central Mental Model: Interactive Comparison Card */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider">
                <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                <span>The Core Mental Model</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 tracking-tight">
                How Food Delivery Maps to Modern CI/CD
              </h2>
            </div>
            <button
              onClick={onOpenSimulator}
              className="self-start md:self-auto flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-200 transition-colors shadow-xs"
            >
              <span>Test In Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl hover:border-blue-400 transition-all">
              <div className="text-2xl mb-2">📱 ➔ ⚡</div>
              <h4 className="text-sm font-bold text-slate-900">1. Order ➔ Commit</h4>
              <p className="text-xs text-amber-900 mt-1 font-semibold">🍔 Customer places meal order</p>
              <p className="text-xs text-blue-800 mt-0.5 font-medium">💻 Developer runs `git push origin main`</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl hover:border-blue-400 transition-all">
              <div className="text-2xl mb-2">🍳 ➔ ⚙️</div>
              <h4 className="text-sm font-bold text-slate-900">2. Kitchen ➔ Build & Test</h4>
              <p className="text-xs text-amber-900 mt-1 font-semibold">🍔 Chef grills patty & inspects quality</p>
              <p className="text-xs text-blue-800 mt-0.5 font-medium">💻 Bundler compiles app & tests execute</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl hover:border-blue-400 transition-all">
              <div className="text-2xl mb-2">📦 ➔ 🐳</div>
              <h4 className="text-sm font-bold text-slate-900">3. Sealed Box ➔ Docker</h4>
              <p className="text-xs text-amber-900 mt-1 font-semibold">🍔 Food sealed in tamper-proof box</p>
              <p className="text-xs text-blue-800 mt-0.5 font-medium">💻 App packaged into immutable container</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl hover:border-blue-400 transition-all">
              <div className="text-2xl mb-2">🛵 ➔ 🚀</div>
              <h4 className="text-sm font-bold text-slate-900">4. Delivery ➔ AWS Cloud</h4>
              <p className="text-xs text-amber-900 mt-1 font-semibold">🍔 Rider delivers food to customer</p>
              <p className="text-xs text-blue-800 mt-0.5 font-medium">💻 AWS ECS updates service with 0 downtime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap: 4 Modules */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
            Structured Learning Path
          </span>
          <h2 className="text-3xl font-black text-slate-950 mt-1 tracking-tight">4 Comprehensive Modules</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
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
                className="bg-white border-2 border-slate-200 hover:border-blue-400 rounded-3xl p-6 sm:p-8 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                        {mod.icon}
                      </span>
                      <div>
                        <span className="text-xs font-mono text-blue-600 font-bold uppercase">
                          Module {mod.id}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {mod.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
                      {completedCount}/{moduleLessons.length} Done
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-normal">
                    {mod.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
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
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 cursor-pointer border border-slate-200 hover:border-blue-300 text-xs text-slate-800 transition-all font-medium"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-blue-600 font-bold">{l.id}.</span>
                            <span className="font-semibold text-slate-900">{l.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-500 font-mono">{l.duration}</span>
                            {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => onStartCourse(moduleLessons[0].slug)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Explore Module</span>
                    <ChevronRight className="w-4 h-4" />
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
