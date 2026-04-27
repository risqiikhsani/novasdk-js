# How to Publish to npm Registry

A step-by-step guide to publishing the HyperNova SDK package to the npm registry.

---

## Prerequisites

1. **Create an npm account** at [https://www.npmjs.com/signup](https://www.npmjs.com/signup)
2. **Enable 2FA** on your npm account (required for publishing)
3. **Generate an Access Token**:
   - Go to [https://www.npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
   - Click **"Generate New Token"**
   - Choose **"Automation"** type (for CI/CD) or **"Publish"** type (for local publishing)
   - Copy the token — you won't see it again

---

## First-Time Publish

### Step 1: Login to npm

```bash
npm login
```

Or if you have an automation token:

```bash
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" > ~/.npmrc
```

### Step 2: Update package.json

Before publishing, make sure your `package.json` has the correct details:

```json
{
  "name": "@hypernova-sdk/core",
  "version": "1.0.0",
  "description": "A utility library for common Node.js tasks.",
  "main": "dist/index.js",
  "type": "module",
  "keywords": ["utility", "utils", "log", "logger", "hypernova", "hypernova-sdk"],
  "author": "Risqi Ikhsani",
  "license": "MIT"
}
```

### Step 3: Build the Project

```bash
pnpm install
pnpm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### Step 4: Verify the Build

```bash
ls dist/
```

You should see the compiled `.js` and `.d.ts` files.

### Step 5: Test Locally (Optional)

```bash
npm link
```

Then in another directory:

```bash
npm link @hypernova-sdk/core
```

### Step 6: Publish to npm

```bash
npm publish --access public
```

> **Note:** The `--access public` flag is required for scoped packages (`@username/package-name`).

### Step 7: Verify the Package

```bash
npm view @hypernova-sdk/core
```

Or install it:

```bash
npm install @hypernova-sdk/core
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm run build` | Compile TypeScript |
| `npm login` | Login to npm |
| `npm publish --access public` | Publish to npm |
| `npm view @hypernova-sdk/core` | View package info |
| `npm install @hypernova-sdk/core` | Install from npm |

---

## Troubleshooting

### Error: `E403 Forbidden`

- Your package name might already be taken
- Your npm account might not have 2FA enabled
- Your token might not have publish permissions

### Error: `E401 Unauthorized`

- Your authentication token is invalid or expired
- Re-login or regenerate the token

### Error: `You cannot publish over the version X.X.X`

- You already published this version
- Bump the version in `package.json` before publishing again