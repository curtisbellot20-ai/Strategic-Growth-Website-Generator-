'use client';
import type { AtmosphereDesign } from '@/types';

interface Props { atmosphere: AtmosphereDesign; }

function ListSection({ title, items, color = 'text-gray-300' }: { title: string; items: string[]; color?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">{title}</p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className={`text-sm ${color} flex items-start gap-2`}>
            <span className="mt-1 w-1 h-1 rounded-full bg-sky-500 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AtmospherePanel({ atmosphere }: Props) {
  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">Atmosphere & Design Direction</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Visual Theme</p>
          <p className="text-base font-semibold text-purple-300">{atmosphere.visualTheme}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Typography Direction</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Heading Font</span>
              <span className="text-gray-200 font-medium">{atmosphere.typographyDirection?.headingFont}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Body Font</span>
              <span className="text-gray-200">{atmosphere.typographyDirection?.bodyFont}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Accent Font</span>
              <span className="text-gray-200">{atmosphere.typographyDirection?.accentFont}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Heading Weight</span>
              <span className="text-gray-200">{atmosphere.typographyDirection?.headingWeight}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Mood Board</p>
          <div className="flex flex-wrap gap-2">
            {atmosphere.moodBoard?.map((m, i) => (
              <span key={i} className="badge-purple text-xs">{m}</span>
            ))}
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-4 mb-2">Spacing</p>
          <p className="text-sm text-gray-300">{atmosphere.spacingPhilosophy}</p>
        </div>

        <ListSection title="Imagery Style" items={atmosphere.imageryStyle} color="text-pink-300" />
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Animation Style</p>
          <p className="text-sm text-gray-300">{atmosphere.animationStyle}</p>
        </div>
        <ListSection title="Luxury Signals" items={atmosphere.luxurySignals} color="text-yellow-300" />
        <ListSection title="Trust Signals" items={atmosphere.trustSignals} color="text-green-300" />
      </div>
    </div>
  );
}
