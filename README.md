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

## Building this application with continuous integration

### Drone CI

Drone CI provides a command line tool that will execute the pipeline in this
repository's `.drone.yml` file. 

1. Install the Drone CLI by following [their documentation](https://docs.drone.io/cli/install/).

2. Clone this repository to your computer.
 
3. In your terminal, change to the directory where you cloned this repository.
   Create a file secrets.txt with these lines:

```
docker_username: your-username
docker_password: 0ba7dadl-65f5-4cd3-b035-11cc53f66bei
docker_repo_client: your-username/atlas-search-client
docker_repo_server: your-username/atlas-search-server
```

`docker_username`: Your Docker Hub username

`docker_password`: Your Docker Hub access token. See Docker Hub's [Manage Access Token](https://docs.docker.com/docker-hub/access-tokens/) documentation for how to generate this token. The token should have "Read, Write, Delete" permissions.

`docker_repo_client`: The repository for the client docker image for this application.

`docker_repo_server`: The repository for the server docker image for this application.

4. In the same directory, create a file env.txt with this line:

```
SERVER_URI: http://your-server-address:port
```

`SERVER_URI`: The address where the server component of this application will run. If you are running this application locally, you can set this to `http://localhost:5001`.

5. The Drone CLI has an [`exec`](https://docs.drone.io/cli/drone-exec/) parameter that will execute the pipeline defined in `.drone.yml`.

Execute the pipeline with this command:

```bash
drone exec --event push --branch main --sha $(git rev-parse HEAD) --secret-file secrets.txt  --env-file env.txt
```

This will run the "build server" and "build client" steps of the pipeline. When the pipeline completes, the last few lines of output should look similar to this:

```
[build client:266] a811658d3e03: Pushed
[build client:267] latest: digest: sha256:f6da5959b816c2825d2e4150bd3f912e622eeb4b1845a8cb845ef6f3438774a8 size: 1986
[build client:268] + /usr/local/bin/docker rmi 98dddcaf35fae4bebc30d014b927f04c4b0dfa90
[build client:269] + /usr/local/bin/docker system prune -f
```

Open [https://hub.docker.com/](https://hub.docker.com/) and verify that both server and client docker images were pushed to your account.

6. Run the server and client docker images on your computer.

```bash
docker run --rm -e ATLAS_URI=$ATLAS_URI -p 5001:5001 your-username/atlas-search-server
docker run --rm -p 8080:80 your-username/atlas-search-client
```

The application should now be running at [http://localhost:8080](http://localhost:8080)
