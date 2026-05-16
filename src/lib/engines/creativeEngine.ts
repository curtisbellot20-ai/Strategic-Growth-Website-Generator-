import type { BusinessIntake } from '@/types';

export function buildCreativePrompt(intake: BusinessIntake): string {
  const audienceProfile = [
    intake.targetAudience && `Target Audience: ${intake.targetAudience}`,
    intake.audienceAge && `Age: ${intake.audienceAge}`,
    intake.audienceIncome && `Income Level: ${intake.audienceIncome}`,
    intake.audiencePainPoints && `Pain Points: ${intake.audiencePainPoints}`,
    intake.audienceDesires && `Desires: ${intake.audienceDesires}`,
    intake.audienceFears && `Fears: ${intake.audienceFears}`,
    intake.audienceObjections && `Objections: ${intake.audienceObjections}`,
  ].filter(Boolean).join('\n');

  const brandProfile = [
    intake.desiredAtmosphere && `Atmosphere: ${intake.desiredAtmosphere}`,
    intake.desiredBrandStyle && `Brand Style: ${intake.desiredBrandStyle}`,
    intake.desiredEmotionalTone && `Emotional Tone: ${intake.desiredEmotionalTone}`,
    `Luxury Level: ${intake.luxuryLevel ?? 5}/10`,
    intake.brandPersonality?.length && `Personality Traits: ${intake.brandPersonality.join(', ')}`,
    intake.brandVoice && `Brand Voice: ${intake.brandVoice}`,
    intake.brandColors?.filter(Boolean).length && `Brand Colors: ${intake.brandColors.filter(Boolean).join(', ')}`,
    intake.logoDescription && `Logo Description: ${intake.logoDescription}`,
    intake.imagesDescription && `Image Direction: ${intake.imagesDescription}`,
  ].filter(Boolean).join('\n');

  return `You are a world-class creative director, brand strategist, and UI/UX designer — the combined creative intelligence of Pentagram, Apple Design Studio, R/GA, and Huge Inc.

Your task is to generate a deeply specific, opinionated Creative Direction Intelligence report for this exact business. Every recommendation must be tailored to THIS business, THIS audience, and THIS emotional goal — never a template, never generic.

Think like you are pitching a $500,000 brand redesign to a discerning client. Every detail must be specific, justified, and premium.

## BUSINESS PROFILE
Business Name: ${intake.businessName}
Industry: ${intake.industry}${intake.subIndustry ? ` › ${intake.subIndustry}` : ''}
Business Type: ${intake.businessType}
Location: ${intake.city}, ${intake.state}${intake.country ? `, ${intake.country}` : ''}
Years in Business: ${intake.yearsInBusiness ?? 'N/A'}
Primary Service: ${intake.primaryService}
${intake.secondaryServices ? `Secondary Services: ${intake.secondaryServices}` : ''}
Price Point: ${intake.pricePoint}
Unique Value Prop: ${intake.uniqueValueProp}
${intake.resultsOrOutcomes ? `Results/Outcomes: ${intake.resultsOrOutcomes}` : ''}
Primary Goal: ${intake.primaryGoal}
CTA Preference: ${intake.ctaPreference ?? 'Not specified'}

## AUDIENCE PSYCHOLOGY
${audienceProfile}

## BRAND VISION
${brandProfile}

## COMPETITIVE LANDSCAPE
Competitors: ${intake.competitors?.length ? intake.competitors.join(', ') : 'None specified'}

## MANDATE
Create a creative direction that:
1. Is visually DIFFERENTIATED from every competitor in this industry
2. Triggers the exact emotional state that converts THIS specific audience
3. Feels premium and custom — not like a Squarespace or Wix template
4. Is immediately memorable within 3 seconds of landing
5. Converts at a higher rate by reducing psychological friction

FORBIDDEN phrases (do not use these): "clean and modern", "high-quality images", "user-friendly", "professional look", "sleek design", "easy to navigate". Be specific and opinionated.

Return ONLY a valid JSON object with NO markdown fences, matching this exact schema:

{
  "businessName": "${intake.businessName}",
  "designPersonality": "<2-4 word personality like 'Bold & Authoritative', 'Warm & Intimate', 'Sleek & Futuristic', 'Raw & Trustworthy'>",
  "creativeScore": <integer 60-100 representing differentiation/memorability potential>,
  "creativeSummary": "<3-4 sentences: why these creative choices, what emotional feeling they create, why this will convert this specific audience. Be bold and opinionated.>",
  "uniqueDesignPrinciples": ["<5-7 specific design principles governing this site — named and specific, e.g. 'Asymmetric tension creates visual dominance without aggression'>"],
  "brandDifferentiators": ["<5-7 visual moves that set this site apart from competitors in this specific industry>"],
  "moodBoardKeywords": ["<10-12 precise aesthetic/mood keywords, e.g. 'amber warmth', 'editorial restraint', 'masculine geometry', 'whiskey barrel texture'>"],
  "referenceAesthetics": ["<5-7 specific real brand references with context, e.g. 'Aesop skincare — editorial restraint with ritualistic product display', 'Tom Ford — darkness as luxury signal'>"],
  "avoidPatterns": ["<5-7 specific clichés to avoid for THIS industry and audience, e.g. 'Stock photo smiling handshake images', 'Rotating hero slider with 4 generic slides'>"],

  "layoutStyle": {
    "name": "<specific named layout system>",
    "description": "<2-3 sentences on layout philosophy>",
    "gridSystem": "<specific CSS Grid/Flexbox approach with column counts and gutter values>",
    "whitespacePhilosophy": "<specific whitespace strategy — values, rhythm, asymmetry if any>",
    "scrollBehavior": "<e.g. 'Full-viewport snap sections with 0.8s ease-in-out between panels', 'Parallax at 0.5x scroll ratio on hero background'>",
    "sectionFlow": "<how sections connect visually — overlaps, separators, transitions>",
    "breakpointStrategy": "<mobile-first breakpoints sm/md/lg/xl with rationale for this audience>",
    "keyLayoutPatterns": ["<3-5 specific named patterns, e.g. 'Asymmetric 40/60 hero split with text on dark left panel', 'Overlapping card grid with -24px negative margin stagger'>"],
    "rationale": "<1-2 sentences: why this layout converts this audience>"
  },

  "typographyDirection": {
    "headlineFont": {
      "name": "<exact Google Font name, e.g. 'Playfair Display', 'Space Grotesk', 'Cormorant Garamond'>",
      "category": "<serif|sans-serif|display|script|monospace>",
      "weight": "<e.g. '700, 900'>",
      "useCase": "<exactly where and how — e.g. 'Hero headline at 80px/5rem, section titles at 48px, all uppercase with -0.02em tracking'>",
      "googleFontsUrl": "<https://fonts.google.com/specimen/Font+Name>",
      "pairingNote": "<how it contrasts or complements the body font>"
    },
    "bodyFont": {
      "name": "<exact name>",
      "category": "<category>",
      "weight": "<e.g. '300, 400, 500'>",
      "useCase": "<exactly where — paragraph text, card descriptions, navigation labels, etc.>",
      "googleFontsUrl": "<url>",
      "pairingNote": "<pairing note>"
    },
    "accentFont": {
      "name": "<exact name — for stats, badges, labels, overlines>",
      "category": "<category>",
      "weight": "<weight>",
      "useCase": "<specific accent use cases>",
      "googleFontsUrl": "<url>",
      "pairingNote": "<pairing note>"
    },
    "scaleRatio": "<named ratio + actual sizes, e.g. 'Major Third (1.250) — 12/15/19/24/30/37/46/58px'>",
    "letterSpacing": "<headline vs body values, e.g. 'Headlines: -0.03em, Body: 0.01em, Labels: 0.12em uppercase'>",
    "lineHeight": "<e.g. 'Headlines: 1.05, Body: 1.72, Small text: 1.5'>",
    "textureEffects": ["<specific effects, e.g. 'Gradient text mask on hero using brand amber-to-gold', 'Uppercase 0.15em tracked overlines in accent font before each section title'>"],
    "hierarchyRules": ["<3-5 specific rules, e.g. 'Never more than 2 font families on one page', 'Section overlines always 11px uppercase accent font in brand color'>"],
    "rationale": "<why this type system fits this business and audience>"
  },

  "colorDirection": {
    "primaryPalette": [
      {
        "name": "<color name>",
        "hex": "<#XXXXXX>",
        "role": "<primary|secondary|background|surface>",
        "psychology": "<what this exact color communicates to this specific audience>",
        "usageGuideline": "<exactly where: hero backgrounds, body text, navigation, etc.>"
      }
    ],
    "accentColors": [
      {
        "name": "<name>",
        "hex": "<#XXXXXX>",
        "role": "<accent|highlight|cta>",
        "psychology": "<psychology for this audience>",
        "usageGuideline": "<specific usage>"
      }
    ],
    "neutrals": [
      {
        "name": "<name>",
        "hex": "<#XXXXXX>",
        "role": "<text|background|border>",
        "psychology": "<psychology>",
        "usageGuideline": "<usage>"
      }
    ],
    "gradients": [
      {
        "name": "<gradient name>",
        "css": "<actual CSS value e.g. 'linear-gradient(135deg, #1a0a00 0%, #3d1a00 100%)'>",
        "useCase": "<specific use case on the site>"
      }
    ],
    "colorMood": "<overall emotional tone of the palette in 1 sentence>",
    "colorPsychology": "<2-3 sentences on why these specific colors work for this specific audience>",
    "usageRules": ["<4-6 specific rules, e.g. 'Primary dark never used on top of accent — always separated by neutral', 'CTA button only in accent amber — no exceptions'>"],
    "contrastStrategy": "<WCAG compliance approach + contrast ratios>",
    "rationale": "<why this palette drives conversions for this audience>"
  },

  "imageStyle": {
    "style": "<named style, e.g. 'Editorial lifestyle with documentary honesty', 'Studio-lit premium product with surgical precision'>",
    "subjectMatter": "<exactly what should be in images for this business>",
    "composition": "<specific compositional rules, e.g. 'Rule of thirds with subjects left-weighted at 38%, negative space right for text overlay'>",
    "lighting": "<specific lighting direction, e.g. 'Rembrandt lighting at 45deg, golden hour warmth, lifted shadows to +15%'>",
    "colorGrading": "<specific grade, e.g. 'Warm film look: lifted blacks to RGB(20,15,10), orange-teal split tone, -15 saturation on blues'>",
    "humanPresence": "<when and how to show people — specific guidance>",
    "abstractVsLiteral": "<balance between conceptual and literal imagery>",
    "editingStyle": "<post-processing specifics>",
    "avoidImages": ["<3-5 specific image types to avoid for this business>"],
    "shootingDirections": ["<4-6 specific creative directions for photo shoots or stock sourcing>"],
    "rationale": "<why this image style serves the conversion goal>"
  },

  "videoStyle": {
    "style": "<named video style>",
    "pacing": "<cuts per minute + rhythm description>",
    "shotTypes": ["<3-5 specific shot types, e.g. 'Slow dolly push-in on craftsman hands', 'Aerial reveal of service area'>"],
    "colorGrading": "<video color direction>",
    "musicMood": "<genre, tempo BPM, emotional direction>",
    "textOverlay": "<how text appears during video — timing, style, animation>",
    "heroVideoApproach": "<specific hero video direction — what to show, how long, autoplay settings>",
    "backgroundVideoUse": "<ambient video guidelines — opacity, blur, content>",
    "rationale": "<why this video style works for this audience>"
  },

  "animationStyle": {
    "personality": "<animation personality descriptor>",
    "entryAnimations": "<specific easing + timing, e.g. 'Fade up 32px with cubic-bezier(0.16,1,0.3,1) over 600ms, 80ms stagger between children'>",
    "scrollAnimations": "<scroll-triggered approach — library recommendation, threshold, what animates>",
    "hoverEffects": "<specific hover states — transform, color, shadow transitions with timing>",
    "microInteractions": ["<4-6 named micro-interactions, e.g. 'CTA button: background expands from center on hover over 240ms', 'Form field: underline slides in from left on focus'>"],
    "loadingState": "<page and component loading animations>",
    "transitionStyle": "<page transition approach>",
    "intensity": "<subtle|moderate|bold>",
    "performanceNotes": "<GPU compositing, prefers-reduced-motion, and performance notes>",
    "rationale": "<why this animation intensity fits this brand and audience>"
  },

  "sectionRhythm": {
    "pattern": "<overall rhythm philosophy for this specific site>",
    "alternation": "<how sections alternate — bg colors, layout orientation, content density>",
    "breathingRoom": "<vertical spacing philosophy with specific values, e.g. '120px section padding desktop, 64px mobile, 80px between content blocks'>",
    "sectionSeparators": "<how sections divide — specific visual treatments, not just 'dividers'>",
    "contentDensity": "<text-to-whitespace ratio philosophy>",
    "verticalFlow": "<how the eye moves down the page — pacing of reveals>",
    "sectionOrder": ["<recommended section order as a numbered list for this specific business type>"],
    "rationale": "<why this rhythm converts this audience>"
  },

  "heroStyle": {
    "layout": "<specific hero dimensions and element positions>",
    "headlineApproach": "<font treatment, size, animation, line breaks>",
    "subtextStyle": "<subtext position, size, treatment, max-width>",
    "ctaPlacement": "<primary + secondary CTA placement with pixel/percent positions>",
    "backgroundApproach": "<background treatment — image, video, gradient, pattern, overlay opacity>",
    "visualElement": "<the key visual — what it is, why, how it's positioned>",
    "moodEstablishment": "<how the hero sets the exact emotional tone in under 3 seconds>",
    "scrollTrigger": "<what happens as user begins to scroll — parallax, fade, reveal>",
    "rationale": "<why this hero converts this specific audience>"
  },

  "ctaStyle": {
    "primaryShape": "<button shape with border-radius, padding, min-width, height>",
    "primaryColorScheme": "<specific colors with hex, hover state>",
    "primaryTextStyle": "<font, weight, size, case, letter-spacing>",
    "secondaryStyle": "<secondary CTA visual — ghost, underline, text-only, etc.>",
    "placement": "<where CTAs appear on the page and how many>",
    "urgencyLevel": "<how urgency is expressed — psychological technique used>",
    "microCopyStyle": "<supporting text under/around CTAs — tone, examples>",
    "hoverBehavior": "<exact hover animation — transform, shadow, color transition>",
    "rationale": "<why this CTA style drives conversions for this audience>"
  },

  "galleryStyle": {
    "layout": "<grid type, column counts at each breakpoint, gaps>",
    "hoverEffect": "<exact hover interaction on gallery items>",
    "captionStyle": "<caption position, font, timing>",
    "filterStyle": "<category filter UI — pill buttons, dropdown, tab style>",
    "lightboxStyle": "<lightbox/modal design approach>",
    "spacing": "<gap values, container margins>",
    "masonryVsGrid": "<which layout type and why for this content>",
    "rationale": "<why this gallery approach fits this business>"
  },

  "trustSectionStyle": {
    "layout": "<trust section layout — full-width, contained, split screen>",
    "testimonialCard": "<card design — shape, shadow, quote treatment, avatar style>",
    "reviewPresentation": "<how star ratings and review text are displayed>",
    "statsDisplay": "<how numbers are shown — animated counters, large display font, context text>",
    "certificationBadges": "<how credentials, certs, or partnerships are displayed>",
    "socialProofElements": ["<4-6 specific social proof components for this industry>"],
    "authoritySignals": ["<4-6 authority signals specific to this industry and audience>"],
    "rationale": "<why this trust approach reduces friction for this specific audience>"
  },

  "mobileDirection": {
    "navigationStyle": "<specific mobile nav — hamburger details, tab bar, sticky, bottom sheet>",
    "stackingOrder": "<how specific desktop multi-column layouts reorder on mobile>",
    "touchTargets": "<minimum tap target sizes and thumb-zone optimization>",
    "mobileHero": "<how the hero transforms on mobile — specific changes>",
    "fontScaling": "<mobile type scale — specific size reductions from desktop>",
    "buttonStyle": "<mobile button treatment — full-width, floating, sticky bottom>",
    "gestureInteractions": "<swipe, pull behaviors, carousel interactions>",
    "mobileFirstPriorities": ["<4-6 content/conversion priorities specific to mobile for this audience>"],
    "rationale": "<mobile UX rationale for this specific audience>"
  },

  "generatedAt": "<ISO 8601 timestamp>"
}`;
}
