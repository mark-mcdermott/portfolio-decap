---
title: ESLint Auto-Fix On Save
date: 2024-06-11T03:26:00.000Z
---
Let's look at how to use [ESLint](https://eslint.org) to keep our Vue JavaScript clean looking. Specifically, we'll use [antfu's eslint-config](https://github.com/antfu/eslint-config) which are nice presets including auto-fix on save and a nice one line CLI install tool.
- install VSCode extension `ESLint`
- let's say your app is in `~/app`
- `cd ~/app`
- `npm init` (hit enter for all prompts)
- `pnpm dlx @antfu/eslint-config@latest`
  - uncommitted changes, continue? `yes`
  - framework: `Vue`
  - extra utils: `none`
  - update `.vscode/settings.json`: `yes`
- `npm install`
- in `~/app/.vscode/settings.json`, change the `codeActionsOnSave` section (lines 7-10) to:
```
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.organizeImports": "always"
  },
```
- in `~/app/package.json`
  - you should see some red underlines for ESLint violations
  - hit `command + s` to save and you should see ESLint automatically fix the issues 🎉
- add these lines to the `scripts` section of `~/app/package.json`:
```
"lint": "npx eslint .",
"lint:fix": "npx eslint . --fix"
```
- now you can run `npm run lint` to run the linter
- and you can run `npm run lint:fix` to run the linter and autofix 
