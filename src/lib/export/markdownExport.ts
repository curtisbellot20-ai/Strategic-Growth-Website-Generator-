import type { WebsiteBlueprint } from '@/types';
import type { WebsiteScoreReport } from '@/types/scoring';
import type { SEOIntelligenceReport } from '@/types/seo';
import type { ConversionAcquisitionReport } from '@/types/acquisition';
import type { RetentionReferralReport } from '@/types/retention';
import { formatExportDate } from './downloadUtils';

// ── Primitives ────────────────────────────────────────────────────────────────

function h(level: 1 | 2 | 3 | 4, text: string) {
  return `${'#'.repeat(level)} ${text}\n\n`;
}

function list(items: string[] | undefined, ordered = false) {
  if (!items?.length) return '';
  return items.map((s, i) => `${ordered ? `${i + 1}.` : '-'} ${s}`).join('\n') + '\n\n';
}

function kv(label: string, value: string | number | undefined) {
  if (value == null || value === '') return '';
  return `**${label}:** ${value}\n\n`;
}

const HR = '---\n\n';

function table(headers: string[], rows: (string | number)[][]) {
  const sep = headers.map(() => '---').join(' | ');
  const head = headers.join(' | ');
  const body = rows.map(r => r.join(' | ')).join('\n');
  return `| ${head} |\n| ${sep} |\n${body.split('\n').map(r => `| ${r} |`).join('\n')}\n\n`;
}

// ── Full Blueprint ────────────────────────────────────────────────────────────

export function blueprintToMarkdown(bp: WebsiteBlueprint): string {
  const b = bp.businessIntake;
  let md = '';

  md += `# ${b.businessName} — Website Blueprint\n\n`;
  md += `> *Generated ${formatExportDate()} · Strategic Growth Website Generator*\n\n`;
  md += HR;

  md += h(2, 'Business Overview');
  md += `| Field | Value |\n|-------|-------|\n`;
  md += `| Business | ${b.businessName} |\n`;
  md += `| Tagline | ${b.tagline} |\n`;
  md += `| Industry | ${b.industry} — ${b.subIndustry} |\n`;
  md += `| Location | ${b.city}, ${b.state} |\n`;
  md += `| Primary Service | ${b.primaryService} |\n`;
  md += `| UVP | ${b.uniqueValueProp} |\n`;
  md += `| Primary Goal | ${b.primaryGoal} |\n\n`;
  md += HR;

  md += h(2, 'Strategic Intelligence');
  md += kv('Market Position', bp.strategicIntelligence.marketPosition);
  md += h(3, 'Competitive Advantages');
  md += list(bp.strategicIntelligence.competitiveAdvantage);
  md += h(3, 'Key Messages');
  md += list(bp.strategicIntelligence.keyMessages);
  md += h(3, 'Growth Opportunities');
  md += list(bp.strategicIntelligence.growthOpportunities);
  md += h(3, 'Risk Factors');
  md += list(bp.strategicIntelligence.riskFactors);
  md += HR;

  md += seoStrategyToMarkdown(bp);
  md += HR;

  md += pageStructureToMarkdown(bp);
  md += HR;

  md += h(2, 'Conversion Engine');
  md += kv('Primary CTA', `"${bp.conversionEngine.primaryCTA.text}" — ${bp.conversionEngine.primaryCTA.subtext}`);
  md += h(3, 'Lead Magnets');
  md += list(bp.conversionEngine.leadMagnets);
  md += h(3, 'Objection Handlers');
  bp.conversionEngine.objectionHandlers.forEach(oh => {
    md += `**Objection:** ${oh.objection}\n\n`;
    md += `**Response:** ${oh.response}\n\n`;
  });
  md += HR;

  md += growthReportToMarkdown(bp);
  md += HR;

  md += h(2, 'Improvement Checklist');
  (['critical', 'high', 'medium', 'low'] as const).forEach(p => {
    const items = bp.improvementChecklist.filter(i => i.priority === p);
    if (!items.length) return;
    md += h(3, p.toUpperCase() + ' Priority');
    items.forEach(item => {
      md += `- [ ] **[${item.category}]** ${item.action} *(${item.timeline}, ${item.effort} effort)*\n`;
    });
    md += '\n';
  });

  return md;
}

