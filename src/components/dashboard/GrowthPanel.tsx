'use client';
import type { ConversionEngine, AcquisitionEngine, RetentionEngine, ReferralEngine } from '@/types';

interface Props {
  conversion: ConversionEngine;
  acquisition: AcquisitionEngine;
  retention: RetentionEngine;
  referral: ReferralEngine;
}

function ListSection({ title, items, color = 'text-gray-300' }: { title: string; items: string[]; color?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className={`text-sm ${color} flex items-start gap-2`}>
            <span className="mt-1 w-1 h-1 rounded-full bg-sky-500 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GrowthPanel({ conversion, acquisition, retention, referral }: Props) {
  return (
    <div className="space-y-6">
      {/* Conversion Engine */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Conversion Engine</h3>
        <div className="p-4 gradient-brand rounded-xl mb-4">
          <p className="text-xs text-blue-200 mb-1">Primary CTA</p>
          <p className="text-lg font-bold text-white">{conversion.primaryCTA?.text}</p>
          <p className="text-sm text-blue-200">{conversion.primaryCTA?.subtext}</p>
          <p className="text-xs text-blue-300 mt-2">Placement: {conversion.primaryCTA?.placement}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ListSection title="Lead Magnets" items={conversion.leadMagnets} color="text-green-300" />
          <ListSection title="Urgency Mechanisms" items={conversion.urgencyMechanisms} color="text-orange-300" />
          <div className="sm:col-span-2">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Objection Handlers</p>
            <div className="space-y-2">
              {conversion.objectionHandlers?.slice(0, 4).map((obj, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl">
                  <p className="text-xs text-red-400 mb-1">"{obj.objection}"</p>
                  <p className="text-xs text-green-300">{obj.response}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Acquisition Engine */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Customer Acquisition Engine</h3>
        <div className="space-y-3 mb-4">
          {acquisition.channels?.slice(0, 4).map((ch, i) => (
            <div key={i} className="p-3 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-200">{ch.channel}</p>
                <span className={ch.priority === 'high' ? 'badge-green' : ch.priority === 'medium' ? 'badge-yellow' : 'badge-red'}>
                  {ch.priority}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {ch.tactics?.slice(0, 3).map((t, j) => (
                  <span key={j} className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ListSection title="Organic Strategy" items={acquisition.organicStrategy} />
          <ListSection title="Partnership Opportunities" items={acquisition.partnershipOpportunities} color="text-sky-300" />
        </div>
      </div>

      {/* Retention Engine */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Retention Engine</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ListSection title="Onboarding Sequence" items={retention.onboardingSequence} />
          <ListSection title="Loyalty Mechanisms" items={retention.loyaltyMechanisms} color="text-yellow-300" />
          <ListSection title="Win-back Strategy" items={retention.winbackStrategy} color="text-orange-300" />
          <ListSection title="Community Building" items={retention.communityBuilding} color="text-green-300" />
        </div>
      </div>

      {/* Referral Engine */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Referral Engine</h3>
        <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl mb-4">
          <p className="text-xs text-gray-500 mb-1">Referral Program</p>
          <p className="text-sm font-semibold text-green-300">{referral.referralProgram?.incentive}</p>
          <p className="text-xs text-gray-400 mt-1">{referral.referralProgram?.mechanism}</p>
          <p className="text-xs text-gray-500 mt-1 italic">{referral.referralProgram?.messaging}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ListSection title="Review Generation" items={referral.reviewGeneration} color="text-yellow-300" />
          <ListSection title="Social Amplification" items={referral.socialAmplification} color="text-purple-300" />
        </div>
      </div>
    </div>
  );
}
