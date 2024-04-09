---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:

* in mac settings:

  * change wallpaper to solid cyan
  * set trackpad speed to 8/10
* terminal setup

  * install homebrew (~3 mins)

    * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    * `(echo; echo 'eval "$(/usr/local/bin/brew shellenv)"') >> /Users/mark/.zprofile`
    * `eval "$(/usr/local/bin/brew shellenv)"`
  * install apps (~5 mins)

    * `brew install iterm2 visual-studio-code textbar arc alfred inkscape blender spotify 1password slack postgres`
  * install adoble creative cloud

    * `adobe-creative-cloud`
    * will have to enter password
  * install fusion 360 (~3 mins)

    * `brew install autodesk-fusion`
    * will have to click notification, allow permissions in settings
    * and then run `brew install autodesk-fusion` again
  * install Oh My Zsh

    * `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
  * iTerm2 settings:

    * general -> closing: uncheck both quit confirmations
    * profile

      * colors -> color presets -> Solarized Dark
      * colors -> ANSI Colors -> Black Bright -> #565656
      * terminal -> check Unlimited Scrollback
      * keys -> key mappings -> presets... -> Natural Text Editing -> Keep
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
      * "always allow" (always allow scrollback history clears)
      * y, command + q, command + space -> iterm, y, command + q, command + space -> iterm, y, y, y, y, 3, 1, 2, 1, 1, 1, 2, 2, 2, n, 1, y
    * install asdf

      * `git clone https://github.com/asdf-vm/asdf.git ~/.asdf`
      * `sed -i '' "s/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting asdf)/" ~/.zshrc`
      * `source ~/.zshrc`
    * Install node, ruby and python and java

      * `asdf plugin add nodejs`
      * `asdf install nodejs latest`
      * `asdf global nodejs latest`
      * `asdf plugin add ruby`
      * `asdf install ruby latest`
      * `asdf plugin add python`
      * `asdf install python latest`
      * `asdf plugin-add java`
      * `asdf install python latest`
    * set VScode terminal to match iTerm

      * `code .`
      * command + shift + p,
      * `Preferences: Open User Settings (JSON)`
      * add `"terminal.integrated.fontFamily": "MesloLGS NF"`
* miscellaneous configurations from terminal

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
* Log into apps

  * Alfred 

    * login
  * Arc browser:

    * log in (as mcdermottsolutions@gmail.com)
    * set download folder to Desktop
  * Google

    * log in (as YouTube premium account)
  * CleanShot

    * download cleanshot & log into personal account at  [licenses.cleanshot.com/download/cleanshotx](https://licenses.cleanshot.com/download/cleanshotx)``
* Add VScode extensions

  * Vue - Official
  * Render Line Endings
  * GitLens
  * Vim
  * Prettier
* Setup github

  * login to github?
  * get key?
  * add key to .ssh/config?
* Setup menubar

  * turn off local ip item and wifi item
  * use cloud icon for public ip address
  * add Spotify 

    * script: `osascript -e 'if application "Spotify" is running then' -e 'tell application "Spotify"' -e 'if player state is playing then' -e 'return "♫ " & (artist of current track as string) & " - " & (name of current track as string)' -e 'end if' -e 'end tell' -e 'end if'`
    * refresh:`5 seconds`
    * no icon
  * Add docs

    * script: `curl -s https://terminal-stocks.dev/DOCS | grep Doximity | sed -E 's/│//g' | sed -E 's/Doximity, Inc.//' | sed -E 's/(\$..\...).*/\1/'`
    * no icon
    * todo: change color from cyan to black
  * add Site Status

    * `mkdir ~/scripts/isOnline -p`
    * `touch ~/scripts/isOnline sitestatus.txt`
    * `echo -e "https://markmcdermott.io;markmcdermott.io\n" > ~/scripts/isOnline/websites.lst`
    * paste this script in terminal to create the SiteStatus script

```
      cat <<EOT >> ~/scripts/SiteStatus.sh
      #!/bin/bash

      WORKSPACE=~/scripts/isOnline
      # list of websites. each website in new line. leave an empty line in the end.
      # each line can have an url to test and an optional displayname:
      # for example:
      # http://markmcdermott.io
      # hostname.com/testme
      # hostname.com:8181
      # hostname.com;Pretty Display Name
      LISTFILE=$WORKSPACE/websites.lst
      # List of site/status
      SITESTATUS=$WORKSPACE/sitestatus.txt

      SITEUPCOUNT=0
      SITEDOWNCOUNT=0
      ICONLINE=''

      # Clean up file
      if [ -f $SITESTATUS ]; then rm -f $SITESTATUS; fi

      # main loop
      while read p; do

          #Load the website line into an array
          IFS=';' read -ra WWW <<< "$p"
          if [ ${#WWW[@]} -eq 1 ]; then
              DISPLAYNAME=${WWW[0]}
          else
              DISPLAYNAME=${WWW[1]}
          fi

          response=$(curl -I -s -o /dev/null -w "%{http_code}" ${WWW[0]})

          if [ $response -eq 200 ] ; then
              # Site up        
              # Increment counter
              SITEUPCOUNT=$[SITEUPCOUNT+1]

              # Add info to SITESTATUS file
              echo -e "${DISPLAYNAME} : \e[32m[ok]\e[0m" >> $SITESTATUS
          else
              # Site Down
              # Increment counter
              SITEDOWNCOUNT=$[SITEDOWNCOUNT+1]

              # Add info to SITESTATUS file
              echo -e "${DISPLAYNAME} : \e[31m[DOWN]\e[0m" >> $SITESTATUS
          fi
      done <$LISTFILE

      #Prepend the counts to SITESTATUS

      if [ $SITEUPCOUNT -gt 0 ] ; then
          ICONLINE+="\e[92m●\e[39m$SITEUPCOUNT"
      fi
      if [ $SITEDOWNCOUNT -gt 0 ] ; then
          ICONLINE+="\e[91m●\e[39m$SITEDOWNCOUNT"
      fi
      echo -e "$ICONLINE\n$(cat $SITESTATUS)" > $SITESTATUS
      cat $SITESTATUS
      EOT
```

### Sources

* a lot of the Powerlevel10k configurations are from [youtube.com/watch?v=0FZSshb1qTQ](https://www.youtube.com/watch?v=0FZSshb1qTQ)
