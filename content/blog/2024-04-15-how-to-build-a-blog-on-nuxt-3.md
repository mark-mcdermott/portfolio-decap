---
title: How To Build A Blog On Nuxt 3
date: 2024-04-15T03:15:00.000Z
---
When I decided to start this blog a few weeks ago, I'd been working in Nuxt 2 for about a year, working on Drivetracks. I looked into static site generators a bit, but realized I really just wanted to build it in Nuxt 3. Especially when I realized Nuxt 3 had built in markdown capabilities, I got pretty excited.

Searching around for Nuxt 3 blog tutorials, I found some. But none seemed to go the full distance and make a full WordPress style blog with some static pages, regular blog posts, a blog index page and a homepage with some static content at the top and then the latest post underneath. So I decided I'd figure it out and write it up. 

I'd also wanted to figure out Pico's classless CSS version for a while and for a small project like this, it seemed like a perfect fit. In this age of TailwindCSS (which is amazing and pretty much the right tool for most jobs), there is something beautiful about a fully classless CSS - an elegant weapon, for a more civilized age.

This blog has a handful of features:

- has blog posts
- has some non-blog pages (Home and About)
- has both the blog and non-blog pages' content in markdown
- has a light/dark theme toggle
- has fully classless SCSS (styling is done on semantic markup tags)
- a homepage with some static content and then the latest post
- uses nuxt-icon for icons

That's it - pretty simple, really. But still a fully functional, ready-to-go blog.

## Initial Setup

Here we start a new nuxt 3 project and add 3 modules: nuxt-icon, @nuxtjs/color-mode and @nuxt/content. nuxt-icon's a pretty quick way to find and use and icon and is free and has a ton of icons. color-mode has a quick light/dark theme toggle. nuxt-content let's us write our content in markdown, which is so much nicer that writing in html or something like that.

* `npx nuxi init blog`
* `cd blog`
* `yarn add --dev nuxt-icon @nuxt/content @nuxtjs/color-mode sass @picocss/pico`
* `sed -i '' '3s/^/\tmodules: ["nuxt-icon", "@nuxtjs\/color-mode", "@nuxt\/content"],\n/' nuxt.config.ts`
* `sed -i '' '3s/^/\tcss: ["@\/assets\/scss/main.scss"],\n/' nuxt.config.ts`

## Add CSS

Here are some global styles. The interesting part here are the pico settings at the top. Setting the correct root element (`$semantic-root-element`) is important or you will have nice fonts, but no containers, just full width everything. `$enable-semantic-container: true` and `$enable-classes: false` give us pico's classless styles.

* `mkdir -p assets/scss`
* `cat <<'EOT' > assets/scss/main.scss`

```
@use "@picocss/pico/scss/pico" with (
  $semantic-root-element: "#__nuxt",
  $enable-semantic-container: true,
  $enable-classes: false
);


header hgroup {
  display: flex;
  justify-content: space-between;
  
  h1 {
    padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal) var(--pico-form-element-spacing-vertical) 0;

    a {
      color: var(--pico-color-primary);
      text-decoration: none;
    }
  }

  button {
    background-color: inherit;
    border: none;
    font-size: 3rem;

    &:focus {
      box-shadow: none;
    }

    svg {
      width: 2em;
      height: 2em;
    }

  }
}

main > section > header {
  margin-bottom: 3rem;
}
EOT
```

## Header & Footer Components

The header here is where we put our light/dark theme toggle. Although we're setting `colorMode.preference` in a component, but we're tweaking a class on the body tag, we don't need to `emit` our `colorMode.preference` up to the parent page because we're using the `nuxt-colormode` module, which is makes `colorMode` available anywhere in the app.

* `mkdir components`
* `cat <<EOT > components/Header.vue`

