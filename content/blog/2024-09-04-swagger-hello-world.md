---
title: Swagger Hello World
date: 2024-05-15T11:32:00.000Z
---
I've been pretty heads down rebuilding Drivetracks in Nuxt 3 and I've learned a lot along the way. Here's a quick Hello World for Swagger with Rails.

### Let's Create Rails Swagger API Documentation

Let's say you've already got an API-only rails backend build in `~/app/backend` and the routes are all ready and everything. Let's say you have a few controllers like `current_user_controller.rb` and `users_controller.rb`. Here's how to install and generate the nice html RSwag API documentation.

```
cd ~/app/backend
bundle add rswag
bundle install
rails g rswag:install
rails generate rspec:swagger Api::V1::Auth::CurrentUserController
rails generate rspec:swagger Api::V1::UsersController
rake rswag:specs:swaggerize
```

Then start your rails server with `rails server` and in a browser go to `http://localhost:3000/api-docs`. You should see a nice html doc of your API.
