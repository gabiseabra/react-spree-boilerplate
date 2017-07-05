# React Spree Boilerplate

This project is as base spree application with a frontend built with React + Redux.

## Stack

### Ruby
* Rails 5
* Spree 3.2
* React on Rails 8

### Node
* React
* React Intl
* Redux
* Redux Saga
* Reselect
* Webpack + HMR

## Installation

```shell
bundle install
npm install
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed
```

Optionally, Spree sample data may be loaded by:

```shell
bundle exec rake spree_sample:load
```

## Development

```shell
npm run start:hot
```

Starts the app with hot module replacement. While this is the recommended approach, `start:dev` might also be used to start using watch mode instead of hmr.

```shell
npm run start:dev
```

The store can be accessed at

http://localhost:3000 
