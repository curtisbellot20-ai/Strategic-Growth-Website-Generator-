// ─── Business Intake ─────────────────────────────────────────────────────────
export interface BusinessIntake {
  // Basic Info
  businessName: string;
  tagline: string;
  industry: Industry;
  subIndustry: string;
  businessType: BusinessType;
  yearsInBusiness: string;
  teamSize: string;

  // Location
  city: string;
  state: string;
  country: string;
  serviceRadius: string;
  isMultiLocation: boolean;

  // Audience
  targetAudience: string;
  audienceAge: string;
  audienceIncome: string;
  audiencePainPoints: string;
  audienceDesires: string;

  // Offer
  primaryService: string;
  secondaryServices: string;
  uniqueValueProp: string;
  pricePoint: PricePoint;
  resultsOrOutcomes: string;

  // Brand
  brandPersonality: BrandPersonality[];
  currentColors: string;
  competitors: string;
  brandVoice: BrandVoice;

  // Goals
  primaryGoal: PrimaryGoal;
  monthlyLeadGoal: string;
  revenueGoal: string;

  // Contact
  websiteUrl: string;
  phone: string;
  email: string;
  socialMedia: string;
}

// ─── Enums / Literals ─────────────────────────────────────────────────────────
export type Industry =
  | 'healthcare'
  | 'legal'
  | 'real_estate'
  | 'home_services'
  | 'restaurant'
  | 'retail'
  | 'fitness'
  | 'beauty'
  | 'financial'
  | 'education'
  | 'technology'
  | 'consulting'
  | 'ecommerce'
  | 'nonprofit'
  | 'other';

export type BusinessType = 'local' | 'regional' | 'national' | 'ecommerce' | 'saas';
export type PricePoint = 'budget' | 'mid_market' | 'premium' | 'luxury';
export type BrandVoice = 'professional' | 'friendly' | 'authoritative' | 'playful' | 'inspiring' | 'empathetic';
export type PrimaryGoal = 'leads' | 'sales' | 'bookings' | 'awareness' | 'retention' | 'referrals';
export type BrandPersonality =
  | 'trustworthy'
  | 'innovative'
  | 'luxurious'
  | 'approachable'
  | 'energetic'
  | 'calming'
  | 'bold'
  | 'sophisticated';

// ─── Generated Blueprint ──────────────────────────────────────────────────────
export interface WebsiteBlueprint {
  businessIntake: BusinessIntake;
  strategicIntelligence: StrategicIntelligence;
  seoStrategy: SEOStrategy;
  atmosphereDesign: AtmosphereDesign;
  persuasionFramework: PersuasionFramework;
  storytellingFramework: StorytellingFramework;
  conversionEngine: ConversionEngine;
  acquisitionEngine: AcquisitionEngine;
  retentionEngine: RetentionEngine;
  referralEngine: ReferralEngine;
  pageBlueprints: PageBlueprint[];
  analyticsChecklist: AnalyticsChecklist;
  scoringReport: ScoringReport;
  colorSystem: ColorSystem;
  improvementChecklist: ImprovementItem[];
}

export interface StrategicIntelligence {
  marketPosition: string;
  competitiveAdvantage: string[];
  audienceInsights: string[];
  industryPatterns: string[];
  growthOpportunities: string[];
  riskFactors: string[];
  keyMessages: string[];
  emotionalTriggers: string[];
}

export interface SEOStrategy {
  primaryKeywords: Keyword[];
  longTailKeywords: Keyword[];
  localKeywords: Keyword[];
  geoStrategy: GEOStrategy;
  aeoStrategy: AEOStrategy;
  technicalSEO: string[];
  contentCalendar: ContentItem[];
  backlinkStrategy: string[];
  schemaMarkup: string[];
}

export interface Keyword {
  term: string;
  intent: 'informational' | 'navigational' | 'commercial' | 'transactional';
  volume: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  priority: number;
}

export interface GEOStrategy {
  googleBusinessOptimization: string[];
  localCitations: string[];
  neighborhoodTargeting: string[];
  localContentAngles: string[];
  reviewStrategy: string[];
}

export interface AEOStrategy {
  featuredSnippetTargets: string[];
  voiceSearchPhrases: string[];
  aiOverviewOptimization: string[];
  faqStrategy: FAQItem[];
  structuredAnswers: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  schema: boolean;
}

export interface ContentItem {
  title: string;
  type: 'blog' | 'video' | 'infographic' | 'case_study' | 'guide';
  keywords: string[];
  intent: string;
  month: number;
}

