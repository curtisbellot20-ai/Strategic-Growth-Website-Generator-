'use client';
import { useState } from 'react';
import { ChevronRight, Copy, Check, Globe, MapPin, Brain, Mic, FileText, Code, Link, BarChart2, Clock, Zap } from 'lucide-react';
import type { SEOIntelligenceReport, KeywordCluster, AIAnswerBlock, VoiceSearchQuestion, RoadmapItem, LinkSilo, LocalCitation } from '@/types/seo';

// ── primitives ──────────────────────────────────────────────────────────────

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-green-400">{icon}</div>
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Pill({ c, children }: { c?: string; children: React.ReactNode }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c ?? 'bg-white/10 text-gray-300'}`}>{children}</span>;
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return <ul className="space-y-1.5">{items.map((it, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><ChevronRight className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />{it}</li>)}</ul>;
}

function CodeBox({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const pretty = (() => { try { return JSON.stringify(JSON.parse(code), null, 2); } catch { return code; } })();
  const copy = () => { navigator.clipboard.writeText(pretty); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative bg-black/40 rounded-xl border border-white/10">
      <button onClick={copy} className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-gray-500 hover:text-white px-2 py-1 rounded bg-white/5">
        {copied ? <><Check className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
      </button>
      <pre className="p-4 text-xs text-gray-300 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">{pretty}</pre>
    </div>
  );
}

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 34, c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={r} strokeWidth="7" stroke="rgba(255,255,255,0.08)" fill="none" />
          <circle cx="40" cy="40" r={r} strokeWidth="7" stroke={color} fill="none" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c - (score / 100) * c} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white leading-none">{score}</span>
          <span className="text-[8px] text-gray-500">/100</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  );
}

const DIFF: Record<string, string> = { low: 'bg-green-500/20 text-green-300', medium: 'bg-yellow-500/20 text-yellow-300', high: 'bg-red-500/20 text-red-300' };
const INTENT: Record<string, string> = { informational: 'bg-sky-500/20 text-sky-300', commercial: 'bg-purple-500/20 text-purple-300', transactional: 'bg-green-500/20 text-green-300', navigational: 'bg-gray-500/20 text-gray-300' };
const TARGET: Record<string, string> = { 'google-ai-overview': 'bg-blue-500/20 text-blue-300', 'voice-search': 'bg-indigo-500/20 text-indigo-300', 'featured-snippet': 'bg-amber-500/20 text-amber-300', chatgpt: 'bg-green-500/20 text-green-300', all: 'bg-purple-500/20 text-purple-300' };
const PRI: Record<string, string> = { high: 'bg-green-500/20 text-green-300', medium: 'bg-yellow-500/20 text-yellow-300', low: 'bg-gray-500/20 text-gray-300' };

const SUB_TABS = [
  { id: 'overview',  label: 'Overview',    icon: Globe },
  { id: 'keywords',  label: 'Keywords',    icon: BarChart2 },
  { id: 'pages',     label: 'Pages',       icon: FileText },
  { id: 'content',   label: 'Content',     icon: FileText },
  { id: 'technical', label: 'Technical',   icon: Code },
  { id: 'ai-voice',  label: 'AI / Voice',  icon: Brain },
  { id: 'local',     label: 'Local',       icon: MapPin },
  { id: 'roadmap',   label: 'Roadmap',     icon: Clock },
] as const;
type Sub = typeof SUB_TABS[number]['id'];

// ── panels ──────────────────────────────────────────────────────────────────

function OverviewPanel({ d }: { d: SEOIntelligenceReport }) {
  return (
    <div className="space-y-5">
      <Card title="SEO Scores" icon={<Globe className="w-4 h-4" />}>
        <div className="flex justify-around">
          <ScoreRing score={d.seoOpportunityScore} label="SEO Opportunity" color="#22c55e" />
          <ScoreRing score={d.localSearchScore}    label="Local Search"    color="#3b82f6" />
          <ScoreRing score={d.aiSearchScore}       label="AI Search"       color="#a855f7" />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mt-4">{d.seoSummary}</p>
      </Card>
      <Card title="Quick Wins" icon={<Zap className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {d.quickWins?.map((w, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
              <span className="text-green-400 text-xs font-bold flex-shrink-0 mt-0.5">{String(i+1).padStart(2,'0')}</span>
              <span className="text-gray-300 text-xs leading-relaxed">{w}</span>
            </div>
          ))}
        </div>
      </Card>
      {d.competitorKeywordGaps?.length > 0 && (
        <Card title="Competitor Keyword Gaps" icon={<BarChart2 className="w-4 h-4" />}>
          <div className="flex flex-wrap gap-2">{d.competitorKeywordGaps.map(g => <Pill key={g}>{g}</Pill>)}</div>
        </Card>
      )}
    </div>
  );
}

function KeywordsPanel({ d }: { d: SEOIntelligenceReport }) {
  return (
    <div className="space-y-5">
      <Card title="Keyword Clusters" icon={<BarChart2 className="w-4 h-4" />}>
        <div className="space-y-3">
          {d.keywordClusters?.map((k: KeywordCluster, i: number) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                <div>
                  <div className="text-white font-medium text-sm">{k.pillarKeyword}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{k.clusterName}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap">
                  <Pill c={DIFF[k.difficulty]}>{k.difficulty}</Pill>
                  <Pill c={INTENT[k.intent]}>{k.intent}</Pill>
                  <Pill c="bg-white/10 text-gray-300">{k.monthlySearchVolume}/mo</Pill>
                </div>
              </div>
              <p className="text-gray-500 text-xs mb-2">{k.opportunity}</p>
              <div className="flex flex-wrap gap-1.5">
                {[...k.relatedKeywords, ...k.longTailVariants].map(kw => <Pill key={kw}>{kw}</Pill>)}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Semantic Keyword Map" icon={<Globe className="w-4 h-4" />}>
        {d.semanticKeywordMap?.topicClusters?.map((tc, i) => (
          <div key={i} className="mb-4">
            <div className="text-white text-sm font-medium mb-2">{tc.mainTopic}</div>
            <div className="flex flex-wrap gap-1.5 mb-1">{tc.relatedTerms?.map(t => <Pill key={t} c="bg-sky-500/15 text-sky-300">{t}</Pill>)}</div>
            <div className="flex flex-wrap gap-1.5">{tc.entityRelations?.map(e => <Pill key={e} c="bg-purple-500/15 text-purple-300">{e}</Pill>)}</div>
          </div>
        ))}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'LSI Keywords',      items: d.semanticKeywordMap?.lsiKeywords,      c: 'bg-white/10 text-gray-300' },
            { label: 'Entity Keywords',   items: d.semanticKeywordMap?.entityKeywords,   c: 'bg-amber-500/15 text-amber-300' },
            { label: 'Local Keywords',    items: d.semanticKeywordMap?.localKeywords,    c: 'bg-green-500/15 text-green-300' },
            { label: 'Question Keywords', items: d.semanticKeywordMap?.questionKeywords, c: 'bg-blue-500/15 text-blue-300' },
          ].map(({ label, items, c }) => (
            <div key={label}>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{label}</div>
              <div className="flex flex-wrap gap-1.5">{items?.map(it => <Pill key={it} c={c}>{it}</Pill>)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PagesPanel({ d }: { d: SEOIntelligenceReport }) {
  return (
    <div className="space-y-5">
      <Card title="Page Architecture" icon={<FileText className="w-4 h-4" />}>
        <div className="space-y-2">
          {d.pageStructure?.map((p, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                <code className="text-green-300 text-xs">{p.url}</code>
                <div className="flex gap-1.5">
                  <Pill c={PRI[p.priority]}>{p.priority}</Pill>
                  <Pill c="bg-white/10 text-gray-400">{p.wordCountTarget}w</Pill>
                </div>
              </div>
              <div className="text-white text-sm font-medium">{p.title}</div>
              <div className="text-gray-500 text-xs mt-0.5 mb-2">{p.metaDescription}</div>
              <div className="flex flex-wrap gap-1.5">
                {p.targetKeywords?.map(k => <Pill key={k}>{k}</Pill>)}
                {p.schemaTypes?.map(s => <Pill key={s} c="bg-amber-500/15 text-amber-300">{s}</Pill>)}
              </div>
            </div>
          ))}
        </div>
      </Card>
      {d.servicePages?.map((sp, i) => (
        <Card key={i} title={`Service Page: ${sp.serviceName}`} icon={<FileText className="w-4 h-4" />}>
          <div className="space-y-2 mb-3">
            <div><span className="text-gray-500 text-xs">URL: </span><code className="text-green-300 text-xs">{sp.url}</code></div>
            <div><span className="text-gray-500 text-xs">Title: </span><span className="text-white text-sm">{sp.title}</span></div>
            <div><span className="text-gray-500 text-xs">Meta: </span><span className="text-gray-300 text-xs">{sp.metaDescription}</span></div>
            <div><span className="text-gray-500 text-xs">H1: </span><span className="text-gray-200 text-sm">{sp.h1}</span></div>
            <div><span className="text-gray-500 text-xs">Primary: </span><Pill c="bg-green-500/20 text-green-300">{sp.primaryKeyword}</Pill></div>
          </div>
          {sp.contentOutline?.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Content Outline</div>
              <ol className="space-y-1">{sp.contentOutline.map((h, j) => <li key={j} className="text-gray-300 text-xs flex gap-2"><span className="text-gray-600">{j+1}.</span>{h}</li>)}</ol>
            </div>
          )}
          {sp.faqItems?.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">FAQs</div>
              <div className="space-y-2">
                {sp.faqItems.map((fq, j) => (
                  <div key={j} className="p-2 rounded-lg bg-white/5">
                    <div className="text-white text-xs font-medium mb-1">{fq.question}</div>
                    <div className="text-gray-400 text-xs">{fq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
      {d.locationPages?.map((lp, i) => (
        <Card key={i} title={`Location Page: ${lp.location}`} icon={<MapPin className="w-4 h-4" />}>
          <div className="space-y-2 mb-3">
            <div><code className="text-green-300 text-xs">{lp.url}</code></div>
            <div><span className="text-gray-500 text-xs">Title: </span><span className="text-white text-sm">{lp.title}</span></div>
            <div><span className="text-gray-500 text-xs">Meta: </span><span className="text-gray-300 text-xs">{lp.metaDescription}</span></div>
            <div><span className="text-gray-500 text-xs">Primary Keyword: </span><Pill c="bg-green-500/20 text-green-300">{lp.primaryKeyword}</Pill></div>
            <p className="text-gray-400 text-xs leading-relaxed">{lp.contentStrategy}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">{lp.localSignals?.map(s => <Pill key={s} c="bg-blue-500/15 text-blue-300">{s}</Pill>)}</div>
        </Card>
      ))}
    </div>
  );
}

function ContentPanel({ d }: { d: SEOIntelligenceReport }) {
  return (
    <div className="space-y-5">
      <Card title="Blog Strategy" icon={<FileText className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Publishing Cadence</div>
            <p className="text-gray-300 text-xs">{d.blogStrategy?.publishingCadence}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Content Mix</div>
            <p className="text-gray-300 text-xs">{d.blogStrategy?.contentMix}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Content Pillars</div>
          <div className="space-y-3">
            {d.blogStrategy?.pillars?.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5">
                <div className="text-white font-medium text-sm mb-1">{p.topic}</div>
                <p className="text-gray-500 text-xs mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">{p.subTopics?.map(st => <Pill key={st}>{st}</Pill>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Top Blog Posts</div>
          <div className="space-y-3">
            {d.blogStrategy?.topPosts?.map((post, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                  <div className="text-white text-sm font-medium">{post.title}</div>
                  <div className="flex gap-1.5">
                    <Pill c={DIFF[post.difficulty]}>{post.difficulty}</Pill>
                    <Pill c={INTENT[post.searchIntent]}>{post.searchIntent}</Pill>
                  </div>
                </div>
                <code className="text-green-300 text-xs block mb-2">{post.url}</code>
                <div className="flex gap-3 text-xs text-gray-500 mb-2">
                  <span>{post.estimatedMonthlySearches}/mo</span>
                  <span>{post.targetWordCount}w</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-2">
                  <div className="text-[10px] text-blue-400 uppercase tracking-wider mb-0.5">AI Answer Block</div>
                  <p className="text-blue-200 text-xs">{post.aiAnswerBlock}</p>
                </div>
                <ol className="space-y-0.5">{post.outline?.map((h, j) => <li key={j} className="text-gray-500 text-xs">{j+1}. {h}</li>)}</ol>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card title="Content Authority Plan" icon={<Globe className="w-4 h-4" />}>
        <div className="space-y-4">
          <div><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Authority Topics</div><div className="flex flex-wrap gap-1.5">{d.contentAuthorityPlan?.authorityTopics?.map(t => <Pill key={t} c="bg-green-500/15 text-green-300">{t}</Pill>)}</div></div>
          <div><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">E-E-A-T Signals</div><Bullets items={d.contentAuthorityPlan?.eeatSignals} /></div>
          <div><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Expert Content Types</div><Bullets items={d.contentAuthorityPlan?.expertContent} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Citation Strategy</div><p className="text-gray-300 text-xs">{d.contentAuthorityPlan?.citationStrategy}</p></div>
            <div className="bg-white/5 rounded-xl p-3"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Author Bio Strategy</div><p className="text-gray-300 text-xs">{d.contentAuthorityPlan?.authorBioStrategy}</p></div>
          </div>
          <div><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Link Building Targets</div><div className="flex flex-wrap gap-1.5">{d.contentAuthorityPlan?.linkBuildingTargets?.map(t => <Pill key={t} c="bg-amber-500/15 text-amber-300">{t}</Pill>)}</div></div>
        </div>
      </Card>
    </div>
  );
}

function TechnicalPanel({ d }: { d: SEOIntelligenceReport }) {
  return (
    <div className="space-y-5">
      <Card title="Schema Markup" icon={<Code className="w-4 h-4" />}>
        {[
          { label: 'LocalBusiness', code: d.schemaMarkup?.localBusinessSchema },
          { label: 'FAQPage',       code: d.schemaMarkup?.faqSchema },
          { label: 'Organization',  code: d.schemaMarkup?.organizationSchema },
          { label: 'WebSite',       code: d.schemaMarkup?.webSiteSchema },
        ].map(({ label, code }) => code ? (
          <div key={label} className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{label} Schema</div>
            <CodeBox code={code} />
          </div>
        ) : null)}
        {d.schemaMarkup?.serviceSchemas?.map((s, i) => (
          <div key={i} className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Service Schema {i+1}</div>
            <CodeBox code={s} />
          </div>
        ))}
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Sitemap Plan" icon={<Globe className="w-4 h-4" />}>
          <p className="text-gray-400 text-sm mb-3">{d.sitemapPlan?.structure}</p>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Priority Rules</div>
          <Bullets items={d.sitemapPlan?.priorityRules} />
          <div className="text-xs text-gray-500 uppercase tracking-wider mt-3 mb-2">Estimated Pages: <span className="text-white">{d.sitemapPlan?.totalEstimatedPages}</span></div>
          {d.sitemapPlan?.xmlSnippet && <><div className="text-xs text-gray-500 uppercase tracking-wider mt-3 mb-2">XML Snippet</div><CodeBox code={d.sitemapPlan.xmlSnippet} /></>}
        </Card>
        <Card title="Robots.txt" icon={<Code className="w-4 h-4" />}>
          <Bullets items={d.robotsConfig?.rules} />
          {d.robotsConfig?.content && <><div className="text-xs text-gray-500 uppercase tracking-wider mt-3 mb-2">File Content</div><CodeBox code={d.robotsConfig.content} /></>}
        </Card>
      </div>
      <Card title="Canonical Plan" icon={<Link className="w-4 h-4" />}>
        <Bullets items={d.canonicalPlan?.rules} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="bg-white/5 rounded-xl p-3"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Pagination</div><p className="text-gray-300 text-xs">{d.canonicalPlan?.paginationStrategy}</p></div>
          <div className="bg-white/5 rounded-xl p-3"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Parameter Handling</div><p className="text-gray-300 text-xs">{d.canonicalPlan?.parameterHandling}</p></div>
        </div>
      </Card>
      <Card title="Metadata Templates" icon={<FileText className="w-4 h-4" />}>
        {['homepage','servicePage','locationPage','blogPost'].map(type => {
          const t = d.metadataTemplates?.[type as keyof typeof d.metadataTemplates];
          if (!t || typeof t === 'object' && 'titleTemplate' in t === false) return null;
          const meta = t as { titleTemplate: string; metaDescriptionTemplate: string; ogTitleTemplate: string; ogDescriptionTemplate: string; ogType: string; twitterCard: string };
          return (
            <div key={type} className="mb-4 p-3 rounded-xl bg-white/5">
              <div className="text-xs text-white font-medium capitalize mb-2">{type.replace(/([A-Z])/g,' $1')}</div>
              <div className="space-y-1">
                {[['Title', meta.titleTemplate],['Meta', meta.metaDescriptionTemplate],['OG Title', meta.ogTitleTemplate],['OG Desc', meta.ogDescriptionTemplate]].map(([l,v]) => v ? <div key={l}><span className="text-[10px] text-gray-600">{l}: </span><span className="text-gray-300 text-xs">{v}</span></div> : null)}
              </div>
            </div>
          );
        })}
        {d.metadataTemplates?.rules && <><div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Rules</div><Bullets items={d.metadataTemplates.rules} /></>}
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Image Alt Strategy" icon={<Globe className="w-4 h-4" />}>
          <Bullets items={d.imageAltStrategy?.rules} />
          <div className="mt-3 space-y-2">
            {d.imageAltStrategy?.examples?.map((ex, i) => (
              <div key={i} className="p-2 rounded-lg bg-white/5">
                <div className="text-gray-500 text-[10px] mb-0.5">{ex.context}</div>
                <div className="text-green-300 text-xs">{ex.altText}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Internal Linking" icon={<Link className="w-4 h-4" />}>
          <p className="text-gray-400 text-xs mb-3">{d.internalLinkingPlan?.strategy}</p>
          <Bullets items={d.internalLinkingPlan?.linkingRules} />
          <div className="mt-3">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Silo Plan</div>
            {d.internalLinkingPlan?.siloPlan?.map((silo: LinkSilo, i: number) => (
              <div key={i} className="mb-3 p-3 rounded-xl bg-white/5">
                <div className="text-white text-sm font-medium mb-1">{silo.hub}</div>
                <code className="text-green-300 text-xs block mb-2">{silo.hubUrl}</code>
                <div className="flex flex-wrap gap-1.5 mb-2">{silo.spokes?.map(s => <Pill key={s}>{s}</Pill>)}</div>
                <p className="text-gray-500 text-xs">{silo.purpose}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AIVoicePanel({ d }: { d: SEOIntelligenceReport }) {
  return (
    <div className="space-y-5">
      <Card title="AI Search Answer Blocks" icon={<Brain className="w-4 h-4" />}>
        <div className="space-y-4">
          {d.aiAnswerBlocks?.map((b: AIAnswerBlock, i: number) => (
            <div key={i} className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                <div className="text-white text-sm font-medium">{b.question}</div>
                <Pill c={TARGET[b.targetedFor] ?? 'bg-white/10 text-gray-300'}>{b.targetedFor}</Pill>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/10 mb-2">
                <div className="text-[10px] text-blue-400 uppercase tracking-wider mb-0.5">Direct Answer</div>
                <p className="text-blue-100 text-sm">{b.directAnswer}</p>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{b.expandedAnswer}</p>
              <Pill c="bg-white/10 text-gray-400">{b.answerFormat}</Pill>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Voice Search Questions" icon={<Mic className="w-4 h-4" />}>
        <div className="space-y-3">
          {d.voiceSearchQuestions?.map((v: VoiceSearchQuestion, i: number) => (
            <div key={i} className="p-3 rounded-xl bg-white/5">
              <div className="text-white text-sm font-medium mb-1">"{v.question}"</div>
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-2">
                <p className="text-indigo-200 text-xs">{v.answer}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">{v.triggerWords?.map(tw => <Pill key={tw} c="bg-indigo-500/15 text-indigo-300">{tw}</Pill>)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function LocalPanel({ d }: { d: SEOIntelligenceReport }) {
  const gmb = d.localSearchStrategy?.gmbOptimization;
  return (
    <div className="space-y-5">
      <Card title="Google Business Profile" icon={<MapPin className="w-4 h-4" />}>
        {gmb && (
          <div className="space-y-3">
            <div><span className="text-gray-500 text-xs">Primary Category: </span><Pill c="bg-green-500/20 text-green-300">{gmb.primaryCategory}</Pill></div>
            <div><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Additional Categories</div><div className="flex flex-wrap gap-1.5">{gmb.additionalCategories?.map(c => <Pill key={c}>{c}</Pill>)}</div></div>
            <div><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Attributes to Enable</div><div className="flex flex-wrap gap-1.5">{gmb.attributes?.map(a => <Pill key={a} c="bg-blue-500/15 text-blue-300">{a}</Pill>)}</div></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[['Posting Strategy',gmb.postingStrategy],['Photo Strategy',gmb.photoStrategy],['Q&A Strategy',gmb.qAStrategy]].map(([l,v]) => (
                <div key={l} className="bg-white/5 rounded-xl p-3"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{l}</div><p className="text-gray-300 text-xs">{v}</p></div>
              ))}
            </div>
          </div>
        )}
      </Card>
      <Card title="Local Strategy" icon={<Globe className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="bg-white/5 rounded-xl p-3"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Neighborhood Strategy</div><p className="text-gray-300 text-xs">{d.localSearchStrategy?.neighborhoodStrategy}</p></div>
          <div className="bg-white/5 rounded-xl p-3"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Review Strategy</div><p className="text-gray-300 text-xs">{d.localSearchStrategy?.reviewStrategy}</p></div>
        </div>
        <div className="mb-4"><div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Local Link Building</div><Bullets items={d.localSearchStrategy?.localLinkBuilding} /></div>
      </Card>
      <Card title="Local Citations" icon={<Link className="w-4 h-4" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {d.localSearchStrategy?.localCitations?.map((cit: LocalCitation, i: number) => (
            <div key={i} className="p-3 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-medium">{cit.platform}</span>
                <Pill c={PRI[cit.priority]}>{cit.priority}</Pill>
              </div>
              <p className="text-gray-500 text-xs">{cit.napFormat}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RoadmapPanel({ d }: { d: SEOIntelligenceReport }) {
  const colors = ['border-green-500','border-blue-500','border-purple-500','border-amber-500','border-rose-500','border-teal-500'];
  return (
    <Card title="6-Month SEO Roadmap" icon={<Clock className="w-4 h-4" />}>
      <div className="space-y-4">
        {d.sixMonthRoadmap?.map((item: RoadmapItem, i: number) => (
          <div key={i} className={`p-4 rounded-xl bg-white/5 border-l-4 ${colors[i] ?? 'border-white/20'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">{item.month}</span>
              <Pill>{item.focus}</Pill>
            </div>
            <ul className="space-y-1">{item.tasks?.map((t, j) => <li key={j} className="flex items-start gap-2 text-xs text-gray-300"><span className="text-green-400 flex-shrink-0">→</span>{t}</li>)}</ul>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

export default function SEOIntelligenceReport({ data: d }: { data: SEOIntelligenceReport }) {
  const [sub, setSub] = useState<Sub>('overview');

  return (
    <div>
      {/* Sub-tab nav */}
      <div className="flex gap-1 mb-5 bg-white/5 rounded-xl p-1 overflow-x-auto">
        {SUB_TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setSub(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${ sub === id ? 'bg-green-600 text-white shadow' : 'text-gray-400 hover:text-white' }`}>
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>
      {sub === 'overview'  && <OverviewPanel  d={d} />}
      {sub === 'keywords'  && <KeywordsPanel  d={d} />}
      {sub === 'pages'     && <PagesPanel     d={d} />}
      {sub === 'content'   && <ContentPanel   d={d} />}
      {sub === 'technical' && <TechnicalPanel d={d} />}
      {sub === 'ai-voice'  && <AIVoicePanel   d={d} />}
      {sub === 'local'     && <LocalPanel     d={d} />}
      {sub === 'roadmap'   && <RoadmapPanel   d={d} />}
    </div>
  );
}
