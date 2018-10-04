# asl-register

## About

Unsecured UI service for accepting email invitations containing a link and a JSON Web Token.

## Usage

To run a local instance:

```
npm run dev
```

## Dependencies

* `@asl/service/ui` provides the common ui boilerplate
* `@asl/schema` provides models for interacting with database objects
* `@asl/pages` provides common page boilerplate and shared routers for form functionality

## Configuration

The service can be configured for local development by setting environment variables in a `.env` file.

The following environment variables are required:

* `WORKFLOW_SERVICE` - the url of the `asl-workflow` instance
* `DATABASE_NAME` - the name of your postgres database
* `SESSION_SECRET` - an arbitrary string used to sign session data
* `SQS_REGION` - the region of the SQS instance to consume from
* `SQS_ACCESS_KEY` - access key used to consume SQS
* `SQS_SECRET` - secret used to consume SQS
* `SQS_URL` - endpoint for SQS
* `CLIENT_URL` - the URL to redirect to after the registration is complete
* `JWT_SECRET` - arbitrary string used to sign JWT tokens for invitations

The following environment variables can be optionally defined:

* `PORT` - port that the service will listen on - default `8080`
* `DATABASE_HOST` - hostname of the postgres instance - default `localhost`
* `DATABASE_PORT` - port of the postgres instance - default `5432`
* `DATABASE_USERNAME` - username of the postgres instance - default `undefined`
* `DATABASE_PASSWORD` - password of the postgres instance - default `undefined`
* `REDIS_HOST` - host of the redis server used for session storage - default `localhost`
* `REDIS_PORT` - port of the redis server used for session storage - default `6379`
* `REDIS_PASSWORD` - password of the redis server used for session storage - default `undefined`

## Connected services

### Upstream

None. Service visited via link in register email

### Downstream

The following services must be available in order to run:

* `asl-workflow` - api providing workflow management on change requests
* `postgres` - to store licence data

## Development

### Database setup

Scripts for setting up a local database with dev data are available in the [`asl-schema` project](https://github.com/ukhomeoffice/asl-schema). First clone that repo and install the dependencies. Then run the following commands in the schema project directory:

To setup the inital table schemas:

```
npm run migrate
```

To seed the database with a development dataset:

```
npm run seed
```

_Note: these scripts will require the database described by `DATABASE_NAME` to be created before they can run. If running against services run with [`asl-conductor`](https://github.com/ukhomeoffice/asl-conductor) then this will be done automatically._
