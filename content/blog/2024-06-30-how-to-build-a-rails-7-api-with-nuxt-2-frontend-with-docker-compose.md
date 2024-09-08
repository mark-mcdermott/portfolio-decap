---
title: How To Build A Rails 7 API With Nuxt 2 Frontend With Docker Compose
date: 2024-06-30T09:22:00.000Z
---
Today, we’re going to set up a nice development environment using Docker Compose to run a Ruby on Rails 7 Postgres API backend with a Nuxt 2 frontend. This guide is for you if you’ve been struggling to get separate front and back apps running in Docker.

Why use a Rails/Nuxt combo? A Rails 7 API with Postgres gives you a full MVC backend in Ruby, and Nuxt 2 on the frontend gives you a single page application with really an intuitive framework (Nuxt) and easy to use components (Vue). Using Docker can make working together easier among developers and can also help you get a continuous integration pipeline going on CircleCI. Let’s jump right in.

### Backend
- `mkdir myapp`
- `cd myapp`
- `touch docker-compose.yml`
- `rails new backend --api --database=postgresql`
- `cd backend`
- `bundle add rack-cors`
- `bundle install`
- `rails g model User name`
- `rails g controller Users`
-  change `db/seeds.rb` to this:
```
User.create(name: "Luke Skywalker")
```
- change `app/controllers/users_controller.rb` to this:
```
class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1 or /users/1.json
  def show
    render json: @user
  end

  # GET /users/new
  def new
    @user = User.new
    render json: @user
  end

  # GET /users/1/edit
  def edit
    render json: @user
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to user_url(@user), notice: "User was successfully created." }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name)
    end
end
```
- change `config/database.yml` to this:
```
default: &default
  adapter: postgresql
  encoding: unicode
  host: postgres
  username: <%= Rails.application.credentials.dig(:db, :username) %>
  password: <%= Rails.application.credentials.dig(:db, :password) %>
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: backend_development

test:
  <<: *default
  database: backend_test

production:
  <<: *default
  database: backend_production
  username: backend
  password: <%= ENV["RAILS_7_WITH_DOCKER_DATABASE_PASSWORD"] %>
```
- change the contents of `config/routes.rb` to this:
```
Rails.application.routes.draw do
  resources :users
end
```
- change the contents of `backend/config/initializers/cors.rb` to 
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3001"
    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
