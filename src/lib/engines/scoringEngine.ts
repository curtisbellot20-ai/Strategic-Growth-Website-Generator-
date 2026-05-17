import { BusinessIntake } from '@/types';

export function buildScoringPrompt(intake: BusinessIntake): string {
  const services = [
    ...(intake.services || []),
    intake.primaryService,
    intake.secondaryServices,
  ].filter(Boolean).join(', ') || 'Not specified';

  const hasSocialLinks = !!(
    intake.socialLinks?.instagram ||
    intake.socialLinks?.facebook  ||
    intake.socialLinks?.tiktok    ||
    intake.socialLinks?.youtube   ||
    intake.socialLinks?.linkedin
  );

  const socialSummary = Object.entries(intake.socialLinks || {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ') || 'None';

  const testimonialCount = (intake.testimonials || []).length;
  const reviewCount      = (intake.reviews || []).length;

  const check = (val: unknown, label: string) =>
    val ? `✅ ${typeof val === 'string' ? val.slice(0, 120) : label}` : `❌ Not provided`;

  return `You are a world-class Website Strategist and Digital Performance Auditor — expert across branding, SEO, CRO, UX, content strategy, and growth marketing.

You are scoring a website BLUEPRINT, not a live site. Score what this website WOULD achieve if built with the information below.

SCORING RULES:
- Be realistic, not generous. Most businesses score 4–7 without exceptional evidence.
- Scores of 8+ require strong, specific supporting data.
- Scores of 9–10 require exceptional, rare evidence.
- A missing field that is CRITICAL for that dimension should always pull the score down.
- Be consistent: the same level of data quality should produce similar scores across businesses.

BUSINESS PROFILE:
Business: ${intake.businessName}
Industry: ${intake.industry}
Business Type: ${intake.businessType || 'N/A'}
Location: ${intake.city}, ${intake.state}${intake.country ? ', ' + intake.country : ''}
Service Radius: ${intake.serviceRadius || 'Local'}
Years in Business: ${check(intake.yearsInBusiness, intake.yearsInBusiness || '')}
Team Size: ${intake.teamSize || 'Not specified'}

SERVICES:
Primary: ${intake.primaryService || 'Not specified'}
All Services: ${services}
Price Point: ${check(intake.pricePoint, intake.pricePoint || '')}
Results/Outcomes: ${check(intake.resultsOrOutcomes, intake.resultsOrOutcomes || '')}

TARGET AUDIENCE:
Ideal Customer: ${check(intake.targetAudience, intake.targetAudience || '')}
Age Range: ${intake.audienceAge || 'Not specified'}
Income Level: ${intake.audienceIncome || 'Not specified'}
Pain Points: ${check(intake.audiencePainPoints, intake.audiencePainPoints || '')}
Desires: ${check(intake.audienceDesires, intake.audienceDesires || '')}
Fears: ${check(intake.audienceFears, intake.audienceFears || '')}
Objections: ${check(intake.audienceObjections, intake.audienceObjections || '')}

BRAND:
Tagline: ${check(intake.tagline, intake.tagline || '')}
Unique Value Prop: ${check(intake.uniqueValueProp, intake.uniqueValueProp || '')}
Brand Voice: ${check(intake.brandVoice, intake.brandVoice || '')}
Brand Personality: ${(intake.brandPersonality || []).join(', ') || 'Not specified'}
Desired Atmosphere: ${check(intake.desiredAtmosphere, intake.desiredAtmosphere || '')}
Desired Style: ${check(intake.desiredBrandStyle, intake.desiredBrandStyle || '')}
Emotional Tone: ${check(intake.desiredEmotionalTone, intake.desiredEmotionalTone || '')}
Luxury Level: ${intake.luxuryLevel || 3}/5
Brand Colors: ${check(intake.brandColors?.length, (intake.brandColors || []).join(', '))}
Logo Description: ${check(intake.logoDescription, intake.logoDescription || '')}

SOCIAL PROOF:
Testimonials: ${testimonialCount > 0 ? `✅ ${testimonialCount} provided` : '❌ None provided'}
Reviews: ${reviewCount > 0 ? `✅ ${reviewCount} provided` : '❌ None provided'}
Google Business Profile: ${check(intake.googleBusinessProfile, intake.googleBusinessProfile || '')}

SOCIAL PRESENCE:
${hasSocialLinks ? '✅ ' + socialSummary : '❌ No social links provided'}

GOALS:
Primary Goal: ${intake.primaryGoal || 'Not specified'}
CTA Preference: ${intake.ctaPreference || 'Not specified'}
Monthly Lead Goal: ${intake.monthlyLeadGoal || 'Not specified'}
Revenue Goal: ${intake.revenueGoal || 'Not specified'}
Main Competitors: ${(intake.competitors || []).join(', ') || 'None listed'}

---

Score this blueprint across exactly 17 dimensions. For each dimension:
- score: integer 1–10 (honest, specific to the data above)
- grade: A+ (10), A (9), B+ (8), B (7), C+ (6), C (5), D (3–4), F (1–2)
- summary: one punchy verdict sentence
- why: 2–3 sentences citing specific data signals above
- missing: exactly 3–5 specific missing items
- improvements: exactly 3–5 specific actionable steps to reach 10/10
- quickWin: fastest single improvement action this week
- priority: critical (1–4) | high (5–6) | medium (7–8) | low (9+)

DIMENSIONS TO SCORE:

1. BRANDING: Clarity of identity, tagline sharpness, unique angle, voice, visual direction, memorability.
2. SEO: On-page potential, keyword strategy, content architecture, meta readiness, topical authority potential.
3. LOCAL SEO: Local search dominance, GMB readiness, city+service keyword potential, citation strategy, review velocity.
4. GEO: Generative Engine Optimization — readiness to appear in ChatGPT/Perplexity/Claude answers. Structured content depth, topical breadth, authority signals.
5. AEO: Answer Engine Optimization — FAQ potential, featured snippet readiness, voice search phrasing, schema markup viability.
6. SPEED: Performance readiness. Modern Next.js = 7–8 baseline. Adjust for expected media weight, animation complexity, third-party scripts.
7. MOBILE UX: Responsive design intent, thumb-friendly CTAs, sticky nav/CTA potential, form simplicity, touch-first thinking.
8. ACCESSIBILITY: WCAG compliance readiness. Color contrast given brand colors, alt text strategy, semantic markup, keyboard navigation.
9. CONVERSION: CRO strength — CTA clarity, friction reduction, objection handling data, funnel clarity, lead capture potential.
10. TRUST: Credibility — testimonials, years in business, certifications, guarantees, transparency signals. No testimonials = max score 6.
11. STORYTELLING: Narrative depth, before/after transformation clarity, emotional depth from pain/desire data, brand story richness.
12. ATMOSPHERE: Emotional immersion potential. Atmosphere defined? Luxury level appropriate to price point? Sensory language signals?
13. CREATIVE DESIGN: Visual distinctiveness. Brand colors + atmosphere + style all provided = higher. Generic/missing = lower.
14. CUSTOMER ACQUISITION: Lead gen potential, lead magnet viability, multi-channel funnel, email capture strategy.
15. RETENTION: Follow-up system viability, email sequence potential, loyalty mechanics, newsletter opportunity.
16. REFERRAL READINESS: Word-of-mouth potential, referral mechanic viability, customer satisfaction indicators, social sharing design.
17. ANALYTICS READINESS: Conversion tracking clarity, goal specificity, KPI definition, attribution model viability.

Return ONLY valid JSON:

{
  "businessName": "${intake.businessName}",
  "industry": "${intake.industry}",
  "overallScore": <weighted average of all 17 dimension scores, 1 decimal place>,
  "overallGrade": "<grade for overall score>",
  "scorePersonality": "<one-sentence verdict on this website's current growth readiness>",
  "scoreSummary": "<2-3 sentence executive summary: what the score means and the top priority>",
  "generatedAt": "${new Date().toISOString()}",
  "dimensions": [
    { "category": "Branding", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "SEO", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Local SEO", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "GEO", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "AEO", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Speed", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Mobile UX", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Accessibility", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Conversion", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Trust", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Storytelling", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Atmosphere", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Creative Design", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Customer Acquisition", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Retention", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Referral Readiness", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" },
    { "category": "Analytics Readiness", "score": 0, "grade": "", "summary": "", "why": "", "missing": [], "improvements": [], "quickWin": "", "priority": "" }
  ],
  "groupSummaries": [
    { "groupName": "Digital Presence", "averageScore": 0, "insight": "" },
    { "groupName": "Technical Performance", "averageScore": 0, "insight": "" },
    { "groupName": "Brand Experience", "averageScore": 0, "insight": "" },
    { "groupName": "Revenue Engine", "averageScore": 0, "insight": "" }
  ],
  "topStrengths": ["strength1", "strength2", "strength3"],
  "criticalGaps": ["gap1", "gap2", "gap3"],
  "quickWins": ["win1", "win2", "win3", "win4", "win5"],
  "thirtyDayImprovementPlan": ["week1", "week2", "week3", "week4"]
}

Compute groupSummaries averages:
- Digital Presence: avg(SEO, Local SEO, GEO, AEO)
- Technical Performance: avg(Speed, Mobile UX, Accessibility, Analytics Readiness)
- Brand Experience: avg(Branding, Atmosphere, Creative Design, Storytelling)
- Revenue Engine: avg(Trust, Conversion, Customer Acquisition, Retention, Referral Readiness)`;
}