```
<template>
  <header>
    <hgroup>
      <h1><NuxtLink to="/">Blog Title</NuxtLink></h1>

      <button @click="changeColor">
        <ColorScheme>
          <Icon v-if="colorMode.value === 'dark'" name="heroicons-outline:moon" class="text-xl text-black" />
          <Icon v-else name="heroicons-outline:sun" class="text-xl" />
        </ColorScheme>
      </button>

    </hgroup>
    <nav>
      <ul>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
      <ul>
        <li><a href="#">Github</a></li>
        <li><a href="#">Linkedin</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const changeColor = () => (colorMode.preference = (colorMode.value === 'light' ? 'dark' : 'light'))
const colorMode = useColorMode();
</script>
EOT
```

* `cat <<EOT > components/Footer.vue`

The footer is pretty straightforward. We use `.getFullYear()` so the copyright year is always current.

```
<template>
  <footer>
    <small>&copy; {{ new Date().getFullYear() }} <NuxtLink to="/">Author Name</NuxtLink> • Built with <a href="https://nuxt.com">Nuxt 3</a> • <a href="https://picocss.com">Pico</a></small>
  </footer>
</template>
EOT
```

## Setup Layout

We're going to setup a default layout here so our header and footer components show on all our pages with out having to add them to each by hand.

* `rm app.js`
* `mkdir layouts`
* `touch layouts/default.vue`
* `cat <<EOT > layouts/default.vue`

```
<template>
  <Header />
    <main>
      <slot />
    </main>
  <Footer />
</template>
EOT
```

## Setup Pages Folder

Creating the `pages` folder will make our homepage (`index.vue`) available on `/`, our about page available at `/about`, our blog index page on `/blog` and our posts on `blog/<post filename>.md`

Our homepage has our static content at the top, rendered by the `ContentDoc` component, available through the `nuxt-content` module. Then we show the most recent post, which we grab using `queryContent`. `queryContent` here is getting all our posts and then we grab the last one (`.slice(-1)`).

* `sed -i '' 's/NuxtWelcome/NuxtPage/' app.vue`
* `mkdir pages`
* `cat <<EOT > pages/index.vue`

```
<template>
  <section>
    <ContentDoc />
    <article>
      <ContentRenderer :value="mostRecentPost">
        <small>Most recent post</small>
        <h3>{{ mostRecentPost.title }}</h3>
        <em>{{ mostRecentPost.date }}</em>
        <ContentRendererMarkdown :value="mostRecentPost.body" />
      </ContentRenderer>
    </article>
  </section>
</template>

<script setup>
const { data } = await useAsyncData('home', () => queryContent('/blog').find())
const mostRecentPost = data.value.slice(-1)[0];
console.log(mostRecentPost)
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}

main > section > article {
  > small {
    display: block;
    margin-bottom: 1.5em;
  }
  > h3 {
    margin-bottom: 0;
  }
  > em {
    display: block;
    margin-bottom: 1em;
    font-size: 0.8em;
  }
}
</style>
EOT
```

Here we use a filename of `[...slug].vue` to render our About page at `/about`. If we create any future pages like Contact, they will also be availble at `/<page name>. ie., `/contact`. `[...slug].vue` is Nuxt's "catch-all" filename, rendering whatever page is specified in the url. We render the About page's content with `<ContentDoc />`.

* `cat <<EOT > pages/\[...slug\].vue`

```
<template>
  <section>
    <ContentDoc />
  </section>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
```

## Add Page Content

Here we add our page content. We can focus solely on content here and not worry about html, typescript, etc. All normal markdown syntax are available here.

* `mkdir content`
* `cat <<EOT > content/index.md`

```
## Home

We try not to sting. It's usually fatal for us. So you have to watch your temper. Very carefully. You kick a wall, take a walk, write an angry letter and throw it out. Work through it like any emotion.

Never thought I'd make it. Three days grade school, three days high school. Those were awkward. Three days college. I'm glad I took a day and hitchhiked around the hive. You did come back different.
EOT
```

* `cat <<EOT > content/about.md`

```
## About

