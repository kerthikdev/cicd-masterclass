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
  RotateCcw
} from 'lucide-react';

export const PresentationPage: React.FC<{ onBackToCourse: () => void }> = ({ onBackToCourse }) => {
  // 0 = Executive Presenter Introduction Slide, 1-20 = Lessons 1-20
  const [slideNum, setSlideNum] = useState<number>(0); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [isDiagramExpanded, setIsDiagramExpanded] = useState<boolean>(false);
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

  const renderSlideExtras = (slide: MasterSlide) => (
    <div className="space-y-4">
      {/* AWS Core Services Grid */}
      {slide.services && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Cloud className="w-4 h-4 text-amber-600" />
            <span>Core AWS Cloud Services:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {slide.services.map((svc, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-amber-950">{svc.service}</span>
                </div>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">{svc.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AWS 7-Step Deployment Flow */}
      {slide.flowSteps && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>7-Step AWS Production Deployment Flow:</span>
          </div>
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
            {slide.flowSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs font-medium text-slate-800">
                <span className="w-5 h-5 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Actions to AWS Workflow Code */}
      {slide.code && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              <span>Workflow YAML (.github/workflows/deploy-aws.yml)</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">AWS ECS Fargate</span>
          </div>
          <div className="max-h-[260px] overflow-y-auto rounded-2xl border border-slate-300">
            <CodeBlock code={slide.code} language="yaml" />
          </div>
        </div>
      )}

      {/* Slide 19 Architecture Steps (AWS Hands-on) */}
      {slide.architectureSteps && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <Rocket className="w-4 h-4 text-emerald-600" />
            <span>End-to-End AWS Pipeline Architecture:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
            {slide.architectureSteps.map((st, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <span className="text-xs font-mono font-bold text-emerald-800 block">{st.step}</span>
                <p className="text-xs text-slate-700 mt-0.5 leading-snug">{st.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 19 Project Tasks */}
      {slide.projectTasks && (
        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-mono font-bold text-slate-700 uppercase block">Hands-On Checklist:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {slide.projectTasks.map((tsk, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{tsk}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 17 Security Rules */}
      {slide.securityRules && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>DevSecOps Security & AWS OIDC Rules:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
            {slide.securityRules.map((sec, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200">
                <span className="text-xs font-mono font-bold text-rose-800 block">{sec.rule}</span>
                <p className="text-xs text-slate-700 mt-0.5 leading-snug">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slide 14 Stages */}
      {slide.stages && (
        <div className="grid grid-cols-2 gap-2.5">
          {slide.stages.map((stg, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-xs font-mono font-bold text-blue-700">{stg.num}. {stg.name}</span>
              <p className="text-xs text-slate-600 mt-0.5">{stg.purpose}</p>
            </div>
          ))}
        </div>
      )}

      {/* Slide 15 Terms */}
      {slide.terms && (
        <div className="grid grid-cols-2 gap-2.5">
          {slide.terms.slice(0, 4).map((t, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-xs font-mono font-bold text-blue-700">{t.term}</span>
              <p className="text-xs text-slate-600 mt-0.5">{t.desc}</p>
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
          ? 'fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8 lg:p-12 flex flex-col justify-between bg-[#f8fafc]'
          : 'w-full max-w-7xl mx-auto px-4 py-8 pb-28'
      }`}
    >
      {/* Top Deck Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-blue-600">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>CI/CD Masterclass — Complete 20-Slide Presentation</span>
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

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Presenter Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-800">{PRESENTER_INFO.name}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">{PRESENTER_INFO.company}</span>
          </div>

          {/* Download PPTX Button */}
          <a
            href="/CICD_Masterclass_20_Slides.pptx"
            download="CI_CD_Masterclass_20_Slides.pptx"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 shadow-xs transition-all"
            title="Download PowerPoint Presentation Deck"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Download .PPTX</span>
          </a>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all shadow-xs ${
              isFullscreen
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 hover:text-blue-600 border-slate-200'
            }`}
            title="Toggle Fullscreen Mode (Press F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
            <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded text-[11px] bg-slate-100 border border-slate-300 font-mono text-slate-600">
              F
            </kbd>
          </button>

          {/* Back to Course button (if not fullscreen) */}
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
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50 relative flex flex-col justify-between min-h-[660px]">
          <div>
            {/* Header Meta */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full font-mono font-bold text-xs sm:text-sm bg-blue-50 text-blue-700 border border-blue-200">
                  COURSE INTRODUCTION & ROADMAP
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-wider">
                  20 Sequential Lessons
                </span>
              </div>
              <span className="text-sm font-bold text-slate-500 font-mono">
                Slide 00 of 20
              </span>
            </div>

            {/* Hero Split: Left Info & Bio, Right DevOps Pipeline Image */}
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
                  <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
                    Start from zero, understand the pain of traditional manual software releases, master Git & GitHub, discover why we choose GitHub Actions, and build a complete automated cloud pipeline using the universal <strong className="text-amber-800 font-bold">Food Ordering Analogy 🍔</strong>.
                  </p>
                </div>

                {/* Presenter Profile Card */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border-2 border-blue-200 rounded-3xl p-6 shadow-sm space-y-4">
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

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {PRESENTER_INFO.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 text-slate-800">
                      <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{PRESENTER_INFO.previousRole}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-800">
                      <Rocket className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>{PRESENTER_INFO.venture}</strong> — Cloud Systems</span>
                    </div>
                  </div>
                </div>

                {/* 4 Curriculum Parts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 1 (S1-5)</span>
                    <span className="text-xs text-slate-700 font-medium">Why CI/CD Exists</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 2 (S6-8)</span>
                    <span className="text-xs text-slate-700 font-medium">Git, GitHub & Tools</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 3 (S9-13)</span>
                    <span className="text-xs text-slate-700 font-medium">GitHub Actions</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-mono font-bold text-blue-700 block">Part 4 (S14-20)</span>
                    <span className="text-xs text-slate-700 font-medium">Docker, AWS & SRE</span>
                  </div>
                </div>
              </div>

              {/* Right Column (6 cols): Embedded Generated DevOps Pipeline Illustration */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div
                  className="w-full rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-xl bg-white p-3 cursor-pointer group transition-all hover:border-blue-400"
                  onClick={() => setEnlargedImage('/devops_cicd_intro.jpg')}
                  title="Click to view full screen"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center">
                    <img
                      src="/devops_cicd_intro.jpg"
                      alt="DevOps CI/CD Pipeline Automation Illustration"
                      className="w-full h-auto min-h-[360px] sm:min-h-[420px] max-h-[520px] rounded-2xl object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-white" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                  <div className="p-3 text-center bg-slate-50 rounded-xl mt-3 border border-slate-200">
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 block">
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
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50 relative flex flex-col justify-between min-h-[660px]">
          <div>
            {/* Slide Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-1.5 rounded-full font-mono font-bold text-xs sm:text-sm bg-blue-50 text-blue-700 border border-blue-200">
                  SLIDE {currentSlide!.num < 10 ? `0${currentSlide!.num}` : currentSlide!.num} OF 20
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500">
                  {currentSlide!.category}
                </span>
                {currentSlide!.num === 16 && (
                  <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-xs">
                    <Cloud className="w-3.5 h-3.5 text-amber-700" />
                    <span>AWS Cloud Platform</span>
                  </span>
                )}
                {currentSlide!.num === 19 && (
                  <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-xs">
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                {currentSlide!.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-1.5 font-medium leading-relaxed">
                {currentSlide!.subtitle}
              </p>
            </div>

            {/* =========================================================================
                SLIDE-SPECIFIC RICH CONTENT WITH PROPER ALIGNMENT
                ========================================================================= */}
            {currentSlide!.image ? (
              /* ================= SLIDE WITH HIGH-RESOLUTION DIAGRAM IMAGE ================= */
              isDiagramExpanded ? (
                /* EXPANDED FULL-WIDTH 12-COL VIEW */
                <div className="space-y-6 mb-6">
                  {/* Top Enormous Diagram Card */}
                  <div className="w-full rounded-3xl overflow-hidden border-2 border-blue-300 shadow-2xl bg-white p-4">
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase font-mono">
                        <Layers className="w-4 h-4 text-blue-600" />
                        <span>Architecture Diagram (Full Width)</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 normal-case">{currentSlide!.imageCaption}</span>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <button
                          onClick={() => setIsDiagramExpanded(false)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-mono font-bold shadow-xs transition-all"
                        >
                          <Minimize2 className="w-4 h-4 text-blue-600" />
                          <span>Side-by-Side</span>
                        </button>
                      </div>
                    </div>

                    <div
                      className="relative overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center p-3 cursor-pointer group"
                      onClick={() => {
                        setEnlargedImage(currentSlide!.image!);
                        setZoomLevel(1);
                      }}
                      title="Click to open Fullscreen Lightbox Zoom"
                    >
                      <img
                        src={currentSlide!.image}
                        alt={currentSlide!.title}
                        className="w-full h-auto min-h-[460px] sm:min-h-[560px] max-h-[720px] rounded-2xl object-contain group-hover:scale-101 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4 text-white" />
                        <span>Click to Enlarge / Zoom</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Left Column: Points & Problems */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {(currentSlide!.detailedPoints || currentSlide!.contentPoints)?.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">{pt}</p>
                          </div>
                        ))}
                      </div>

                      {currentSlide!.problemsList && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>The Manual Delivery Pitfalls:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {currentSlide!.problemsList.map((prob, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-slate-800 font-bold text-xs flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                <span>{prob}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Food Analogy & Extras */}
                    <div className="space-y-4">
                      {currentSlide!.foodAnalogy && (
                        <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 shadow-xs">
                          <div className="flex items-center gap-2 text-amber-900 font-black text-base mb-2">
                            <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                            <span>{currentSlide!.foodAnalogy.title}</span>
                          </div>
                          <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-3">
                            {currentSlide!.foodAnalogy.story}
                          </p>
                          {currentSlide!.foodAnalogy.connection && (
                            <div className="p-3 rounded-xl bg-white border border-amber-200">
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                <strong className="text-amber-900">Software Connection:</strong> {currentSlide!.foodAnalogy.connection}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Slide Rich Extras (AWS Services, Flow Steps, Code, Architecture, etc.) */}
                      {renderSlideExtras(currentSlide!)}
                    </div>
                  </div>
                </div>
              ) : (
                /* SIDE-BY-SIDE 6:6 GRID VIEW */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
                  {/* Left Side (6 cols): Detailed Points & Analogy */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Detailed Content Points */}
                    <div className="space-y-3">
                      {(currentSlide!.detailedPoints || currentSlide!.contentPoints)?.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">{pt}</p>
                        </div>
                      ))}
                    </div>

                    {/* Problems List if available (e.g. Slide 2) */}
                    {currentSlide!.problemsList && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          <span>The Manual Delivery Pitfalls:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentSlide!.problemsList.map((prob, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200 text-slate-800 font-bold text-xs flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              <span>{prob}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Food Analogy Card */}
                    {currentSlide!.foodAnalogy && (
                      <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 shadow-xs">
                        <div className="flex items-center gap-2 text-amber-900 font-black text-base mb-2">
                          <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                          <span>{currentSlide!.foodAnalogy.title}</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-3">
                          {currentSlide!.foodAnalogy.story}
                        </p>
                        {currentSlide!.foodAnalogy.connection && (
                          <div className="p-3 rounded-xl bg-white border border-amber-200">
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                              <strong className="text-amber-900">Software Connection:</strong> {currentSlide!.foodAnalogy.connection}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Slide Rich Extras (AWS Services, Flow Steps, Code, Architecture, etc.) */}
                    {renderSlideExtras(currentSlide!)}
                  </div>

                  {/* Right Side (6 cols): Prominent High-Resolution Architecture Diagram Image */}
                  <div className="lg:col-span-6 flex flex-col items-center space-y-3">
                    <div
                      className="w-full rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-xl bg-white p-3.5 cursor-pointer group transition-all hover:border-blue-400"
                      onClick={() => {
                        setEnlargedImage(currentSlide!.image!);
                        setZoomLevel(1);
                      }}
                      title="Click to view full screen"
                    >
                      {/* Diagram Card Header with Expand Button */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase font-mono">
                          <Layers className="w-4 h-4" />
                          <span>Architecture Diagram</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsDiagramExpanded(true);
                            }}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-mono font-bold transition-all"
                            title="Expand diagram across full 12 columns"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Expand Full Width</span>
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

                      <div className="p-3 bg-slate-50/90 rounded-2xl mt-3 border border-slate-200">
                        <p className="text-xs sm:text-sm font-mono text-slate-800 leading-relaxed font-semibold">
                          {currentSlide!.imageCaption}
                        </p>
                      </div>
                    </div>

                    <div className="w-full p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-center">
                      <span className="text-xs font-mono font-bold text-blue-900 block">
                        Lesson {currentSlide!.num} Core Architecture
                      </span>
                      <span className="text-xs text-slate-700 font-medium">
                        Every code commit triggers deterministic automated validation.
                      </span>
                    </div>
                  </div>
                </div>
              )
            ) : (
              /* ================= FULL-WIDTH LAYOUT (FOR TABLES, CODE, TIMELINES) ================= */
              <div className="space-y-6 mb-6">
                {/* SLIDE 2: PRE-CI/CD TRADITIONAL DELIVERY */}
                {currentSlide!.num === 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-rose-900 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-rose-600" />
                        <span>Traditional Delivery: The 6 Core Breakdowns</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentSlide!.problemsList?.map((prob, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-slate-900 font-bold text-sm sm:text-base flex items-start gap-2.5">
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            <span>{prob}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-700 leading-relaxed">
                        <strong>Historical Pre-CI/CD Fact:</strong> Teams merged code once every 6 months. Merges caused weekend-long outages, and the Knight Capital 2012 glitch bankrupt the firm in 45 minutes because 1 of 8 servers was updated with obsolete code.
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-amber-900 font-black text-lg mb-3">
                          <UtensilsCrossed className="w-6 h-6 text-amber-600" />
                          <span>{currentSlide!.foodAnalogy?.title}</span>
                        </div>
                        <p className="text-base sm:text-lg text-slate-800 leading-relaxed mb-4">
                          {currentSlide!.foodAnalogy?.story}
                        </p>
                        <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs">
                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                            {currentSlide!.foodAnalogy?.connection}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-amber-200/80 text-xs sm:text-sm font-mono font-semibold text-amber-900">
                        ⚠️ Manual processes collapse under scale and high order volume.
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 3: HISTORY & EVOLUTION */}
                {currentSlide!.num === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                      {currentSlide!.timeline?.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 shadow-xs transition-all flex flex-col justify-between">
                          <div>
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-mono font-black text-xs inline-block mb-2">
                              {item.era}
                            </span>
                            <h4 className="text-base font-black text-slate-900 leading-snug">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-4">
                      <span className="text-3xl">📋</span>
                      <div>
                        <h4 className="text-base font-bold text-amber-900">{currentSlide!.foodAnalogy?.title}</h4>
                        <p className="text-sm sm:text-base text-slate-800 mt-1 leading-relaxed">{currentSlide!.foodAnalogy?.story}</p>
                        <p className="text-xs sm:text-sm text-amber-800 font-semibold mt-1">{currentSlide!.foodAnalogy?.connection}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 5: UNDERSTANDING CI, CDEL, CDEP */}
                {currentSlide!.num === 5 && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {currentSlide!.concepts?.map((c, idx) => (
                      <div key={idx} className="p-6 rounded-3xl bg-white border-2 border-slate-200 hover:border-blue-400 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-blue-50 text-blue-700 border border-blue-200">
                              Concept 0{idx + 1}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-1">{c.term}</h3>
                          <p className="text-sm font-bold text-blue-700 uppercase font-mono mb-3">{c.purpose}</p>
                          <p className="text-base text-slate-700 leading-relaxed mb-4">{c.desc}</p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-sm">
                          <span className="text-xs font-mono font-bold text-amber-800 uppercase block mb-1">🍔 Food Analogy</span>
                          <p className="text-slate-800 font-medium">{c.analogy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SLIDE 7: GITHUB HUB & GIT COMPARISON */}
                {currentSlide!.num === 7 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-900">Git vs. GitHub Comparison</h3>
                      <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xs">
                        <table className="w-full text-left text-sm sm:text-base">
                          <thead className="bg-slate-100 border-b border-slate-200 font-mono font-bold text-slate-800">
                            <tr>
                              <th className="p-3">Aspect</th>
                              <th className="p-3 text-blue-700">Git</th>
                              <th className="p-3 text-purple-700">GitHub</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {currentSlide!.comparison?.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-3 font-bold text-slate-900">{row.aspect}</td>
                                <td className="p-3 text-slate-700">{row.git}</td>
                                <td className="p-3 text-slate-700 font-medium">{row.github}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm sm:text-base">
                        <strong>🍔 Analogy:</strong> {currentSlide!.foodAnalogy?.story}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-black text-slate-900">Why Developers Use GitHub:</h3>
                      <div className="space-y-2.5">
                        {currentSlide!.features?.map((f, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span className="text-base font-medium text-slate-800">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 9: WHY CHOOSE GITHUB ACTIONS */}
                {currentSlide!.num === 9 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentSlide!.advantages?.map((adv, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 shadow-xs transition-all">
                          <span className="text-xs font-mono font-bold text-blue-700 block mb-1">Reason 0{idx + 1}</span>
                          <h4 className="text-lg font-black text-slate-900 mb-1.5">{adv.title}</h4>
                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{adv.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm sm:text-base">
                      <strong>🍔 Analogy:</strong> {currentSlide!.foodAnalogy?.story}
                    </div>
                  </div>
                )}

                {/* SLIDE 11: LIFECYCLE STEPPER */}
                {currentSlide!.num === 11 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {currentSlide!.lifecycleSteps?.map((st, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <h4 className="text-sm font-bold text-blue-900">{st.step}</h4>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1">{st.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white border border-slate-200">
                        <span className="text-xs font-mono font-bold text-slate-500 uppercase block mb-2">Common Workflow Event Triggers:</span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800">
                          {currentSlide!.triggers?.map((tr, idx) => (
                            <li key={idx} className="font-mono">{tr}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm sm:text-base flex items-center">
                        <p>
                          <strong>🍔 Analogy:</strong> {currentSlide!.foodAnalogy?.story}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 12: WORKFLOW FILE EXPLAINED */}
                {currentSlide!.num === 12 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7">
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase block mb-1">
                        .github/workflows/ci.yml
                      </span>
                      <CodeBlock
                        code={currentSlide!.code || ""}
                        language="yaml"
                        title=".github/workflows/ci.yml"
                      />
                    </div>

                    <div className="lg:col-span-5 space-y-3">
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase block">Syntax Explanation:</span>
                      <div className="space-y-2">
                        {currentSlide!.explanations?.map((exp, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                            <code className="font-bold text-blue-700 font-mono">{exp.key}</code>: {exp.desc}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 13: WHAT HAPPENS ON PUSH */}
                {currentSlide!.num === 13 && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-base text-blue-950 font-medium">
                      {currentSlide!.narrative}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {currentSlide!.steps?.map((step, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-800">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentSlide!.scenarios?.map((sc, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${idx === 0 ? 'bg-rose-50/70 border-rose-200' : 'bg-emerald-50/70 border-emerald-200'}`}>
                          <h4 className={`text-base font-black ${idx === 0 ? 'text-rose-900' : 'text-emerald-900'}`}>{sc.result}</h4>
                          <p className="text-sm text-slate-700 mt-1 leading-relaxed">{sc.outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SLIDE 17: DEVSECOPS SECURITY RULES */}
                {currentSlide!.num === 17 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentSlide!.securityRules?.map((rule, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 shadow-xs">
                          <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                            <h4 className="text-base font-black text-slate-900">{rule.rule}</h4>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{rule.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm sm:text-base">
                      <strong>🍔 Analogy:</strong> {currentSlide!.foodAnalogy?.story}
                    </div>
                  </div>
                )}

                {/* SLIDE 18: FAILURE MATRIX */}
                {currentSlide!.num === 18 && (
                  <div className="space-y-5">
                    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xs">
                      <table className="w-full text-left text-sm sm:text-base">
                        <thead className="bg-slate-100 border-b border-slate-200 font-mono font-bold text-slate-800">
                          <tr>
                            <th className="p-3.5 text-rose-800">Failure Event</th>
                            <th className="p-3.5">Probable Root Cause</th>
                            <th className="p-3.5 text-blue-800">Automated / Team Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {currentSlide!.failureMatrix?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-3.5 font-bold text-rose-900">{row.failure}</td>
                              <td className="p-3.5 text-slate-700">{row.cause}</td>
                              <td className="p-3.5 text-slate-900 font-medium">{row.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm sm:text-base">
                      <strong>🍔 Analogy:</strong> {currentSlide!.foodAnalogy?.story}
                    </div>
                  </div>
                )}

                {/* SLIDE 20: FINAL SUMMARY */}
                {currentSlide!.num === 20 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {currentSlide!.summaryMapping?.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                          <span className="font-mono font-black text-blue-700 text-sm block mb-1">{item.tool}</span>
                          <p className="text-xs sm:text-sm text-slate-700">{item.role}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-sm text-center">
                      <h4 className="text-lg sm:text-xl font-black text-blue-950 mb-2">The Continuous Delivery Mindset</h4>
                      <p className="text-base sm:text-lg text-slate-800 max-w-3xl mx-auto leading-relaxed">
                        {currentSlide!.finalPhilosophy}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* UNIVERSAL BOTTOM TAKEAWAY BANNER */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 flex items-start sm:items-center gap-3">
              <Lightbulb className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
              <div className="text-sm sm:text-base text-emerald-950 font-semibold leading-relaxed">
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
              <span className="text-xs sm:text-sm font-mono text-slate-500">
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
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all shrink-0 ${
              slideNum === 0
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
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
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
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

              {/* Interactive Zoom Toolbar */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                    className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-blue-600 transition-all"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-2.5 text-xs font-mono font-bold text-slate-800 select-none">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                    className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-blue-600 transition-all"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 rounded-lg hover:bg-white text-slate-700 hover:text-blue-600 transition-all ml-1 border-l border-slate-200"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setEnlargedImage(null);
                    setZoomLevel(1);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-mono transition-all shadow-xs"
                >
                  Close (ESC)
                </button>
              </div>
            </div>

            {/* Scrollable Pannable Zoomable Image Container */}
            <div className="w-full overflow-auto max-h-[82vh] flex items-center justify-center p-2 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={enlargedImage}
                alt="Enlarged Architecture Diagram"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-md transition-transform select-none cursor-zoom-in"
                onDoubleClick={() => setZoomLevel((z) => (z === 1 ? 1.5 : 1))}
                title="Double-click to toggle 150% zoom"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
