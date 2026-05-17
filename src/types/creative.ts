export type CreativeStatus = 'idle' | 'loading' | 'complete' | 'error';

export interface FontRecommendation {
  name: string;
  category: 'serif' | 'sans-serif' | 'display' | 'script' | 'monospace';
  weight: string;
  useCase: string;
  googleFontsUrl: string;
  pairingNote: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
  psychology: string;
  usageGuideline: string;
}

export interface GradientDefinition {
  name: string;
  css: string;
  useCase: string;
}

export interface LayoutStyle {
  name: string;
  description: string;
  gridSystem: string;
  whitespacePhilosophy: string;
  scrollBehavior: string;
  sectionFlow: string;
  breakpointStrategy: string;
  keyLayoutPatterns: string[];
  rationale: string;
}

export interface TypographyDirection {
  headlineFont: FontRecommendation;
  bodyFont: FontRecommendation;
  accentFont: FontRecommendation;
  scaleRatio: string;
  letterSpacing: string;
  lineHeight: string;
  textureEffects: string[];
  hierarchyRules: string[];
  rationale: string;
}

export interface ColorDirection {
  primaryPalette: ColorSwatch[];
  accentColors: ColorSwatch[];
  neutrals: ColorSwatch[];
  gradients: GradientDefinition[];
  colorMood: string;
  colorPsychology: string;
  usageRules: string[];
  contrastStrategy: string;
  rationale: string;
}

export interface ImageStyle {
  style: string;
  subjectMatter: string;
  composition: string;
  lighting: string;
  colorGrading: string;
  humanPresence: string;
  abstractVsLiteral: string;
  editingStyle: string;
  avoidImages: string[];
  shootingDirections: string[];
  rationale: string;
}

export interface VideoStyle {
  style: string;
  pacing: string;
  shotTypes: string[];
  colorGrading: string;
  musicMood: string;
  textOverlay: string;
  heroVideoApproach: string;
  backgroundVideoUse: string;
  rationale: string;
}

export interface AnimationStyle {
  personality: string;
  entryAnimations: string;
  scrollAnimations: string;
  hoverEffects: string;
  microInteractions: string[];
  loadingState: string;
  transitionStyle: string;
  intensity: 'subtle' | 'moderate' | 'bold';
  performanceNotes: string;
  rationale: string;
}

export interface SectionRhythm {
  pattern: string;
  alternation: string;
  breathingRoom: string;
  sectionSeparators: string;
  contentDensity: string;
  verticalFlow: string;
  sectionOrder: string[];
  rationale: string;
}

export interface HeroStyle {
  layout: string;
  headlineApproach: string;
  subtextStyle: string;
  ctaPlacement: string;
  backgroundApproach: string;
  visualElement: string;
  moodEstablishment: string;
  scrollTrigger: string;
  rationale: string;
}

export interface CTAStyle {
  primaryShape: string;
  primaryColorScheme: string;
  primaryTextStyle: string;
  secondaryStyle: string;
  placement: string;
  urgencyLevel: string;
  microCopyStyle: string;
  hoverBehavior: string;
  rationale: string;
}

export interface GalleryStyle {
  layout: string;
  hoverEffect: string;
  captionStyle: string;
  filterStyle: string;
  lightboxStyle: string;
  spacing: string;
  masonryVsGrid: string;
  rationale: string;
}

export interface TrustSectionStyle {
  layout: string;
  testimonialCard: string;
  reviewPresentation: string;
  statsDisplay: string;
  certificationBadges: string;
  socialProofElements: string[];
  authoritySignals: string[];
  rationale: string;
}

export interface MobileDirection {
  navigationStyle: string;
  stackingOrder: string;
  touchTargets: string;
  mobileHero: string;
  fontScaling: string;
  buttonStyle: string;
  gestureInteractions: string;
  mobileFirstPriorities: string[];
  rationale: string;
}

export interface CreativeDirectionIntelligence {
  businessName: string;
  designPersonality: string;
  creativeScore: number;
  creativeSummary: string;
  uniqueDesignPrinciples: string[];
  brandDifferentiators: string[];
  moodBoardKeywords: string[];
  referenceAesthetics: string[];
  avoidPatterns: string[];
  layoutStyle: LayoutStyle;
  typographyDirection: TypographyDirection;
  colorDirection: ColorDirection;
  imageStyle: ImageStyle;
  videoStyle: VideoStyle;
  animationStyle: AnimationStyle;
  sectionRhythm: SectionRhythm;
  heroStyle: HeroStyle;
  ctaStyle: CTAStyle;
  galleryStyle: GalleryStyle;
  trustSectionStyle: TrustSectionStyle;
  mobileDirection: MobileDirection;
  generatedAt: string;
}

export interface CreativeState {
  status: CreativeStatus;
  data: CreativeDirectionIntelligence | null;
  error: string | null;
}
