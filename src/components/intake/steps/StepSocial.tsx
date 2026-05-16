'use client';
import { useFieldArray } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { Plus, Trash2, Star, Link2 } from 'lucide-react';

const SOCIAL_PLATFORMS = [
  { name: 'instagram', label: 'Instagram',  icon: '📸', placeholder: 'https://instagram.com/yourbusiness' },
  { name: 'facebook',  label: 'Facebook',   icon: '👤', placeholder: 'https://facebook.com/yourbusiness' },
  { name: 'linkedin',  label: 'LinkedIn',   icon: '💼', placeholder: 'https://linkedin.com/company/yourbusiness' },
  { name: 'tiktok',    label: 'TikTok',     icon: '🎵', placeholder: 'https://tiktok.com/@yourbusiness' },
  { name: 'youtube',   label: 'YouTube',    icon: '📧', placeholder: 'https://youtube.com/@yourbusiness' },
  { name: 'twitter',   label: 'X / Twitter',icon: '🐦', placeholder: 'https://x.com/yourbusiness' },
] as const;

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-lg transition-colors ${ n <= value ? 'text-yellow-400' : 'text-gray-700 hover:text-gray-500' }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StepSocial({ form }: { form: UseFormReturn<any> }) {
  const { register, control, watch, setValue } = form;

  const { fields: tFields, append: addTestimonial, remove: removeTestimonial } = useFieldArray({
    control, name: 'testimonials',
  });
  const { fields: rFields, append: addReview, remove: removeReview } = useFieldArray({
    control, name: 'reviews',
  });

  return (
    <div>
      <h2 className="section-title">Social Presence & Social Proof</h2>
      <p className="section-subtitle">
        Your social presence and existing reviews power the Trust & Authority system in your blueprint.
      </p>

      <div className="space-y-8">
        {/* Social Links */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Social Media Profiles</p>
          <div className="space-y-3">
            {SOCIAL_PLATFORMS.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center flex-shrink-0">{p.icon}</span>
                <div className="flex-1">
                  <input
                    {...register(`socialLinks.${p.name}`)}
                    placeholder={p.placeholder}
                    className="input text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Business Profile */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Google Business Profile</p>
          <div className="flex items-center gap-3">
            <span className="text-xl w-8 text-center flex-shrink-0">🗺️</span>
            <input
              {...register('googleBusinessProfile')}
              placeholder="https://g.page/yourbusiness or paste your GBP URL"
              className="input flex-1 text-sm"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2 ml-11">
            Your Google Business Profile powers local SEO, map rankings, and your GEO strategy.
          </p>
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Client Testimonials</p>
              <p className="text-xs text-gray-600 mt-0.5">These become social proof sections and testimonial copy on your site.</p>
            </div>
            <button
              type="button"
              onClick={() => addTestimonial({ name: '', role: '', text: '' })}
              className="btn-secondary flex items-center gap-1.5 text-xs px-3 py-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-4">
            {tFields.length === 0 && (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
                <Star className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Add your best client testimonials</p>
                <p className="text-xs text-gray-600 mt-1">Even 2–3 testimonials dramatically improve conversion rates</p>
              </div>
            )}
            {tFields.map((field, i) => (
              <div key={field.id} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-sky-400 font-medium">Testimonial {i + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeTestimonial(i)}
                    className="text-gray-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label text-xs">Client Name</label>
                    <input
                      {...register(`testimonials.${i}.name`)}
                      placeholder="e.g. Sarah M."
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Title / Role</label>
                    <input
                      {...register(`testimonials.${i}.role`)}
                      placeholder="e.g. Marketing Director"
                      className="input text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="label text-xs">Testimonial Text</label>
                  <textarea
                    {...register(`testimonials.${i}.text`)}
                    rows={3}
                    placeholder="e.g. I came in nervous and left feeling like a completely new person. The results were natural and exactly what I wanted…"
                    className="input resize-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Online Reviews</p>
              <p className="text-xs text-gray-600 mt-0.5">Google, Yelp, Healthgrades, etc. We’ll feature these strategically.</p>
            </div>
            <button
              type="button"
              onClick={() => addReview({ source: '', rating: 5, text: '' })}
              className="btn-secondary flex items-center gap-1.5 text-xs px-3 py-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-4">
            {rFields.length === 0 && (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
                <Link2 className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Add your top online reviews</p>
                <p className="text-xs text-gray-600 mt-1">Google Reviews, Yelp, industry-specific platforms</p>
              </div>
            )}
            {rFields.map((field, i) => (
              <div key={field.id} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-sky-400 font-medium">Review {i + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeReview(i)}
                    className="text-gray-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="label text-xs">Review Source</label>
                    <input
                      {...register(`reviews.${i}.source`)}
                      placeholder="e.g. Google Reviews"
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Rating</label>
                    <StarPicker
                      value={watch(`reviews.${i}.rating`) || 5}
                      onChange={(n) => setValue(`reviews.${i}.rating`, n)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label text-xs">Review Text (optional)</label>
                  <textarea
                    {...register(`reviews.${i}.text`)}
                    rows={2}
                    placeholder="Paste the review text here for our AI to reference…"
                    className="input resize-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
