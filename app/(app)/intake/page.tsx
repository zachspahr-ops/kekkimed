import { isLlmEnabled } from '@/lib/llm/client'
import IntakeClient from './IntakeClient'

export default function IntakePage() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Upload Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Describe what you got wrong or paste your performance data. Claude will extract your weak
          topics so you can build a study plan.
        </p>
      </header>

      <IntakeClient llmEnabled={isLlmEnabled()} />
    </main>
  )
}
