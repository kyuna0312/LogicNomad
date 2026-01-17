# LogicNomad API

NestJS API for the LogicNomad monorepo.

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start:dev

# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## API Endpoints

- `GET /` - Hello message
- `GET /health` - Health check endpoint

## Project Structure

```
src/
├── app.controller.ts    # Main controller
├── app.service.ts        # Main service
├── app.module.ts         # Root module
└── main.ts              # Application entry point
```
