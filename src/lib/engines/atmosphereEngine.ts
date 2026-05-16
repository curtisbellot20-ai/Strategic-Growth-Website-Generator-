import type { BusinessIntake } from '@/types';

export function buildAtmospherePrompt(intake: BusinessIntake): string {
  return `You are a world-class team of experts:
- Brand Atmosphere Specialist
- Consumer Psychology Expert
- Creative Director
- UI/UX Design Director
- Color Psychology Expert
- Typography Expert
- Motion Design Expert
- Copywriting Director

Your task: Generate a COMPREHENSIVE Atmosphere Intelligence Report for this business.

This report must:
1. Identify the perfect primary AND secondary atmosphere type for this specific business
2. Explain WHY each choice fits the brand vision AND customer psychology
3. Provide hyper-specific recommendations for all 11 design dimensions
4. Connect every recommendation back to the customer's emotional psychology

## BUSINESS PROFILE
Name: ${intake.businessName}
Industry: ${intake.industry}
Sub-Industry: ${intake.subIndustry || 'N/A'}
Business Type: ${intake.businessType}
Price Point: ${intake.pricePoint}
Location: ${intake.city}, ${intake.state}
Primary Service: ${intake.primaryService}

## BRAND VISION (Owner's Input)
Desired Atmosphere: ${intake.desiredAtmosphere || 'Not specified — use your expert judgment'}
Desired Brand Style: ${intake.desiredBrandStyle || 'Not specified'}
Desired Emotional Tone: ${intake.desiredEmotionalTone || 'Not specified'}
Luxury Level (1=budget, 5=ultra-luxury): ${intake.luxuryLevel || 3}
Brand Personality: ${(intake.brandPersonality || []).join(', ') || 'Not specified'}
Brand Voice: ${intake.brandVoice || 'Not specified'}
Preferred Colors (hex): ${(intake.brandColors || []).join(', ') || 'Not specified'}
Logo / Imagery Notes: ${intake.logoDescription || 'N/A'} / ${intake.imagesDescription || 'N/A'}

## CUSTOMER PSYCHOLOGY
Ideal Customer: ${intake.targetAudience}
Pain Points: ${intake.audiencePainPoints}
Deep Desires: ${intake.audienceDesires || 'Not specified'}
Deep Fears: ${intake.audienceFears || 'Not specified'}
Buying Objections: ${intake.audienceObjections || 'Not specified'}

## GOAL
Primary Goal: ${intake.primaryGoal}
CTA Preference: ${intake.ctaPreference || 'Not specified'}
Competitors: ${(intake.competitors || []).join(', ') || 'Not specified'}

## ATMOSPHERE TYPE OPTIONS
Select primary AND secondary from:
luxury, romantic, corporate, cinematic, urban_premium, family_friendly, high_energy, wellness, minimal, elegant, futuristic, trustworthy, exclusive, creative, performance_driven, relaxing, nightlife, high_status

Return ONLY valid JSON with this exact structure. No markdown, no code fences:

{
  "businessName": "${intake.businessName}",
  "primaryAtmosphere": "luxury",
  "secondaryAtmosphere": "elegant",
  "atmosphereFitScore": 94,

  "rationale": {
    "businessRationale": "Why this atmosphere fits the business identity and goals (2-3 sentences)",
    "customerRationale": "Why this atmosphere resonates with the customer's psychology (2-3 sentences)",
    "psychologicalBasis": "The psychological principles driving this choice (2-3 sentences)",
    "competitiveAdvantage": "How this atmosphere differentiates from competitors (1-2 sentences)",
    "whyNotOtherAtmospheres": "Why competing atmosphere types were rejected (1-2 sentences)"
  },

  "emotionalTone": {
    "primaryEmotion": "The single dominant emotion visitors should feel",
    "emotionalArc": "The full emotional journey from landing to conversion",
    "entryEmotion": "First emotion on page load",
    "peakEmotion": "Peak emotion at the CTA moment",
    "exitEmotion": "Emotion after converting",
    "emotionalKeywords": ["8+ emotion words that define the atmosphere"],
    "avoidEmotions": ["4+ emotions to actively avoid"],
    "howToAchieve": ["6+ specific tactics to create this emotional tone"]
  },

  "colorSystem": {
    "philosophy": "The strategic color philosophy for this atmosphere",
    "primaryColor":    { "name": "string", "hex": "#000000", "psychology": "string", "usage": "string" },
    "secondaryColor":  { "name": "string", "hex": "#000000", "psychology": "string", "usage": "string" },
    "accentColor":     { "name": "string", "hex": "#000000", "psychology": "string", "usage": "string" },
    "backgroundColor": { "name": "string", "hex": "#000000", "psychology": "string", "usage": "string" },
    "textColor":       { "name": "string", "hex": "#000000", "psychology": "string", "usage": "string" },
    "colorTemperature": "warm / cool / neutral with explanation",
    "contrastApproach": "How contrast is used to guide attention",
    "gradientRecommendation": "Specific gradient style and usage",
    "colorDos": ["6+ specific color do's"],
    "colorDonts": ["4+ specific color don'ts"]
  },

  "typography": {
    "philosophy": "The typographic personality for this atmosphere",
    "headingFont":  { "name": "string", "category": "serif/sans-serif/display", "weight": "700", "characteristics": "string", "googleFontUrl": "https://fonts.google.com/specimen/..." },
    "bodyFont":     { "name": "string", "category": "serif/sans-serif",         "weight": "400", "characteristics": "string", "googleFontUrl": "https://fonts.google.com/specimen/..." },
    "accentFont":   { "name": "string", "category": "display/script/mono",      "weight": "400", "characteristics": "string", "googleFontUrl": "https://fonts.google.com/specimen/..." },
    "sizeScale": "Specific size recommendations (e.g. H1: 72px, H2: 48px, Body: 18px)",
    "lineHeightApproach": "Line height strategy with specific values",
    "letterSpacingApproach": "Letter spacing philosophy and specific values",
    "textTransformUsage": "When and how to use uppercase, capitalize, etc.",
    "typographyDos": ["6+ typographic do's"],
    "typographyDonts": ["4+ typographic don'ts"]
  },

  "spacing": {
    "philosophy": "The spatial philosophy for this atmosphere",
    "whitespaceLevel": "generous",
    "sectionPadding": "Specific padding values (e.g. 120px top/bottom on desktop)",
    "componentSpacing": "Spacing between components and elements",
    "gridApproach": "Grid system recommendation (e.g. 12-col, max-width 1280px)",
    "breathingRoom": "How much whitespace between elements and why",
    "mobileSpacingNotes": "Mobile-specific spacing adjustments",
    "spacingDos": ["5+ spacing do's"]
  },

  "imagery": {
    "philosophy": "The visual language philosophy for this atmosphere",
    "photographyStyle": "Specific photography style (editorial/lifestyle/documentary/product/etc)",
    "lightingApproach": "Lighting direction, quality, temperature (e.g. soft natural backlit)",
    "colorTreatment": "How images should be color-treated (warm tones, desaturated, high contrast, etc)",
    "subjectFocus": "What subjects to feature and how to frame them",
    "backgroundStyle": "Background approach (clean white, textured, environmental, etc)",
    "modelInclusion": "Guidance on featuring people (yes/no, demographic, emotion, angle)",
    "imageComposition": "Composition rules (rule of thirds, centered, asymmetric, etc)",
    "videoRecommendations": "Video content guidance (autoplay loops, testimonials, etc)",
    "imageryDos": ["6+ imagery do's"],
    "imageryDonts": ["4+ imagery don'ts"],
    "stockPhotoGuidance": "How to choose stock photos that match this atmosphere"
  },

  "layoutPacing": {
    "philosophy": "The rhythm and flow philosophy for this atmosphere",
    "scrollExperience": "How the scroll should feel (fast/slow/dramatic/meditative)",
    "sectionRhythm": "Pattern of sections (alternating/consistent/varied heights)",
    "heroApproach": "Hero section treatment (full-screen/split/minimal/cinematic)",
    "sectionTransitions": "How sections connect visually",
    "informationHierarchy": "How information density progresses through the page",
    "viewportUsage": "How screen real estate is allocated",
    "breakpointConsiderations": "Key responsive design notes for this atmosphere",
    "pacingDos": ["5+ layout pacing do's"]
  },

  "ctaLanguage": {
    "philosophy": "The copy philosophy for CTAs in this atmosphere",
    "primaryCTATone": "The tone style (commanding/inviting/questioning/declarative/aspirational)",
    "recommendedPrimaryCtAs": ["6+ primary CTA text options"],
    "microCTAs": ["6+ secondary/micro CTA options"],
    "powerWords": ["10+ power words that work for this atmosphere"],
    "avoidWords": ["6+ words that break the atmosphere"],
    "urgencyApproach": "How urgency is communicated without breaking the atmosphere",
    "ctaButtonStyle": "Button design recommendation (shape, size, style, animation)",
    "ctaPlacementLogic": "Where and why CTAs are placed throughout the page"
  },

  "animationStyle": {
    "philosophy": "Motion design philosophy for this atmosphere",
    "overallIntensity": "subtle",
    "entryAnimations": "How elements enter the viewport (fade/slide/scale/reveal)",
    "scrollAnimations": "Scroll-triggered animation behavior",
    "hoverEffects": "Hover state behavior for interactive elements",
    "transitionSpeed": "Specific transition timing (e.g. 0.3s ease-out for most, 0.6s for hero)",
    "loadingExperience": "Page load animation strategy",
    "microInteractions": ["6+ specific micro-interaction recommendations"],
    "animationDos": ["5+ animation do's"],
    "animationDonts": ["4+ animation don'ts"]
  },

  "visualDensity": {
    "philosophy": "The information density philosophy for this atmosphere",
    "densityLevel": "balanced",
    "contentPerScreen": "How much content per viewport (e.g. one hero concept, 2-3 supporting elements)",
    "gridColumns": "Recommended grid usage per section type",
    "elementSpacing": "Spacing between visual elements",
    "cardDesign": "If using cards, how they should look for this atmosphere",
    "iconUsage": "When and how to use icons (minimal/abundant/none/illustrative)",
    "patternUsage": "Background patterns, textures, decorative elements",
    "densityBySection": ["5+ section-specific density notes (e.g. Hero: ultra-sparse, Services: medium)"]
  },

  "trustSignals": {
    "philosophy": "Trust strategy specific to this atmosphere type",
    "atmosphereSpecificTrust": ["6+ trust signals uniquely suited to this atmosphere"],
    "primaryTrustElements": ["6+ primary trust elements to feature prominently"],
    "placementStrategy": ["5+ placement recommendations with rationale"],
    "visualTreatment": "How trust elements should be styled to match the atmosphere",
    "socialProofStyle": "How testimonials/reviews should be displayed",
    "credentialDisplay": "How certifications, awards, media mentions are shown",
    "trustDos": ["5+ trust signal do's"]
  },

  "storytellingTone": {
    "philosophy": "Narrative philosophy for this atmosphere",
    "narrativeVoice": "First/Second/Third person with explanation",
    "languageRegister": "formal/conversational/poetic/technical with specific guidance",
    "storyArcStructure": "The narrative structure (e.g. Problem → Vision → Solution → Proof → Invitation)",
    "emotionalJourneyMap": "Map of emotional states through the page narrative",
    "openingHook": "How the story opens (specific hook type and example)",
    "bodyNarrative": "How the middle of the story is structured",
    "closingImpact": "How the story closes and drives action",
    "vocabularyGuidance": ["8+ vocabulary and phrasing guidelines"],
    "sentenceStructure": "Sentence length and rhythm guidance",
    "storytellingDos": ["5+ storytelling do's"],
    "storytellingDonts": ["4+ storytelling don'ts"]
  },

  "designBrief": "A 3-4 sentence executive design brief that a designer could hand to a developer to implement this atmosphere perfectly",

  "moodBoardKeywords": ["12-16 mood board keywords for image search"],

  "referenceInspiration": ["6-8 brands, websites, or concepts that embody this atmosphere"],

  "sectionExamples": [
    {
      "sectionName": "Hero Section",
      "atmosphereApplication": "How the atmosphere manifests in this specific section",
      "specificElements": ["4+ specific design/copy elements for this section"]
    }
  ],

  "implementationChecklist": [
    {
      "item": "Specific implementation task",
      "dimension": "Which dimension this belongs to",
      "priority": "critical",
      "atmosphereImpact": "How this reinforces the atmosphere"
    }
  ]
}

Be hyper-specific to:
- ${intake.businessName} in the ${intake.industry} industry
- A ${intake.pricePoint} price point business
- An audience of: ${intake.targetAudience}
- Owner's luxury level preference: ${intake.luxuryLevel}/5

If the owner specified preferred colors (${(intake.brandColors||[]).join(', ')}), incorporate them into the color system.
Generate at least 6 section examples covering: Hero, Services, About, Testimonials, FAQ, CTA.
Generate at least 15 implementation checklist items.
Every recommendation must be actionable and justified by the customer psychology or brand vision.`;
}
