---
title: "TIL: lsof & kill to clear a port"
date: 2024-09-20T05:08:00.000Z
---
I've probably looked this up and done it a million times over the years, but it never somehow stuck in my head. But a good way to find what is running on a port (say, port 3000) is `lsof -i :3000` and that will give you the `pid` or process number running on that port. Then to stop that running process, you can do `kill -9 <pid>` where you replace `<pid>` with the actual process number.

Example:
```
❯ lsof -i :3000
COMMAND   PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ruby    10192 mmcdermott   12u  IPv4 0x17ec2e84526c5d0b      0t0  TCP localhost:hbci (LISTEN)
ruby    10192 mmcdermott   13u  IPv6 0x17ec2e7f89b9dfbb      0t0  TCP localhost:hbci (LISTEN)
❯ kill -9 10192
```

A nice one liner for this is:
```
kill -9 $(lsof -t -i:8080)
```

### Some background:
- `lsof` is "list of open files". 
  - The `-i` is for "internet files or sockets"
  - if you do `-i :<port>` it gives you "sockets bound to a specific port".
- `kill` is a command to manually terminate a process.
  - It sends a "signal" specified by what follows the dash. 
  - It terminates the pid (process id) specified after the signal.
  - `-9` is `SIGKILL`, which kills the process immediately and all child processes.
  - You can also use `-15`, which is `SIGTERM`, which attempts to kill the process more gracefully and does not kill child processes.
- `$()` runs what ever is inside in a subshell and returns the value.

### Sources (accessed 9/20/24)
- [https://unix.stackexchange.com/a/106572](Stack Exchange: "Finding the PID of the process using a specific port?")
- [https://stackoverflow.com/a/32592965](Stack Overflow: "How to kill a process running on particular port in Linux?")
- (https://unix.stackexchange.com/a/684332](Stack Exchange: "What does the "i" flag mean in lsof?")
- [https://stackoverflow.com/a/17985000](Stack Overflow: "What does it mean in shell when we put a command inside dollar sign and parentheses: $(command)")
- [https://www.geeksforgeeks.org/kill-command-in-linux-with-examples/](Geeks For Geeks "How to Kill a Process in Linux")
- [https://linuxhandbook.com/sigterm-vs-sigkill/](Linux Handbook: "SIGTERM vs SIGKILL: What's the Difference?")
