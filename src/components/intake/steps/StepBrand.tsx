'use client';
import type { UseFormReturn } from 'react-hook-form';

const ATMOSPHERES = [
  { value: 'luxurious_refined',   label: 'Luxurious & Refined',     emoji: '✨' },
  { value: 'clean_minimal',       label: 'Clean & Minimal',          emoji: '□' },
  { value: 'bold_energetic',      label: 'Bold & Energetic',         emoji: '⚡' },
  { value: 'warm_inviting',       label: 'Warm & Inviting',          emoji: '🧡' },
  { value: 'clinical_precise',    label: 'Clinical & Precise',       emoji: '🔬' },
  { value: 'playful_vibrant',     label: 'Playful & Vibrant',        emoji: '🎈' },
  { value: 'natural_organic',     label: 'Natural & Organic',        emoji: '🌿' },
  { value: 'modern_tech_forward', label: 'Modern & Tech-Forward',    emoji: '🚀' },
];

const BRAND_STYLES = [
  { value: 'luxury_boutique',    label: 'Luxury Boutique' },
  { value: 'modern_minimalist',  label: 'Modern Minimalist' },
  { value: 'classic_timeless',   label: 'Classic & Timeless' },
  { value: 'tech_forward',       label: 'Tech-Forward' },
  { value: 'wellness_holistic',  label: 'Wellness & Holistic' },
  { value: 'rustic_earthy',      label: 'Rustic & Earthy' },
  { value: 'corporate_pro',      label: 'Corporate Professional' },
  { value: 'creative_artistic',  label: 'Creative & Artistic' },
];

const EMOTIONAL_TONES = [
  { value: 'confident_empowering', label: 'Confident & Empowering', emoji: '💪' },
  { value: 'warm_empathetic',      label: 'Warm & Empathetic',       emoji: '🤗' },
  { value: 'inspiring_aspirational', label: 'Inspiring & Aspirational', emoji: '🌟' },
  { value: 'trustworthy_reliable', label: 'Trustworthy & Reliable',  emoji: '🛡️' },
  { value: 'exciting_dynamic',     label: 'Exciting & Dynamic',      emoji: '🚀' },
  { value: 'calm_reassuring',      label: 'Calm & Reassuring',       emoji: '🌺' },
];

const LUXURY_LEVELS = [
  { value: 1, label: 'Budget',      emoji: '💵', desc: 'Accessible to all' },
  { value: 2, label: 'Accessible',  emoji: '🏷️', desc: 'Good value focus' },
  { value: 3, label: 'Mid-Market',  emoji: '⚖️',  desc: 'Quality balanced' },
  { value: 4, label: 'Premium',     emoji: '💸', desc: 'High-end feel' },
  { value: 5, label: 'Ultra-Luxury',emoji: '👑', desc: 'Elite & exclusive' },
];

const PERSONALITIES = [
  { value: 'trustworthy',   label: 'Trustworthy',   emoji: '🤝' },
  { value: 'innovative',    label: 'Innovative',    emoji: '💡' },
  { value: 'luxurious',     label: 'Luxurious',     emoji: '✨' },
  { value: 'approachable',  label: 'Approachable',  emoji: '😊' },
  { value: 'energetic',     label: 'Energetic',     emoji: '⚡' },
  { value: 'calming',       label: 'Calming',       emoji: '🌿' },
  { value: 'bold',          label: 'Bold',          emoji: '🔥' },
  { value: 'sophisticated', label: 'Sophisticated',  emoji: '🎩' },
];

const BRAND_VOICES = [
  { value: 'professional',  label: 'Professional' },
  { value: 'friendly',      label: 'Friendly' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'playful',       label: 'Playful' },
  { value: 'inspiring',     label: 'Inspiring' },
  { value: 'empathetic',    label: 'Empathetic' },
];

