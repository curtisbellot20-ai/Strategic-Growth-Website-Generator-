'use client';
import type { UseFormReturn } from 'react-hook-form';

const FIELD_CONFIG = [
  {
    name: 'audiencePainPoints',
    label: 'What are their biggest pain points? *',
    placeholder: 'e.g. They feel self-conscious about aging skin, don\'t have time for lengthy treatments, and have been burned by products that don\'t deliver results.',
    hint: 'Problems, frustrations, and obstacles your customer faces daily.',
    color: 'border-l-red-500/50',
    required: true,
  },
  {
    name: 'audienceDesires',
    label: 'What do they deeply desire?',
    placeholder: 'e.g. To feel confident and radiant without surgery. To be the most put-together person in the room. To turn back the clock naturally.',
    hint: 'Their aspirations, dreams, and the outcomes they\'re really buying.',
    color: 'border-l-green-500/50',
    required: false,
  },
  {
    name: 'audienceFears',
    label: 'What are their biggest fears?',
    placeholder: 'e.g. Fear of looking unnatural or "done." Fear of wasting money on treatments that don\'t work. Fear of choosing the wrong provider.',
    hint: 'Deep-seated fears that create hesitation or inaction.',
    color: 'border-l-orange-500/50',
    required: false,
  },
  {
    name: 'audienceObjections',
    label: 'What objections stop them from buying?',
    placeholder: 'e.g. "It\'s too expensive." "I don\'t know if it will work for me." "I need to think about it." "I\'m nervous about side effects."',
    hint: 'Reasons they hesitate, delay, or say no. We\'ll build responses for each one.',
    color: 'border-l-yellow-500/50',
    required: false,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepCustomer({ form }: { form: UseFormReturn<any> }) {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <h2 className="section-title">Customer Profile</h2>
      <p className="section-subtitle">
        Deep customer intelligence powers every message, design choice, and growth strategy we build.
        The more specific, the more powerful your blueprint.
      </p>

      <div className="space-y-5">
        {/* Primary Audience */}
        <div>
          <label className="label">Who is your ideal customer? *</label>
          <textarea
            {...register('targetAudience')}
            rows={2}
            placeholder="e.g. Busy professional women aged 35-55 in Austin who want to look and feel their best without invasive surgery"
            className="input resize-none"
          />
          {errors.targetAudience && <p className="text-red-400 text-xs mt-1">{String(errors.targetAudience.message)}</p>}
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Age Range</label>
            <input
              {...register('audienceAge')}
              placeholder="e.g. 35–55"
              className="input"
            />
          </div>
          <div>
            <label className="label">Household Income Level</label>
            <input
              {...register('audienceIncome')}
              placeholder="e.g. $80k–$200k/year"
              className="input"
            />
          </div>
        </div>

        {/* Deep Psychology Fields */}
        <div className="space-y-4">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Customer Psychology</p>
          {FIELD_CONFIG.map((field) => (
            <div
              key={field.name}
              className={`pl-4 border-l-2 ${field.color}`}
            >
              <label className="label">{field.label}</label>
              <textarea
                {...register(field.name)}
                rows={3}
                placeholder={field.placeholder}
                className="input resize-none"
              />
              <p className="text-xs text-gray-600 mt-1 italic">{field.hint}</p>
              {field.required && errors[field.name] && (
                <p className="text-red-400 text-xs mt-1">{String(errors[field.name]?.message)}</p>
              )}
            </div>
          ))}
        </div>

        {/* Context Banner */}
        <div className="glass rounded-xl p-4 border border-purple-500/20 bg-purple-500/5">
          <p className="text-purple-300 text-sm font-medium mb-1">🧠 How we use this</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Your customer psychology data feeds our Persuasion Engine, Storytelling Framework,
            Objection Handler system, and CTA strategy. Every headline, benefit statement, and
            call-to-action will be crafted around these exact insights.
          </p>
        </div>
      </div>
    </div>
  );
}
