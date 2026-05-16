export interface StylePreset {
  id: string;
  label: string;
  emoji: string;
  description: string;
  fields: {
    atmosphere: string;
    luxuryLevel: string;
    brandStyle: string;
    brandVoice: string;
    emotionalTone: string;
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
      atmosphere: 'luxury',
      luxuryLevel: 'ultra_premium',
      brandStyle: 'minimalist',
      brandVoice: 'elegant',
      emotionalTone: 'aspirational',
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
      atmosphere: 'modern',
      luxuryLevel: 'quality',
      brandStyle: 'bold',
      brandVoice: 'innovative',
      emotionalTone: 'exciting',
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
      atmosphere: 'professional',
      luxuryLevel: 'quality',
      brandStyle: 'clean',
      brandVoice: 'authoritative',
      emotionalTone: 'trustworthy',
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
      atmosphere: 'artisan',
      luxuryLevel: 'quality',
      brandStyle: 'organic',
      brandVoice: 'conversational',
      emotionalTone: 'heartfelt',
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
      atmosphere: 'futuristic',
      luxuryLevel: 'premium',
      brandStyle: 'modern',
      brandVoice: 'innovative',
      emotionalTone: 'exciting',
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
      atmosphere: 'energetic',
      luxuryLevel: 'accessible',
      brandStyle: 'bold',
      brandVoice: 'conversational',
      emotionalTone: 'exciting',
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
      atmosphere: 'serene',
      luxuryLevel: 'quality',
      brandStyle: 'minimalist',
      brandVoice: 'nurturing',
      emotionalTone: 'peaceful',
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
      atmosphere: 'professional',
      luxuryLevel: 'ultra_premium',
      brandStyle: 'classic',
      brandVoice: 'authoritative',
      emotionalTone: 'empowering',
      primaryColor: '#1A1A2E',
      secondaryColor: '#C41E3A',
    },
  },
];