const COLOR_LABELS = [
  { label: 'Primary',   desc: 'Main brand color' },
  { label: 'Secondary', desc: 'Supporting color' },
  { label: 'Accent',    desc: 'CTAs & highlights' },
  { label: 'Neutral',   desc: 'Backgrounds & text' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepBrand({ form }: { form: UseFormReturn<any> }) {
  const { register, watch, setValue, formState: { errors } } = form;

  const selected: string[]  = watch('brandPersonality') || [];
  const luxuryLevel: number = watch('luxuryLevel') || 3;
  const brandColors: string[] = watch('brandColors') || ['#0ea5e9','#6366f1','#f59e0b','#9ca3af'];

  const togglePersonality = (val: string) => {
    if (selected.includes(val)) {
      setValue('brandPersonality', selected.filter((v) => v !== val));
    } else if (selected.length < 4) {
      setValue('brandPersonality', [...selected, val]);
    }
  };

  const updateColor = (index: number, hex: string) => {
    const updated = [...brandColors];
    updated[index] = hex;
    setValue('brandColors', updated);
  };

  return (
    <div>
      <h2 className="section-title">Brand & Atmosphere</h2>
      <p className="section-subtitle">
        Your visual identity and emotional tone shape every design decision, color choice, and word we write.
      </p>

      <div className="space-y-8">
        {/* Desired Atmosphere */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Desired Atmosphere</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ATMOSPHERES.map((a) => (
              <label key={a.value} className="cursor-pointer">
                <input {...register('desiredAtmosphere')} type="radio" value={a.value} className="sr-only" />
                <div className={`card p-3 text-center transition-all hover:border-sky-500/40 ${
                  watch('desiredAtmosphere') === a.value ? 'border-sky-500 bg-sky-500/10' : ''
                }`}>
                  <div className="text-xl mb-1">{a.emoji}</div>
                  <p className={`text-xs font-medium leading-tight ${ watch('desiredAtmosphere') === a.value ? 'text-sky-300' : 'text-gray-400' }`}>
                    {a.label}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Style */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Desired Brand Style</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BRAND_STYLES.map((s) => (
              <label key={s.value} className="cursor-pointer">
                <input {...register('desiredBrandStyle')} type="radio" value={s.value} className="sr-only" />
                <div className={`card p-3 text-center text-sm transition-all hover:border-sky-500/40 ${
                  watch('desiredBrandStyle') === s.value ? 'border-sky-500 bg-sky-500/10 text-sky-300' : 'text-gray-400'
                }`}>
                  {s.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Emotional Tone */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Desired Emotional Tone</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EMOTIONAL_TONES.map((t) => (
              <label key={t.value} className="cursor-pointer">
                <input {...register('desiredEmotionalTone')} type="radio" value={t.value} className="sr-only" />
                <div className={`card p-3 flex items-center gap-3 transition-all hover:border-sky-500/40 ${
                  watch('desiredEmotionalTone') === t.value ? 'border-sky-500 bg-sky-500/10' : ''
                }`}>
                  <span className="text-xl flex-shrink-0">{t.emoji}</span>
                  <p className={`text-xs font-medium ${ watch('desiredEmotionalTone') === t.value ? 'text-sky-300' : 'text-gray-400' }`}>
                    {t.label}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Luxury Level */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Luxury Level</p>
          <div className="grid grid-cols-5 gap-2">
            {LUXURY_LEVELS.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setValue('luxuryLevel', l.value)}
                className={`card p-3 text-center transition-all hover:border-sky-500/40 ${
                  luxuryLevel === l.value ? 'border-sky-500 bg-sky-500/10' : ''
                }`}
              >
                <div className="text-xl mb-1">{l.emoji}</div>
                <p className={`text-xs font-semibold ${ luxuryLevel === l.value ? 'text-sky-300' : 'text-gray-400' }`}>
                  {l.label}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5 hidden sm:block">{l.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Brand Colors</p>
          <p className="text-xs text-gray-600 mb-4">Click each swatch to open the color picker. These become your AI-recommended color system.</p>
          <div className="grid grid-cols-4 gap-4">
            {COLOR_LABELS.map(({ label, desc }, i) => (
              <div key={label} className="space-y-2">
                <p className="label text-center">{label}</p>
                <div
                  className="w-full h-16 rounded-xl shadow-lg cursor-pointer relative overflow-hidden group border border-white/10"
                  style={{ backgroundColor: brandColors[i] || '#0ea5e9' }}
                >
                  <input
                    type="color"
                    value={brandColors[i] || '#0ea5e9'}
                    onChange={(e) => updateColor(i, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title={`Pick ${label} color`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-all rounded-xl">
                    <span className="text-white text-[10px] font-medium">Edit</span>
                  </div>
                </div>
                <code className="text-[10px] text-gray-500 text-center block">
                  {(brandColors[i] || '#0ea5e9').toUpperCase()}
                </code>
                <p className="text-[10px] text-gray-600 text-center">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Personality */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Brand Personality</p>
          <p className="text-xs text-gray-600 mb-3">Pick up to 4 traits that best describe your brand character.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PERSONALITIES.map((p) => {
              const isOn = selected.includes(p.value);
              return (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => togglePersonality(p.value)}
                  className={`card p-3 text-center transition-all hover:border-sky-500/40 ${
                    isOn ? 'border-sky-500 bg-sky-500/10' : ''
                  }`}
                >
                  <div className="text-2xl mb-1">{p.emoji}</div>
                  <p className={`text-xs font-medium ${ isOn ? 'text-sky-300' : 'text-gray-400' }`}>{p.label}</p>
                </button>
              );
            })}
          </div>
          {errors.brandPersonality && <p className="text-red-400 text-xs mt-1">{String(errors.brandPersonality.message)}</p>}
        </div>

        {/* Brand Voice */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Brand Voice</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BRAND_VOICES.map((v) => (
              <label key={v.value} className="cursor-pointer">
                <input {...register('brandVoice')} type="radio" value={v.value} className="sr-only" />
                <div className={`card p-3 text-center text-sm transition-all hover:border-sky-500/40 ${
                  watch('brandVoice') === v.value ? 'border-sky-500 bg-sky-500/10 text-sky-300' : 'text-gray-400'
                }`}>
                  {v.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Logo & Imagery Placeholders */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Logo & Imagery Notes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-sky-500/30 transition-all mb-3">
                <div className="text-3xl mb-2">📸</div>
                <p className="text-sm text-gray-400 font-medium">Logo Placeholder</p>
                <p className="text-xs text-gray-600 mt-1">Describe your logo or note you’ll provide one</p>
              </div>
              <textarea
                {...register('logoDescription')}
                rows={2}
                placeholder="e.g. Gold script font with a minimalist lotus icon. Will provide SVG file."
                className="input resize-none text-sm"
              />
            </div>
            <div>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-sky-500/30 transition-all mb-3">
                <div className="text-3xl mb-2">🖼️</div>
                <p className="text-sm text-gray-400 font-medium">Brand Images</p>
                <p className="text-xs text-gray-600 mt-1">Describe your photography style or assets</p>
              </div>
              <textarea
                {...register('imagesDescription')}
                rows={2}
                placeholder="e.g. Have professional headshots. Need lifestyle photos of treatments. Prefer bright, airy aesthetic."
                className="input resize-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
