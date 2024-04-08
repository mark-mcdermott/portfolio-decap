---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:

* in mac settings:

  * change wallpaper to solid cyan
  * set trackpad speed to 8/10
* in terminal

  * install homebrew & main apps

    * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    * `(echo; echo 'eval "$(/usr/local/bin/brew shellenv)"') >> /Users/mark/.zprofile`
    * `eval "$(/usr/local/bin/brew shellenv)"`
    * `brew install arc iterm2 dockutil node visual-studio-code Spotify`
* in terminal

  * `mkdir ~/Applications` (install non-brew apps here to keep them sandboxed to current Mac user)
  * `mkdir ~/Desktop/misc` (a folder I use for stashing junk in)
  * `sudo spctl --master-disable` (allow downloads from anywhere)
  * `dockutil --remove all` (remove default dock icons)
* In Finder > settings > sidebar:

  * Favorites

    * remove everything but Desktop
    * add home folder
  * Locations: add root folder
* Arc browser:

  * log in (as mcdermottsolutions@gmail.com)
  * set download folder to Desktop
* terminal setup

  * install Oh My Zsh

    * `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
  * install Powerline Fonts

    * `git clone https://github.com/powerline/fonts.git --depth=1`
    * `cd fonts `
    * `./install.sh `
    * `cd .. `
    * `rm -rf fonts`
  * install Agnoster theme

    * ?
* clone Powerlevel10k theme: `cd ~/.oh-my-zsh/themes && git clone https://github.com/romkatv/powerlevel10k.git`
* https://www.youtube.com/watch?v=0FZSshb1qTQ
