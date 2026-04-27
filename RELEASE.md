# Release Guide

## Prerequisites

Before publishing, add the `NPM_TOKEN` secret to your GitHub repository:

1. Go to **Settings → Secrets and variables → Actions → New repository secret**
2. Name: `NPM_TOKEN`
3. Value: your npm access token

---

## Manual Versioning Steps

Follow these steps **in order** each time you release a new version.

### 1. Bump the version

Update `version` in `package.json`:

```json
"version": "x.y.z"
```

Update `__version__` in `src/index.ts`:

```ts
export const __version__ = "x.y.z"
```

### 2. Commit the changes

```bash
git add .
git commit -m "release: vx.y.z"
```

### 3. Create and push the tag

```bash
git tag vx.y.z
git push origin main --tags
```

> The tag prefix `v` is stripped automatically by npm — your `package.json` must contain the bare version `x.y.z` (no `v`).

### 4. Create the GitHub Release

1. Go to your repo on GitHub → **Releases** → **Draft a new release**
2. Select the tag you just pushed (`vx.y.z`)
3. Fill in the **Release title** and **description**
4. Click **Publish release**

The GitHub Action will trigger automatically and publish to npm.

---

## Versioning Convention

Follow [Semantic Versioning](https://semver.org/):

| Change | Example | Notes |
|---|---|---|
| Patch fix | `1.0.0` → `1.0.1` | Bug fixes, no API changes |
| Minor feature | `1.0.1` → `1.1.0` | New features, backward compatible |
| Major breaking | `1.1.0` → `2.0.0` | Breaks backward compatibility |

---

## Quick Reference

```bash
# 1. Update version in package.json and src/index.ts
# 2. Commit
git add . && git commit -m "release: v1.2.0"

# 3. Tag and push
git tag v1.2.0 && git push origin main --tags

# 4. Go to GitHub → Releases → Draft a new release → Publish
```
