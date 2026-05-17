import type { BusinessIntake } from '@/types';

export function buildMasterPrompt(intake: BusinessIntake): string {
  const socialSummary = Object.entries(intake.socialLinks || {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  const testimonialSummary = (intake.testimonials || [])
    .slice(0, 3)
    .map((t, i) => `[${i+1}] "${t.text}" — ${t.name}${t.role ? `, ${t.role}` : ''}`)
    .join('\n');

  const reviewSummary = (intake.reviews || [])
    .slice(0, 3)
    .map((r) => `${r.source} (${r.rating}★): ${r.text || 'Positive review'}`)
    .join('\n');

  return `You are a team of elite business growth experts:
- Luxury Brand Strategist
- CRO (Conversion Rate Optimization) Expert
- SEO / GEO / AEO Expert
- UI/UX Designer
- Behavioral Psychology Strategist
- Ethical Persuasion Copywriter
- Creative Director
- Local Marketing Strategist
- Customer Retention Strategist
- Business Intelligence Analyst

Analyze this business profile and produce a COMPREHENSIVE strategic website blueprint as a valid JSON object.

## BUSINESS PROFILE
Business Name: ${intake.businessName}
Tagline: ${intake.tagline || 'N/A'}
Industry: ${intake.industry}
Sub-Industry / Specialty: ${intake.subIndustry || 'N/A'}
Business Type: ${intake.businessType}
Years in Business: ${intake.yearsInBusiness || 'N/A'}
Team Size: ${intake.teamSize || 'N/A'}

## LOCATION & CONTACT
Primary Location: ${intake.city}, ${intake.state}, ${intake.country || 'USA'}
Service Radius / Area: ${intake.serviceRadius || 'N/A'}
Multiple Locations: ${intake.isMultiLocation ? 'Yes' : 'No'}
Locations Served: ${(intake.locationsServed || []).join(', ') || 'N/A'}
Current Website: ${intake.websiteUrl || 'None'}
Phone: ${intake.phone || 'N/A'}
Email: ${intake.email || 'N/A'}

## TARGET AUDIENCE & PSYCHOLOGY
Ideal Customer: ${intake.targetAudience}
Age Range: ${intake.audienceAge || 'N/A'}
Income Level: ${intake.audienceIncome || 'N/A'}

Pain Points: ${intake.audiencePainPoints}
Desires & Aspirations: ${intake.audienceDesires || 'N/A'}
Deep Fears: ${intake.audienceFears || 'N/A'}
Buying Objections: ${intake.audienceObjections || 'N/A'}

## OFFER & VALUE
Primary Service / Product: ${intake.primaryService}
Secondary Services: ${intake.secondaryServices || 'N/A'}
All Services Offered: ${(intake.services || []).join(', ') || 'N/A'}
Unique Value Proposition: ${intake.uniqueValueProp}
Price Point: ${intake.pricePoint}
Results & Outcomes Delivered: ${intake.resultsOrOutcomes || 'N/A'}

## BRAND & ATMOSPHERE
Desired Atmosphere: ${intake.desiredAtmosphere || 'N/A'}
Desired Brand Style: ${intake.desiredBrandStyle || 'N/A'}
Desired Emotional Tone: ${intake.desiredEmotionalTone || 'N/A'}
Luxury Level (1-5): ${intake.luxuryLevel || 3}
Brand Personality: ${(intake.brandPersonality || []).join(', ') || 'N/A'}
Brand Voice: ${intake.brandVoice || 'N/A'}
Preferred Brand Colors (hex): ${(intake.brandColors || []).join(', ') || 'N/A'}
Existing Colors / Notes: ${intake.currentColors || 'N/A'}
Logo Description: ${intake.logoDescription || 'N/A'}
Imagery Notes: ${intake.imagesDescription || 'N/A'}

## SOCIAL PRESENCE
Social Media: ${socialSummary || 'N/A'}
Google Business Profile: ${intake.googleBusinessProfile || 'N/A'}

## SOCIAL PROOF
Testimonials:
${testimonialSummary || 'None provided'}

Reviews:
${reviewSummary || 'None provided'}

## GOALS & COMPETITION
Primary Website Goal: ${intake.primaryGoal}
Preferred CTA Style: ${intake.ctaPreference || 'N/A'}
Monthly Lead / Customer Goal: ${intake.monthlyLeadGoal || 'N/A'}
Revenue Goal: ${intake.revenueGoal || 'N/A'}
Main Competitors: ${(intake.competitors || []).join(', ') || 'N/A'}
Additional Notes: ${intake.additionalNotes || 'N/A'}

---

Return ONLY a JSON object with this exact structure. No markdown, no code fences, no explanation:

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

Be extremely specific to ${intake.businessName} in ${intake.city}, ${intake.state}.
Generate real, actionable, premium-quality strategic content.
Incorporate the brand colors (${(intake.brandColors||[]).join(', ')}) into colorSystem recommendations.
Align the CTA strategy with the preferred CTA style: ${intake.ctaPreference || 'best fit for industry'}.
Address each specific objection provided: ${intake.audienceObjections || 'use industry-common objections'}.
Include at least 6 page blueprints: homepage, 2-3 service pages, location page, about page, contact page.
Each page blueprint must have at least 6 detailed sections with real copy angles.`;
}
