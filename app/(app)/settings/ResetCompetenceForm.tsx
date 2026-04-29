'use client'

import { resetCompetenceAction } from './actions'

export default function ResetCompetenceForm() {
  return (
    <form
      action={resetCompetenceAction}
      onSubmit={(e) => {
        if (!confirm('Wipe your entire competence profile? You will need to redo intake.')) {
          e.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-800 shadow-sm hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900"
      >
        Reset competence profile
      </button>
    </form>
  )
}
