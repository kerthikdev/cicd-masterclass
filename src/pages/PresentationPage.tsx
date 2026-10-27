import React, { useState, useEffect, useRef } from 'react';
import { MASTER_SLIDES_DATA, MasterSlide, PRESENTER_INFO } from '../data/slidesData';
import { CodeBlock } from '../components/CodeBlock';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2,
  Sparkles,
  ArrowRight,
  Briefcase,
  Rocket,
  CheckCircle2,
  XCircle,
  Lightbulb,
  UtensilsCrossed,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Terminal,
  Cpu,
  Cloud,
  Clock,
  GitBranch,
  FolderGit2,
  CheckSquare,
  HelpCircle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Type,
  Columns,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';

export const PresentationPage: React.FC<{ onBackToCourse: () => void }> = ({ onBackToCourse }) => {
  // 0 = Presenter Introduction Slide, 1-20 = Lessons 1-20
  const [slideNum, setSlideNum] = useState<number>(0); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'content' | 'diagram'>('split');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('large');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = 20;

  const prevSlide = () => {
    setSlideNum((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextSlide = () => {
    setSlideNum((prev) => (prev < totalSlides ? prev + 1 : prev));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {
          document.documentElement.requestFullscreen().catch(() => {});
        });
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && enlargedImage) {
        e.preventDefault();
        setEnlargedImage(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideNum, enlargedImage]);

  const currentSlide = slideNum > 0 ? MASTER_SLIDES_DATA[slideNum - 1] : null;

  // Font size classes
  const bodyTextClass = 
    fontSize === 'xl' ? 'text-lg sm:text-xl leading-relaxed' :
    fontSize === 'large' ? 'text-base sm:text-lg leading-relaxed' :
    'text-sm sm:text-base leading-relaxed';

  const headingTextClass =
    fontSize === 'xl' ? 'text-3xl sm:text-4xl lg:text-5xl font-black' :
    fontSize === 'large' ? 'text-2xl sm:text-3xl lg:text-4xl font-black' :
    'text-xl sm:text-2xl lg:text-3xl font-black';

  // Render Slide-specific rich data
  const renderSlideExtras = (slide: MasterSlide) => (
    <div className="space-y-4 pt-1">
      {/* AWS Core Services Grid */}
      {slide.services && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
            <Cloud className="w-4 h-4 text-amber-600" />
            <span>Core AWS Cloud Services:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slide.services.map((svc, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-sm font-mono font-bold text-amber-950">{svc.service}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-snug font-medium">{svc.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AWS 7-Step Deployment Flow */}
      {slide.flowSteps && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm sm:text-base">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>7-Step AWS Production Deployment Flow:</span>
          </div>
          <div className="space-y-2">
            {slide.flowSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm font-medium text-slate-900 shadow-xs">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide Code Block */}
      {slide.code && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Workflow YAML Configuration</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              CI/CD Pipeline
            </span>
          </div>
          <div className="rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
            <CodeBlock code={slide.code} language="yaml" />
          </div>
        </div>
      )}

      {/* Slide 19 Architecture Steps */}
      {slide.architectureSteps && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm sm:text-base">
            <Rocket className="w-4 h-4 text-emerald-600" />
            <span>End-to-End AWS Pipeline Architecture:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {slide.architectureSteps.map((st, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                <span className="text-xs font-mono font-bold text-emerald-900 block">{st.step}</span>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-snug">{st.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 19 Project Tasks */}
      {slide.projectTasks && (
        <div className="space-y-2">
          <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 uppercase block">Hands-On Checklist:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {slide.projectTasks.map((tsk, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2 shadow-xs font-medium">
                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{tsk}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 17 Security Rules */}
      {slide.securityRules && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm sm:text-base">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>DevSecOps Security & AWS OIDC Rules:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {slide.securityRules.map((sec, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 shadow-xs">
                <span className="text-xs font-mono font-bold text-rose-900 block">{sec.rule}</span>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-snug">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 18 Failure Matrix */}
      {slide.failureMatrix && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm sm:text-base">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Pipeline Failure Modes & Automated Recovery:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {slide.failureMatrix.map((f, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-700 text-xs font-mono">{f.failure}</span>
                  <span className="text-[10px] text-slate-500 font-medium">Cause: {f.cause}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 mt-1 font-medium">{f.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 3 Timeline */}
      {slide.timeline && (
        <div className="space-y-2">
          <span className="text-xs sm:text-sm font-mono font-bold text-blue-700 uppercase block">Historical Evolution Milestones:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {slide.timeline.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold text-xs inline-block mb-1">
                  {item.era}
                </span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 5 Concepts */}
      {slide.concepts && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {slide.concepts.map((c, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-xs inline-block mb-1">
                  Concept 0{idx + 1}
                </span>
                <h4 className="text-base font-black text-slate-950">{c.term}</h4>
                <p className="text-xs text-blue-700 font-mono font-semibold mb-2">{c.purpose}</p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{c.desc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-amber-900 font-medium">
                🍔 {c.analogy}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide 7 Comparison */}
      {slide.comparison && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-200 font-mono font-bold text-slate-800">
              <tr>
                <th className="p-3">Aspect</th>
                <th className="p-3 text-blue-700">Git</th>
                <th className="p-3 text-purple-700">GitHub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slide.comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{row.aspect}</td>
                  <td className="p-3 text-slate-700">{row.git}</td>
                  <td className="p-3 text-slate-700 font-medium">{row.github}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide 14 Stages */}
      {slide.stages && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {slide.stages.map((stg, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-mono font-bold text-blue-700 block">Stage {stg.num}</span>
              <h4 className="text-base font-black text-slate-900 mb-1">{stg.name}</h4>
              <p className="text-xs text-slate-600 mb-2 leading-snug">{stg.purpose}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-amber-900 font-medium">
                🍔 {stg.foodEquivalent}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide 20 Summary Mapping */}
      {slide.summaryMapping && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {slide.summaryMapping.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="font-mono font-bold text-xs text-blue-700 block">{item.tool}</span>
              <span className="text-xs text-slate-700 mt-0.5 block leading-snug">{item.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`bg-[#f8fafc] text-slate-900 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#f8fafc]'
          : 'w-full max-w-7xl mx-auto px-4 py-8 pb-28'
      }`}
    >
      {/* Top Deck Control Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-blue-600">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>CI/CD Masterclass — 20-Slide Complete Presentation</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">By {PRESENTER_INFO.name} ({PRESENTER_INFO.role} @ {PRESENTER_INFO.company})</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 mt-1 tracking-tight flex items-center gap-3">
            <span>CI/CD: From Manual Software Delivery to Full Automation</span>
            <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
              🍔 Food Delivery Analogy
            </span>
          </h1>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Jump Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-xs">
            <span className="text-xs font-mono font-bold text-slate-500">Jump:</span>
            <select
              value={slideNum}
              onChange={(e) => setSlideNum(Number(e.target.value))}
              className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value={0}>00. Intro (Kerthik)</option>
              {MASTER_SLIDES_DATA.map((s) => (
                <option key={s.num} value={s.num}>
                  {s.num < 10 ? `0${s.num}` : s.num}. {s.title.slice(0, 32)}...
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          {slideNum > 0 && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-xs">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'split' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Side-by-Side: Content & Diagram"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split 50/50</span>
              </button>
              <button
                onClick={() => setViewMode('content')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'content' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Full Content Reading Mode"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Full Content</span>
              </button>
              <button
                onClick={() => setViewMode('diagram')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'diagram' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Full Diagram Architecture Mode"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Full Diagram</span>
              </button>
            </div>
          )}

          {/* Font Scaling Control */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-xs">
            <span className="text-[11px] font-mono text-slate-400 px-1 font-bold">Text:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded text-xs font-bold ${
                fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded text-xs font-bold ${
                fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Large Font Size (Recommended)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-2 py-1 rounded text-xs font-bold ${
                fontSize === 'xl' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Extra Large Font Size (Projector Mode)"
            >
              A++
            </button>
          </div>

          {/* Download PPTX */}
          <a
            href="/CICD_Masterclass_20_Slides.pptx"
            download="CI_CD_Masterclass_20_Slides.pptx"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 shadow-xs transition-all"
            title="Download PowerPoint Presentation Deck"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">.PPTX</span>
          </a>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all shadow-xs ${
              isFullscreen
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 hover:text-blue-600 border-slate-200'
            }`}
            title="Toggle Fullscreen Mode (Press F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </button>

          {!isFullscreen && (
            <button
              onClick={onBackToCourse}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              Exit to Course
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          SLIDE CANVAS
          ========================================================================= */}
      {slideNum === 0 ? (
        /* ==================== SLIDE 0: TITLE & PRESENTER INTRODUCTION ==================== */
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md relative flex flex-col justify-between min-h-[660px]">
          <div>
            {/* Header Meta */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full font-mono font-bold text-xs sm:text-sm bg-blue-50 text-blue-700 border border-blue-200">
                  COURSE INTRODUCTION & ROADMAP
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  20 Sequential Lessons
                </span>
              </div>
              <span className="text-sm font-bold text-slate-500 font-mono">
                Slide 00 of 20
              </span>
            </div>

            {/* Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
              {/* Left Column (6 cols): Title & Kerthik's Bio */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-sm font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    Complete DevOps Curriculum
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                    CI/CD: From Manual Software Delivery to Full Automation
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed font-normal">
                    Start from zero, understand the pain of traditional manual software releases, master Git & GitHub, discover why we choose GitHub Actions, and build a complete automated cloud pipeline using the universal <strong className="text-amber-800 font-bold">Food Ordering Analogy 🍔</strong>.
                  </p>
                </div>

                {/* Presenter Profile Card */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border-2 border-blue-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-blue-500/20">
                      K
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-950">{PRESENTER_INFO.name}</h3>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200">
                          Course Instructor
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-blue-700">
                        {PRESENTER_INFO.role} at {PRESENTER_INFO.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {PRESENTER_INFO.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 text-slate-800 font-medium">
                      <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{PRESENTER_INFO.previousRole}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-800 font-medium">
                      <Rocket className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>{PRESENTER_INFO.venture}</strong> — Cloud Systems</span>
                    </div>
                  </div>
                </div>

                {/* 4 Curriculum Parts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-xs">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 1 (S1-5)</span>
                    <span className="text-xs text-slate-800 font-semibold">Why CI/CD Exists</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-xs">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 2 (S6-8)</span>
                    <span className="text-xs text-slate-800 font-semibold">Git, GitHub & Tools</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-xs">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 3 (S9-13)</span>
                    <span className="text-xs text-slate-800 font-semibold">GitHub Actions</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-xs">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 4 (S14-20)</span>
                    <span className="text-xs text-slate-800 font-semibold">Docker, AWS & SRE</span>
                  </div>
                </div>
              </div>

              {/* Right Column (6 cols): Embedded DevOps Pipeline Illustration */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div
                  className="w-full rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md bg-white p-3.5 cursor-pointer group transition-all hover:border-blue-400"
                  onClick={() => setEnlargedImage('/devops_cicd_intro.jpg')}
                  title="Click to view full screen"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center">
                    <img
                      src="/devops_cicd_intro.jpg"
                      alt="DevOps CI/CD Pipeline Automation Illustration"
                      className="w-full h-auto min-h-[360px] sm:min-h-[440px] max-h-[540px] rounded-2xl object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-white" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                  <div className="p-3 text-center bg-slate-50 rounded-xl mt-3 border border-slate-200">
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 block">
                      ⚙️ DevOps Automated Assembly Line: Git Commit ➔ Tests ➔ Docker ➔ AWS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-mono text-slate-500">
              Press <kbd className="px-2 py-1 rounded border border-slate-300 bg-slate-100 font-sans font-bold text-slate-800">Space</kbd> or <kbd className="px-2 py-1 rounded border border-slate-300 bg-slate-100 font-sans font-bold text-slate-800">→</kbd> to begin
            </span>
            <button
              onClick={() => setSlideNum(1)}
              className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-2xl shadow-lg shadow-blue-500/25 transition-all hover:scale-102"
            >
              <span>Begin Masterclass (Slide 1)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* ==================== SLIDES 1 TO 20: MASTERCLASS LESSON SLIDES ==================== */
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md relative flex flex-col justify-between min-h-[660px]">
          <div>
            {/* Slide Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-1.5 rounded-full font-mono font-bold text-xs sm:text-sm bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                  SLIDE {currentSlide!.num < 10 ? `0${currentSlide!.num}` : currentSlide!.num} OF 20
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-600">
                  {currentSlide!.category}
                </span>
                {currentSlide!.num === 16 && (
                  <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-xs">
                    <Cloud className="w-3.5 h-3.5 text-amber-700" />
                    <span>AWS Cloud Platform</span>
                  </span>
                )}
                {currentSlide!.num === 19 && (
                  <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 shadow-xs">
                    <Rocket className="w-3.5 h-3.5 text-emerald-700" />
                    <span>AWS End-to-End Hands-On</span>
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-mono font-semibold px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                CI/CD Masterclass
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h2 className={`${headingTextClass} text-slate-950 tracking-tight leading-tight`}>
                {currentSlide!.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-2 font-medium leading-relaxed">
                {currentSlide!.subtitle}
              </p>
            </div>

            {/* =========================================================================
                SLIDE BODY: 3 ADAPTIVE VIEW MODES
                ========================================================================= */}
            {viewMode === 'diagram' ? (
              /* VIEW MODE 1: FULL DIAGRAM FOCUS */
              <div className="space-y-4 mb-6">
                <div className="w-full rounded-3xl overflow-hidden border-2 border-blue-300 shadow-xl bg-white p-4">
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase font-mono">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>Architecture Diagram (Full View)</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-700 normal-case">{currentSlide!.imageCaption}</span>
                    </div>
                    <button
                      onClick={() => {
                        setEnlargedImage(currentSlide!.image!);
                        setZoomLevel(1);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-xs transition-all"
                    >
                      <ZoomIn className="w-4 h-4 text-white" />
                      <span>Zoom Lightbox</span>
                    </button>
                  </div>

                  <div
                    className="relative overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center p-3 cursor-pointer group"
                    onClick={() => {
                      setEnlargedImage(currentSlide!.image!);
                      setZoomLevel(1);
                    }}
                  >
                    <img
                      src={currentSlide!.image}
                      alt={currentSlide!.title}
                      className="w-full h-auto min-h-[460px] sm:min-h-[580px] max-h-[750px] rounded-2xl object-contain group-hover:scale-101 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-white" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : viewMode === 'content' ? (
              /* VIEW MODE 2: FULL CONTENT FOCUS (12-COL READING MODE) */
              <div className="space-y-6 mb-6">
                {/* Detailed Points */}
                <div className="space-y-3">
                  {(currentSlide!.detailedPoints || currentSlide!.contentPoints)?.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className={`${bodyTextClass} text-slate-800 font-medium`}>{pt}</p>
                    </div>
                  ))}
                </div>

                {/* Food Analogy Card */}
                {currentSlide!.foodAnalogy && (
                  <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-200 shadow-xs">
                    <div className="flex items-center gap-2 text-amber-950 font-black text-lg mb-2">
                      <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                      <span>{currentSlide!.foodAnalogy.title}</span>
                    </div>
                    <p className={`${bodyTextClass} text-slate-800 leading-relaxed mb-3`}>
                      {currentSlide!.foodAnalogy.story}
                    </p>
                    {currentSlide!.foodAnalogy.connection && (
                      <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-xs">
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                          <strong className="text-amber-950">Software Connection:</strong> {currentSlide!.foodAnalogy.connection}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Extras */}
                {renderSlideExtras(currentSlide!)}
              </div>
            ) : (
              /* VIEW MODE 3: SPLIT VIEW (50/50 BALANCED) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
                {/* Left Side (6 cols): Content Points & Analogy */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-3">
                    {(currentSlide!.detailedPoints || currentSlide!.contentPoints)?.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className={`${bodyTextClass} text-slate-800 font-medium`}>{pt}</p>
                      </div>
                    ))}
                  </div>

                  {/* Food Analogy */}
                  {currentSlide!.foodAnalogy && (
                    <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 shadow-xs">
                      <div className="flex items-center gap-2 text-amber-950 font-black text-base mb-2">
                        <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                        <span>{currentSlide!.foodAnalogy.title}</span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-3 font-normal">
                        {currentSlide!.foodAnalogy.story}
                      </p>
                      {currentSlide!.foodAnalogy.connection && (
                        <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-xs">
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                            <strong className="text-amber-950">Software Connection:</strong> {currentSlide!.foodAnalogy.connection}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Extras */}
                  {renderSlideExtras(currentSlide!)}
                </div>

                {/* Right Side (6 cols): Architecture Diagram Image */}
                <div className="lg:col-span-6 flex flex-col items-center space-y-3">
                  <div
                    className="w-full rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md bg-white p-3.5 cursor-pointer group transition-all hover:border-blue-400"
                    onClick={() => {
                      setEnlargedImage(currentSlide!.image!);
                      setZoomLevel(1);
                    }}
                    title="Click to view full screen"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase font-mono">
                        <Layers className="w-4 h-4" />
                        <span>Architecture Diagram</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewMode('diagram');
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-mono font-bold transition-all"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Full Width</span>
                        </button>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center p-2">
                      <img
                        src={currentSlide!.image}
                        alt={currentSlide!.title}
                        className="w-full h-auto min-h-[380px] sm:min-h-[460px] max-h-[580px] rounded-2xl object-contain group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4 text-white" />
                        <span>Click to Enlarge</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl mt-3 border border-slate-200">
                      <p className="text-xs sm:text-sm font-mono text-slate-800 leading-relaxed font-semibold">
                        {currentSlide!.imageCaption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Key Takeaway Banner */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center gap-3 shadow-xs">
              <span className="text-2xl sm:text-3xl shrink-0">💡</span>
              <div className="text-sm sm:text-base text-emerald-950 font-bold leading-relaxed">
                <strong className="text-emerald-900 font-black uppercase tracking-wider text-xs sm:text-sm block sm:inline mr-2">Key Takeaway:</strong>
                {currentSlide!.keyTakeaway}
              </div>
            </div>
          </div>

          {/* Slide Footer with Controls */}
          <div className="pt-6 border-t border-slate-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-slate-700">
                Slide {currentSlide!.num} of {totalSlides}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs sm:text-sm font-mono text-slate-500 font-medium">
                Use <kbd className="px-1.5 py-0.5 rounded border border-slate-300 bg-slate-100 font-sans font-bold">←</kbd> <kbd className="px-1.5 py-0.5 rounded border border-slate-300 bg-slate-100 font-sans font-bold">→</kbd> or <kbd className="px-1.5 py-0.5 rounded border border-slate-300 bg-slate-100 font-sans font-bold">Space</kbd>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-sm font-bold text-slate-700 transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{slideNum === 1 ? 'Intro Slide' : 'Previous'}</span>
              </button>
              <button
                onClick={nextSlide}
                disabled={slideNum === totalSlides}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm ${
                  slideNum === totalSlides
                    ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
                }`}
              >
                <span>{slideNum === totalSlides ? 'Completed' : 'Next Slide'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 21-Slide Thumbnail Navigation Strip at Bottom */}
      <div className="mt-8 pt-4 border-t border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-2 pb-2 min-w-[900px]">
          {/* Slide 0: Intro */}
          <button
            onClick={() => setSlideNum(0)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all shrink-0 shadow-xs ${
              slideNum === 0
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            00. Intro (Kerthik)
          </button>

          {/* Slides 1-20 */}
          {MASTER_SLIDES_DATA.map((slide) => {
            const isActive = slide.num === slideNum;
            return (
              <button
                key={slide.num}
                onClick={() => setSlideNum(slide.num)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all shrink-0 shadow-xs ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
                }`}
                title={`Slide ${slide.num}: ${slide.title}`}
              >
                {slide.num < 10 ? `0${slide.num}` : slide.num}
              </button>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Diagram Lightbox Modal with Zoom Controls */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            setEnlargedImage(null);
            setZoomLevel(1);
          }}
        >
          <div
            className="relative w-full max-w-6xl max-h-[95vh] bg-white rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-200 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 uppercase">
                  High-Resolution Full View Diagram
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.6, prev - 0.2))}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-700 w-14 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.2))}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setEnlargedImage(null);
                    setZoomLevel(1);
                  }}
                  className="ml-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Close (Esc)
                </button>
              </div>
            </div>

            {/* Scrollable / Zoomable Image Canvas */}
            <div className="w-full flex-1 overflow-auto flex items-center justify-center p-2 max-h-[78vh]">
              <img
                src={enlargedImage}
                alt="Enlarged Architecture Diagram"
                className="max-w-none transition-transform duration-200 rounded-xl"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center'
                }}
              />
            </div>

            {/* Lightbox Footer */}
            <div className="w-full pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Scroll or drag to pan zoomed image</span>
              <span>Click outside or press Esc to exit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
