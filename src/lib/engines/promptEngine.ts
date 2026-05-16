import type { BusinessIntake } from '@/types';

export function buildMasterPrompt(intake: BusinessIntake): string {
  return `You are a team of elite business growth experts:
- Luxury Brand Strategist
- CRO Expert
- SEO/GEO/AEO Expert
- UI/UX Designer
- Behavioral Psychology Strategist
- Ethical Persuasion Copywriter
- Creative Director
- Local Marketing Strategist
- Customer Retention Strategist
- Business Intelligence Analyst

Analyze this business and produce a COMPREHENSIVE strategic website blueprint as a valid JSON object.

## BUSINESS PROFILE
Business Name: ${intake.businessName}
Tagline: ${intake.tagline}
Industry: ${intake.industry}
Sub-Industry: ${intake.subIndustry}
Business Type: ${intake.businessType}
Years in Business: ${intake.yearsInBusiness}
Team Size: ${intake.teamSize}

## LOCATION
City: ${intake.city}, ${intake.state}, ${intake.country}
Service Radius: ${intake.serviceRadius}
Multi-Location: ${intake.isMultiLocation}

## TARGET AUDIENCE
Audience: ${intake.targetAudience}
Age Range: ${intake.audienceAge}
Income Level: ${intake.audienceIncome}
Pain Points: ${intake.audiencePainPoints}
Desires: ${intake.audienceDesires}

## OFFER
Primary Service: ${intake.primaryService}
Secondary Services: ${intake.secondaryServices}
Unique Value Proposition: ${intake.uniqueValueProp}
Price Point: ${intake.pricePoint}
Results/Outcomes: ${intake.resultsOrOutcomes}

## BRAND
Personality: ${intake.brandPersonality.join(', ')}
Current Colors: ${intake.currentColors}
Competitors: ${intake.competitors}
Brand Voice: ${intake.brandVoice}

## GOALS
Primary Goal: ${intake.primaryGoal}
Monthly Lead Goal: ${intake.monthlyLeadGoal}
Revenue Goal: ${intake.revenueGoal}

Return ONLY a JSON object with this exact structure. No markdown, no explanation:

{
  "strategicIntelligence": {
    "marketPosition": "string",
    "competitiveAdvantage": ["string"],
    "audienceInsights": ["string"],
    "industryPatterns": ["string"],
    "growthOpportunities": ["string"],
    "riskFactors": ["string"],
    "keyMessages": ["string"],
    "emotionalTriggers": ["string"]
  },
  "seoStrategy": {
    "primaryKeywords": [{"term":"string","intent":"transactional","volume":"high","difficulty":"medium","priority":1}],
    "longTailKeywords": [{"term":"string","intent":"informational","volume":"medium","difficulty":"easy","priority":2}],
    "localKeywords": [{"term":"string","intent":"navigational","volume":"medium","difficulty":"easy","priority":1}],
    "geoStrategy": {
      "googleBusinessOptimization": ["string"],
      "localCitations": ["string"],
      "neighborhoodTargeting": ["string"],
      "localContentAngles": ["string"],
      "reviewStrategy": ["string"]
    },
    "aeoStrategy": {
      "featuredSnippetTargets": ["string"],
      "voiceSearchPhrases": ["string"],
      "aiOverviewOptimization": ["string"],
      "faqStrategy": [{"question":"string","answer":"string","schema":true}],
      "structuredAnswers": ["string"]
    },
    "technicalSEO": ["string"],
    "contentCalendar": [{"title":"string","type":"blog","keywords":["string"],"intent":"string","month":1}],
    "backlinkStrategy": ["string"],
    "schemaMarkup": ["string"]
  },
  "atmosphereDesign": {
    "visualTheme": "string",
    "moodBoard": ["string"],
    "typographyDirection": {
      "headingFont": "string",
      "bodyFont": "string",
      "accentFont": "string",
      "headingWeight": "string",
      "hierarchy": ["string"]
    },
    "spacingPhilosophy": "string",
    "imageryStyle": ["string"],
    "animationStyle": "string",
    "luxurySignals": ["string"],
    "trustSignals": ["string"]
  },
  "colorSystem": {
    "primary": {"name":"string","hex":"#000000","rgb":"rgb(0,0,0)","usage":"string","psychology":"string"},
    "secondary": {"name":"string","hex":"#000000","rgb":"rgb(0,0,0)","usage":"string","psychology":"string"},
    "accent": {"name":"string","hex":"#000000","rgb":"rgb(0,0,0)","usage":"string","psychology":"string"},
    "neutral": {"name":"string","hex":"#000000","rgb":"rgb(0,0,0)","usage":"string","psychology":"string"},
    "semantic": {"success":"#22c55e","warning":"#f59e0b","error":"#ef4444","info":"#3b82f6"},
    "psychology": ["string"],
    "accessibility": ["string"]
  },
  "persuasionFramework": {
    "primaryHook": "string",
    "socialProofStrategy": ["string"],
    "scarcityElements": ["string"],
    "authorityBuilders": ["string"],
    "reciprocityOffers": ["string"],
    "commitmentLadder": ["string"],
    "likeabilityFactors": ["string"],
    "unityElements": ["string"],
    "emotionalCopyAngles": ["string"]
  },
  "storytellingFramework": {
    "brandStory": "string",
    "founderStory": "string",
    "customerHeroJourney": "string",
    "beforeAfterBridge": {"before":"string","after":"string","bridge":"string"},
    "microStories": ["string"],
    "testimonialAngles": ["string"]
  },
  "conversionEngine": {
    "primaryCTA": {"text":"string","subtext":"string","placement":"string","style":"string","trigger":"string"},
    "secondaryCTAs": [{"text":"string","subtext":"string","placement":"string","style":"string","trigger":"string"}],
    "leadMagnets": ["string"],
    "funnelStages": [{"stage":"awareness","content":["string"],"cta":"string","metric":"string"}],
    "objectionHandlers": [{"objection":"string","response":"string","placement":"string"}],
    "urgencyMechanisms": ["string"],
    "checkoutOptimizations": ["string"]
  },
  "acquisitionEngine": {
    "channels": [{"channel":"string","priority":"high","tactics":["string"],"kpis":["string"],"budget":"string"}],
    "paidStrategy": ["string"],
    "organicStrategy": ["string"],
    "partnershipOpportunities": ["string"],
    "communityStrategies": ["string"],
    "contentDistribution": ["string"]
  },
  "retentionEngine": {
    "onboardingSequence": ["string"],
    "emailCadence": [{"name":"string","trigger":"string","emails":[{"subject":"string","timing":"string","goal":"string"}]}],
    "loyaltyMechanisms": ["string"],
    "winbackStrategy": ["string"],
    "satisfactionMetrics": ["string"],
    "communityBuilding": ["string"]
  },
  "referralEngine": {
    "referralProgram": {"incentive":"string","mechanism":"string","messaging":"string","trackingMethod":"string"},
    "partnerProgram": ["string"],
    "reviewGeneration": ["string"],
    "socialAmplification": ["string"],
    "advocateIdentification": ["string"]
  },
  "pageBlueprints": [
    {
      "pageType": "homepage",
      "slug": "/",
      "title": "string",
      "metaDescription": "string",
      "h1": "string",
      "seoKeywords": ["string"],
      "estimatedWordCount": 1200,
      "conversionGoal": "string",
      "sections": [
        {"sectionType":"hero","headline":"string","subheadline":"string","body":"string","cta":"string","mediaRecommendation":"string","designNotes":"string"}
      ]
    }
  ],
  "analyticsChecklist": {
    "ga4Events": ["string"],
    "conversionGoals": ["string"],
    "heatmapPlacements": ["string"],
    "abtestIdeas": ["string"],
    "kpiDashboard": [{"name":"string","target":"string","tool":"string","frequency":"string"}],
    "monthlyReviewItems": ["string"]
  },
  "scoringReport": {
    "overallScore": 85,
    "categoryScores": [{"category":"string","score":8,"maxScore":10,"notes":"string"}],
    "strengths": ["string"],
    "weaknesses": ["string"],
    "quickWins": ["string"],
    "priorityActions": ["string"]
  },
  "improvementChecklist": [
    {"priority":"high","category":"string","action":"string","impact":"string","effort":"low","timeline":"string"}
  ]
}

Be extremely specific to ${intake.businessName} in ${intake.city}. Generate real, actionable, premium-quality strategic content. Include at least 5 page blueprints (homepage, 2 service pages, location page, about page). Each page blueprint must have at least 6 sections.`;
}
