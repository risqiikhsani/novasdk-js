# How to Update the Package

A step-by-step guide to updating an existing NovaSDK package on the npm registry.

---

## Update Workflow

### Step 1: Edit the Source Files

Make your changes in the `src/` directory:

```bash
# Edit the files you need to update
src/
├── index.ts        # Main entry point
└── utils/
    └── index.ts    # Utility functions
```

### Step 2: Update the Version

Bump the version in **three places**:

#### A. `package.json` — `version` field

```json
{
  "version": "1.0.1"
}
```

#### B. `src/index.ts` — `__version__` constant (optional)

```typescript
export const __version__ = "1.0.1";
```

> **Note:** If you use **Release Please** or automated versioning tools, this step may be handled automatically.

### Step 3: Rebuild the Project

```bash
# Clean old build (optional)
rm -rf dist/

# Install dependencies
pnpm install

# Rebuild
pnpm run build
```

### Step 4: Test Locally

```bash
# Link the package locally
npm link

# In another project or test file, import it
import { nova_log, print_success } from "@risqiikhsani/novasdk";

print_success("Hello from NovaSDK!");
```

### Step 5: Publish the Update

```bash
npm publish --access public
```

### Step 6: Verify the Update

```bash
npm view @risqiikhsani/novasdk version
```

Or install and check:

```bash
npm install @risqiikhsani/novasdk
node -e "import('@risqiikhsani/novasdk').then(m => console.log(m.__version__))"
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm run build` | Rebuild after changes |
| `rm -rf dist/` | Clear old build files |
| `npm link` | Test locally |
| `npm publish --access public` | Publish update |
| `npm view @risqiikhsani/novasdk version` | Check published version |

---

## Important Rules

1. **Never republish the same version** — npm will reject it
2. **Always bump the version** before publishing an update
3. **Use semantic versioning:**
   - `PATCH` (1.0.**1**) — Bug fixes
   - `MINOR` (1.**1**.0) — New features (backwards compatible)
   - `MAJOR` (**2**.0.0) — Breaking changes

---

## Automated Versioning (Optional)

If you want automated versioning, you can set up **Release Please**:

1. Add a GitHub Actions workflow in `.github/workflows/release.yml`
2. Push commits to trigger version bumps automatically
3. Releases are published automatically on version changes

For manual control, just update the version numbers in `package.json` before each publish.