---
title: "TIL: Underscores As Separators"
date: 2024-04-03T06:22
image: /img/post-images/underscores-as-separators.png
---
Had a mind-blown moment today when I learned that both javascript and ruby accept underscores in numbers. Underscores are used where commas or periods would be and are just ignored when parsing the number.
## JavaScript 
```
> console.log(1_000)
1000
undefined
> console.log(1_000 + 2_000)
3000
```
## Ruby
```
> puts 1_000_000
1000000
 => nil
> puts 1_000 + 2_000
3000
```
