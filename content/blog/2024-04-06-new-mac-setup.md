---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
How I like to setup a new Mac:
- change wallpaper to solid cyan
- change Safari download folder to desktop
- add home folder and root folder to Finder sidebar
- add an Applications folder in my home folder
- add a misc folder to desktop
- install homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- install dockutil: `brew install dockutil`
- remove default dock icons: `dockutil --remove all`
- allow downloads from anywhere: `sudo spctl --master-disable`
- download vscode
