// ---- Atmosphere Intelligence System ----

export type AtmosphereType =
  | 'luxury' | 'romantic' | 'corporate' | 'cinematic' | 'urban_premium'
  | 'family_friendly' | 'high_energy' | 'wellness' | 'minimal' | 'elegant'
  | 'futuristic' | 'trustworthy' | 'exclusive' | 'creative' | 'performance_driven'
  | 'relaxing' | 'nightlife' | 'high_status';

export interface AtmosphereIntelligence {
  businessName: string;
  primaryAtmosphere: AtmosphereType;
  secondaryAtmosphere: AtmosphereType;
  atmosphereFitScore: number; // 0-100

  rationale: AtmosphereRationale;

  // The 11 Design Dimensions
  emotionalTone: EmotionalToneDimension;
  colorSystem: ColorDimension;
  typography: TypographyDimension;
  spacing: SpacingDimension;
  imagery: ImageryDimension;
  layoutPacing: LayoutPacingDimension;
  ctaLanguage: CTALanguageDimension;
  animationStyle: AnimationDimension;
  visualDensity: VisualDensityDimension;
  trustSignals: TrustSignalsDimension;
  storytellingTone: StorytellingDimension;

  // Synthesis
  designBrief: string;
  moodBoardKeywords: string[];
  referenceInspiration: string[];
  sectionExamples: SectionExample[];
  implementationChecklist: ImplementationItem[];
}

export interface AtmosphereRationale {
  businessRationale: string;
  customerRationale: string;
  psychologicalBasis: string;
  competitiveAdvantage: string;
  whyNotOtherAtmospheres: string;
}

export interface EmotionalToneDimension {
  primaryEmotion: string;
  emotionalArc: string;
  entryEmotion: string;
  peakEmotion: string;
  exitEmotion: string;
  emotionalKeywords: string[];
  avoidEmotions: string[];
  howToAchieve: string[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  psychology: string;
  usage: string;
}

export interface ColorDimension {
  philosophy: string;
  primaryColor: ColorSwatch;
  secondaryColor: ColorSwatch;
  accentColor: ColorSwatch;
  backgroundColor: ColorSwatch;
  textColor: ColorSwatch;
  colorTemperature: string;
  contrastApproach: string;
  gradientRecommendation: string;
  colorDos: string[];
  colorDonts: string[];
}

export interface FontRecommendation {
  name: string;
  category: string;
  weight: string;
  characteristics: string;
  googleFontUrl: string;
}

export interface TypographyDimension {
  philosophy: string;
  headingFont: FontRecommendation;
  bodyFont: FontRecommendation;
  accentFont: FontRecommendation;
  sizeScale: string;
  lineHeightApproach: string;
  letterSpacingApproach: string;
  textTransformUsage: string;
  typographyDos: string[];
  typographyDonts: string[];
}

export interface SpacingDimension {
  philosophy: string;
  whitespaceLevel: 'generous' | 'balanced' | 'tight';
  sectionPadding: string;
  componentSpacing: string;
  gridApproach: string;
  breathingRoom: string;
  mobileSpacingNotes: string;
  spacingDos: string[];
}

export interface ImageryDimension {
  philosophy: string;
  photographyStyle: string;
  lightingApproach: string;
  colorTreatment: string;
  subjectFocus: string;
  backgroundStyle: string;
  modelInclusion: string;
  imageComposition: string;
  videoRecommendations: string;
  imageryDos: string[];
  imageryDonts: string[];
  stockPhotoGuidance: string;
}

export interface LayoutPacingDimension {
  philosophy: string;
  scrollExperience: string;
  sectionRhythm: string;
  heroApproach: string;
  sectionTransitions: string;
  informationHierarchy: string;
  viewportUsage: string;
  breakpointConsiderations: string;
  pacingDos: string[];
}

export interface CTALanguageDimension {
  philosophy: string;
  primaryCTATone: string;
  recommendedPrimaryCTAs: string[];
  microCTAs: string[];
  powerWords: string[];
  avoidWords: string[];
  urgencyApproach: string;
  ctaButtonStyle: string;
  ctaPlacementLogic: string;
}

export interface AnimationDimension {
  philosophy: string;
  overallIntensity: 'none' | 'subtle' | 'moderate' | 'dramatic';
  entryAnimations: string;
  scrollAnimations: string;
  hoverEffects: string;
  transitionSpeed: string;
  loadingExperience: string;
  microInteractions: string[];
  animationDos: string[];
  animationDonts: string[];
}

export interface VisualDensityDimension {
  philosophy: string;
  densityLevel: 'sparse' | 'balanced' | 'rich';
  contentPerScreen: string;
  gridColumns: string;
  elementSpacing: string;
  cardDesign: string;
  iconUsage: string;
  patternUsage: string;
  densityBySection: string[];
}

export interface TrustSignalsDimension {
  philosophy: string;
  atmosphereSpecificTrust: string[];
  primaryTrustElements: string[];
  placementStrategy: string[];
  visualTreatment: string;
  socialProofStyle: string;
  credentialDisplay: string;
  trustDos: string[];
}

export interface StorytellingDimension {
  philosophy: string;
  narrativeVoice: string;
  languageRegister: string;
  storyArcStructure: string;
  emotionalJourneyMap: string;
  openingHook: string;
  bodyNarrative: string;
  closingImpact: string;
  vocabularyGuidance: string[];
  sentenceStructure: string;
  storytellingDos: string[];
  storytellingDonts: string[];
}

export interface SectionExample {
  sectionName: string;
  atmosphereApplication: string;
  specificElements: string[];
}

export interface ImplementationItem {
  item: string;
  dimension: string;
  priority: 'critical' | 'high' | 'medium';
  atmosphereImpact: string;
}

export type AtmosphereStatus = 'idle' | 'loading' | 'complete' | 'error';

export interface AtmosphereState {
  status: AtmosphereStatus;
  data: AtmosphereIntelligence | null;
  error: string | null;
}
