'use client';
import type { ImprovementItem, AnalyticsChecklist } from '@/types';

interface Props {
  items: ImprovementItem[];
  analytics: AnalyticsChecklist;
}

const priorityStyles: Record<string, string> = {
  critical: 'badge-red',
  high: 'badge-yellow',
  medium: 'badge-blue',
  low: 'badge-purple',
};

const effortStyles: Record<string, string> = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
};

export default function ImprovementPanel({ items, analytics }: Props) {
  const sorted = [...items].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-6">
      {/* Improvement Checklist */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Improvement Checklist</h3>
        <div className="space-y-3">
          {sorted.map((item, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-600 bg-white/5 text-sky-500" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={priorityStyles[item.priority]}>{item.priority}</span>
                    <span className="text-gray-600 text-xs">{item.category}</span>
                    <span className={`text-xs font-medium ${effortStyles[item.effort]}`}>Effort: {item.effort}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-200">{item.action}</p>
                  <p className="text-xs text-gray-500 mt-1">Impact: {item.impact}</p>
                  <p className="text-xs text-gray-600 mt-0.5">Timeline: {item.timeline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Checklist */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Analytics & Tracking Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">GA4 Events to Track</p>
            <ul className="space-y-1">
              {analytics.ga4Events?.map((e, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" /> {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Conversion Goals</p>
            <ul className="space-y-1">
              {analytics.conversionGoals?.map((g, i) => (
                <li key={i} className="text-sm text-green-300 flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" /> {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">A/B Test Ideas</p>
            <ul className="space-y-1">
              {analytics.abtestIdeas?.map((t, i) => (
                <li key={i} className="text-sm text-yellow-300 flex items-start gap-2">
                  <span>⚗️</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Heatmap Placements</p>
            <ul className="space-y-1">
              {analytics.heatmapPlacements?.map((h, i) => (
                <li key={i} className="text-sm text-purple-300 flex items-start gap-2">
                  <span>🔥</span> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">KPI Dashboard</p>
          <div className="space-y-2">
            {analytics.kpiDashboard?.slice(0, 6).map((kpi, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-200">{kpi.name}</p>
                  <p className="text-xs text-gray-500">{kpi.tool} · {kpi.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-sky-400 font-semibold">{kpi.target}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
