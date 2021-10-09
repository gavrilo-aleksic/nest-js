# Description

Generic API made with NestJS. Using PostgreSQL database.
Basic React app as UI for API included

## Installation

### Docker
  Project wraps NestJS, PostgreSQL and MongoDB in docker containers. To start API in docker, use command `npm docker:build` from `/services/main-api` dir to start containers. Hot reload for API will work.

### Standard
- To start API without docker, navigate to `/services/main-api` and run `npm run start:debug`. This will require you to have installed PostgreSQL. This will require creating dev.env file in the root of `/services/main-api` from `example.env` file filled with correct variables.

### Basic Client UI App
  Simple Client App to demonstrate API capatibilities. Writen in React / Typescript. Client App is not possible to run in docker. To start client app, navigate to /services/client-app and run `npm run start`
