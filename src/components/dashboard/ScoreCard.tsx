'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ScoringReport } from '@/types';

interface Props { report?: ScoringReport | null }

function ScoreRing({ score, max = 100 }: { score: number; max?: number }) {
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(score / max, 1);
  const offset = circ * (1 - pct);
  const color = pct >= 0.8 ? '#22c55e' : pct >= 0.6 ? '#3b82f6' : pct >= 0.4 ? '#f59e0b' : '#ef4444';
  const textColor = pct >= 0.8 ? 'text-green-400' : pct >= 0.6 ? 'text-blue-400' : pct >= 0.4 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0">
      <svg width="136" height="136" viewBox="0 0 136 136" className="-rotate-90">
        <circle cx="68" cy="68" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <motion.circle cx="68" cy="68" r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.p className={`text-3xl font-black leading-none ${textColor}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {score}
        </motion.p>
        <p className="text-gray-500 text-xs mt-0.5">/{max}</p>
      </div>
    </div>
  );
}

export default function ScoreCard({ report }: Props) {
  if (!report) {
    return (
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <p className="text-sm font-medium text-gray-400">Growth Score</p>
        </div>
        <p className="text-xs text-gray-500">Run the Website Score engine for a full 17-dimension analysis.</p>
      </div>
    );
  }

  const categories = (report.categoryScores || []).slice(0, 6);
  const color = (report.overallScore || 0) >= 80 ? 'text-green-400' : (report.overallScore || 0) >= 60 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Growth Score</p>
          <h3 className="text-base font-bold text-white mt-0.5">Initial Blueprint Assessment</h3>
        </div>
        <span className="badge-blue text-[10px]">BLUEPRINT</span>
      </div>

      <div className="flex items-center gap-6 mb-5">
        <ScoreRing score={report.overallScore || 0} max={100} />
        <div className="flex-1 min-w-0 space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.category}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 truncate">{cat.category}</span>
                <span className="text-gray-300 font-semibold flex-shrink-0 ml-2">{cat.score}/{cat.maxScore || 10}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((cat.score || 0) / (cat.maxScore || 10)) * 100}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {((report.strengths?.length ?? 0) > 0 || (report.quickWins?.length ?? 0) > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          {(report.strengths?.length ?? 0) > 0 && (
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-semibold">Strengths</p>
              <ul className="space-y-1">
                {(report.strengths || []).slice(0, 3).map((s, i) => (
                  <li key={i} className="text-xs text-emerald-300 flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(report.quickWins?.length ?? 0) > 0 && (
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-semibold">Quick Wins</p>
              <ul className="space-y-1">
                {(report.quickWins || []).slice(0, 3).map((w, i) => (
                  <li key={i} className="text-xs text-amber-300 flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0">⚡</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
