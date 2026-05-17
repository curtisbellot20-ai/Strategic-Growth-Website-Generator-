'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Zap, Sparkles, TrendingUp,
  ChevronDown, ChevronUp, ArrowRight,
  CheckSquare, AlertTriangle, Lightbulb,
} from 'lucide-react';
import type { WebsiteScoreReport, ScoreDimension, ScorePriority } from '@/types/scoring';

// ── Score color helpers ────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 9) return { text: 'text-emerald-400', bg: 'bg-emerald-900/30', border: 'border-emerald-500/30', ring: '#10b981' };
  if (score >= 7) return { text: 'text-blue-400',    bg: 'bg-blue-900/30',    border: 'border-blue-500/30',    ring: '#3b82f6' };
  if (score >= 5) return { text: 'text-yellow-400',  bg: 'bg-yellow-900/20',  border: 'border-yellow-500/30',  ring: '#eab308' };
  if (score >= 3) return { text: 'text-orange-400',  bg: 'bg-orange-900/20',  border: 'border-orange-500/30',  ring: '#f97316' };
  return               { text: 'text-red-400',     bg: 'bg-red-900/20',     border: 'border-red-500/30',     ring: '#ef4444' };
}

function priorityBadge(priority: ScorePriority) {
  const map: Record<ScorePriority, string> = {
    critical: 'bg-red-500/20 text-red-300 border-red-500/30',
    high:     'bg-orange-500/20 text-orange-300 border-orange-500/30',
    medium:   'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    low:      'bg-green-500/20 text-green-300 border-green-500/30',
  };
  return map[priority];
}

// ── Overall Score Ring ────────────────────────────────────────────────────────────

function OverallRing({ score, grade }: { score: number; grade: string }) {
  const radius = 54;
  const circ   = 2 * Math.PI * radius;
  const pct    = Math.min(score / 10, 1);
  const col    = scoreColor(score);
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke={col.ring} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-black ${col.text}`}>{score.toFixed(1)}</span>
        <span className="text-gray-500 text-xs">/10</span>
        <span className={`text-sm font-bold mt-0.5 ${col.text}`}>{grade}</span>
      </div>
    </div>
  );
}

// ── Mini score bar ───────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const col = scoreColor(score);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div className={`h-full rounded-full`}
          style={{ backgroundColor: col.ring }}
          initial={{ width: 0 }}
          animate={{ width: `${score * 10}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className={`text-xs font-bold w-4 text-right ${col.text}`}>{score}</span>
    </div>
  );
}

// ── Individual score card ───────────────────────────────────────────────────────────

