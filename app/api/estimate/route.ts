import { NextResponse } from "next/server";
import { z } from "zod";
import { getGroq, ESTIMATOR_SYSTEM_PROMPT } from "@/lib/groq";
import { env } from "@/lib/env";
import { ipKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  projectType: z.string().min(1).max(60),
  complexity: z.number().min(1).max(5),
  timeline: z.string().min(1).max(60),
  budget: z.string().min(1).max(60),
  description: z.string().min(3).max(1500),
});

const EstimateSchema = z.object({
  timeline: z.string(),
  package: z.enum(["Starter", "Professional", "Premium", "Enterprise"]),
  stack: z.array(z.string()).min(1).max(10),
  nextSteps: z.array(z.string()).min(1).max(8),
});

export type EstimateResponse = z.infer<typeof EstimateSchema>;

// 10 estimates per 10 min per IP
const RATE = { limit: 10, windowMs: 10 * 60 * 1000 };

const FRIENDLY_ERROR =
  "Something went wrong — please try again or contact Muhammad directly at get.muhammad5@gmail.com";

export async function POST(req: Request) {
  const rl = rateLimit(ipKey(req, "estimate"), RATE);
  if (!rl.ok) {
    return NextResponse.json(
      {
        error:
          "That's a lot of estimates! Take a short break and try again in a few minutes.",
      },
      { status: 429 },
    );
  }

  const groq = getGroq();
  if (!groq) {
    return NextResponse.json(
      {
        error:
          "AI is not configured on the server right now. Please email get.muhammad5@gmail.com directly.",
      },
      { status: 503 },
    );
  }

  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const complexityLabel =
    parsed.complexity <= 2 ? "Simple" : parsed.complexity >= 4 ? "Complex" : "Moderate";

  const userMessage = `Project intake:
- Type: ${parsed.projectType}
- Complexity (1-5): ${parsed.complexity} (${complexityLabel})
- Desired timeline: ${parsed.timeline}
- Budget range: ${parsed.budget}
- Description: ${parsed.description}

Return ONLY the JSON object per the schema.`;

  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: env.GROQ_MODEL,
      temperature: 0.3,
      max_tokens: 600,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: ESTIMATOR_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    });
  } catch {
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
  }

  const raw = completion.choices[0]?.message?.content?.trim() ?? "";

  try {
    const json = JSON.parse(raw);
    const validated = EstimateSchema.parse(json);
    return NextResponse.json(validated);
  } catch {
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
  }
}
