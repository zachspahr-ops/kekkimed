import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack to this directory. Without this, Next.js walks up
  // looking for a lockfile/workspace yaml and finds the parent project's
  // (this repo lives inside Kekki/.claude/worktrees/<name>/), then warns
  // about "multiple lockfiles". Setting root explicitly silences the
  // warning and keeps the resolver scoped to this worktree.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Ensure prompts/*.md files are bundled in Vercel's output file tracing
  // so server actions can read them at runtime via fs.readFileSync.
  outputFileTracingIncludes: {
    '/**': ['./prompts/**'],
  },
  async rewrites() {
    return [
      {
        source: "/reviewer",
        destination: "/reviewer/index.html",
      },
      {
        source: "/network/4\\.9",
        destination: "/networks/4.9/index.html",
      },
      {
        source: "/network/5\\.0",
        destination: "/networks/5.0/index.html",
      },
      {
        source: "/network/5\\.1",
        destination: "/networks/5.1/index.html",
      },
      {
        source: "/explore",
        destination: "/explorer/index.html",
      },
    ];
  },
};

export default nextConfig;
