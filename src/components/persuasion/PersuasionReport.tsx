'use client';
import { useState } from 'react';
import { Copy, Check, ChevronRight, Heart, Zap, Shield, Users, Star, BookOpen, Feather } from 'lucide-react';
import type {
  PersuasionFrameworkReport, HeadlineSet, CTAVariant,
  ObjectionHandler, StoryBlock, SectionCopy,
} from '@/types/persuasion';

// ── primitives ───────────────────────────────────────────────────────────────

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

function CopyBtn({ text }: { text: string }) {
  const { copied, copy } = useCopy(text);
  return (
    <button onClick={copy} className="flex-shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      {copied
        ? <Check className="w-3.5 h-3.5 text-green-400" />
        : <Copy className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300" />}
    </button>
  );
}

function CopyCard({ label, text, size = 'normal', accent = false }: {
  label: string;
  text: string;
  size?: 'xl' | 'lg' | 'normal' | 'sm';
  accent?: boolean;
}) {
  const sz = { xl: 'text-2xl font-bold leading-tight', lg: 'text-lg font-semibold', normal: 'text-sm leading-relaxed', sm: 'text-xs leading-relaxed' }[size];
  return (
    <div className={`rounded-xl p-4 border ${ accent ? 'bg-rose-500/8 border-rose-500/25' : 'bg-white/5 border-white/10' }`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
        <CopyBtn text={text} />
      </div>
      <p className={`text-white ${sz}`}>{text}</p>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-rose-400">{icon}</div>}
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Pill({ children, c }: { children: React.ReactNode; c?: string }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${c ?? 'bg-white/10 text-gray-300'}`}>{children}</span>;
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
          <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />{it}
        </li>
      ))}
    </ul>
  );
}

function CTAPreview({ v }: { v: CTAVariant }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{v.context}</div>
      <div className="flex items-center gap-3 mb-2">
        <div className="px-5 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold flex-shrink-0">{v.buttonText}</div>
        <CopyBtn text={v.buttonText} />
      </div>
      <p className="text-gray-400 text-xs mb-1">{v.microCopy}</p>
      <Pill c="bg-rose-500/15 text-rose-300">{v.emotionalTrigger}</Pill>
    </div>
  );
}

const STORY_ICONS: Record<string, string> = {
  brand: '🏢', founder: '👤', customer: '⭐', transformation: '✨', micro: '📷',
};

const SUB_TABS = [
  { id: 'headlines', label: 'Headlines & Hero', icon: Feather },
  { id: 'transform',  label: 'Transformation',   icon: Zap },
  { id: 'journey',    label: 'Journey & Stories', icon: BookOpen },
  { id: 'trust',      label: 'Trust & CTAs',      icon: Shield },
  { id: 'objections', label: 'Objections',        icon: Users },
  { id: 'playbook',   label: 'Playbook',          icon: Star },
] as const;
type Sub = typeof SUB_TABS[number]['id'];

// ── panels ──────────────────────────────────────────────────────────────

function HeadlinesPanel({ d }: { d: PersuasionFrameworkReport }) {
  const { headlineSet: h, heroCopy: hero } = d;
  const VARIANTS: Array<[keyof HeadlineSet, string, boolean]> = [
    ['primary',        'Primary Headline',         true],
    ['emotional',      'Emotional',                false],
    ['transformation', 'Transformation (Before→After)', false],
    ['painPoint',      'Pain-First',               false],
    ['aspirational',   'Aspirational',             false],
    ['benefitFirst',   'Benefit-First',            false],
    ['curiosity',      'Curiosity Gap',            false],
  ];
  return (
    <div className="space-y-5">
      <Card title="Headline Variants" icon={<Feather className="w-4 h-4" />}>
        <div className="space-y-3">
          {VARIANTS.map(([key, label, accent]) =>
            h?.[key] && typeof h[key] === 'string' ? (
              <CopyCard key={key} label={label} text={h[key] as string}
                size={key === 'primary' ? 'xl' : 'lg'} accent={accent} />
            ) : null
          )}
        </div>
        {h?.rationale && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/8 border border-rose-500/20">
            <p className="text-rose-200 text-xs leading-relaxed italic">{h.rationale}</p>
          </div>
        )}
      </Card>
      <Card title="Hero Copy Block" icon={<Feather className="w-4 h-4" />}>
        <div className="space-y-3">
          <CopyCard label="Hero Headline"    text={hero?.headline}      size="xl" accent />
          <CopyCard label="Sub-Headline"     text={hero?.subheadline}   size="lg" />
          <CopyCard label="Supporting Copy"  text={hero?.supportingCopy} />
          <CopyCard label="Hero Microcopy"   text={hero?.heroMicrocopy}  size="sm" />
        </div>
        <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex flex-col gap-1 flex-1">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">CTA Button</div>
            <div className="px-5 py-2.5 bg-rose-500 rounded-xl text-white font-semibold text-sm inline-block w-fit">
              {hero?.ctaText}
            </div>
            <p className="text-gray-400 text-xs mt-1">{hero?.ctaMicrocopy}</p>
          </div>
          <CopyBtn text={`${hero?.ctaText}\n${hero?.ctaMicrocopy}`} />
        </div>
        {hero?.rationale && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/8 border border-rose-500/20">
            <p className="text-rose-200 text-xs italic">{hero.rationale}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function TransformPanel({ d }: { d: PersuasionFrameworkReport }) {
  const { transformationMessage: tm, painToSolution: pts, aspirationSection: asp } = d;
  return (
    <div className="space-y-5">
      <Card title="Transformation Framework" icon={<Zap className="w-4 h-4" />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20">
            <div className="text-[10px] text-red-400 uppercase tracking-wider mb-2">Before State</div>
            <p className="text-gray-300 text-sm leading-relaxed">{tm?.beforeState}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/8 border border-green-500/20">
            <div className="text-[10px] text-green-400 uppercase tracking-wider mb-2">After State</div>
            <p className="text-gray-300 text-sm leading-relaxed">{tm?.afterState}</p>
          </div>
        </div>
        <div className="space-y-3">
          <CopyCard label="The Bridge"           text={tm?.bridge}                  accent />
          <CopyCard label="Emotional Shift"       text={tm?.emotionalShift}          size="lg" />
          <CopyCard label="Transformation Headline" text={tm?.transformationHeadline} size="lg" accent />
          <CopyCard label="Transformation Copy"  text={tm?.transformationCopy} />
        </div>
      </Card>
      <Card title="Pain → Agitate → Solution" icon={<Zap className="w-4 h-4" />}>
        <div className="space-y-3">
          <CopyCard label="Pain Statement"  text={pts?.painStatement} />
          <CopyCard label="Ethical Agitate" text={pts?.agitate} />
          <CopyCard label="Solution"        text={pts?.solution}      accent />
          <CopyCard label="Proof"           text={pts?.proof}         size="sm" />
          <CopyCard label="CTA Transition"  text={pts?.callToAction}  size="sm" />
        </div>
      </Card>
      <Card title="Aspiration & Future Pacing" icon={<Heart className="w-4 h-4" />}>
        <div className="space-y-3">
          <CopyCard label="Aspirational Headline"   text={asp?.aspirationalHeadline}   size="lg" accent />
          <CopyCard label="Vision Statement"        text={asp?.visionStatement} />
          <CopyCard label="Possibility Statement"   text={asp?.possibilityStatement}   size="lg" />
          <CopyCard label="Future State Copy"       text={asp?.futureStateCopy} />
          <CopyCard label="Future Pacing Paragraph" text={asp?.futurePacingParagraph} />
        </div>
      </Card>
    </div>
  );
}

function JourneyPanel({ d }: { d: PersuasionFrameworkReport }) {
  const { customerJourney: cj, stories } = d;
  const stages = [
    { label: 'Awareness Hook',        text: cj?.awarenessHook,       color: 'border-sky-500',    bg: 'bg-sky-500/8' },
    { label: 'Consideration',         text: cj?.considerationCopy,   color: 'border-violet-500', bg: 'bg-violet-500/8' },
    { label: 'Decision Reassurance',  text: cj?.decisionReassurance, color: 'border-amber-500',  bg: 'bg-amber-500/8' },
    { label: 'Post-Purchase Welcome', text: cj?.postPurchaseWelcome, color: 'border-green-500',  bg: 'bg-green-500/8' },
    { label: 'Retention Message',     text: cj?.retentionMessage,    color: 'border-rose-500',   bg: 'bg-rose-500/8' },
  ];
  return (
    <div className="space-y-5">
      <Card title="Customer Journey Narrative" icon={<BookOpen className="w-4 h-4" />}>
        <div className="space-y-3">
          {stages.map(({ label, text, color, bg }, i) => text ? (
            <div key={i} className={`p-4 rounded-xl border-l-4 ${color} ${bg}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{i+1}. {label}</span>
                <CopyBtn text={text} />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ) : null)}
        </div>
      </Card>
      <div className="space-y-4">
        {stories?.map((story: StoryBlock, i: number) => (
          <Card key={i} title={`${STORY_ICONS[story.type] ?? '📝'} ${story.title}`} icon={<BookOpen className="w-4 h-4" />}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Pill c="bg-rose-500/20 text-rose-300">{story.type}</Pill>
                <Pill c="bg-white/10 text-gray-400">{story.emotionalCore}</Pill>
              </div>
              <CopyCard label="Hook"       text={story.hook}       size="lg" accent />
              <CopyCard label="Body"       text={story.body} />
              <CopyCard label="Resolution" text={story.resolution} size="sm" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TrustPanel({ d }: { d: PersuasionFrameworkReport }) {
  const { trustBuilding: tb, ctaCopy, microcopy } = d;
  return (
    <div className="space-y-5">
      <Card title="Trust Building Copy" icon={<Shield className="w-4 h-4" />}>
        <div className="space-y-3">
          <CopyCard label="Authority Statement" text={tb?.authorityStatement} accent />
          <CopyCard label="Social Proof Intro"  text={tb?.socialProofIntro} />
          <CopyCard label="Guarantee Copy"      text={tb?.guaranteeCopy} />
          <CopyCard label="Credentials Copy"    text={tb?.credentialsCopy} />
          <CopyCard label="Transparency Copy"   text={tb?.transparencyCopy} />
        </div>
        {tb?.riskReductionStatements?.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Risk Reduction Statements</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tb.riskReductionStatements.map((s, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                  <span className="text-green-400 text-sm flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-xs">{s}</span>
                  <CopyBtn text={s} />
                </div>
              ))}
            </div>
          </div>
        )}
        {tb?.testimonialFramework && (
          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Testimonial Framework</div>
            <p className="text-gray-400 text-xs leading-relaxed">{tb.testimonialFramework}</p>
          </div>
        )}
      </Card>
      <Card title="CTA System" icon={<Zap className="w-4 h-4" />}>
        <div className="mb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Primary CTAs</div>
          <div className="space-y-3">{ctaCopy?.primary?.map((v, i) => <CTAPreview key={i} v={v} />)}</div>
        </div>
        <div className="mb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Secondary CTAs</div>
          <div className="space-y-3">{ctaCopy?.secondary?.map((v, i) => <CTAPreview key={i} v={v} />)}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ctaCopy?.emergency && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Emergency (High-Intent)</div>
              <CTAPreview v={ctaCopy.emergency} />
            </div>
          )}
          {ctaCopy?.nurture && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Nurture (Early-Stage)</div>
              <CTAPreview v={ctaCopy.nurture} />
            </div>
          )}
        </div>
      </Card>
      <Card title="Microcopy" icon={<Feather className="w-4 h-4" />}>
        <div className="space-y-4">
          {[
            { label: 'CTA Supporting Lines', items: microcopy?.ctaSupporting },
            { label: 'Form Labels',          items: microcopy?.formLabels },
            { label: 'Success Messages',     items: microcopy?.successMessages },
            { label: 'Tooltip Copy',         items: microcopy?.tooltipCopy },
          ].map(({ label, items }) => items?.length ? (
            <div key={label}>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{label}</div>
              <div className="space-y-1.5">
                {items.map((it, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                    <span className="text-gray-300 text-xs flex-1">{it}</span>
                    <CopyBtn text={it} />
                  </div>
                ))}
              </div>
            </div>
          ) : null)}
          {microcopy?.rationale && (
            <div className="p-3 rounded-lg bg-rose-500/8 border border-rose-500/20">
              <p className="text-rose-200 text-xs italic">{microcopy.rationale}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function ObjectionsPanel({ d }: { d: PersuasionFrameworkReport }) {
  return (
    <Card title="Objection Handling Copy" icon={<Users className="w-4 h-4" />}>
      <div className="space-y-5">
        {d.objectionHandlers?.map((o: ObjectionHandler, i: number) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="text-white font-semibold text-sm">“{o.objection}”</div>
                <div className="text-rose-300 text-xs mt-1">Fear beneath: {o.underlyingFear}</div>
              </div>
              <Pill c="bg-white/10 text-gray-400">{o.tone}</Pill>
            </div>
            <div className="p-3 rounded-lg bg-rose-500/8 border border-rose-500/20 mb-3">
              <div className="text-[10px] text-rose-400 uppercase tracking-wider mb-1">Ethical Approach</div>
              <p className="text-rose-100 text-xs leading-relaxed">{o.ethicalResponse}</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Ready-to-Use Copy</div>
                <p className="text-gray-300 text-sm leading-relaxed">{o.copyBlock}</p>
              </div>
              <CopyBtn text={o.copyBlock} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PlaybookPanel({ d }: { d: PersuasionFrameworkReport }) {
  return (
    <div className="space-y-5">
      <Card title="Section Copy Library" icon={<BookOpen className="w-4 h-4" />}>
        <div className="space-y-5">
          {d.sectionCopies?.map((sc: SectionCopy, i: number) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">{sc.sectionName}</div>
              <div className="space-y-2">
                <CopyCard label="Headline"    text={sc.headline}    size="lg" accent />
                <CopyCard label="Sub-headline" text={sc.subheadline} />
                <CopyCard label="Body Copy"   text={sc.bodyCopy} />
                <div className="flex gap-3">
                  <div className="flex-1"><CopyCard label="CTA Text"  text={sc.ctaText}   size="sm" /></div>
                  <div className="flex-1"><CopyCard label="Microcopy" text={sc.microcopy} size="sm" /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Copy Rules" icon={<Star className="w-4 h-4" />}>
          <Bullets items={d.copyRules} />
        </Card>
        <Card title="Power Phrases" icon={<Zap className="w-4 h-4" />}>
          <div className="flex flex-wrap gap-1.5">
            {d.powerPhrases?.map(p => (
              <Pill key={p} c="bg-rose-500/15 text-rose-300">{p}</Pill>
            ))}
          </div>
        </Card>
        <Card title="Avoid These Phrases" icon={<Shield className="w-4 h-4" />}>
          <ul className="space-y-1.5">
            {d.avoidPhrases?.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <span className="text-red-400 flex-shrink-0">✕</span>{p}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

export default function PersuasionReport({ data: d }: { data: PersuasionFrameworkReport }) {
  const [sub, setSub] = useState<Sub>('headlines');

  return (
    <div>
      {/* Header card */}
      <div className="glass rounded-2xl p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-500/20 flex-shrink-0">
            <Heart className="w-6 h-6 text-rose-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-semibold">
                {d.persuasionPersonality}
              </span>
            </div>
            <p className="text-white font-medium mb-1">{d.coreEmotionalPromise}</p>
            <p className="text-gray-500 text-xs italic">{d.ethicalPledge}</p>
          </div>
        </div>
      </div>

      {/* Sub-tab nav */}
      <div className="flex gap-1 mb-5 bg-white/5 rounded-xl p-1 overflow-x-auto">
        {SUB_TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setSub(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
              sub === id ? 'bg-rose-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}>
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>

      {sub === 'headlines'  && <HeadlinesPanel  d={d} />}
      {sub === 'transform'  && <TransformPanel  d={d} />}
      {sub === 'journey'    && <JourneyPanel    d={d} />}
      {sub === 'trust'      && <TrustPanel      d={d} />}
      {sub === 'objections' && <ObjectionsPanel d={d} />}
      {sub === 'playbook'   && <PlaybookPanel   d={d} />}
    </div>
  );
}
