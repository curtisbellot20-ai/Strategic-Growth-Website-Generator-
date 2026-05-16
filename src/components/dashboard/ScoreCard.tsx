'use client';
import { motion } from 'framer-motion';
import type { ScoringReport } from '@/types';

interface Props { report: ScoringReport; }

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
      <motion.circle
        cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="12"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function ScoreCard({ report }: Props) {
  const color = report.overallScore >= 80 ? 'text-green-400' : report.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">Growth Score</h3>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative flex-shrink-0">
          <ScoreRing score={report.overallScore} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.p
                className={`text-3xl font-black ${color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {report.overallScore}
              </motion.p>
              <p className="text-gray-500 text-xs">/100</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {report.categoryScores.slice(0, 5).map((cat) => (
            <div key={cat.category}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-400">{cat.category}</span>
                <span className="text-gray-300 font-medium">{cat.score}/{cat.maxScore}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Strengths</p>
          <ul className="space-y-1">
            {report.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="text-xs text-green-300 flex items-start gap-1.5">
                <span className="mt-0.5">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Quick Wins</p>
          <ul className="space-y-1">
            {report.quickWins.slice(0, 3).map((w, i) => (
              <li key={i} className="text-xs text-yellow-300 flex items-start gap-1.5">
                <span className="mt-0.5">⚡</span> {w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Priority Actions</p>
          <ul className="space-y-1">
            {report.priorityActions.slice(0, 3).map((a, i) => (
              <li key={i} className="text-xs text-sky-300 flex items-start gap-1.5">
                <span className="mt-0.5">→</span> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
