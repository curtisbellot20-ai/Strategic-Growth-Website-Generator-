import { BusinessIntake } from '@/types';

export function buildAcquisitionPrompt(intake: BusinessIntake): string {
  const pains      = (intake.audiencePainPoints  || []).join(', ') || 'not specified';
  const desires    = (intake.audienceDesires     || []).join(', ') || 'not specified';
  const fears      = (intake.audienceFears       || []).join(', ') || 'not specified';
  const objections = (intake.audienceObjections  || []).join(', ') || 'not specified';
  const testimonials = (intake.testimonials      || []).join(' | ') || 'none provided';

  return `You are a world-class Conversion Rate Optimization expert, Growth Marketing strategist, and Customer Acquisition specialist. You have built high-converting funnels for hundreds of businesses and understand buyer psychology at a deep level.

BUSINESS CONTEXT:
- Business: ${intake.businessName}
- Industry: ${intake.industry}
- Location: ${intake.city}, ${intake.state}
- Services: ${intake.services}
- Tagline: ${intake.tagline || 'not provided'}
- Unique Differentiator: ${intake.uniqueDifferentiator || 'not specified'}
- Target Customer: ${intake.targetCustomer}
- Price Range: ${intake.priceRange || 'not specified'}
- Luxury Level: ${intake.luxuryLevel || 5}/10
- Tone of Voice: ${intake.toneOfVoice || 'professional'}
- Primary Goal: ${intake.primaryGoal || 'generate leads'}
- Customer Pain Points: ${pains}
- Customer Desires: ${desires}
- Customer Fears: ${fears}
- Customer Objections: ${objections}
- Existing Testimonials: ${testimonials}
- Social Proof: ${intake.yearsInBusiness ? intake.yearsInBusiness + ' years in business' : ''} ${intake.awardsAndCertifications ? '| ' + intake.awardsAndCertifications : ''}

Generate a comprehensive Conversion & Customer Acquisition Report for this specific business. Every piece of copy must use the actual business name and be tailored to this exact industry, customer psychology, and service offering. Write publish-ready copy — never placeholders like [INSERT NAME].

Return ONLY a single valid JSON object matching this exact structure. No markdown fences, no explanation, no extra text:

{
  "businessName": "${intake.businessName}",
  "industry": "${intake.industry}",
  "acquisitionPersonality": "one sentence describing this brand's unique acquisition approach",
  "primaryConversionGoal": "the single most important conversion action for this business",
  "generatedAt": "${new Date().toISOString()}",

  "heroCTA": {
    "headline": "powerful, specific, benefit-led hero headline for ${intake.businessName}",
    "subheadline": "supporting subheadline deepening the value promise",
    "primaryCTA": "strong action-oriented button text",
    "secondaryCTA": "softer secondary option text",
    "microCopy": "trust-building sentence below the primary CTA button",
    "socialProofNote": "brief social proof near the CTA (e.g. '200+ happy clients')",
    "visualRecommendation": "specific visual and layout recommendation for the hero section",
    "rationale": "why this headline and CTA approach works for this audience"
  },

  "stickyMobileCTA": {
    "primaryText": "short action text for sticky mobile bar",
    "secondaryText": "supporting text or phone number",
    "iconSuggestion": "lucide-react icon name",
    "triggerBehavior": "when/how it appears (e.g., after 40% scroll, after 10 seconds)",
    "colorGuidance": "color recommendation that stands out",
    "abVariants": ["variant A text", "variant B text", "variant C text"]
  },

  "trustBar": {
    "headline": "optional trust bar headline or empty string",
    "items": [
      { "type": "stat",          "label": "label", "value": "value", "supportingText": "context" },
      { "type": "years",         "label": "label", "value": "value", "supportingText": "context" },
      { "type": "guarantee",     "label": "label", "value": "value", "supportingText": "context" },
      { "type": "award",         "label": "label", "value": "value", "supportingText": "context" },
      { "type": "certification", "label": "label", "value": "value", "supportingText": "context" }
    ],
    "placement": "where this trust bar sits on the page",
    "designNote": "visual design recommendation"
  },

  "testimonialStrategy": {
    "sectionHeadline": "compelling testimonials section headline",
    "format": "recommended display format",
    "count": 6,
    "selectionCriteria": ["criterion 1", "criterion 2", "criterion 3", "criterion 4"],
    "displayStyle": "wall of love / featured + grid / carousel / etc.",
    "videoVsText": "recommendation on video vs text ratio and why",
    "placementZones": ["zone 1", "zone 2", "zone 3"],
    "promptQuestions": ["question to request from customers 1", "question 2", "question 3", "question 4", "question 5"]
  },

  "beforeAfterSection": {
    "headline": "before/after section headline",
    "subheadline": "subheadline",
    "pairs": [
      { "before": "specific before state", "after": "specific after state", "context": "who this is for / scenario" },
      { "before": "before state 2", "after": "after state 2", "context": "scenario 2" },
      { "before": "before state 3", "after": "after state 3", "context": "scenario 3" }
    ],
    "format": "side-by-side / split / accordion / slider",
    "emotionalCore": "the emotional transformation being illustrated",
    "ctaAfter": "CTA that appears directly after this section"
  },

  "faqStrategy": {
    "sectionHeadline": "FAQ section headline",
    "items": [
      { "question": "real question this audience asks", "answer": "thorough, trust-building answer", "category": "category", "conversionIntent": "what conversion role this FAQ plays" },
      { "question": "Q2", "answer": "A2", "category": "cat", "conversionIntent": "intent" },
      { "question": "Q3", "answer": "A3", "category": "cat", "conversionIntent": "intent" },
      { "question": "Q4", "answer": "A4", "category": "cat", "conversionIntent": "intent" },
      { "question": "Q5", "answer": "A5", "category": "cat", "conversionIntent": "intent" },
      { "question": "Q6", "answer": "A6", "category": "cat", "conversionIntent": "intent" },
      { "question": "Q7", "answer": "A7", "category": "cat", "conversionIntent": "intent" },
      { "question": "Q8", "answer": "A8", "category": "cat", "conversionIntent": "intent" }
    ],
    "structuredDataNote": "FAQ schema markup implementation note",
    "placement": "recommended page placement"
  },

  "objectionSection": {
    "sectionHeadline": "objection handling section headline",
    "handlers": [
      { "objection": "real objection from this audience", "reframe": "how to reframe it positively", "copyBlock": "actual publish-ready copy to use on the website", "placement": "where on the page this works best" },
      { "objection": "objection 2", "reframe": "reframe", "copyBlock": "copy", "placement": "placement" },
      { "objection": "objection 3", "reframe": "reframe", "copyBlock": "copy", "placement": "placement" },
      { "objection": "objection 4", "reframe": "reframe", "copyBlock": "copy", "placement": "placement" },
      { "objection": "objection 5", "reframe": "reframe", "copyBlock": "copy", "placement": "placement" }
    ],
    "designRecommendation": "how to visually present these objection handlers"
  },

  "finalCTA": {
    "headline": "powerful closing section headline",
    "subheadline": "closing subheadline that reinforces the transformation",
    "primaryCTA": "final action button text",
    "microCopy": "trust copy below the button",
    "guarantee": "guarantee or risk-reversal statement",
    "urgencyNote": "ethical urgency if genuinely applicable, or empty string",
    "designStyle": "recommended visual style for this final CTA section"
  },

  "nextSteps": {
    "headline": "next steps section headline",
    "steps": [
      { "step": 1, "action": "first step name", "detail": "what happens in plain language", "icon": "lucide icon name" },
      { "step": 2, "action": "second step name", "detail": "what happens", "icon": "lucide icon name" },
      { "step": 3, "action": "third step name", "detail": "what happens", "icon": "lucide icon name" }
    ],
    "clearestPath": "one sentence: the clearest path from first visit to paying customer"
  },

  "leadMagnets": [
    {
      "title": "specific lead magnet title",
      "format": "PDF / video / tool / quiz / template",
      "topic": "what it covers",
      "valueProposition": "why someone would want this badly enough to give their email",
      "deliveryMethod": "how it is delivered",
      "ctaText": "button text to get it",
      "landingPageHeadline": "headline for the lead magnet landing page",
      "emailSequenceSuggestion": "what the automated follow-up sequence should accomplish"
    },
    { "title": "", "format": "", "topic": "", "valueProposition": "", "deliveryMethod": "", "ctaText": "", "landingPageHeadline": "", "emailSequenceSuggestion": "" },
    { "title": "", "format": "", "topic": "", "valueProposition": "", "deliveryMethod": "", "ctaText": "", "landingPageHeadline": "", "emailSequenceSuggestion": "" }
  ],

  "freeGuides": [
    {
      "title": "guide title",
      "subtitle": "guide subtitle",
      "chapters": ["chapter 1", "chapter 2", "chapter 3", "chapter 4", "chapter 5"],
      "targetProblem": "problem this guide solves",
      "deliveryFormat": "PDF / email sequence / gated page",
      "ctaText": "download CTA text"
    },
    { "title": "", "subtitle": "", "chapters": [], "targetProblem": "", "deliveryFormat": "", "ctaText": "" },
    { "title": "", "subtitle": "", "chapters": [], "targetProblem": "", "deliveryFormat": "", "ctaText": "" }
  ],

  "pricingGuides": [
    {
      "title": "pricing guide title",
      "premise": "why this pricing guide helps buyers and builds trust",
      "sections": ["section 1", "section 2", "section 3", "section 4"],
      "psychologyNote": "the psychological benefit of offering a transparent pricing guide",
      "ctaAfterDownload": "what to offer them after they download"
    },
    { "title": "", "premise": "", "sections": [], "psychologyNote": "", "ctaAfterDownload": "" }
  ],

  "checklists": [
    {
      "title": "checklist title",
      "items": ["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8"],
      "useCase": "when and why someone uses this checklist",
      "ctaText": "download CTA text",
      "printFriendly": true
    },
    { "title": "", "items": [], "useCase": "", "ctaText": "", "printFriendly": true },
    { "title": "", "items": [], "useCase": "", "ctaText": "", "printFriendly": false }
  ],

  "consultationFunnel": {
    "funnelName": "name of this consultation funnel",
    "entryPoints": ["entry point 1", "entry point 2", "entry point 3"],
    "steps": [
      { "step": 1, "name": "step name", "action": "what the visitor does", "goal": "business goal for this step", "copy": "publish-ready copy for this step" },
      { "step": 2, "name": "", "action": "", "goal": "", "copy": "" },
      { "step": 3, "name": "", "action": "", "goal": "", "copy": "" },
      { "step": 4, "name": "", "action": "", "goal": "", "copy": "" },
      { "step": 5, "name": "", "action": "", "goal": "", "copy": "" }
    ],
    "bookingPlatformSuggestion": "best booking tool for this business type",
    "confirmationEmailCopy": "what the confirmation email says",
    "reminderSequence": ["24-hour reminder content", "1-hour reminder content", "day-after follow-up content"],
    "noShowStrategy": "how to ethically re-engage no-shows",
    "followUpSequence": ["day 1 follow-up", "day 3 follow-up", "day 7 follow-up", "day 14 follow-up"]
  },

  "emailCapture": {
    "primaryOffer": "the primary reason someone gives their email",
    "placementZones": ["zone 1", "zone 2", "zone 3", "zone 4"],
    "formHeadlines": ["headline variant 1", "variant 2", "variant 3"],
    "segmentationApproach": "how to segment and tag the email list",
    "welcomeEmailSubject": "subject line for the welcome email",
    "welcomeSequence": ["email 1 purpose", "email 2 purpose", "email 3 purpose", "email 4 purpose", "email 5 purpose"],
    "automationTips": ["tip 1", "tip 2", "tip 3", "tip 4"]
  },

  "smsCapture": {
    "offer": "what is offered in exchange for SMS opt-in",
    "optInMechanism": "how they opt in",
    "keywordTrigger": "SMS keyword they text to subscribe",
    "initialMessage": "the first SMS message they receive (160 chars max)",
    "followUpFlow": ["follow-up 1", "follow-up 2", "follow-up 3"],
    "complianceReminder": "TCPA compliance note"
  },

  "contactForm": {
    "headline": "contact form section headline",
    "fields": ["field 1", "field 2", "field 3", "field 4", "field 5"],
    "submitButtonText": "submit button text",
    "confirmationMessage": "what happens immediately after submission",
    "notificationStrategy": "how and how fast the business is notified",
    "responseTimeCopy": "copy that sets response time expectations"
  },

  "retargeting": {
    "overview": "overall retargeting strategy summary for this business",
    "audiences": [
      { "name": "audience name", "definition": "who this audience is", "messagingAngle": "what message angle works for them", "offerIdea": "what to offer this segment", "platform": "best platform for this audience" },
      { "name": "", "definition": "", "messagingAngle": "", "offerIdea": "", "platform": "" },
      { "name": "", "definition": "", "messagingAngle": "", "offerIdea": "", "platform": "" },
      { "name": "", "definition": "", "messagingAngle": "", "offerIdea": "", "platform": "" }
    ],
    "platforms": ["platform 1", "platform 2", "platform 3"],
    "budgetGuidance": "budget allocation guidance",
    "creativeIdeas": ["creative idea 1", "idea 2", "idea 3", "idea 4"],
    "sequenceLogic": "how the retargeting sequence unfolds over time"
  },

  "socialContent": {
    "overview": "social media content strategy overview for this business",
    "platforms": [
      {
        "platform": "platform name",
        "contentPillars": ["pillar 1", "pillar 2", "pillar 3"],
        "postingCadence": "recommended posting frequency",
        "formatMix": ["format 1", "format 2", "format 3"],
        "topPostIdeas": ["idea 1", "idea 2", "idea 3", "idea 4", "idea 5"],
        "hashtagStrategy": "hashtag recommendation"
      },
      { "platform": "", "contentPillars": [], "postingCadence": "", "formatMix": [], "topPostIdeas": [], "hashtagStrategy": "" },
      { "platform": "", "contentPillars": [], "postingCadence": "", "formatMix": [], "topPostIdeas": [], "hashtagStrategy": "" }
    ],
    "viralHooks": ["hook 1", "hook 2", "hook 3", "hook 4", "hook 5"],
    "contentCalendarNote": "content calendar and batch creation recommendation"
  },

  "referralCampaigns": [
    {
      "campaignName": "campaign name",
      "mechanic": "how the referral system works",
      "referrerIncentive": "what the referring customer receives",
      "refereeIncentive": "what the new customer receives",
      "messagingTemplate": "the referral ask message/script",
      "askCopy": "the exact words to use when asking for a referral",
      "trackingMethod": "how to track referrals",
      "launchSequence": ["step 1", "step 2", "step 3", "step 4"],
      "successMetrics": ["metric 1", "metric 2", "metric 3"]
    },
    { "campaignName": "", "mechanic": "", "referrerIncentive": "", "refereeIncentive": "", "messagingTemplate": "", "askCopy": "", "trackingMethod": "", "launchSequence": [], "successMetrics": [] }
  ],

  "conversionPrinciples": ["principle 1", "principle 2", "principle 3", "principle 4", "principle 5"],
  "priorityActions": ["action 1", "action 2", "action 3", "action 4", "action 5"],
  "thirtyDayPlan": ["week 1 focus", "week 2 focus", "week 3 focus", "week 4 focus"]
}`;
}
