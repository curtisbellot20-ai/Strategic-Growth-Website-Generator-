'use client';
import type { ColorSystem } from '@/types';

interface Props { colors: ColorSystem; }

function Swatch({ name, hex, usage, psychology }: { name: string; hex: string; usage: string; psychology: string }) {
  return (
    <div className="space-y-2">
      <div
        className="w-full h-20 rounded-xl shadow-lg"
        style={{ backgroundColor: hex }}
      />
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-200">{name}</p>
          <code className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{hex}</code>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{usage}</p>
        <p className="text-xs text-purple-400 italic mt-0.5">{psychology}</p>
      </div>
    </div>
  );
}

export default function ColorPanel({ colors }: Props) {
  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">Color Science System</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        <Swatch {...colors.primary} />
        <Swatch {...colors.secondary} />
        <Swatch {...colors.accent} />
        <Swatch {...colors.neutral} />
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Color Psychology</p>
        <ul className="space-y-1">
          {colors.psychology?.map((p, i) => (
            <li key={i} className="text-sm text-purple-300 flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Accessibility Notes</p>
        <ul className="space-y-1">
          {colors.accessibility?.map((a, i) => (
            <li key={i} className="text-sm text-green-300 flex items-start gap-2">
              <span className="mt-1 text-green-500">✓</span> {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
