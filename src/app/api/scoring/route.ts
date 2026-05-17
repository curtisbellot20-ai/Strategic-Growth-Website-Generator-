import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildScoringPrompt } from '@/lib/engines/scoringEngine';
import type { BusinessIntake } from '@/types';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const intake: BusinessIntake = await req.json();

    if (!intake?.businessName || !intake?.industry) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = buildScoringPrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 8000,
      system: 'You are an expert website strategist and performance auditor. Return ONLY valid JSON matching the exact schema provided. No markdown, no code fences, no explanation. Every score must be justified by the specific business data provided — never inflate scores.',
      messages: [{ role: 'user', content: prompt }],
    });

    const raw     = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    const report = JSON.parse(cleaned);
    return NextResponse.json(report);
  } catch (err) {
    console.error('Scoring engine error:', err);
    const msg    = err instanceof Error ? err.message : 'Failed to generate score report';
    const status = err instanceof SyntaxError ? 422 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
