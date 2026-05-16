import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildAtmospherePrompt } from '@/lib/engines/atmosphereEngine';
import type { BusinessIntake } from '@/types';
import type { AtmosphereIntelligence } from '@/types/atmosphere';

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

    const prompt = buildAtmospherePrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 8000,
      system:
        'You are an elite brand atmosphere AI. Return ONLY valid JSON — no markdown, no code fences, no explanation. Every recommendation must be specific and justified. Response must be parseable by JSON.parse().',
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let atmosphere: AtmosphereIntelligence;
    try {
      atmosphere = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.', raw: cleaned.slice(0, 500) },
        { status: 500 }
      );
    }

    return NextResponse.json(atmosphere);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
