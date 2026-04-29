import { createClient } from '@/lib/supabase/server'
import IntakeClient from './IntakeClient'

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const supabase = await createClient()

  // Load the 18 systems for the sliders + standardized form.
  const { data: systemRows } = await supabase
    .from('concepts')
    .select('id, title, weight')
    .eq('level', 'system')
    .order('weight', { ascending: false })

  const systems = (systemRows ?? []).map((r) => ({
    id: r.id as string,
    title: r.title as string,
    weight: r.weight as number | null,
  }))

  // Detect whether the user has already initialized competence (so we can
  // tell them they're re-baselining, not seeding cold).
  const {
    data: { user },
  } = await supabase.auth.getUser()
  let existingRows = 0
  if (user) {
    const { count } = await supabase
      .from('learner_topic_competence')
      .select('user_id', { count: 'exact', head: true })
      .eq('user_id', user.id)
    existingRows = count ?? 0
  }

  const params = await searchParams

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Initial calibration</h1>
        <p className="text-sm text-muted-foreground">
          Pick one of three ways to seed your competence profile. The deterministic planner uses
          this to pick your three weakest topics next time you generate a study plan.
        </p>
        {existingRows > 0 && (
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
            You already have {existingRows} competence rows on file. Submitting any tab below will
            overwrite the relevant topics.
          </p>
        )}
        {params.error === 'no_cards' && (
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">
            Couldn&apos;t find enough cards across systems for an evaluator session. Try the
            self-report or standardized tab instead.
          </p>
        )}
      </header>

      <IntakeClient systems={systems} />
    </main>
  )
}