// ── SEO Strategy (from blueprint) ─────────────────────────────────────────────

export function seoStrategyToMarkdown(bp: WebsiteBlueprint): string {
  const b = bp.businessIntake;
  const seo = bp.seoStrategy;
  let md = '';

  md += h(2, 'SEO / GEO / AEO Strategy');
  md += `> *${b.businessName} — ${b.city}, ${b.state}*\n\n`;

  if (seo.primaryKeywords?.length) {
    md += h(3, 'Primary Keywords');
    md += table(
      ['Keyword', 'Intent', 'Volume', 'Difficulty', 'Priority'],
      seo.primaryKeywords.map(kw => [kw.term, kw.intent, kw.volume, kw.difficulty, kw.priority]),
    );
  }

  if (seo.longTailKeywords?.length) {
    md += h(3, 'Long-Tail Keywords');
    md += list(seo.longTailKeywords.map(kw => `**${kw.term}** (${kw.intent}, ${kw.volume} volume)`));
  }

  if (seo.localKeywords?.length) {
    md += h(3, 'Local Keywords');
    md += list(seo.localKeywords.map(kw => kw.term));
  }

  md += h(3, 'GEO Strategy (Google Maps / Local)');
  md += h(4, 'Google Business Optimization');
  md += list(seo.geoStrategy.googleBusinessOptimization);
  md += h(4, 'Local Citations');
  md += list(seo.geoStrategy.localCitations);
  md += h(4, 'Review Strategy');
  md += list(seo.geoStrategy.reviewStrategy);
  md += h(4, 'Neighborhood Targeting');
  md += list(seo.geoStrategy.neighborhoodTargeting);

  md += h(3, 'AEO Strategy (Answer Engine Optimization)');
  md += h(4, 'Featured Snippet Targets');
  md += list(seo.aeoStrategy.featuredSnippetTargets);
  md += h(4, 'Voice Search Phrases');
  md += list(seo.aeoStrategy.voiceSearchPhrases);
  md += h(4, 'AI Overview Optimization');
  md += list(seo.aeoStrategy.aiOverviewOptimization);

  if (seo.aeoStrategy.faqStrategy?.length) {
    md += h(4, 'FAQ Strategy');
    seo.aeoStrategy.faqStrategy.forEach(faq => {
      md += `**Q:** ${faq.question}\n\n`;
      md += `**A:** ${faq.answer}\n\n`;
      md += `*Schema markup: ${faq.schema ? 'Yes' : 'No'}*\n\n`;
    });
  }

  md += h(3, 'Technical SEO Checklist');
  md += list(seo.technicalSEO);

  if (seo.contentCalendar?.length) {
    md += h(3, 'Content Calendar');
    md += table(
      ['Month', 'Title', 'Type', 'Intent'],
      seo.contentCalendar.map(c => [c.month, c.title, c.type, c.intent]),
    );
  }

  if (seo.backlinkStrategy?.length) {
    md += h(3, 'Backlink Strategy');
    md += list(seo.backlinkStrategy);
  }

  if (seo.schemaMarkup?.length) {
    md += h(3, 'Schema Markup Types');
    md += list(seo.schemaMarkup);
  }

  return md;
}

// ── SEO Intelligence Report (AI engine) ──────────────────────────────────────

