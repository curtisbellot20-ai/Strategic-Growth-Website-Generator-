'use client';
import { motion } from 'framer-motion';
import {
  Heart, Palette, Type, Maximize2, Image,
  Layers, MousePointer, Zap, Grid, ShieldCheck,
  BookOpen, Sparkles, CheckCircle2, ExternalLink,
} from 'lucide-react';
import type {
  AtmosphereIntelligence, AtmosphereType, ColorSwatch,
  FontRecommendation, ImplementationItem,
} from '@/types/atmosphere';

// ---- Atmosphere type metadata ----
const ATMO_META: Record<AtmosphereType, { emoji: string; tagline: string; gradient: string }> = {
  luxury:            { emoji: '✨', tagline: 'Opulence & Refinement',    gradient: 'from-yellow-900/40 to-yellow-700/10' },
  romantic:          { emoji: '🌹', tagline: 'Warmth & Intimacy',          gradient: 'from-rose-900/40 to-pink-700/10' },
  corporate:         { emoji: '🏛️', tagline: 'Authority & Clarity',        gradient: 'from-blue-900/40 to-slate-700/10' },
  cinematic:         { emoji: '🎞️', tagline: 'Drama & Story',              gradient: 'from-gray-900/60 to-red-900/10' },
  urban_premium:     { emoji: '🌆', tagline: 'Edge & Sophistication',     gradient: 'from-orange-900/40 to-gray-800/20' },
  family_friendly:   { emoji: '🏠', tagline: 'Warmth & Trust',             gradient: 'from-orange-800/30 to-green-800/10' },
  high_energy:       { emoji: '⚡', tagline: 'Power & Motion',            gradient: 'from-green-900/40 to-red-900/20' },
  wellness:          { emoji: '🌿', tagline: 'Calm & Restoration',        gradient: 'from-green-900/30 to-teal-800/10' },
  minimal:           { emoji: '□', tagline: 'Clarity & Focus',            gradient: 'from-gray-800/30 to-gray-700/5' },
  elegant:           { emoji: '🎩', tagline: 'Grace & Poise',              gradient: 'from-amber-900/30 to-gray-800/10' },
  futuristic:        { emoji: '🚀', tagline: 'Innovation & Vision',        gradient: 'from-violet-900/50 to-cyan-900/20' },
  trustworthy:       { emoji: '🛡️', tagline: 'Safety & Reliability',       gradient: 'from-blue-900/40 to-green-900/15' },
  exclusive:         { emoji: '🔑', tagline: 'Membership & Prestige',      gradient: 'from-yellow-900/40 to-gray-900/30' },
  creative:          { emoji: '🎨', tagline: 'Expression & Energy',        gradient: 'from-purple-900/40 to-pink-900/20' },
  performance_driven:{ emoji: '🏆', tagline: 'Results & Excellence',       gradient: 'from-red-900/40 to-yellow-900/15' },
  relaxing:          { emoji: '🌊', tagline: 'Ease & Serenity',            gradient: 'from-sky-900/30 to-blue-800/10' },
  nightlife:         { emoji: '🌙', tagline: 'Glamour & Excitement',       gradient: 'from-violet-900/60 to-pink-900/30' },
  high_status:       { emoji: '👑', tagline: 'Prestige & Power',           gradient: 'from-yellow-900/50 to-gray-900/30' },
};

// ---- Shared primitives ----
function fade(delay = 0) {
  return { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay } };
}

