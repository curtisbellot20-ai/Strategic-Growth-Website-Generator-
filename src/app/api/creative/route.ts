import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { BusinessIntake } from '@/types';
import { buildCreativePrompt } from '@/lib/engines/creativeEngine';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const intake: BusinessIntake = await request.json();
    const prompt = buildCreativePrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = (message.content[0] as { type: string; text: string }).text;

    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    const creativeData = JSON.parse(cleaned);
    creativeData.generatedAt = new Date().toISOString();

    return NextResponse.json(creativeData);
  } catch (error) {
    console.error('Creative direction API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate creative direction' },
      { status: 500 },
    );
  }
}