export interface AtmosphereDesign {
  visualTheme: string;
  moodBoard: string[];
  typographyDirection: TypographyDirection;
  spacingPhilosophy: string;
  imageryStyle: string[];
  animationStyle: string;
  luxurySignals: string[];
  trustSignals: string[];
}

export interface TypographyDirection {
  headingFont: string;
  bodyFont: string;
  accentFont: string;
  headingWeight: string;
  hierarchy: string[];
}

export interface PersuasionFramework {
  primaryHook: string;
  socialProofStrategy: string[];
  scarcityElements: string[];
  authorityBuilders: string[];
  reciprocityOffers: string[];
  commitmentLadder: string[];
  likeabilityFactors: string[];
  unityElements: string[];
  emotionalCopyAngles: string[];
}

export interface StorytellingFramework {
  brandStory: string;
  founderStory: string;
  customerHeroJourney: string;
  beforeAfterBridge: BeforeAfterBridge;
  microStories: string[];
  testimonialAngles: string[];
}

export interface BeforeAfterBridge {
  before: string;
  after: string;
  bridge: string;
}

export interface ConversionEngine {
  primaryCTA: CTA;
  secondaryCTAs: CTA[];
  leadMagnets: string[];
  funnelStages: FunnelStage[];
  objectionHandlers: ObjectionHandler[];
  urgencyMechanisms: string[];
  checkoutOptimizations: string[];
}

export interface CTA {
  text: string;
  subtext: string;
  placement: string;
  style: string;
  trigger: string;
}

export interface FunnelStage {
  stage: 'awareness' | 'interest' | 'desire' | 'action' | 'retention';
  content: string[];
  cta: string;
  metric: string;
}

export interface ObjectionHandler {
  objection: string;
  response: string;
  placement: string;
}

export interface AcquisitionEngine {
  channels: AcquisitionChannel[];
  paidStrategy: string[];
  organicStrategy: string[];
  partnershipOpportunities: string[];
  communityStrategies: string[];
  contentDistribution: string[];
}

export interface AcquisitionChannel {
  channel: string;
  priority: 'high' | 'medium' | 'low';
  tactics: string[];
  kpis: string[];
  budget: string;
}

export interface RetentionEngine {
  onboardingSequence: string[];
  emailCadence: EmailSequence[];
  loyaltyMechanisms: string[];
  winbackStrategy: string[];
  satisfactionMetrics: string[];
  communityBuilding: string[];
}

export interface EmailSequence {
  name: string;
  trigger: string;
  emails: { subject: string; timing: string; goal: string }[];
}

export interface ReferralEngine {
  referralProgram: ReferralProgram;
  partnerProgram: string[];
  reviewGeneration: string[];
  socialAmplification: string[];
  advocateIdentification: string[];
}

export interface ReferralProgram {
  incentive: string;
  mechanism: string;
  messaging: string;
  trackingMethod: string;
}

export interface PageBlueprint {
  pageType: PageType;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  sections: PageSection[];
  seoKeywords: string[];
  estimatedWordCount: number;
  conversionGoal: string;
}

export type PageType =
  | 'homepage'
  | 'service'
  | 'location'
  | 'about'
  | 'contact'
  | 'blog'
  | 'faq'
  | 'case_study'
  | 'landing';

export interface PageSection {
  sectionType: string;
  headline: string;
  subheadline?: string;
  body: string;
  cta?: string;
  mediaRecommendation?: string;
  designNotes?: string;
}

export interface ColorSystem {
  primary: ColorSwatch;
  secondary: ColorSwatch;
  accent: ColorSwatch;
  neutral: ColorSwatch;
  semantic: SemanticColors;
  psychology: string[];
  accessibility: string[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  psychology: string;
}

export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface AnalyticsChecklist {
  ga4Events: string[];
  conversionGoals: string[];
  heatmapPlacements: string[];
  abtestIdeas: string[];
  kpiDashboard: KPI[];
  monthlyReviewItems: string[];
}

export interface KPI {
  name: string;
  target: string;
  tool: string;
  frequency: string;
}

export interface ScoringReport {
  overallScore: number;
  categoryScores: CategoryScore[];
  strengths: string[];
  weaknesses: string[];
  quickWins: string[];
  priorityActions: string[];
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  notes: string;
}

export interface ImprovementItem {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  action: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
}

// ─── Generation State ─────────────────────────────────────────────────────────
export type GenerationStep =
  | 'idle'
  | 'analyzing'
  | 'strategizing'
  | 'designing'
  | 'writing'
  | 'scoring'
  | 'complete'
  | 'error';

export interface GenerationState {
  step: GenerationStep;
  progress: number;
  message: string;
  blueprint: WebsiteBlueprint | null;
  error: string | null;
}
