'use client';
import type { UseFormReturn } from 'react-hook-form';
import TagInput from '@/components/ui/TagInput';

const PRICE_POINTS = [
  { value: 'budget',     label: 'Budget',      emoji: '💵', desc: 'Affordable for most' },
  { value: 'mid_market', label: 'Mid-Market',  emoji: '⚖️',  desc: 'Quality & value' },
  { value: 'premium',    label: 'Premium',     emoji: '💸', desc: 'High-end quality' },
  { value: 'luxury',     label: 'Luxury',      emoji: '💎', desc: 'Elite & exclusive' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepOffer({ form }: { form: UseFormReturn<any> }) {
  const { register, watch, setValue, formState: { errors } } = form;

  return (
    <div>
      <h2 className="section-title">Your Offer</h2>
      <p className="section-subtitle">
        We’ll build irresistible positioning and messaging around your unique value.
        The clearer your offer, the stronger the blueprint.
      </p>

      <div className="space-y-6">
        {/* Primary & Secondary Services */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Core Offer</p>
          <div className="space-y-4">
            <div>
              <label className="label">Primary Service / Product *</label>
              <input
                {...register('primaryService')}
                placeholder="e.g. Botox & Dermal Filler Treatments"
                className="input"
              />
              {errors.primaryService && <p className="text-red-400 text-xs mt-1">{String(errors.primaryService.message)}</p>}
            </div>
            <div>
              <label className="label">Secondary Services / Products</label>
              <textarea
                {...register('secondaryServices')}
                rows={2}
                placeholder="e.g. Laser resurfacing, chemical peels, IV therapy, skincare retail"
                className="input resize-none"
              />
            </div>
          </div>
        </div>

        {/* All Services Tag Input */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Service List</p>
          <div>
            <label className="label">All services you offer</label>
            <p className="text-xs text-gray-600 mb-2">Type a service name and press Enter to add. These become your site’s service pages.</p>
            <TagInput
              value={watch('services') || []}
              onChange={(v) => setValue('services', v)}
              placeholder="e.g. Botox… press Enter to add"
            />
          </div>
        </div>

        {/* Locations Served */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Locations Served</p>
          <div>
            <label className="label">Cities / Areas you serve</label>
            <p className="text-xs text-gray-600 mb-2">Each location can become a dedicated SEO landing page.</p>
            <TagInput
              value={watch('locationsServed') || []}
              onChange={(v) => setValue('locationsServed', v)}
              placeholder="e.g. Austin… press Enter to add"
            />
          </div>
        </div>

        {/* UVP */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Unique Value Proposition</p>
          <div>
            <label className="label">What makes you the only choice? *</label>
            <textarea
              {...register('uniqueValueProp')}
              rows={3}
              placeholder="e.g. The only med spa in Austin with a board-certified plastic surgeon on-site for every treatment — guaranteeing safety and natural-looking results that last."
              className="input resize-none"
            />
            {errors.uniqueValueProp && <p className="text-red-400 text-xs mt-1">{String(errors.uniqueValueProp.message)}</p>}
          </div>
          <div className="mt-4">
            <label className="label">Results & Outcomes You Deliver</label>
            <textarea
              {...register('resultsOrOutcomes')}
              rows={2}
              placeholder="e.g. Visible improvement in 1 visit, 97% satisfaction rate, zero-downtime treatments, results that last 6-18 months"
              className="input resize-none"
            />
          </div>
        </div>

        {/* Price Point */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Price Point *</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRICE_POINTS.map((p) => (
              <label key={p.value} className="cursor-pointer">
                <input {...register('pricePoint')} type="radio" value={p.value} className="sr-only" />
                <div className={`card p-4 text-center transition-all hover:border-sky-500/40 ${
                  watch('pricePoint') === p.value ? 'border-sky-500 bg-sky-500/10' : ''
                }`}>
                  <div className="text-2xl mb-1">{p.emoji}</div>
                  <p className={`text-sm font-semibold ${ watch('pricePoint') === p.value ? 'text-sky-300' : 'text-gray-300' }`}>
                    {p.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.pricePoint && <p className="text-red-400 text-xs mt-1">{String(errors.pricePoint.message)}</p>}
        </div>
      </div>
    </div>
  );
}
