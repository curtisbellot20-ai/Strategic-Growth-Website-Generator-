import { BusinessIntake } from '@/types';

export function buildRetentionPrompt(intake: BusinessIntake): string {
  const pains      = (intake.audiencePainPoints  || []).join(', ') || 'not specified';
  const desires    = (intake.audienceDesires     || []).join(', ') || 'not specified';
  const fears      = (intake.audienceFears       || []).join(', ') || 'not specified';
  const objections = (intake.audienceObjections  || []).join(', ') || 'not specified';
  const testimonials = (intake.testimonials      || []).join(' | ') || 'none provided';

  return `You are a world-class Customer Retention Strategist, Lifecycle Marketing expert, and Referral Growth specialist. You have built retention systems that turn one-time buyers into lifetime advocates for businesses across every industry.

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
- Primary Goal: ${intake.primaryGoal || 'retain and grow existing customers'}
- Customer Pain Points: ${pains}
- Customer Desires: ${desires}
- Customer Fears: ${fears}
- Customer Objections: ${objections}
- Existing Testimonials: ${testimonials}
- Years in Business: ${intake.yearsInBusiness || 'not specified'}
- Awards/Certifications: ${intake.awardsAndCertifications || 'not specified'}

Generate a comprehensive Retention & Referral Report. Every email, headline, and piece of copy must:
1. Use the actual business name "${intake.businessName}" — never placeholders like [Business Name]
2. Be tailored to the ${intake.industry} industry and this specific customer psychology
3. Be publish-ready copy — not descriptions, not templates with [INSERT CONTENT]
4. Match the ${intake.toneOfVoice || 'professional'} tone of voice
5. Reflect a luxury level of ${intake.luxuryLevel || 5}/10

CRITICAL: The follow-up sequence MUST follow this exact structure:
- Day 1: Trust-building email (welcome, story, mission, no hard sell)
- Day 3: Case study or transformation (before/after, industry-specific proof)
- Day 5: Testimonial proof (social proof, multiple voices)
- Day 7: CTA reminder (soft recap, clear action, one objection addressed)
- Day 14: Educational value (teach something genuinely useful, trusted advisor positioning)

Adapt all email copy to the ${intake.industry} industry. For example:
- Salon/beauty: transformation = hair/skin before-after story
- Law firm: transformation = case resolution, peace of mind
- Restaurant: educational = cooking tip or ingredient story
- Fitness: case study = client weight loss / performance journey
- Medical/dental: Day 3 = patient success story with care and privacy
- Real estate: Day 3 = deal they helped someone win
- Contractor: Day 3 = project transformation photos/story

Return ONLY a single valid JSON object. No markdown fences, no explanation text.

{
  "businessName": "${intake.businessName}",
  "industry": "${intake.industry}",
  "retentionPersonality": "one sentence: this brand's unique retention philosophy",
  "primaryRetentionGoal": "the single most important retention outcome for this business",
  "generatedAt": "${new Date().toISOString()}",

  "followUpSequence": {
    "sequenceName": "name for this email sequence",
    "trigger": "what triggers this sequence (e.g., new inquiry, first appointment, purchase)",
    "industryAdaptation": "how this sequence is specifically adapted for the ${intake.industry} industry",
    "conversionGoal": "what this sequence ultimately converts toward",
    "exitCondition": "what stops the sequence (e.g., they book, they reply, they purchase)",
    "adaptationGuide": "how to adapt this sequence for different scenarios or seasons",
    "emails": [
      {
        "day": 1,
        "type": "trust-building",
        "subject": "compelling subject line (not generic)",
        "previewText": "preview text that makes them open it",
        "body": "full email body (3-5 paragraphs, publish-ready, warm and genuine, introduces ${intake.businessName}, shares story or mission, sets warm expectations, zero hard sell)",
        "cta": "soft CTA text",
        "goal": "establish trust and begin relationship",
        "toneNote": "tone guidance for this email",
        "industryAdaptation": "how Day 1 is specifically adapted for ${intake.industry}"
      },
      {
        "day": 3,
        "type": "case-study",
        "subject": "subject line that hints at transformation or result",
        "previewText": "preview text",
        "body": "full email body (3-5 paragraphs) — tell a specific before/after story relevant to ${intake.industry}. Use a real-feeling client scenario. Show the emotional journey. Do NOT use client names without consent — use 'a client', 'one of our customers', etc.",
        "cta": "CTA that invites them to get similar results",
        "goal": "demonstrate real results and build credibility",
        "toneNote": "tone guidance",
        "industryAdaptation": "the specific type of transformation shown for ${intake.industry}"
      },
      {
        "day": 5,
        "type": "testimonial-proof",
        "subject": "subject line featuring social proof angle",
        "previewText": "preview text",
        "body": "full email body (3-4 paragraphs) — lead with a compelling testimonial quote, then add 2-3 more proof points (reviews, stats, recognition), close by connecting proof to what this prospect could experience",
        "cta": "CTA to take the next step",
        "goal": "overwhelm with credible social proof",
        "toneNote": "tone guidance",
        "industryAdaptation": "what type of proof resonates most in ${intake.industry}"
      },
      {
        "day": 7,
        "type": "cta-reminder",
        "subject": "subject line that creates gentle forward momentum",
        "previewText": "preview text",
        "body": "full email body (2-3 paragraphs) — brief recap of value, address the #1 objection directly and ethically, make the next step feel easy and low-risk, clear and confident CTA",
        "cta": "clear CTA button text",
        "goal": "convert hesitant prospects by reducing friction and addressing fear",
        "toneNote": "tone guidance",
        "industryAdaptation": "the specific objection addressed for ${intake.industry} customers"
      },
      {
        "day": 14,
        "type": "educational-value",
        "subject": "subject line that promises genuine learning value",
        "previewText": "preview text",
        "body": "full email body (4-5 paragraphs) — teach something genuinely useful related to ${intake.industry} that this customer would value even if they never hire ${intake.businessName}. Position as trusted advisor. End with a soft, no-pressure invitation.",
        "cta": "low-pressure CTA",
        "goal": "position as trusted advisor, re-engage cold prospects with pure value",
        "toneNote": "tone guidance",
        "industryAdaptation": "the specific educational topic chosen for ${intake.industry}"
      }
    ]
  },

  "newsletterStrategy": {
    "name": "newsletter name branded to ${intake.businessName}",
    "tagline": "newsletter tagline",
    "frequency": "recommended send frequency",
    "bestDayTime": "best day and time to send",
    "contentPillars": ["pillar 1", "pillar 2", "pillar 3", "pillar 4"],
    "sampleIssues": [
      { "issueNumber": 1, "subject": "subject", "previewText": "preview", "contentTheme": "theme", "valueOffer": "what value it delivers", "cta": "cta" },
      { "issueNumber": 2, "subject": "subject", "previewText": "preview", "contentTheme": "theme", "valueOffer": "value", "cta": "cta" },
      { "issueNumber": 3, "subject": "subject", "previewText": "preview", "contentTheme": "theme", "valueOffer": "value", "cta": "cta" },
      { "issueNumber": 4, "subject": "subject", "previewText": "preview", "contentTheme": "theme", "valueOffer": "value", "cta": "cta" }
    ],
    "growthTactics": ["tactic 1", "tactic 2", "tactic 3", "tactic 4"],
    "segmentationApproach": "how to segment newsletter subscribers",
    "subjectLineFormulas": ["formula 1", "formula 2", "formula 3", "formula 4", "formula 5"],
    "unsubscribeReductionTip": "one specific tip to reduce unsubscribes for this audience"
  },

  "loyaltyProgram": {
    "programName": "loyalty program name for ${intake.businessName}",
    "premise": "the core value proposition of joining this loyalty program",
    "earnMechanic": "how customers earn points or status",
    "redeemMechanic": "how they redeem rewards",
    "enrollmentCTA": "enrollment button/link text",
    "launchCopy": "the launch announcement email copy (2-3 paragraphs)",
    "techSuggestion": "recommended platform or tool for managing this program",
    "tiers": [
      { "name": "entry tier name", "threshold": "qualification threshold", "perks": ["perk 1", "perk 2", "perk 3"], "badge": "emoji badge", "emotionalAppeal": "what makes this tier feel special" },
      { "name": "mid tier name", "threshold": "threshold", "perks": ["perk 1", "perk 2", "perk 3", "perk 4"], "badge": "emoji badge", "emotionalAppeal": "appeal" },
      { "name": "top tier name", "threshold": "threshold", "perks": ["perk 1", "perk 2", "perk 3", "perk 4", "perk 5"], "badge": "emoji badge", "emotionalAppeal": "appeal" }
    ]
  },

  "vipProgram": {
    "overview": "overview of the VIP program concept",
    "qualificationCriteria": "how customers qualify for VIP status",
    "announcementCopy": "how to announce the VIP program publicly",
    "invitationSubject": "VIP invitation email subject line",
    "invitationBody": "full VIP invitation email body (3-4 paragraphs, exclusive tone, makes them feel truly special)",
    "offers": [
      { "name": "offer name", "trigger": "when this is offered", "offer": "what exactly is offered", "copy": "the actual copy/message delivering this offer", "deliveryMethod": "how it is delivered", "exclusivityAngle": "what makes it feel exclusive" },
      { "name": "", "trigger": "", "offer": "", "copy": "", "deliveryMethod": "", "exclusivityAngle": "" },
      { "name": "", "trigger": "", "offer": "", "copy": "", "deliveryMethod": "", "exclusivityAngle": "" },
      { "name": "", "trigger": "", "offer": "", "copy": "", "deliveryMethod": "", "exclusivityAngle": "" }
    ]
  },

  "reactivationCampaign": {
    "campaignName": "campaign name (e.g. 'We Miss You')",
    "triggerCondition": "what inactivity triggers this campaign",
    "winBackOffer": "the win-back incentive offer",
    "winBackCopy": "the key win-back message (1-2 sentences)",
    "sunsetPolicy": "how long before you stop contacting unresponsive contacts",
    "sunsetSubject": "the final 'last email' subject line",
    "sunsetBody": "the final sunset email body (2-3 paragraphs, graceful, leaves door open)",
    "emails": [
      { "touchNumber": 1, "daysSinceLastContact": 30, "subject": "subject", "previewText": "preview", "body": "full email body (2-3 paragraphs)", "cta": "cta", "tone": "warm, no guilt" },
      { "touchNumber": 2, "daysSinceLastContact": 45, "subject": "subject", "previewText": "preview", "body": "full email body", "cta": "cta", "tone": "curious, light" },
      { "touchNumber": 3, "daysSinceLastContact": 60, "subject": "subject", "previewText": "preview", "body": "full email body", "cta": "cta", "tone": "value-forward, last offer" }
    ]
  },

  "anniversaryCampaign": {
    "overview": "how this campaign celebrates and deepens customer relationships over time",
    "emotionalTone": "the emotional tone of this campaign",
    "automationNote": "how to automate these touchpoints",
    "touches": [
      { "milestone": "1-month anniversary", "touchpointType": "email", "subject": "subject line", "body": "email body (2-3 paragraphs)", "offer": "special offer or gesture", "channel": "email" },
      { "milestone": "6-month anniversary", "touchpointType": "email + gift", "subject": "subject", "body": "body", "offer": "offer", "channel": "email" },
      { "milestone": "1-year anniversary", "touchpointType": "email + handwritten note", "subject": "subject", "body": "body", "offer": "offer", "channel": "email + direct mail" },
      { "milestone": "2-year anniversary", "touchpointType": "VIP recognition", "subject": "subject", "body": "body", "offer": "offer", "channel": "email" },
      { "milestone": "Birthday", "touchpointType": "birthday surprise", "subject": "subject", "body": "body", "offer": "birthday offer", "channel": "email + SMS" }
    ]
  },

  "customerSpotlight": {
    "overview": "the purpose and value of the customer spotlight program for ${intake.businessName}",
    "selectionCriteria": ["criterion 1", "criterion 2", "criterion 3", "criterion 4"],
    "outreachSubject": "email subject to invite a customer for a spotlight",
    "outreachBody": "full outreach email body (2-3 paragraphs, flattering, explains the opportunity, makes them feel honored)",
    "incentive": "what the featured customer receives",
    "publishingCadence": "how often spotlights are published",
    "templates": [
      {
        "format": "written story",
        "headline": "template headline formula",
        "questions": ["question 1", "question 2", "question 3", "question 4", "question 5"],
        "copyFramework": "how to structure the written story",
        "distributionChannels": ["channel 1", "channel 2", "channel 3"]
      },
      {
        "format": "video testimonial",
        "headline": "headline formula",
        "questions": ["Q1", "Q2", "Q3"],
        "copyFramework": "video script framework",
        "distributionChannels": ["channel 1", "channel 2"]
      }
    ]
  },

  "reviewRequestFlow": {
    "overview": "review strategy for ${intake.businessName} in the ${intake.industry} industry",
    "platforms": ["platform 1", "platform 2", "platform 3"],
    "badReviewProtocol": "exactly how to respond to a negative review (calm, professional, specific)",
    "reviewResponseTemplate": "template for responding to positive reviews (genuine, not generic)",
    "amplificationStrategy": "how to amplify 5-star reviews across channels",
    "emails": [
      { "touchNumber": 1, "timing": "immediately after service", "subject": "subject line", "body": "full email body (2-3 paragraphs, warm, grateful, makes the ask feel easy)", "cta": "Leave a Review", "platform": "Google" },
      { "touchNumber": 2, "timing": "3 days later if no review", "subject": "subject line", "body": "full email body (shorter, softer reminder)", "cta": "Share Your Experience", "platform": "Google" },
      { "touchNumber": 3, "timing": "7 days later", "subject": "subject line", "body": "alternative platform request (Yelp, Facebook, etc.)", "cta": "Quick Review", "platform": "Yelp or Facebook" }
    ]
  },

  "referralSystem": {
    "systemName": "referral program name for ${intake.businessName}",
    "mechanic": "exactly how the referral system works",
    "referrerReward": "what the referring customer gets",
    "refereeReward": "what the new customer gets",
    "askCopy": "the referral ask copy (publish-ready, natural, not pushy)",
    "thankYouCopy": "the thank-you message after a successful referral",
    "followUpCopy": "what to say if no referral has come in after 30 days",
    "trackingMethod": "how to track referrals without complex software",
    "launchAnnouncement": "the launch email announcing the referral program (2-3 paragraphs)",
    "touchpoints": [
      { "timing": "after first positive experience", "channel": "email", "message": "the referral ask message at this moment", "incentive": "incentive mentioned" },
      { "timing": "at 3-month mark", "channel": "email", "message": "referral message at 3 months", "incentive": "incentive" },
      { "timing": "after leaving a 5-star review", "channel": "email or in-person", "message": "message when they've just expressed happiness", "incentive": "incentive" },
      { "timing": "annual check-in", "channel": "email", "message": "annual relationship ask", "incentive": "incentive" }
    ]
  },

  "retentionPrinciples": ["principle 1", "principle 2", "principle 3", "principle 4", "principle 5"],
  "retentionMetrics": ["metric 1 to track", "metric 2", "metric 3", "metric 4", "metric 5"],
  "thirtyDayRetentionPlan": ["week 1 focus", "week 2 focus", "week 3 focus", "week 4 focus"]
}`;
}
