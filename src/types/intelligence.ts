// ---- Strategic Intelligence Engine Types ----

export interface IndustryIntelligence {
  generatedFor: string;
  industry: string;
  businessType: string;
  generatedAt: string;

  // 1. Customer Psychology
  customerPsychology: CustomerPsychologyProfile;

  // 2. Trust & Resistance
  trustSignals: TrustSignal[];
  commonObjections: IntelObjection[];

  // 3. Offer Intelligence
  highestConvertingOffers: ConvertingOffer[];

  // 4. Industry Patterns
  industrySuccessPatterns: IndustryPattern[];
  profitableBusinessPatterns: string[];
  premiumPositioningCues: string[];

  // 5. Retention & Referrals
  retentionDrivers: RetentionDriver[];
  referralOpportunities: string[];

  // 6. Content & SEO
  contentStrategy: IntelContentStrategy;
  seoStructure: IntelSEOStructure;

  // 7. CTA & Atmosphere
  ctaStrategy: IntelCTAStrategy;
  atmosphereStrategy: IntelAtmosphereStrategy;

  // ---- Outputs ----
  industrySuccessSummary: string;
  recommendedWebsiteStrategy: RecommendedWebsiteStrategy;
  customerMotivationProfile: CustomerMotivationProfile;
  conversionOpportunities: ConversionOpportunity[];
  trustBuildingRecommendations: string[];
  growthOpportunities: GrowthOpportunity[];

  // Scores
  marketOpportunityScore: number;
  competitiveAdvantageScore: number;
}

export interface CustomerPsychologyProfile {
  primaryMotivations: string[];
  emotionalBuyingTriggers: string[];
  decisionMakingStyle: string;
  pricePerceptionFactors: string[];
  keyFears: string[];
  deepestAspirations: string[];
  identityFactors: string[];
  socialInfluences: string[];
}

export interface TrustSignal {
  signal: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
  placement: string;
  implementation: string;
  industrySpecific: boolean;
}

export interface IntelObjection {
  objection: string;
  frequency: 'very_common' | 'common' | 'occasional';
  underlyingFear: string;
  handler: string;
  placementOnSite: string;
}

export interface ConvertingOffer {
  offer: string;
  conversionReason: string;
  pricingInsight: string;
  positioning: string;
  idealFor: string;
}

export interface IndustryPattern {
  pattern: string;
  whyItWorks: string;
  implementation: string;
  priority: 'must_have' | 'should_have' | 'nice_to_have';
}

export interface RetentionDriver {
  driver: string;
  psychologicalBasis: string;
  tactic: string;
  impact: 'high' | 'medium' | 'low';
}

export interface IntelContentStrategy {
  topPerformingContentTypes: string[];
  audienceContentAngles: string[];
  contentCalendarThemes: string[];
  viralContentOpportunities: string[];
  authorityContentFormats: string[];
}

export interface IntelSEOStructure {
  priorityPages: string[];
  keywordClusters: string[];
  localSEOPriorities: string[];
  contentHubs: string[];
  featuredSnippetOpportunities: string[];
}

export interface IntelCTAStrategy {
  primaryCTARecommendations: string[];
  microCommitmentCTAs: string[];
  ctaPlacementPriority: string[];
  ctaLanguagePatterns: string[];
  urgencyMechanisms: string[];
}

export interface IntelAtmosphereStrategy {
  visualThemeRecommendations: string[];
  colorPsychologyGuidance: string[];
  imageryRecommendations: string[];
  designPrinciplesByIndustry: string[];
  luxurySignalsForIndustry: string[];
}

export interface RecommendedWebsiteStrategy {
  strategicOverview: string;
  topPriorities: string[];
  differentiationStrategy: string;
  homepageStrategy: string;
  keyPages: string[];
  criticalSections: string[];
}

export interface CustomerMotivationProfile {
  primaryDriver: string;
  secondaryDrivers: string[];
  emotionalHook: string;
  messagingFramework: string;
  copyAngles: string[];
  heroHeadlineFormulas: string[];
}

export interface ConversionOpportunity {
  opportunity: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  description: string;
  quickWin: boolean;
}

export interface GrowthOpportunity {
  opportunity: string;
  channel: string;
  rationale: string;
  timeframe: string;
  revenueImpact: string;
}

// Generation state for the Intelligence tab
export type IntelligenceStatus = 'idle' | 'loading' | 'complete' | 'error';

export interface IntelligenceState {
  status: IntelligenceStatus;
  data: IndustryIntelligence | null;
  error: string | null;
}
