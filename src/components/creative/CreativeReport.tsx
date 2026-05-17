'use client';

import type {
  CreativeDirectionIntelligence,
  ColorSwatch,
  FontRecommendation,
  GradientDefinition,
} from '@/types/creative';
import {
  Sparkles, Layout, Type, Palette, Star, AlertTriangle,
  ExternalLink, ChevronRight, Image, Video, Zap, Layers,
  MousePointer, Grid, Shield, Smartphone,
} from 'lucide-react';

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  children,
  className = '',
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-5">
        <div className="text-orange-400">{icon}</div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

type PillColor = 'default' | 'orange' | 'red' | 'green' | 'blue';

function Pill({ children, color = 'default' }: { children: React.ReactNode; color?: PillColor }) {
  const colors: Record<PillColor, string> = {
    default: 'bg-white/10 text-gray-300',
    orange: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    red: 'bg-red-500/20 text-red-300 border border-red-500/30',
    green: 'bg-green-500/20 text-green-300 border border-green-500/30',
    blue: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        colors[color]
      }`}
    >
      {children}
    </span>
  );
}

function SwatchBlock({ swatch }: { swatch: ColorSwatch }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 ring-1 ring-white/20 shadow-lg"
        style={{ backgroundColor: swatch.hex }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-white text-sm font-semibold">{swatch.name}</span>
          <code className="text-gray-500 text-xs font-mono">{swatch.hex}</code>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed">{swatch.psychology}</p>
        <p className="text-gray-600 text-xs mt-1 italic">{swatch.usageGuideline}</p>
      </div>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  serif: 'bg-amber-500/20 text-amber-300',
  'sans-serif': 'bg-sky-500/20 text-sky-300',
  display: 'bg-purple-500/20 text-purple-300',
  script: 'bg-pink-500/20 text-pink-300',
  monospace: 'bg-green-500/20 text-green-300',
};

function FontCard({ font, role }: { font: FontRecommendation; role: string }) {
  if (!font) return null;
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col gap-2">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest">{role}</div>
      <div className="text-xl font-bold text-white leading-tight">{font.name}</div>
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            CATEGORY_COLORS[font.category] ?? 'bg-gray-500/20 text-gray-300'
          }`}
        >
          {font.category}
        </span>
        <span className="text-gray-500 text-xs">w{font.weight}</span>
      </div>
      <p className="text-gray-400 text-xs leading-relaxed flex-1">{font.useCase}</p>
      <p className="text-gray-600 text-xs italic">{font.pairingNote}</p>
      {font.googleFontsUrl && (
        <a
          href={font.googleFontsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 text-xs hover:text-sky-300 flex items-center gap-1 mt-1"
        >
          Google Fonts <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

function GradientCard({ gradient }: { gradient: GradientDefinition }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <div className="h-12 w-full" style={{ background: gradient.css }} />
      <div className="p-3 bg-white/5">
        <div className="text-white text-sm font-medium mb-0.5">{gradient.name}</div>
        <code className="text-gray-500 text-xs block truncate">{gradient.css}</code>
        <p className="text-gray-500 text-xs mt-1">{gradient.useCase}</p>
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;
  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          stroke="rgba(255,255,255,0.08)"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          stroke="url(#crGrad)"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="crGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white leading-none">{score}</span>
        <span className="text-[9px] text-gray-400 uppercase tracking-wider">/100</span>
      </div>
    </div>
  );
}

function IntensityBar({ intensity }: { intensity?: 'subtle' | 'moderate' | 'bold' }) {
  const levels = { subtle: 1, moderate: 2, bold: 3 };
  const level = levels[intensity ?? 'moderate'] ?? 2;
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-full ${
            i <= level ? 'bg-orange-400' : 'bg-white/10'
          }`}
        />
      ))}
      <span className="text-gray-300 text-xs capitalize font-medium w-16">
        {intensity ?? 'moderate'}
      </span>
    </div>
  );
}

function BulletList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
          <ChevronRight className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Rationale({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
      <p className="text-orange-200 text-xs leading-relaxed italic">{text}</p>
    </div>
  );
}

function DetailGrid(
  items: Array<{ label: string; value?: string }>,
  cols = 2,
) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3`}>
      {items.map(({ label, value }) =>
        value ? (
          <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</div>
            <p className="text-gray-300 text-xs leading-relaxed">{value}</p>
          </div>
        ) : null,
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreativeReport({ data }: { data: CreativeDirectionIntelligence }) {
  const {
    designPersonality,
    creativeScore,
    creativeSummary,
    uniqueDesignPrinciples,
    brandDifferentiators,
    moodBoardKeywords,
    referenceAesthetics,
    avoidPatterns,
    layoutStyle,
    typographyDirection,
    colorDirection,
    imageStyle,
    videoStyle,
    animationStyle,
    sectionRhythm,
    heroStyle,
    ctaStyle,
    galleryStyle,
    trustSectionStyle,
    mobileDirection,
  } = data;

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <ScoreRing score={creativeScore ?? 0} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-sm font-semibold">
                {designPersonality}
              </span>
              <span className="text-gray-500 text-xs">Creative Score</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{creativeSummary}</p>
          </div>
        </div>

        {moodBoardKeywords?.length > 0 && (
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Mood Board</div>
            <div className="flex flex-wrap gap-2">
              {moodBoardKeywords.map((kw) => (
                <Pill key={kw} color="orange">
                  {kw}
                </Pill>
              ))}
            </div>
          </div>
        )}

        {referenceAesthetics?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Design References
            </div>
            <div className="flex flex-wrap gap-2">
              {referenceAesthetics.map((ref) => (
                <Pill key={ref} color="blue">
                  {ref}
                </Pill>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── DESIGN DNA ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Design Principles" icon={<Star className="w-4 h-4" />}>
          <BulletList items={uniqueDesignPrinciples} />
        </SectionCard>
        <SectionCard title="Brand Differentiators" icon={<Sparkles className="w-4 h-4" />}>
          <BulletList items={brandDifferentiators} />
        </SectionCard>
        <SectionCard title="Patterns to Avoid" icon={<AlertTriangle className="w-4 h-4" />}>
          <ul className="space-y-2">
            {avoidPatterns?.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* ── LAYOUT STYLE ── */}
      <SectionCard title="Layout Style" icon={<Layout className="w-4 h-4" />}>
        <div className="mb-4">
          <div className="text-white font-semibold text-lg mb-1">{layoutStyle?.name}</div>
          <p className="text-gray-400 text-sm leading-relaxed">{layoutStyle?.description}</p>
        </div>
        {DetailGrid([
          { label: 'Grid System', value: layoutStyle?.gridSystem },
          { label: 'Whitespace', value: layoutStyle?.whitespacePhilosophy },
          { label: 'Scroll Behavior', value: layoutStyle?.scrollBehavior },
          { label: 'Section Flow', value: layoutStyle?.sectionFlow },
          { label: 'Breakpoint Strategy', value: layoutStyle?.breakpointStrategy },
        ])}
        {layoutStyle?.keyLayoutPatterns?.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Key Layout Patterns
            </div>
            <div className="flex flex-wrap gap-2">
              {layoutStyle.keyLayoutPatterns.map((p) => (
                <Pill key={p}>{p}</Pill>
              ))}
            </div>
          </div>
        )}
        <Rationale text={layoutStyle?.rationale} />
      </SectionCard>

      {/* ── TYPOGRAPHY ── */}
      <SectionCard title="Typography Direction" icon={<Type className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <FontCard font={typographyDirection?.headlineFont} role="Headline" />
          <FontCard font={typographyDirection?.bodyFont} role="Body" />
          <FontCard font={typographyDirection?.accentFont} role="Accent / Label" />
        </div>
        {DetailGrid([
          { label: 'Scale Ratio', value: typographyDirection?.scaleRatio },
          { label: 'Letter Spacing', value: typographyDirection?.letterSpacing },
          { label: 'Line Height', value: typographyDirection?.lineHeight },
        ], 3)}
        {typographyDirection?.textureEffects?.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Texture Effects</div>
            <div className="flex flex-wrap gap-2">
              {typographyDirection.textureEffects.map((e) => (
                <Pill key={e}>{e}</Pill>
              ))}
            </div>
          </div>
        )}
        {typographyDirection?.hierarchyRules?.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Hierarchy Rules</div>
            <BulletList items={typographyDirection.hierarchyRules} />
          </div>
        )}
        <Rationale text={typographyDirection?.rationale} />
      </SectionCard>

      {/* ── COLOR DIRECTION ── */}
      <SectionCard title="Color Direction" icon={<Palette className="w-4 h-4" />}>
        <div className="mb-4">
          <p className="text-gray-300 text-sm">
            <span className="text-white font-medium">Mood: </span>
            {colorDirection?.colorMood}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mt-1">{colorDirection?.colorPsychology}</p>
        </div>

        {colorDirection?.primaryPalette?.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Primary Palette</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorDirection.primaryPalette.map((s, i) => (
                <SwatchBlock key={i} swatch={s} />
              ))}
            </div>
          </div>
        )}

        {colorDirection?.accentColors?.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Accent Colors</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorDirection.accentColors.map((s, i) => (
                <SwatchBlock key={i} swatch={s} />
              ))}
            </div>
          </div>
        )}

        {colorDirection?.neutrals?.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Neutrals</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorDirection.neutrals.map((s, i) => (
                <SwatchBlock key={i} swatch={s} />
              ))}
            </div>
          </div>
        )}

        {colorDirection?.gradients?.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Gradients</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorDirection.gradients.map((g, i) => (
                <GradientCard key={i} gradient={g} />
              ))}
            </div>
          </div>
        )}

        {colorDirection?.usageRules?.length > 0 && (
          <div className="mb-2">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Usage Rules</div>
            <BulletList items={colorDirection.usageRules} />
          </div>
        )}

        {colorDirection?.contrastStrategy && (
          <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-200 text-xs mt-3">
            ⬜️ Contrast: {colorDirection.contrastStrategy}
          </div>
        )}
        <Rationale text={colorDirection?.rationale} />
      </SectionCard>

      {/* ── IMAGE + VIDEO ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Image Style" icon={<Image className="w-4 h-4" />}>
          {DetailGrid([
            { label: 'Style', value: imageStyle?.style },
            { label: 'Subject Matter', value: imageStyle?.subjectMatter },
            { label: 'Composition', value: imageStyle?.composition },
            { label: 'Lighting', value: imageStyle?.lighting },
            { label: 'Color Grading', value: imageStyle?.colorGrading },
            { label: 'Human Presence', value: imageStyle?.humanPresence },
            { label: 'Abstract vs Literal', value: imageStyle?.abstractVsLiteral },
            { label: 'Editing Style', value: imageStyle?.editingStyle },
          ])}
          {imageStyle?.avoidImages?.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Avoid</div>
              {imageStyle.avoidImages.map((a, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-red-400 mb-1">
                  <span className="flex-shrink-0">✕</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          )}
          {imageStyle?.shootingDirections?.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                Shooting Directions
              </div>
              <BulletList items={imageStyle.shootingDirections} />
            </div>
          )}
          <Rationale text={imageStyle?.rationale} />
        </SectionCard>

        <SectionCard title="Video Style" icon={<Video className="w-4 h-4" />}>
          {DetailGrid([
            { label: 'Style', value: videoStyle?.style },
            { label: 'Pacing', value: videoStyle?.pacing },
            { label: 'Color Grading', value: videoStyle?.colorGrading },
            { label: 'Music Mood', value: videoStyle?.musicMood },
            { label: 'Text Overlay', value: videoStyle?.textOverlay },
            { label: 'Hero Video', value: videoStyle?.heroVideoApproach },
            { label: 'Background Video', value: videoStyle?.backgroundVideoUse },
          ])}
          {videoStyle?.shotTypes?.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Shot Types</div>
              <div className="flex flex-wrap gap-2">
                {videoStyle.shotTypes.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
          )}
          <Rationale text={videoStyle?.rationale} />
        </SectionCard>
      </div>

      {/* ── ANIMATION ── */}
      <SectionCard title="Animation Style" icon={<Zap className="w-4 h-4" />}>
        <div className="flex items-start justify-between gap-6 mb-4 flex-wrap">
          <div>
            <div className="text-white font-semibold mb-1">{animationStyle?.personality}</div>
            <p className="text-gray-400 text-sm">{animationStyle?.transitionStyle}</p>
          </div>
          <div className="w-52">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Intensity</div>
            <IntensityBar intensity={animationStyle?.intensity} />
          </div>
        </div>
        {DetailGrid([
          { label: 'Entry Animations', value: animationStyle?.entryAnimations },
          { label: 'Scroll Animations', value: animationStyle?.scrollAnimations },
          { label: 'Hover Effects', value: animationStyle?.hoverEffects },
          { label: 'Loading State', value: animationStyle?.loadingState },
        ])}
        {animationStyle?.microInteractions?.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Micro-Interactions</div>
            <BulletList items={animationStyle.microInteractions} />
          </div>
        )}
        {animationStyle?.performanceNotes && (
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs mt-4">
            ⚡ {animationStyle.performanceNotes}
          </div>
        )}
        <Rationale text={animationStyle?.rationale} />
      </SectionCard>

      {/* ── SECTION RHYTHM ── */}
      <SectionCard title="Section Rhythm" icon={<Layers className="w-4 h-4" />}>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{sectionRhythm?.pattern}</p>
        {DetailGrid([
          { label: 'Alternation', value: sectionRhythm?.alternation },
          { label: 'Breathing Room', value: sectionRhythm?.breathingRoom },
          { label: 'Section Separators', value: sectionRhythm?.sectionSeparators },
          { label: 'Content Density', value: sectionRhythm?.contentDensity },
          { label: 'Vertical Flow', value: sectionRhythm?.verticalFlow },
        ])}
        {sectionRhythm?.sectionOrder?.length > 0 && (
          <div className="mt-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
              Recommended Section Order
            </div>
            <div className="flex flex-col gap-2">
              {sectionRhythm.sectionOrder.map((section, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-300 text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm">{section}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <Rationale text={sectionRhythm?.rationale} />
      </SectionCard>

      {/* ── HERO + CTA ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Hero Style" icon={<MousePointer className="w-4 h-4" />}>
          {DetailGrid([
            { label: 'Layout', value: heroStyle?.layout },
            { label: 'Headline Approach', value: heroStyle?.headlineApproach },
            { label: 'Subtext Style', value: heroStyle?.subtextStyle },
            { label: 'CTA Placement', value: heroStyle?.ctaPlacement },
            { label: 'Background', value: heroStyle?.backgroundApproach },
            { label: 'Visual Element', value: heroStyle?.visualElement },
            { label: 'Mood Establishment', value: heroStyle?.moodEstablishment },
            { label: 'Scroll Trigger', value: heroStyle?.scrollTrigger },
          ])}
          <Rationale text={heroStyle?.rationale} />
        </SectionCard>

        <SectionCard title="CTA Style" icon={<MousePointer className="w-4 h-4" />}>
          {DetailGrid([
            { label: 'Primary Shape', value: ctaStyle?.primaryShape },
            { label: 'Color Scheme', value: ctaStyle?.primaryColorScheme },
            { label: 'Text Style', value: ctaStyle?.primaryTextStyle },
            { label: 'Secondary Style', value: ctaStyle?.secondaryStyle },
            { label: 'Placement', value: ctaStyle?.placement },
            { label: 'Urgency Level', value: ctaStyle?.urgencyLevel },
            { label: 'Micro-Copy Style', value: ctaStyle?.microCopyStyle },
            { label: 'Hover Behavior', value: ctaStyle?.hoverBehavior },
          ])}
          <Rationale text={ctaStyle?.rationale} />
        </SectionCard>
      </div>

      {/* ── GALLERY + TRUST ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Gallery Style" icon={<Grid className="w-4 h-4" />}>
          {DetailGrid([
            { label: 'Layout', value: galleryStyle?.layout },
            { label: 'Hover Effect', value: galleryStyle?.hoverEffect },
            { label: 'Caption Style', value: galleryStyle?.captionStyle },
            { label: 'Filter Style', value: galleryStyle?.filterStyle },
            { label: 'Lightbox', value: galleryStyle?.lightboxStyle },
            { label: 'Spacing', value: galleryStyle?.spacing },
            { label: 'Masonry vs Grid', value: galleryStyle?.masonryVsGrid },
          ])}
          <Rationale text={galleryStyle?.rationale} />
        </SectionCard>

        <SectionCard title="Trust Section Style" icon={<Shield className="w-4 h-4" />}>
          {DetailGrid([
            { label: 'Layout', value: trustSectionStyle?.layout },
            { label: 'Testimonial Card', value: trustSectionStyle?.testimonialCard },
            { label: 'Review Presentation', value: trustSectionStyle?.reviewPresentation },
            { label: 'Stats Display', value: trustSectionStyle?.statsDisplay },
            { label: 'Certification Badges', value: trustSectionStyle?.certificationBadges },
          ])}
          {trustSectionStyle?.socialProofElements?.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                Social Proof Elements
              </div>
              <BulletList items={trustSectionStyle.socialProofElements} />
            </div>
          )}
          {trustSectionStyle?.authoritySignals?.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                Authority Signals
              </div>
              <div className="flex flex-wrap gap-2">
                {trustSectionStyle.authoritySignals.map((s) => (
                  <Pill key={s} color="green">
                    {s}
                  </Pill>
                ))}
              </div>
            </div>
          )}
          <Rationale text={trustSectionStyle?.rationale} />
        </SectionCard>
      </div>

      {/* ── MOBILE DIRECTION ── */}
      <SectionCard title="Mobile Direction" icon={<Smartphone className="w-4 h-4" />}>
        {DetailGrid(
          [
            { label: 'Navigation', value: mobileDirection?.navigationStyle },
            { label: 'Stacking Order', value: mobileDirection?.stackingOrder },
            { label: 'Touch Targets', value: mobileDirection?.touchTargets },
            { label: 'Mobile Hero', value: mobileDirection?.mobileHero },
            { label: 'Font Scaling', value: mobileDirection?.fontScaling },
            { label: 'Button Style', value: mobileDirection?.buttonStyle },
            { label: 'Gesture Interactions', value: mobileDirection?.gestureInteractions },
          ],
          3,
        )}
        {mobileDirection?.mobileFirstPriorities?.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Mobile-First Priorities
            </div>
            <BulletList items={mobileDirection.mobileFirstPriorities} />
          </div>
        )}
        <Rationale text={mobileDirection?.rationale} />
      </SectionCard>
    </div>
  );
}
