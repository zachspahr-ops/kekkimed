import { createClient } from '@/lib/supabase/server'
import { isLlmEnabled } from '@/lib/llm/client'
import PlanNewClient from './PlanNewClient'

export default async function PlanNewPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Count gaps from user's most recent upload
  let gapCount = 0
  if (user) {
    const { data: latestUpload } = await supabase
      .from('analytics_uploads')
      .select('id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (latestUpload) {
      const { count } = await supabase
        .from('structured_analytics')
        .select('*', { count: 'exact', head: true })
        .eq('upload_id', latestUpload.id)
      gapCount = count ?? 0
    }
  }

  // Count available clusters
  const { count: clusterCount } = await supabase
    .from('clusters')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Generate Study Plan</h1>
        <p className="text-sm text-muted-foreground">
          Claude will build an ordered cluster plan from your gaps, targeting 5–15 clusters over a
          7–14 day window.
        </p>
      </header>

      <PlanNewClient
        llmEnabled={isLlmEnabled()}
        gapCount={gapCount}
        clusterCount={clusterCount ?? 0}
      />
    </main>
  )
}
