'use client';
import type { UseFormReturn } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepLocation({ form }: { form: UseFormReturn<any> }) {
  const { register, watch, setValue, formState: { errors } } = form;
  const isMulti = watch('isMultiLocation');

  return (
    <div>
      <h2 className="section-title">Location & Service Area</h2>
      <p className="section-subtitle">Precise location data powers your local SEO and GEO strategy.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div>
          <label className="label">Service Radius</label>
          <input {...register('serviceRadius')} placeholder="e.g. 30 miles, entire state" className="input" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setValue('isMultiLocation', !isMulti)}
              className={`w-12 h-6 rounded-full transition-all relative ${ isMulti ? 'bg-sky-500' : 'bg-white/10' }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${ isMulti ? 'translate-x-6' : 'translate-x-0' }`} />
            </button>
            <span className="label mb-0">Multiple Locations</span>
          </label>
          <p className="text-gray-500 text-xs mt-1">Enable if you operate from more than one location.</p>
        </div>

        <div className="sm:col-span-2">
          <label className="label">Website URL (if existing)</label>
          <input {...register('websiteUrl')} placeholder="https://yourbusiness.com" className="input" />
        </div>

        <div>
          <label className="label">Phone</label>
          <input {...register('phone')} placeholder="(512) 555-0100" className="input" />
        </div>

        <div>
          <label className="label">Email</label>
          <input {...register('email')} placeholder="hello@yourbusiness.com" className="input" />
        </div>
      </div>
    </div>
  );
}
