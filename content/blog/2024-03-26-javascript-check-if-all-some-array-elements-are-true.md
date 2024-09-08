---
title: Javascript Check If All/Some Elements Are True
date: 2024-03-26T19:00:00.000Z
---

I learned today a quick way to test a bunch of boolean expressions in Javascript is to put them in an array and use Javascript's `some` or `every` method:

`arr.some(Boolean)`
`arr.every(Boolean)`

`.some(Boolean)` will return true if any element of the array is truthy. `.every(Boolean)` will return true if all elements in the array are truthy.

<sub>Source: https://www.30secondsofcode.org/js/s/check-array-values-are-truthy/#check-if-all-values-in-an-array-are-truthy</sub>

