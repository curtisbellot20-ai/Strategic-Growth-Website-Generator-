'use client';
import type { UseFormReturn } from 'react-hook-form';
import TagInput from '@/components/ui/TagInput';

const CTA_OPTIONS = [
  { value: 'call_now',           label: 'Call Now',               emoji: '📞', desc: 'Phone-first conversion' },
  { value: 'book_online',        label: 'Book Online',             emoji: '📅', desc: 'Self-serve scheduling' },
  { value: 'get_free_quote',     label: 'Get a Free Quote',        emoji: '💸', desc: 'Low-friction lead gen' },
  { value: 'free_consultation',  label: 'Free Consultation',       emoji: '🤝', desc: 'High-trust entry point' },
  { value: 'shop_now',           label: 'Shop Now',                emoji: '🛒', desc: 'Direct purchase flow' },
  { value: 'learn_more',         label: 'Learn More',              emoji: '📚', desc: 'Education-first approach' },
  { value: 'schedule_visit',     label: 'Schedule a Visit',        emoji: '🏢', desc: 'In-person conversion' },
  { value: 'get_started',        label: 'Get Started',             emoji: '⚡', desc: 'Action-oriented entry' },
];

const PRIMARY_GOALS = [
  { value: 'leads',     label: 'Generate Leads',     icon: '🎯' },
  { value: 'sales',     label: 'Drive Sales',         icon: '💰' },
  { value: 'bookings',  label: 'Get Bookings',        icon: '📅' },
  { value: 'awareness', label: 'Build Awareness',     icon: '📣' },
  { value: 'retention', label: 'Retain Customers',    icon: '🔄' },
  { value: 'referrals', label: 'Grow Referrals',      icon: '🤝' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepGoals({ form }: { form: UseFormReturn<any> }) {
  const { register, watch, setValue, formState: { errors } } = form;

  return (
    <div>
      <h2 className="section-title">Goals & Competitive Strategy</h2>
      <p className="section-subtitle">
        Your goals and competitive landscape determine every strategic recommendation —
        from site structure to CTA language to SEO priorities.
      </p>

      <div className="space-y-8">
        {/* Primary Goal */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Primary Website Goal *</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRIMARY_GOALS.map((g) => (
              <label key={g.value} className="cursor-pointer">
                <input {...register('primaryGoal')} type="radio" value={g.value} className="sr-only" />
                <div className={`card p-4 text-center transition-all hover:border-sky-500/40 ${
                  watch('primaryGoal') === g.value ? 'border-sky-500 bg-sky-500/10' : ''
                }`}>
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <p className={`text-sm font-semibold ${ watch('primaryGoal') === g.value ? 'text-sky-300' : 'text-gray-300' }`}>
                    {g.label}
                  </p>
                </div>
              </label>
            ))}
          </div>
          {errors.primaryGoal && <p className="text-red-400 text-xs mt-2">{String(errors.primaryGoal.message)}</p>}
        </div>

        {/* CTA Preference */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Preferred Call-to-Action Style</p>
          <p className="text-xs text-gray-600 mb-3">This becomes the primary CTA across your entire website.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CTA_OPTIONS.map((c) => (
              <label key={c.value} className="cursor-pointer">
                <input {...register('ctaPreference')} type="radio" value={c.value} className="sr-only" />
                <div className={`card p-3 text-center transition-all hover:border-sky-500/40 ${
                  watch('ctaPreference') === c.value ? 'border-sky-500 bg-sky-500/10' : ''
                }`}>
                  <div className="text-xl mb-1">{c.emoji}</div>
                  <p className={`text-xs font-semibold ${ watch('ctaPreference') === c.value ? 'text-sky-300' : 'text-gray-300' }`}>
                    {c.label}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{c.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Competitors */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Competitors</p>
          <p className="text-xs text-gray-600 mb-2">
            Type each competitor name and press Enter. We’ll analyze their patterns and help you out-position them.
          </p>
          <TagInput
            value={watch('competitors') || []}
            onChange={(v) => setValue('competitors', v)}
            placeholder="e.g. SkinMD… press Enter to add"
          />
        </div>

        {/* Growth Metrics */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Growth Targets</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Monthly Lead / Customer Goal</label>
              <input
                {...register('monthlyLeadGoal')}
                placeholder="e.g. 50 new patients/month"
                className="input"
              />
            </div>
            <div>
              <label className="label">Revenue Goal</label>
              <input
                {...register('revenueGoal')}
                placeholder="e.g. $1M ARR by end of year"
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="label">Additional Notes for the AI</label>
          <textarea
            {...register('additionalNotes')}
            rows={3}
            placeholder="Any extra context, special requirements, upcoming launches, specific pages you need, things you want to avoid, or anything else that matters for your blueprint…"
            className="input resize-none"
          />
        </div>

        {/* Ready Banner */}
        <div className="glass rounded-xl p-5 border border-sky-500/20 bg-sky-500/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <p className="text-sky-300 font-semibold mb-1">Ready to generate your blueprint</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our AI analyzes your business across 16 strategic dimensions and produces a full website
                blueprint, SEO/GEO/AEO plan, persuasion framework, page-by-page structure,
                growth engines, color system, and a scored action plan.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Website Blueprint','SEO Strategy','Page Blueprints','Conversion Engine',
                  'Growth Plan','Scoring Report'].map((tag) => (
                  <span key={tag} className="badge-blue text-xs">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