export function seoIntelligenceToMarkdown(r: SEOIntelligenceReport): string {
  let md = '';

  md += `# ${r.businessName} — SEO Intelligence Report\n\n`;
  md += `> *${r.location} · Generated ${r.generatedAt}*\n\n`;
  md += `| Metric | Score |\n|--------|-------|\n`;
  md += `| SEO Opportunity | ${r.seoOpportunityScore}/10 |\n`;
  md += `| Local Search | ${r.localSearchScore}/10 |\n`;
  md += `| AI Search | ${r.aiSearchScore}/10 |\n\n`;
  md += kv('Summary', r.seoSummary);
  md += HR;

  if (r.keywordClusters?.length) {
    md += h(2, 'Keyword Clusters');
    md += table(
      ['Cluster', 'Pillar Keyword', 'Volume', 'Difficulty', 'Intent'],
      r.keywordClusters.map(k => [k.clusterName, k.pillarKeyword, k.monthlySearchVolume, k.difficulty, k.intent]),
    );
  }

  if (r.pageStructure?.length) {
    md += h(2, 'Page Structure');
    r.pageStructure.forEach(p => {
      md += h(3, `${p.title}`);
      md += kv('URL', p.url);
      md += kv('H1', p.h1);
      md += kv('Meta', p.metaDescription);
      md += kv('Priority', p.priority);
      md += kv('Word Count Target', p.wordCountTarget.toString());
      if (p.schemaTypes?.length) md += `**Schema:** ${p.schemaTypes.join(', ')}\n\n`;
    });
    md += HR;
  }

  if (r.aiAnswerBlocks?.length) {
    md += h(2, 'AI Answer Blocks');
    r.aiAnswerBlocks.forEach(b => {
      md += h(3, b.question);
      md += `**Direct Answer:** ${b.directAnswer}\n\n`;
      md += `${b.expandedAnswer}\n\n`;
      md += `*Format: ${b.answerFormat} · Targets: ${b.targetedFor}*\n\n`;
    });
    md += HR;
  }

  if (r.schemaMarkup) {
    md += h(2, 'Schema Markup');
    md += h(3, 'Local Business Schema');
    md += `\`\`\`json\n${r.schemaMarkup.localBusinessSchema}\n\`\`\`\n\n`;
    md += h(3, 'FAQ Schema');
    md += `\`\`\`json\n${r.schemaMarkup.faqSchema}\n\`\`\`\n\n`;
    md += HR;
  }

  if (r.sixMonthRoadmap?.length) {
    md += h(2, '6-Month SEO Roadmap');
    r.sixMonthRoadmap.forEach(item => {
      md += h(3, `${item.month}: ${item.focus}`);
      md += list(item.tasks);
    });
  }

  if (r.quickWins?.length) {
    md += h(2, 'Quick Wins');
    md += list(r.quickWins);
  }

  return md;
}

// ── Page Structure ────────────────────────────────────────────────────────────

export function pageStructureToMarkdown(bp: WebsiteBlueprint): string {
  let md = '';

  md += h(2, 'Page Blueprints');
  md += `*${bp.pageBlueprints.length} pages designed for ${bp.businessIntake.businessName}*\n\n`;

  bp.pageBlueprints.forEach((page, i) => {
    md += h(3, `${i + 1}. ${page.title}`);
    md += `**Slug:** \`/${page.slug}\`\n\n`;
    md += kv('Page Type', page.pageType);
    md += kv('H1', page.h1);
    md += kv('Meta Description', page.metaDescription);
    md += kv('Conversion Goal', page.conversionGoal);
    md += kv('Estimated Word Count', page.estimatedWordCount.toString());
    if (page.seoKeywords?.length) md += `**SEO Keywords:** ${page.seoKeywords.join(', ')}\n\n`;

    if (page.sections?.length) {
      md += h(4, 'Sections');
      page.sections.forEach((s, si) => {
        md += `**${si + 1}. ${s.sectionType}**\n\n`;
        md += `*Headline:* "${s.headline}"\n\n`;
        if (s.subheadline) md += `*Subheadline:* "${s.subheadline}"\n\n`;
        md += `${s.body}\n\n`;
        if (s.cta) md += `*CTA:* "${s.cta}"\n\n`;
        if (s.mediaRecommendation) md += `*Media:* ${s.mediaRecommendation}\n\n`;
        if (s.designNotes) md += `*Design Notes:* ${s.designNotes}\n\n`;
      });
    }
    md += HR;
  });

  return md;
}

