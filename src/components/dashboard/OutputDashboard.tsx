'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Search, FileText, Palette, TrendingUp,
  BarChart3, CheckSquare, Download, RotateCcw, Brain, Wind,
  Sparkles, Heart, Target, Gem, Gauge, Share2, Menu, X,
  ChevronRight, Zap, Save,
} from 'lucide-react';
import type { WebsiteBlueprint } from '@/types';
import { ExportProvider } from '@/lib/export/ExportContext';
import { localProjectService } from '@/lib/projects/projectService';
import { useToast } from '@/lib/toast/toastContext';
import BlueprintOverview  from './BlueprintOverview';
import PagesPanel         from './PagesPanel';
import StrategyPanel      from './StrategyPanel';
import GrowthPanel        from './GrowthPanel';
import ColorPanel         from './ColorPanel';
import AtmospherePanel    from './AtmospherePanel';
import ImprovementPanel   from './ImprovementPanel';
import IntelligenceTab    from '@/components/intelligence/IntelligenceTab';
import AtmosphereTab      from '@/components/atmosphere/AtmosphereTab';
import CreativeTab        from '@/components/creative/CreativeTab';
import SEOIntelligenceTab from '@/components/seo/SEOIntelligenceTab';
import PersuasionTab      from '@/components/persuasion/PersuasionTab';
import AcquisitionTab     from '@/components/acquisition/AcquisitionTab';
import RetentionTab       from '@/components/retention/RetentionTab';
import ReferralTab        from '@/components/referral/ReferralTab';
import ScoringTab         from '@/components/scoring/ScoringTab';
import ExportPanel        from '@/components/export/ExportPanel';

// ── Navigation structure ─────────────────────────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: null,
    items: [
      { id: 'overview', label: 'Dashboard',  icon: LayoutDashboard, color: null, badge: null },
    ],
  },
  {
    label: 'AI Engines',
    items: [
      { id: 'intelligence', label: 'Intelligence',    icon: Brain,    color: 'text-purple-400', badge: 'AI' },
      { id: 'atmosphere',   label: 'Atmosphere',      icon: Wind,     color: 'text-teal-400',   badge: 'AI' },
      { id: 'creative',     label: 'Creative Design', icon: Sparkles, color: 'text-orange-400', badge: 'AI' },
      { id: 'seo',          label: 'SEO / GEO / AEO', icon: Search,   color: 'text-green-400',  badge: 'AI' },
      { id: 'scoring',      label: 'Website Score',   icon: Gauge,    color: 'text-sky-400',    badge: 'AI' },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { id: 'persuasion',  label: 'Conversion & Copy', icon: Heart,  color: 'text-rose-400',   badge: 'AI' },
      { id: 'acquisition', label: 'Acquisition Plan',  icon: Target, color: 'text-amber-400',  badge: 'AI' },
      { id: 'retention',   label: 'Retention Plan',    icon: Gem,    color: 'text-indigo-400', badge: 'AI' },
      { id: 'referral',    label: 'Referral Plan',     icon: Share2, color: 'text-violet-400', badge: 'AI' },
    ],
  },
  {
    label: 'Blueprint',
    items: [
      { id: 'pages',    label: 'Page Blueprints', icon: FileText,   color: null, badge: null },
      { id: 'strategy', label: 'Strategy',        icon: TrendingUp, color: null, badge: null },
      { id: 'growth',   label: 'Growth Engines',  icon: BarChart3,  color: null, badge: null },
      { id: 'design',   label: 'Design System',   icon: Palette,    color: null, badge: null },
    ],
  },
  {
    label: 'Optimize',
    items: [
      { id: 'actions', label: 'Improvement Checklist', icon: CheckSquare, color: null, badge: null },
    ],
  },
] as const;

type TabId =
  | 'overview' | 'intelligence' | 'atmosphere' | 'creative' | 'seo' | 'scoring'
  | 'persuasion' | 'acquisition' | 'retention' | 'referral'
  | 'pages' | 'strategy' | 'growth' | 'design' | 'actions';

