import type { BusinessIntake } from '@/types';

export function buildIntelligencePrompt(intake: BusinessIntake): string {
  const industry     = intake.industry;
  const businessType = intake.businessType;
  const city         = intake.city;
  const state        = intake.state;
  const pricePoint   = intake.pricePoint;
  const competitors  = (intake.competitors || []).join(', ') || 'not specified';

  return `You are a team of elite business intelligence analysts with deep specialization in the ${industry} industry.

Your task: Generate a COMPREHENSIVE Strategic Intelligence Report for:
- Business: ${intake.businessName}
- Industry: ${industry}
- Type: ${businessType}
- Market: ${city}, ${state}
- Price Point: ${pricePoint}
- Primary Service: ${intake.primaryService}
- Known Competitors: ${competitors}
- Primary Goal: ${intake.primaryGoal}
- Customer: ${intake.targetAudience}
- Pain Points: ${intake.audiencePainPoints}
- Fears: ${intake.audienceFears || 'not specified'}
- Objections: ${intake.audienceObjections || 'not specified'}

## YOUR MISSION

Cross-reference the top 20% of highest-performing ${industry} businesses and extract the patterns that consistently separate winners from the rest.

Think across these dimensions:
1. CUSTOMER PSYCHOLOGY — What drives decisions, what triggers action, what builds loyalty
2. TRUST SIGNALS — What eliminates resistance and builds credibility in this specific industry
3. COMMON OBJECTIONS — What stops prospects from converting and how top businesses handle them
4. CONVERTING OFFERS — What offer structures, pricing models, and packaging perform best
5. INDUSTRY PATTERNS — What top ${industry} businesses consistently do that bottom ones don't
6. PREMIUM POSITIONING — How elite brands in this space differentiate and command premium prices
7. RETENTION DRIVERS — What keeps customers coming back and referring others
8. REFERRAL SYSTEMS — How the best businesses generate word-of-mouth systematically
9. CONTENT STRATEGY — What content formats and angles work in this industry
10. SEO STRUCTURE — What pages, keywords, and content hubs dominate this industry's search
11. CTA STRATEGY — What calls-to-action generate the most conversions in this space
12. ATMOSPHERE — What visual, emotional, and design elements attract premium clients

Return ONLY a valid JSON object with this exact structure. No markdown, no code fences:

{
  "generatedFor": "${intake.businessName}",
  "industry": "${industry}",
  "businessType": "${businessType}",
  "generatedAt": "${new Date().toISOString()}",

  "customerPsychology": {
    "primaryMotivations": ["string"],
    "emotionalBuyingTriggers": ["string"],
    "decisionMakingStyle": "string",
    "pricePerceptionFactors": ["string"],
    "keyFears": ["string"],
    "deepestAspirations": ["string"],
    "identityFactors": ["string"],
    "socialInfluences": ["string"]
  },

  "trustSignals": [
    {
      "signal": "string",
      "impact": "critical",
      "placement": "string",
      "implementation": "string",
      "industrySpecific": true
    }
  ],

  "commonObjections": [
    {
      "objection": "string",
      "frequency": "very_common",
      "underlyingFear": "string",
      "handler": "string",
      "placementOnSite": "string"
    }
  ],

  "highestConvertingOffers": [
    {
      "offer": "string",
      "conversionReason": "string",
      "pricingInsight": "string",
      "positioning": "string",
      "idealFor": "string"
    }
  ],

  "industrySuccessPatterns": [
    {
      "pattern": "string",
      "whyItWorks": "string",
      "implementation": "string",
      "priority": "must_have"
    }
  ],

  "profitableBusinessPatterns": ["string"],
  "premiumPositioningCues": ["string"],

  "retentionDrivers": [
    {
      "driver": "string",
      "psychologicalBasis": "string",
      "tactic": "string",
      "impact": "high"
    }
  ],

  "referralOpportunities": ["string"],

  "contentStrategy": {
    "topPerformingContentTypes": ["string"],
    "audienceContentAngles": ["string"],
    "contentCalendarThemes": ["string"],
    "viralContentOpportunities": ["string"],
    "authorityContentFormats": ["string"]
  },

  "seoStructure": {
    "priorityPages": ["string"],
    "keywordClusters": ["string"],
    "localSEOPriorities": ["string"],
    "contentHubs": ["string"],
    "featuredSnippetOpportunities": ["string"]
  },

  "ctaStrategy": {
    "primaryCTARecommendations": ["string"],
    "microCommitmentCTAs": ["string"],
    "ctaPlacementPriority": ["string"],
    "ctaLanguagePatterns": ["string"],
    "urgencyMechanisms": ["string"]
  },

  "atmosphereStrategy": {
    "visualThemeRecommendations": ["string"],
    "colorPsychologyGuidance": ["string"],
    "imageryRecommendations": ["string"],
    "designPrinciplesByIndustry": ["string"],
    "luxurySignalsForIndustry": ["string"]
  },

  "industrySuccessSummary": "string — 2-3 sentence executive summary of what separates top ${industry} businesses",

  "recommendedWebsiteStrategy": {
    "strategicOverview": "string",
    "topPriorities": ["string"],
    "differentiationStrategy": "string",
    "homepageStrategy": "string",
    "keyPages": ["string"],
    "criticalSections": ["string"]
  },

  "customerMotivationProfile": {
    "primaryDriver": "string",
    "secondaryDrivers": ["string"],
    "emotionalHook": "string",
    "messagingFramework": "string",
    "copyAngles": ["string"],
    "heroHeadlineFormulas": ["string"]
  },

  "conversionOpportunities": [
    {
      "opportunity": "string",
      "impact": "high",
      "effort": "low",
      "description": "string",
      "quickWin": true
    }
  ],

  "trustBuildingRecommendations": ["string"],

  "growthOpportunities": [
    {
      "opportunity": "string",
      "channel": "string",
      "rationale": "string",
      "timeframe": "string",
      "revenueImpact": "string"
    }
  ],

  "marketOpportunityScore": 85,
  "competitiveAdvantageScore": 78
}

Be hyper-specific to the ${industry} industry in ${city}, ${state}.
Generate at least:
- 8 customer psychology data points per section
- 8 trust signals
- 6 objections with full handlers
- 5 converting offer structures
- 8 industry success patterns
- 6 retention drivers
- 6 content strategy items per sub-section
- 6 SEO structure items per sub-section
- 5 CTA strategy items per sub-section
- 8 conversion opportunities
- 6 growth opportunities

All recommendations must be actionable, specific to ${industry}, and address the specific customer profile described.`;
}
