'use client';
import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import type { ImprovementItem, AnalyticsChecklist } from '@/types';

interface Props {
  items: ImprovementItem[];
  analytics: AnalyticsChecklist;
}

const PRIORITY_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

const PRIORITY_STYLES: Record<string, string> = {
  critical: 'bg-red-500/15 text-red-300 border-red-500/30',
  high:     'bg-amber-500/15 text-amber-300 border-amber-500/30',
  medium:   'bg-blue-500/15 text-blue-300 border-blue-500/30',
  low:      'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

const EFFORT_COLORS: Record<string, string> = {
  low: 'text-emerald-400', medium: 'text-amber-400', high: 'text-red-400',
};

export default function ImprovementPanel({ items, analytics }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const sorted = [...items].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)
  );

  const doneCount = checked.size;
  const totalCount = sorted.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Checklist */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-white">Improvement Checklist</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">{doneCount}/{totalCount} complete</span>
            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {sorted.map((item, i) => {
            const isDone = checked.has(i);
            return (
              <button key={i} onClick={() => toggle(i)}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                  isDone
                    ? 'bg-emerald-500/5 border-emerald-500/15 opacity-60'
                    : 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15'
                }`}>
                {isDone
                  ? <CheckSquare className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  : <Square className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.medium
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-gray-500 text-xs">{item.category}</span>
                    <span className={`text-xs font-medium ${EFFORT_COLORS[item.effort] || 'text-gray-400'}`}>
                      {item.effort} effort
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${ isDone ? 'line-through text-gray-500' : 'text-gray-100' }`}>
                    {item.action}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5">
                    <p className="text-xs text-gray-500">Impact: {item.impact}</p>
                    <p className="text-xs text-gray-600">{item.timeline}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analytics Checklist */}
      <div className="card">
        <h3 className="text-base font-bold text-white mb-5">Analytics & Tracking Setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: 'GA4 Events', items: analytics.ga4Events, color: 'text-orange-300' },
            { label: 'Conversion Goals', items: analytics.conversionGoals, color: 'text-emerald-300' },
            { label: 'A/B Test Ideas', items: analytics.abtestIdeas, color: 'text-yellow-300' },
            { label: 'Heatmap Placements', items: analytics.heatmapPlacements, color: 'text-purple-300' },
          ].map(({ label, items: listItems, color }) => (
            listItems?.length > 0 && (
              <div key={label}>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">{label}</p>
                <ul className="space-y-1.5">
                  {listItems.map((item, i) => (
                    <li key={i} className={`text-sm ${color} flex items-start gap-2`}>
                      <span className="mt-0.5 flex-shrink-0 text-gray-600">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>

        {analytics.kpiDashboard?.length > 0 && (
          <div className="mt-6">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">KPI Dashboard</p>
            <div className="space-y-2">
              {analytics.kpiDashboard.slice(0, 6).map((kpi, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white/3 border border-white/5 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200">{kpi.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{kpi.tool} · {kpi.frequency}</p>
                  </div>
                  <p className="text-sm text-sky-400 font-semibold flex-shrink-0">{kpi.target}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
