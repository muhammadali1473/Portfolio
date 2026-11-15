import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";
import { emailEnabled } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(120).optional(),
  projectTypes: z.array(z.string().max(40)).max(10).optional(),
  message: z.string().min(10).max(4000),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = ContactSchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "Please double-check your inputs and try again." },
      { status: 400 },
    );
  }

  if (!emailEnabled()) {
    return NextResponse.json(
      {
        error:
          "Email isn't configured on the server yet. Please email get.muhammad5@gmail.com directly.",
      },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(parsed);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try email." },
      { status: 500 },
    );
  }
}
