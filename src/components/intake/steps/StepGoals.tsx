'use client';
import type { UseFormReturn } from 'react-hook-form';

const PRIMARY_GOALS = [
  { value: 'leads', label: 'Generate Leads', icon: '🎯' },
  { value: 'sales', label: 'Drive Sales', icon: '💰' },
  { value: 'bookings', label: 'Get Bookings', icon: '📅' },
  { value: 'awareness', label: 'Build Awareness', icon: '📣' },
  { value: 'retention', label: 'Retain Customers', icon: '🔄' },
  { value: 'referrals', label: 'Grow Referrals', icon: '🤝' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepGoals({ form }: { form: UseFormReturn<any> }) {
  const { register, watch, formState: { errors } } = form;

  return (
    <div>
      <h2 className="section-title">Growth Goals</h2>
      <p className="section-subtitle">Your goals determine every strategic recommendation — from page structure to CTA language.</p>

      <div className="space-y-6">
        <div>
          <label className="label">Primary Business Goal *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRIMARY_GOALS.map((g) => (
              <label key={g.value} className="cursor-pointer">
                <input {...register('primaryGoal')} type="radio" value={g.value} className="sr-only" />
                <div className={`card p-4 text-center transition-all ${
                  watch('primaryGoal') === g.value ? 'border-sky-500 bg-sky-500/10 text-sky-300' : 'text-gray-400 hover:border-gray-600'
                }`}>
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <div className="text-sm font-medium">{g.label}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.primaryGoal && <p className="text-red-400 text-xs mt-1">{String(errors.primaryGoal.message)}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Monthly Lead / Customer Goal</label>
            <input {...register('monthlyLeadGoal')} placeholder="e.g. 50 new patients/month" className="input" />
          </div>
          <div>
            <label className="label">Revenue Goal</label>
            <input {...register('revenueGoal')} placeholder="e.g. $500k ARR in 12 months" className="input" />
          </div>
        </div>

        <div>
          <label className="label">Social Media Handles</label>
          <input {...register('socialMedia')} placeholder="@yourbusiness on IG, FB, TikTok" className="input" />
        </div>

        <div className="glass rounded-xl p-4 border border-sky-500/20 bg-sky-500/5">
          <p className="text-sky-300 text-sm font-medium mb-1">Ready to generate your blueprint?</p>
          <p className="text-gray-400 text-xs">
            Our AI will analyze your business across 16 strategic dimensions and produce a full website blueprint,
            SEO/GEO/AEO strategy, persuasion framework, growth engines, and scoring report.
          </p>
        </div>
      </div>
    </div>
  );
}