const ACTIVE_STYLES: Record<TabId, string> = {
  overview:     'bg-white/10 text-white border-l-2 border-white/30',
  intelligence: 'bg-purple-500/15 text-purple-200 border-l-2 border-purple-500',
  atmosphere:   'bg-teal-500/15   text-teal-200   border-l-2 border-teal-500',
  creative:     'bg-orange-500/15 text-orange-200 border-l-2 border-orange-500',
  seo:          'bg-green-500/15  text-green-200  border-l-2 border-green-500',
  scoring:      'bg-sky-500/15    text-sky-200    border-l-2 border-sky-500',
  persuasion:   'bg-rose-500/15   text-rose-200   border-l-2 border-rose-500',
  acquisition:  'bg-amber-500/15  text-amber-200  border-l-2 border-amber-500',
  retention:    'bg-indigo-500/15 text-indigo-200 border-l-2 border-indigo-500',
  referral:     'bg-violet-500/15 text-violet-200 border-l-2 border-violet-500',
  pages:        'bg-white/10 text-white border-l-2 border-white/20',
  strategy:     'bg-white/10 text-white border-l-2 border-white/20',
  growth:       'bg-white/10 text-white border-l-2 border-white/20',
  design:       'bg-white/10 text-white border-l-2 border-white/20',
  actions:      'bg-white/10 text-white border-l-2 border-white/20',
};

const SECTION_TITLE: Record<TabId, string> = {
  overview:     'Dashboard',
  intelligence: 'Industry Intelligence Report',
  atmosphere:   'Atmosphere Strategy',
  creative:     'Creative Design Direction',
  seo:          'SEO / GEO / AEO Report',
  scoring:      'Website Scoring Report',
  persuasion:   'Conversion & Copy Report',
  acquisition:  'Customer Acquisition Plan',
  retention:    'Retention Plan',
  referral:     'Referral Plan',
  pages:        'Page Blueprints',
  strategy:     'Strategy',
  growth:       'Growth Engines',
  design:       'Design System',
  actions:      'Improvement Checklist',
};

// ── Props ─────────────────────────────────────────────────────────────────────────────────

interface Props {
  blueprint: WebsiteBlueprint;
  onReset: () => void;
}

// ── Sidebar nav (shared between desktop + mobile drawer) ────────────────────────────────────────────

