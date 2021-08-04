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

Add a file on `source/backend/config/secrets/secrets.default.js`. The database secrets are random data so we can share it, for now.

```javascript
module.exports = {
  database: {
    username: 'app_user',
    password: 'app_user_password',
    database: 'teg_database',
  },
  jwt: {
    privateKeyPath: '',
    publicKeyPath: '',
    passprhase: '',
  },
};
```

and run the following `bash scripts/generateJWTCertificate.sh` from the `source/backend` folder. This will create a pair of public private keys that creates and validates JWTs.

## Board

[URL](https://mypersonaltrainer.myjetbrains.com/youtrack/agiles/120-4)

```

```
