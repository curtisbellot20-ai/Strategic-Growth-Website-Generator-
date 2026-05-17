import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic();

function stripHtml(html: string): string {
  // Remove script and style tags with their contents
  let text = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'");
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

const SYSTEM_PROMPT =
  'You extract business information from website/social media content. Return ONLY valid JSON, no markdown, no code fences, no explanation.';

function buildUserPrompt(content: string): string {
  const truncated = content.slice(0, 8000);
  return `Extract business information from this content. Return ONLY valid JSON with these exact fields (omit any field you cannot confidently determine from the content):

{
  "businessName": "string",
  "tagline": "string",
  "industry": "must be exactly one of: healthcare|legal|real_estate|home_services|restaurant|retail|fitness|beauty|financial|education|technology|consulting|ecommerce|nonprofit|other",
  "businessType": "must be exactly one of: local|regional|national|ecommerce|saas",
  "city": "string",
  "state": "string",
  "country": "string",
  "phone": "string",
  "email": "string",
  "websiteUrl": "string",
  "primaryService": "string - their main service or product",
  "secondaryServices": "string - other services, comma separated",
  "uniqueValueProp": "string - what makes them different or better",
  "pricePoint": "must be exactly one of: budget|mid_market|premium|luxury",
  "targetAudience": "string - who they serve",
  "audiencePainPoints": "string - what problems they solve for customers",
  "brandPersonality": ["array of 1-4 items, each must be one of: trustworthy|innovative|luxurious|approachable|energetic|calming|bold|sophisticated"],
  "brandVoice": "must be exactly one of: professional|friendly|authoritative|playful|inspiring|empathetic",
  "socialLinks": {
    "instagram": "handle or URL if found",
    "facebook": "URL if found",
    "linkedin": "URL if found",
    "tiktok": "handle or URL if found",
    "youtube": "URL if found",
    "twitter": "handle or URL if found"
  }
}

Content to analyze:
${truncated}`;
}

export async function POST(req: NextRequest) {
  let body: { url?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { url, text } = body;

  if (!url && !text) {
    return NextResponse.json({ error: 'Provide either a url or text field.' }, { status: 400 });
  }

  let content = '';

  if (url) {
    // Validate protocol
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Only http:// and https:// URLs are supported.' }, { status: 400 });
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return NextResponse.json({ error: 'Only http:// and https:// URLs are supported.' }, { status: 400 });
    }

    // Fetch the URL
    let res: Response;
    try {
      res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      return NextResponse.json(
        { error: 'Could not reach that URL. Try the Paste Text option instead.' },
        { status: 422 },
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `Could not access that URL (status ${res.status}). Try the Paste Text option instead.` },
        { status: 422 },
      );
    }

    const html = await res.text();
    content = stripHtml(html);
  } else if (text) {
    content = text;
  }

  if (!content.trim()) {
    return NextResponse.json({ error: 'No readable content found.' }, { status: 422 });
  }

  // Call Claude
  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildUserPrompt(content),
      },
    ],
  });

  const rawText =
    message.content[0].type === 'text' ? message.content[0].text : '';

  // Strip markdown fences if present
  const stripped = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(stripped);
  } catch {
    return NextResponse.json(
      { error: 'Failed to parse AI response as JSON.' },
      { status: 500 },
    );
  }

  return NextResponse.json(parsed);
}
