import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildMasterPrompt } from '@/lib/engines/promptEngine';
import type { BusinessIntake, WebsiteBlueprint } from '@/types';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const intake: BusinessIntake = await req.json();

    if (!intake.businessName || !intake.industry || !intake.city) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, industry, city' },
        { status: 400 }
      );
    }

    const prompt = buildMasterPrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 16000,
      system:
        'You are an elite business growth AI. Return ONLY valid JSON, no markdown, no code fences, no explanation. The JSON must be parseable by JSON.parse().',
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Strip any accidental markdown fences
    const cleaned = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    let generated: Partial<WebsiteBlueprint>;
    try {
      generated = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.', raw: cleaned.slice(0, 500) },
        { status: 500 }
      );
    }

    const blueprint: WebsiteBlueprint = {
      businessIntake: intake,
      strategicIntelligence: generated.strategicIntelligence!,
      seoStrategy: generated.seoStrategy!,
      atmosphereDesign: generated.atmosphereDesign!,
      persuasionFramework: generated.persuasionFramework!,
      storytellingFramework: generated.storytellingFramework!,
      conversionEngine: generated.conversionEngine!,
      acquisitionEngine: generated.acquisitionEngine!,
      retentionEngine: generated.retentionEngine!,
      referralEngine: generated.referralEngine!,
      pageBlueprints: generated.pageBlueprints!,
      analyticsChecklist: generated.analyticsChecklist!,
      scoringReport: generated.scoringReport!,
      colorSystem: generated.colorSystem!,
      improvementChecklist: generated.improvementChecklist!,
    };

    return NextResponse.json(blueprint);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
