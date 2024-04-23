---
title: "TIL: When Comparing Times, Think Of Leading Zeros"
date: 2024-04-22T18:54:00.000Z
---
I had a curious bug today in some tests. I love weird intermittent, bugs like this. The TLDR is that when comparing times, make sure to consider leading zeros in the hours. "11:01" will always equal "11:01", but "3:01" is not equal to "03:01".

This test was using day.js (which apparently has replaced moment.js) and checking if a datetime on a webpage was the current datetime. The tests had been passing for weeks and then seemingly randomly failed today. Turns out the time on the webpage was in the format H:MM and the current time had the format HH:MM. So as long as the hour of the time was 10, 11 or 12, the test would pass because, for example, `"11:01" == "11:01"`. But if the hour was a single digit hour like in 3:01, then the webpage time was "3:01" but the current time was "03:01" and the test would fail because `"3:01" != "03:01"`. Turns out I'd only run the tests between 10:00 and 12:59 (am or pm) and they'd always passed. Today I ran the tests around 9am and they failed. And I would have gotten away with it too, if it weren't for those meddling kids.
