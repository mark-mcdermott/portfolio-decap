---
title: Running A Frontend And Backend With Concurrently
date: 2024-09-29T05:29:00.000Z
---
## Starting A Frontend/Backend With Concurrently
There are many ways to start a frontend and the backend locally with one command. In my experience, the npm package called [concurrently](https://www.npmjs.com/package/concurrently) is the best. You install it with just `npm install --save-dev concurrently` and my favorite way to run it is from frontend folder with a line in the `package.json` `scripts` section like this:
```
"front-and-back-dev": "concurrently -n \"BACKEND,FRONTEND\" -c \"green,yellow\" \"cd ../backend && rails server\" \"npm run dev\""
```
This shows you the output of both the front and back with all the backend output in green and prefixed with `[BACKEND]` and all the frontend output in yellow prefixed with `[FRONTEND]`.

If you don't want the color coding, it's just:
```
"front-and-back-dev": "concurrently -n \"BACKEND,FRONTEND\" \"cd ../backend && rails server\" \"npm run dev\""
```
And if you don't want the prefixing, it's just
```
"front-and-back-dev": "concurrently \"cd ../backend && rails server\" \"npm run dev\""
```
If you want to make this cleaner still, you can add script lines for the backend and reference that in the Concurrently script:
```
"rails-server": "cd ../backend && rails server",
"front-and-back-dev": "concurrently \"npm run rails-server\" \"npm run dev\"",
```

## Running End-To-End Tests With Concurrently
Sometimes you want to wait for the backend to start before starting the frontend, like in the case of running end-to-end tests with something like Playwright. This gets a little more complicated, but still isn't too bad.

Create a bash script that waits for rails to start:
- `touch wait-for-rails.sh`
- Copy/paste the following to `wait-for-rails.sh`:
```
#!/bin/bash
until curl --silent --fail http://localhost:3000/api/v1/up | grep -q '{"status":"OK"}'; do
  echo "Waiting for Rails server to start..."
  sleep 1
done
echo "Ok, rails server is up and running - let's start testing!"
```
- Run `chmod +x wait-for-rails.sh` to give our script executable permissions.
- Then add this to your `package.json` `scripts` section:
```
    "rails-server": "cd ../backend && rails server",
    "front-and-back-dev": "concurrently -n \"BACKEND,FRONTEND\" -c \"green,yellow\" \"npm run rails-server\" \"npm run dev\"",
    "e2e-tests": "concurrently -n \"BACKEND,FRONTEND\" -c \"green,yellow\" \"npm run rails-server\" \"./wait-for-rails.sh && npm run vitest\""
```

## Alternatives to Concurrently

### Two Terminal Panes
You can obviously split panes in a terminal and run the frontend in one terminal and the backend in another. This is fine, but after awhile gets a little unwieldily.

### Bash
The easiest way to run two commands in one line in bash is with `&&`. But you can't really use this to run a frontend and a backend at the same time. If you do `rails server && cd ../frontend && npm run dev` the frontend will only start after you stop the backend with `^ + c`. Same thing if you do `npm run dev && cd ../backend && rails server`.

One way around this in Bash is to background one of the servers. Although it has some drawbacks, this will work:
```
npm run dev & cd ../backend && rails server
```
Although this generally shows the output of both the front and back, you don't see the initial output of the backend. Also the output is pretty hard to read - nothing is prefixed with something like `[FRONTEND]` and nothing is color coded.

You actually can prefix output with something like `[FRONTEND]` in Bash, too:
```
(cd ../frontend && npm run dev 2>&1 | sed 's/^/[FRONTEND] /') & (cd ../backend && rails s 2>&1 | sed 's/^/[BACKEND] /')
```
This prefixes the output the way we want, but is not color coded.

This does the color coding and the prefixing:
```
(cd ../frontend && npm run dev 2>&1 | sed $'s/^/\033[0;33m[FRONTEND]\033[0m /') & (cd ../backend && rails s 2>&1 | sed $'s/^/\033[0;32m[BACKEND]\033[0m /')
```
One problem with these methods is they do not clear the ports correctly when you `^ + c` to stop the servers. One will be left running. We could add something to the beginning of that one-liner like `kill -9 $(lsof -t -i:3001)`, but at this point you're probably seeing the upside of using Concurrently - it's much simpler and cleaner. It correctly clears both ports when you `^ + c` and the command to run it is much simpler.
