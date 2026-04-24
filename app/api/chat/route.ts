import { NextResponse } from "next/server";
import { z } from "zod";
import { getGroq, ASSISTANT_SYSTEM_PROMPT } from "@/lib/groq";
import { env } from "@/lib/env";
import { ipKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
});

// 20 requests per 5 minutes per IP — plenty for a polite visitor, blocks bots.
const RATE = { limit: 20, windowMs: 5 * 60 * 1000 };

const FRIENDLY_ERROR =
  "Something went wrong — please try again or contact Muhammad directly at get.muhammad5@gmail.com";

export async function POST(req: Request) {
  const rl = rateLimit(ipKey(req, "chat"), RATE);
  if (!rl.ok) {
    return NextResponse.json(
      {
        error:
          "You're sending messages a bit fast. Take a short breath and try again in a minute.",
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

  let stream;
  try {
    stream = await groq.chat.completions.create({
      model: env.GROQ_MODEL,
      stream: true,
      temperature: 0.5,
      max_tokens: 500,
      messages: [
        { role: "system", content: ASSISTANT_SYSTEM_PROMPT },
        ...parsed.messages,
      ],
    });
  } catch {
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const token = chunk.choices[0]?.delta?.content || "";
          if (token) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ token })}\n\n`),
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: FRIENDLY_ERROR })}\n\n`,
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
