export type AcquisitionStatus = 'idle' | 'loading' | 'complete' | 'error';

export interface AcquisitionState {
  status: AcquisitionStatus;
  report: ConversionAcquisitionReport | null;
  error: string | null;
}

// ── Conversion Elements ──────────────────────────────────────────────────────

export interface HeroCTABlock {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  microCopy: string;
  socialProofNote: string;
  visualRecommendation: string;
  rationale: string;
}

export interface StickyMobileCTA {
  primaryText: string;
  secondaryText: string;
  iconSuggestion: string;
  triggerBehavior: string;
  colorGuidance: string;
  abVariants: string[];
}

export interface TrustItem {
  type: 'stat' | 'award' | 'certification' | 'media' | 'guarantee' | 'years';
  label: string;
  value: string;
  supportingText: string;
}

export interface TrustBar {
  headline: string;
  items: TrustItem[];
  placement: string;
  designNote: string;
}

export interface TestimonialStrategy {
  sectionHeadline: string;
  format: string;
  count: number;
  selectionCriteria: string[];
  displayStyle: string;
  videoVsText: string;
  placementZones: string[];
  promptQuestions: string[];
}

export interface BeforeAfterPair {
  before: string;
  after: string;
  context: string;
}

export interface BeforeAfterSection {
  headline: string;
  subheadline: string;
  pairs: BeforeAfterPair[];
  format: string;
  emotionalCore: string;
  ctaAfter: string;
}

export interface ConversionFAQItem {
  question: string;
  answer: string;
  category: string;
  conversionIntent: string;
}

export interface FAQStrategy {
  sectionHeadline: string;
  items: ConversionFAQItem[];
  structuredDataNote: string;
  placement: string;
}

export interface ObjectionReframe {
  objection: string;
  reframe: string;
  copyBlock: string;
  placement: string;
}

export interface ObjectionSection {
  sectionHeadline: string;
  handlers: ObjectionReframe[];
  designRecommendation: string;
}

export interface FinalCTABlock {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  microCopy: string;
  guarantee: string;
  urgencyNote: string;
  designStyle: string;
}

export interface NextStepItem {
  step: number;
  action: string;
  detail: string;
  icon: string;
}

export interface NextSteps {
  headline: string;
  steps: NextStepItem[];
  clearestPath: string;
}

// ── Lead Generation Assets ───────────────────────────────────────────────────

export interface LeadMagnetIdea {
  title: string;
  format: string;
  topic: string;
  valueProposition: string;
  deliveryMethod: string;
  ctaText: string;
  landingPageHeadline: string;
  emailSequenceSuggestion: string;
}

export interface FreeGuideIdea {
  title: string;
  subtitle: string;
  chapters: string[];
  targetProblem: string;
  deliveryFormat: string;
  ctaText: string;
}

export interface PricingGuideIdea {
  title: string;
  premise: string;
  sections: string[];
  psychologyNote: string;
  ctaAfterDownload: string;
}

export interface ChecklistIdea {
  title: string;
  items: string[];
  useCase: string;
  ctaText: string;
  printFriendly: boolean;
}

// ── Funnel Systems ───────────────────────────────────────────────────────────

export interface FunnelStep {
  step: number;
  name: string;
  action: string;
  goal: string;
  copy: string;
}

export interface ConsultationFunnel {
  funnelName: string;
  entryPoints: string[];
  steps: FunnelStep[];
  bookingPlatformSuggestion: string;
  confirmationEmailCopy: string;
  reminderSequence: string[];
  noShowStrategy: string;
  followUpSequence: string[];
}

export interface EmailCaptureStrategy {
  primaryOffer: string;
  placementZones: string[];
  formHeadlines: string[];
  segmentationApproach: string;
  welcomeEmailSubject: string;
  welcomeSequence: string[];
  automationTips: string[];
}

export interface SMSCaptureStrategy {
  offer: string;
  optInMechanism: string;
  keywordTrigger: string;
  initialMessage: string;
  followUpFlow: string[];
  complianceReminder: string;
}

export interface ContactFormStrategy {
  headline: string;
  fields: string[];
  submitButtonText: string;
  confirmationMessage: string;
  notificationStrategy: string;
  responseTimeCopy: string;
}

// ── Traffic & Acquisition ────────────────────────────────────────────────────

export interface RetargetAudience {
  name: string;
  definition: string;
  messagingAngle: string;
  offerIdea: string;
  platform: string;
}

export interface RetargetingPlan {
  overview: string;
  audiences: RetargetAudience[];
  platforms: string[];
  budgetGuidance: string;
  creativeIdeas: string[];
  sequenceLogic: string;
}

export interface PlatformContentStrategy {
  platform: string;
  contentPillars: string[];
  postingCadence: string;
  formatMix: string[];
  topPostIdeas: string[];
  hashtagStrategy: string;
}

export interface SocialContentPlan {
  overview: string;
  platforms: PlatformContentStrategy[];
  viralHooks: string[];
  contentCalendarNote: string;
}

export interface ReferralCampaign {
  campaignName: string;
  mechanic: string;
  referrerIncentive: string;
  refereeIncentive: string;
  messagingTemplate: string;
  askCopy: string;
  trackingMethod: string;
  launchSequence: string[];
  successMetrics: string[];
}

// ── Master Report ────────────────────────────────────────────────────────────

export interface ConversionAcquisitionReport {
  businessName: string;
  industry: string;
  acquisitionPersonality: string;
  primaryConversionGoal: string;
  generatedAt: string;

  heroCTA: HeroCTABlock;
  stickyMobileCTA: StickyMobileCTA;
  trustBar: TrustBar;
  testimonialStrategy: TestimonialStrategy;
  beforeAfterSection: BeforeAfterSection;
  faqStrategy: FAQStrategy;
  objectionSection: ObjectionSection;
  finalCTA: FinalCTABlock;
  nextSteps: NextSteps;

  leadMagnets: LeadMagnetIdea[];
  freeGuides: FreeGuideIdea[];
  pricingGuides: PricingGuideIdea[];
  checklists: ChecklistIdea[];

  consultationFunnel: ConsultationFunnel;
  emailCapture: EmailCaptureStrategy;
  smsCapture: SMSCaptureStrategy;
  contactForm: ContactFormStrategy;

  retargeting: RetargetingPlan;
  socialContent: SocialContentPlan;
  referralCampaigns: ReferralCampaign[];

  conversionPrinciples: string[];
  priorityActions: string[];
  thirtyDayPlan: string[];
}
