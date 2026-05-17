'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MousePointerClick, Star, Gift, Target, Mail, MessageSquare,
  RefreshCw, Share2, Megaphone, CheckSquare, ArrowRight,
  Copy, Check, ChevronDown, ChevronUp, Smartphone, BookOpen,
  DollarSign, ClipboardList, Phone, Calendar, Users,
} from 'lucide-react';
import type { ConversionAcquisitionReport } from '@/types/acquisition';

// ── Primitives ────────────────────────────────────────────────────────────────

function SectionCard({ title, icon: Icon, children, className = '' }: {
  title: string; icon: React.ElementType; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-amber-400" />
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function CopyBlock({ label, text, size = 'normal' }: { label: string; text: string; size?: 'lg' | 'normal' | 'sm' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const sizeClass = size === 'lg' ? 'text-base font-semibold' : size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <div className="relative group">
      {label && <p className="text-[10px] font-medium text-amber-400 uppercase tracking-wider mb-1">{label}</p>}
      <div className="bg-black/20 rounded-lg p-3 pr-10">
        <p className={`text-white leading-relaxed ${sizeClass}`}>{text}</p>
      </div>
      <button onClick={copy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}

function Pill({ text, color = 'amber' }: { text: string; color?: string }) {
  const colors: Record<string, string> = {
    amber:  'bg-amber-500/10 text-amber-300 border-amber-500/20',
    green:  'bg-green-500/10  text-green-300  border-green-500/20',
    blue:   'bg-blue-500/10   text-blue-300   border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    rose:   'bg-rose-500/10   text-rose-300   border-rose-500/20',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${colors[color] || colors.amber}`}>
      {text}
    </span>
  );
}

function BulletList({ items, color = 'amber' }: { items: string[]; color?: string }) {
  const dotColor: Record<string, string> = { amber: 'bg-amber-400', green: 'bg-green-400', blue: 'bg-blue-400' };
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor[color] || 'bg-amber-400'} flex-shrink-0 mt-1.5`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Expandable({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-3 text-sm font-medium text-white hover:bg-white/5 transition-all">
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="p-3 pt-0 border-t border-white/10">{children}</div>}
    </div>
  );
}

// ── Sub-tab list ────────────────────────────────────────────────────────────

const SUBTABS = [
  { id: 'conversion',  label: 'Conversion',    icon: MousePointerClick },
  { id: 'lead-assets', label: 'Lead Assets',   icon: Gift },
  { id: 'funnel',      label: 'Funnel',         icon: Target },
  { id: 'traffic',     label: 'Traffic',        icon: Megaphone },
  { id: 'playbook',    label: 'Playbook',        icon: CheckSquare },
] as const;

type SubTabId = typeof SUBTABS[number]['id'];

// ── Trust item icon ────────────────────────────────────────────────────────────

const TRUST_TYPE_COLORS: Record<string, string> = {
  stat:          'text-amber-400',
  award:         'text-yellow-400',
  certification: 'text-blue-400',
  media:         'text-purple-400',
  guarantee:     'text-green-400',
  years:         'text-orange-400',
};

// ── Main Report ──────────────────────────────────────────────────────────────

export default function AcquisitionReport({ report }: { report: ConversionAcquisitionReport }) {
  const [activeTab, setActiveTab] = useState<SubTabId>('conversion');

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/20 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium text-amber-400 uppercase tracking-widest mb-1">Conversion & Acquisition Engine</p>
            <h3 className="text-xl font-bold text-white">{report.businessName}</h3>
            <p className="text-gray-400 text-sm mt-1">{report.acquisitionPersonality}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Primary Goal</p>
            <p className="text-amber-300 text-sm font-semibold mt-0.5">{report.primaryConversionGoal}</p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 overflow-x-auto">
        {SUBTABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === id ? 'bg-amber-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}>
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

        {/* ───────────────── CONVERSION ────────────────── */}
        {activeTab === 'conversion' && (
          <div className="space-y-5">

            {/* Hero CTA */}
            <SectionCard title="Hero CTA System" icon={MousePointerClick}>
              <div className="space-y-3">
                <CopyBlock label="Headline"    text={report.heroCTA.headline}      size="lg" />
                <CopyBlock label="Subheadline" text={report.heroCTA.subheadline} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <CopyBlock label="Primary CTA"   text={report.heroCTA.primaryCTA} />
                  <CopyBlock label="Secondary CTA" text={report.heroCTA.secondaryCTA} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <CopyBlock label="Micro-copy"    text={report.heroCTA.microCopy} size="sm" />
                  <CopyBlock label="Social Proof"  text={report.heroCTA.socialProofNote} size="sm" />
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-[10px] font-medium text-amber-400 uppercase tracking-wider mb-1">Visual Recommendation</p>
                  <p className="text-gray-300 text-sm">{report.heroCTA.visualRecommendation}</p>
                </div>
                <div className="bg-white/3 rounded-lg p-3">
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Rationale</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{report.heroCTA.rationale}</p>
                </div>
              </div>
            </SectionCard>

            {/* Sticky Mobile CTA */}
            <SectionCard title="Sticky Mobile CTA" icon={Smartphone}>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{report.stickyMobileCTA.primaryText}</p>
                    <p className="text-amber-100 text-xs">{report.stickyMobileCTA.secondaryText}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Trigger</p>
                    <p className="text-gray-300 text-sm">{report.stickyMobileCTA.triggerBehavior}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Color</p>
                    <p className="text-gray-300 text-sm">{report.stickyMobileCTA.colorGuidance}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">A/B Variants</p>
                  <div className="flex flex-wrap gap-2">
                    {report.stickyMobileCTA.abVariants.map((v, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">{v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Trust Bar */}
            <SectionCard title="Trust Bar" icon={Star}>
              {report.trustBar.headline && (
                <p className="text-white font-semibold text-sm mb-3">{report.trustBar.headline}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
                {report.trustBar.items.map((item, i) => (
                  <div key={i} className="bg-black/20 rounded-lg p-3 text-center">
                    <p className={`text-lg font-bold ${TRUST_TYPE_COLORS[item.type] || 'text-amber-400'}`}>{item.value}</p>
                    <p className="text-white text-xs font-medium mt-0.5">{item.label}</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">{item.supportingText}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs"><span className="text-amber-400">Placement:</span> {report.trustBar.placement} &nbsp;&middot;&nbsp; {report.trustBar.designNote}</p>
            </SectionCard>

            {/* Testimonials */}
            <SectionCard title="Testimonial Strategy" icon={Star}>
              <p className="text-white font-semibold mb-3">{report.testimonialStrategy.sectionHeadline}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider">Display</p>
                  <p className="text-gray-300 text-sm">{report.testimonialStrategy.displayStyle}</p>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3">Video vs Text</p>
                  <p className="text-gray-300 text-sm">{report.testimonialStrategy.videoVsText}</p>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3">Placement Zones</p>
                  <BulletList items={report.testimonialStrategy.placementZones} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider">Selection Criteria</p>
                  <BulletList items={report.testimonialStrategy.selectionCriteria} />
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3">Prompt Questions to Ask</p>
                  <BulletList items={report.testimonialStrategy.promptQuestions} />
                </div>
              </div>
            </SectionCard>

            {/* Before / After */}
            <SectionCard title="Before & After Section" icon={ArrowRight}>
              <CopyBlock label="Section Headline" text={report.beforeAfterSection.headline} size="lg" />
              <p className="text-gray-400 text-sm mt-2 mb-4">{report.beforeAfterSection.subheadline}</p>
              <div className="space-y-3">
                {report.beforeAfterSection.pairs.map((pair, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                      <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Before</p>
                      <p className="text-gray-300 text-sm">{pair.before}</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                      <p className="text-[10px] font-bold text-green-400 uppercase mb-1">After</p>
                      <p className="text-gray-300 text-sm">{pair.after}</p>
                    </div>
                    <p className="col-span-2 text-[10px] text-gray-500 italic">{pair.context}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex-1">
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Emotional Core</p>
                  <p className="text-gray-300 text-sm">{report.beforeAfterSection.emotionalCore}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">CTA After Section</p>
                  <p className="text-gray-300 text-sm font-medium">{report.beforeAfterSection.ctaAfter}</p>
                </div>
              </div>
            </SectionCard>

            {/* FAQ */}
            <SectionCard title="FAQ Strategy" icon={BookOpen}>
              <p className="text-white font-semibold mb-3">{report.faqStrategy.sectionHeadline}</p>
              <div className="space-y-2">
                {report.faqStrategy.items.map((item, i) => (
                  <Expandable key={i} title={item.question}>
                    <div className="mt-2 space-y-2">
                      <p className="text-gray-300 text-sm leading-relaxed">{item.answer}</p>
                      <div className="flex gap-2 flex-wrap pt-1">
                        <Pill text={item.category} color="blue" />
                        <Pill text={item.conversionIntent} color="green" />
                      </div>
                    </div>
                  </Expandable>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-3"><span className="text-amber-400">Placement:</span> {report.faqStrategy.placement}</p>
            </SectionCard>

            {/* Objections */}
            <SectionCard title="Objection Handling" icon={CheckSquare}>
              <p className="text-white font-semibold mb-3">{report.objectionSection.sectionHeadline}</p>
              <div className="space-y-3">
                {report.objectionSection.handlers.map((h, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4 space-y-2">
                    <p className="text-red-300 text-sm font-medium">“{h.objection}”</p>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider">Reframe</p>
                    <p className="text-gray-300 text-sm">{h.reframe}</p>
                    <CopyBlock label="Copy Block" text={h.copyBlock} size="sm" />
                    <p className="text-[10px] text-gray-500"><span className="text-amber-400">Placement:</span> {h.placement}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-3">{report.objectionSection.designRecommendation}</p>
            </SectionCard>

            {/* Final CTA */}
            <SectionCard title="Final CTA Section" icon={Target}>
              <div className="space-y-3">
                <CopyBlock label="Closing Headline"    text={report.finalCTA.headline}    size="lg" />
                <CopyBlock label="Closing Subheadline" text={report.finalCTA.subheadline} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <CopyBlock label="Primary Button" text={report.finalCTA.primaryCTA} />
                  <CopyBlock label="Micro-copy"     text={report.finalCTA.microCopy}  size="sm" />
                </div>
                <CopyBlock label="Guarantee / Risk Reversal" text={report.finalCTA.guarantee} />
                {report.finalCTA.urgencyNote && (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Ethical Urgency</p>
                    <p className="text-gray-300 text-sm">{report.finalCTA.urgencyNote}</p>
                  </div>
                )}
                <p className="text-gray-400 text-xs"><span className="text-amber-400">Design style:</span> {report.finalCTA.designStyle}</p>
              </div>
            </SectionCard>

            {/* Next Steps */}
            <SectionCard title="Next Steps for Visitors" icon={ArrowRight}>
              <p className="text-white font-semibold mb-4">{report.nextSteps.headline}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {report.nextSteps.steps.map((step, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-amber-400 font-bold text-sm">{step.step}</span>
                    </div>
                    <p className="text-white text-sm font-semibold mb-1">{step.action}</p>
                    <p className="text-gray-400 text-xs">{step.detail}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-amber-300 text-sm font-medium">{report.nextSteps.clearestPath}</p>
              </div>
            </SectionCard>

          </div>
        )}

        {/* ───────────────── LEAD ASSETS ────────────────── */}
        {activeTab === 'lead-assets' && (
          <div className="space-y-5">

            {/* Lead Magnets */}
            <SectionCard title="Lead Magnet Ideas" icon={Gift}>
              <div className="space-y-4">
                {report.leadMagnets.map((lm, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-white font-semibold text-sm">{lm.title}</p>
                      <Pill text={lm.format} color="amber" />
                    </div>
                    <p className="text-gray-400 text-xs">{lm.topic}</p>
                    <p className="text-gray-300 text-sm">{lm.valueProposition}</p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Delivery</p>
                        <p className="text-gray-400 text-xs">{lm.deliveryMethod}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">CTA Text</p>
                        <p className="text-white text-xs font-medium">{lm.ctaText}</p>
                      </div>
                    </div>
                    <CopyBlock label="Landing Page Headline" text={lm.landingPageHeadline} />
                    <div className="bg-white/3 rounded-lg p-2">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Email Sequence</p>
                      <p className="text-gray-400 text-xs">{lm.emailSequenceSuggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Free Guides */}
            <SectionCard title="Free Guide Ideas" icon={BookOpen}>
              <div className="space-y-4">
                {report.freeGuides.map((guide, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <p className="text-white font-semibold text-sm">{guide.title}</p>
                    <p className="text-amber-300 text-xs mt-0.5 mb-3">{guide.subtitle}</p>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Problem Solved</p>
                        <p className="text-gray-400 text-xs">{guide.targetProblem}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Format</p>
                        <p className="text-gray-400 text-xs">{guide.deliveryFormat}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Chapters</p>
                    <BulletList items={guide.chapters} />
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="px-3 py-1 bg-amber-600/20 border border-amber-500/30 text-amber-300 text-xs rounded-full">{guide.ctaText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Pricing Guides */}
            <SectionCard title="Pricing Guide Ideas" icon={DollarSign}>
              <div className="space-y-4">
                {report.pricingGuides.map((pg, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <p className="text-white font-semibold text-sm mb-1">{pg.title}</p>
                    <p className="text-gray-400 text-sm mb-3">{pg.premise}</p>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Sections</p>
                    <BulletList items={pg.sections} />
                    <div className="mt-3 bg-white/3 rounded-lg p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Psychology</p>
                      <p className="text-gray-400 text-xs">{pg.psychologyNote}</p>
                    </div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-1">After Download CTA</p>
                    <p className="text-gray-300 text-sm font-medium">{pg.ctaAfterDownload}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Checklists */}
            <SectionCard title="Checklist Ideas" icon={ClipboardList}>
              <div className="space-y-4">
                {report.checklists.map((cl, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-semibold text-sm">{cl.title}</p>
                      {cl.printFriendly && <Pill text="Print-friendly" color="green" />}
                    </div>
                    <p className="text-gray-400 text-xs mb-3">{cl.useCase}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {cl.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckSquare className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="px-3 py-1 bg-amber-600/20 border border-amber-500/30 text-amber-300 text-xs rounded-full">{cl.ctaText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

          </div>
        )}

        {/* ───────────────── FUNNEL ────────────────── */}
        {activeTab === 'funnel' && (
          <div className="space-y-5">

            {/* Consultation Funnel */}
            <SectionCard title={report.consultationFunnel.funnelName} icon={Target}>
              <div className="mb-4">
                <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Entry Points</p>
                <div className="flex flex-wrap gap-2">
                  {report.consultationFunnel.entryPoints.map((ep, i) => <Pill key={i} text={ep} color="blue" />)}
                </div>
              </div>
              <div className="space-y-3 mb-4">
                {report.consultationFunnel.steps.map((step) => (
                  <div key={step.step} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 text-xs font-bold">{step.step}</span>
                    </div>
                    <div className="flex-1 bg-black/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white text-sm font-semibold">{step.name}</p>
                        <Pill text={step.goal} color="green" />
                      </div>
                      <p className="text-gray-400 text-xs mb-2">{step.action}</p>
                      <p className="text-gray-300 text-sm italic">&ldquo;{step.copy}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Booking Platform</p>
                  <p className="text-gray-300 text-sm">{report.consultationFunnel.bookingPlatformSuggestion}</p>
                </div>
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">No-Show Strategy</p>
                  <p className="text-gray-300 text-sm">{report.consultationFunnel.noShowStrategy}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Reminder Sequence</p>
                  <div className="space-y-1">
                    {report.consultationFunnel.reminderSequence.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />{r}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Follow-Up Sequence</p>
                  <div className="space-y-1">
                    {report.consultationFunnel.followUpSequence.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                        <ArrowRight className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />{f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Contact Form */}
            <SectionCard title="Contact Form Strategy" icon={Phone}>
              <p className="text-white font-semibold mb-3">{report.contactForm.headline}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Form Fields</p>
                  <BulletList items={report.contactForm.fields} />
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-1">Submit Button</p>
                  <span className="px-4 py-2 bg-amber-600 rounded-lg text-white text-sm font-medium inline-block">{report.contactForm.submitButtonText}</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">On Submission</p>
                    <p className="text-gray-300 text-sm">{report.contactForm.confirmationMessage}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Notification Strategy</p>
                    <p className="text-gray-300 text-sm">{report.contactForm.notificationStrategy}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Response Time Copy</p>
                    <p className="text-amber-300 text-sm font-medium">{report.contactForm.responseTimeCopy}</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Email Capture */}
            <SectionCard title="Email Capture Strategy" icon={Mail}>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mb-4">
                <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Primary Offer</p>
                <p className="text-white text-sm font-semibold">{report.emailCapture.primaryOffer}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Placement Zones</p>
                  <BulletList items={report.emailCapture.placementZones} />
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-2">Form Headlines</p>
                  {report.emailCapture.formHeadlines.map((h, i) => (
                    <div key={i} className="mb-1.5">
                      <CopyBlock label={`Variant ${i + 1}`} text={h} size="sm" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Welcome Email Subject</p>
                  <p className="text-white text-sm font-medium mb-3">{report.emailCapture.welcomeEmailSubject}</p>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Welcome Sequence</p>
                  <div className="space-y-1">
                    {report.emailCapture.welcomeSequence.map((e, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="text-amber-400 font-bold flex-shrink-0">#{i + 1}</span>{e}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-2">Automation Tips</p>
                  <BulletList items={report.emailCapture.automationTips} />
                </div>
              </div>
            </SectionCard>

            {/* SMS Capture */}
            <SectionCard title="SMS Capture Strategy" icon={MessageSquare}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Offer</p>
                    <p className="text-white text-sm font-semibold">{report.smsCapture.offer}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Opt-In Mechanism</p>
                    <p className="text-gray-300 text-sm">{report.smsCapture.optInMechanism}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Keyword Trigger</p>
                    <span className="px-3 py-1 bg-amber-600/20 border border-amber-500/30 text-amber-300 font-mono text-sm rounded">
                      TEXT "{report.smsCapture.keywordTrigger}"
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <CopyBlock label="Initial SMS Message" text={report.smsCapture.initialMessage} size="sm" />
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Follow-Up Flow</p>
                    <BulletList items={report.smsCapture.followUpFlow} />
                  </div>
                  <div className="bg-white/3 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500">⚠️ {report.smsCapture.complianceReminder}</p>
                  </div>
                </div>
              </div>
            </SectionCard>

          </div>
        )}

        {/* ───────────────── TRAFFIC ────────────────── */}
        {activeTab === 'traffic' && (
          <div className="space-y-5">

            {/* Retargeting */}
            <SectionCard title="Retargeting Plan" icon={RefreshCw}>
              <p className="text-gray-300 text-sm mb-4">{report.retargeting.overview}</p>
              <div className="space-y-3 mb-4">
                {report.retargeting.audiences.map((aud, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      <p className="text-white font-semibold text-sm">{aud.name}</p>
                      <Pill text={aud.platform} color="blue" />
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{aud.definition}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Message Angle</p>
                        <p className="text-gray-300 text-xs">{aud.messagingAngle}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Offer</p>
                        <p className="text-gray-300 text-xs">{aud.offerIdea}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {report.retargeting.platforms.map((p, i) => <Pill key={i} text={p} color="purple" />)}
                  </div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-1">Budget Guidance</p>
                  <p className="text-gray-300 text-sm">{report.retargeting.budgetGuidance}</p>
                </div>
                <div>
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Creative Ideas</p>
                  <BulletList items={report.retargeting.creativeIdeas} />
                  <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-1">Sequence Logic</p>
                  <p className="text-gray-300 text-sm">{report.retargeting.sequenceLogic}</p>
                </div>
              </div>
            </SectionCard>

            {/* Social Content */}
            <SectionCard title="Social Content Strategy" icon={Megaphone}>
              <p className="text-gray-300 text-sm mb-4">{report.socialContent.overview}</p>
              <div className="space-y-4 mb-4">
                {report.socialContent.platforms.map((plat, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white font-semibold text-sm">{plat.platform}</p>
                      <Pill text={plat.postingCadence} color="green" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Content Pillars</p>
                        <BulletList items={plat.contentPillars} />
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-1">Format Mix</p>
                        <div className="flex flex-wrap gap-1">
                          {plat.formatMix.map((f, j) => <Pill key={j} text={f} color="blue" />)}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Top Post Ideas</p>
                        <BulletList items={plat.topPostIdeas} />
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-1">Hashtags</p>
                        <p className="text-gray-400 text-xs">{plat.hashtagStrategy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Viral Hooks</p>
                <div className="space-y-2">
                  {report.socialContent.viralHooks.map((hook, i) => (
                    <CopyBlock key={i} label={`Hook ${i + 1}`} text={hook} size="sm" />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-3">{report.socialContent.contentCalendarNote}</p>
            </SectionCard>

            {/* Referral Campaigns */}
            <SectionCard title="Referral Campaigns" icon={Share2}>
              <div className="space-y-4">
                {report.referralCampaigns.map((campaign, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4 space-y-3">
                    <p className="text-white font-semibold">{campaign.campaignName}</p>
                    <p className="text-gray-400 text-sm">{campaign.mechanic}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                        <p className="text-[10px] text-green-400 uppercase tracking-wider mb-1">Referrer Gets</p>
                        <p className="text-white text-sm font-semibold">{campaign.referrerIncentive}</p>
                      </div>
                      <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
                        <p className="text-[10px] text-blue-400 uppercase tracking-wider mb-1">New Customer Gets</p>
                        <p className="text-white text-sm font-semibold">{campaign.refereeIncentive}</p>
                      </div>
                    </div>
                    <CopyBlock label="Ask Copy" text={campaign.askCopy} />
                    <CopyBlock label="Message Template" text={campaign.messagingTemplate} size="sm" />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Launch Sequence</p>
                        <BulletList items={campaign.launchSequence} />
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2">Success Metrics</p>
                        <BulletList items={campaign.successMetrics} color="green" />
                        <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-3 mb-1">Tracking</p>
                        <p className="text-gray-400 text-xs">{campaign.trackingMethod}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

          </div>
        )}

        {/* ───────────────── PLAYBOOK ────────────────── */}
        {activeTab === 'playbook' && (
          <div className="space-y-5">

            <SectionCard title="Conversion Principles" icon={CheckSquare}>
              <div className="space-y-2">
                {report.conversionPrinciples.map((principle, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400 text-xs font-bold">{i + 1}</span>
                    <p className="text-gray-300 text-sm leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Priority Actions" icon={Target}>
              <div className="space-y-2">
                {report.priorityActions.map((action, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                    <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{action}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="30-Day Acquisition Plan" icon={TrendingUp}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {report.thirtyDayPlan.map((week, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <span className="text-amber-400 font-bold text-xs">W{i + 1}</span>
                      </div>
                      <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Week {i + 1}</p>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{week}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

          </div>
        )}

      </motion.div>
    </div>
  );
}
