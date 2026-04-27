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
};

export default nextConfig;
