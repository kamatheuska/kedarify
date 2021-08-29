# Api

## Build

### Local Environment

#### Docker

1. Create a `api.local.env` and pass the required variables for the app to work
1. Then run:

```bash
docker-compose -f docker-compose-local.yml build
docker-compose -f docker-compose-local.yml up -d
```

#### Build as a process

1. Create a `.env` and pass the required variables for the app to work
1. Then run:

```bash
npm run dev
# or
npm start
```
