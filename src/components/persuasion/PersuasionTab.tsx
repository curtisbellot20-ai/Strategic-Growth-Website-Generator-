'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader2, AlertCircle, RefreshCw, Zap, Shield, Users, BookOpen, Feather, Star, MessageSquare } from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { PersuasionFrameworkReport, PersuasionStatus } from '@/types/persuasion';
import PersuasionReport from './PersuasionReport';

const TECHNIQUES = [
  { icon: Heart,        label: 'Emotional Resonance',     desc: 'Copy that speaks to feelings, not just logic' },
  { icon: Zap,          label: 'Transformation Messaging', desc: 'Before/after/bridge narrative frameworks' },
  { icon: Users,        label: 'Social Proof Copy',        desc: 'Testimonial frameworks and proof statements' },
  { icon: Shield,       label: 'Risk Reduction',           desc: 'Guarantees, reassurance, and trust signals' },
  { icon: Star,         label: 'Authority Building',       desc: 'Credentials and expertise communicated humanly' },
  { icon: BookOpen,     label: 'Future Pacing',            desc: 'Aspirational copy and vision statements' },
  { icon: Feather,      label: 'Confidence Building',      desc: 'Copy that replaces doubt with clarity' },
  { icon: MessageSquare,label: 'Objection Handling',       desc: 'Ethical responses to every hesitation' },
];

const STEPS = [
  'Analyzing customer psychology and emotional drivers...',
  'Mapping pain points to transformation outcomes...',
  'Writing emotional headline variants...',
  'Crafting hero copy and sub-headline...',
  'Building transformation messaging framework...',
  'Writing customer journey narratives...',
  'Developing brand and founder story hooks...',
  'Writing customer success story narrative...',
  'Crafting objection-handling copy...',
  'Engineering ethical CTA system...',
  'Building trust and social proof copy...',
  'Assembling copy playbook and power phrases...',
];

export default function PersuasionTab({ intake }: { intake: BusinessIntake }) {
  const [status, setStatus] = useState<PersuasionStatus>('idle');
  const [data, setData]     = useState<PersuasionFrameworkReport | null>(null);
  const [error, setError]   = useState<string | null>(null);
  const [step, setStep]     = useState(0);

  const generate = async () => {
    setStatus('loading'); setError(null); setStep(0);
    const iv = setInterval(() => setStep(p => p < STEPS.length - 1 ? p + 1 : p), 1900);
    try {
      const res = await fetch('/api/persuasion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      });
      clearInterval(iv);
      if (!res.ok) throw new Error();
      setData(await res.json());
      setStatus('complete');
    } catch {
      clearInterval(iv);
      setError('Generation failed. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'idle') return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0"><Heart className="w-6 h-6" /></div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Ethical Persuasion & Storytelling Engine</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Generate publish-ready persuasion copy for <strong className="text-white">{intake.businessName}</strong> —
              emotional headlines, transformation narratives, trust copy, objection handlers, CTA systems, and complete story frameworks.
              Built on clarity, truth, and genuine emotional resonance. Zero dark patterns.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TECHNIQUES.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="glass rounded-xl p-4">
            <Icon className="w-5 h-5 text-rose-400 mb-2" />
            <div className="text-white text-sm font-medium mb-1">{label}</div>
            <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={generate} className="btn-primary px-10 py-4 text-base inline-flex items-center gap-3">
          <Heart className="w-5 h-5" /> Generate Persuasion Copy
        </button>
        <p className="text-gray-500 text-xs mt-3">Powered by Claude Opus · ~35 seconds</p>
      </div>
    </div>
  );

  if (status === 'loading') return (
    <div className="glass rounded-2xl p-8">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full border-2 border-rose-500/30 flex items-center justify-center">
            <Heart className="w-8 h-8 text-rose-400 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-rose-400 border-t-transparent animate-spin" />
        </div>
        <h3 className="text-white font-semibold text-lg">Writing Your Persuasion Copy</h3>
        <p className="text-gray-400 text-sm mt-1">~35 seconds</p>
      </div>
      <div className="max-w-md mx-auto space-y-2">
        {STEPS.map((s, i) => (
          <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: i <= step ? 1 : 0.25 }} transition={{ delay: i * 0.07 }}
            className={`flex items-center gap-3 text-sm py-1 ${ i < step ? 'text-gray-600' : i === step ? 'text-rose-300 font-medium' : 'text-gray-700' }`}>
            {i < step
              ? <div className="w-4 h-4 rounded-full bg-green-500/40 flex items-center justify-center flex-shrink-0"><span className="text-[8px] text-green-300">✓</span></div>
              : i === step
              ? <Loader2 className="w-4 h-4 animate-spin flex-shrink-0 text-rose-400" />
              : <div className="w-4 h-4 rounded-full bg-white/10 flex-shrink-0" />}
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (status === 'error') return (
    <div className="glass rounded-2xl p-8 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
      <h3 className="text-white font-semibold mb-2">Generation Failed</h3>
      <p className="text-gray-400 text-sm mb-4">{error}</p>
      <button onClick={generate} className="btn-primary inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Try Again</button>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-rose-400" /><span className="text-white font-semibold">Persuasion Copy Complete</span></div>
        <button onClick={generate} className="btn-secondary flex items-center gap-2 text-sm"><RefreshCw className="w-4 h-4" /> Regenerate</button>
      </div>
      {data && <PersuasionReport data={data} />}
    </div>
  );
}
