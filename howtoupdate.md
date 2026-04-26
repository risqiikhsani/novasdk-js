# How to Update the Package

A step-by-step guide to updating an existing NovaSDK package on the npm registry.

---

## Update Workflow

### Step 1: Edit the Source Files

Make your changes in the `src/` directory:

```
src/
├── index.ts        # Main entry point (version lives here)
└── utils/
    └── index.ts    # Utility functions
```

### Step 2: Bump the Version

You must update the version in **two places**:

**A. `package.json`** — `version` field:

```json
"version": "1.1.1"
```

**B. `src/index.ts`** — `__version__` constant:

```typescript
export const __version__ = "1.1.1";
```

> **npm rejects republishing the same version** — always bump it before publishing.

### Step 3: Rebuild

```bash
# Clean old dist (optional but recommended)
rm -rf dist/

# Install dependencies
pnpm install

# Build TypeScript → dist/
pnpm run build
```

### Step 4: Test Locally

```bash
# Link the package so you can import it from anywhere
npm link

# In another directory, run:
node -e "import('@risqiikhsani/novasdk').then(m => console.log(m.__version__))"
```

### Step 5: Publish

```bash
npm publish --access public
```

### Step 6: Verify

```bash
npm view @risqiikhsani/novasdk version
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm run build` | Compile TypeScript → dist/ |
| `rm -rf dist/` | Clear old build files |
| `npm link` | Test locally before publishing |
| `npm publish --access public` | Publish to npm |
| `npm view @risqiikhsani/novasdk version` | Check published version |

---

## Semantic Versioning

- **PATCH** (1.0.**1**) — Bug fixes
- **MINOR** (1.**1**.0) — New features (backwards compatible)
- **MAJOR** (**2**.0.0) — Breaking changes

---

## Authentication

If publishing fails with `E403`, you need an automation token:

1. Go to [https://www.npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. Generate a new token with **Automation** type
3. Add it to `~/.npmrc`:

```bash
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" >> ~/.npmrc
```

This lets npm authenticate automatically — no `npm login` needed after this.