function SectionCard({
  icon: Icon, title, color = 'text-sky-400', children, delay = 0,
}: { icon: React.ElementType; title: string; color?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div {...fade(delay)} className="card">
      <div className="flex items-center gap-2 mb-5">
        <Icon className={`w-5 h-5 ${color}`} />
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function BulletList({ items, color = 'text-gray-300' }: { items: string[]; color?: string }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className={`text-sm ${color} flex items-start gap-2`}>
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DosDonts({ dos, donts, dosColor = 'text-green-300', dontsColor = 'text-red-300' }: {
  dos: string[]; donts?: string[]; dosColor?: string; dontsColor?: string;
}) {
  return (
    <div className={`grid ${donts?.length ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mt-4`}>
      <div>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">✓ Do</p>
        <BulletList items={dos || []} color={dosColor} />
      </div>
      {donts?.length ? (
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">× Don&apos;t</p>
          <BulletList items={donts} color={dontsColor} />
        </div>
      ) : null}
    </div>
  );
}

function SubLabel({ text }: { text: string }) {
  return <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{text}</p>;
}

// ---- Color Swatch ----
function Swatch({ swatch, label }: { swatch: ColorSwatch; label: string }) {
  if (!swatch) return null;
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">{label}</p>
      <div className="w-full h-14 rounded-xl border border-white/10 relative overflow-hidden group cursor-default" style={{ backgroundColor: swatch.hex }}>
        <div className="absolute inset-0 flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 bg-black/40 transition-all">
          <code className="text-white text-[10px] font-mono">{swatch.hex}</code>
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-200 text-center">{swatch.name}</p>
      <code className="text-[10px] text-gray-500 block text-center">{swatch.hex}</code>
      <p className="text-[10px] text-gray-600 text-center leading-tight">{swatch.psychology}</p>
    </div>
  );
}

// ---- Font Card ----
function FontCard({ font, label }: { font: FontRecommendation; label: string }) {
  if (!font) return null;
  return (
    <div className="p-4 bg-white/5 rounded-xl">
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{label}</p>
      <p className="text-lg font-bold text-white mb-1">{font.name}</p>
      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className="badge-purple text-[10px]">{font.category}</span>
        <span className="badge-blue text-[10px]">Weight: {font.weight}</span>
      </div>
      <p className="text-xs text-gray-400">{font.characteristics}</p>
      {font.googleFontUrl && (
        <a href={font.googleFontUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-[10px] text-sky-400 hover:text-sky-300 transition-colors">
          <ExternalLink className="w-3 h-3" /> Google Fonts
        </a>
      )}
    </div>
  );
}

// ---- Intensity Bar ----
function IntensityBar({ level, label }: { level: 'none' | 'subtle' | 'moderate' | 'dramatic'; label: string }) {
  const pct = level === 'none' ? 0 : level === 'subtle' ? 25 : level === 'moderate' ? 60 : 100;
  const color = level === 'none' ? 'bg-gray-600' : level === 'subtle' ? 'bg-sky-500' :
    level === 'moderate' ? 'bg-yellow-500' : 'bg-orange-500';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-300 font-semibold capitalize">{level}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ---- Density Bar ----
function DensityBar({ level }: { level: 'sparse' | 'balanced' | 'rich' }) {
  const pct = level === 'sparse' ? 20 : level === 'balanced' ? 55 : 90;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">Sparse</span>
        <span className="text-gray-300 font-bold capitalize">{level}</span>
        <span className="text-gray-500">Rich</span>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-600 to-blue-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ---- Priority Badge ----
function PriorityBadge({ priority }: { priority: 'critical' | 'high' | 'medium' }) {
  const map = { critical: 'badge-red', high: 'badge-yellow', medium: 'badge-blue' };
  return <span className={map[priority]}>{priority}</span>;
}

// ============================================================
// MAIN REPORT
// ============================================================
export default function AtmosphereReport({ data }: { data: AtmosphereIntelligence }) {
  const primary   = ATMO_META[data.primaryAtmosphere]   || { emoji: '✨', tagline: '', gradient: 'from-sky-900/30' };
  const secondary = ATMO_META[data.secondaryAtmosphere] || { emoji: '⚡', tagline: '', gradient: 'from-purple-900/30' };

  return (
    <div className="space-y-6">

      {/* ---- Hero Header ---- */}
      <motion.div {...fade(0)} className={`card bg-gradient-to-br ${primary.gradient} border border-white/10`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-4xl">{primary.emoji}</span>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Primary Atmosphere</p>
                <h2 className="text-2xl font-black text-white capitalize">{data.primaryAtmosphere.replace('_', ' ')}</h2>
                <p className="text-sm text-gray-400">{primary.tagline}</p>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <span className="text-xl">{secondary.emoji}</span>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">Secondary</p>
                  <p className="text-sm font-semibold text-gray-400 capitalize">{data.secondaryAtmosphere.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-300 max-w-2xl">{data.rationale?.businessRationale}</p>
          </div>
          {/* Fit Score */}
          <div className="flex-shrink-0 text-center">
            <div className="w-24 h-24 rounded-full border-4 border-sky-500/60 flex items-center justify-center bg-sky-500/10 mb-2">
              <div>
                <p className="text-3xl font-black text-sky-400">{data.atmosphereFitScore}</p>
                <p className="text-[10px] text-gray-500">/100</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">Atmosphere Fit</p>
          </div>
        </div>
      </motion.div>

      {/* ---- Rationale ---- */}
      <motion.div {...fade(0.04)} className="card">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h3 className="text-base font-bold text-white">Why This Atmosphere</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            { label: 'Business Rationale',    text: data.rationale?.businessRationale,    border: 'border-l-sky-500/60' },
            { label: 'Customer Rationale',     text: data.rationale?.customerRationale,     border: 'border-l-purple-500/60' },
            { label: 'Psychological Basis',    text: data.rationale?.psychologicalBasis,    border: 'border-l-green-500/60' },
            { label: 'Competitive Advantage',  text: data.rationale?.competitiveAdvantage,  border: 'border-l-yellow-500/60' },
          ] as const).map(({ label, text, border }) => text && (
            <div key={label} className={`pl-4 border-l-2 ${border}`}>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        {data.rationale?.whyNotOtherAtmospheres && (
          <div className="mt-4 p-3 bg-white/5 rounded-xl">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">Why not other atmospheres</p>
            <p className="text-xs text-gray-500">{data.rationale.whyNotOtherAtmospheres}</p>
          </div>
        )}
      </motion.div>

      {/* ---- Emotional Tone ---- */}
      <SectionCard icon={Heart} title="Emotional Tone" color="text-pink-400" delay={0.06}>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[['Entry', data.emotionalTone?.entryEmotion, 'border-gray-600'], ['Peak', data.emotionalTone?.peakEmotion, 'border-sky-500/60'], ['Exit', data.emotionalTone?.exitEmotion, 'border-green-500/60']].map(([stage, emotion, border]) => (
            <div key={stage as string} className={`p-3 bg-white/5 rounded-xl border-b-2 ${border} text-center`}>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{stage}</p>
              <p className="text-sm font-semibold text-gray-200">{emotion}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-pink-500/5 border border-pink-500/20 rounded-xl mb-4">
          <SubLabel text="Emotional Arc" />
          <p className="text-sm text-pink-300">{data.emotionalTone?.emotionalArc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SubLabel text="Emotional Keywords" />
            <div className="flex flex-wrap gap-2">
              {data.emotionalTone?.emotionalKeywords?.map((kw, i) => <span key={i} className="badge-purple text-xs">{kw}</span>)}
            </div>
          </div>
          <div>
            <SubLabel text="Avoid These Emotions" />
            <div className="flex flex-wrap gap-2">
              {data.emotionalTone?.avoidEmotions?.map((e, i) => <span key={i} className="badge-red text-xs">{e}</span>)}
            </div>
          </div>
          <div className="sm:col-span-2">
            <SubLabel text="How to Achieve This Tone" />
            <BulletList items={data.emotionalTone?.howToAchieve || []} color="text-pink-300" />
          </div>
        </div>
      </SectionCard>

      {/* ---- Color System ---- */}
      <SectionCard icon={Palette} title="Color System" color="text-yellow-400" delay={0.08}>
        <div className="p-3 bg-white/5 rounded-xl mb-5">
          <SubLabel text="Philosophy" />
          <p className="text-sm text-gray-300">{data.colorSystem?.philosophy}</p>
        </div>
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Swatch swatch={data.colorSystem?.primaryColor}    label="Primary" />
          <Swatch swatch={data.colorSystem?.secondaryColor}  label="Secondary" />
          <Swatch swatch={data.colorSystem?.accentColor}     label="Accent" />
          <Swatch swatch={data.colorSystem?.backgroundColor} label="Background" />
          <Swatch swatch={data.colorSystem?.textColor}       label="Text" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="p-3 bg-white/5 rounded-xl">
            <SubLabel text="Temperature" />
            <p className="text-sm text-gray-300">{data.colorSystem?.colorTemperature}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl">
            <SubLabel text="Contrast" />
            <p className="text-sm text-gray-300">{data.colorSystem?.contrastApproach}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl">
            <SubLabel text="Gradient" />
            <p className="text-sm text-gray-300">{data.colorSystem?.gradientRecommendation}</p>
          </div>
        </div>
        <DosDonts dos={data.colorSystem?.colorDos || []} donts={data.colorSystem?.colorDonts} />
      </SectionCard>

      {/* ---- Typography ---- */}
      <SectionCard icon={Type} title="Typography" color="text-blue-400" delay={0.10}>
        <div className="p-3 bg-white/5 rounded-xl mb-5">
          <SubLabel text="Philosophy" />
          <p className="text-sm text-gray-300">{data.typography?.philosophy}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <FontCard font={data.typography?.headingFont} label="Heading Font" />
          <FontCard font={data.typography?.bodyFont}    label="Body Font" />
          <FontCard font={data.typography?.accentFont}  label="Accent Font" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[['Size Scale', data.typography?.sizeScale], ['Line Height', data.typography?.lineHeightApproach], ['Letter Spacing', data.typography?.letterSpacingApproach], ['Text Transform', data.typography?.textTransformUsage]].map(([label, value]) => (
            <div key={label as string} className="p-3 bg-white/5 rounded-xl">
              <SubLabel text={label as string} />
              <p className="text-xs text-gray-300">{value}</p>
            </div>
          ))}
        </div>
        <DosDonts dos={data.typography?.typographyDos || []} donts={data.typography?.typographyDonts} dosColor="text-blue-300" />
      </SectionCard>

      {/* ---- Two-column: Spacing + Imagery ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard icon={Maximize2} title="Spacing & Whitespace" color="text-teal-400" delay={0.12}>
          <div className="mb-4">
            <SubLabel text="Whitespace Level" />
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Tight</span>
              <span className="text-gray-300 font-bold capitalize">{data.spacing?.whitespaceLevel}</span>
              <span className="text-gray-500">Generous</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-teal-500" style={{ width: data.spacing?.whitespaceLevel === 'generous' ? '90%' : data.spacing?.whitespaceLevel === 'balanced' ? '55%' : '20%' }} />
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl mb-3">
            <SubLabel text="Philosophy" />
            <p className="text-xs text-gray-300">{data.spacing?.philosophy}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[['Section Padding', data.spacing?.sectionPadding], ['Component Spacing', data.spacing?.componentSpacing], ['Grid Approach', data.spacing?.gridApproach], ['Mobile Notes', data.spacing?.mobileSpacingNotes]].map(([l, v]) => (
              <div key={l as string} className="p-2 bg-white/5 rounded-lg">
                <SubLabel text={l as string} />
                <p className="text-xs text-gray-400">{v}</p>
              </div>
            ))}
          </div>
          <SubLabel text="Do's" />
          <BulletList items={data.spacing?.spacingDos || []} color="text-teal-300" />
        </SectionCard>

        <SectionCard icon={Image} title="Imagery & Photography" color="text-orange-400" delay={0.12}>
          <div className="p-3 bg-white/5 rounded-xl mb-4">
            <SubLabel text="Philosophy" />
            <p className="text-xs text-gray-300">{data.imagery?.philosophy}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[['Photography Style', data.imagery?.photographyStyle], ['Lighting', data.imagery?.lightingApproach], ['Color Treatment', data.imagery?.colorTreatment], ['Composition', data.imagery?.imageComposition], ['Subject Focus', data.imagery?.subjectFocus], ['Models / People', data.imagery?.modelInclusion]].map(([l, v]) => (
              <div key={l as string} className="p-2 bg-white/5 rounded-lg">
                <SubLabel text={l as string} />
                <p className="text-xs text-gray-400">{v}</p>
              </div>
            ))}
          </div>
          <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl mb-4">
            <SubLabel text="Stock Photo Guidance" />
            <p className="text-xs text-orange-300">{data.imagery?.stockPhotoGuidance}</p>
          </div>
          <DosDonts dos={data.imagery?.imageryDos || []} donts={data.imagery?.imageryDonts} dosColor="text-orange-300" />
        </SectionCard>
      </div>

      {/* ---- Two-column: Layout + CTA ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard icon={Layers} title="Layout Pacing" color="text-indigo-400" delay={0.14}>
          <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl mb-4">
            <SubLabel text="Philosophy" />
            <p className="text-xs text-indigo-300">{data.layoutPacing?.philosophy}</p>
          </div>
          <div className="space-y-3 mb-4">
            {[['Scroll Experience', data.layoutPacing?.scrollExperience], ['Section Rhythm', data.layoutPacing?.sectionRhythm], ['Hero Approach', data.layoutPacing?.heroApproach], ['Section Transitions', data.layoutPacing?.sectionTransitions], ['Info Hierarchy', data.layoutPacing?.informationHierarchy]].map(([l, v]) => (
              <div key={l as string} className="p-2 bg-white/5 rounded-lg">
                <SubLabel text={l as string} />
                <p className="text-xs text-gray-300">{v}</p>
              </div>
            ))}
          </div>
          <SubLabel text="Layout Do's" />
          <BulletList items={data.layoutPacing?.pacingDos || []} color="text-indigo-300" />
        </SectionCard>

        <SectionCard icon={MousePointer} title="CTA Language" color="text-sky-400" delay={0.14}>
          <div className="p-4 gradient-brand rounded-xl mb-4">
            <SubLabel text="Primary CTA Tone" />
            <p className="text-base font-bold text-white">{data.ctaLanguage?.primaryCTATone}</p>
            <p className="text-xs text-blue-200 mt-1">{data.ctaLanguage?.philosophy}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <SubLabel text="Recommended CTAs" />
              <ul className="space-y-1">
                {data.ctaLanguage?.recommendedPrimaryCTAs?.map((cta, i) => (
                  <li key={i} className="text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-medium">{cta}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SubLabel text="Micro CTAs" />
              <ul className="space-y-1">
                {data.ctaLanguage?.microCTAs?.map((cta, i) => (
                  <li key={i} className="text-xs text-gray-400">→ {cta}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <SubLabel text="Power Words" />
              <div className="flex flex-wrap gap-1">
                {data.ctaLanguage?.powerWords?.map((w, i) => <span key={i} className="badge-green text-[10px]">{w}</span>)}
              </div>
            </div>
            <div>
              <SubLabel text="Avoid" />
              <div className="flex flex-wrap gap-1">
                {data.ctaLanguage?.avoidWords?.map((w, i) => <span key={i} className="badge-red text-[10px]">{w}</span>)}
              </div>
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-lg">
            <SubLabel text="Button Style" />
            <p className="text-xs text-gray-300">{data.ctaLanguage?.ctaButtonStyle}</p>
          </div>
        </SectionCard>
      </div>

      {/* ---- Two-column: Animation + Visual Density ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard icon={Zap} title="Animation Style" color="text-yellow-400" delay={0.16}>
          <div className="mb-5">
            <IntensityBar level={data.animationStyle?.overallIntensity || 'subtle'} label="Overall Intensity" />
          </div>
          <div className="p-3 bg-white/5 rounded-xl mb-4">
            <SubLabel text="Philosophy" />
            <p className="text-xs text-gray-300">{data.animationStyle?.philosophy}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[['Entry Animations', data.animationStyle?.entryAnimations], ['Scroll Animations', data.animationStyle?.scrollAnimations], ['Hover Effects', data.animationStyle?.hoverEffects], ['Transition Speed', data.animationStyle?.transitionSpeed]].map(([l, v]) => (
              <div key={l as string} className="p-2 bg-white/5 rounded-lg">
                <SubLabel text={l as string} />
                <p className="text-xs text-gray-400">{v}</p>
              </div>
            ))}
          </div>
          <SubLabel text="Micro-Interactions" />
          <BulletList items={data.animationStyle?.microInteractions || []} color="text-yellow-300" />
          <DosDonts dos={data.animationStyle?.animationDos || []} donts={data.animationStyle?.animationDonts} dosColor="text-yellow-300" />
        </SectionCard>

        <SectionCard icon={Grid} title="Visual Density" color="text-purple-400" delay={0.16}>
          <DensityBar level={data.visualDensity?.densityLevel || 'balanced'} />
          <div className="p-3 bg-white/5 rounded-xl mb-4">
            <SubLabel text="Philosophy" />
            <p className="text-xs text-gray-300">{data.visualDensity?.philosophy}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[['Content per Screen', data.visualDensity?.contentPerScreen], ['Grid Columns', data.visualDensity?.gridColumns], ['Card Design', data.visualDensity?.cardDesign], ['Icon Usage', data.visualDensity?.iconUsage], ['Pattern Usage', data.visualDensity?.patternUsage], ['Element Spacing', data.visualDensity?.elementSpacing]].map(([l, v]) => (
              <div key={l as string} className="p-2 bg-white/5 rounded-lg">
                <SubLabel text={l as string} />
                <p className="text-xs text-gray-400">{v}</p>
              </div>
            ))}
          </div>
          <SubLabel text="Density by Section" />
          <BulletList items={data.visualDensity?.densityBySection || []} color="text-purple-300" />
        </SectionCard>
      </div>

      {/* ---- Trust Signals ---- */}
      <SectionCard icon={ShieldCheck} title="Trust Signals" color="text-green-400" delay={0.18}>
        <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-xl mb-5">
          <SubLabel text="Philosophy" />
          <p className="text-sm text-green-300">{data.trustSignals?.philosophy}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SubLabel text="Atmosphere-Specific Trust Signals" />
            <BulletList items={data.trustSignals?.atmosphereSpecificTrust || []} color="text-green-300" />
          </div>
          <div>
            <SubLabel text="Primary Trust Elements" />
            <BulletList items={data.trustSignals?.primaryTrustElements || []} />
          </div>
          <div>
            <SubLabel text="Placement Strategy" />
            <BulletList items={data.trustSignals?.placementStrategy || []} color="text-sky-300" />
          </div>
          <div className="space-y-3">
            {[['Visual Treatment', data.trustSignals?.visualTreatment], ['Social Proof Style', data.trustSignals?.socialProofStyle], ['Credential Display', data.trustSignals?.credentialDisplay]].map(([l, v]) => (
              <div key={l as string}>
                <SubLabel text={l as string} />
                <p className="text-sm text-gray-300">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <SubLabel text="Trust Do's" />
          <BulletList items={data.trustSignals?.trustDos || []} color="text-green-300" />
        </div>
      </SectionCard>

      {/* ---- Storytelling ---- */}
      <SectionCard icon={BookOpen} title="Storytelling Tone" color="text-rose-400" delay={0.20}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
            <SubLabel text="Opening Hook" />
            <p className="text-sm text-rose-300">{data.storytellingTone?.openingHook}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <SubLabel text="Body Narrative" />
            <p className="text-sm text-gray-300">{data.storytellingTone?.bodyNarrative}</p>
          </div>
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
            <SubLabel text="Closing Impact" />
            <p className="text-sm text-green-300">{data.storytellingTone?.closingImpact}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[['Narrative Voice', data.storytellingTone?.narrativeVoice], ['Language Register', data.storytellingTone?.languageRegister], ['Story Arc', data.storytellingTone?.storyArcStructure], ['Sentence Structure', data.storytellingTone?.sentenceStructure]].map(([l, v]) => (
            <div key={l as string} className="p-3 bg-white/5 rounded-xl">
              <SubLabel text={l as string} />
              <p className="text-xs text-gray-300">{v}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SubLabel text="Vocabulary Guidance" />
            <BulletList items={data.storytellingTone?.vocabularyGuidance || []} color="text-rose-300" />
          </div>
          <DosDonts dos={data.storytellingTone?.storytellingDos || []} donts={data.storytellingTone?.storytellingDonts} dosColor="text-rose-300" />
        </div>
      </SectionCard>

      {/* ---- Design Brief ---- */}
      <motion.div {...fade(0.22)} className="card border border-sky-500/30 bg-gradient-to-br from-sky-900/20 to-blue-900/10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <h3 className="text-base font-bold text-white">Design Brief</h3>
        </div>
        <p className="text-base text-sky-200 leading-relaxed mb-6">{data.designBrief}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SubLabel text="Mood Board Keywords" />
            <div className="flex flex-wrap gap-2">
              {data.moodBoardKeywords?.map((kw, i) => <span key={i} className="badge-purple text-xs">{kw}</span>)}
            </div>
          </div>
          <div>
            <SubLabel text="Reference & Inspiration" />
            <ul className="space-y-1">
              {data.referenceInspiration?.map((ref, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-center gap-1.5">
                  <span className="text-sky-500">◆</span> {ref}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ---- Section Examples ---- */}
      {data.sectionExamples?.length > 0 && (
        <motion.div {...fade(0.24)} className="card">
          <div className="flex items-center gap-2 mb-5">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Atmosphere Applied by Section</h3>
          </div>
          <div className="space-y-4">
            {data.sectionExamples.map((ex, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <p className="font-semibold text-gray-200">{ex.sectionName}</p>
                </div>
                <p className="text-xs text-gray-400 mb-2">{ex.atmosphereApplication}</p>
                <ul className="space-y-1">
                  {ex.specificElements?.map((el, j) => (
                    <li key={j} className="text-xs text-indigo-300 flex items-start gap-1.5">
                      <span className="mt-1 flex-shrink-0">→</span> {el}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ---- Implementation Checklist ---- */}
      {data.implementationChecklist?.length > 0 && (
        <motion.div {...fade(0.26)} className="card">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h3 className="text-base font-bold text-white">Implementation Checklist</h3>
          </div>
          <div className="space-y-3">
            {(data.implementationChecklist as ImplementationItem[]).sort((a, b) => {
              const o: Record<string, number> = { critical: 0, high: 1, medium: 2 };
              return o[a.priority] - o[b.priority];
            }).map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/[0.07] transition-all">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-600 bg-white/5 text-sky-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <PriorityBadge priority={item.priority} />
                    <span className="text-[10px] text-gray-500">{item.dimension}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-200">{item.item}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.atmosphereImpact}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
