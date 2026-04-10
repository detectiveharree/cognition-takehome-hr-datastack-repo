# Documentation Sync GitHub Action

This GitHub Action automatically checks if code changes in a PR require documentation updates. It uses Devin AI to analyze the changes and create documentation PRs when needed.

## How It Works

1. **Triggers on PRs** - The action runs when a PR is opened, synchronized, or reopened against `main` or `master`
2. **Detects API Changes** - It identifies which files were changed and filters for API-related code
3. **Analyzes with Devin** - Sends the changes to Devin AI to analyze documentation impact
4. **Creates Docs PR** - If documentation updates are needed, Devin creates a separate PR with the fixes
5. **Posts Comment** - Adds a comment to the PR summarizing the analysis
6. **Always Passes** - The check passes regardless (either docs are in sync, or a docs PR was created)

## Setup

### 1. Add the workflow file

Copy `.github/workflows/docs-sync-check.yml` to your repository's `.github/workflows/` directory.

### 2. Configure repository secrets

Add the following secret to your repository (Settings → Secrets and variables → Actions):

- `DEVIN_API_KEY` - Your Devin AI API key

### 3. (Optional) Require the check

To enforce the check before merging:

1. Go to Settings → Branches → Branch protection rules
2. Add a rule for `main` (or `master`)
3. Enable "Require status checks to pass before merging"
4. Add "Check Documentation Sync" as a required check

## Customization

### Change which files trigger the check

Edit the `files` section in the workflow to match your project structure:

```yaml
files: |
  **/*.ts
  **/*.tsx
  **/*.js
  **/*.jsx
  **/*.py
  app/api/**/*
  api/**/*
  routes/**/*
  src/api/**/*
  src/routes/**/*
```

### Change target branches

Edit the `branches` section:

```yaml
branches:
  - main
  - master
  - develop
```

### Adjust timeout

The action polls Devin for up to 30 minutes. Adjust `MAX_ATTEMPTS` (each attempt waits 10 seconds):

```bash
MAX_ATTEMPTS=180  # 30 minutes
```

## Behavior Summary

| Scenario | Result |
|----------|--------|
| No API files changed | ✅ Skipped - no docs check needed |
| API changed, docs in sync | ✅ Passed - comment confirms docs are good |
| API changed, docs need update | ✅ Passed - docs PR created automatically |
| Devin session fails/times out | ✅ Passed - comment recommends manual review |

The action is designed to **assist, not block** - it ensures documentation is addressed without stopping developer productivity.
