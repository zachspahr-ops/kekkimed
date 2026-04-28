import Anthropic from '@anthropic-ai/sdk'

/**
 * True when ANTHROPIC_API_KEY is present. Server-side only.
 * Import this into server components to conditionally show/hide LLM UI.
 */
export function isLlmEnabled(): boolean {
  return !!process.env.ANTHROPIC_API_KEY
}

/**
 * Returns a configured Anthropic client. Throws if the key is missing so
 * call sites fail loudly rather than with a cryptic SDK error.
 */
export function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY is not set. LLM features are disabled for this deployment.'
    )
  }
  return new Anthropic({ apiKey })
}
