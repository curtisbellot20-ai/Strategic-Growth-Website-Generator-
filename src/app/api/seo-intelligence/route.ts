import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { BusinessIntake } from '@/types';
import { buildSEOIntelligencePrompt } from '@/lib/engines/seoIntelligenceEngine';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const intake: BusinessIntake = await request.json();
    const prompt = buildSEOIntelligencePrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 12000,
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = (message.content[0] as { type: string; text: string }).text;

    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    const seoData = JSON.parse(cleaned);
    seoData.generatedAt = new Date().toISOString();

    return NextResponse.json(seoData);
  } catch (error) {
    console.error('SEO Intelligence API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO intelligence report' },
      { status: 500 },
    );
  }
}
