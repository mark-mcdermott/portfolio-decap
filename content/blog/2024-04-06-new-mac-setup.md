---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:
- change wallpaper to solid cyan
- set trackpad speed to 8/10
- change Safari download folder to desktop
- download Arc browser & log in
- add home folder and root folder to Finder sidebar
- `mkdir ~/Applications && mkdir ~/Desktop/misc`
- install homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- install dockutil: `brew install dockutil`
- remove default dock icons: `dockutil --remove all`
- allow downloads from anywhere: `sudo spctl --master-disable`
- download VScode, iTerm & Spotify desktop
- `touch ~/.zshrc`
- install nvm: `brew update && brew install nvm && nvm install node`
- `echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc`