She absolutely adores him and can barely take her eyes from him long enough to thank the various guests for the white envelopes they are putting into the large white purse she holds.  In fact, if we watch carefully, we can see that one of her hands is slid under his jacket, and into his shirt, where she is provocatively rubbing the hair on his chest. Carlo, on the other hand, has his blue eyes trained on the bulging envelopes, and is trying to guess how much cash the things hold.

Sonny is sitting at the Wedding Dias, talking to Lucy Mancini, the Maid of Honor. Every once in a while he glances across the courtyard, where his wife is talking with some women. He bends over and whispers something into Lucy's ear. Sandra and the women are in the middle of a big, ribald laugh.
EOT
```

## Setup Blog Folder

For the blog pages, first we setup the index page. `ContentList` is grabbing all our files in `/blog` and printing the date and title for each post.

* `mkdir pages/blog`
* `cat <<EOT > pages/blog/index.vue`

```
<template>
  <section>
    <h2>Blog Posts</h2>
    <ContentList path="/blog" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <span>{{ article.date }}</span> <h4><NuxtLink :to="article._path">{{ article.title }}</NuxtLink></h4>
      </div>
    </ContentList>
  </section>
</template>

<style>
section > div {
  span {
    display: inline-block;
    font-size: 0.9em;
    color: var(--pico-secondary);
    min-width: 3em;
    text-align: right;
  }
  > h4 {
    display: inline;
    margin: 0 0 0 0.25em;
  }
}
h4 a {
  text-decoration: none;
  &:hover {
    border-bottom: 1px solid var(--pico-primary);
  }
}
</style>
EOT
```

Here is our blog post page. We use the `[...slug]` catch-all filename. We use `ContentDoc` to get all the post details and then `ContentRenderer` with the slot specified in the `v-slot="{ doc }" on `ContentDoc` to get the body of the post.

* `cat <<EOT > pages/blog/\[...slug\].vue`
```
<template>
  <article>
    <ContentDoc v-slot="{ doc }">
      <h2>{{ doc.title }}</h2>
      <em>{{ doc.date }}</em>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </article>
</template>

<style>
main > article {
  > h2 {
    margin-bottom: 0;
  }
  > em {
    display: block;
    margin-bottom: 1.5em;
  }
}
</style>
EOT
```

## Add Blog Content

Here are seven blog posts. The `title` and `date` are specified in the front matter to make them available as properties on `ContentDoc`.

* `mkdir content/blog`
* `cat <<EOT > content/blog/010124-pulp-fiction.md`

```
---
title: 'Pulp Fiction'
date: 1/1/24
---

A normal Denny's, Spires-like coffee shop in Los Angeles. It's about 9:00 in the morning. While the place isn't jammed, there's a healthy number of people drinking coffee, munching on bacon and eating eggs.Two of these people are a young man and a young woman. The Young Man has a slight working-class English accent and, like his fellow countryman, smokes cigarettes like they're going out of style.It is impossible to tell where the Young Woman is from or how old she is; everything she does contradicts something she did. The boy and girl sit in a booth. Their dialogue is to be said in a rapid pace "His Girl Friday" fashion.
EOT
```

* `cat <<EOT > content/blog/010324-groundhog-day.md`

```
---
title: 'Groundhog Day'
date: 1/3/24
---

A van marked "Channel 9 Action News" speeds along a two-lane highway through the winter landscape of West Central Pennsylvania. Mounted atop the van is a microwave transmitter. Rita is riding up front with Larry, the union cameraman and techie. Phil is following close behind the van in a new Lexus coupe. His car has a bumper-sticker that reads "Weathermen Like it Wet." 
EOT
```

* `cat <<EOT > content/blog/010524-shakespeare-in-love.md`

```
---
title: 'Shakespeare In Love'
date: 1/5/24
---

A play takes time. Find actors... rehearsals... let's say open in three weeks. That's -- what -- five hundred groundlings at tuppence each, in addition four hundred groundlings tuppence each, in addition four hundred backsides at three pence -- a penny extra for a cushion, call it two hundred cushions, say two performance for safety how much is that Mr. Frees? 
EOT
```

