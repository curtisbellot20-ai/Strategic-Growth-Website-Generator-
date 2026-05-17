'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, Zap, Building2,
  Users, Package, Palette, Share2, Target, Check,
} from 'lucide-react';
import type { BusinessIntake } from '@/types';
import StepBasicInfo from './steps/StepBasicInfo';
import StepCustomer  from './steps/StepCustomer';
import StepOffer     from './steps/StepOffer';
import StepBrand     from './steps/StepBrand';
import StepSocial    from './steps/StepSocial';
import StepGoals     from './steps/StepGoals';

// --- Zod schema ---
const testimonialSchema = z.object({
  name: z.string().default(''),
  role: z.string().default(''),
  text: z.string().default(''),
});

const reviewSchema = z.object({
  source: z.string().default(''),
  rating: z.number().default(5),
  text:   z.string().default(''),
});

const schema = z.object({
  // Step 1 — Business
  businessName:    z.string().min(2, 'Business name is required'),
  tagline:         z.string().default(''),
  industry:        z.string().min(1, 'Please select an industry'),
  subIndustry:     z.string().default(''),
  businessType:    z.string().min(1, 'Please select a business type'),
  yearsInBusiness: z.string().default(''),
  teamSize:        z.string().default(''),
  city:            z.string().min(2, 'City is required'),
  state:           z.string().min(1, 'State / Province is required'),
  country:         z.string().default('USA'),
  serviceRadius:   z.string().default(''),
  isMultiLocation: z.boolean().default(false),
  websiteUrl:      z.string().default(''),
  phone:           z.string().default(''),
  email:           z.string().default(''),

  // Step 2 — Customer
  targetAudience:      z.string().min(5, 'Describe your ideal customer'),
  audienceAge:         z.string().default(''),
  audienceIncome:      z.string().default(''),
  audiencePainPoints:  z.string().min(10, 'Describe their pain points'),
  audienceDesires:     z.string().default(''),
  audienceFears:       z.string().default(''),
  audienceObjections:  z.string().default(''),

  // Step 3 — Offer
  primaryService:    z.string().min(3, 'Primary service is required'),
  secondaryServices: z.string().default(''),
  services:          z.array(z.string()).default([]),
  locationsServed:   z.array(z.string()).default([]),
  uniqueValueProp:   z.string().min(10, 'Describe your unique value proposition'),
  pricePoint:        z.string().min(1, 'Please select a price point'),
  resultsOrOutcomes: z.string().default(''),

  // Step 4 — Brand
  desiredAtmosphere:    z.string().default(''),
  desiredBrandStyle:    z.string().default(''),
  desiredEmotionalTone: z.string().default(''),
  luxuryLevel:          z.number().min(1).max(5).default(3),
  brandColors:          z.array(z.string()).default(['#0ea5e9','#6366f1','#f59e0b','#9ca3af']),
  brandPersonality:     z.array(z.string()).default([]),
  brandVoice:           z.string().default(''),
  currentColors:        z.string().default(''),
  logoDescription:      z.string().default(''),
  imagesDescription:    z.string().default(''),

  // Step 5 — Social
  socialLinks: z.object({
    instagram: z.string().default(''),
    facebook:  z.string().default(''),
    linkedin:  z.string().default(''),
    tiktok:    z.string().default(''),
    youtube:   z.string().default(''),
    twitter:   z.string().default(''),
  }).default({ instagram:'', facebook:'', linkedin:'', tiktok:'', youtube:'', twitter:'' }),
  googleBusinessProfile: z.string().default(''),
  testimonials: z.array(testimonialSchema).default([]),
  reviews:      z.array(reviewSchema).default([]),

  // Step 6 — Goals
  competitors:     z.array(z.string()).default([]),
  ctaPreference:   z.string().default(''),
  primaryGoal:     z.string().min(1, 'Please select a primary goal'),
  monthlyLeadGoal: z.string().default(''),
  revenueGoal:     z.string().default(''),
  additionalNotes: z.string().default(''),
});

export type FormData = z.infer<typeof schema>;

// Fields to validate per step (only required ones)
const STEP_VALIDATE: Record<number, (keyof FormData)[]> = {
  0: ['businessName', 'industry', 'businessType', 'city', 'state'],
  1: ['targetAudience', 'audiencePainPoints'],
  2: ['primaryService', 'uniqueValueProp', 'pricePoint'],
  3: [],
  4: [],
  5: ['primaryGoal'],
};

const STEPS = [
  { id: 'basic',    label: 'Business', Icon: Building2 },
  { id: 'customer', label: 'Customer', Icon: Users },
  { id: 'offer',    label: 'Offer',    Icon: Package },
  { id: 'brand',    label: 'Brand',    Icon: Palette },
  { id: 'social',   label: 'Social',   Icon: Share2 },
  { id: 'goals',    label: 'Goals',    Icon: Target },
] as const;

const STEP_COMPONENTS = [
  StepBasicInfo,
  StepCustomer,
  StepOffer,
  StepBrand,
  StepSocial,
  StepGoals,
];

interface Props {
  onSubmit: (data: BusinessIntake) => void;
  isGenerating: boolean;
  initialData?: Record<string, unknown>;
}

export default function IntakeForm({ onSubmit, isGenerating, initialData }: Props) {
  const [step, setStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      brandPersonality: [],
      isMultiLocation:  false,
      country:          'USA',
      services:         [],
      locationsServed:  [],
      competitors:      [],
      brandColors:      ['#0ea5e9','#6366f1','#f59e0b','#9ca3af'],
      luxuryLevel:      3,
      socialLinks:      { instagram:'', facebook:'', linkedin:'', tiktok:'', youtube:'', twitter:'' },
      testimonials:     [],
      reviews:          [],
      ...(initialData ?? {}),
    },
    mode: 'onChange',
  });

  const handleNext = async () => {
    const fields = STEP_VALIDATE[step];
    const valid  = !fields.length || await form.trigger(fields);
    if (valid && step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data as unknown as BusinessIntake);
  });

  const CurrentStep = STEP_COMPONENTS[step];
  const isLastStep  = step === STEPS.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => {
          const Icon      = s.Icon;
          const isDone    = i < step;
          const isCurrent = i === step;
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                onClick={() => isDone && setStep(i)}
                className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isDone    ? 'bg-green-500 cursor-pointer' :
                  isCurrent ? 'gradient-brand shadow-lg shadow-blue-900/40' :
                              'bg-white/5'
                }`}
              >
                {isDone
                  ? <Check className="w-4 h-4 text-white" />
                  : <Icon className={`w-4 h-4 ${ isCurrent ? 'text-white' : 'text-gray-600' }`} />}
                <span className={`absolute -bottom-5 text-[10px] whitespace-nowrap font-medium ${
                  isCurrent ? 'text-sky-400' : isDone ? 'text-green-400' : 'text-gray-600'
                }`}>
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 transition-colors ${ i < step ? 'bg-green-500' : 'bg-white/10' }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
        >
          <div className="card mb-6">
            <CurrentStep form={form} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2 px-8 py-4 text-base"
          >
            <Zap className="w-5 h-5" />
            {isGenerating ? 'Generating…' : 'Generate My Blueprint'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
