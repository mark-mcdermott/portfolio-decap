---
title: 'Quick Notes On Git Amending, Squashing & Diffing'
date: '3/25/24'
---

I've been working collaboratively on Drivetracks with a couple people and have forced to improve my git-fu a bit and want to jot down real quick what I've learned.

| description | git command |
| -------- | ------- |
| change last commit message  | `git commit --amend` |
| change specific commit message | `git rebase -i HEAD~3`  |
| add stuff to the last commit | `git commit --amend --no-edit` |
| sqash last n commits | `git reset --soft HEAD~n` |
| interactive squash | `git rebase -i HEAD~n` |
| (...but keep original commit date) | `git rebase -i --committer-date-is-author-date HEAD~n` |
| see a branch's changes | `git diff main` |
| see a branch's divergent changes | `git diff main...branch` |
| see diff between two commits | `git diff hash1...hash2` |
