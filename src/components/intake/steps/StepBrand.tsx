'use client';
import type { UseFormReturn } from 'react-hook-form';

const PERSONALITIES = [
  { value: 'trustworthy', label: 'Trustworthy', emoji: '🤝' },
  { value: 'innovative', label: 'Innovative', emoji: '💡' },
  { value: 'luxurious', label: 'Luxurious', emoji: '✨' },
  { value: 'approachable', label: 'Approachable', emoji: '😊' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'calming', label: 'Calming', emoji: '🌿' },
  { value: 'bold', label: 'Bold', emoji: '🔥' },
  { value: 'sophisticated', label: 'Sophisticated', emoji: '🎩' },
];

const BRAND_VOICES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'playful', label: 'Playful' },
  { value: 'inspiring', label: 'Inspiring' },
  { value: 'empathetic', label: 'Empathetic' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepBrand({ form }: { form: UseFormReturn<any> }) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selected: string[] = watch('brandPersonality') || [];

  const toggle = (val: string) => {
    if (selected.includes(val)) {
      setValue('brandPersonality', selected.filter((v) => v !== val));
    } else if (selected.length < 4) {
      setValue('brandPersonality', [...selected, val]);
    }
  };

  return (
    <div>
      <h2 className="section-title">Brand Identity</h2>
      <p className="section-subtitle">Your brand personality shapes design, copy tone, color choices, and the emotional experience visitors feel.</p>

      <div className="space-y-6">
        <div>
          <label className="label">Brand Personality (pick up to 4) *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PERSONALITIES.map((p) => {
              const isSelected = selected.includes(p.value);
              return (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => toggle(p.value)}
                  className={`card p-3 text-center transition-all ${
                    isSelected ? 'border-sky-500 bg-sky-500/10 text-sky-300' : 'text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{p.emoji}</div>
                  <div className="text-xs font-medium">{p.label}</div>
                </button>
              );
            })}
          </div>
          {errors.brandPersonality && <p className="text-red-400 text-xs mt-1">{String(errors.brandPersonality.message)}</p>}
        </div>

        <div>
          <label className="label">Brand Voice *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BRAND_VOICES.map((v) => (
              <label key={v.value} className="cursor-pointer">
                <input {...register('brandVoice')} type="radio" value={v.value} className="sr-only" />
                <div className={`card p-3 text-center text-sm transition-all ${
                  watch('brandVoice') === v.value ? 'border-sky-500 bg-sky-500/10 text-sky-300' : 'text-gray-400'
                }`}>
                  {v.label}
                </div>
              </label>
            ))}
          </div>
          {errors.brandVoice && <p className="text-red-400 text-xs mt-1">{String(errors.brandVoice.message)}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Current Brand Colors</label>
            <input {...register('currentColors')} placeholder="e.g. gold, cream, black" className="input" />
          </div>
          <div>
            <label className="label">Main Competitors</label>
            <input {...register('competitors')} placeholder="e.g. SkinMD, Sanova Dermatology" className="input" />
          </div>
        </div>
      </div>
    </div>
  );
}
