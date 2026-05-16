import { BusinessIntake } from '@/types';

export function buildScoringPrompt(intake: BusinessIntake): string {
  const hasTestimonials      = (intake.testimonials     || []).length > 0;
  const hasPainPoints        = (intake.audiencePainPoints  || []).length > 0;
  const hasDesires           = (intake.audienceDesires     || []).length > 0;
  const hasFears             = (intake.audienceFears       || []).length > 0;
  const hasObjections        = (intake.audienceObjections  || []).length > 0;
  const hasSocialLinks       = !!(intake.instagram || intake.facebook || intake.tiktok || intake.youtube || intake.linkedin);
  const hasUniqueAngle       = !!(intake.uniqueDifferentiator);
  const hasTagline           = !!(intake.tagline);
  const hasBrandColors       = !!(intake.brandPrimaryColor);
  const hasAwards            = !!(intake.awardsAndCertifications);
  const hasYears             = !!(intake.yearsInBusiness);
  const hasPrice             = !!(intake.priceRange);
  const hasBrandAtmosphere   = !!(intake.brandAtmosphere);
  const hasLogo              = !!(intake.logoDescription);

  return `You are a world-class Website Strategist and Digital Performance Auditor with expertise across branding, SEO, conversion optimization, UX, content strategy, and growth marketing.

You are scoring a website BLUEPRINT — meaning: score what this website WOULD achieve if fully implemented using the business information provided. Be honest and specific. Most businesses score 4–7 in most dimensions without exceptional data. Scores of 9–10 require strong evidence.

BUSINESS PROFILE:
- Business: ${intake.businessName}
- Industry: ${intake.industry}
- Location: ${intake.city}, ${intake.state}
- Services: ${intake.services}
- Target Customer: ${intake.targetCustomer}
- Tagline provided: ${hasTagline ? '✅ ' + intake.tagline : '❌ Not provided'}
- Unique Differentiator: ${hasUniqueAngle ? '✅ ' + intake.uniqueDifferentiator : '❌ Not specified'}
- Brand Colors: ${hasBrandColors ? '✅ Provided' : '❌ Not provided'}
- Brand Atmosphere: ${hasBrandAtmosphere ? '✅ ' + intake.brandAtmosphere : '❌ Not provided'}
- Logo Description: ${hasLogo ? '✅ Provided' : '❌ Not provided'}
- Tone of Voice: ${intake.toneOfVoice || 'not specified'}
- Luxury Level: ${intake.luxuryLevel || 5}/10
- Price Range: ${hasPrice ? intake.priceRange : 'not specified'}
- Years in Business: ${hasYears ? intake.yearsInBusiness : 'not specified'}
- Awards/Certifications: ${hasAwards ? intake.awardsAndCertifications : 'none provided'}
- Testimonials: ${hasTestimonials ? '✅ ' + (intake.testimonials || []).length + ' provided' : '❌ None provided'}
- Customer Pain Points: ${hasPainPoints ? '✅ ' + (intake.audiencePainPoints || []).join(', ') : '❌ Not specified'}
- Customer Desires: ${hasDesires ? '✅ ' + (intake.audienceDesires || []).join(', ') : '❌ Not specified'}
- Customer Fears: ${hasFears ? '✅ ' + (intake.audienceFears || []).join(', ') : '❌ Not specified'}
- Customer Objections: ${hasObjections ? '✅ ' + (intake.audienceObjections || []).join(', ') : '❌ Not specified'}
- Social Media Present: ${hasSocialLinks ? '✅ Provided' : '❌ Not linked'}
- Primary Goal: ${intake.primaryGoal || 'not specified'}

Score this website blueprint across exactly 17 dimensions. For each:
- score: integer 1-10 (be realistic, not generous)
- grade: use "A+" for 10, "A" for 9, "B" for 7-8, "C" for 5-6, "D" for 3-4, "F" for 1-2
- summary: one punchy sentence stating the score verdict
- why: 2-3 sentences explaining the specific reasons for this score based on data provided
- missing: 3-5 specific things missing that are holding back a higher score
- improvements: 3-5 specific, actionable steps to reach 10/10
- quickWin: the single fastest action to improve this score this week
- priority: "critical" (score 1-4), "high" (score 5-6), "medium" (score 7-8), "low" (score 9+)

SCORING RUBRIC BY DIMENSION:

1. BRANDING (1-10): Brand clarity, differentiation, voice, visual identity signals, memorability. Score down for: no tagline, no unique angle, vague services, undefined tone. Score up for: sharp positioning, clear voice, distinctive identity.

2. SEO (1-10): On-page optimization potential, keyword strategy, content architecture, meta strategy, schema readiness. Score down for: no keyword signals, generic services copy. Score up for: local + service specificity, long-tail content opportunity.

3. LOCAL SEO (1-10): Local search dominance potential. Score down for: no location signals, no GMB strategy signals, no local citations plan. Score up for: city/service combos, local schema, review strategy.

4. GEO (1-10): Generative Engine Optimization — readiness to appear in AI search results (ChatGPT, Perplexity, Claude). Score based on: structured content depth, answer-format content, authority signals, topical coverage breadth.

5. AEO (1-10): Answer Engine Optimization — FAQ structure, featured snippet readiness, voice search optimization, question-answer content format, schema markup.

6. SPEED (1-10): Performance optimization readiness. Score based on: content complexity, image-heavy expectations, animation use, tech stack. Most modern Next.js builds score 7-8 as baseline. Score down for: heavy media, complex animations without optimization plan.

7. MOBILE UX (1-10): Mobile experience quality. Score based on: responsive design intent, thumb-friendly CTA placement, sticky mobile elements, form simplicity, touch interactions.

8. ACCESSIBILITY (1-10): WCAG compliance readiness. Score based on: alt text strategy, color contrast, semantic markup, keyboard navigation, screen reader readiness. Score down for: no explicit accessibility planning.

9. CONVERSION (1-10): CRO strength. Score based on: CTA clarity, trust signals, friction reduction, objection handling, funnel clarity, lead capture strategy. Score up for: strong intake data on objections and desires.

10. TRUST (1-10): Credibility signals. Score based on: testimonials provided, years in business, awards, certifications, guarantees planned, transparency signals. Score heavily down for no testimonials.

11. STORYTELLING (1-10): Narrative power. Score based on: transformation clarity, emotional depth, before/after potential, brand story richness, customer journey clarity. Score up for: strong pain/desire data.

12. ATMOSPHERE (1-10): Emotional immersion potential. Score based on: brand atmosphere defined, luxury level appropriate to industry, tone consistency, sensory language signals.

13. CREATIVE DESIGN (1-10): Visual distinctiveness potential. Score based on: brand color provided, atmosphere defined, differentiation signals, industry creative expectations vs what was provided.

14. CUSTOMER ACQUISITION (1-10): Lead generation potential. Score based on: lead magnet viability, CTA strength, email capture strategy signals, funnel clarity, entry point diversity.

15. RETENTION (1-10): Customer lifecycle potential. Score based on: follow-up system viability, newsletter potential, loyalty signals, reactivation capability given data available.

16. REFERRAL READINESS (1-10): Word-of-mouth potential. Score based on: testimonial culture signals, referral mechanic viability, customer satisfaction indicators, shareable experience design.

17. ANALYTICS READINESS (1-10): Measurement infrastructure. Score based on: conversion tracking clarity, goal definition specificity, KPI identification, attribution model viability given the business type.

Return ONLY a single valid JSON object:

{
  "businessName": "${intake.businessName}",
  "industry": "${intake.industry}",
  "overallScore": <average of all 17 scores, 1 decimal>,
  "overallGrade": "<grade for overall score>",
  "scorePersonality": "one-sentence verdict on this website's current standing",
  "scoreSummary": "2-3 sentence executive summary of what this score means for the business",
  "generatedAt": "${new Date().toISOString()}",

  "dimensions": [
    {
      "category": "Branding",
      "score": <1-10>,
      "grade": "<grade>",
      "summary": "one punchy sentence verdict",
      "why": "2-3 sentences with specific reasons",
      "missing": ["missing item 1", "missing item 2", "missing item 3"],
      "improvements": ["improvement 1", "improvement 2", "improvement 3"],
      "quickWin": "the fastest single action to improve this score",
      "priority": "<critical|high|medium|low>"
    },
    { "category": "SEO", ... },
    { "category": "Local SEO", ... },
    { "category": "GEO", ... },
    { "category": "AEO", ... },
    { "category": "Speed", ... },
    { "category": "Mobile UX", ... },
    { "category": "Accessibility", ... },
    { "category": "Conversion", ... },
    { "category": "Trust", ... },
    { "category": "Storytelling", ... },
    { "category": "Atmosphere", ... },
    { "category": "Creative Design", ... },
    { "category": "Customer Acquisition", ... },
    { "category": "Retention", ... },
    { "category": "Referral Readiness", ... },
    { "category": "Analytics Readiness", ... }
  ],

  "groupSummaries": [
    { "groupName": "Digital Presence", "averageScore": <avg of SEO + Local SEO + GEO + AEO>, "insight": "one insight" },
    { "groupName": "Technical Performance", "averageScore": <avg of Speed + Mobile UX + Accessibility + Analytics Readiness>, "insight": "one insight" },
    { "groupName": "Brand Experience", "averageScore": <avg of Branding + Atmosphere + Creative Design + Storytelling>, "insight": "one insight" },
    { "groupName": "Revenue Engine", "averageScore": <avg of Trust + Conversion + Customer Acquisition + Retention + Referral Readiness>, "insight": "one insight" }
  ],

  "topStrengths": ["strength 1", "strength 2", "strength 3"],
  "criticalGaps": ["gap 1", "gap 2", "gap 3"],
  "quickWins": ["quick win 1", "quick win 2", "quick win 3", "quick win 4", "quick win 5"],
  "thirtyDayImprovementPlan": ["week 1 focus", "week 2 focus", "week 3 focus", "week 4 focus"]
}`;
}
