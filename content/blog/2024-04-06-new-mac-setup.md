---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:

* in mac settings:

  * change wallpaper to solid cyan
  * set trackpad speed to 8/10
* in terminal

  * install homebrew (locally for current Mac user only)

    * `git clone https://github.com/Homebrew/brew.git ~/brew`
    * `echo 'export PATH=$HOME/brew/bin:$PATH' >> ~/.zshrc`
* in terminal

  * `mkdir ~/Applications` (install non-brew apps here to keep them sandboxed to current Mac user)
  * `mkdir ~/Desktop/misc` (a folder I use for stashing junk in)
  * `sudo spctl --master-disable` (allow downloads from anywhere)
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