- `touch Dockerfile`
- add this to `myapp/backend/Dockerfile`
```
FROM ruby:3.2.2

# Set the working directory inside the container
WORKDIR /app/backend

# Install dependencies
RUN apt-get update && \
    apt-get install -y nodejs && \
    gem install bundler
    
# Copy Gemfile and Gemfile.lock to the working directory
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
```
(this `Dockerfile` from https://medium.com/jetthoughts/setting-up-docker-for-ruby-on-rails-7-cd2c942c3d43, accessed 4/22/24)

- `cd ..`
- add this to `docker-compose.yml` and make sure the last part after the `/` in `DATABASE_URL` is your app's name ("slug" name)
```
version: '3.8'

services:

  # Service for the Nuxt frontend
  frontend:
    build: ./frontend
    working_dir: /usr/src/frontend
    command: npm start
    ports:
      - "3001:3001"
    depends_on:
      - backend

  # Service for the Ruby on Rails web application
  backend:
    build: ./backend
    working_dir: /app/backend
    command: bundle exec rails s -p 3000 -b '0.0.0.0'
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/backend
      
  # Service for the PostgreSQL database
  db:
    image: postgres:13
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      
# Define a volume for storing PostgreSQL data
volumes:
  postgres_data:
```
(this `docker-compose.yml` file from https://medium.com/jetthoughts/setting-up-docker-for-ruby-on-rails-7-cd2c942c3d43, accessed 4/22/24)
- `docker-compose build`
- `docker-compose run backend rails db:create db:migrate db:seed`
- `docker-compose up` or `docker-compose up --detach`
- in a browser, go to:
	- http://localhost:3000 - should be the default rails page
	- http://localhost:3000/users - should show a json array with one user
	- http://localhost:3000/users/1 - should show a json object with one user
- `docker-compose down`
#### Frontend
- `npm init nuxt-app frontend`
	- project name: `frontend`
	- programming language: `JavaScript`
	- package manager: `npm`
	- UI framework: `none`
	- template engine: `HTML`
	- nuxt.js modules: `Axios`
	- linting tools: `none`
	- testing framework: `none`
	- rendering mode: `single page app`
	- deployment target: `server`
	- dev tools: `none`
	- github username: `<your github username>`
	- version control: `none`
- `cd frontend`
- `npm install @picocss/pico @nuxtjs/auth@4.5.1 @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/vue-fontawesome@latest-2`
- `npm install --save-dev sass sass-loader@10`
- `mkdir -p assets/scss`
- `touch assets/scss/main.scss`
- add this to `assets/scss/main.scss`:
```
@use "@picocss/pico/scss/pico" with (
  $semantic-root-element: "#__nuxt > div > div",
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
}

main > section > header {
  margin-bottom: 3rem;
}
```
- replace the content of `nuxt.config.js` with this:
```
let development = process.env.NODE_ENV !== 'production'
export default {
  ssr: false,
  head: { title: 'front', htmlAttrs: { lang: 'en' },
    meta: [ { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ], link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css','@/assets/scss/main.scss'],
  plugins: [ '~/plugins/fontawesome.js' ],
  components: true,
  buildModules: [],
  modules: ['@nuxtjs/axios'],
  axios: { baseURL: 'http://localhost:3000' },
  server: { port: 3001 },
}
```
- `mkdir plugins`
- `touch plugins/fontawesome.js`
- add this to `plugins/fontawesome.js`:
```
import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
```
- `rm -rf components/*` (then `y`)
- `touch components/Header.vue`
- add this to `components/Header.vue`:
```
<template>
  <header>
    <hgroup>
		<h1><font-awesome-icon icon="computer" /> <NuxtLink to="/">App Title</NuxtLink></h1>
    </hgroup>
  </header>
</template>
```
- `touch components/UserList.vue`
- add this to `components/UserList.vue`:
```
<template>
  <main>
    <section>
	  <h2>Users</h2>
      <div v-for="user in users" :key="user.id">
        <p>{{ user.name }}</p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data: () => ({
    users: []
  }),
  async fetch() {
    this.users = await this.$axios.$get('users')
  }
}
</script>
```
- replace the contents of `frontend/pages/index.vue` with this:
```
<template>
  <div>
    <Header />
    <UserList />
  </div>
</template>
```
- `touch Dockerfile`
- add this to `frontend/Dockerfile`:
```
FROM node:21.7.3-alpine3.18

# create destination directory
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/frontend/
RUN npm install
RUN npm run build

EXPOSE 3001

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3001

CMD [ "npm", "start" ]
```
this `Dockerfile` from https://dockerize.io/guides/docker-nuxtjs-guide, accessed 4/22/24
- `cd ..`
- `docker-compose build`
- `docker-compose up` or `docker-compose up --detach`
- in a browser, go to http://localhost:3001 - you should see the "App Title" page with "Luke Skywalker" under "Users"
- `docker-compose down`

Congratulations! You’ve just navigated through the setup of a Ruby on Rails 7 API and a Nuxt 2 frontend using Docker Compose. The setup you've configured is modular/scalable and is is CI-ready. I'll do a CircleCI tutorial in another post. For now, happy coding!

#### Sources
- [Setting Up Docker for Ruby on Rails 7](https://jtway.co/setting-up-docker-for-ruby-on-rails-7-cd2c942c3d43) by [JetThoughts](https://medium.com/@jetthoughts), accessed 4/22/24
- [Docker NuxtJS tutorial. Dockerize NuxtJS app in 3 minutes.](https://dockerize.io/guides/docker-nuxtjs-guide), accessed 4/23/24
