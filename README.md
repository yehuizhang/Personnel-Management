# Employee Management System

A web application allows user make CRUD operations on user's profile.

## Introduction

A user list web application.

Design Document [(Google Doc)](https://docs.google.com/document/d/1zxH7jPp4s4knfmZNDPJFIGaeDMrEUH9tlpdAafycWvg/edit?usp=sharing)

Technology Stack:

- Node
- Express
- MongoDB
- React
- React-Redux
- Redux-Thunk
- Material UI
- React-Router-Dom
- Axios

## Initialization

### Node

```bash
npm i -g concurrently
```

### Server

```bash
git init
npm init # node initialization
npm i -D concurrently eslint prettier eslint-plugin-prettier nodemon
./node_modules/.bin/eslint --init # eslint configuration
npm i express mongoose
touch .gitignore
```

### Client

```bash
npx create-react-app client
# remove yarn.lock and client/node_modules
npm i redux react-redux redux-devtools-extension redux-thunk
npm i axios prop-types react-router-dom
npm i -D eslint prettier eslint-plugin-prettier babel-eslint
npx install-peerdeps --dev eslint-config-airbnb
```

## Start

Server: `npm run server`
Client: `npm run client`
both: `npm start`

## Improvement

- Measure the performance
- writting unit tests
- Improve the mechanism of executing async functions
- Rewrite the application in typescript
- Containerization

### Client side

- Add Authtication mechanisms
- Use Redux reselect to improve performance

### Server side

- Improve database schema and query
  - Try to use less `.populate()`
- Use redis to cache database results
- containerization
- Create another branch and try to use NGINX
- (Optional) Use aws to keep image files
- measure the performance of API with

## Improvements
