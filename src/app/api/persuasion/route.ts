import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { BusinessIntake } from '@/types';
import { buildPersuasionPrompt } from '@/lib/engines/persuasionEngine';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const intake: BusinessIntake = await request.json();
    const prompt = buildPersuasionPrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 10000,
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = (message.content[0] as { type: string; text: string }).text;
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    const data = JSON.parse(cleaned);
    data.generatedAt = new Date().toISOString();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Persuasion API error:', error);
    return NextResponse.json({ error: 'Failed to generate persuasion framework' }, { status: 500 });
  }
}
