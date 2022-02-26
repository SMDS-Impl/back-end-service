# SMDS backend service

## Installation

```bash
$ npm install
```

Ensure also that [Docker is installed](https://docs.docker.com/engine/install) on your work station

## Running the app using node server (the normal way)

```bash
# development
$ npm run start:dev
or
nest start

# Debug/watch
$ npm run start:debug

# production
$ npm run build:prod
$ npm start
```

## Using Docker

```sh
# Build the image
$ docker build -t smds-backend-service:v1.0 .

# Run the image interactively
$ docker run -it -p 3000:3000 smds-backend-service:v1.0
$ docker rmi -f $(docker images -a -q)
```

## Using Docker Compose

```sh
# Build the docker image
$ docker-compose build

# Start and login to the container
$ docker-compose up -d
$ docker-compose exec app sh
```

## Other useful Docker commands

```sh
# Get the container ID
$ docker ps

# View logs
$ docker logs <container id>

# Enter the container (In alpine, use sh because bash is not installed by default)
$ docker exec -it <container id> /bin/sh
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Admin

The default admin is seed into the db using 
```sh
$ yarn seed:run
```
If the seed failed that means that the admin was either seeded before or db-connection issues

Admin credentails

```json
"email":"smdsadmin@gmail.com",
"password":"Admin@2022"
```
