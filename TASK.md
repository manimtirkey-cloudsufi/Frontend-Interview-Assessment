# Interview Task — React/TypeScript Bug Hunt

**Time box: 30 minutes.**

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL. Use the tab bar to switch between the 5 components:

1. User List
2. FAQ Accordion
3. Customer Table
4. Notifications
5. Profile Form

## What you're doing

Somewhere across these 5 components there are logical bugs and UI inconsistencies planted.
You don't need to find all of them — just report:

- **One logical bug** — something that behaves incorrectly (wrong state, wrong condition,
  wrong calculation, etc.), in whichever component you find it first. Fix it directly in
  that component's `.tsx` file and briefly explain the root cause.
- **One UI inconsistency** — a place where a rendered component deviates from the canonical
  design spec in [`src/styles/tokens.css`](src/styles/tokens.css) (colors, spacing scale,
  border-radius, type sizes, button variants). You don't need to fix this — just identify and
  describe it. It can be in the same component as the bug or a different one.

Fill in your findings in [`FINDINGS_TEMPLATE.md`](FINDINGS_TEMPLATE.md).

## Ground rules

- Describe what you observe in writing — where it is, what you expected
  per the token spec, and what's actually happening. Treat it like a bug report you'd file
  for a teammate who can't see your screen.
- You may use browser dev tools (inspect element, console) freely.
- You may run `npm run build` at any point to sanity-check your fixes don't break
  type-checking.
- Ask questions out loud if anything about a component's *intended* behavior is ambiguous —
  we're evaluating your reasoning process as much as the final answer.

## Submission

When time is up, share:
- The edited `src/` folder (or a diff/patch) with your bug fixes.
- Your completed `FINDINGS_TEMPLATE.md`.
