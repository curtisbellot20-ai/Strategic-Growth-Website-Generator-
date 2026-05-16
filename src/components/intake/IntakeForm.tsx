'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import type { BusinessIntake } from '@/types';
import StepBasicInfo from './steps/StepBasicInfo';
import StepLocation from './steps/StepLocation';
import StepAudience from './steps/StepAudience';
import StepOffer from './steps/StepOffer';
import StepBrand from './steps/StepBrand';
import StepGoals from './steps/StepGoals';

const schema = z.object({
  businessName: z.string().min(2, 'Required'),
  tagline: z.string().optional().default(''),
  industry: z.string().min(1, 'Required'),
  subIndustry: z.string().optional().default(''),
  businessType: z.string().min(1, 'Required'),
  yearsInBusiness: z.string().optional().default(''),
  teamSize: z.string().optional().default(''),
  city: z.string().min(2, 'Required'),
  state: z.string().min(1, 'Required'),
  country: z.string().optional().default('USA'),
  serviceRadius: z.string().optional().default(''),
  isMultiLocation: z.boolean().default(false),
  targetAudience: z.string().min(5, 'Required'),
  audienceAge: z.string().optional().default(''),
  audienceIncome: z.string().optional().default(''),
  audiencePainPoints: z.string().min(10, 'Required'),
  audienceDesires: z.string().optional().default(''),
  primaryService: z.string().min(3, 'Required'),
  secondaryServices: z.string().optional().default(''),
  uniqueValueProp: z.string().min(10, 'Required'),
  pricePoint: z.string().min(1, 'Required'),
  resultsOrOutcomes: z.string().optional().default(''),
  brandPersonality: z.array(z.string()).min(1, 'Select at least one'),
  currentColors: z.string().optional().default(''),
  competitors: z.string().optional().default(''),
  brandVoice: z.string().min(1, 'Required'),
  primaryGoal: z.string().min(1, 'Required'),
  monthlyLeadGoal: z.string().optional().default(''),
  revenueGoal: z.string().optional().default(''),
  websiteUrl: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  email: z.string().email('Invalid email').optional().or(z.literal('')).default(''),
  socialMedia: z.string().optional().default(''),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { id: 'basic', label: 'Business', component: StepBasicInfo },
  { id: 'location', label: 'Location', component: StepLocation },
  { id: 'audience', label: 'Audience', component: StepAudience },
  { id: 'offer', label: 'Offer', component: StepOffer },
  { id: 'brand', label: 'Brand', component: StepBrand },
  { id: 'goals', label: 'Goals', component: StepGoals },
];

interface Props {
  onSubmit: (data: BusinessIntake) => void;
  isGenerating: boolean;
}

export default function IntakeForm({ onSubmit, isGenerating }: Props) {
  const [step, setStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      brandPersonality: [],
      isMultiLocation: false,
      country: 'USA',
    },
    mode: 'onChange',
  });

  const handleNext = async () => {
    const valid = await form.trigger();
    if (valid && step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data as unknown as BusinessIntake);
  });

  const CurrentStep = STEPS[step].component;
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                i < step
                  ? 'bg-sky-500 text-white cursor-pointer'
                  : i === step
                  ? 'bg-sky-500/20 border-2 border-sky-500 text-sky-400'
                  : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              {i + 1}
            </button>
            <span className={`text-xs hidden sm:block ${ i === step ? 'text-sky-400' : i < step ? 'text-gray-400' : 'text-gray-600' }`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px ${ i < step ? 'bg-sky-500' : 'bg-white/10' }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
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
          onClick={() => setStep((s) => Math.max(0, s - 1))}
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
            className="btn-primary flex items-center gap-2 text-base px-8 py-4"
          >
            <Zap className="w-5 h-5" />
            {isGenerating ? 'Generating Blueprint...' : 'Generate My Blueprint'}
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
