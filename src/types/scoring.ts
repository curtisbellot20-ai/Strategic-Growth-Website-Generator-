export type ScoringStatus = 'idle' | 'loading' | 'complete' | 'error';

export type ScorePriority = 'critical' | 'high' | 'medium' | 'low';
export type ScoreGrade    = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

export type ScoreCategory =
  | 'Branding'
  | 'SEO'
  | 'Local SEO'
  | 'GEO'
  | 'AEO'
  | 'Speed'
  | 'Mobile UX'
  | 'Accessibility'
  | 'Conversion'
  | 'Trust'
  | 'Storytelling'
  | 'Atmosphere'
  | 'Creative Design'
  | 'Customer Acquisition'
  | 'Retention'
  | 'Referral Readiness'
  | 'Analytics Readiness';

export interface ScoreDimension {
  category: ScoreCategory;
  score: number;
  grade: ScoreGrade;
  summary: string;
  why: string;
  missing: string[];
  improvements: string[];
  quickWin: string;
  priority: ScorePriority;
}

export interface ScoreGroupSummary {
  groupName: string;
  averageScore: number;
  insight: string;
}

export interface WebsiteScoreReport {
  businessName: string;
  industry: string;
  overallScore: number;
  overallGrade: ScoreGrade;
  scorePersonality: string;
  scoreSummary: string;
  generatedAt: string;

  dimensions: ScoreDimension[];
  groupSummaries: ScoreGroupSummary[];

  topStrengths: string[];
  criticalGaps: string[];
  quickWins: string[];
  thirtyDayImprovementPlan: string[];
}

export interface ScoringState {
  status: ScoringStatus;
  report: WebsiteScoreReport | null;
  error: string | null;
}
