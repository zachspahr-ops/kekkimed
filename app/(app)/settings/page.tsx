import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ResetCompetenceForm from './ResetCompetenceForm'

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let competenceRows = 0
  let lastUpdate: string | null = null
  let bySource: Record<string, number> = {}
  if (user) {
    const { data, count } = await supabase
      .from('learner_topic_competence')
      .select('source, last_updated', { count: 'exact' })
      .eq('user_id', user.id)
      .order('last_updated', { ascending: false })
      .limit(1000)
    competenceRows = count ?? 0
    if (data && data.length > 0) {
      lastUpdate = data[0].last_updated as string
      bySource = data.reduce(
        (acc, row) => {
          const src = row.source as string
          acc[src] = (acc[src] ?? 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
    }
  }

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{user?.email}</span>
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Competence profile</h2>
        <div className="rounded-md border bg-card p-4 text-sm space-y-1">
          <p>
            <span className="font-medium">{competenceRows}</span> topic row
            {competenceRows !== 1 ? 's' : ''} on file.
          </p>
          {lastUpdate && (
            <p className="text-muted-foreground">
              Last updated {new Date(lastUpdate).toLocaleString()}
            </p>
          )}
          {Object.keys(bySource).length > 0 && (
            <p className="text-muted-foreground">
              Sources:{' '}
              {Object.entries(bySource)
                .map(([k, v]) => `${k} (${v})`)
                .join(', ')}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-red-700 dark:text-red-400">Danger zone</h2>
        <ResetCompetenceForm />
        <p className="text-xs text-muted-foreground">
          Wipes every <code className="font-mono">learner_topic_competence</code> row for your
          account. You&apos;ll be sent back to{' '}
          <Link href="/intake" className="underline underline-offset-2">
            intake
          </Link>{' '}
          to re-baseline.
        </p>
      </section>
    </main>
  )
}
