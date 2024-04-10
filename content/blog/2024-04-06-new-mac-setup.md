---
title: New Mac Setup
date: 2024-04-06T06:49:00.000Z
---
Some notes on how I like to setup a new Mac:

* in mac settings:

  * change wallpaper to solid cyan
  * set trackpad speed to 8/10
* install main apps

  * install homebrew (~3 mins)

    * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    * `(echo; echo 'eval "$(/usr/local/bin/brew shellenv)" # homebrew') >> /Users/mark/.zprofile`
    * `eval "$(/usr/local/bin/brew shellenv)"`
  * install arc, spotify & alfred (~3 mins)

    * `brew install arc spotify `
  * install apps (~5 mins)

    * `brew install iterm2 visual-studio-code textbar inkscape blender 1password slack postgres-unofficial rocket element discord dockutil`
    * (login to arc, spotify & alfred while these install)
  * install adoble creative cloud

    * `brew install adobe-creative-cloud`
    * will have to enter password
  * install fusion 360 (~8 mins)

    * `brew install autodesk-fusion`
    * will have to click notification, allow permissions in settings and restart terminal 
    * then run `brew install autodesk-fusion` again (run twice, if it fails the first time)
  * install puravida (custom bash script like mkdir and touch)

    * curl -o /usr/local/bin/puravida https://gist.githubusercontent.com/mark-mcdermott/ae00250f19945bad091d4ac04203ae18/raw/c48696a3ed16a0b810236749f9a128f451f349f7/puravida.sh
    * chmod 755 /usr/local/bin/puravida.sh
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
    * y, "always allow" (always allow scrollback history clears), command + q, command + space -> iterm, y, command + q, command + space -> iterm, y, y, y, y, 3, 1, 2, 1, 3, 1, 1, 2, 2, 2, n, 1, y
  * install zsh autosuggestions

    * `git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`
    * `sed -i '' -e "s/plugins=(git)/plugins=(git zsh-autosuggestions)/" ~/.zshrc`
    * `source ~/.zshrc`
  * install syntax highlighting

    * `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`
    * `sed -i '' "s/plugins=(git zsh-autosuggestions)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/" ~/.zshrc`
    * `source ~/.zshrc`
* install programming languages

  * install asdf

    * `git clone https://github.com/asdf-vm/asdf.git ~/.asdf` (delete?)
    * `sed -i '' "s/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting asdf)/" ~/.zshrc`
    * `source ~/.zshrc`
  * install some ruby asdf dependencies

    * `brew install zlib readline libyaml libffi`
  * Install node, ruby and python and java

    * `asdf plugin add nodejs`
    * `asdf plugin add ruby`
    * `asdf plugin add python`
    * `asdf plugin-add java`
    * `asdf install nodejs latest`
    * `asdf global nodejs latest`
    * `asdf install ruby latest` (~4 mins, click the toast notification & allow notifications)
    * `asdf install python latest` (~2 min)
    * todo: install intellij (with brew?) and whatever it needs (sdk?) with asdf?
* setup VScode

  * set VScode terminal to match iTerm

    * `code .`
    * "allow", "allow", "allow", "allow"
    * command + shift + p
    * `Preferences: Open User Settings (JSON)`
    * add `"terminal.integrated.fontFamily": "MesloLGS NF"` inside the JSON curly brackets
  * Add VScode extensions

    * Vue - Official
    * Render Line Endings
    * GitLens
    * Prettier
    * todo: maybe Vim plugin?
* miscellaneous configurations from terminal

  * `mkdir ~/Desktop/misc` (a folder I use for stashing junk in)
  * `sudo spctl --master-disable` (will need password, allows downloads from anywhere)
* setup dock

  * `dockutil --remove all`
  * `dockutil --add /Applications/1Password.app`
  * `dockutil --add /Applications/Arc.app`
  * `dockutil --add /Applications/Visual\ Studio\ Code.app`
  * `dockutil --add /Applications/iTerm.app`
  * `dockutil --add /Applications/Slack.app`
  * `dockutil --add /Applications/Spotify.app`
  * `dockutil --add '/Applications' --view grid --display folder`
  * `dockutil --add /Applications/System\ Settings.app`
* In Finder > settings > sidebar:

  * Favorites

    * remove everything but Desktop and Applications
    * add home folder
  * Locations

    * add root folder
* Log into apps

  * Alfred 
  * Arc browser:

    * log in (as mcdermottsolutions@gmail.com)
    * set download folder to Desktop
  * Google (use YouTube premium account)
  * CleanShot ([licenses.cleanshot.com/download/cleanshotx](https://licenses.cleanshot.com/download/cleanshotx))[](https://licenses.cleanshot.com/download/cleanshotx)
* Setup github auth

  * log in to github
  * git configs

    * `git config --global user.name "Mark McDermott"`
    * `git config --global user.email "mark@markmcdermott.io"`
    * `git config --global core.editor "code --wait"`
    * `git config --global init.defaultBranch main`
  * setup https auth

    * get personal access token

      * avatar -> settings -> developer settings -> personal access tokens -> tokens (classic) -> generate new token (classic)
      * note: "old dox intel macbook"
      * expiration: 90 days
      * scope: repo
      * generate token
    * `git config --global credential.helper osxkeychain`
    * maybe git push & then paste in PAT when asked (a one-time thing)
  * setup ssh auth

    * `puravida ~/.ssh/config`
    * `ssh-keygen -t ed25519 -C "mark@markmcdermott.io"` (hit enter 3 times)
    * `eval "$(ssh-agent -s)"`
    * paste this to add these lines to ~/.ssh/config

      ```c
      cat <<EOT >>  ~/.ssh/config
      Host *
        AddKeysToAgent yes
        UseKeychain yes
        IdentityFile ~/.ssh/id_ed25519
      EOT
      ```
    * \`ssh-add --apple-use-keychain ~/.ssh/id_ed25519\`
    * github -> avatar -> settings -> "ssh & gpg keys" -> new ssh key -> add ssh key

      * title: \`Old Dox Intel Macbook\`
      * key type: Authentication Key
      * Key: <paste contents of ~/.ssh/id_ed25519.pub here>
* Setup menubar

  * run Textbar
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
