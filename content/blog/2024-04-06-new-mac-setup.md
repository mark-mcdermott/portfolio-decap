---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:

* in mac settings:

  * change wallpaper to solid cyan
  * set trackpad speed to 8/10
* terminal setup

  * install homebrew

    * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    * `(echo; echo 'eval "$(/usr/local/bin/brew shellenv)"') >> /Users/mark/.zprofile`
    * `eval "$(/usr/local/bin/brew shellenv)"`
  * install Oh My Zsh

    * `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
  * install dark solarized color scheme

    * `mkdir ~/iterm-color-schemes`
    * `cd ~/iterm-color-schemes`
    * `curl -O https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Solarized%20Dark%20-%20Patched.itermcolors`
    * `chmod 755`
    * `open .`
    * double click `Solarized%20Dark%20-%20Patched.itermcolors`
  * install Powerline Fonts

    * `git clone https://github.com/powerline/fonts.git --depth=1`
    * `cd fonts`
    * `./install.sh`
    * `cd ..`
    * `rm -rf fonts`
  * install Agnoster theme

    * `sed -i '' 's/ZSH_THEME="robbyrussell"/ZSH_THEME="agnoster"/' ~/.zshrc`
  * clone Powerlevel10k theme: `cd ~/.oh-my-zsh/themes && git clone https://github.com/romkatv/powerlevel10k.git`
  * https://www.youtube.com/watch?v=0FZSshb1qTQ
* in terminal

  * install main apps

    * `brew install arc iterm2 dockutil node visual-studio-code spotify`
  * miscellaneous conifguration

    * `mkdir ~/Applications` (install non-brew apps here to keep them sandboxed to current Mac user)
    * `mkdir ~/Desktop/misc` (a folder I use for stashing junk in)
    * `sudo spctl --master-disable` (allow downloads from anywhere)
    * `dockutil --remove all` (remove default dock icons)
* In Finder > settings > sidebar:

  * Favorites

    * remove everything but Desktop and Applications
    * add home folder
  * Locations

    * add root folder
* Arc browser:

  * log in (as mcdermottsolutions@gmail.com)
  * set download folder to Desktop
