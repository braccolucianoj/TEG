# README

## Project setup

Before running everything set up the database with the following docker command: `docker-compose up -d` on `source/devops`.
Then install the dependencies on both `backend` an `frontend` and run with `yarn dev` or `npm run dev` (for both).

## Frontend

Add the following entry to the `/etc/hosts` file:

```
127.0.0.1	localhost.com
```

BTW, The login is dummy 

## Backend

The database secrets are random data so we can't share it, for now. The way to overcome this is to add the env/develop.env file which is intended to contain all the environment variables.

For certificates run the following `bash scripts/generateJWTCertificate.sh` from the `source/backend` folder. This will create a pair of public private keys that creates and validates JWTs.

## Board

[URL](https://mypersonaltrainer.myjetbrains.com/youtrack/agiles/120-4)

```

```
