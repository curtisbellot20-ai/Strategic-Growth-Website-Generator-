'use client';
import type { StrategicIntelligence, PersuasionFramework, StorytellingFramework } from '@/types';

interface Props {
  strategy: StrategicIntelligence;
  persuasion: PersuasionFramework;
  storytelling: StorytellingFramework;
}

function ListSection({ title, items, color = 'text-gray-300' }: { title: string; items: string[]; color?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">{title}</p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className={`text-sm ${color} flex items-start gap-2`}>
            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sky-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StrategyPanel({ strategy, persuasion, storytelling }: Props) {
  return (
    <div className="space-y-6">
      {/* Strategic Intelligence */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Strategic Intelligence</h3>
        <div className="mb-4 p-3 bg-sky-500/5 border border-sky-500/20 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Market Position</p>
          <p className="text-sm text-gray-200">{strategy.marketPosition}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ListSection title="Competitive Advantages" items={strategy.competitiveAdvantage} color="text-green-300" />
          <ListSection title="Audience Insights" items={strategy.audienceInsights} />
          <ListSection title="Growth Opportunities" items={strategy.growthOpportunities} color="text-sky-300" />
          <ListSection title="Emotional Triggers" items={strategy.emotionalTriggers} color="text-purple-300" />
          <ListSection title="Key Messages" items={strategy.keyMessages} />
          <ListSection title="Industry Patterns" items={strategy.industryPatterns} />
        </div>
      </div>

      {/* Persuasion Framework */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Ethical Persuasion Framework</h3>
        <div className="mb-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Primary Hook</p>
          <p className="text-base font-medium text-purple-300">&ldquo;{persuasion.primaryHook}&rdquo;</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ListSection title="Social Proof Strategy" items={persuasion.socialProofStrategy} />
          <ListSection title="Authority Builders" items={persuasion.authorityBuilders} color="text-yellow-300" />
          <ListSection title="Reciprocity Offers" items={persuasion.reciprocityOffers} color="text-green-300" />
          <ListSection title="Commitment Ladder" items={persuasion.commitmentLadder} />
          <ListSection title="Emotional Copy Angles" items={persuasion.emotionalCopyAngles} color="text-pink-300" />
          <ListSection title="Scarcity Elements" items={persuasion.scarcityElements} color="text-orange-300" />
        </div>
      </div>

      {/* Storytelling */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Storytelling Framework</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Brand Story</p>
            <p className="text-sm text-gray-300 leading-relaxed">{storytelling.brandStory}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <p className="text-xs text-red-400 font-medium mb-2">BEFORE</p>
              <p className="text-sm text-gray-300">{storytelling.beforeAfterBridge.before}</p>
            </div>
            <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
              <p className="text-xs text-sky-400 font-medium mb-2">BRIDGE</p>
              <p className="text-sm text-gray-300">{storytelling.beforeAfterBridge.bridge}</p>
            </div>
            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
              <p className="text-xs text-green-400 font-medium mb-2">AFTER</p>
              <p className="text-sm text-gray-300">{storytelling.beforeAfterBridge.after}</p>
            </div>
          </div>
          <ListSection title="Micro-Stories" items={storytelling.microStories} />
        </div>
      </div>
    </div>
  );
}