// ── Copywriting Sections ──────────────────────────────────────────────────────

export function copywritingToMarkdown(bp: WebsiteBlueprint): string {
  const b  = bp.businessIntake;
  const pf = bp.persuasionFramework;
  const sf = bp.storytellingFramework;
  const ce = bp.conversionEngine;
  let md   = '';

  md += `# ${b.businessName} — Copywriting Pack\n\n`;
  md += `> *Publish-ready copy for ${b.businessName} — ${b.city}, ${b.state}*\n\n`;
  md += HR;

  md += h(2, 'Persuasion Framework');
  md += kv('Primary Hook', pf.primaryHook);
  md += h(3, 'Social Proof Strategy');
  md += list(pf.socialProofStrategy);
  md += h(3, 'Authority Builders');
  md += list(pf.authorityBuilders);
  md += h(3, 'Emotional Copy Angles');
  md += list(pf.emotionalCopyAngles);
  md += h(3, 'Reciprocity Offers');
  md += list(pf.reciprocityOffers);
  md += h(3, 'Commitment Ladder');
  md += list(pf.commitmentLadder);
  md += HR;

  md += h(2, 'Storytelling Framework');
  md += h(3, 'Brand Story');
  md += sf.brandStory + '\n\n';
  md += h(3, 'Founder Story');
  md += sf.founderStory + '\n\n';
  md += h(3, 'Customer Hero Journey');
  md += sf.customerHeroJourney + '\n\n';
  md += h(3, 'Before / After / Bridge');
  md += `**Before:** ${sf.beforeAfterBridge.before}\n\n`;
  md += `**After:** ${sf.beforeAfterBridge.after}\n\n`;
  md += `**Bridge:** ${sf.beforeAfterBridge.bridge}\n\n`;
  md += h(3, 'Micro Stories');
  md += list(sf.microStories);
  md += HR;

  md += h(2, 'CTA Copy');
  md += h(3, 'Primary CTA');
  md += `> "${ce.primaryCTA.text}"\n\n`;
  md += kv('Subtext', ce.primaryCTA.subtext);
  md += kv('Placement', ce.primaryCTA.placement);
  md += kv('Style', ce.primaryCTA.style);

  if (ce.secondaryCTAs?.length) {
    md += h(3, 'Secondary CTAs');
    ce.secondaryCTAs.forEach((cta, i) => {
      md += `${i + 1}. **"${cta.text}"** — ${cta.subtext} *(${cta.placement})*\n\n`;
    });
  }
  md += HR;

  md += h(2, 'Objection Handling Copy');
  ce.objectionHandlers.forEach((oh, i) => {
    md += `${i + 1}. **Objection:** "${oh.objection}"\n\n`;
    md += `   **Response:** ${oh.response}\n\n`;
    md += `   *Placement: ${oh.placement}*\n\n`;
  });
  md += HR;

  md += h(2, 'Page Copy Blocks');
  bp.pageBlueprints.forEach(page => {
    md += h(3, page.title);
    md += `**H1:** "${page.h1}"\n\n`;
    page.sections.forEach(s => {
      md += `**${s.sectionType}**\n\n`;
      md += `*"${s.headline}"*\n\n`;
      if (s.subheadline) md += `*"${s.subheadline}"*\n\n`;
      md += s.body + '\n\n';
      if (s.cta) md += `> CTA: "${s.cta}"\n\n`;
    });
    md += HR;
  });

  return md;
}

// ── Business Growth Report ────────────────────────────────────────────────────

