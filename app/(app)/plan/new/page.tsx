import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PlanNewClient from './PlanNewClient'

export default async function PlanNewPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let competenceRows = 0
  if (user) {
    const { count } = await supabase
      .from('learner_topic_competence')
      .select('user_id', { count: 'exact', head: true })
      .eq('user_id', user.id)
    competenceRows = count ?? 0
  }

  if (competenceRows === 0) {
    return (
      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Generate study plan</h1>
        </header>
        <div className="rounded-md border border-dashed bg-card p-6 text-sm text-muted-foreground space-y-2">
          <p>You don&apos;t have a competence profile yet.</p>
          <p>
            <Link href="/intake" className="text-foreground underline underline-offset-2">
              Start with intake →
            </Link>{' '}
            (self-report, paste a score, or sit a quick calibration).
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Generate study plan</h1>
        <p className="text-sm text-muted-foreground">
          The deterministic planner picks your three weakest topics by importance × (1 −
          competence) with parent-system diversity, and pulls cards tagged to those topics into
          three ephemeral clusters.
        </p>
      </header>
      <PlanNewClient competenceRows={competenceRows} />
    </main>
  )
}
