'use client';
import type { UseFormReturn } from 'react-hook-form';

const INDUSTRIES = [
  { value: 'healthcare',    label: 'Healthcare & Medical' },
  { value: 'legal',         label: 'Legal Services' },
  { value: 'real_estate',   label: 'Real Estate' },
  { value: 'home_services', label: 'Home Services & Trades' },
  { value: 'restaurant',    label: 'Restaurant & Food & Beverage' },
  { value: 'retail',        label: 'Retail & E-Commerce' },
  { value: 'fitness',       label: 'Fitness & Wellness' },
  { value: 'beauty',        label: 'Beauty, Spa & Aesthetics' },
  { value: 'financial',     label: 'Financial Services' },
  { value: 'education',     label: 'Education & Coaching' },
  { value: 'technology',    label: 'Technology & Software' },
  { value: 'consulting',    label: 'Consulting & Professional Services' },
  { value: 'ecommerce',     label: 'E-Commerce & DTC' },
  { value: 'nonprofit',     label: 'Nonprofit & Community' },
  { value: 'other',         label: 'Other' },
];

const BUSINESS_TYPES = [
  { value: 'local',     label: 'Local Business',     desc: 'Serves a specific city or region' },
  { value: 'regional',  label: 'Regional Business',  desc: 'Serves multiple cities or states' },
  { value: 'national',  label: 'National Business',  desc: 'Serves the entire country' },
  { value: 'ecommerce', label: 'E-Commerce',         desc: 'Sells products online' },
  { value: 'saas',      label: 'SaaS / Software',    desc: 'Subscription or software product' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepBasicInfo({ form }: { form: UseFormReturn<any> }) {
  const { register, watch, setValue, formState: { errors } } = form;
  const isMulti = watch('isMultiLocation');

  return (
    <div>
      <h2 className="section-title">Business Information</h2>
      <p className="section-subtitle">The foundation of your entire growth strategy. Be as specific as possible.</p>

      <div className="space-y-6">
        {/* Identity */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Identity</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Business Name *</label>
              <input
                {...register('businessName')}
                placeholder="e.g. Bella Aesthetics & Spa"
                className="input"
              />
              {errors.businessName && <p className="text-red-400 text-xs mt-1">{String(errors.businessName.message)}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="label">Tagline / Slogan</label>
              <input
                {...register('tagline')}
                placeholder="e.g. Where beauty meets confidence"
                className="input"
              />
            </div>
            <div>
              <label className="label">Industry *</label>
              <select {...register('industry')} className="input">
                <option value="">Select industry…</option>
                {INDUSTRIES.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
              {errors.industry && <p className="text-red-400 text-xs mt-1">{String(errors.industry.message)}</p>}
            </div>
            <div>
              <label className="label">Sub-Industry / Specialty</label>
              <input
                {...register('subIndustry')}
                placeholder="e.g. Medical Aesthetics, Personal Injury"
                className="input"
              />
            </div>
            <div>
              <label className="label">Years in Business</label>
              <input {...register('yearsInBusiness')} placeholder="e.g. 7" className="input" />
            </div>
            <div>
              <label className="label">Team Size</label>
              <input {...register('teamSize')} placeholder="e.g. 12 employees" className="input" />
            </div>
          </div>
        </div>

        {/* Business Type */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Business Type *</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUSINESS_TYPES.map((t) => (
              <label key={t.value} className="cursor-pointer">
                <input {...register('businessType')} type="radio" value={t.value} className="sr-only" />
                <div className={`card p-3 transition-all hover:border-sky-500/50 ${
                  watch('businessType') === t.value ? 'border-sky-500 bg-sky-500/10' : ''
                }`}>
                  <p className={`text-sm font-semibold ${ watch('businessType') === t.value ? 'text-sky-300' : 'text-gray-300' }`}>
                    {t.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.businessType && <p className="text-red-400 text-xs mt-1">{String(errors.businessType.message)}</p>}
        </div>

        {/* Location */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Location</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">City *</label>
              <input {...register('city')} placeholder="e.g. Austin" className="input" />
              {errors.city && <p className="text-red-400 text-xs mt-1">{String(errors.city.message)}</p>}
            </div>
            <div>
              <label className="label">State / Province *</label>
              <input {...register('state')} placeholder="e.g. TX" className="input" />
              {errors.state && <p className="text-red-400 text-xs mt-1">{String(errors.state.message)}</p>}
            </div>
            <div>
              <label className="label">Country</label>
              <input {...register('country')} placeholder="USA" className="input" />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">Service Area / Radius</label>
            <input
              {...register('serviceRadius')}
              placeholder="e.g. 30-mile radius, entire state of Texas, nationwide"
              className="input"
            />
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <button
                type="button"
                onClick={() => setValue('isMultiLocation', !isMulti)}
                className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${ isMulti ? 'bg-sky-500' : 'bg-white/10' }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${ isMulti ? 'translate-x-6' : 'translate-x-0' }`} />
              </button>
              <span className="text-sm text-gray-300 font-medium">We operate from multiple locations</span>
            </label>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Contact & Web Presence</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Current Website URL</label>
              <input
                {...register('websiteUrl')}
                placeholder="https://yourbusiness.com"
                className="input"
              />
            </div>
            <div>
              <label className="label">Business Phone</label>
              <input {...register('phone')} placeholder="(512) 555-0100" className="input" />
            </div>
            <div>
              <label className="label">Business Email</label>
              <input {...register('email')} type="email" placeholder="hello@yourbusiness.com" className="input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
