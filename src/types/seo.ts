export type SEOIntelligenceStatus = 'idle' | 'loading' | 'complete' | 'error';

export interface SEOPage {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  targetKeywords: string[];
  pageType: 'homepage' | 'service' | 'location' | 'blog' | 'faq' | 'about' | 'contact';
  priority: 'high' | 'medium' | 'low';
  wordCountTarget: number;
  schemaTypes: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  answerType: 'definition' | 'how-to' | 'comparison' | 'list' | 'yes-no';
  voiceSearchOptimized: boolean;
}

export interface ServicePage {
  serviceName: string;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  contentOutline: string[];
  faqItems: FAQItem[];
  callToAction: string;
}

export interface LocationPage {
  location: string;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  contentStrategy: string;
  localSignals: string[];
}

export interface BlogPillar {
  topic: string;
  description: string;
  subTopics: string[];
}

export interface BlogPost {
  title: string;
  url: string;
  category: string;
  primaryKeyword: string;
  searchIntent: 'informational' | 'commercial' | 'navigational' | 'transactional';
  targetWordCount: number;
  outline: string[];
  aiAnswerBlock: string;
  estimatedMonthlySearches: string;
  difficulty: 'low' | 'medium' | 'high';
}

export interface BlogStrategy {
  pillars: BlogPillar[];
  publishingCadence: string;
  contentMix: string;
  topPosts: BlogPost[];
}

export interface SchemaMarkup {
  localBusinessSchema: string;
  faqSchema: string;
  serviceSchemas: string[];
  organizationSchema: string;
  webSiteSchema: string;
}

export interface SitemapPlan {
  structure: string;
  priorityRules: string[];
  changeFrequency: Record<string, string>;
  totalEstimatedPages: number;
  xmlSnippet: string;
}

export interface RobotsConfig {
  rules: string[];
  content: string;
  sitemapLocation: string;
}

export interface CanonicalPlan {
  rules: string[];
  paginationStrategy: string;
  parameterHandling: string;
}

export interface PageMetadata {
  titleTemplate: string;
  metaDescriptionTemplate: string;
  ogTitleTemplate: string;
  ogDescriptionTemplate: string;
  ogType: string;
  twitterCard: string;
}

export interface MetadataTemplates {
  homepage: PageMetadata;
  servicePage: PageMetadata;
  locationPage: PageMetadata;
  blogPost: PageMetadata;
  rules: string[];
}

export interface ImageAltExample {
  context: string;
  altText: string;
}

export interface ImageAltStrategy {
  rules: string[];
  examples: ImageAltExample[];
  logoAlt: string;
  heroImageAlt: string;
}

export interface LinkSilo {
  hub: string;
  hubUrl: string;
  spokes: string[];
  purpose: string;
}

export interface InternalLinkingPlan {
  strategy: string;
  hubPages: string[];
  anchorTextStrategy: string;
  linkingRules: string[];
  siloPlan: LinkSilo[];
}

export interface KeywordCluster {
  clusterName: string;
  pillarKeyword: string;
  monthlySearchVolume: string;
  intent: 'informational' | 'commercial' | 'navigational' | 'transactional';
  relatedKeywords: string[];
  longTailVariants: string[];
  difficulty: 'low' | 'medium' | 'high';
  targetPage: string;
  opportunity: string;
}

export interface TopicCluster {
  mainTopic: string;
  relatedTerms: string[];
  entityRelations: string[];
}

export interface SemanticKeywordMap {
  topicClusters: TopicCluster[];
  lsiKeywords: string[];
  entityKeywords: string[];
  localKeywords: string[];
  questionKeywords: string[];
}

export interface AIAnswerBlock {
  question: string;
  directAnswer: string;
  expandedAnswer: string;
  answerFormat: 'paragraph' | 'list' | 'steps';
  targetedFor: 'google-ai-overview' | 'voice-search' | 'featured-snippet' | 'chatgpt' | 'all';
}

export interface VoiceSearchQuestion {
  question: string;
  answer: string;
  triggerWords: string[];
}

export interface ContentAuthorityPlan {
  authorityTopics: string[];
  eeatSignals: string[];
  expertContent: string[];
  citationStrategy: string;
  linkBuildingTargets: string[];
  authorBioStrategy: string;
}

export interface GMBStrategy {
  primaryCategory: string;
  additionalCategories: string[];
  attributes: string[];
  postingStrategy: string;
  photoStrategy: string;
  qAStrategy: string;
}

export interface LocalCitation {
  platform: string;
  priority: 'high' | 'medium' | 'low';
  napFormat: string;
}

export interface LocalSearchStrategy {
  gmbOptimization: GMBStrategy;
  localCitations: LocalCitation[];
  neighborhoodStrategy: string;
  reviewStrategy: string;
  localLinkBuilding: string[];
}

export interface RoadmapItem {
  month: string;
  focus: string;
  tasks: string[];
}

export interface SEOIntelligenceReport {
  businessName: string;
  industry: string;
  location: string;
  generatedAt: string;
  seoOpportunityScore: number;
  localSearchScore: number;
  aiSearchScore: number;
  seoSummary: string;
  pageStructure: SEOPage[];
  servicePages: ServicePage[];
  locationPages: LocationPage[];
  blogStrategy: BlogStrategy;
  schemaMarkup: SchemaMarkup;
  sitemapPlan: SitemapPlan;
  robotsConfig: RobotsConfig;
  canonicalPlan: CanonicalPlan;
  metadataTemplates: MetadataTemplates;
  imageAltStrategy: ImageAltStrategy;
  internalLinkingPlan: InternalLinkingPlan;
  keywordClusters: KeywordCluster[];
  semanticKeywordMap: SemanticKeywordMap;
  aiAnswerBlocks: AIAnswerBlock[];
  voiceSearchQuestions: VoiceSearchQuestion[];
  contentAuthorityPlan: ContentAuthorityPlan;
  localSearchStrategy: LocalSearchStrategy;
  quickWins: string[];
  competitorKeywordGaps: string[];
  sixMonthRoadmap: RoadmapItem[];
}

export interface SEOIntelligenceState {
  status: SEOIntelligenceStatus;
  data: SEOIntelligenceReport | null;
  error: string | null;
}
