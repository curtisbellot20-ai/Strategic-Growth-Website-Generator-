export type PersuasionStatus = 'idle' | 'loading' | 'complete' | 'error';

export interface HeadlineSet {
  primary: string;
  emotional: string;
  transformation: string;
  painPoint: string;
  aspirational: string;
  benefitFirst: string;
  curiosity: string;
  rationale: string;
}

export interface HeroCopy {
  headline: string;
  subheadline: string;
  supportingCopy: string;
  heroMicrocopy: string;
  ctaText: string;
  ctaMicrocopy: string;
  rationale: string;
}

export interface TransformationMessage {
  beforeState: string;
  afterState: string;
  bridge: string;
  emotionalShift: string;
  transformationHeadline: string;
  transformationCopy: string;
}

export interface PainToSolution {
  painStatement: string;
  agitate: string;
  solution: string;
  proof: string;
  callToAction: string;
}

export interface AspirationSection {
  visionStatement: string;
  futureStateCopy: string;
  futurePacingParagraph: string;
  aspirationalHeadline: string;
  possibilityStatement: string;
}

export interface CustomerJourneyNarrative {
  awarenessHook: string;
  considerationCopy: string;
  decisionReassurance: string;
  postPurchaseWelcome: string;
  retentionMessage: string;
}

export interface TrustBuilding {
  authorityStatement: string;
  socialProofIntro: string;
  testimonialFramework: string;
  guaranteeCopy: string;
  riskReductionStatements: string[];
  credentialsCopy: string;
  transparencyCopy: string;
}

export interface CTAVariant {
  buttonText: string;
  microCopy: string;
  context: string;
  emotionalTrigger: string;
}

export interface CTACopy {
  primary: CTAVariant[];
  secondary: CTAVariant[];
  emergency: CTAVariant;
  nurture: CTAVariant;
}

export interface Microcopy {
  ctaSupporting: string[];
  formLabels: string[];
  successMessages: string[];
  tooltipCopy: string[];
  rationale: string;
}

export interface ObjectionHandler {
  objection: string;
  underlyingFear: string;
  ethicalResponse: string;
  copyBlock: string;
  tone: string;
}

export interface StoryBlock {
  type: 'brand' | 'founder' | 'customer' | 'transformation' | 'micro';
  title: string;
  hook: string;
  body: string;
  resolution: string;
  emotionalCore: string;
}

export interface SectionCopy {
  sectionName: string;
  headline: string;
  subheadline: string;
  bodyCopy: string;
  ctaText: string;
  microcopy: string;
}

export interface PersuasionFrameworkReport {
  businessName: string;
  industry: string;
  coreEmotionalPromise: string;
  persuasionPersonality: string;
  ethicalPledge: string;
  generatedAt: string;
  headlineSet: HeadlineSet;
  heroCopy: HeroCopy;
  transformationMessage: TransformationMessage;
  painToSolution: PainToSolution;
  aspirationSection: AspirationSection;
  customerJourney: CustomerJourneyNarrative;
  trustBuilding: TrustBuilding;
  microcopy: Microcopy;
  ctaCopy: CTACopy;
  objectionHandlers: ObjectionHandler[];
  stories: StoryBlock[];
  sectionCopies: SectionCopy[];
  copyRules: string[];
  avoidPhrases: string[];
  powerPhrases: string[];
}

export interface PersuasionState {
  status: PersuasionStatus;
  data: PersuasionFrameworkReport | null;
  error: string | null;
}
