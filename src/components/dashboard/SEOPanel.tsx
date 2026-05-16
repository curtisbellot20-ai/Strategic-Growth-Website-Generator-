'use client';
import { useState } from 'react';
import type { SEOStrategy } from '@/types';

interface Props { seo: SEOStrategy; }

const intentColors: Record<string, string> = {
  transactional: 'badge-green',
  commercial: 'badge-blue',
  informational: 'badge-yellow',
  navigational: 'badge-purple',
};

const tabs = ['Keywords', 'GEO', 'AEO', 'Content', 'Technical'] as const;
type Tab = typeof tabs[number];

export default function SEOPanel({ seo }: Props) {
  const [tab, setTab] = useState<Tab>('Keywords');

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">SEO / GEO / AEO Strategy</h3>

      <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 min-w-fit px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              tab === t ? 'bg-sky-500 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Keywords' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Primary Keywords</p>
          {[...seo.primaryKeywords, ...seo.localKeywords].slice(0, 8).map((kw, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="flex-1">
                <p className="text-sm text-gray-200">{kw.term}</p>
              </div>
              <span className={intentColors[kw.intent] || 'badge-blue'}>{kw.intent}</span>
              <span className={kw.volume === 'high' ? 'badge-green' : kw.volume === 'medium' ? 'badge-yellow' : 'badge-red'}>
                {kw.volume}
              </span>
              <span className={kw.difficulty === 'easy' ? 'badge-green' : kw.difficulty === 'medium' ? 'badge-yellow' : 'badge-red'}>
                {kw.difficulty}
              </span>
            </div>
          ))}
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-4">Long-Tail</p>
          {seo.longTailKeywords.slice(0, 5).map((kw, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-400 py-1">
              <span className="text-sky-500">→</span> {kw.term}
            </div>
          ))}
        </div>
      )}

      {tab === 'GEO' && (
        <div className="space-y-4">
          {([
            { label: 'Google Business Optimization', items: seo.geoStrategy.googleBusinessOptimization },
            { label: 'Local Citations', items: seo.geoStrategy.localCitations },
            { label: 'Neighborhood Targeting', items: seo.geoStrategy.neighborhoodTargeting },
            { label: 'Review Strategy', items: seo.geoStrategy.reviewStrategy },
          ]).map(({ label, items }) => (
            <div key={label}>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">{label}</p>
              <ul className="space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-sky-500 mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {tab === 'AEO' && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">AI Overview Optimization</p>
            {seo.aeoStrategy.aiOverviewOptimization.map((item, i) => (
              <p key={i} className="text-sm text-gray-300 flex items-start gap-2 mb-1">
                <span className="text-purple-400">◆</span> {item}
              </p>
            ))}
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">FAQ Strategy</p>
            {seo.aeoStrategy.faqStrategy.slice(0, 4).map((faq, i) => (
              <div key={i} className="mb-3 p-3 bg-white/5 rounded-xl">
                <p className="text-sm font-medium text-gray-200 mb-1">{faq.question}</p>
                <p className="text-xs text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Voice Search Phrases</p>
            {seo.aeoStrategy.voiceSearchPhrases.map((p, i) => (
              <p key={i} className="text-sm text-gray-300 italic mb-1">&ldquo;{p}&rdquo;</p>
            ))}
          </div>
        </div>
      )}

      {tab === 'Content' && (
        <div className="space-y-3">
          {seo.contentCalendar.slice(0, 8).map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-xs font-bold text-white">
                M{item.month}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{item.title}</p>
                <p className="text-xs text-gray-500">{item.type} · {item.intent}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Technical' && (
        <ul className="space-y-2">
          {seo.technicalSEO.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span> {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
