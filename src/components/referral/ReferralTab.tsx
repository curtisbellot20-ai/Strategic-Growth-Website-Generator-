'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2, Loader2, CheckCircle2, AlertCircle,
  Star, Users, Gift, MessageSquare, Copy, Check,
  ChevronDown, ChevronUp, ArrowRight,
} from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { RetentionState, RetentionReferralReport } from '@/types/retention';

// ── Primitives ──────────────────────────────────────────────────────────────

function CopyBlock({ label, text, size = 'normal' }: { label?: string; text: string; size?: 'lg' | 'normal' | 'sm' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const sz = size === 'lg' ? 'text-base font-semibold' : size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <div className="relative group">
      {label && <p className="text-[10px] font-medium text-violet-400 uppercase tracking-wider mb-1">{label}</p>}
      <div className="bg-black/20 rounded-lg p-3 pr-10">
        <p className={`text-white leading-relaxed whitespace-pre-wrap ${sz}`}>{text}</p>
      </div>
      <button onClick={copy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}

function Pill({ text, color = 'violet' }: { text: string; color?: string }) {
  const c: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    green:  'bg-green-500/10  text-green-300  border-green-500/20',
    blue:   'bg-blue-500/10   text-blue-300   border-blue-500/20',
    amber:  'bg-amber-500/10  text-amber-300  border-amber-500/20',
  };
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${c[color] || c.violet}`}>{text}</span>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 mt-1.5" />{item}
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
        <span className="flex items-center gap-2 min-w-0">
          <span className="truncate">{title}</span>
          {badge && <Pill text={badge} color="violet" />}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && <div className="p-4 pt-0 border-t border-white/10 space-y-3">{children}</div>}
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-violet-400" />
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      {children}
    </div>
  );
}

// ── Idle cards ────────────────────────────────────────────────────────────────

const IDLE_CARDS = [
  { icon: Share2,        label: 'Referral System',      desc: 'Mechanics, incentives, ask copy, and word-of-mouth touchpoints' },
  { icon: Gift,          label: 'Referral Incentives',  desc: 'Referrer and referee rewards tailored to your industry and price point' },
  { icon: MessageSquare, label: 'Ask Copy & Scripts',   desc: 'Word-for-word scripts for asking, thanking, and following up' },
  { icon: Star,          label: 'Review Request Flow',  desc: '3-touch sequence with bad review protocol and amplification strategy' },
  { icon: Users,         label: 'Customer Spotlight',   desc: 'Turn loyal customers into brand stories and referral drivers' },
];

const LOADING_STEPS = [
  'Analyzing referral potential for this business type...',
  'Designing referral mechanics and reward structure...',
  'Writing ask copy, thank-you scripts, and touchpoints...',
  'Building review request flow and response templates...',
  'Creating customer spotlight framework and outreach...',
  'Compiling referral tracking and launch strategy...',
];

// ── Referral Report Display ──────────────────────────────────────────────────────

function ReferralPlanDisplay({ report }: { report: RetentionReferralReport }) {
  return (
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
        <div className="space-y-3 mb-4">
          <CopyBlock label="Ask Copy"        text={report.referralSystem.askCopy} />
          <CopyBlock label="Thank You"       text={report.referralSystem.thankYouCopy}    size="sm" />
          <CopyBlock label="30-Day Follow-Up" text={report.referralSystem.followUpCopy}    size="sm" />
        </div>
        <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-2">Touchpoints</p>
        <div className="space-y-2 mb-4">
          {report.referralSystem.touchpoints.map((tp, i) => (
            <div key={i} className="bg-black/20 rounded-lg p-3">
              <div className="flex flex-wrap gap-2 mb-2">
                <Pill text={tp.timing} color="violet" />
                <Pill text={tp.channel} color="blue" />
              </div>
              <CopyBlock text={tp.message} size="sm" />
              <p className="text-[10px] text-green-400 mt-1">🎁 {tp.incentive}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Tracking</p>
            <p className="text-gray-300 text-sm">{report.referralSystem.trackingMethod}</p>
          </div>
          <CopyBlock label="Launch Announcement" text={report.referralSystem.launchAnnouncement} size="sm" />
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
              <span className="inline-block mt-1 px-3 py-1 bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs rounded-full">{email.cta}</span>
            </Expandable>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-[10px] text-red-400 uppercase tracking-wider mb-2">Negative Review Protocol</p>
            <p className="text-gray-300 text-sm">{report.reviewRequestFlow.badReviewProtocol}</p>
          </div>
          <div className="space-y-2">
            <CopyBlock label="5-Star Response Template" text={report.reviewRequestFlow.reviewResponseTemplate} size="sm" />
            <div className="bg-white/3 rounded-lg p-3">
              <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Amplification</p>
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
            <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-2">Selection Criteria</p>
            <BulletList items={report.customerSpotlight.selectionCriteria} />
            <p className="text-[10px] text-violet-400 uppercase tracking-wider mt-3 mb-1">Cadence</p>
            <p className="text-gray-300 text-sm">{report.customerSpotlight.publishingCadence}</p>
            <p className="text-[10px] text-violet-400 uppercase tracking-wider mt-3 mb-1">Incentive</p>
            <p className="text-amber-300 text-sm font-medium">{report.customerSpotlight.incentive}</p>
          </div>
          <div>
            <CopyBlock label="Outreach Email Subject" text={report.customerSpotlight.outreachSubject} size="sm" />
            <div className="mt-2">
              <CopyBlock label="Outreach Email Body" text={report.customerSpotlight.outreachBody} />
            </div>
          </div>
        </div>
        <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-2">Spotlight Templates</p>
        {report.customerSpotlight.templates.map((tmpl, i) => (
          <Expandable key={i} title={tmpl.format}>
            <CopyBlock label="Headline Formula" text={tmpl.headline} size="sm" />
            <div className="mt-2">
              <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-2">Interview Questions</p>
              <BulletList items={tmpl.questions} />
            </div>
            <div className="mt-2">
              <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Copy Framework</p>
              <p className="text-gray-300 text-sm">{tmpl.copyFramework}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {tmpl.distributionChannels.map((ch, j) => <Pill key={j} text={ch} color="blue" />)}
            </div>
          </Expandable>
        ))}
      </SectionCard>

    </div>
  );
}

// ── Main Tab ──────────────────────────────────────────────────────────────────

interface Props { intake: BusinessIntake; }

export default function ReferralTab({ intake }: Props) {
  const [state, setState] = useState<RetentionState>({ status: 'idle', report: null, error: null });
  const [loadStep, setLoadStep] = useState(0);

  const generate = async () => {
    setState({ status: 'loading', report: null, error: null });
    setLoadStep(0);
    const interval = setInterval(() => {
      setLoadStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 2400);
    try {
      const res = await fetch('/api/retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      });
      clearInterval(interval);
      if (!res.ok) {
        const err = await res.json();
        setState({ status: 'error', report: null, error: err.error || 'Generation failed' });
        return;
      }
      const report: RetentionReferralReport = await res.json();
      setState({ status: 'complete', report, error: null });
    } catch (err) {
      clearInterval(interval);
      setState({ status: 'error', report: null, error: err instanceof Error ? err.message : 'Unexpected error' });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {state.status === 'idle' && (
        <motion.div key="idle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/20 mb-4">
              <Share2 className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Referral Plan</h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Generate a complete word-of-mouth system — referral mechanics, incentive structure,
              ask copy, review request flows, and a customer spotlight framework.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {IDLE_CARDS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-white">{label}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={generate}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-900/30">
              Generate Referral Plan
            </button>
            <p className="text-gray-500 text-xs mt-3">Powered by Claude Opus · ~30 seconds</p>
          </div>
        </motion.div>
      )}

      {state.status === 'loading' && (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-16 gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-violet-500/20" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-t-violet-400 animate-spin" />
            <Share2 className="absolute inset-0 m-auto w-6 h-6 text-violet-400" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-medium">Building Your Referral Plan</p>
            <AnimatePresence mode="wait">
              <motion.p key={loadStep} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="text-violet-400 text-sm">{LOADING_STEPS[loadStep]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="w-64 bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div className="h-full bg-violet-500 rounded-full"
              animate={{ width: `${((loadStep + 1) / LOADING_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }} />
          </div>
        </motion.div>
      )}

      {state.status === 'error' && (
        <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <div>
            <p className="text-white font-semibold">Generation Failed</p>
            <p className="text-gray-400 text-sm mt-1">{state.error}</p>
          </div>
          <button onClick={generate} className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-all">Try Again</button>
        </motion.div>
      )}

      {state.status === 'complete' && state.report && (
        <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/20 border border-violet-500/20 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{state.report.referralSystem.systemName}</p>
                  <p className="text-gray-400 text-xs">{state.report.referralSystem.mechanic}</p>
                </div>
              </div>
              <button onClick={() => setState({ status: 'idle', report: null, error: null })}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-all">
                <Loader2 className="w-3 h-3" /> Regenerate
              </button>
            </div>
          </div>
          <ReferralPlanDisplay report={state.report} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
