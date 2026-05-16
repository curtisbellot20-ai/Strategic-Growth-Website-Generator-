'use client';
import type { UseFormReturn } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepAudience({ form }: { form: UseFormReturn<any> }) {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="section-title">Target Audience</h2>
      <p className="section-subtitle">Deep audience insight drives every message, design choice, and growth strategy we build.</p>

      <div className="space-y-4">
        <div>
          <label className="label">Who is your ideal customer? *</label>
          <textarea
            {...register('targetAudience')}
            rows={2}
            placeholder="e.g. Busy professional women aged 30-50 who want to look and feel their best"
            className="input resize-none"
          />
          {errors.targetAudience && <p className="text-red-400 text-xs mt-1">{String(errors.targetAudience.message)}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Age Range</label>
            <input {...register('audienceAge')} placeholder="e.g. 30-55" className="input" />
          </div>
          <div>
            <label className="label">Income Level</label>
            <input {...register('audienceIncome')} placeholder="e.g. $75k-$150k/year" className="input" />
          </div>
        </div>

        <div>
          <label className="label">What are their biggest pain points? *</label>
          <textarea
            {...register('audiencePainPoints')}
            rows={3}
            placeholder="e.g. They feel self-conscious about aging skin, don't have time for lengthy treatments, and have been burned by products that don't deliver"
            className="input resize-none"
          />
          {errors.audiencePainPoints && <p className="text-red-400 text-xs mt-1">{String(errors.audiencePainPoints.message)}</p>}
        </div>

        <div>
          <label className="label">What do they deeply desire?</label>
          <textarea
            {...register('audienceDesires')}
            rows={2}
            placeholder="e.g. To feel confident and radiant without surgery, and to be the most put-together person in the room"
            className="input resize-none"
          />
        </div>
      </div>
    </div>
  );
}
