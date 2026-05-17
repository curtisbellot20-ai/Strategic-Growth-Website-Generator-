'use client';
import { motion } from 'framer-motion';
import {
  Brain, ShieldCheck, Zap, TrendingUp, RefreshCw,
  Share2, FileText, MousePointer, Palette, Target,
  BarChart2, Lightbulb,
} from 'lucide-react';
import type { IndustryIntelligence } from '@/types/intelligence';

// ---- Shared primitives ----
function SectionTitle({ icon: Icon, label, color = 'text-sky-400' }: { icon: React.ElementType; label: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className={`w-5 h-5 ${color}`} />
      <h3 className="text-base font-bold text-white">{label}</h3>
    </div>
  );
}

function Pill({ text, variant = 'blue' }: { text: string; variant?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange' }) {
  const map = {
    blue:   'bg-blue-900/40 text-blue-300 border-blue-700/40',
    green:  'bg-green-900/40 text-green-300 border-green-700/40',
    yellow: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/40',
    red:    'bg-red-900/40 text-red-300 border-red-700/40',
    purple: 'bg-purple-900/40 text-purple-300 border-purple-700/40',
    orange: 'bg-orange-900/40 text-orange-300 border-orange-700/40',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[variant]}`}>
      {text}
    </span>
  );
}

function BulletList({ items, color = 'text-gray-300' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`text-sm ${color} flex items-start gap-2`}>
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SubSection({ title, items, color }: { title: string; items: string[]; color?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">{title}</p>
      <BulletList items={items} color={color} />
    </div>
  );
}

// ---- Score Ring ----
function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="-mt-16 mb-10 text-center">
        <p className="text-2xl font-black" style={{ color }}>{score}</p>
        <p className="text-[10px] text-gray-500">/100</p>
      </div>
      <p className="text-xs text-gray-400 font-medium text-center">{label}</p>
    </div>
  );
}

// ---- Main Component ----
export default function IntelligenceReport({ data }: { data: IndustryIntelligence }) {
  const impactColor = (v: string) =>
    v === 'critical' || v === 'high' ? 'green' :
    v === 'medium' ? 'yellow' : 'blue';

  const effortColor = (v: string) =>
    v === 'low' ? 'green' : v === 'medium' ? 'yellow' : 'red';

  return (
    <div className="space-y-6">

      {/* ---- Hero Header ---- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-blue">Industry Intelligence Report</span>
              <span className="badge-purple">{data.industry}</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{data.generatedFor}</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
              {data.industrySuccessSummary}
            </p>
          </div>
          <div className="flex gap-8 flex-shrink-0">
            <ScoreRing score={data.marketOpportunityScore}    label="Market Opportunity"     color="#22c55e" />
            <ScoreRing score={data.competitiveAdvantageScore} label="Competitive Advantage"  color="#0ea5e9" />
          </div>
        </div>
      </motion.div>

      {/* ---- Customer Psychology ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.05 }} className="card">
        <SectionTitle icon={Brain} label="Customer Psychology Profile" color="text-purple-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SubSection title="Primary Motivations"     items={data.customerPsychology.primaryMotivations}      color="text-purple-300" />
          <SubSection title="Emotional Buying Triggers" items={data.customerPsychology.emotionalBuyingTriggers} color="text-pink-300" />
          <SubSection title="Key Fears"              items={data.customerPsychology.keyFears}                color="text-orange-300" />
          <SubSection title="Deepest Aspirations"    items={data.customerPsychology.deepestAspirations}      color="text-green-300" />
          <SubSection title="Identity Factors"       items={data.customerPsychology.identityFactors}         />
          <SubSection title="Social Influences"      items={data.customerPsychology.socialInfluences}        />
          <div className="sm:col-span-2 p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Decision-Making Style</p>
            <p className="text-sm text-purple-300">{data.customerPsychology.decisionMakingStyle}</p>
          </div>
        </div>
      </motion.div>

      {/* ---- Trust Signals ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.08 }} className="card">
        <SectionTitle icon={ShieldCheck} label="Trust Signals" color="text-green-400" />
        <div className="space-y-3">
          {data.trustSignals.map((ts, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-gray-200 flex-1">{ts.signal}</p>
                <Pill text={ts.impact} variant={impactColor(ts.impact) as 'green' | 'yellow' | 'blue'} />
                {ts.industrySpecific && <Pill text="Industry-Specific" variant="purple" />}
              </div>
              <p className="text-xs text-gray-500 mb-1"><span className="text-gray-400">Placement:</span> {ts.placement}</p>
              <p className="text-xs text-gray-500"><span className="text-gray-400">Implementation:</span> {ts.implementation}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ---- Common Objections ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.10 }} className="card">
        <SectionTitle icon={Zap} label="Common Objections & Handlers" color="text-yellow-400" />
        <div className="space-y-4">
          {data.commonObjections.map((obj, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl">
              <div className="flex flex-wrap items-start gap-2 mb-3">
                <p className="text-sm font-semibold text-red-300 flex-1">&ldquo;{obj.objection}&rdquo;</p>
                <Pill
                  text={obj.frequency.replace('_', ' ')}
                  variant={obj.frequency === 'very_common' ? 'red' : obj.frequency === 'common' ? 'yellow' : 'blue'}
                />
              </div>
              <p className="text-xs text-gray-500 mb-2">
                <span className="text-orange-400 font-medium">Underlying fear: </span>{obj.underlyingFear}
              </p>
              <div className="pl-3 border-l-2 border-green-500/40">
                <p className="text-xs text-gray-400 mb-1 font-medium">Handler:</p>
                <p className="text-sm text-green-300">{obj.handler}</p>
              </div>
              <p className="text-xs text-gray-600 mt-2">Site placement: {obj.placementOnSite}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ---- Highest Converting Offers ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.12 }} className="card">
        <SectionTitle icon={TrendingUp} label="Highest-Converting Offer Structures" color="text-sky-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.highestConvertingOffers.map((offer, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-sky-500/20 transition-all">
              <p className="text-sm font-bold text-sky-300 mb-2">{offer.offer}</p>
              <p className="text-xs text-gray-400 mb-1"><span className="text-gray-300">Why it converts:</span> {offer.conversionReason}</p>
              <p className="text-xs text-gray-400 mb-1"><span className="text-gray-300">Pricing insight:</span> {offer.pricingInsight}</p>
              <p className="text-xs text-gray-400 mb-1"><span className="text-gray-300">Positioning:</span> {offer.positioning}</p>
              <p className="text-xs text-gray-500">Ideal for: {offer.idealFor}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ---- Industry Success Patterns ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.14 }} className="card">
        <SectionTitle icon={BarChart2} label="Industry Success Patterns" color="text-indigo-400" />
        <div className="space-y-4">
          {data.industrySuccessPatterns.map((p, i) => {
            const priorityStyle = p.priority === 'must_have' ? 'border-red-500/40 bg-red-500/5' :
              p.priority === 'should_have' ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-gray-700';
            const priorityLabel = p.priority === 'must_have' ? '🔴 Must Have' :
              p.priority === 'should_have' ? '🟡 Should Have' : '🟢 Nice to Have';
            return (
              <div key={i} className={`p-4 rounded-xl border ${priorityStyle}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-gray-200">{p.pattern}</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{priorityLabel}</span>
                </div>
                <p className="text-xs text-gray-400 mb-1"><span className="text-gray-300">Why it works:</span> {p.whyItWorks}</p>
                <p className="text-xs text-sky-400">→ {p.implementation}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SubSection title="Profitable Business Patterns" items={data.profitableBusinessPatterns} color="text-green-300" />
          <SubSection title="Premium Positioning Cues"   items={data.premiumPositioningCues}    color="text-yellow-300" />
        </div>
      </motion.div>

      {/* ---- Retention & Referrals ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }} className="card">
        <SectionTitle icon={RefreshCw} label="Retention Drivers" color="text-teal-400" />
        <div className="space-y-3 mb-6">
          {data.retentionDrivers.map((rd, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl flex items-start gap-4">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                rd.impact === 'high' ? 'bg-green-500' : rd.impact === 'medium' ? 'bg-yellow-500' : 'bg-gray-600'
              }`} />
              <div>
                <p className="text-sm font-semibold text-gray-200 mb-1">{rd.driver}</p>
                <p className="text-xs text-gray-500 mb-1">{rd.psychologicalBasis}</p>
                <p className="text-xs text-teal-400">→ {rd.tactic}</p>
              </div>
            </div>
          ))}
        </div>
        <SectionTitle icon={Share2} label="Referral Opportunities" color="text-pink-400" />
        <BulletList items={data.referralOpportunities} color="text-pink-300" />
      </motion.div>

      {/* ---- Content & SEO ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.18 }} className="card">
        <SectionTitle icon={FileText} label="Content Strategy" color="text-orange-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <SubSection title="Top-Performing Content Types" items={data.contentStrategy.topPerformingContentTypes} />
          <SubSection title="Audience Content Angles"       items={data.contentStrategy.audienceContentAngles}     color="text-orange-300" />
          <SubSection title="Content Calendar Themes"       items={data.contentStrategy.contentCalendarThemes}     />
          <SubSection title="Viral Content Opportunities"   items={data.contentStrategy.viralContentOpportunities} color="text-yellow-300" />
          <div className="sm:col-span-2">
            <SubSection title="Authority Content Formats" items={data.contentStrategy.authorityContentFormats} color="text-sky-300" />
          </div>
        </div>

        <SectionTitle icon={Target} label="SEO Page Structure" color="text-blue-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SubSection title="Priority Pages"                  items={data.seoStructure.priorityPages}                  />
          <SubSection title="Keyword Clusters"               items={data.seoStructure.keywordClusters}               color="text-blue-300" />
          <SubSection title="Local SEO Priorities"           items={data.seoStructure.localSEOPriorities}           />
          <SubSection title="Content Hubs"                   items={data.seoStructure.contentHubs}                   color="text-indigo-300" />
          <div className="sm:col-span-2">
            <SubSection title="Featured Snippet Opportunities" items={data.seoStructure.featuredSnippetOpportunities} color="text-green-300" />
          </div>
        </div>
      </motion.div>

      {/* ---- CTA & Atmosphere ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.20 }} className="card">
        <SectionTitle icon={MousePointer} label="CTA Strategy" color="text-sky-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <SubSection title="Primary CTA Recommendations" items={data.ctaStrategy.primaryCTARecommendations} color="text-sky-300" />
          <SubSection title="Micro-Commitment CTAs"       items={data.ctaStrategy.microCommitmentCTAs}       />
          <SubSection title="CTA Placement Priority"      items={data.ctaStrategy.ctaPlacementPriority}      />
          <SubSection title="CTA Language Patterns"       items={data.ctaStrategy.ctaLanguagePatterns}       color="text-green-300" />
          <div className="sm:col-span-2">
            <SubSection title="Urgency Mechanisms" items={data.ctaStrategy.urgencyMechanisms} color="text-orange-300" />
          </div>
        </div>

        <SectionTitle icon={Palette} label="Atmosphere Strategy" color="text-purple-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SubSection title="Visual Theme Recommendations"  items={data.atmosphereStrategy.visualThemeRecommendations}  color="text-purple-300" />
          <SubSection title="Color Psychology Guidance"     items={data.atmosphereStrategy.colorPsychologyGuidance}     color="text-pink-300" />
          <SubSection title="Imagery Recommendations"       items={data.atmosphereStrategy.imageryRecommendations}       />
          <SubSection title="Design Principles for Industry" items={data.atmosphereStrategy.designPrinciplesByIndustry}   />
          <div className="sm:col-span-2">
            <SubSection title="Luxury Signals for Industry" items={data.atmosphereStrategy.luxurySignalsForIndustry} color="text-yellow-300" />
          </div>
        </div>
      </motion.div>

      {/* ---- Recommended Website Strategy ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22 }} className="card border border-sky-500/20 bg-sky-500/5">
        <SectionTitle icon={Lightbulb} label="Recommended Website Strategy" color="text-sky-300" />
        <div className="p-4 bg-sky-500/10 rounded-xl mb-6">
          <p className="text-sm text-sky-200 leading-relaxed">{data.recommendedWebsiteStrategy.strategicOverview}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SubSection title="Top Priorities"         items={data.recommendedWebsiteStrategy.topPriorities} color="text-sky-300" />
          <SubSection title="Key Pages to Build"     items={data.recommendedWebsiteStrategy.keyPages}      />
          <SubSection title="Critical Sections"      items={data.recommendedWebsiteStrategy.criticalSections} />
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Differentiation Strategy</p>
            <p className="text-sm text-gray-300">{data.recommendedWebsiteStrategy.differentiationStrategy}</p>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2 mt-4">Homepage Strategy</p>
            <p className="text-sm text-gray-300">{data.recommendedWebsiteStrategy.homepageStrategy}</p>
          </div>
        </div>
      </motion.div>

      {/* ---- Customer Motivation Profile ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.24 }} className="card border border-purple-500/20 bg-purple-500/5">
        <SectionTitle icon={Brain} label="Customer Motivation Profile" color="text-purple-300" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Primary Driver</p>
            <p className="text-sm font-bold text-purple-300">{data.customerMotivationProfile.primaryDriver}</p>
          </div>
          <div className="p-3 bg-pink-500/10 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Emotional Hook</p>
            <p className="text-sm font-bold text-pink-300">{data.customerMotivationProfile.emotionalHook}</p>
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-xl mb-4">
          <p className="text-xs text-gray-500 mb-1">Messaging Framework</p>
          <p className="text-sm text-gray-300">{data.customerMotivationProfile.messagingFramework}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SubSection title="Copy Angles"            items={data.customerMotivationProfile.copyAngles}           color="text-purple-300" />
          <SubSection title="Hero Headline Formulas" items={data.customerMotivationProfile.heroHeadlineFormulas} color="text-pink-300" />
          <div className="sm:col-span-2">
            <SubSection title="Secondary Drivers" items={data.customerMotivationProfile.secondaryDrivers} />
          </div>
        </div>
      </motion.div>

      {/* ---- Conversion Opportunities ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.26 }} className="card">
        <SectionTitle icon={Zap} label="Conversion Opportunities" color="text-yellow-400" />
        <div className="space-y-3">
          {data.conversionOpportunities.map((opp, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <p className="text-sm font-semibold text-gray-200 flex-1">{opp.opportunity}</p>
                {opp.quickWin && <Pill text="Quick Win" variant="green" />}
                <Pill text={`Impact: ${opp.impact}`} variant={impactColor(opp.impact) as 'green'|'yellow'|'blue'} />
                <Pill text={`Effort: ${opp.effort}`} variant={effortColor(opp.effort) as 'green'|'yellow'|'red'} />
              </div>
              <p className="text-xs text-gray-400">{opp.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ---- Trust Building ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.28 }} className="card">
        <SectionTitle icon={ShieldCheck} label="Trust-Building Recommendations" color="text-green-400" />
        <BulletList items={data.trustBuildingRecommendations} color="text-green-300" />
      </motion.div>

      {/* ---- Growth Opportunities ---- */}
      <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.30 }} className="card border border-green-500/20 bg-green-500/5">
        <SectionTitle icon={TrendingUp} label="Growth Opportunities" color="text-green-400" />
        <div className="space-y-4">
          {data.growthOpportunities.map((g, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-green-500/10">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-sm font-bold text-green-300 flex-1">{g.opportunity}</p>
                <Pill text={g.channel} variant="blue" />
                <Pill text={g.timeframe} variant="purple" />
              </div>
              <p className="text-xs text-gray-400 mb-1">{g.rationale}</p>
              <p className="text-xs text-green-400 font-medium">Revenue Impact: {g.revenueImpact}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
