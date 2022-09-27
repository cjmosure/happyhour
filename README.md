# Happy Hour Questions

## About

A simple full-stack javascript application that asks the tough questions.

### Built With

* [Nest.js](https://nestjs.com/)
* [React](https://reactjs.org/)
* [MongoDB](https://www.mongodb.com/)

### Overview

This project includes a Nest.js api at `/apps/api` and a React frontend in `/apps/frontend` and using [pnpm workspaces](https://pnpm.io/workspaces) to manage dependencies. The api serves some endpoints for interacting with a questions resource and the root serves static files of the React app build.

## Getting Started

### Requirements

* Node.js (see .nvmrc for version)
* Pnpm
* MongoDB database (you can create a free one on [Atlas](https://www.mongodb.com/atlas/database))

### Install dependencies

Use `nvm use` to switch to the required Node.js version. To install dependencies for all projects, run:

```shell
$ pnpm install
```

### Populate Environment Variables

Copy `/apps/api/.env.default` to `apps/api/.env` and populate values (or add the respective environment variables with another method).

* MONGODB_URI: Mongodb connection string
* PORT: Port that the API runs on 
* ACCESS_TOKEN: Token used for create/edit/delete on questions through the API

### Development

#### Server

Start the server with:

```shell
$ pnpm run start:api
# OR
$ cd apps/api
$ pnpm start
```

Or start the server and watch for changes and reload using webpack HMR:

```shell
$ pnpm --filter hhapi run start:dev
# OR
$ cd apps/api
$ pnpm run start:dev
```

#### Frontend

Run the frontend:

```shell
$ pnpm run start:frontend
# OR
$ cd apps/frontend
$ pnpm start
```

Or build the frontend:

```shell
$ pnpm run build:frontend
# OR
$ cd apps/frontend
$ pnpm build
```

The api serves `apps/frontend/build/*` at the root of the API, so built assets will be displayed at localhost:4000 if running the server.

#### Docker

You can build an image from the Dockerfile with:

```shell
$ docker build -t yourusername/repository-name .
```

And run the docker image:

```shell
$ docker run -p 4000:4000 yourusername/repository-name -e MONGODB_URI='your_db_string' -e ACCESS_TOKEN='your_access_token' 
```

The application runs at port 4000 by default (you can change with the `PORT` env var) and `MONGODB_URI` and `ACCESS_TOKEN` are required for the application to work correctly.


## Usage

### API Endpoints

* GET /question
* GET /questions
* POST /questions
* DELETE /questions/:id
* PUT /questions/:id
* PUT /questions/:id/dislike

