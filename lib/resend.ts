import "server-only";
import { Resend } from "resend";
import { env } from "./env";

let cached: Resend | null = null;

export function getResend() {
  if (!env.RESEND_API_KEY) return null;
  if (!cached) cached = new Resend(env.RESEND_API_KEY);
  return cached;
}

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  projectTypes?: string[];
  message: string;
};

export function buildContactEmail(p: ContactPayload) {
  const subject = `New project inquiry from ${p.name}${p.company ? ` (${p.company})` : ""}`;
  const types = p.projectTypes?.length ? p.projectTypes.join(", ") : "—";

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fafafa;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <h1 style="font-size:22px;font-weight:700;margin:0 0 16px;background:linear-gradient(135deg,#8b5cf6,#3b82f6,#06b6d4);-webkit-background-clip:text;background-clip:text;color:transparent;">New portfolio inquiry</h1>
      <div style="background:#13131a;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px;">
        <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;">From</p>
        <p style="margin:0 0 16px;font-size:16px;"><strong>${p.name}</strong> &lt;${p.email}&gt;${p.company ? ` · ${p.company}` : ""}</p>
        <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;">Budget</p>
        <p style="margin:0 0 16px;font-size:15px;">${p.budget || "—"}</p>
        <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;">Project types</p>
        <p style="margin:0 0 16px;font-size:15px;">${types}</p>
        <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;">Message</p>
        <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${p.message.replace(/</g, "&lt;")}</p>
      </div>
      <p style="margin:16px 0 0;color:#71717a;font-size:12px;">Sent from muhammadali.dev contact form</p>
    </div>
  </body>
</html>`;

  const text = `New portfolio inquiry

From: ${p.name} <${p.email}>${p.company ? ` (${p.company})` : ""}
Budget: ${p.budget || "—"}
Project types: ${types}

Message:
${p.message}`;

  return { subject, html, text };
}

export async function sendContactEmail(payload: ContactPayload) {
  const resend = getResend();
  if (!resend) throw new Error("RESEND_NOT_CONFIGURED");

  const { subject, html, text } = buildContactEmail(payload);

  const { data, error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.RESEND_TO_EMAIL,
    replyTo: payload.email,
    subject,
    html,
    text,
  });

  if (error) throw new Error(error.message);
  return data;
}