export function growthReportToMarkdown(bp: WebsiteBlueprint): string {
  const b = bp.businessIntake;
  let md  = '';

  md += h(2, 'Business Growth Report');
  md += `> *${b.businessName} — ${b.city}, ${b.state} · ${formatExportDate()}*\n\n`;

  md += h(3, 'Customer Acquisition Channels');
  bp.acquisitionEngine.channels.forEach(ch => {
    md += h(4, `${ch.channel} (${ch.priority} priority)`);
    md += h(4, 'Tactics');
    md += list(ch.tactics);
    md += h(4, 'KPIs');
    md += list(ch.kpis);
    if (ch.budget) md += kv('Budget Guidance', ch.budget);
  });

  md += h(3, 'Paid Strategy');
  md += list(bp.acquisitionEngine.paidStrategy);
  md += h(3, 'Organic Strategy');
  md += list(bp.acquisitionEngine.organicStrategy);
  md += h(3, 'Partnership Opportunities');
  md += list(bp.acquisitionEngine.partnershipOpportunities);
  md += HR;

  md += h(3, 'Retention Engine');
  md += h(4, 'Onboarding Sequence');
  md += list(bp.retentionEngine.onboardingSequence);

  if (bp.retentionEngine.emailCadence?.length) {
    md += h(4, 'Email Cadence');
    bp.retentionEngine.emailCadence.forEach(seq => {
      md += `**${seq.name}** — Trigger: ${seq.trigger}\n\n`;
      seq.emails.forEach(e => {
        md += `- **${e.timing}** — "${e.subject}" *(${e.goal})*\n`;
      });
      md += '\n';
    });
  }

  md += h(4, 'Loyalty Mechanisms');
  md += list(bp.retentionEngine.loyaltyMechanisms);
  md += h(4, 'Win-Back Strategy');
  md += list(bp.retentionEngine.winbackStrategy);
  md += HR;

  md += h(3, 'Referral Engine');
  md += kv('Incentive', bp.referralEngine.referralProgram.incentive);
  md += kv('Mechanism', bp.referralEngine.referralProgram.mechanism);
  md += kv('Messaging', bp.referralEngine.referralProgram.messaging);
  md += kv('Tracking', bp.referralEngine.referralProgram.trackingMethod);
  md += h(4, 'Review Generation');
  md += list(bp.referralEngine.reviewGeneration);
  md += h(4, 'Social Amplification');
  md += list(bp.referralEngine.socialAmplification);
  md += HR;

  md += h(3, 'Analytics & KPIs');
  if (bp.analyticsChecklist.kpiDashboard?.length) {
    md += table(
      ['KPI', 'Target', 'Tool', 'Frequency'],
      bp.analyticsChecklist.kpiDashboard.map(k => [k.name, k.target, k.tool, k.frequency]),
    );
  }
  md += h(4, 'Conversion Goals');
  md += list(bp.analyticsChecklist.conversionGoals);
  md += h(4, 'Monthly Review Items');
  md += list(bp.analyticsChecklist.monthlyReviewItems);

  return md;
}

// ── Scoring Report ────────────────────────────────────────────────────────────

