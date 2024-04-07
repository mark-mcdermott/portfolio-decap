---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:

* in mac settings:

  * change wallpaper to solid cyan
  * set trackpad speed to 8/10
* in terminal

  * `touch ~/.zshrc`
  * `mkdir ~/Applications && mkdir ~/Desktop/misc`
  * allow downloads from anywhere: `sudo spctl --master-disable`
* In Finder > settings > sidebar:

  * Favorites

    * remove everything but Desktop
    * add home folder
  * Locations: add root folder
* Arc browser:

  * install (to ~/Applications) 
  * log in (as mcdermottsolutions@gmail.com)
  * set download folder to Desktop
* install homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
* install dockutil (remove default dock icons)

  * `brew install dockutil`
  * `dockutil --remove all`
* download VScode, iTerm & Spotify desktop
* install nvm: `brew update && brew install nvm && nvm install node`
* `echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc`
* install Oh My Zsh: `sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`
* clone Powerlevel10k theme: `cd ~/.oh-my-zsh/themes && git clone https://github.com/romkatv/powerlevel10k.git`
* https://www.youtube.com/watch?v=0FZSshb1qTQ
