import { signInWithEmail } from './actions'

type Props = {
  searchParams: Promise<{ status?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to Kekki
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a magic link. No password
            required.
          </p>
        </div>

        {params.status === 'sent' && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
            Check your email — the magic link is on its way. Click it to sign
            in.
          </div>
        )}
        {params.error && (
          <div
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
            role="alert"
          >
            {params.error}
          </div>
        )}

        <form action={signInWithEmail} className="space-y-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Send magic link
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Educational study aid. Not clinical guidance.
        </p>
      </div>
    </main>
  )
}
