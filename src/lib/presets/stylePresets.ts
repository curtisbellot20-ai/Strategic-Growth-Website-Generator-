export interface StylePreset {
  id: string;
  label: string;
  emoji: string;
  description: string;
  fields: {
    desiredAtmosphere: string;
    luxuryLevel: number;
    desiredBrandStyle: string;
    brandVoice: string;
    desiredEmotionalTone: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'ultra-luxury',
    label: 'Ultra Luxury',
    emoji: '✨',
    description: 'Gold & midnight tones for premium brands',
    fields: {
      desiredAtmosphere: 'luxurious_refined',
      luxuryLevel: 5,
      desiredBrandStyle: 'luxury_boutique',
      brandVoice: 'professional',
      desiredEmotionalTone: 'inspiring_aspirational',
      primaryColor: '#C9A84C',
      secondaryColor: '#0D0D0D',
    },
  },
  {
    id: 'bold-modern',
    label: 'Bold & Modern',
    emoji: '⚡',
    description: 'High-contrast energy for disruptors',
    fields: {
      desiredAtmosphere: 'bold_energetic',
      luxuryLevel: 3,
      desiredBrandStyle: 'tech_forward',
      brandVoice: 'authoritative',
      desiredEmotionalTone: 'exciting_dynamic',
      primaryColor: '#6C47FF',
      secondaryColor: '#FF4757',
    },
  },
  {
    id: 'clean-professional',
    label: 'Clean Professional',
    emoji: '🏛️',
    description: 'Trusted & structured for service businesses',
    fields: {
      desiredAtmosphere: 'clean_minimal',
      luxuryLevel: 3,
      desiredBrandStyle: 'corporate_pro',
      brandVoice: 'authoritative',
      desiredEmotionalTone: 'trustworthy_reliable',
      primaryColor: '#1B3A6B',
      secondaryColor: '#E8EDF5',
    },
  },
  {
    id: 'warm-artisan',
    label: 'Warm Artisan',
    emoji: '🌿',
    description: 'Organic & handcrafted for local brands',
    fields: {
      desiredAtmosphere: 'warm_inviting',
      luxuryLevel: 3,
      desiredBrandStyle: 'rustic_earthy',
      brandVoice: 'friendly',
      desiredEmotionalTone: 'warm_empathetic',
      primaryColor: '#8B5E3C',
      secondaryColor: '#D4A853',
    },
  },
  {
    id: 'dark-futuristic',
    label: 'Dark & Futuristic',
    emoji: '🚀',
    description: 'Cutting-edge for tech & innovation brands',
    fields: {
      desiredAtmosphere: 'modern_tech_forward',
      luxuryLevel: 4,
      desiredBrandStyle: 'tech_forward',
      brandVoice: 'authoritative',
      desiredEmotionalTone: 'exciting_dynamic',
      primaryColor: '#00D4FF',
      secondaryColor: '#0A0E1A',
    },
  },
  {
    id: 'playful-vibrant',
    label: 'Playful & Vibrant',
    emoji: '🎨',
    description: 'Fun & energetic for consumer brands',
    fields: {
      desiredAtmosphere: 'playful_vibrant',
      luxuryLevel: 2,
      desiredBrandStyle: 'creative_artistic',
      brandVoice: 'playful',
      desiredEmotionalTone: 'exciting_dynamic',
      primaryColor: '#FF6B6B',
      secondaryColor: '#FFE66D',
    },
  },
  {
    id: 'soft-wellness',
    label: 'Soft Wellness',
    emoji: '🌸',
    description: 'Calming & nurturing for health & beauty',
    fields: {
      desiredAtmosphere: 'natural_organic',
      luxuryLevel: 3,
      desiredBrandStyle: 'wellness_holistic',
      brandVoice: 'empathetic',
      desiredEmotionalTone: 'calm_reassuring',
      primaryColor: '#B8A9C9',
      secondaryColor: '#F7F0E8',
    },
  },
  {
    id: 'power-authority',
    label: 'Power & Authority',
    emoji: '🔥',
    description: 'Dominant & commanding for leaders',
    fields: {
      desiredAtmosphere: 'clean_minimal',
      luxuryLevel: 5,
      desiredBrandStyle: 'classic_timeless',
      brandVoice: 'authoritative',
      desiredEmotionalTone: 'confident_empowering',
      primaryColor: '#1A1A2E',
      secondaryColor: '#C41E3A',
    },
  },
];
