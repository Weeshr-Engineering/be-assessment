# Kalu Chibuikem Victor - BookStore Api

## Overview

This is a backend built with express.js, node and typescript.

Routes: A common way of structuring a backend would be to have separate folders for `routes`,`services` and `controllers`. I didn't go this route 😅 as I found i worked faster on this project with the databse logic in the controller.

Middlewares: I have a middleware folder, for logging and maybe where I could have added authentication.I decided to write the logging logic to demonstrate my control of middlewares in an express application.

Memory: It is connected to a Postgres Database using drizzle as an ORM. I went with drizzle as it is lighter and has an sql first design pattern. The postgres database is hosted locally to test the application please provide your own postgres Database.

Testing: I am using vitest. I chose this cause when i tried setting up jest I had module errors with typescript i just had to stick with what i know at that moment. The unit tests I write are for specific functionalities of the application, such as: Testing the pagination function calculation. I didn't know how to test a route, but, It is something I am willing to learn.

## Getting Started

To begin run

```bash
yarn install
```

First: Create a .env file with these values filled

```
DATABASE_URL = ''
PORT = ''
```

Second:

```bash
yarn db:generate
```

This is to generate the types needed for the typescript compiler .

Third:

```bash
yarn db:push
```

This is upload the schema of the application to your database.

Finally:

```bash
yarn dev
```

### Scripts

Here are scripts that are used to run this application.

```json
 "scripts": {
    "dev": "nodemon index",
    "start": "node dist/index.js",
    "build": "tsc",
    "test": "vitest",
    "db:generate": "drizzle-kit generate:pg --config=drizzle.config.ts",
    "db:check": "drizzle-kit check:pg --config=drizzle.config.ts",
    "db:migrate": "ts-node ./migrate.ts",
    "db:studio": "drizzle-kit studio --config=drizzle.config.ts",
    "db:push": "drizzle-kit push:pg --config=drizzle.config.ts"
  }
```

## Tests

```bash
yarn test
```

## Endpoints

 <img width="400" src="/endpoints_img.png" alt="Endpoints">
