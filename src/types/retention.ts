export type RetentionStatus = 'idle' | 'loading' | 'complete' | 'error';

export interface RetentionState {
  status: RetentionStatus;
  report: RetentionReferralReport | null;
  error: string | null;
}

// ── Newsletter ──────────────────────────────────────────────────────────────────

export interface NewsletterIssue {
  issueNumber: number;
  subject: string;
  previewText: string;
  contentTheme: string;
  valueOffer: string;
  cta: string;
}

export interface NewsletterStrategy {
  name: string;
  tagline: string;
  frequency: string;
  bestDayTime: string;
  contentPillars: string[];
  sampleIssues: NewsletterIssue[];
  growthTactics: string[];
  segmentationApproach: string;
  subjectLineFormulas: string[];
  unsubscribeReductionTip: string;
}

// ── Loyalty Program ───────────────────────────────────────────────────────────

export interface LoyaltyTier {
  name: string;
  threshold: string;
  perks: string[];
  badge: string;
  emotionalAppeal: string;
}

export interface LoyaltyProgram {
  programName: string;
  premise: string;
  tiers: LoyaltyTier[];
  earnMechanic: string;
  redeemMechanic: string;
  launchCopy: string;
  enrollmentCTA: string;
  techSuggestion: string;
}

// ── VIP Program ──────────────────────────────────────────────────────────────────

export interface VIPOffer {
  name: string;
  trigger: string;
  offer: string;
  copy: string;
  deliveryMethod: string;
  exclusivityAngle: string;
}

export interface VIPProgram {
  overview: string;
  qualificationCriteria: string;
  announcementCopy: string;
  invitationSubject: string;
  invitationBody: string;
  offers: VIPOffer[];
}

// ── Reactivation Campaign ─────────────────────────────────────────────────────

export interface ReactivationEmail {
  touchNumber: number;
  daysSinceLastContact: number;
  subject: string;
  previewText: string;
  body: string;
  cta: string;
  tone: string;
}

export interface ReactivationCampaign {
  campaignName: string;
  triggerCondition: string;
  emails: ReactivationEmail[];
  winBackOffer: string;
  winBackCopy: string;
  sunsetPolicy: string;
  sunsetSubject: string;
  sunsetBody: string;
}

// ── Anniversary Campaign ─────────────────────────────────────────────────────────

export interface AnniversaryTouch {
  milestone: string;
  touchpointType: string;
  subject: string;
  body: string;
  offer: string;
  channel: string;
}

export interface AnniversaryCampaign {
  overview: string;
  touches: AnniversaryTouch[];
  automationNote: string;
  emotionalTone: string;
}

// ── Follow-Up Sequence (Day 1 / 3 / 5 / 7 / 14) ────────────────────────────────

export interface FollowUpEmail {
  day: number;
  type: 'trust-building' | 'case-study' | 'testimonial-proof' | 'cta-reminder' | 'educational-value';
  subject: string;
  previewText: string;
  body: string;
  cta: string;
  goal: string;
  toneNote: string;
  industryAdaptation: string;
}

export interface FollowUpSequence {
  sequenceName: string;
  trigger: string;
  industryAdaptation: string;
  emails: FollowUpEmail[];
  exitCondition: string;
  conversionGoal: string;
  adaptationGuide: string;
}

// ── Customer Spotlight ──────────────────────────────────────────────────────────────

export interface SpotlightTemplate {
  format: string;
  headline: string;
  questions: string[];
  copyFramework: string;
  distributionChannels: string[];
}

export interface CustomerSpotlightSystem {
  overview: string;
  selectionCriteria: string[];
  templates: SpotlightTemplate[];
  outreachSubject: string;
  outreachBody: string;
  incentive: string;
  publishingCadence: string;
}

// ── Review Request Flow ────────────────────────────────────────────────────────────

export interface ReviewRequestEmail {
  touchNumber: number;
  timing: string;
  subject: string;
  body: string;
  cta: string;
  platform: string;
}

export interface ReviewRequestFlow {
  overview: string;
  emails: ReviewRequestEmail[];
  platforms: string[];
  badReviewProtocol: string;
  reviewResponseTemplate: string;
  amplificationStrategy: string;
}

// ── Referral System ────────────────────────────────────────────────────────────────

export interface ReferralTouchpoint {
  timing: string;
  channel: string;
  message: string;
  incentive: string;
}

export interface RetentionReferralSystem {
  systemName: string;
  mechanic: string;
  referrerReward: string;
  refereeReward: string;
  askCopy: string;
  thankYouCopy: string;
  followUpCopy: string;
  touchpoints: ReferralTouchpoint[];
  trackingMethod: string;
  launchAnnouncement: string;
}

// ── Master Report ────────────────────────────────────────────────────────────────

export interface RetentionReferralReport {
  businessName: string;
  industry: string;
  retentionPersonality: string;
  primaryRetentionGoal: string;
  generatedAt: string;

  followUpSequence: FollowUpSequence;
  newsletterStrategy: NewsletterStrategy;
  loyaltyProgram: LoyaltyProgram;
  vipProgram: VIPProgram;
  reactivationCampaign: ReactivationCampaign;
  anniversaryCampaign: AnniversaryCampaign;
  customerSpotlight: CustomerSpotlightSystem;
  reviewRequestFlow: ReviewRequestFlow;
  referralSystem: RetentionReferralSystem;

  retentionPrinciples: string[];
  retentionMetrics: string[];
  thirtyDayRetentionPlan: string[];
}