function ScoreCard({ dim }: { dim: ScoreDimension }) {
  const [open, setOpen] = useState(false);
  const col = scoreColor(dim.score);

  return (
    <motion.div
      layout
      className={`border rounded-xl overflow-hidden ${col.border} ${col.bg}`}
    >
      {/* Collapsed header */}
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-all">
        {/* Score number */}
        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 bg-black/20 border ${col.border}`}>
          <span className={`text-lg font-black leading-none ${col.text}`}>{dim.score}</span>
          <span className="text-[9px] text-gray-500 leading-none">/10</span>
        </div>

        {/* Category + summary */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-white font-semibold text-sm">{dim.category}</span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${col.text} ${col.border} bg-black/20`}>
              {dim.grade}
            </span>
          </div>
          <p className="text-gray-400 text-xs truncate">{dim.summary}</p>
        </div>

        {/* Priority + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`hidden sm:inline px-2 py-0.5 rounded-full text-[9px] font-semibold border uppercase ${priorityBadge(dim.priority)}`}>
            {dim.priority}
          </span>
          {open
            ? <ChevronUp  className="w-4 h-4 text-gray-500" />
            : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="px-4 pb-4 space-y-3 border-t border-white/5"
        >
          {/* Score bar */}
          <div className="pt-3">
            <ScoreBar score={dim.score} />
          </div>

          {/* Why */}
          <div>
            <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider mb-1">Why this score</p>
            <p className="text-gray-300 text-sm leading-relaxed">{dim.why}</p>
          </div>

          {/* Missing */}
          <div>
            <p className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider mb-2">What’s missing</p>
            <ul className="space-y-1">
              {dim.missing.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div>
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">How to reach 10/10</p>
            <ul className="space-y-1">
              {dim.improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <ArrowRight className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick win */}
          <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3">
            <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider mb-1">⚡ Quick Win This Week</p>
            <p className="text-sky-200 text-xs font-medium">{dim.quickWin}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Group config ──────────────────────────────────────────────────────────────────

const GROUPS = [
  { name: 'Digital Presence',    icon: Search,    color: 'text-green-400',  categories: ['SEO', 'Local SEO', 'GEO', 'AEO'] },
  { name: 'Technical Performance', icon: Zap,      color: 'text-blue-400',   categories: ['Speed', 'Mobile UX', 'Accessibility', 'Analytics Readiness'] },
  { name: 'Brand Experience',    icon: Sparkles,  color: 'text-purple-400', categories: ['Branding', 'Atmosphere', 'Creative Design', 'Storytelling'] },
  { name: 'Revenue Engine',      icon: TrendingUp,color: 'text-amber-400',  categories: ['Trust', 'Conversion', 'Customer Acquisition', 'Retention', 'Referral Readiness'] },
] as const;

// ── Main Report ──────────────────────────────────────────────────────────────

export default function ScoringReport({ report }: { report: WebsiteScoreReport }) {
  const dimMap = Object.fromEntries(report.dimensions.map(d => [d.category, d]));

  const highestDim = [...report.dimensions].sort((a, b) => b.score - a.score)[0];
  const lowestDim  = [...report.dimensions].sort((a, b) => a.score - b.score)[0];
  const critCount  = report.dimensions.filter(d => d.priority === 'critical').length;

  return (
    <div className="space-y-6">

      {/* ──────── OVERALL SCORE HEADER ──────── */}
      <div className="bg-gradient-to-r from-sky-900/30 to-indigo-900/20 border border-sky-500/20 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <OverallRing score={report.overallScore} grade={report.overallGrade} />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[10px] font-medium text-sky-400 uppercase tracking-widest mb-1">Website Score Report</p>
            <h3 className="text-xl font-bold text-white mb-1">{report.businessName}</h3>
            <p className="text-sky-300 text-sm font-semibold mb-2">{report.scorePersonality}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{report.scoreSummary}</p>
          </div>
          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 flex-shrink-0">
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Highest</p>
              <p className={`text-lg font-black ${scoreColor(highestDim.score).text}`}>{highestDim.score}</p>
              <p className="text-gray-400 text-[10px]">{highestDim.category}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Lowest</p>
              <p className={`text-lg font-black ${scoreColor(lowestDim.score).text}`}>{lowestDim.score}</p>
              <p className="text-gray-400 text-[10px]">{lowestDim.category}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Critical</p>
              <p className={`text-lg font-black ${critCount > 0 ? 'text-red-400' : 'text-green-400'}`}>{critCount}</p>
              <p className="text-gray-400 text-[10px]">gaps</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Scored</p>
              <p className="text-lg font-black text-sky-400">{report.dimensions.length}</p>
              <p className="text-gray-400 text-[10px]">dimensions</p>
            </div>
          </div>
        </div>
      </div>

      {/* ──────── GROUP SCORE BARS ──────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {report.groupSummaries.map((group, i) => {
          const GroupIcon = GROUPS[i]?.icon || TrendingUp;
          const col       = scoreColor(group.averageScore);
          const groupColor = GROUPS[i]?.color || 'text-sky-400';
          return (
            <div key={group.groupName} className={`bg-white/5 border ${col.border} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <GroupIcon className={`w-4 h-4 ${groupColor} flex-shrink-0`} />
                <p className="text-white text-xs font-semibold">{group.groupName}</p>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className={`text-2xl font-black ${col.text}`}>{group.averageScore.toFixed(1)}</span>
                <span className="text-gray-500 text-xs mb-1">/10</span>
              </div>
              <ScoreBar score={group.averageScore} />
              <p className="text-gray-500 text-[10px] mt-2 leading-relaxed">{group.insight}</p>
            </div>
          );
        })}
      </div>

      {/* ──────── STRENGTHS / GAPS / QUICK WINS ──────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Top Strengths</p>
          </div>
          <ul className="space-y-2">
            {report.topStrengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <p className="text-red-300 text-xs font-semibold uppercase tracking-wider">Critical Gaps</p>
          </div>
          <ul className="space-y-2">
            {report.criticalGaps.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-sky-900/20 border border-sky-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-sky-400" />
            <p className="text-sky-300 text-xs font-semibold uppercase tracking-wider">Quick Wins</p>
          </div>
          <ul className="space-y-2">
            {report.quickWins.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                <ArrowRight className="w-3 h-3 text-sky-400 flex-shrink-0 mt-0.5" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ──────── SCORE CARDS BY GROUP ──────── */}
      {GROUPS.map((group) => {
        const Icon = group.icon;
        const dims = group.categories
          .map(cat => dimMap[cat])
          .filter(Boolean) as typeof report.dimensions;
        if (!dims.length) return null;

        const groupAvg = dims.reduce((sum, d) => sum + d.score, 0) / dims.length;
        const col      = scoreColor(groupAvg);

        return (
          <div key={group.name}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 ${group.color}`} />
              <h4 className="text-sm font-semibold text-white">{group.name}</h4>
              <div className="flex-1 h-px bg-white/5" />
              <span className={`text-sm font-bold ${col.text}`}>{groupAvg.toFixed(1)}/10</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dims.map(dim => <ScoreCard key={dim.category} dim={dim} />)}
            </div>
          </div>
        );
      })}

      {/* ──────── 30-DAY PLAN ──────── */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-sky-400" />
          <h4 className="text-sm font-semibold text-white">30-Day Score Improvement Plan</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {report.thirtyDayImprovementPlan.map((week, i) => (
            <div key={i} className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <span className="text-sky-400 font-bold text-xs">W{i + 1}</span>
                </div>
                <p className="text-sky-300 text-xs font-semibold uppercase tracking-wider">Week {i + 1}</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{week}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
