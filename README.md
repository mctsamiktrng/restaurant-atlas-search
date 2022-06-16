# Restaurant search demo with Fastify, Mongo (Atlas search) React and Node.

## About

This application demonstrates a bare-minimum application in three layers:

- Node and Fastify as a backend server
- React as the frontend
- Mongodb (Atlas) as the database

It features:

- frontend:
  - Facets (filtering) for the selection of cuisine or borough
  - An auto complete search box for the search of restaurants by name
  - Restaurant details when one is selected
- backend:
  - Autocomplete mongo search api endpoint
  - endpoints for pulling cuisines and boroughs
  - endpoints for pulling faceted result metadata

## Using this application

To launch this application you will need the following prerequisites:

- Node.js
- A Node package manager (npm, or yarn)
- A MongoDB Atlas account.
  - Currently you must also have installed the mongo sample database
- You'll need to create a file named `.env` in the server directory of this project containing the following variables:
  - ATLAS_URI: The connection string for the mongo database - this is available in the Atlas UI
  - PORT: (optional) The port to listen on. Defaults to 5001 for the sever.

With these prerequisites in place, you can run the server by running the following command:
`cd server && yarn start`

and the client with:
`cd client && yarn start`

Tip: use multiple terminals to run the server and client in parallel.
