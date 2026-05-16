'use client';
import type { UseFormReturn } from 'react-hook-form';

const PRICE_POINTS = [
  { value: 'budget', label: 'Budget / Affordable' },
  { value: 'mid_market', label: 'Mid-Market' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury / Ultra-Premium' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepOffer({ form }: { form: UseFormReturn<any> }) {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="section-title">Your Offer</h2>
      <p className="section-subtitle">We&apos;ll build irresistible positioning and messaging around your unique value.</p>

      <div className="space-y-4">
        <div>
          <label className="label">Primary Service / Product *</label>
          <input {...register('primaryService')} placeholder="e.g. Botox & Filler Treatments" className="input" />
          {errors.primaryService && <p className="text-red-400 text-xs mt-1">{String(errors.primaryService.message)}</p>}
        </div>

        <div>
          <label className="label">Secondary Services / Products</label>
          <textarea
            {...register('secondaryServices')}
            rows={2}
            placeholder="e.g. Laser skin resurfacing, chemical peels, skincare retail products"
            className="input resize-none"
          />
        </div>

        <div>
          <label className="label">Unique Value Proposition *</label>
          <textarea
            {...register('uniqueValueProp')}
            rows={3}
            placeholder="e.g. The only med spa in Austin with a board-certified plastic surgeon on-site for every treatment, guaranteeing safety and natural-looking results"
            className="input resize-none"
          />
          {errors.uniqueValueProp && <p className="text-red-400 text-xs mt-1">{String(errors.uniqueValueProp.message)}</p>}
        </div>

        <div>
          <label className="label">Price Point *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRICE_POINTS.map((p) => (
              <label key={p.value} className="cursor-pointer">
                <input {...register('pricePoint')} type="radio" value={p.value} className="sr-only" />
                <div className={`card p-3 text-center text-sm transition-all hover:border-sky-500/50 ${
                  form.watch('pricePoint') === p.value ? 'border-sky-500 bg-sky-500/10 text-sky-300' : 'text-gray-400'
                }`}>
                  {p.label}
                </div>
              </label>
            ))}
          </div>
          {errors.pricePoint && <p className="text-red-400 text-xs mt-1">{String(errors.pricePoint.message)}</p>}
        </div>

        <div>
          <label className="label">Results / Outcomes You Deliver</label>
          <textarea
            {...register('resultsOrOutcomes')}
            rows={2}
            placeholder="e.g. Clients see visible improvement in 1 visit, 97% satisfaction rate, zero downtime treatments"
            className="input resize-none"
          />
        </div>
      </div>
    </div>
  );
}
