# Personal Blog API

## Dependencies

- Node 20+
- pnpm

## Setup the project

open the main project folder and run:

```
pnpm install
```

create `.env` file in the root folder and place this inside (replace with your own credentials)

```js
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=8080
```

## Run the backend

```
node server.js
```
