# Engineering Standards — mi-portfolio

Source of truth for AI agents working in this repo (OpenCode, Claude Code, Codex). Migrated from the Obsidian vault's agent decisions on 2026-07-20.

## Code quality
- Max 250 lines per source file — when exceeded, split by extracting Astro components or dedicated modules.
- No `console.log` in production code paths; no dead code or commented-out blocks in commits.

## Secrets
- Never hardcode secrets or API keys in source. Read them from environment variables.
- `.env` holds real values, lives in `.gitignore`, and is never committed. `.env.example` holds the same variable names with placeholders and IS committed.
- If a secret ever lands in git history (even if deleted afterwards), rotate it immediately — history preserves the value.

## Git
- Conventional commits (`feat:`, `fix:`, `chore:`, ...). No AI attribution in commit messages.
- Never push, pull, delete remote branches, or run any remote-mutating git operation without asking the user first.
