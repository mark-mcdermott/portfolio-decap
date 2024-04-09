---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:

* in mac settings:

  * change wallpaper to solid cyan
  * set trackpad speed to 8/10
* terminal setup

  * install homebrew (~4 mins)

    * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    * `(echo; echo 'eval "$(/usr/local/bin/brew shellenv)"') >> /Users/mark/.zprofile`
    * `eval "$(/usr/local/bin/brew shellenv)"`
  * install iTerm2 & VScode

    * `brew install iterm2 visual-studio-code`
  * install Oh My Zsh

    * `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
  * iTerm2 settings:

    * general -> closing: uncheck both quit confirmations
    * profile

      * colors -> color presets -> Solarized Dark
      * colors -> ANSI Colors -> Black Bright -> #565656
      * terminal -> check Unlimited Scrollback
      * keys -> key mappings -> presets... -> Natural Text Editing
    * install Powerlevel10k theme 

      * `git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k`
      * `sed -i '' "s/ZSH_THEME=\".*\"/ZSH_THEME=\"powerlevel10k\/powerlevel10k\"/" ~/.zshrc`
      * `source ~/.zshrc`
    * install zsh autosuggestions

      * `git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`
      * `sed -i '' -e "s/plugins=(git)/plugins=(git zsh-autosuggestions)/" ~/.zshrc`
      * `source ~/.zshrc`
    * install syntax highlighting

      * `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`
      * `sed -i '' "s/plugins=(git zsh-autosuggestions)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/" ~/.zshrc`
      * `source ~/.zshrc`
    * set VScode terminal

      * `code .`
      * command + shift + p,
      * `Preferences: Open User Settings (JSON)`
      * add `"terminal.integrated.fontFamily": "MesloLGS NF"`
* in terminal

  * install main apps

    * `brew install arc dockutil node spotify`
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
* Google

  * log in (as YouTube premium account)
* CleanShot

  * download cleanshot & log into personal account at  [licenses.cleanshot.com/download/cleanshotx](https://licenses.cleanshot.com/download/cleanshotx)
* Install ruby & rails

  * install asdf

    * `brew install coreutils curl git`
    * `brew install asdf`
  * z
* Install alfred

### Sources

* a lot of the Powerlevel10k configurations are from [youtube.com/watch?v=0FZSshb1qTQ](https://www.youtube.com/watch?v=0FZSshb1qTQ)
