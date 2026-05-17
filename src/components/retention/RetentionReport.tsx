'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Gem, Crown, RotateCcw, Star, Users,
  Cake, Share2, BookOpen, Copy, Check, ChevronDown,
  ChevronUp, ArrowRight, CheckSquare, TrendingUp,
} from 'lucide-react';
import type { RetentionReferralReport, FollowUpEmail } from '@/types/retention';

// ── Primitives ────────────────────────────────────────────────────────────────

function SectionCard({ title, icon: Icon, children, className = '' }: {
  title: string; icon: React.ElementType; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-indigo-400" />
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function CopyBlock({ label, text, size = 'normal' }: { label?: string; text: string; size?: 'lg' | 'normal' | 'sm' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const sizeClass = size === 'lg' ? 'text-base font-semibold' : size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <div className="relative group">
      {label && <p className="text-[10px] font-medium text-indigo-400 uppercase tracking-wider mb-1">{label}</p>}
      <div className="bg-black/20 rounded-lg p-3 pr-10">
        <p className={`text-white leading-relaxed whitespace-pre-wrap ${sizeClass}`}>{text}</p>
      </div>
      <button onClick={copy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}

function Pill({ text, color = 'indigo' }: { text: string; color?: string }) {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    green:  'bg-green-500/10  text-green-300  border-green-500/20',
    amber:  'bg-amber-500/10  text-amber-300  border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    rose:   'bg-rose-500/10   text-rose-300   border-rose-500/20',
    blue:   'bg-blue-500/10   text-blue-300   border-blue-500/20',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${colors[color] || colors.indigo}`}>
      {text}
    </span>
  );
}

function BulletList({ items, color = 'indigo' }: { items: string[]; color?: string }) {
  const dotColor: Record<string, string> = { indigo: 'bg-indigo-400', green: 'bg-green-400', amber: 'bg-amber-400' };
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor[color] || 'bg-indigo-400'} flex-shrink-0 mt-1.5`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Expandable({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-3 text-sm font-medium text-white hover:bg-white/5 transition-all">
        <span className="flex items-center gap-2">{title}{badge && <Pill text={badge} color="indigo" />}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="p-4 pt-0 border-t border-white/10 space-y-3">{children}</div>}
    </div>
  );
}

// ── Email type config ────────────────────────────────────────────────────────────

const EMAIL_META: Record<FollowUpEmail['type'], { label: string; color: string; dot: string; desc: string }> = {
  'trust-building':     { label: 'Trust Building',     color: 'bg-blue-500/10 border-blue-500/30 text-blue-300',   dot: 'bg-blue-400',   desc: 'Introduce the brand, share story, zero hard sell' },
  'case-study':         { label: 'Case Study',          color: 'bg-green-500/10 border-green-500/30 text-green-300', dot: 'bg-green-400',  desc: 'Before/after transformation relevant to this industry' },
  'testimonial-proof':  { label: 'Testimonial Proof',   color: 'bg-amber-500/10 border-amber-500/30 text-amber-300', dot: 'bg-amber-400',  desc: 'Social proof, reviews, recognition' },
  'cta-reminder':       { label: 'CTA Reminder',        color: 'bg-rose-500/10 border-rose-500/30 text-rose-300',   dot: 'bg-rose-400',   desc: 'Address #1 objection, make next step easy' },
  'educational-value':  { label: 'Educational Value',   color: 'bg-purple-500/10 border-purple-500/30 text-purple-300', dot: 'bg-purple-400', desc: 'Teach something genuinely useful, build authority' },
};

// ── Sub-tabs ──────────────────────────────────────────────────────────────────

const SUBTABS = [
  { id: 'followup',    label: 'Follow-Up',      icon: Mail },
  { id: 'loyalty',     label: 'Loyalty & VIP',  icon: Gem },
  { id: 'campaigns',  label: 'Campaigns',       icon: Cake },
  { id: 'newsletter', label: 'Newsletter',      icon: BookOpen },
  { id: 'referral',   label: 'Referral',        icon: Share2 },
  { id: 'playbook',   label: 'Playbook',        icon: CheckSquare },
] as const;

type SubTabId = typeof SUBTABS[number]['id'];

// ── Main Report ──────────────────────────────────────────────────────────────

export default function RetentionReport({ report }: { report: RetentionReferralReport }) {
  const [activeTab, setActiveTab] = useState<SubTabId>('followup');

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-violet-900/20 border border-indigo-500/20 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium text-indigo-400 uppercase tracking-widest mb-1">Retention & Referral Engine</p>
            <h3 className="text-xl font-bold text-white">{report.businessName}</h3>
            <p className="text-gray-400 text-sm mt-1">{report.retentionPersonality}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Primary Goal</p>
            <p className="text-indigo-300 text-sm font-semibold mt-0.5">{report.primaryRetentionGoal}</p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 overflow-x-auto">
        {SUBTABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === id ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}>
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

        {/* ───────────────── FOLLOW-UP SEQUENCE ────────────────── */}
        {activeTab === 'followup' && (
          <div className="space-y-5">

            {/* Sequence meta */}
            <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Sequence Name</p>
                  <p className="text-white text-sm font-semibold">{report.followUpSequence.sequenceName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Trigger</p>
                  <p className="text-gray-300 text-sm">{report.followUpSequence.trigger}</p>
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Exit Condition</p>
                  <p className="text-gray-300 text-sm">{report.followUpSequence.exitCondition}</p>
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Goal</p>
                  <p className="text-gray-300 text-sm">{report.followUpSequence.conversionGoal}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-indigo-500/10">
                <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Industry Adaptation</p>
                <p className="text-gray-300 text-sm">{report.followUpSequence.industryAdaptation}</p>
              </div>
            </div>

            {/* Timeline visual */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-indigo-500/20" />
              <div className="space-y-4">
                {report.followUpSequence.emails.map((email) => {
                  const meta = EMAIL_META[email.type];
                  return (
                    <div key={email.day} className="relative flex gap-4">
                      {/* Day bubble */}
                      <div className="flex-shrink-0 w-16 flex flex-col items-center z-10">
                        <div className="w-10 h-10 rounded-full bg-indigo-900/60 border-2 border-indigo-500/40 flex items-center justify-center">
                          <span className="text-indigo-300 font-bold text-xs">D{email.day}</span>
                        </div>
                      </div>

                      {/* Email card */}
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 pb-3">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${meta.color}`}>{meta.label}</span>
                          <span className="text-[10px] text-gray-500">{meta.desc}</span>
                        </div>

                        <CopyBlock label="Subject Line"  text={email.subject}     size="lg" />
                        <div className="mt-2">
                          <CopyBlock label="Preview Text" text={email.previewText} size="sm" />
                        </div>
                        <div className="mt-2">
                          <CopyBlock label="Email Body"   text={email.body} />
                        </div>
                        <div className="mt-2 flex gap-3">
                          <div className="flex-1">
                            <CopyBlock label="CTA"         text={email.cta}         size="sm" />
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Tone</p>
                            <p className="text-gray-400 text-xs">{email.toneNote}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Industry Adaptation</p>
                            <p className="text-gray-400 text-xs">{email.industryAdaptation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Adaptation guide */}
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
              <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-2">Adaptation Guide</p>
              <p className="text-gray-300 text-sm leading-relaxed">{report.followUpSequence.adaptationGuide}</p>
            </div>

          </div>
        )}

        {/* ───────────────── LOYALTY & VIP ────────────────── */}
        {activeTab === 'loyalty' && (
          <div className="space-y-5">

            <SectionCard title={report.loyaltyProgram.programName} icon={Gem}>
              <p className="text-gray-300 text-sm mb-4">{report.loyaltyProgram.premise}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {report.loyaltyProgram.tiers.map((tier, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${
                    i === 0 ? 'bg-slate-800/50 border-slate-600/30' :
                    i === 1 ? 'bg-indigo-900/30 border-indigo-500/30' :
                               'bg-gradient-to-b from-amber-900/30 to-orange-900/20 border-amber-500/30'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{tier.badge}</span>
                      <div>
                        <p className="text-white font-bold text-sm">{tier.name}</p>
                        <p className="text-gray-400 text-[10px]">{tier.threshold}</p>
                      </div>
                    </div>
                    <p className="text-indigo-300 text-[10px] italic mb-2">{tier.emotionalAppeal}</p>
                    <ul className="space-y-1">
                      {tier.perks.map((perk, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-gray-300">
                          <span className="text-indigo-400 mt-0.5">•</span>{perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">How to Earn</p>
                  <p className="text-gray-300 text-sm">{report.loyaltyProgram.earnMechanic}</p>
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">How to Redeem</p>
                  <p className="text-gray-300 text-sm">{report.loyaltyProgram.redeemMechanic}</p>
                </div>
              </div>
              <div className="space-y-3">
                <CopyBlock label="Launch Announcement" text={report.loyaltyProgram.launchCopy} />
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-indigo-600 rounded-lg text-white text-sm font-semibold">{report.loyaltyProgram.enrollmentCTA}</span>
                  <p className="text-gray-400 text-xs">{report.loyaltyProgram.techSuggestion}</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="VIP Program" icon={Crown}>
              <p className="text-gray-300 text-sm mb-3">{report.vipProgram.overview}</p>
              <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-3 mb-4">
                <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Qualification</p>
                <p className="text-gray-300 text-sm">{report.vipProgram.qualificationCriteria}</p>
              </div>
              <CopyBlock label="Invitation Subject" text={report.vipProgram.invitationSubject} />
              <div className="mt-2">
                <CopyBlock label="Invitation Email Body" text={report.vipProgram.invitationBody} />
              </div>
              <div className="mt-4 space-y-3">
                <p className="text-[10px] text-indigo-400 uppercase tracking-wider">VIP Offers</p>
                {report.vipProgram.offers.map((offer, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-semibold text-sm">{offer.name}</p>
                      <Pill text={offer.trigger} color="amber" />
                    </div>
                    <p className="text-amber-300 text-sm font-medium mb-2">{offer.offer}</p>
                    <CopyBlock text={offer.copy} size="sm" />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="text-[10px] text-gray-500">📦 {offer.deliveryMethod}</p>
                      <p className="text-[10px] text-gray-500">✨ {offer.exclusivityAngle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

          </div>
        )}

        {/* ───────────────── CAMPAIGNS ────────────────── */}
        {activeTab === 'campaigns' && (
          <div className="space-y-5">

            <SectionCard title={report.reactivationCampaign.campaignName} icon={RotateCcw}>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Trigger</p>
                  <p className="text-gray-300 text-sm">{report.reactivationCampaign.triggerCondition}</p>
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Win-Back Offer</p>
                  <p className="text-white text-sm font-semibold">{report.reactivationCampaign.winBackOffer}</p>
                </div>
              </div>
              <CopyBlock label="Win-Back Core Message" text={report.reactivationCampaign.winBackCopy} />
              <div className="mt-4 space-y-2">
                {report.reactivationCampaign.emails.map((email) => (
                  <Expandable key={email.touchNumber} title={`Touch ${email.touchNumber} — Day ${email.daysSinceLastContact}`} badge={email.tone}>
                    <CopyBlock label="Subject"      text={email.subject}      size="sm" />
                    <CopyBlock label="Preview Text" text={email.previewText}  size="sm" />
                    <CopyBlock label="Body"         text={email.body} />
                    <CopyBlock label="CTA"          text={email.cta}          size="sm" />
                  </Expandable>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Sunset Policy</p>
                <p className="text-gray-400 text-sm">{report.reactivationCampaign.sunsetPolicy}</p>
                <CopyBlock label="Final Sunset Email Subject" text={report.reactivationCampaign.sunsetSubject} size="sm" />
                <CopyBlock label="Sunset Email Body" text={report.reactivationCampaign.sunsetBody} />
              </div>
            </SectionCard>

            <SectionCard title="Anniversary Campaign" icon={Cake}>
              <p className="text-gray-300 text-sm mb-2">{report.anniversaryCampaign.overview}</p>
              <div className="flex items-center gap-2 mb-4">
                <Pill text={report.anniversaryCampaign.emotionalTone} color="indigo" />
                <p className="text-gray-400 text-xs">{report.anniversaryCampaign.automationNote}</p>
              </div>
              <div className="space-y-2">
                {report.anniversaryCampaign.touches.map((touch, i) => (
                  <Expandable key={i} title={touch.milestone} badge={touch.touchpointType}>
                    <CopyBlock label="Subject" text={touch.subject} size="sm" />
                    <CopyBlock label="Body" text={touch.body} />
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1">
                        <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Offer / Gesture</p>
                        <p className="text-amber-300 text-sm font-medium">{touch.offer}</p>
                      </div>
                      <Pill text={touch.channel} color="blue" />
                    </div>
                  </Expandable>
                ))}
              </div>
            </SectionCard>

          </div>
        )}

        {/* ───────────────── NEWSLETTER ────────────────── */}
        {activeTab === 'newsletter' && (
          <div className="space-y-5">

            <SectionCard title={`${report.newsletterStrategy.name} Newsletter`} icon={BookOpen}>
              <p className="text-indigo-300 text-sm italic mb-4">“{report.newsletterStrategy.tagline}”</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-black/20 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Frequency</p>
                  <p className="text-white text-sm font-semibold">{report.newsletterStrategy.frequency}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 text-center col-span-3">
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Best Day & Time</p>
                  <p className="text-white text-sm font-semibold">{report.newsletterStrategy.bestDayTime}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-2">Content Pillars</p>
                  <BulletList items={report.newsletterStrategy.contentPillars} />
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mt-3 mb-2">Growth Tactics</p>
                  <BulletList items={report.newsletterStrategy.growthTactics} color="green" />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-2">Subject Line Formulas</p>
                  {report.newsletterStrategy.subjectLineFormulas.map((f, i) => (
                    <div key={i} className="mb-1.5">
                      <CopyBlock text={f} size="sm" />
                    </div>
                  ))}
                  <div className="mt-3 bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                    <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Reduce Unsubscribes</p>
                    <p className="text-gray-300 text-sm">{report.newsletterStrategy.unsubscribeReductionTip}</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-2">Segmentation</p>
              <p className="text-gray-300 text-sm mb-4">{report.newsletterStrategy.segmentationApproach}</p>
              <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-3">Sample Issues</p>
              <div className="space-y-2">
                {report.newsletterStrategy.sampleIssues.map((issue) => (
                  <Expandable key={issue.issueNumber} title={`Issue ${issue.issueNumber}: ${issue.subject}`}>
                    <CopyBlock label="Preview Text" text={issue.previewText} size="sm" />
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Theme</p>
                        <p className="text-gray-300 text-sm">{issue.contentTheme}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Value Offer</p>
                        <p className="text-gray-300 text-sm">{issue.valueOffer}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs rounded-full">{issue.cta}</span>
                    </div>
                  </Expandable>
                ))}
              </div>
            </SectionCard>

          </div>
        )}

        {/* ───────────────── REFERRAL & REVIEWS ────────────────── */}
        {activeTab === 'referral' && (
          <div className="space-y-5">

            {/* Referral System */}
            <SectionCard title={report.referralSystem.systemName} icon={Share2}>
              <p className="text-gray-300 text-sm mb-4">{report.referralSystem.mechanic}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
                  <p className="text-[10px] text-green-400 uppercase tracking-wider mb-1">Referrer Gets</p>
                  <p className="text-white font-bold">{report.referralSystem.referrerReward}</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4">
                  <p className="text-[10px] text-blue-400 uppercase tracking-wider mb-1">New Customer Gets</p>
                  <p className="text-white font-bold">{report.referralSystem.refereeReward}</p>
                </div>
              </div>
              <div className="space-y-3">
                <CopyBlock label="Ask Copy"      text={report.referralSystem.askCopy} />
                <CopyBlock label="Thank You"     text={report.referralSystem.thankYouCopy} size="sm" />
                <CopyBlock label="30-Day Follow-Up" text={report.referralSystem.followUpCopy} size="sm" />
              </div>
              <p className="text-[10px] text-indigo-400 uppercase tracking-wider mt-4 mb-2">Touchpoints</p>
              <div className="space-y-2">
                {report.referralSystem.touchpoints.map((tp, i) => (
                  <div key={i} className="bg-black/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill text={tp.timing} color="indigo" />
                      <Pill text={tp.channel} color="blue" />
                    </div>
                    <CopyBlock text={tp.message} size="sm" />
                    <p className="text-[10px] text-green-400 mt-1">🎁 {tp.incentive}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Tracking Method</p>
                <p className="text-gray-300 text-sm">{report.referralSystem.trackingMethod}</p>
                <CopyBlock label="Launch Announcement" text={report.referralSystem.launchAnnouncement} />
              </div>
            </SectionCard>

            {/* Review Request Flow */}
            <SectionCard title="Review Request Flow" icon={Star}>
              <p className="text-gray-300 text-sm mb-3">{report.reviewRequestFlow.overview}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {report.reviewRequestFlow.platforms.map((p, i) => <Pill key={i} text={p} color="amber" />)}
              </div>
              <div className="space-y-2 mb-4">
                {report.reviewRequestFlow.emails.map((email) => (
                  <Expandable key={email.touchNumber} title={`Touch ${email.touchNumber} — ${email.timing}`} badge={email.platform}>
                    <CopyBlock label="Subject" text={email.subject} size="sm" />
                    <CopyBlock label="Body"    text={email.body} />
                    <span className="mt-2 inline-block px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs rounded-full">{email.cta}</span>
                  </Expandable>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-[10px] text-red-400 uppercase tracking-wider mb-2">Negative Review Protocol</p>
                  <p className="text-gray-300 text-sm">{report.reviewRequestFlow.badReviewProtocol}</p>
                </div>
                <div className="space-y-2">
                  <CopyBlock label="Response to 5-Star Review" text={report.reviewRequestFlow.reviewResponseTemplate} size="sm" />
                  <div className="bg-white/3 rounded-lg p-3">
                    <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Amplification</p>
                    <p className="text-gray-300 text-sm">{report.reviewRequestFlow.amplificationStrategy}</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Customer Spotlight */}
            <SectionCard title="Customer Spotlight System" icon={Users}>
              <p className="text-gray-300 text-sm mb-3">{report.customerSpotlight.overview}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-2">Selection Criteria</p>
                  <BulletList items={report.customerSpotlight.selectionCriteria} />
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mt-3 mb-1">Cadence</p>
                  <p className="text-gray-300 text-sm">{report.customerSpotlight.publishingCadence}</p>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-wider mt-3 mb-1">Incentive</p>
                  <p className="text-amber-300 text-sm font-medium">{report.customerSpotlight.incentive}</p>
                </div>
                <div>
                  <CopyBlock label="Outreach Email Subject" text={report.customerSpotlight.outreachSubject} size="sm" />
                  <div className="mt-2">
                    <CopyBlock label="Outreach Email Body"   text={report.customerSpotlight.outreachBody} />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-3">Spotlight Templates</p>
              {report.customerSpotlight.templates.map((tmpl, i) => (
                <Expandable key={i} title={tmpl.format}>
                  <CopyBlock label="Headline Formula" text={tmpl.headline} size="sm" />
                  <div className="mt-2">
                    <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-2">Interview Questions</p>
                    <BulletList items={tmpl.questions} />
                  </div>
                  <div className="mt-2">
                    <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Copy Framework</p>
                    <p className="text-gray-300 text-sm">{tmpl.copyFramework}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tmpl.distributionChannels.map((ch, j) => <Pill key={j} text={ch} color="blue" />)}
                  </div>
                </Expandable>
              ))}
            </SectionCard>

          </div>
        )}

        {/* ───────────────── PLAYBOOK ────────────────── */}
        {activeTab === 'playbook' && (
          <div className="space-y-5">

            <SectionCard title="Retention Principles" icon={CheckSquare}>
              <div className="space-y-2">
                {report.retentionPrinciples.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400 text-xs font-bold">{i + 1}</span>
                    <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Key Metrics to Track" icon={TrendingUp}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {report.retentionMetrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{metric}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="30-Day Retention Plan" icon={TrendingUp}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {report.thirtyDayRetentionPlan.map((week, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400 font-bold text-xs">W{i + 1}</span>
                      </div>
                      <p className="text-indigo-300 text-xs font-semibold uppercase tracking-wider">Week {i + 1}</p>
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