function SidebarNav({
  activeTab, onSelect, business, onClose,
}: {
  activeTab: TabId;
  onSelect: (id: TabId) => void;
  business: string;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/8">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-sky-400" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-bold truncate">{business}</p>
            <p className="text-gray-500 text-[10px]">Website Blueprint</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-4 px-2">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <p className="px-2 mb-1 text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em]">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon     = item.icon;
                const isActive = activeTab === item.id;
                const activeStyle = isActive ? ACTIVE_STYLES[item.id as TabId] : '';
                return (
                  <button
                    key={item.id}
                    onClick={() => { onSelect(item.id as TabId); onClose?.(); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? activeStyle
                        : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${
                      isActive
                        ? ''
                        : 'color' in item && item.color ? item.color : 'text-gray-600'
                    }`} />
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer note */}
      <div className="px-4 py-3 border-t border-white/5">
        <p className="text-[10px] text-gray-600 leading-relaxed">
          AI engines generate independently.
          Click any engine tab to run it.
        </p>
      </div>
    </div>
  );
}

// ── Main Dashboard ──────────────────────────────────────────────────────────────────────

function DashboardInner({ blueprint, onReset }: Props) {
  const [activeTab,   setActiveTab]   = useState<TabId>('overview');
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [exportOpen,  setExportOpen]  = useState(false);
  const [saving,      setSaving]      = useState(false);
  const { toast } = useToast();

  const b = blueprint.businessIntake;
  const navigate = (id: string) => setActiveTab(id as TabId);

  const handleSaveProject = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await localProjectService.create({
        name: b.businessName,
        industry: b.industry,
        intakeData: b,
        blueprint,
      });
      toast.success('Project saved!');
    } catch {
      toast.error('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex -mx-4 sm:-mx-6 lg:-mx-8 min-h-screen relative">

      {/* ──── DESKTOP SIDEBAR ──── */}
      <aside className="hidden lg:flex flex-col w-52 xl:w-60 flex-shrink-0 bg-black/30 border-r border-white/8">
        <div className="sticky top-0 h-screen">
          <SidebarNav activeTab={activeTab} onSelect={setActiveTab} business={b.businessName} />
        </div>
      </aside>

      {/* ──── MOBILE DRAWER OVERLAY ──── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-gray-950 border-r border-white/10 shadow-2xl"
            >
              <SidebarNav
                activeTab={activeTab}
                onSelect={setActiveTab}
                business={b.businessName}
                onClose={() => setDrawerOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──── MAIN CONTENT ──── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* ── Top Header Bar ── */}
        <header className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 bg-gray-950/90 backdrop-blur-xl border-b border-white/8">
          <button onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all flex-shrink-0">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="hidden lg:flex items-center gap-1.5 text-gray-600 text-xs">
              <span>{b.businessName}</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            <p className="text-white text-sm font-semibold truncate">{SECTION_TITLE[activeTab]}</p>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
            <span>{b.industry}</span>
            <span className="text-gray-700">&middot;</span>
            <span>{b.city}, {b.state}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleSaveProject}
              disabled={saving}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-lg border border-emerald-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setExportOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg border border-white/10 transition-all">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg border border-white/10 transition-all">
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Blueprint</span>
            </button>
          </div>
        </header>

        {/* ── Tab Content ── */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 'overview'     && <BlueprintOverview  blueprint={blueprint} onNavigate={navigate} />}
              {activeTab === 'intelligence' && <IntelligenceTab    intake={b} />}
              {activeTab === 'atmosphere'   && <AtmosphereTab      intake={b} />}
              {activeTab === 'creative'     && <CreativeTab        intake={b} />}
              {activeTab === 'seo'          && <SEOIntelligenceTab intake={b} />}
              {activeTab === 'scoring'      && <ScoringTab         intake={b} />}
              {activeTab === 'persuasion'   && <PersuasionTab      intake={b} />}
              {activeTab === 'acquisition'  && <AcquisitionTab     intake={b} />}
              {activeTab === 'retention'    && <RetentionTab       intake={b} />}
              {activeTab === 'referral'     && <ReferralTab        intake={b} />}
              {activeTab === 'pages'        && <PagesPanel         pages={blueprint.pageBlueprints} />}
              {activeTab === 'strategy' && (
                <StrategyPanel
                  strategy={blueprint.strategicIntelligence}
                  persuasion={blueprint.persuasionFramework}
                  storytelling={blueprint.storytellingFramework}
                />
              )}
              {activeTab === 'growth' && (
                <GrowthPanel
                  conversion={blueprint.conversionEngine}
                  acquisition={blueprint.acquisitionEngine}
                  retention={blueprint.retentionEngine}
                  referral={blueprint.referralEngine}
                />
              )}
              {activeTab === 'design' && (
                <div className="space-y-6">
                  <AtmospherePanel atmosphere={blueprint.atmosphereDesign} />
                  <ColorPanel      colors={blueprint.colorSystem} />
                </div>
              )}
              {activeTab === 'actions' && (
                <ImprovementPanel
                  items={blueprint.improvementChecklist}
                  analytics={blueprint.analyticsChecklist}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ──── EXPORT PANEL ──── */}
      {exportOpen && (
        <ExportPanel blueprint={blueprint} onClose={() => setExportOpen(false)} />
      )}
    </div>
  );
}

export default function OutputDashboard({ blueprint, onReset }: Props) {
  return (
    <ExportProvider>
      <DashboardInner blueprint={blueprint} onReset={onReset} />
    </ExportProvider>
  );
}
