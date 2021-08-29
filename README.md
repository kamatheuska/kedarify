# Kedarify

The idea of this project is to have:

- An api in NodeJS service deployed as

1. OPTION #1: Digital Ocean

- A dockerized api to a Digital Ocean Droplet.
- MongoDB on Atlas

2. OPTION #2: GCP

- An App Engine to a GCP Project.
- Cloud Firestore as a DB.

- The frontend should be composed of different packages, build as a CRA app delivered via Netlify or Heroku

## Install

```sh
# To install all packages run
npm run bootstrap

# To delete all node_modules from all packages run
npm run clean
```

## Run

```sh
# To start the showroom run
npm run start:showroom


# To start the api run
npm run start:api


# To start the api in watch mode (with nodemon) run
npm run dev:api


# To start all run; (logs as a stream)
npm start
```
