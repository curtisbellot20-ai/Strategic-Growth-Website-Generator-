# Strategic Growth Website Generator

An AI-powered business growth system that generates premium, conversion-optimized website blueprints with full strategic intelligence — built with Next.js 14, TypeScript, Tailwind CSS, and Claude Opus.

## What It Does

Enter your business information. The system thinks like 10 elite experts simultaneously:

| Expert | Output |
|---|---|
| Luxury Brand Strategist | Visual theme, atmosphere, trust signals |
| CRO Expert | Conversion engine, CTAs, funnel stages |
| SEO/GEO/AEO Expert | Keywords, local SEO, AI search optimization |
| UI/UX Designer | Layout, spacing, typography direction |
| Behavioral Psychology Strategist | Emotional triggers, persuasion framework |
| Ethical Persuasion Copywriter | Hook, copy angles, objection handlers |
| Creative Director | Color science, mood board, imagery style |
| Local Marketing Strategist | GEO targeting, citations, review strategy |
| Customer Retention Strategist | Onboarding, loyalty, win-back sequences |
| Business Intelligence Analyst | Growth score, KPIs, improvement checklist |

## Generated Output (16 Engines)

- **Website Blueprint** — Full site structure with 5+ page blueprints, each with 6+ sections
- **Homepage Structure** — Hero, services, social proof, CTA, FAQ, and more
- **Service Pages** — Conversion-optimized service page blueprints
- **Location Pages** — Local SEO-optimized location page blueprints
- **SEO Plan** — Primary, long-tail, and local keywords with intent mapping
- **GEO Strategy** — Google Business, citations, neighborhood targeting
- **AEO Strategy** — AI overview optimization, voice search, featured snippets
- **Content Strategy** — 12-month content calendar
- **Creative Design Direction** — Colors, typography, atmosphere, mood board
- **Brand Atmosphere** — Visual theme, luxury/trust signals, imagery style
- **Persuasive Copy** — Hook, before/after/bridge, micro-stories, testimonial angles
- **CTAs** — Primary and secondary CTAs with placement and trigger logic
- **Customer Acquisition System** — Channel strategy with tactics and KPIs
- **Retention Plan** — Onboarding, email cadence, loyalty mechanisms
- **Referral Plan** — Referral program, review generation, social amplification
- **Analytics Checklist** — GA4 events, conversion goals, heatmaps, A/B tests
- **Scoring Report** — Overall growth score with category breakdown
- **Improvement Checklist** — Prioritized actions by impact and effort

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/curtisbellot20-ai/strategic-growth-website-generator-
cd strategic-growth-website-generator-

# 2. Install dependencies
npm install

# 3. Add your Anthropic API key
cp .env.example .env.local
# Edit .env.local and add: ANTHROPIC_API_KEY=your_key_here

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push the `claude/ai-website-generator-2Rpfa` branch to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` as an environment variable
4. Deploy

## Project Structure

```
src/
  app/
    page.tsx              # Main app — hero, form, progress, dashboard
    layout.tsx            # Root layout + metadata
    globals.css           # Tailwind + custom design tokens
    api/generate/route.ts # AI generation API route
  components/
    intake/               # 6-step business intake form wizard
    generation/           # Generation progress UI
    dashboard/            # Output dashboard (7 tabbed panels)
  lib/
    engines/promptEngine.ts  # Master prompt builder
    utils.ts                 # Shared utilities
  types/
    index.ts              # Full TypeScript type system
```

## Tech Stack

- **Next.js 14** — App Router, API Routes
- **TypeScript** — Strict mode throughout
- **Tailwind CSS** — Custom design system with glass morphism
- **Framer Motion** — Page transitions and progress animations
- **React Hook Form + Zod** — Form state and validation
- **Claude Opus** — AI generation engine (via Anthropic SDK)
- **Recharts** — Score visualization
- **Lucide React** — Icons
