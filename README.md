# Personal Blog API

Done to complete the first project in [this list](https://roadmap.sh/backend/project-ideas)

Followed the guidance of [this post](https://chinwendu.medium.com/how-to-build-a-restful-blog-api-with-nodejs-express-and-mongodb-24a889dec33)

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
JWT_SECRET=yourfavoritecolor
JWT_EXPIRES_IN=3600
```

## Run the backend

```
node server.js
```
