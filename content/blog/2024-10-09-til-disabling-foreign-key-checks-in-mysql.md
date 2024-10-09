---
title: "TIL: Disabling foreign key checks in MySQL"
date: 2024-10-09T16:22:00.000Z
---
This is probably a terrible idea, but I discovered today that \`SET FOREIGN_KEY_CHECKS = 0;\` will let you add/remove data that would normally fail if there was a foreign key constraint that failed. Obviously you could quickly see lots of 500 errors if you're not careful, but in a bind this actually is quite helpful. So use it with caution — if you dare.
