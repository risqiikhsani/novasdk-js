# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm run build        # Compile TypeScript → dist/
pnpm run dev          # Watch mode for TypeScript
npm publish --access public  # Publish to npm (scoped package requires --access public)
```

## Project Architecture

**Package:** `@risqiikhsani/novasdk` — a utility library for pretty console output in Node.js.

**Source structure:**
- `src/index.ts` — Main entry point. Re-exports everything from utils and exposes `__version__`.
- `src/utils/index.ts` — All log utilities: `NovaLogger` class, module-level helpers (`nova_log`, `print_*`), `progress`, `status`, `timer`, `timerAsync`.

**Build output:** `dist/` is compiled from `src/` via TypeScript. Never edit files in `dist/` directly.

**TypeScript config:** `NodeNext` module resolution, `ES2022` target, strict mode. Declarations and source maps are generated alongside `.js` output.

**Dependencies:** `chalk`, `cli-progress`, `cli-table3` — all runtime. `typescript`, `@types/cli-progress` are dev.

## Version Bump

When releasing an update, bump the version in both:
- `package.json` — `version` field
- `src/index.ts` — `__version__` constant

Then rebuild with `pnpm run build` before publishing.