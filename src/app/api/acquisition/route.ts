import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildAcquisitionPrompt } from '@/lib/engines/acquisitionEngine';
import { BusinessIntake } from '@/types';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const intake: BusinessIntake = await req.json();

    if (!intake?.businessName || !intake?.industry) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = buildAcquisitionPrompt(intake);

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 10000,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    const report = JSON.parse(cleaned);
    return NextResponse.json(report);
  } catch (err) {
    console.error('Acquisition engine error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate acquisition report';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
