'use client';
import type { UseFormReturn } from 'react-hook-form';

const INDUSTRIES = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'legal', label: 'Legal' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'home_services', label: 'Home Services' },
  { value: 'restaurant', label: 'Restaurant / Food' },
  { value: 'retail', label: 'Retail' },
  { value: 'fitness', label: 'Fitness & Wellness' },
  { value: 'beauty', label: 'Beauty & Spa' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'education', label: 'Education' },
  { value: 'technology', label: 'Technology' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'nonprofit', label: 'Nonprofit' },
  { value: 'other', label: 'Other' },
];

const BUSINESS_TYPES = [
  { value: 'local', label: 'Local Business' },
  { value: 'regional', label: 'Regional Business' },
  { value: 'national', label: 'National Business' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'saas', label: 'SaaS / Software' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepBasicInfo({ form }: { form: UseFormReturn<any> }) {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="section-title">Business Information</h2>
      <p className="section-subtitle">Tell us about your business so we can craft a perfectly tailored growth strategy.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="label">Business Name *</label>
          <input {...register('businessName')} placeholder="e.g. Bella Aesthetics & Spa" className="input" />
          {errors.businessName && <p className="text-red-400 text-xs mt-1">{String(errors.businessName.message)}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="label">Tagline / Slogan</label>
          <input {...register('tagline')} placeholder="e.g. Where beauty meets confidence" className="input" />
        </div>

        <div>
          <label className="label">Industry *</label>
          <select {...register('industry')} className="input">
            <option value="">Select industry...</option>
            {INDUSTRIES.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
          {errors.industry && <p className="text-red-400 text-xs mt-1">{String(errors.industry.message)}</p>}
        </div>

        <div>
          <label className="label">Sub-Industry / Specialty</label>
          <input {...register('subIndustry')} placeholder="e.g. Medical Aesthetics" className="input" />
        </div>

        <div>
          <label className="label">Business Type *</label>
          <select {...register('businessType')} className="input">
            <option value="">Select type...</option>
            {BUSINESS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          {errors.businessType && <p className="text-red-400 text-xs mt-1">{String(errors.businessType.message)}</p>}
        </div>

        <div>
          <label className="label">Years in Business</label>
          <input {...register('yearsInBusiness')} placeholder="e.g. 5" className="input" />
        </div>

        <div>
          <label className="label">Team Size</label>
          <input {...register('teamSize')} placeholder="e.g. 12" className="input" />
        </div>
      </div>
    </div>
  );
}