* `cat <<EOT > content/blog/010724-american-beauty.md`

```
---
title: 'American Beauty'
date: 1/7/24
---

On video: We're looking through greenhouse windows at Lester and Jane in the kitchen We can't hear what they're saying, but it's obvious it's not going well. Jane puts her plate in the dishwasher and leaves. We follow her out the door, then the camera jerks back to Lester calling after her. Close on the face of Ricky Fitts, illuminated by the screen of his digicam as he videotapes. Ricky is eighteen, but his eyes are much older. Beneath his Zen-like tranquility lurks something wounded... and dangerous.
EOT
```

* `cat <<EOT > content/blog/010724-american-beauty.md`

```
---
title: 'American Beauty'
date: 1/7/24
---

On video: We're looking through greenhouse windows at Lester and Jane in the kitchen We can't hear what they're saying, but it's obvious it's not going well. Jane puts her plate in the dishwasher and leaves. We follow her out the door, then the camera jerks back to Lester calling after her. Close on the face of Ricky Fitts, illuminated by the screen of his digicam as he videotapes. Ricky is eighteen, but his eyes are much older. Beneath his Zen-like tranquility lurks something wounded... and dangerous.
EOT
```

* `cat <<EOT > content/blog/010924-maltese-falcon.md`

```
---
title: 'Maltese Falcon'
date: 1/9/24
---

All we see is an elevated shot of the distant mountains, rolling landscape and McMurphy -- one cheek laid-open and crusted over with dried blood, his face and prison work clothes caked with dried sweat and dust -- as he sits on the very top of a water tower watching the last rays of sunlight. A long moment passes before McMurphy's attention is drawn elsewhere and he looks down. Reverse shot - McMurphy's pov far below, in the prison yard a man is seen hurrying acrcss the yard where he joins a group of men composed of armed prison guards, officials, and medics -- a stretcher, an ambulance, a fire truck and safety nets spread out at the base of the water tower. The man is seen talking to the officials, then a bullhorn is handed to him and they all look up at McMurphy. 
```

* `cat <<EOT > content/blog/011124-taxi-driver.md`

```
---
title: 'Taxi Driver'
date: 1/11/24
---

Travis Bickle, age 26, lean, hard, the consummate loner. On the surface he appears good-looking, even handsome; he has a quiet steady look and a disarming smile which flashes from nowhere, lighting up his whole face. But behind that smile, around his dark eyes, in his gaunt cheeks, one can see the ominous stains caused by a life of private fear, emptiness and loneliness. He seems to have wandered in from a land where it is always cold, a country where the inhabitants seldom speak. The head moves, the expression changes, but the eyes remain ever-fixed, unblinking, piercing empty space. Travis is now drifting in and out of the New York city night life, a dark shadow among darker shadows.  Not noticed, no reason to be noticed, travis is one with his surroundings. He wears rider jeans, cowboy boots, a plaid western shirt and a worn beige army jacket with a patch reading, "King kong company 1968-70". 
```

* `cat <<EOT > content/blog/011324-the-sixth-sense.md`

```
---
title: 'The Sixth Sense'
date: 1/13/24
---

Malcolm hurriedly enters a spacious, dimly-lit Italian restaurant. He stops in the dining room and searches the many candle-lit tables. He finds Anna.	Anna sits alone at a corner table. The remains of her half-eaten dinner lay on the only place setting on the table.  A small piece of cake with a candle in it sits untouched.	Anna stirs sugar in her coffee as Malcolm sits in the seat across from her. She gently stops stirring, but doesn't look up. Beat.
```

And that's it. I plan to change dark mode colors to make the more readable and to add pagination on the blog index page soon, but I have not done that yet.

### Sources

* Dark mode toggle button from https://medium.com/@tesfumerry16/a-step-by-step-guide-to-implement-dark-mode-and-light-mode-on-your-nuxt-js-3-5df00969cf13
* One column blog layout based on https://minimal-blog.lekoarts.de
* Html based on https://github.com/picocss/examples/tree/master/v2-html-classless
