import React, { useState, useEffect } from 'react';
import { 
  packetTracerRoadmapPhases, 
  mcpInteractiveDemos, 
  RoadmapPhase, 
  RoadmapItem,
  McpInteractiveDemo 
} from '../data/packetTracerRoadmapData';
import { roadmapLessonsContent, RoadmapLessonDetail } from '../data/packetTracerLessonContent';
import { RoadmapLessonModal } from '../components/RoadmapLessonModal';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Layers, 
  Network, 
  Shield, 
  Rocket, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  AlertTriangle, 
  HelpCircle,
  Play,
  ArrowLeft,
  Search,
  RotateCcw
} from 'lucide-react';

interface LearningRoadmapPageProps {
  onBackToHome: () => void;
  onOpenSimulator?: () => void;
}

export const LearningRoadmapPage: React.FC<LearningRoadmapPageProps> = ({ 
  onBackToHome,
  onOpenSimulator
}) => {
  // Local storage persisted completed items
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pt_mcp_roadmap_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'roadmap' | 'simulator' | 'faq'>('roadmap');
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDemo, setSelectedDemo] = useState<McpInteractiveDemo>(mcpInteractiveDemos[0]);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoOutput, setDemoOutput] = useState<any>(mcpInteractiveDemos[0].sampleResponse);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // All sequential milestone item IDs and tasks for Next/Prev modal navigation
  const allTasks = packetTracerRoadmapPhases.flatMap(p => p.items);
  const totalTasksCount = allTasks.length;
  const completedCount = allTasks.filter(t => completedItems.includes(t.id)).length;
  const progressPercent = Math.round((completedCount / (totalTasksCount || 1)) * 100);

  const allMilestoneIds = allTasks.map(i => i.id);
  const currentLessonIndex = selectedLessonId ? allMilestoneIds.indexOf(selectedLessonId) : -1;
  const hasPrevLesson = currentLessonIndex > 0;
  const hasNextLesson = currentLessonIndex >= 0 && currentLessonIndex < allMilestoneIds.length - 1;

  const handlePrevLesson = () => {
    if (hasPrevLesson) {
      setSelectedLessonId(allMilestoneIds[currentLessonIndex - 1]);
    }
  };

  const handleNextLesson = () => {
    if (hasNextLesson) {
      setSelectedLessonId(allMilestoneIds[currentLessonIndex + 1]);
    }
  };

  // Selected lesson detail
  const selectedLesson: RoadmapLessonDetail | null = selectedLessonId ? (
    roadmapLessonsContent[selectedLessonId] || {
      id: selectedLessonId,
      title: allTasks.find(t => t.id === selectedLessonId)?.title || 'Milestone Tutorial',
      phaseTitle: 'Cisco Packet Tracer AI & MCP Roadmap',
      estimatedReadTime: '8 mins',
      difficulty: 'Intermediate',
      overview: allTasks.find(t => t.id === selectedLessonId)?.description || '',
      mentalModelAnalogy: {
        title: 'Core System Concept',
        description: 'Understand how automated MCP tool calls orchestrate Packet Tracer simulation engines.'
      },
      deepDiveSections: [
        {
          heading: 'Technical Architecture & Deep Dive',
          content: 'Detailed step-by-step breakdown of how packet-tracer-mcp handles this operation.'
        }
      ],
      handsOnLab: {
        labTitle: 'Hands-On Milestone Lab',
        prerequisites: ['Packet Tracer v8.2+', 'Bridge Connected'],
        steps: ['Run the command in Packet Tracer', 'Verify connectivity'],
        aiPrompt: 'Execute this task in Packet Tracer using MCP tools.',
        expectedOutcome: 'Task verified successfully.'
      },
      troubleshootingTips: ['Ensure Cisco Packet Tracer bridge is active and authorized.'],
      knowledgeQuiz: {
        question: 'What is the primary tool call used for this operation?',
        options: ['pt_bridge_status', 'add_device', 'test_reachability', 'configure_interface'],
        correctIndex: 0,
        explanation: 'The MCP server coordinates these commands through local IPC.'
      }
    }
  ) : null;

  useEffect(() => {
    try {
      localStorage.setItem('pt_mcp_roadmap_completed', JSON.stringify(completedItems));
    } catch (e) {
      console.error('Failed to save roadmap progress', e);
    }
  }, [completedItems]);

  const toggleItemCompleted = (id: string) => {
    setCompletedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your learning roadmap progress?')) {
      setCompletedItems([]);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(label);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Filter phases & items based on selected filter and search query
  const filteredPhases = packetTracerRoadmapPhases.map(phase => {
    if (selectedPhaseId !== 'all' && phase.id !== selectedPhaseId) {
      return null;
    }
    const matchingItems = phase.items.filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q)) ||
        item.keyConcepts.some(c => c.toLowerCase().includes(q))
      );
    });
    if (matchingItems.length === 0 && searchQuery.trim()) return null;
    return { ...phase, items: matchingItems };
  }).filter(Boolean) as RoadmapPhase[];

  const runMcpDemo = (demo: McpInteractiveDemo) => {
    setSelectedDemo(demo);
    setIsDemoRunning(true);
    setDemoOutput(null);
    setTimeout(() => {
      setIsDemoRunning(false);
      setDemoOutput(demo.sampleResponse);
    }, 600);
  };

  const getPhaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-blue-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-600" />;
      case 'Network': return <Network className="w-5 h-5 text-amber-600" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-600" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-violet-600" />;
      default: return <Cpu className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* =========================================================================
          TOP HERO BANNER
          ========================================================================= */}
      <section className="bg-white border-b border-slate-200/90 pt-8 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-2xs">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-amber-100/40 to-transparent rounded-full blur-2xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs / Back button */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>New Module: NetDevOps & AI MCP</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Network className="w-5 h-5" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                  Cisco Packet Tracer AI & MCP Learning Roadmap
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-4">
                Master automated network engineering with LLMs, Anthropic’s <strong>Model Context Protocol (MCP)</strong>, and Cisco Packet Tracer. Build, configure, wire, and verify live networking topologies autonomously using natural language and CI/CD pipelines.
              </p>

              {/* GitHub Official Reference & Instructor Endorsement */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <a
                  href="https://github.com/Mats2208/MCP-Packet-Tracer/blob/main/llms-install.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official Repo: Mats2208/MCP-Packet-Tracer (llms-install.md)</span>
                </a>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-950 rounded-xl font-medium">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                  <span>Curated by <strong>Aajera Banu S</strong> (AWS & Networking Trainer at LIVEWIRE)</span>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="shrink-0 w-full lg:w-80 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-900/10 border border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Roadmap Mastery
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {progressPercent}% Complete
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-black text-white">{completedCount}</span>
                <span className="text-xs text-slate-400 font-medium">of {totalTasksCount} milestones completed</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700">
                <span className="text-slate-400">
                  {progressPercent === 100 ? '🎉 All Labs Mastered!' : `${totalTasksCount - completedCount} milestones left`}
                </span>
                {completedCount > 0 && (
                  <button
                    onClick={resetProgress}
                    className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                    title="Reset checklist progress"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Roadmap, Interactive Simulator, FAQ) */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Full Roadmap (8 Phases)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {packetTracerRoadmapPhases.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'simulator'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Live MCP Tool Playground</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'faq'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Troubleshooting & FAQ</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TAB 1: LEARNING ROADMAP VIEW
          ========================================================================= */}
      {activeTab === 'roadmap' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Quick Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 shrink-0 mr-1">Phase Filter:</span>
              <button
                onClick={() => setSelectedPhaseId('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                  selectedPhaseId === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All (8)
              </button>
              {packetTracerRoadmapPhases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                    selectedPhaseId === phase.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Phase {phase.phaseNumber}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative shrink-0 w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics (e.g. OSPF, uv, VLAN)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Phases Grid / List */}
          <div className="space-y-10">
            {filteredPhases.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No matching roadmap milestones found</h3>
                <p className="text-xs text-slate-500 mt-1">Try clearing your search query or choosing another phase filter.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedPhaseId('all'); }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredPhases.map((phase) => {
                const phaseCompletedCount = phase.items.filter(i => completedItems.includes(i.id)).length;
                const phaseTotalCount = phase.items.length;
                const isPhaseAllDone = phaseCompletedCount === phaseTotalCount && phaseTotalCount > 0;

                return (
                  <section 
                    key={phase.id} 
                    id={phase.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:border-slate-300 transition-all"
                  >
                    {/* Phase Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                          {getPhaseIcon(phase.icon)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {phase.badge}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              Phase {phase.phaseNumber} of {packetTracerRoadmapPhases.length}
                            </span>
                            {isPhaseAllDone && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Phase Complete</span>
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                            {phase.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1">
                            {phase.summary}
                          </p>
                        </div>
                      </div>

                      <div className="text-left md:text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {phaseCompletedCount} / {phaseTotalCount} completed
                        </span>
                        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${(phaseCompletedCount / phaseTotalCount) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Phase Items Checklist */}
                    <div className="mt-6 space-y-6">
                      {phase.items.map((item) => {
                        const isDone = completedItems.includes(item.id);

                        return (
                          <div
                            key={item.id}
                            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                              isDone
                                ? 'bg-emerald-50/30 border-emerald-200/80'
                                : 'bg-slate-50/60 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3.5 flex-1">
                                <button
                                  onClick={() => toggleItemCompleted(item.id)}
                                  className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-600 focus:outline-none transition-colors"
                                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                                  ) : (
                                    <Circle className="w-6 h-6 text-slate-300 hover:text-slate-400" />
                                  )}
                                </button>

                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                      item.difficulty === 'Beginner'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : item.difficulty === 'Intermediate'
                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                    }`}>
                                      {item.difficulty}
                                    </span>
                                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                                      ⏱️ {item.estimatedTime}
                                    </span>
                                    {item.tags.map(tag => (
                                      <span key={tag} className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>

                                  <h3 className={`text-base sm:text-lg font-bold ${isDone ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                                    {item.title}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                                    {item.description}
                                  </p>

                                  {/* Key Concepts */}
                                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                      Key Concepts & Architecture:
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                                      {item.keyConcepts.map((concept, i) => (
                                        <li key={i} className="flex items-start gap-1.5">
                                          <span className="text-blue-600 font-bold shrink-0">▸</span>
                                          <span>{concept}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Action Steps */}
                                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                      Action Steps:
                                    </h4>
                                    <ol className="space-y-1.5 text-xs text-slate-700 font-medium">
                                      {item.actionSteps.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                                            {idx + 1}
                                          </span>
                                          <span>{step}</span>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>

                                  {/* Code / Command Snippets if available */}
                                  {item.commandSnippets && item.commandSnippets.length > 0 && (
                                    <div className="mt-4 space-y-2.5">
                                      {item.commandSnippets.map((cmd, cIdx) => (
                                        <div key={cIdx} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs">
                                          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                                            <span>{cmd.label}</span>
                                            <button
                                              onClick={() => copyToClipboard(cmd.command, `${item.id}-${cIdx}`)}
                                              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                                              title="Copy to clipboard"
                                            >
                                              {copiedSnippet === `${item.id}-${cIdx}` ? (
                                                <>
                                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                  <span className="text-emerald-400 font-bold text-[10px]">Copied!</span>
                                                </>
                                              ) : (
                                                <>
                                                  <Copy className="w-3.5 h-3.5" />
                                                  <span className="text-[10px]">Copy</span>
                                                </>
                                              )}
                                            </button>
                                          </div>
                                          <pre className="p-3 font-mono text-xs overflow-x-auto text-emerald-300 selection:bg-emerald-900">
                                            <code>{cmd.command}</code>
                                          </pre>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Verification Check Callout */}
                                  <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs flex items-start gap-2.5">
                                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                      <strong className="font-bold text-amber-900">Milestone Checkpoint: </strong>
                                      <span>{item.verificationCheck}</span>
                                    </div>
                                  </div>

                                  {/* Deep Lesson Reader CTA */}
                                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-2.5">
                                    <button
                                      onClick={() => setSelectedLessonId(item.id)}
                                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-2 shadow-xs hover:shadow-blue-500/25 transition-all hover:scale-102 active:scale-98"
                                    >
                                      <BookOpen className="w-4 h-4 text-blue-200" />
                                      <span>Read In-Depth Lesson & Lab Guide</span>
                                    </button>

                                    <button
                                      onClick={() => toggleItemCompleted(item.id)}
                                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                                        isDone
                                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 shadow-2xs'
                                      }`}
                                    >
                                      {isDone ? (
                                        <>
                                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                          <span>Completed</span>
                                        </>
                                      ) : (
                                        <>
                                          <Circle className="w-4 h-4 text-slate-400" />
                                          <span>Mark as Complete</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </main>
      )}

      {/* =========================================================================
          TAB 2: INTERACTIVE MCP TOOL PLAYGROUND & SIMULATOR
          ========================================================================= */}
      {activeTab === 'simulator' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive MCP IPC Sandbox</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  Model Context Protocol Tool Explorer
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Interact with the real JSON-RPC tool signatures exposed by <code>Mats2208/MCP-Packet-Tracer</code> to Cisco Packet Tracer.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-slate-700">Bridge: Listening on IPC</span>
              </div>
            </div>

            {/* Selector of Demos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 mb-8">
              {mcpInteractiveDemos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => runMcpDemo(demo)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedDemo.id === demo.id
                      ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-blue-700">
                      {demo.tool}
                    </span>
                    <Play className={`w-3.5 h-3.5 ${selectedDemo.id === demo.id ? 'text-blue-600 fill-blue-600' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{demo.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{demo.description}</p>
                </button>
              ))}
            </div>

            {/* Live Interactive Payload & Output Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Tool Request */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 text-white overflow-hidden shadow-lg flex flex-col">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="ml-2 font-bold text-slate-300">Tool Call: {selectedDemo.tool}()</span>
                  </div>
                  <button
                    onClick={() => runMcpDemo(selectedDemo)}
                    className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Send Tool Call</span>
                  </button>
                </div>

                <div className="p-4 flex-1 font-mono text-xs space-y-3">
                  <div className="text-slate-400">
                    <span className="text-purple-400 font-bold">POST</span> /mcp/v1/tools/invoke
                  </div>
                  <div>
                    <span className="text-slate-400">// Parameters passed from LLM to Cisco Packet Tracer</span>
                    <pre className="mt-1 text-emerald-300 overflow-x-auto">
                      <code>{JSON.stringify({ tool: selectedDemo.tool, arguments: selectedDemo.requestPayload }, null, 2)}</code>
                    </pre>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-400">
                  Transport: <code>stdio</code> IPC Bridge ➔ <code>MCP-Control-Center.pts</code> (Packet Tracer v8.2+)
                </div>
              </div>

              {/* Right Column: Bridge Output */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 text-white overflow-hidden shadow-lg flex flex-col">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="font-bold text-slate-300">Packet Tracer IPC Response</span>
                  {isDemoRunning ? (
                    <span className="flex items-center gap-1 text-amber-400 text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      Executing in PT Engine...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-bold">
                      <Check className="w-3.5 h-3.5" />
                      Status 200 OK (Bridge Success)
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 font-mono text-xs overflow-auto">
                  {isDemoRunning ? (
                    <div className="h-48 flex flex-col items-center justify-center text-slate-400 space-y-2">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs">Sending command to Packet Tracer QtScript engine...</span>
                    </div>
                  ) : (
                    <pre className="text-cyan-300 overflow-x-auto">
                      <code>{JSON.stringify(demoOutput, null, 2)}</code>
                    </pre>
                  )}
                </div>

                <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Simulated Execution Time: <strong>2.4 ms</strong></span>
                  <span className="text-emerald-400">Packet Tracer Engine Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          TAB 3: TROUBLESHOOTING & FAQ
          ========================================================================= */}
      {activeTab === 'faq' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Frequently Encountered Setup Issues</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Packet Tracer MCP Troubleshooting Guide
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Solutions to the most common configuration errors when connecting AI agents to Cisco Packet Tracer.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {/* Question 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>1. <code>pt_bridge_status</code> returns "Bridge Disconnected" or timeout</span>
                </h3>
                <div className="mt-2 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>
                    <strong>Cause:</strong> Cisco Packet Tracer is either not running, or the <code>MCP-Control-Center.pts</code> script module was not authorized upon startup.
                  </p>
                  <p>
                    <strong>Fix:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Quit Cisco Packet Tracer completely (make sure the process terminates in Activity Monitor / Task Manager).</li>
                    <li>Re-launch Cisco Packet Tracer.</li>
                    <li>When the dialog appears asking <em>"Detected a new script module... Enable?"</em>, click <strong>YES</strong>.</li>
                    <li>In your AI assistant terminal, re-run <code>pt_bridge_status</code>.</li>
                  </ol>
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>2. Script module popup never appears when Packet Tracer starts</span>
                </h3>
                <div className="mt-2 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>
                    <strong>Cause:</strong> The script file <code>MCP-Control-Center.pts</code> was not copied into the exact extensions path read by your Packet Tracer installation.
                  </p>
                  <p>
                    <strong>Fix:</strong> Open Cisco Packet Tracer manually and navigate to:
                    <br />
                    <code>Extensions ➔ Scripting ➔ Configure PT Script Modules</code>
                    <br />
                    Click <strong>Add Module</strong> and browse to the <code>MCP-Control-Center.pts</code> file generated by the installation.
                  </p>
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>3. "uv: command not found" error during setup</span>
                </h3>
                <div className="mt-2 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>
                    <strong>Cause:</strong> Astral’s <code>uv</code> package manager is not installed or the binary directory is not in your system’s <code>$PATH</code>.
                  </p>
                  <p>
                    <strong>Fix:</strong> Run the standalone install script:
                  </p>
                  <pre className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[11px]">
                    curl -LsSf https://astral.sh/uv/install.sh | sh
                  </pre>
                  <p>Then restart your terminal session or run <code>source ~/.zshrc</code>.</p>
                </div>
              </div>

              {/* Question 4 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>4. Windows UI extras ("packet-tracer-mcp[ui]")</span>
                </h3>
                <div className="mt-2 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>
                    <strong>Note for Windows users:</strong> If you want the AI assistant to be able to open GUI device configuration windows automatically, register the server with the <code>[ui]</code> extra:
                  </p>
                  <pre className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[11px]">
                    uvx --from "packet-tracer-mcp[ui]" packet-tracer-mcp --stdio
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          DETAILED ROADMAP LESSON MODAL (FULL TUTORIAL & LAB CONTENT)
          ========================================================================= */}
      {selectedLesson && (
        <RoadmapLessonModal
          lesson={selectedLesson}
          isOpen={!!selectedLessonId}
          onClose={() => setSelectedLessonId(null)}
          isCompleted={completedItems.includes(selectedLesson.id)}
          onToggleComplete={() => toggleItemCompleted(selectedLesson.id)}
          onPrevLesson={handlePrevLesson}
          onNextLesson={handleNextLesson}
          hasPrev={hasPrevLesson}
          hasNext={hasNextLesson}
        />
      )}
    </div>
  );
};
