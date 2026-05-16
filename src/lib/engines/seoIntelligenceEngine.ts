import type { BusinessIntake } from '@/types';

export function buildSEOIntelligencePrompt(intake: BusinessIntake): string {
  const services = [intake.primaryService, ...(intake.services ?? [])].filter(Boolean);
  const locations = [
    `${intake.city}, ${intake.state}`,
    ...(intake.locationsServed ?? []),
  ].filter(Boolean);
  const baseUrl = intake.websiteUrl
    ? intake.websiteUrl.replace(/\/$/, '')
    : `https://www.${intake.businessName.toLowerCase().replace(/\s+/g, '')}${intake.city.toLowerCase().replace(/\s+/g, '')}.com`;

  return `You are a world-class SEO strategist, GEO (geographic search) specialist, and AEO (answer engine optimization) expert with deep expertise in:
- Google Search algorithm, core updates, and ranking signals
- Local SEO, Google Maps Pack, and GMB optimization
- AI search optimization (Google AI Overviews, Perplexity, ChatGPT, Claude)
- Voice search and answer engine optimization (Alexa, Siri, Google Assistant)
- Schema markup, JSON-LD structured data, and entity SEO
- Technical SEO, site architecture, and Core Web Vitals
- Topical authority, E-E-A-T, and content strategy
- Internal linking architecture and silo strategy

Generate a comprehensive, business-specific SEO/GEO/AEO Intelligence Report. Use actual business names, locations, and services throughout — never use placeholder text.

## BUSINESS DATA
Business Name: ${intake.businessName}
Industry: ${intake.industry}${intake.subIndustry ? ` > ${intake.subIndustry}` : ''}
Business Type: ${intake.businessType}
Primary Location: ${intake.city}, ${intake.state}${intake.country ? `, ${intake.country}` : ''}
Services: ${services.join(', ')}
Locations Served: ${locations.join(', ')}
Price Point: ${intake.pricePoint}
Target Audience: ${intake.targetAudience}
UVP: ${intake.uniqueValueProp}
${intake.resultsOrOutcomes ? `Results: ${intake.resultsOrOutcomes}` : ''}
Competitors: ${intake.competitors?.length ? intake.competitors.join(', ') : 'Not specified'}
Base URL: ${baseUrl}
${intake.googleBusinessProfile ? `Google Business Profile: ${intake.googleBusinessProfile}` : ''}

## OUTPUT REQUIREMENTS
Return ONLY valid JSON (no markdown fences) matching this schema exactly:

{
  "businessName": "${intake.businessName}",
  "industry": "${intake.industry}",
  "location": "${intake.city}, ${intake.state}",
  "seoOpportunityScore": <integer 60-100>,
  "localSearchScore": <integer 60-100>,
  "aiSearchScore": <integer 60-100>,
  "seoSummary": "<3-4 sentences: specific opportunity analysis for this business, why local SEO matters here, and the recommended strategic approach>",

  "pageStructure": [
    {
      "url": "<relative URL e.g. /services/plumbing-repair>",
      "title": "<60-char title tag using actual business name and keyword>",
      "metaDescription": "<155-char compelling meta description>",
      "h1": "<H1 different from title but includes primary keyword>",
      "targetKeywords": ["<primary>", "<secondary>", "<local variant>"],
      "pageType": "<homepage|service|location|blog|faq|about|contact>",
      "priority": "<high|medium|low>",
      "wordCountTarget": <integer>,
      "schemaTypes": ["<LocalBusiness>", "<Service>"]
    }
    // Include homepage, 1 page per service (max 4), 1 per location (max 3), /blog, /about, /contact, /faq
  ],

  "servicePages": [
    {
      "serviceName": "<exact service name>",
      "url": "<relative URL>",
      "title": "<title tag with location and service>",
      "metaDescription": "<meta description>",
      "h1": "<H1 with service and location>",
      "primaryKeyword": "<service + city keyword>",
      "secondaryKeywords": ["<4 secondary keywords>"],
      "contentOutline": ["<H2: What Is...>", "<H2: Benefits of...>", "<H3: ...>", "<H2: Why Choose ${intake.businessName}...>", "<H2: Our Process>", "<H2: FAQs>", "<H2: Contact>"],
      "faqItems": [
        {
          "question": "<specific question about this service>",
          "answer": "<2-3 sentence direct answer>",
          "answerType": "<definition|how-to|comparison|list|yes-no>",
          "voiceSearchOptimized": true
        }
      ],
      "callToAction": "<specific CTA text>"
    }
    // One per primary service, max 4
  ],

  "locationPages": [
    {
      "location": "<city, state>",
      "url": "<relative URL e.g. /locations/city-name>",
      "title": "<title with service + city>",
      "metaDescription": "<155-char meta with local signals>",
      "h1": "<H1 with service + city>",
      "primaryKeyword": "<[service] + [city] keyword>",
      "contentStrategy": "<2-3 sentences on what makes this page locally unique — neighborhoods, landmarks, local pain points>",
      "localSignals": ["<local neighborhood>", "<landmark>", "<area-specific context>", "<local event or reference>"]
    }
    // One per location served, max 4
  ],

  "blogStrategy": {
    "pillars": [
      {
        "topic": "<pillar topic name>",
        "description": "<why this pillar builds authority for ${intake.businessName}>",
        "subTopics": ["<subtopic>", "<subtopic>", "<subtopic>", "<subtopic>"]
      }
      // 3 pillars
    ],
    "publishingCadence": "<specific recommendation e.g. '2x per week — 1 educational, 1 local'>",
    "contentMix": "<percentage breakdown: e.g. '40% educational how-to, 30% local service, 20% comparison, 10% case study'>",
    "topPosts": [
      {
        "title": "<specific post title using real keywords — NOT generic>",
        "url": "<relative URL>",
        "category": "<pillar name>",
        "primaryKeyword": "<target keyword>",
        "searchIntent": "<informational|commercial|navigational|transactional>",
        "targetWordCount": <integer>,
        "outline": ["<H2>", "<H2>", "<H3>", "<H2>", "<H2>"],
        "aiAnswerBlock": "<1-2 sentence direct answer optimized for AI search results>",
        "estimatedMonthlySearches": "<range like '100-500'>",
        "difficulty": "<low|medium|high>"
      }
      // 8 posts
    ]
  },

  "schemaMarkup": {
    "localBusinessSchema": "<compact JSON-LD string for LocalBusiness — populate ALL fields with real ${intake.businessName} data: @context, @type, name, description, url, telephone, address (streetAddress, city, state, zip, country), geo, openingHoursSpecification, priceRange, sameAs array, aggregateRating>",
    "faqSchema": "<JSON-LD string for FAQPage with 4 real FAQ items about ${intake.businessName}'s services>",
    "serviceSchemas": ["<JSON-LD Service schema string for the primary service with name, description, provider, areaServed, serviceType>"],
    "organizationSchema": "<JSON-LD Organization schema string with name, url, logo, contactPoint, sameAs>",
    "webSiteSchema": "<JSON-LD WebSite schema string with name, url, SearchAction potentialAction>"
  },

  "sitemapPlan": {
    "structure": "<description of sitemap architecture — index sitemap + sub-sitemaps strategy>",
    "priorityRules": ["<priority rule 1>", "<priority rule 2>", "<priority rule 3>"],
    "changeFrequency": {
      "homepage": "weekly",
      "service": "monthly",
      "location": "monthly",
      "blog": "weekly",
      "about": "yearly",
      "contact": "yearly"
    },
    "totalEstimatedPages": <integer>,
    "xmlSnippet": "<actual XML sitemap snippet with 3-4 URL entries using ${baseUrl} — proper XML format>"
  },

  "robotsConfig": {
    "rules": ["<crawl rule>", "<crawl rule>", "<crawl rule>"],
    "content": "<complete robots.txt content as a string with actual newlines \\n — include User-agent rules, Disallow for /api/ /admin/ /?*, Allow: /, and Sitemap directive using ${baseUrl}>",
    "sitemapLocation": "${baseUrl}/sitemap.xml"
  },

  "canonicalPlan": {
    "rules": ["<canonical rule>", "<canonical rule>", "<canonical rule>", "<canonical rule>"],
    "paginationStrategy": "<how paginated blog pages are handled — rel=prev/next, canonical to first, etc.>",
    "parameterHandling": "<how UTM, filter, and sort parameters are canonicalized>"
  },

  "metadataTemplates": {
    "homepage": {
      "titleTemplate": "<exact homepage title — [Business Name] | [Primary Service] in [City, State]>",
      "metaDescriptionTemplate": "<exact homepage meta — compelling, includes primary keyword and CTA>",
      "ogTitleTemplate": "<OG title for homepage>",
      "ogDescriptionTemplate": "<OG description for homepage>",
      "ogType": "website",
      "twitterCard": "summary_large_image"
    },
    "servicePage": {
      "titleTemplate": "<template with {serviceName} and {city} placeholders>",
      "metaDescriptionTemplate": "<template with {serviceName} and {city} placeholders>",
      "ogTitleTemplate": "<OG title template>",
      "ogDescriptionTemplate": "<OG description template>",
      "ogType": "website",
      "twitterCard": "summary_large_image"
    },
    "locationPage": {
      "titleTemplate": "<template with {city} and {service} placeholders>",
      "metaDescriptionTemplate": "<template with {city} placeholder>",
      "ogTitleTemplate": "<OG title template>",
      "ogDescriptionTemplate": "<OG description template>",
      "ogType": "website",
      "twitterCard": "summary_large_image"
    },
    "blogPost": {
      "titleTemplate": "<template with {postTitle} and business brand>",
      "metaDescriptionTemplate": "<template with {excerpt} and {primaryKeyword}>",
      "ogTitleTemplate": "<OG title template>",
      "ogDescriptionTemplate": "<OG description template>",
      "ogType": "article",
      "twitterCard": "summary_large_image"
    },
    "rules": ["<title rule: max 60 chars>", "<meta rule: max 155 chars>", "<no duplicate titles>", "<include primary keyword in first 60 chars>", "<OG images: 1200x630px>"]
  },

  "imageAltStrategy": {
    "rules": ["<rule 1>", "<rule 2>", "<rule 3>", "<rule 4>", "<rule 5>"],
    "examples": [
      { "context": "<what the image shows>", "altText": "<specific alt text using ${intake.businessName} and service name>" },
      { "context": "<context>", "altText": "<alt text>" },
      { "context": "<context>", "altText": "<alt text>" },
      { "context": "<context>", "altText": "<alt text>" },
      { "context": "<context>", "altText": "<alt text>" }
    ],
    "logoAlt": "<specific alt text for ${intake.businessName} logo>",
    "heroImageAlt": "<specific alt text for hero image>"
  },

  "internalLinkingPlan": {
    "strategy": "<2 sentences on internal linking philosophy for this business>",
    "hubPages": ["<hub page URL>", "<hub page URL>", "<hub page URL>"],
    "anchorTextStrategy": "<how to write anchor text — avoid generic 'click here', use keyword-rich descriptive anchors>",
    "linkingRules": ["<rule>", "<rule>", "<rule>", "<rule>"],
    "siloPlan": [
      {
        "hub": "<hub page name>",
        "hubUrl": "<URL>",
        "spokes": ["<spoke page>", "<spoke page>", "<spoke page>"],
        "purpose": "<why this silo matters for this business>"
      }
      // 3 silos
    ]
  },

  "keywordClusters": [
    {
      "clusterName": "<cluster name>",
      "pillarKeyword": "<main keyword with ${intake.city} location — specific and realistic>",
      "monthlySearchVolume": "<realistic estimate like '200-500' or '1,000-2,500'>",
      "intent": "<informational|commercial|navigational|transactional>",
      "relatedKeywords": ["<4 related keywords>"],
      "longTailVariants": ["<4 long-tail variants>"],
      "difficulty": "<low|medium|high>",
      "targetPage": "<which page targets this cluster>",
      "opportunity": "<1 sentence on why this cluster is a conversion opportunity>"
    }
    // 10 clusters
  ],

  "semanticKeywordMap": {
    "topicClusters": [
      {
        "mainTopic": "<core topic>",
        "relatedTerms": ["<5 related terms>"],
        "entityRelations": ["<4 entity relations — places, tools, concepts>"
        ]
      }
      // 3 topic clusters
    ],
    "lsiKeywords": ["<12 LSI keywords — semantically related to primary services>"],
    "entityKeywords": ["<8 entity keywords — specific tools, certifications, brands, places>"],
    "localKeywords": ["<12 local keywords with city/neighborhood/area references>"],
    "questionKeywords": ["<12 question-based keywords starting with who/what/where/when/why/how — natural language>"]
  },

  "aiAnswerBlocks": [
    {
      "question": "<specific question an AI would be asked about this service/business>",
      "directAnswer": "<1-2 sentence direct answer — structured for AI snippet extraction>",
      "expandedAnswer": "<3-5 sentences with supporting detail — authoritative and specific>",
      "answerFormat": "<paragraph|list|steps>",
      "targetedFor": "<google-ai-overview|voice-search|featured-snippet|chatgpt|all>"
    }
    // 10 blocks covering different question types and services
  ],

  "voiceSearchQuestions": [
    {
      "question": "<natural language voice query — conversational, as someone would speak it>",
      "answer": "<brief answer under 30 words — optimized for voice response>",
      "triggerWords": ["<near me>", "<best>", "<how much>"]
    }
    // 10 questions
  ],

  "contentAuthorityPlan": {
    "authorityTopics": ["<6 specific topics to build deep expertise content around>"],
    "eeatSignals": ["<6 specific E-E-A-T signals to establish for ${intake.businessName}>"],
    "expertContent": ["<6 specific content types that demonstrate expertise>"],
    "citationStrategy": "<specific strategy for earning citations from authoritative industry sources>",
    "linkBuildingTargets": ["<6 specific sites or site types to target for backlinks>"],
    "authorBioStrategy": "<how to establish author expertise and credentials for content>"
  },

  "localSearchStrategy": {
    "gmbOptimization": {
      "primaryCategory": "<most specific and accurate GMB category>",
      "additionalCategories": ["<3-4 additional relevant GMB categories>"],
      "attributes": ["<6 GMB attributes to enable — specific to this business type>"],
      "postingStrategy": "<specific GMB post cadence and content types>",
      "photoStrategy": "<specific photo types, naming conventions, and upload schedule>",
      "qAStrategy": "<how to seed GMB Q&A with service-specific questions and keyword-rich answers>"
    },
    "localCitations": [
      {
        "platform": "<platform name>",
        "priority": "<high|medium|low>",
        "napFormat": "<how NAP should be formatted for this platform>"
      }
      // 14 citations: Yelp, BBB, Angi, HomeAdvisor, Thumbtack, Houzz (if relevant), YellowPages, MapQuest, Apple Maps, Bing Places, Nextdoor, Chamber of Commerce, industry-specific directories
    ],
    "neighborhoodStrategy": "<specific strategy for targeting neighborhoods and micro-areas around ${intake.city}>",
    "reviewStrategy": "<specific review acquisition cadence, platforms to focus on, and response strategy>",
    "localLinkBuilding": ["<6 specific local link building opportunities for ${intake.city}>"
    ]
  },

  "quickWins": ["<14 specific, actionable quick-win tasks completable in week 1-2 — no vague advice>"],

  "competitorKeywordGaps": ["<10 keyword opportunities that competitors likely miss or underserve>"],

  "sixMonthRoadmap": [
    {
      "month": "Month 1",
      "focus": "<primary focus area>",
      "tasks": ["<specific task>", "<specific task>", "<specific task>", "<specific task>"]
    }
    // 6 months
  ],

  "generatedAt": "${new Date().toISOString()}"
}`;
}
