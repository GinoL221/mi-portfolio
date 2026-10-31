# Engineering Standards — mi-portfolio

Source of truth for AI agents working in this repo (OpenCode, Claude Code, Codex). Migrated from the Obsidian vault's agent decisions on 2026-07-20.

## Verification
- For UI behavior changes, run `npm run test:e2e`. It builds the site and runs the Playwright end-to-end tests. Report the result, including any skipped tests.

## Code quality
- No `console.log` in production code paths; no dead code or commented-out blocks in commits.

## Secrets
- Never hardcode secrets or API keys in source. Read them from environment variables.
- If environment variables are introduced, keep real values in an ignored, uncommitted `.env` and commit a `.env.example` with the same names and placeholders.
- If a secret ever lands in git history (even if deleted afterwards), rotate it immediately — history preserves the value.

## Git
- Conventional commits (`feat:`, `fix:`, `chore:`, ...). No AI attribution in commit messages.
- Never push, pull, delete remote branches, or run any remote-mutating git operation without asking the user first.