export function scoringReportToMarkdown(
  bp: WebsiteBlueprint,
  ai?: WebsiteScoreReport,
): string {
  const b = bp.businessIntake;
  let md  = '';

  if (ai) {
    md += `# ${b.businessName} — Website Scoring Report\n\n`;
    md += `**Overall Score:** ${ai.overallScore}/10 (${ai.overallGrade})\n\n`;
    md += `**Personality:** ${ai.scorePersonality}\n\n`;
    md += `> ${ai.scoreSummary}\n\n`;
    md += `*Generated: ${ai.generatedAt}*\n\n`;
    md += HR;

    if (ai.groupSummaries?.length) {
      md += h(2, 'Group Summaries');
      ai.groupSummaries.forEach(g => {
        md += h(3, `${g.groupName} — ${g.averageScore.toFixed(1)}/10`);
        md += g.insight + '\n\n';
      });
      md += HR;
    }

    md += h(2, 'Score Summary Table');
    md += table(
      ['Category', 'Score', 'Grade', 'Priority', 'Quick Win'],
      ai.dimensions.map(d => [d.category, `${d.score}/10`, d.grade, d.priority, d.quickWin]),
    );
    md += HR;

    md += h(2, 'Dimension Detail');
    ai.dimensions.forEach(d => {
      md += h(3, `${d.category} — ${d.score}/10 (${d.grade})`);
      md += d.summary + '\n\n';
      md += `**Why this score:** ${d.why}\n\n`;
      if (d.missing?.length) {
        md += h(4, "What's Missing");
        md += list(d.missing);
      }
      if (d.improvements?.length) {
        md += h(4, 'How to reach 10/10');
        md += list(d.improvements);
      }
      md += kv('Quick Win', d.quickWin);
      md += HR;
    });

    md += h(2, 'Top Strengths');
    md += list(ai.topStrengths);
    md += h(2, 'Critical Gaps');
    md += list(ai.criticalGaps);
    md += h(2, 'Quick Wins');
    md += list(ai.quickWins);
    md += h(2, '30-Day Improvement Plan');
    md += list(ai.thirtyDayImprovementPlan, true);
  } else {
    const sr = bp.scoringReport;
    md += `# ${b.businessName} — Website Scoring Report\n\n`;
    md += `**Overall Score:** ${sr.overallScore}/100\n\n`;
    md += `*Generated ${formatExportDate()}*\n\n`;
    md += HR;

    md += h(2, 'Category Scores');
    md += table(
      ['Category', 'Score', 'Notes'],
      sr.categoryScores.map(c => [c.category, `${c.score}/${c.maxScore}`, c.notes]),
    );

    md += h(2, 'Strengths');
    md += list(sr.strengths);
    md += h(2, 'Weaknesses');
    md += list(sr.weaknesses);
    md += h(2, 'Quick Wins');
    md += list(sr.quickWins);
    md += h(2, 'Priority Actions');
    md += list(sr.priorityActions, true);
  }

  return md;
}

// ── Acquisition Report (AI engine) ───────────────────────────────────────────

export function acquisitionReportToMarkdown(r: ConversionAcquisitionReport): string {
  let md = '';

  md += `# ${r.businessName} — Customer Acquisition Plan\n\n`;
  md += `> *${r.acquisitionPersonality}*\n\n`;
  md += `*Generated: ${r.generatedAt}*\n\n`;
  md += HR;

  md += h(2, 'Hero CTA Block');
  md += kv('Headline', r.heroCTA.headline);
  md += kv('Subheadline', r.heroCTA.subheadline);
  md += `**Primary CTA:** "${r.heroCTA.primaryCTA}"\n\n`;
  md += `**Secondary CTA:** "${r.heroCTA.secondaryCTA}"\n\n`;
  md += kv('Micro Copy', r.heroCTA.microCopy);
  md += kv('Social Proof Note', r.heroCTA.socialProofNote);
  md += HR;

  md += h(2, 'Trust Bar');
  md += kv('Headline', r.trustBar.headline);
  r.trustBar.items.forEach(item => {
    md += `- **${item.value}** — ${item.label}: ${item.supportingText}\n`;
  });
  md += '\n';
  md += HR;

  md += h(2, 'Lead Magnets');
  r.leadMagnets.forEach(lm => {
    md += h(3, lm.title);
    md += kv('Format', lm.format);
    md += kv('Value Proposition', lm.valueProposition);
    md += kv('CTA Text', lm.ctaText);
    md += kv('Landing Page Headline', lm.landingPageHeadline);
  });
  md += HR;

  md += h(2, 'Consultation Funnel');
  md += kv('Funnel Name', r.consultationFunnel.funnelName);
  r.consultationFunnel.steps.forEach(s => {
    md += `**Step ${s.step}: ${s.name}**\n\n${s.copy}\n\n`;
  });
  md += HR;

  md += h(2, 'Email Capture Strategy');
  md += kv('Primary Offer', r.emailCapture.primaryOffer);
  md += h(3, 'Welcome Sequence');
  md += list(r.emailCapture.welcomeSequence);
  md += HR;

  md += h(2, 'Retargeting Plan');
  md += r.retargeting.overview + '\n\n';
  r.retargeting.audiences.forEach(a => {
    md += h(3, a.name);
    md += kv('Platform', a.platform);
    md += kv('Messaging', a.messagingAngle);
    md += kv('Offer', a.offerIdea);
  });
  md += HR;

  md += h(2, 'Priority Actions');
  md += list(r.priorityActions, true);
  md += h(2, '30-Day Acquisition Plan');
  md += list(r.thirtyDayPlan, true);

  return md;
}

