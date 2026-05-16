'use client';
import { motion } from 'framer-motion';
import {
  MapPin, Briefcase, Star, ChevronRight, FileText,
  Brain, Wind, Sparkles, Search, Gauge, Heart,
  Target, Gem, Share2, Layers, Zap, ArrowRight,
  CheckSquare, BarChart3,
} from 'lucide-react';
import type { WebsiteBlueprint } from '@/types';
import ScoreCard     from './ScoreCard';
import ColorPanel    from './ColorPanel';
import AtmospherePanel from './AtmospherePanel';

const AI_ENGINES = [
  {
    id: 'intelligence',
    icon: Brain,
    label: 'Industry Intelligence',
    tagline: 'AI ANALYSIS',
    desc: 'Competitive landscape, customer psychology, market gaps, trust signals',
    from: 'from-purple-900/30', border: 'border-purple-500/20', iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400',
  },
  {
    id: 'atmosphere',
    icon: Wind,
    label: 'Atmosphere Strategy',
    tagline: 'AI ANALYSIS',
    desc: 'Brand mood, emotional design direction, sensory identity, atmosphere type',
    from: 'from-teal-900/30', border: 'border-teal-500/20', iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400',
  },
  {
    id: 'creative',
    icon: Sparkles,
    label: 'Creative Direction',
    tagline: 'AI ANALYSIS',
    desc: 'Layout, typography, color system, hero style, image direction, animation',
    from: 'from-orange-900/30', border: 'border-orange-500/20', iconBg: 'bg-orange-500/20', iconColor: 'text-orange-400',
  },
  {
    id: 'seo',
    icon: Search,
    label: 'SEO / GEO / AEO',
    tagline: 'AI ANALYSIS',
    desc: 'Search dominance, AI search, local strategy, schema markup, voice, content',
    from: 'from-green-900/30', border: 'border-green-500/20', iconBg: 'bg-green-500/20', iconColor: 'text-green-400',
  },
  {
    id: 'persuasion',
    icon: Heart,
    label: 'Conversion & Copy',
    tagline: 'AI ANALYSIS',
    desc: 'Headlines, transformation messaging, ethical CTAs, storytelling, objection handling',
    from: 'from-rose-900/30', border: 'border-rose-500/20', iconBg: 'bg-rose-500/20', iconColor: 'text-rose-400',
  },
  {
    id: 'acquisition',
    icon: Target,
    label: 'Customer Acquisition',
    tagline: 'AI ANALYSIS',
    desc: 'Lead magnets, consultation funnel, email/SMS capture, retargeting, social content',
    from: 'from-amber-900/30', border: 'border-amber-500/20', iconBg: 'bg-amber-500/20', iconColor: 'text-amber-400',
  },
  {
    id: 'retention',
    icon: Gem,
    label: 'Retention Plan',
    tagline: 'AI ANALYSIS',
    desc: 'Follow-up sequence, loyalty program, VIP offers, reactivation, newsletter',
    from: 'from-indigo-900/30', border: 'border-indigo-500/20', iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400',
  },
  {
    id: 'referral',
    icon: Share2,
    label: 'Referral Plan',
    tagline: 'AI ANALYSIS',
    desc: 'Referral system, review request flows, customer spotlight, word-of-mouth mechanics',
    from: 'from-violet-900/30', border: 'border-violet-500/20', iconBg: 'bg-violet-500/20', iconColor: 'text-violet-400',
  },
  {
    id: 'scoring',
    icon: Gauge,
    label: 'Website Score',
    tagline: 'AI ANALYSIS',
    desc: '17-dimension scoring (1–10) with why, what’s missing, and how to reach 10/10',
    from: 'from-sky-900/30', border: 'border-sky-500/20', iconBg: 'bg-sky-500/20', iconColor: 'text-sky-400',
  },
] as const;

interface Props {
  blueprint: WebsiteBlueprint;
  onNavigate: (tab: string) => void;
}

