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
  UtensilsCrossed,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Terminal,
  Cloud,
  CheckSquare,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Columns,
  BookOpen,
  Image as ImageIcon,
  LayoutGrid,
  X,
  FileCode2,
  ListChecks,
  Quote
} from 'lucide-react';

export const PresentationPage: React.FC<{ onBackToCourse: () => void }> = ({ onBackToCourse }) => {
  // 0 = Presenter Introduction Slide, 1-20 = Lessons 1-20
  const [slideNum, setSlideNum] = useState<number>(0); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'content' | 'diagram'>('split');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('large');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [gridModalOpen, setGridModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'primary' | 'analogy' | 'all'>('primary');

  const containerRef = useRef<HTMLDivElement>(null);
  const activeScrubberBtnRef = useRef<HTMLButtonElement | null>(null);
  const totalSlides = 20;

  // Reset tab to 'primary' and ALWAYS reset window scroll to top whenever slide changes
  useEffect(() => {
    setActiveTab('primary');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [slideNum]);

  // Auto-scroll the scrubber bar to keep the active slide button centered & visible
  useEffect(() => {
    if (activeScrubberBtnRef.current) {
      activeScrubberBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [slideNum]);

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
      if (e.key === 'Escape') {
        if (enlargedImage) {
          e.preventDefault();
          setEnlargedImage(null);
          setZoomLevel(1);
        } else if (gridModalOpen) {
          e.preventDefault();
          setGridModalOpen(false);
        }
      } else if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        setGridModalOpen((prev) => !prev);
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
  }, [slideNum, enlargedImage, gridModalOpen]);

  const currentSlide = slideNum > 0 ? MASTER_SLIDES_DATA[slideNum - 1] : null;
  const hasFoodAnalogy = Boolean(currentSlide?.foodAnalogy);

  // Font size classes
  const bodyTextClass = 
    fontSize === 'xl' ? 'text-lg sm:text-xl leading-relaxed' :
    fontSize === 'large' ? 'text-base sm:text-lg leading-relaxed' :
    'text-sm sm:text-base leading-relaxed';

  const headingTextClass =
    fontSize === 'xl' ? 'text-2xl sm:text-3xl lg:text-4xl font-black' :
    fontSize === 'large' ? 'text-xl sm:text-2xl lg:text-3xl font-black' :
    'text-lg sm:text-xl lg:text-2xl font-black';

  // =========================================================================
  // PRIMARY RICH CONTENT RENDERER (STANDARDIZED HEIGHT & PROPORTIONS)
  // =========================================================================
  const renderSlidePrimaryContent = (slide: MasterSlide) => {
    // Slide 14: Four Major Stages of Delivery (Clean horizontal gates)
    if (slide.stages) {
      return (
        <div className="space-y-2">
          {slide.stages.map((stg, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm transition-all flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {stg.num}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-black text-slate-950 font-mono">{stg.name}</span>
                    <span className="text-xs text-slate-600 hidden sm:inline">— {stg.purpose}</span>
                  </div>
                  <p className="text-xs text-slate-600 sm:hidden mt-0.5">{stg.purpose}</p>
                </div>
              </div>
              <span className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium hidden md:inline-block">
                🍔 {stg.foodEquivalent}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // Slide 5: Three Core Concepts (Horizontal cards, compact & clear)
    if (slide.concepts) {
      return (
        <div className="space-y-2.5">
          {slide.concepts.map((c, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-blue-300 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[11px]">
                    Concept 0{idx + 1}
                  </span>
                  <h4 className="text-sm font-black text-slate-950">{c.term}</h4>
                  <span className="text-xs text-blue-700 font-mono font-semibold hidden sm:inline">• {c.purpose}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{c.desc}</p>
              </div>
              <div className="shrink-0">
                <span className="px-2 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium inline-block">
                  🍔 {c.analogy}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Slide 17: Security Rules & DevSecOps
    if (slide.securityRules) {
      return (
        <div className="space-y-2">
          {slide.securityRules.map((sec, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white border border-rose-200 shadow-sm hover:border-rose-400 transition-colors flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-950 font-mono block">{sec.rule}</span>
                <p className="text-xs text-slate-700 mt-0.5">{sec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Slide 18: Failure Matrix & Automated Recovery
    if (slide.failureMatrix) {
      return (
        <div className="space-y-2">
          {slide.failureMatrix.map((f, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-rose-900 font-mono block">{f.failure}</span>
                  <span className="text-[11px] text-slate-500">Root Cause: {f.cause}</span>
                </div>
              </div>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                🛡️ {f.action}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // Slide 3: Historical Timeline
    if (slide.timeline) {
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {slide.timeline.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold text-[11px] inline-block mb-1">
                  {item.era}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-950 leading-snug">{item.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Slide 4: Comparison Table
    if (slide.comparisonTable) {
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-200 font-mono font-bold text-slate-800">
              <tr>
                <th className="p-2.5">Process Dimension</th>
                <th className="p-2.5 text-rose-700">Before CI/CD (Manual)</th>
                <th className="p-2.5 text-emerald-700">After CI/CD (Automated)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slide.comparisonTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-900">{row.aspect}</td>
                  <td className="p-2.5 text-slate-600">{row.before}</td>
                  <td className="p-2.5 text-emerald-950 font-semibold">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Slide 8: Tools Table
    if (slide.toolsTable) {
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-200 font-mono font-bold text-slate-800">
              <tr>
                <th className="p-2.5">Pipeline Stage</th>
                <th className="p-2.5 text-blue-700">Industry Standard Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slide.toolsTable.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-900">{t.stage}</td>
                  <td className="p-2.5 text-slate-800 font-medium">{t.tools}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Slide 9: Advantages
    if (slide.advantages) {
      return (
        <div className="space-y-2">
          {slide.advantages.map((adv, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2.5">
              <Rocket className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-950">{adv.title}</h4>
                <p className="text-xs text-slate-700 mt-0.5">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Slide 11: Workflow Lifecycle Steps
    if (slide.lifecycleSteps) {
      return (
        <div className="space-y-1.5">
          {slide.lifecycleSteps.map((st, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 uppercase block">{st.step}</span>
                <p className="text-xs text-slate-800">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Slide 12: Code & YAML Explanations
    if (slide.code) {
      return (
        <div className="space-y-2.5">
          <div className="rounded-xl border border-slate-300 shadow-sm overflow-hidden max-h-[260px] overflow-y-auto">
            <CodeBlock code={slide.code} language="yaml" />
          </div>
          {slide.explanations && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {slide.explanations.map((exp, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-mono font-bold text-blue-700 block">{exp.key}</span>
                  <p className="text-[11px] text-slate-700 mt-0.5">{exp.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Slide 13: Real Execution Flow
    if (slide.steps) {
      return (
        <div className="space-y-2">
          {slide.narrative && (
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-medium text-slate-800">
              {slide.narrative}
            </div>
          )}
          <div className="space-y-1.5">
            {slide.steps.map((st, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs text-slate-800 font-medium">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Slide 20: Summary Mapping & Mastery Philosophy
    if (slide.summaryMapping) {
      return (
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {slide.summaryMapping.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="font-mono font-bold text-xs text-blue-700 block">{item.tool}</span>
                <span className="text-xs text-slate-700 mt-0.5 block leading-snug">{item.role}</span>
              </div>
            ))}
          </div>
          {slide.finalPhilosophy && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-800 font-medium italic leading-relaxed">
                "{slide.finalPhilosophy}"
              </p>
            </div>
          )}
        </div>
      );
    }

    // Standard Bullet Points (Slide 1, 2, 6, 7, 10, 15, 16, 19)
    const points = slide.detailedPoints || slide.contentPoints || [];
    return (
      <div className="space-y-2">
        {points.map((pt, idx) => (
          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className={`${bodyTextClass} text-slate-800 font-medium`}>{pt}</p>
          </div>
        ))}

        {/* Slide 15 Docker terms */}
        {slide.terms && (
          <div className="mt-2.5 space-y-1.5">
            <span className="text-xs font-mono font-bold text-slate-700 uppercase block">Key Docker Concepts:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {slide.terms.map((t, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-mono font-bold text-blue-700 block">{t.term}</span>
                  <p className="text-[11px] text-slate-700 mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`bg-[#f8fafc] text-slate-900 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 lg:p-8 flex flex-col justify-between bg-[#f8fafc]'
          : 'w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 pb-12'
      }`}
    >
      {/* =========================================================================
          TOP DECK HEADER & CONTROLS TOOLBAR (CLEAN, COMPACT, NO COLLISION)
          ========================================================================= */}
      <div className="relative pb-3 mb-4 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Deck Meta Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>CI/CD Masterclass</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{PRESENTER_INFO.name} ({PRESENTER_INFO.company})</span>
            </div>
            <h1 className="text-base sm:text-xl font-black text-slate-950 mt-0.5 tracking-tight flex items-center gap-2 flex-wrap">
              <span>{slideNum === 0 ? "Course Roadmap & Overview" : `Slide ${slideNum < 10 ? `0${slideNum}` : slideNum}: ${currentSlide?.title}`}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                🍔 Food Analogy
              </span>
            </h1>
          </div>

          {/* Action Controls Toolbar */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Grid Overview Modal Button */}
            <button
              onClick={() => setGridModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition-all"
              title="View all slides in a grid overview (Press G)"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
              <span>Grid</span>
              <kbd className="hidden sm:inline text-[10px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded border border-slate-200 font-mono">G</kbd>
            </button>

            {/* Quick Jump Dropdown */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 shadow-sm">
              <span className="text-xs font-mono font-bold text-slate-500">Jump:</span>
              <select
                value={slideNum}
                onChange={(e) => setSlideNum(Number(e.target.value))}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer max-w-[120px] sm:max-w-[160px] truncate"
              >
                <option value={0}>00. Intro (Kerthik)</option>
                {MASTER_SLIDES_DATA.map((s) => (
                  <option key={s.num} value={s.num}>
                    {s.num < 10 ? `0${s.num}` : s.num}. {s.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            {slideNum > 0 && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs shadow-sm">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    viewMode === 'split' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Side-by-Side: Content & Diagram"
                >
                  <Columns className="w-3 h-3" />
                  <span>Split</span>
                </button>
                <button
                  onClick={() => setViewMode('content')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    viewMode === 'content' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Full Content Reading Mode"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Content</span>
                </button>
                <button
                  onClick={() => setViewMode('diagram')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    viewMode === 'diagram' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Full Diagram Architecture Mode"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Diagram</span>
                </button>
              </div>
            )}

            {/* Font Scaling Control */}
            <div className="flex items-center gap-0.5 bg-white border border-slate-200 p-0.5 rounded-xl shadow-sm">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Standard Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Large Font Size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  fontSize === 'xl' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Extra Large"
              >
                A++
              </button>
            </div>

            {/* Download PPTX */}
            <a
              href="/CICD_Masterclass_20_Slides.pptx"
              download="CI_CD_Masterclass_20_Slides.pptx"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition-all"
              title="Download PowerPoint Presentation Deck"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">.PPTX</span>
            </a>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all shadow-sm ${
                isFullscreen
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 hover:text-blue-600 border-slate-200'
              }`}
              title="Toggle Fullscreen Mode (Press F)"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Full'}</span>
            </button>

            {!isFullscreen && (
              <button
                onClick={onBackToCourse}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SLIDE CANVAS
          ========================================================================= */}
      {slideNum === 0 ? (
        /* ==================== SLIDE 0: TITLE & ROADMAP ==================== */
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-md relative flex flex-col">
          {/* Header Meta */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-blue-50 text-blue-700 border border-blue-200">
                COURSE INTRODUCTION & ROADMAP
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                20 Sequential Lessons
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-500 font-mono">
              Slide 00 of 20
            </span>
          </div>

          {/* Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center mb-4">
            {/* Left Column (6 cols): Title & Bio */}
            <div className="lg:col-span-6 space-y-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
                  Complete DevOps Curriculum
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                  CI/CD: From Manual Software Delivery to Full Automation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Start from zero, master Git & GitHub, discover why we choose GitHub Actions, and build a complete automated cloud pipeline using the universal <strong className="text-amber-800 font-bold">Food Ordering Analogy 🍔</strong>.
                </p>
              </div>

              {/* Presenter Profile Card */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
                    K
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-950">{PRESENTER_INFO.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] border border-blue-200">
                        Instructor
                      </span>
                    </div>
                    <p className="text-xs font-bold text-blue-700">
                      {PRESENTER_INFO.role} at {PRESENTER_INFO.company}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {PRESENTER_INFO.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{PRESENTER_INFO.previousRole}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Rocket className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>{PRESENTER_INFO.venture}</strong></span>
                  </div>
                </div>
              </div>

              {/* 4 Curriculum Parts (Interactive) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setSlideNum(1)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all"
                >
                  <span className="text-[10px] font-mono font-bold text-blue-700 block">Part 1 (S1-5)</span>
                  <span className="text-xs text-slate-800 font-semibold block truncate">Why CI/CD</span>
                </button>
                <button
                  onClick={() => setSlideNum(6)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all"
                >
                  <span className="text-[10px] font-mono font-bold text-blue-700 block">Part 2 (S6-8)</span>
                  <span className="text-xs text-slate-800 font-semibold block truncate">Git & GitHub</span>
                </button>
                <button
                  onClick={() => setSlideNum(9)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all"
                >
                  <span className="text-[10px] font-mono font-bold text-blue-700 block">Part 3 (S9-13)</span>
                  <span className="text-xs text-slate-800 font-semibold block truncate">Actions</span>
                </button>
                <button
                  onClick={() => setSlideNum(14)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all"
                >
                  <span className="text-[10px] font-mono font-bold text-blue-700 block">Part 4 (S14-20)</span>
                  <span className="text-xs text-slate-800 font-semibold block truncate">Docker & AWS</span>
                </button>
              </div>
            </div>

            {/* Right Column (6 cols): Embedded DevOps Pipeline Illustration */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div
                className="w-full rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-white p-2.5 cursor-pointer group transition-all hover:border-blue-400"
                onClick={() => setEnlargedImage('/devops_cicd_intro.jpg')}
                title="Click to view full screen"
              >
                <div className="relative overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
                  <img
                    src="/devops_cicd_intro.jpg"
                    alt="DevOps CI/CD Pipeline Automation Illustration"
                    className="w-full h-auto min-h-[220px] sm:min-h-[280px] max-h-[360px] rounded-xl object-cover group-hover:scale-101 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3 text-white" />
                    <span>Enlarge</span>
                  </div>
                </div>
                <div className="p-2 text-center bg-slate-50 rounded-lg mt-2 border border-slate-200">
                  <span className="text-xs font-mono font-bold text-slate-900 block">
                    ⚙️ DevOps Automated Assembly Line: Git Commit ➔ Tests ➔ Docker ➔ AWS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar for Slide 0 */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-2">
            <span className="text-xs font-mono text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded border border-slate-300 bg-slate-100 font-sans font-bold text-slate-800">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded border border-slate-300 bg-slate-100 font-sans font-bold text-slate-800">→</kbd> to begin
            </span>
            <button
              onClick={() => setSlideNum(1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all hover:scale-102"
            >
              <span>Begin Masterclass (Slide 1)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ==================== SLIDES 1 TO 20: MASTERCLASS LESSON SLIDES ==================== */
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-md relative flex flex-col">
          {/* Slide Header: Phase & Slide Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 pb-2.5 mb-3.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                SLIDE {currentSlide!.num < 10 ? `0${currentSlide!.num}` : currentSlide!.num} OF 20
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                {currentSlide!.category}
              </span>
              {currentSlide!.num === 16 && (
                <span className="px-2.5 py-0.5 rounded-full font-mono font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 shadow-sm">
                  <Cloud className="w-3 h-3 text-amber-700" />
                  <span>AWS Cloud Platform</span>
                </span>
              )}
              {currentSlide!.num === 19 && (
                <span className="px-2.5 py-0.5 rounded-full font-mono font-bold text-xs bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 shadow-sm">
                  <Rocket className="w-3 h-3 text-emerald-700" />
                  <span>AWS Hands-On Lab</span>
                </span>
              )}
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              CI/CD Masterclass
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-3.5">
            <h2 className={`${headingTextClass} text-slate-950 tracking-tight leading-tight`}>
              {currentSlide!.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium leading-relaxed">
              {currentSlide!.subtitle}
            </p>
          </div>

          {/* =========================================================================
              SLIDE BODY: 3 ADAPTIVE VIEW MODES
              ========================================================================= */}
          {viewMode === 'diagram' ? (
            /* VIEW MODE 1: FULL DIAGRAM FOCUS */
            <div className="space-y-3 mb-3.5">
              <div className="w-full rounded-2xl overflow-hidden border-2 border-blue-300 shadow-xl bg-white p-3">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs sm:text-sm uppercase font-mono">
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
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-sm transition-all"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-white" />
                    <span>Zoom Lightbox</span>
                  </button>
                </div>

                <div
                  className="relative overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-2 cursor-pointer group"
                  onClick={() => {
                    setEnlargedImage(currentSlide!.image!);
                    setZoomLevel(1);
                  }}
                >
                  <img
                    src={currentSlide!.image}
                    alt={currentSlide!.title}
                    className="w-full h-auto min-h-[300px] sm:min-h-[420px] max-h-[580px] rounded-xl object-contain group-hover:scale-101 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                    <span>Click to Zoom</span>
                  </div>
                </div>
              </div>
            </div>
          ) : viewMode === 'content' ? (
            /* VIEW MODE 2: FULL CONTENT FOCUS (12-COL READING MODE) */
            <div className="space-y-3 mb-3.5">
              {renderSlidePrimaryContent(currentSlide!)}

              {/* Food Analogy Card */}
              {currentSlide!.foodAnalogy && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-950 font-black text-sm mb-1">
                    <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                    <span>{currentSlide!.foodAnalogy.title}</span>
                  </div>
                  <p className={`${bodyTextClass} text-slate-800 leading-relaxed mb-2`}>
                    {currentSlide!.foodAnalogy.story}
                  </p>
                  {currentSlide!.foodAnalogy.connection && (
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-sm">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        <strong className="text-amber-950">Software Connection:</strong> {currentSlide!.foodAnalogy.connection}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* VIEW MODE 3: SPLIT VIEW WITH CONVENIENT CONTENT TABS */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mb-3.5">
              {/* Left Side (6 cols): Primary Content & Analogy Tabs */}
              <div className="lg:col-span-6 space-y-2.5 flex flex-col justify-between">
                {/* Content Section Tabs */}
                {hasFoodAnalogy && (
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('primary')}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shrink-0 ${
                        activeTab === 'primary'
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ListChecks className="w-3.5 h-3.5" />
                      <span>Core Blueprint</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('analogy')}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shrink-0 ${
                        activeTab === 'analogy'
                          ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                          : 'text-amber-900 hover:bg-amber-100/60'
                      }`}
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>Food Analogy</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-2.5 py-1.5 rounded-lg transition-all shrink-0 text-slate-500 hover:text-slate-900 ${
                        activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''
                      }`}
                      title="View all content sections combined"
                    >
                      All
                    </button>
                  </div>
                )}

                {/* Tab 1: Primary Rich Content */}
                {(activeTab === 'primary' || activeTab === 'all') && (
                  <div className="animate-fadeIn">
                    {renderSlidePrimaryContent(currentSlide!)}
                  </div>
                )}

                {/* Tab 2: Food Analogy */}
                {(activeTab === 'analogy' || activeTab === 'all') && currentSlide!.foodAnalogy && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 shadow-sm animate-fadeIn">
                    <div className="flex items-center gap-2 text-amber-950 font-black text-sm mb-1.5">
                      <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                      <span>{currentSlide!.foodAnalogy.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-2 font-normal">
                      {currentSlide!.foodAnalogy.story}
                    </p>
                    {currentSlide!.foodAnalogy.connection && (
                      <div className="p-2 rounded-xl bg-white border border-amber-200 shadow-sm">
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          <strong className="text-amber-950">Software Connection:</strong> {currentSlide!.foodAnalogy.connection}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side (6 cols): Architecture Diagram Image */}
              <div className="lg:col-span-6 flex flex-col items-center space-y-2">
                <div
                  className="w-full rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-white p-2.5 cursor-pointer group transition-all hover:border-blue-400"
                  onClick={() => {
                    setEnlargedImage(currentSlide!.image!);
                    setZoomLevel(1);
                  }}
                  title="Click to view full screen"
                >
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase font-mono">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Architecture Diagram</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewMode('diagram');
                        }}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-mono font-bold transition-all"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Full Width</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-2">
                    <img
                      src={currentSlide!.image}
                      alt={currentSlide!.title}
                      className="w-full h-auto min-h-[220px] sm:min-h-[280px] max-h-[380px] rounded-xl object-contain group-hover:scale-101 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-mono font-bold flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3 text-white" />
                      <span>Enlarge</span>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 rounded-xl mt-2 border border-slate-200">
                    <p className="text-xs font-mono text-slate-800 leading-relaxed font-semibold">
                      {currentSlide!.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Key Takeaway Banner */}
          <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-300 flex items-center gap-2.5 shadow-sm mt-1">
            <span className="text-lg shrink-0">💡</span>
            <div className="text-xs sm:text-sm text-emerald-950 font-bold leading-relaxed">
              <strong className="text-emerald-900 font-black uppercase tracking-wider text-xs block sm:inline mr-2">Key Takeaway:</strong>
              {currentSlide!.keyTakeaway}
            </div>
          </div>

          {/* =========================================================================
              UNIFIED BOTTOM DECK NAVIGATION DOCK (CONSISTENT POSITION & AUTO-SCROLL)
              ========================================================================= */}
          <div className="pt-3.5 border-t border-slate-200 mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: Previous Button & Progress Bar */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
              <button
                onClick={prevSlide}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs sm:text-sm font-bold text-slate-700 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{slideNum === 1 ? 'Intro' : 'Previous'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-800">
                  Slide {currentSlide!.num < 10 ? `0${currentSlide!.num}` : currentSlide!.num} <span className="text-slate-400">/</span> {totalSlides}
                </span>
                <div className="w-16 sm:w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(slideNum / totalSlides) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Center: Slide Numbers Quick Scrubber (With Auto-Scroll into View) */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-[340px] sm:max-w-[480px] lg:max-w-[580px] px-2 py-1 bg-slate-100/90 rounded-xl border border-slate-200 scroll-smooth">
              <button
                ref={slideNum === 0 ? activeScrubberBtnRef : null}
                onClick={() => setSlideNum(0)}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                  slideNum === 0
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/50'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white bg-slate-50 border border-slate-200'
                }`}
                title="Slide 0: Overview & Bio"
              >
                00
              </button>
              {MASTER_SLIDES_DATA.map((s) => {
                const isActive = s.num === slideNum;
                return (
                  <button
                    key={s.num}
                    ref={isActive ? activeScrubberBtnRef : null}
                    onClick={() => setSlideNum(s.num)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/50 scale-105'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white bg-slate-50 border border-slate-200'
                    }`}
                    title={`Slide ${s.num}: ${s.title}`}
                  >
                    {s.num < 10 ? `0${s.num}` : s.num}
                  </button>
                );
              })}
            </div>

            {/* Right: Next Slide Button */}
            <div className="w-full md:w-auto flex items-center justify-end">
              <button
                onClick={nextSlide}
                disabled={slideNum === totalSlides}
                className={`w-full md:w-auto flex items-center justify-center gap-1.5 px-6 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md ${
                  slideNum === totalSlides
                    ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 active:scale-95'
                }`}
              >
                <span>{slideNum === totalSlides ? 'Completed 🎉' : 'Next Slide'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE GRID OVERVIEW MODAL (LIGHT TABLE / ALL SLIDES AT ONCE)
          ========================================================================= */}
      {gridModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setGridModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-blue-600" />
                  <span>All 20 Slides Overview</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Click any slide card to jump directly to it</p>
              </div>
              <button
                onClick={() => setGridModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of Cards */}
            <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* Slide 0 Card */}
              <div
                onClick={() => {
                  setSlideNum(0);
                  setGridModalOpen(false);
                }}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                  slideNum === 0
                    ? 'border-blue-600 bg-blue-50/50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-blue-400 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Slide 00
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Overview</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-950 leading-snug">
                    CI/CD Masterclass Introduction
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Course introduction, instructor profile (Kerthik), and 4-phase curriculum roadmap.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-blue-600 font-bold">
                  <span>Start deck</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Slides 1-20 Cards */}
              {MASTER_SLIDES_DATA.map((slide) => {
                const isActive = slide.num === slideNum;
                return (
                  <div
                    key={slide.num}
                    onClick={() => {
                      setSlideNum(slide.num);
                      setGridModalOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all hover:scale-102 flex flex-col justify-between ${
                      isActive
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-blue-400 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                          Slide {slide.num < 10 ? `0${slide.num}` : slide.num}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-semibold">
                          {slide.category}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-950 leading-snug">
                        {slide.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                        {slide.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium truncate max-w-[140px]">
                        {slide.foodAnalogy ? '🍔 Has Analogy' : '⚡ Concept'}
                      </span>
                      <span className="text-blue-600 font-bold flex items-center gap-0.5">
                        Jump <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          HIGH-RESOLUTION DIAGRAM LIGHTBOX MODAL WITH ZOOM CONTROLS
          ========================================================================= */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
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
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 uppercase">
                  High-Resolution Full View Diagram
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.6, prev - 0.2))}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-700 w-12 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.2))}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
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