// ── Retention Report (AI engine) ─────────────────────────────────────────────

export function retentionReportToMarkdown(r: RetentionReferralReport): string {
  let md = '';

  md += `# ${r.businessName} — Retention & Referral Plan\n\n`;
  md += `> *${r.retentionPersonality}*\n\n`;
  md += `*Generated: ${r.generatedAt}*\n\n`;
  md += HR;

  md += h(2, 'Follow-Up Sequence (Day 1 / 3 / 5 / 7 / 14)');
  md += kv('Sequence Name', r.followUpSequence.sequenceName);
  md += kv('Trigger', r.followUpSequence.trigger);
  md += kv('Industry Adaptation', r.followUpSequence.industryAdaptation);
  r.followUpSequence.emails.forEach(email => {
    md += h(3, `Day ${email.day}: ${email.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`);
    md += `**Subject:** "${email.subject}"\n\n`;
    md += `**Preview:** "${email.previewText}"\n\n`;
    md += email.body + '\n\n';
    md += `**CTA:** "${email.cta}"\n\n`;
    md += kv('Goal', email.goal);
    md += HR;
  });

  md += h(2, 'Loyalty Program');
  md += kv('Program Name', r.loyaltyProgram.programName);
  md += kv('Earn Mechanic', r.loyaltyProgram.earnMechanic);
  md += kv('Redeem Mechanic', r.loyaltyProgram.redeemMechanic);
  r.loyaltyProgram.tiers.forEach(tier => {
    md += h(3, tier.name);
    md += kv('Threshold', tier.threshold);
    md += list(tier.perks);
  });
  md += HR;

  md += h(2, 'Reactivation Campaign');
  md += kv('Win-Back Offer', r.reactivationCampaign.winBackOffer);
  r.reactivationCampaign.emails.forEach(e => {
    md += h(3, `Touch ${e.touchNumber} (Day ${e.daysSinceLastContact})`);
    md += `**Subject:** "${e.subject}"\n\n${e.body}\n\n`;
    md += `**CTA:** "${e.cta}"\n\n`;
  });
  md += HR;

  md += h(2, 'Referral System');
  md += kv('System Name', r.referralSystem.systemName);
  md += kv('Referrer Reward', r.referralSystem.referrerReward);
  md += kv('Referee Reward', r.referralSystem.refereeReward);
  md += h(3, 'Ask Copy');
  md += r.referralSystem.askCopy + '\n\n';
  md += HR;

  md += h(2, 'Review Request Flow');
  r.reviewRequestFlow.emails.forEach(e => {
    md += h(3, `Touch ${e.touchNumber} (${e.timing})`);
    md += `**Subject:** "${e.subject}"\n\n${e.body}\n\n`;
  });
  md += HR;

  md += h(2, '30-Day Retention Plan');
  md += list(r.thirtyDayRetentionPlan, true);

  return md;
}
