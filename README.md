## Description

Generic API made with NestJS. Using PostgreSQL database.
Basic React app as UI for API included

# Installation

- To start API in docker, use command `npm docker:build` from `/services/main-api` dir which will start PostgreSQL and NestJS application containers.
  Hot Reload will work.

- To start API without docker, navigate to `/services/main-api` and run `npm run start:debug`. This will require you to have installed PostgreSQL server
  with database connection details matching `dev.env` file

- To start client app, navigate to /services/client-app and run `npm run start`
