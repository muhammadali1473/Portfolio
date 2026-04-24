import { NextResponse } from "next/server";
import { z } from "zod";
import { getGroq, ASSISTANT_SYSTEM_PROMPT } from "@/lib/groq";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
});

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

  const stream = await groq.chat.completions.create({
    model: env.GROQ_MODEL,
    stream: true,
    temperature: 0.5,
    max_tokens: 500,
    messages: [
      { role: "system", content: ASSISTANT_SYSTEM_PROMPT },
      ...parsed.messages,
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const token = chunk.choices[0]?.delta?.content || "";
          if (token) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: (err as Error).message })}\n\n`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
