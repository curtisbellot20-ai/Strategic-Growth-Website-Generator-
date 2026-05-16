import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildIntelligencePrompt } from '@/lib/engines/intelligenceEngine';
import type { BusinessIntake } from '@/types';
import type { IndustryIntelligence } from '@/types/intelligence';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const intake: BusinessIntake = await req.json();

    if (!intake.businessName || !intake.industry) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, industry' },
        { status: 400 }
      );
    }

    const prompt = buildIntelligencePrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 8000,
      system:
        'You are an elite business intelligence AI. Return ONLY valid JSON — no markdown, no code fences, no explanation. The response must be parseable by JSON.parse().',
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let intelligence: IndustryIntelligence;
    try {
      intelligence = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.', raw: cleaned.slice(0, 500) },
        { status: 500 }
      );
    }

    return NextResponse.json(intelligence);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
