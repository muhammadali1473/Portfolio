import { NextResponse } from "next/server";
import { z } from "zod";
import { getGroq, ESTIMATOR_SYSTEM_PROMPT } from "@/lib/groq";
import { env } from "@/lib/env";

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

export async function POST(req: Request) {
  const groq = getGroq();
  if (!groq) {
    return NextResponse.json(
      { error: "AI is not configured. Set GROQ_API_KEY in .env.local." },
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

  const completion = await groq.chat.completions.create({
    model: env.GROQ_MODEL,
    temperature: 0.3,
    max_tokens: 600,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: ESTIMATOR_SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
  });

  const raw = completion.choices[0]?.message?.content?.trim() ?? "";

  try {
    const json = JSON.parse(raw);
    const validated = EstimateSchema.parse(json);
    return NextResponse.json(validated);
  } catch {
    return NextResponse.json(
      { error: "Could not parse estimate. Please try again.", raw },
      { status: 502 },
    );
  }
}