export default function BlueprintOverview({ blueprint, onNavigate }: Props) {
  const b   = blueprint.businessIntake;
  const pages = blueprint.pageBlueprints || [];
  const checklist = (blueprint.improvementChecklist || []) as unknown as string[];

  return (
    <div className="space-y-8">

      {/* ─────── BUSINESS PROFILE ─────── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-sky-900/20 via-indigo-900/10 to-transparent border border-white/10 rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-[0.2em] mb-2">Website Blueprint</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 truncate">{b.businessName}</h2>
            {b.tagline && (
              <p className="text-gray-400 text-sm italic mb-3">&ldquo;{b.tagline}&rdquo;</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{b.industry}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{b.city}, {b.state}</span>
              {b.yearsInBusiness && <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" />{b.yearsInBusiness} years</span>}
            </div>
            {b.uniqueDifferentiator && (
              <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-xl">{b.uniqueDifferentiator}</p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-shrink-0">
            {[
              { label: 'Pages',       value: pages.length || '—',         color: 'text-sky-400' },
              { label: 'Luxury',      value: b.luxuryLevel ? `${b.luxuryLevel}/10` : '—', color: 'text-amber-400' },
              { label: 'Tone',        value: b.toneOfVoice || '—',         color: 'text-purple-400' },
              { label: 'AI Engines',  value: '9',                           color: 'text-green-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
                <p className={`font-bold text-base truncate ${color}`}>{value}</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Services</p>
          <p className="text-gray-300 text-sm leading-relaxed">{b.services}</p>
        </div>
      </motion.div>

      {/* ─────── STATIC SCORE CARD ─────── */}
      <ScoreCard report={blueprint.scoringReport} />

      {/* ─────── AI ENGINES ─────── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-4 h-4 text-sky-400" />
          <h3 className="text-base font-bold text-white">AI Engines</h3>
          <span className="px-2 py-0.5 bg-sky-500/15 text-sky-300 text-[10px] font-bold rounded-full border border-sky-500/20">
            9 AVAILABLE
          </span>
          <div className="flex-1 h-px bg-white/5" />
          <p className="text-gray-500 text-xs">Click any engine to generate</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {AI_ENGINES.map(({ id, icon: Icon, label, tagline, desc, from, border, iconBg, iconColor }) => (
            <motion.button key={id} onClick={() => onNavigate(id)}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className={`flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br ${from} to-transparent border ${border} hover:brightness-110 transition-all text-left group`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} border ${border}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${iconColor} opacity-70`}>{tagline}</p>
                <p className="text-white text-sm font-semibold leading-tight">{label}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 flex-shrink-0 mt-1 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─────── COLOR + ATMOSPHERE ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-white">Color System</h3>
          </div>
          <ColorPanel colors={blueprint.colorSystem} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-white">Atmosphere Design</h3>
          </div>
          <AtmospherePanel atmosphere={blueprint.atmosphereDesign} />
        </div>
      </div>

      {/* ─────── PAGE BLUEPRINTS PREVIEW ─────── */}
      {pages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-white">Page Blueprints</h3>
              <span className="px-2 py-0.5 bg-white/5 text-gray-400 text-[10px] rounded-full">{pages.length} pages</span>
            </div>
            <button onClick={() => onNavigate('pages')}
              className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pages.slice(0, 6).map((page: Record<string, string>, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-white text-sm font-semibold truncate">
                    {page.pageName || page.name || `Page ${i + 1}`}
                  </p>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {page.purpose || page.description || page.pageGoal || ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────── IMPROVEMENT CHECKLIST PREVIEW ─────── */}
      {checklist.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-white">Improvement Checklist</h3>
              <span className="px-2 py-0.5 bg-white/5 text-gray-400 text-[10px] rounded-full">{checklist.length} items</span>
            </div>
            <button onClick={() => onNavigate('actions')}
              className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {checklist.slice(0, 6).map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-white/5 border border-white/5 rounded-lg">
                <CheckSquare className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-xs leading-relaxed">
                  {typeof item === 'string' ? item : JSON.stringify(item)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────── QUICK NAVIGATION ─────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-white">Blueprint Sections</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'pages',    label: 'Page Blueprints', icon: FileText },
            { id: 'strategy', label: 'Strategy',        icon: Target   },
            { id: 'growth',   label: 'Growth Engines',  icon: BarChart3},
            { id: 'actions',  label: 'Checklist',       icon: CheckSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => onNavigate(id)}
              className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left group">
              <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-gray-400 group-hover:text-white text-xs font-medium transition-colors">{label}</span>
              <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-gray-400 ml-auto transition-colors" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
