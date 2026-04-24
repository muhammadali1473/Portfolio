import "server-only";

const optional = (value: string | undefined) =>
  value && value.trim().length > 0 ? value : undefined;

export const env = {
  GROQ_API_KEY: optional(process.env.GROQ_API_KEY),
  GROQ_MODEL: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  RESEND_API_KEY: optional(process.env.RESEND_API_KEY),
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  RESEND_TO_EMAIL: process.env.RESEND_TO_EMAIL || "get.muhammad5@gmail.com",
};

export const aiEnabled = () => Boolean(env.GROQ_API_KEY);
export const emailEnabled = () => Boolean(env.RESEND_API_KEY);
