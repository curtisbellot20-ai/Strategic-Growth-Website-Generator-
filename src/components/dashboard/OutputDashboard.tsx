'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Search, FileText, Palette,
  TrendingUp, BarChart3, CheckSquare, Download,
  RotateCcw, Brain, Wind,
} from 'lucide-react';
import type { WebsiteBlueprint } from '@/types';
import ScoreCard        from './ScoreCard';
import SEOPanel         from './SEOPanel';
import PagesPanel       from './PagesPanel';
import StrategyPanel    from './StrategyPanel';
import GrowthPanel      from './GrowthPanel';
import ColorPanel       from './ColorPanel';
import AtmospherePanel  from './AtmospherePanel';
import ImprovementPanel from './ImprovementPanel';
import IntelligenceTab  from '@/components/intelligence/IntelligenceTab';
import AtmosphereTab    from '@/components/atmosphere/AtmosphereTab';

const TABS = [
  { id: 'overview',     label: 'Overview',         icon: LayoutDashboard,  badge: null },
  { id: 'intelligence', label: 'Intelligence',      icon: Brain,            badge: 'AI' },
  { id: 'atmosphere',   label: 'Atmosphere',        icon: Wind,             badge: 'AI' },
  { id: 'seo',          label: 'SEO / GEO / AEO',  icon: Search,           badge: null },
  { id: 'pages',        label: 'Page Blueprints',   icon: FileText,         badge: null },
  { id: 'strategy',     label: 'Strategy',          icon: TrendingUp,       badge: null },
  { id: 'growth',       label: 'Growth Engines',    icon: BarChart3,        badge: null },
  { id: 'design',       label: 'Design',            icon: Palette,          badge: null },
  { id: 'actions',      label: 'Action Plan',       icon: CheckSquare,      badge: null },
] as const;

type TabId = typeof TABS[number]['id'];

const TAB_COLORS: Partial<Record<TabId, string>> = {
  intelligence: 'bg-purple-600',
  atmosphere:   'bg-teal-600',
};

interface Props {
  blueprint: WebsiteBlueprint;
  onReset: () => void;
}

export default function OutputDashboard({ blueprint, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${blueprint.businessIntake.businessName.replace(/\s+/g, '-').toLowerCase()}-blueprint.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">{blueprint.businessIntake.businessName}</h2>
          <p className="text-gray-400 text-sm">
            {blueprint.businessIntake.city}, {blueprint.businessIntake.state}
            &nbsp;&middot;&nbsp;{blueprint.businessIntake.industry}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleDownload} className="btn-secondary flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" /> Export JSON
          </button>
          <button onClick={onReset} className="btn-secondary flex items-center gap-2 text-sm">
            <RotateCcw className="w-4 h-4" /> New Blueprint
          </button>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon     = tab.icon;
          const isActive = activeTab === tab.id;
          const activeBg = TAB_COLORS[tab.id] || 'bg-sky-500';
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                isActive ? `${activeBg} text-white shadow` : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.badge && (
                <span className="ml-0.5 px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-bold">{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ScoreCard report={blueprint.scoringReport} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ColorPanel      colors={blueprint.colorSystem} />
              <AtmospherePanel atmosphere={blueprint.atmosphereDesign} />
            </div>
          </div>
        )}

        {activeTab === 'intelligence' && (
          <IntelligenceTab intake={blueprint.businessIntake} />
        )}

        {activeTab === 'atmosphere' && (
          <AtmosphereTab intake={blueprint.businessIntake} />
        )}

        {activeTab === 'seo' && <SEOPanel seo={blueprint.seoStrategy} />}

        {activeTab === 'pages' && <PagesPanel pages={blueprint.pageBlueprints} />}

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
    </div>
  );
}
