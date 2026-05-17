'use client';
import { motion } from 'framer-motion';
import {
  MapPin, Briefcase, Star, ChevronRight, FileText,
  Brain, Wind, Sparkles, Search, Gauge, Heart,
  Target, Gem, Share2, Layers, Zap, ArrowRight,
  CheckSquare, BarChart3, TrendingUp, Globe,
} from 'lucide-react';
import type { WebsiteBlueprint, ImprovementItem, PageBlueprint } from '@/types';
import ScoreCard from './ScoreCard';
import ColorPanel from './ColorPanel';
import AtmospherePanel from './AtmospherePanel';

const AI_ENGINES = [
  { id: 'intelligence', icon: Brain,   label: 'Industry Intelligence', desc: 'Competitive landscape, gaps, trust signals',         from: 'from-purple-900/30', border: 'border-purple-500/20', iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400' },
  { id: 'atmosphere',  icon: Wind,    label: 'Atmosphere Strategy',  desc: 'Brand mood, sensory identity, design direction',     from: 'from-teal-900/30',   border: 'border-teal-500/20',   iconBg: 'bg-teal-500/20',   iconColor: 'text-teal-400'   },
  { id: 'creative',    icon: Sparkles,label: 'Creative Direction',   desc: 'Layout, typography, hero style, animation',         from: 'from-orange-900/30', border: 'border-orange-500/20', iconBg: 'bg-orange-500/20', iconColor: 'text-orange-400' },
  { id: 'seo',         icon: Search,  label: 'SEO / GEO / AEO',     desc: 'Search dominance, AI search, voice, schema',         from: 'from-green-900/30',  border: 'border-green-500/20',  iconBg: 'bg-green-500/20',  iconColor: 'text-green-400'  },
  { id: 'persuasion',  icon: Heart,   label: 'Conversion & Copy',   desc: 'Headlines, CTAs, objection handling, storytelling',  from: 'from-rose-900/30',   border: 'border-rose-500/20',   iconBg: 'bg-rose-500/20',   iconColor: 'text-rose-400'   },
  { id: 'acquisition', icon: Target,  label: 'Acquisition Plan',    desc: 'Lead gen, funnels, retargeting, social content',     from: 'from-amber-900/30',  border: 'border-amber-500/20',  iconBg: 'bg-amber-500/20',  iconColor: 'text-amber-400'  },
  { id: 'retention',   icon: Gem,     label: 'Retention Plan',      desc: 'Follow-up, loyalty, VIP, newsletter, reactivation',  from: 'from-indigo-900/30', border: 'border-indigo-500/20', iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400' },
  { id: 'referral',    icon: Share2,  label: 'Referral Plan',       desc: 'Referral system, reviews, word-of-mouth mechanics',  from: 'from-violet-900/30', border: 'border-violet-500/20', iconBg: 'bg-violet-500/20', iconColor: 'text-violet-400' },
  { id: 'scoring',     icon: Gauge,   label: 'Website Score',       desc: '17-dimension score with specific improvement paths',  from: 'from-sky-900/30',    border: 'border-sky-500/20',    iconBg: 'bg-sky-500/20',    iconColor: 'text-sky-400'    },
] as const;

const PRIORITY_DOT: Record<string, string> = {
  critical: 'bg-red-400',  high: 'bg-amber-400', medium: 'bg-blue-400', low: 'bg-gray-500',
};

interface Props {
  blueprint: WebsiteBlueprint;
  onNavigate: (tab: string) => void;
}

export default function BlueprintOverview({ blueprint, onNavigate }: Props) {
  const b = blueprint.businessIntake;
  const pages = (blueprint.pageBlueprints || []) as unknown as PageBlueprint[];
  const checklist = (blueprint.improvementChecklist || []) as unknown as ImprovementItem[];

  const criticalCount  = checklist.filter(item => typeof item === 'object' && item.priority === 'critical').length;
  const highCount      = checklist.filter(item => typeof item === 'object' && item.priority === 'high').length;

  return (
    <div className="space-y-8">

      {/* ─── BUSINESS PROFILE ─── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-sky-900/20 via-indigo-900/10 to-transparent border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-[0.2em] mb-2">Website Blueprint</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 truncate">{b.businessName}</h2>
              {b.tagline && (
                <p className="text-sky-300/80 text-sm italic mb-3">&ldquo;{b.tagline}&rdquo;</p>
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-500" />{b.industry}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-500" />{b.city}, {b.state}</span>
                {b.yearsInBusiness && <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-gray-500" />{b.yearsInBusiness} yrs in business</span>}
                {b.pricePoint && <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-gray-500" />{b.pricePoint}</span>}
              </div>
              {b.uniqueValueProp && (
                <div className="mt-3 flex items-start gap-2">
                  <Globe className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm leading-relaxed">{b.uniqueValueProp}</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
              {[
                { label: 'Pages',      value: pages.length || '—',   color: 'text-sky-400'    },
                { label: 'Luxury',     value: b.luxuryLevel ? `${b.luxuryLevel}/5` : '—', color: 'text-amber-400'  },
                { label: 'Checklist',  value: checklist.length || '—', color: 'text-violet-400'  },
                { label: 'AI Engines', value: '9',                  color: 'text-emerald-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
                  <p className={`font-black text-lg leading-none ${color}`}>{value}</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services strip */}
        {(b.primaryService || (b.services?.length ?? 0) > 0) && (
          <div className="px-6 py-3 border-t border-white/5 bg-black/10">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-semibold">Services</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {b.primaryService}
              {b.secondaryServices ? ` · ${b.secondaryServices}` : ''}
            </p>
          </div>
        )}
      </motion.div>

      {/* ─── SCORE CARD ─── */}
      <ScoreCard report={blueprint.scoringReport} />

      {/* ─── AI ENGINES ─── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-bold text-white">AI Engines</h3>
          <span className="px-2 py-0.5 bg-sky-500/15 text-sky-300 text-[10px] font-bold rounded-full border border-sky-500/20">9 AVAILABLE</span>
          <div className="flex-1 h-px bg-white/5" />
          <p className="text-gray-600 text-xs hidden sm:block">Click to run any engine</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {AI_ENGINES.map(({ id, icon: Icon, label, desc, from, border, iconBg, iconColor }) => (
            <motion.button key={id} onClick={() => onNavigate(id)}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className={`flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br ${from} to-transparent border ${border} hover:brightness-110 transition-all text-left group`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} border ${border}`}>
                <Icon className={`w-4.5 h-4.5 ${iconColor}`} style={{ width: 18, height: 18 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-tight">{label}</p>
                <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 flex-shrink-0 mt-0.5 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── COLOR + ATMOSPHERE ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-3.5 h-3.5 text-gray-500" />
            <h3 className="text-sm font-semibold text-white">Color System</h3>
          </div>
          <ColorPanel colors={blueprint.colorSystem} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-3.5 h-3.5 text-gray-500" />
            <h3 className="text-sm font-semibold text-white">Atmosphere Direction</h3>
          </div>
          <AtmospherePanel atmosphere={blueprint.atmosphereDesign} />
        </div>
      </div>

      {/* ─── PAGE BLUEPRINTS PREVIEW ─── */}
      {pages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              <h3 className="text-sm font-semibold text-white">Page Blueprints</h3>
              <span className="px-2 py-0.5 bg-white/5 text-gray-400 text-[10px] rounded-full border border-white/8">{pages.length} pages</span>
            </div>
            <button onClick={() => onNavigate('pages')}
              className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pages.slice(0, 6).map((page, i) => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-4 hover:bg-white/6 hover:border-white/15 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-white text-sm font-semibold truncate">
                    {page.title || (page as unknown as Record<string, string>).pageName || `Page ${i + 1}`}
                  </p>
                </div>
                {page.metaDescription && (
                  <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">{page.metaDescription}</p>
                )}
                {page.conversionGoal && (
                  <p className="text-sky-400/70 text-[10px] mt-2 font-medium">→ {page.conversionGoal}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── IMPROVEMENT CHECKLIST PREVIEW ─── */}
      {checklist.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-3.5 h-3.5 text-gray-500" />
              <h3 className="text-sm font-semibold text-white">Priority Actions</h3>
              {criticalCount > 0 && <span className="px-2 py-0.5 bg-red-500/15 text-red-300 text-[10px] rounded-full border border-red-500/25">{criticalCount} critical</span>}
              {highCount > 0 && <span className="px-2 py-0.5 bg-amber-500/15 text-amber-300 text-[10px] rounded-full border border-amber-500/25">{highCount} high</span>}
            </div>
            <button onClick={() => onNavigate('actions')}
              className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors">
              Full checklist <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {checklist.slice(0, 6).map((item, i) => {
              const text = typeof item === 'string' ? item : item.action || JSON.stringify(item);
              const priority = typeof item === 'object' ? item.priority : null;
              return (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-white/3 border border-white/8 rounded-xl">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${ priority ? (PRIORITY_DOT[priority] || 'bg-gray-500') : 'bg-sky-400' }`} />
                  <p className="text-gray-300 text-[12px] leading-relaxed">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── QUICK NAV ─── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-3.5 h-3.5 text-gray-500" />
          <h3 className="text-sm font-semibold text-white">Blueprint Sections</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'pages',    label: 'Page Blueprints', icon: FileText    },
            { id: 'strategy', label: 'Strategy',        icon: Target      },
            { id: 'growth',   label: 'Growth Engines',  icon: BarChart3   },
            { id: 'actions',  label: 'Checklist',       icon: CheckSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => onNavigate(id)}
              className="flex items-center gap-2 p-3 bg-white/3 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-xl transition-all text-left group">
              <Icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-gray-400 group-hover:text-white text-xs font-medium transition-colors">{label}</span>
              <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-gray-400 ml-auto transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
